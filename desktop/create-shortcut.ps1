# ShadowSec masaüstü kısayolu oluşturucu
$ErrorActionPreference = "Stop"

$root     = Split-Path -Parent $PSScriptRoot          # proje kök klasörü
$electron = Join-Path $root "node_modules\electron\dist\electron.exe"
$icon     = Join-Path $PSScriptRoot "app.ico"
$desktop  = [Environment]::GetFolderPath("Desktop")   # OneDrive Desktop dahil doğru yolu bulur
$lnkPath  = Join-Path $desktop "ShadowSec.lnk"

if (-not (Test-Path $electron)) {
    Write-Host "HATA: Electron bulunamadi. Once 'npm install --save-dev electron' calistirin." -ForegroundColor Red
    exit 1
}

$ws = New-Object -ComObject WScript.Shell
$sc = $ws.CreateShortcut($lnkPath)
$sc.TargetPath       = $electron
$sc.Arguments        = '"' + $root + '"'
$sc.WorkingDirectory = $root
$sc.IconLocation     = $icon
$sc.Description      = "ShadowSec - Siber Guvenlik Asistani"
$sc.Save()

Write-Host "Masaustune 'ShadowSec' kisayolu olusturuldu: $lnkPath" -ForegroundColor Green
