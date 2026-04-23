<?php
// Template di configurazione per errata.php.
//
// Istruzioni:
//   1. Copia questo file in errata.config.local.php (nella stessa directory).
//   2. Compila i valori reali.
//   3. Carica SOLO errata.config.local.php via SFTP sul server (WinSCP) nel
//      percorso /www.loz.it/ (stesso livello di errata.php).
//   4. NON committare errata.config.local.php in git (gia' in .gitignore).
//
// Genera un captcha_secret nuovo con:
//   php -r "echo bin2hex(random_bytes(32));"
// oppure da shell:
//   openssl rand -hex 32

return [
    // Segreto HMAC per firmare i token del captcha. Stringa casuale >= 32 byte.
    'captcha_secret' => 'CAMBIAMI_CON_32_BYTE_RANDOM_HEX',

    // SMTP autenticato su account Aruba (mailbox errata@lornova.it).
    'smtp_host' => 'smtpauth.aruba.it',
    'smtp_port' => 465, // 465 = SSL/TLS implicito. 587 = STARTTLS.
    'smtp_user' => 'errata@lornova.it',
    'smtp_pass' => 'LA_PASSWORD_DEL_MAILBOX',

    // Indirizzi email.
    'mail_from' => 'errata@lornova.it',
    'mail_to'   => 'errata@lornova.it',

    // Prefisso del subject (utile per filtri IMAP).
    'mail_subject_prefix' => '[Errata] Segnalazione',
];
