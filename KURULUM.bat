@echo off
rem =====================================================
rem  ShadowSec masaustu uygulamasi - tek seferlik kurulum
rem  Bu dosyaya cift tiklamaniz yeterli.
rem =====================================================
cd /d "%~dp0"
echo.
echo  [1/3] Node.js kontrol ediliyor...
where node >nul 2>nul
if errorlevel 1 (
    echo  HATA: Node.js bulunamadi. https://nodejs.org adresinden kurun.
    pause
    exit /b 1
)

echo  [2/3] Electron kuruluyor (ilk seferde birkac dakika surebilir)...
if exist "node_modules\electron\dist\electron.exe" (
    echo        Electron zaten kurulu, atlaniyor.
) else (
    call npm install --save-dev electron
    if errorlevel 1 (
        echo  HATA: Electron kurulamadi. Internet baglantinizi kontrol edin.
        pause
        exit /b 1
    )
)

echo  [3/3] Masaustu kisayolu olusturuluyor...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0desktop\create-shortcut.ps1"
if errorlevel 1 (
    pause
    exit /b 1
)

echo.
echo  =====================================================
echo   Kurulum tamamlandi!
echo   Masaustunuzdeki "ShadowSec" simgesine cift tiklayin.
echo  =====================================================
echo.
choice /C EH /M "Uygulamayi simdi baslatmak ister misiniz (E/H)"
if errorlevel 2 exit /b 0
start "" "node_modules\electron\dist\electron.exe" "%~dp0."
exit /b 0
