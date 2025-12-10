@echo off
setlocal enabledelayedexpansion

:: Jumlah profil
set "jumlah_profil=7"

:: Path Firefox
set "firefox_path=C:\Program Files\Mozilla Firefox\firefox.exe"

:: Ukuran jendela manual (px)
set "window_width=900"
set "window_height=980"

:: Cek Firefox
if not exist "%firefox_path%" (
    echo Firefox tidak ditemukan di: %firefox_path%
    pause
    exit /b
)

:: Loop jalankan profil
for /L %%i in (1,1,%jumlah_profil%) do (
    set "profile=user%%i"
    echo Menjalankan Firefox dengan profil: !profile!
    start "" "%firefox_path%" -P "!profile!" --no-remote -width %window_width% -height %window_height%
    timeout /t 3 /nobreak >nul
)

echo Selesai menjalankan semua profil.
pause
