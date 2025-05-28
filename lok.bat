:: lok.bat user1 user2 user3
@echo off
setlocal enabledelayedexpansion

:: Fungsi untuk menjalankan Firefox dengan profil dan URL
:launch_firefox
set "profile=%~1"
echo Menjalankan Firefox dengan profil: %profile%
start "" "C:\Program Files\Mozilla Firefox\firefox.exe" -P "%profile%" --new-window "https://www.google.com/" -width 700 -height 600 --no-remote
timeout /t 5 >nul
goto :eof

:: Loop untuk semua argumen
for %%p in (%*) do (
    call :launch_firefox %%p
)

endlocal
pause
