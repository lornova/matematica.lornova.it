<?php
declare(strict_types=1);

// Endpoint PHP per le segnalazioni di errata corrige.
// - GET  /errata.php?action=captcha  -> { question, token }
// - POST /errata.php  (JSON body)    -> { ok: true } oppure { ok: false, error }
//
// Config (credenziali SMTP, secret HMAC, destinatario) in errata.config.local.php
// adiacente a questo file. Il file NON e' committato in git: va caricato via
// SFTP sul server una tantum (vedi errata.config.example.php).
//
// Portabile: PHP puro, nessuna dipendenza esterna. Quando si passera' a un
// hosting diverso basta ricopiare il file.

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$configPath = __DIR__ . '/errata.config.local.php';
if (!is_file($configPath)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Backend non configurato.']);
    exit;
}
$config = require $configPath;

$requiredKeys = [
    'captcha_secret',
    'smtp_host', 'smtp_port', 'smtp_user', 'smtp_pass',
    'mail_from', 'mail_to', 'mail_subject_prefix',
];
foreach ($requiredKeys as $key) {
    if (!isset($config[$key]) || $config[$key] === '') {
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => "Config mancante: $key"]);
        exit;
    }
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$action = $_GET['action'] ?? '';

if ($method === 'GET' && $action === 'captcha') {
    echo json_encode(generate_captcha($config['captcha_secret']));
    exit;
}

if ($method === 'POST') {
    handle_submit($config);
    exit;
}

http_response_code(405);
echo json_encode(['ok' => false, 'error' => 'Metodo non supportato.']);
exit;

// ---------- Captcha stateless (HMAC) ----------

function base64url_encode(string $data): string {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64url_decode(string $data) {
    $pad = strlen($data) % 4;
    if ($pad) { $data .= str_repeat('=', 4 - $pad); }
    return base64_decode(strtr($data, '-_', '+/'), true);
}

function generate_captcha(string $secret): array {
    $a = random_int(1, 9);
    $b = random_int(1, 9);
    $op = random_int(0, 1) === 1 ? '+' : '-';
    if ($op === '-' && $b > $a) { $tmp = $a; $a = $b; $b = $tmp; }
    $answer = $op === '+' ? $a + $b : $a - $b;
    $payload = json_encode(['a' => $answer, 'e' => time() + 900]);
    $payloadB64 = base64url_encode($payload);
    $sig = hash_hmac('sha256', $payloadB64, $secret);
    return [
        'question' => "$a $op $b",
        'token'    => $payloadB64 . '.' . $sig,
    ];
}

function verify_captcha(string $secret, string $token, string $userAnswer): bool {
    $parts = explode('.', $token);
    if (count($parts) !== 2) { return false; }
    list($payloadB64, $sig) = $parts;
    $expected = hash_hmac('sha256', $payloadB64, $secret);
    if (!hash_equals($expected, $sig)) { return false; }
    $payload = base64url_decode($payloadB64);
    if ($payload === false) { return false; }
    $data = json_decode($payload, true);
    if (!is_array($data) || !isset($data['a'], $data['e'])) { return false; }
    if (time() > (int)$data['e']) { return false; }
    $userInt = filter_var($userAnswer, FILTER_VALIDATE_INT);
    if ($userInt === false) { return false; }
    return $userInt === (int)$data['a'];
}

// ---------- Submit handler ----------

function handle_submit(array $config): void {
    $raw = file_get_contents('php://input');
    $data = $raw !== false ? json_decode($raw, true) : null;
    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Payload non valido.']);
        return;
    }

    // Honeypot: se compilato, fingi successo e scarta.
    if (!empty($data['honeypot'])) {
        echo json_encode(['ok' => true]);
        return;
    }

    // Time check: submit troppo rapido = bot.
    $elapsed = (int)($data['elapsed_ms'] ?? 0);
    if ($elapsed > 0 && $elapsed < 1500) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Invio troppo rapido, riprova.']);
        return;
    }

    // Rate limit.
    if (!rate_limit_check($config)) {
        http_response_code(429);
        echo json_encode(['ok' => false, 'error' => 'Troppe segnalazioni da questo indirizzo. Riprova piu\' tardi.']);
        return;
    }

    // Captcha.
    $token = (string)($data['captcha_token'] ?? '');
    $answer = (string)($data['captcha_answer'] ?? '');
    if (!verify_captcha($config['captcha_secret'], $token, $answer)) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Verifica anti-spam fallita. Riprova.']);
        return;
    }

    // Campi.
    $description = trim((string)($data['description'] ?? ''));
    if ($description === '') {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'La descrizione e\' obbligatoria.']);
        return;
    }
    if (mb_strlen($description) > 4000) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Descrizione troppo lunga.']);
        return;
    }
    $location   = mb_substr(trim((string)($data['location']   ?? '')), 0, 200);
    $correction = mb_substr(trim((string)($data['correction'] ?? '')), 0, 4000);

    // Corpo email.
    $subject = $config['mail_subject_prefix'] . ($location !== '' ? " - $location" : '');
    $lines = [
        'Segnalazione di errata corrige ricevuta da matematica.lornova.it',
        '',
        'Capitolo / pagina: ' . ($location !== '' ? $location : '(non specificato)'),
        '',
        'Descrizione:',
        $description,
    ];
    if ($correction !== '') {
        $lines[] = '';
        $lines[] = 'Correzione proposta:';
        $lines[] = $correction;
    }
    $lines[] = '';
    $lines[] = '---';
    $lines[] = 'IP hash: ' . hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . $config['captcha_secret']);
    $lines[] = 'User-Agent: ' . substr((string)($_SERVER['HTTP_USER_AGENT'] ?? '(n/d)'), 0, 300);
    $body = implode("\r\n", $lines);

    $result = smtp_send(
        (string)$config['smtp_host'],
        (int)   $config['smtp_port'],
        (string)$config['smtp_user'],
        (string)$config['smtp_pass'],
        (string)$config['mail_from'],
        (string)$config['mail_to'],
        $subject,
        $body
    );

    if (!$result['ok']) {
        error_log('errata.php SMTP error: ' . $result['error']);
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'Invio non riuscito. Riprova piu\' tardi.']);
        return;
    }

    rate_limit_record($config);
    echo json_encode(['ok' => true]);
}

