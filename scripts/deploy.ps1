#requires -Version 5.1
$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$distPath = Join-Path $repoRoot 'dist'
$winscpScript = Join-Path $PSScriptRoot 'deploy.winscp'
$logPath = Join-Path $repoRoot 'winscp.log'

# Sanity: la build deve esistere ed essere non vuota
if (-not (Test-Path $distPath) -or (Get-ChildItem $distPath -File -Recurse | Measure-Object).Count -eq 0) {
    Write-Error "dist/ vuota o mancante. Lancia prima 'pnpm build'."
    exit 1
}

# Trova WinSCP.com (non WinSCP.exe: il primo e' la CLI console-mode, scriptable)
$winscpCandidates = @(
    'C:\Program Files (x86)\WinSCP\WinSCP.com',
    'C:\Program Files\WinSCP\WinSCP.com',
    "$env:LOCALAPPDATA\Programs\WinSCP\WinSCP.com"
)
$winscp = $winscpCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $winscp) {
    Write-Error "WinSCP.com non trovato. Installa WinSCP o aggiungi il path ai candidati in questo script."
    exit 1
}

Write-Host "==> Deploy $distPath -> ftp.loz.it" -ForegroundColor Cyan
& $winscp /script=$winscpScript /parameter $distPath /log=$logPath
$exit = $LASTEXITCODE

if ($exit -eq 0) {
    Write-Host "==> Deploy OK" -ForegroundColor Green
    Write-Host "Ricorda: se la HiSpeed Cache di Aruba serve contenuto stale, purga dal pannello (Velocita' -> HiSpeed Cache)." -ForegroundColor Yellow
} else {
    Write-Error "Deploy fallito (exit $exit). Vedi $logPath"
}
exit $exit