// ---------- SMTP client (no dependencies) ----------

function smtp_send(string $host, int $port, string $user, string $pass, string $from, string $to, string $subject, string $body): array {
    $scheme = $port === 465 ? 'ssl://' : '';
    $errno  = 0;
    $errstr = '';
    $fp = @stream_socket_client($scheme . $host . ':' . $port, $errno, $errstr, 15);
    if (!$fp) { return ['ok' => false, 'error' => "connect failed: $errstr ($errno)"]; }
    stream_set_timeout($fp, 15);

    try {
        smtp_expect($fp, '220');
        smtp_cmd($fp, 'EHLO matematica.lornova.it');
        smtp_expect($fp, '250');

        if ($port === 587) {
            smtp_cmd($fp, 'STARTTLS');
            smtp_expect($fp, '220');
            if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new \RuntimeException('TLS upgrade failed');
            }
            smtp_cmd($fp, 'EHLO matematica.lornova.it');
            smtp_expect($fp, '250');
        }

        smtp_cmd($fp, 'AUTH LOGIN');
        smtp_expect($fp, '334');
        smtp_cmd($fp, base64_encode($user));
        smtp_expect($fp, '334');
        smtp_cmd($fp, base64_encode($pass));
        smtp_expect($fp, '235');

        smtp_cmd($fp, 'MAIL FROM:<' . $from . '>');
        smtp_expect($fp, '250');
        smtp_cmd($fp, 'RCPT TO:<' . $to . '>');
        smtp_expect($fp, '25');
        smtp_cmd($fp, 'DATA');
        smtp_expect($fp, '354');

        $headers = [
            'From: ' . $from,
            'To: ' . $to,
            'Subject: =?UTF-8?B?' . base64_encode($subject) . '?=',
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
            'Date: ' . date('r'),
            'Message-ID: <' . bin2hex(random_bytes(8)) . '@matematica.lornova.it>',
        ];
        // Dot-stuffing: righe che iniziano con "." vanno raddoppiate.
        $escapedBody = preg_replace('/^\./m', '..', $body);
        smtp_cmd($fp, implode("\r\n", $headers) . "\r\n\r\n" . $escapedBody . "\r\n.");
        smtp_expect($fp, '250');

        smtp_cmd($fp, 'QUIT');
        fclose($fp);
        return ['ok' => true];
    } catch (\Throwable $e) {
        @fclose($fp);
        return ['ok' => false, 'error' => $e->getMessage()];
    }
}

function smtp_cmd($fp, string $cmd): void {
    fwrite($fp, $cmd . "\r\n");
}

function smtp_read($fp): string {
    $response = '';
    while (!feof($fp)) {
        $line = fgets($fp, 4096);
        if ($line === false) { break; }
        $response .= $line;
        // Ultima riga di una risposta multi-linea ha uno spazio dopo il codice,
        // le intermedie un trattino ("250-..." vs "250 ...").
        if (preg_match('/^\d{3} /', $line)) { break; }
    }
    return $response;
}

function smtp_expect($fp, string $prefix): void {
    $response = smtp_read($fp);
    if (strncmp($response, $prefix, strlen($prefix)) !== 0) {
        throw new \RuntimeException('SMTP unexpected: ' . trim($response));
    }
}

// ---------- Rate limit (file-based) ----------

function rate_limit_dir(): string {
    return __DIR__ . '/.errata-data';
}

function rate_limit_path(): string {
    return rate_limit_dir() . '/rate.json';
}

function rate_limit_ensure_dir(): void {
    $dir = rate_limit_dir();
    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
        @file_put_contents($dir . '/.htaccess', "Require all denied\n");
    }
}

function rate_limit_check(array $config): bool {
    $path = rate_limit_path();
    if (!is_file($path)) { return true; }
    $raw = @file_get_contents($path);
    $data = $raw ? json_decode($raw, true) : [];
    if (!is_array($data)) { return true; }
    $ip = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . $config['captcha_secret']);
    $cutoff = time() - 600;
    $hits = array_filter($data[$ip] ?? [], function ($t) use ($cutoff) { return $t > $cutoff; });
    return count($hits) < 5;
}

function rate_limit_record(array $config): void {
    rate_limit_ensure_dir();
    $path = rate_limit_path();
    $fp = @fopen($path, 'c+');
    if (!$fp) { return; }
    @flock($fp, LOCK_EX);
    $raw = stream_get_contents($fp);
    $data = $raw ? json_decode($raw, true) : [];
    if (!is_array($data)) { $data = []; }
    $ip = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . $config['captcha_secret']);
    $now = time();
    $cutoff = $now - 600;
    $hits = array_values(array_filter($data[$ip] ?? [], function ($t) use ($cutoff) { return $t > $cutoff; }));
    $hits[] = $now;
    $data[$ip] = $hits;
    foreach ($data as $k => $v) {
        $v = array_values(array_filter($v, function ($t) use ($cutoff) { return $t > $cutoff; }));
        if (empty($v)) { unset($data[$k]); } else { $data[$k] = $v; }
    }
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($data));
    fflush($fp);
    @flock($fp, LOCK_UN);
    fclose($fp);
}
