@echo off
echo === Resetting WARP and Checking IP ===

:: Disconnect
warp-cli disconnect
timeout /t 3 >nul

:: Delete registration
warp-cli registration delete
timeout /t 3 >nul

:: New registration
warp-cli registration new
:: warp-cli set-license vn1s79T2-L0nS217q-zu5a049W   (kalau mau pakai license, hapus "::")

timeout /t 3 >nul

:: Connect again
warp-cli connect
:: warp-cli mode warp+doh
:: warp-cli dns families off

timeout /t 5 >nul

:: Check IP
curl ifconfig.co/
timeout /t 5 >nul
curl ifconfig.co/city

:: Show current time
for /f "tokens=1-2 delims==" %%a in ('wmic os get localdatetime /value') do (
    if "%%a"=="LocalDateTime" set ldt=%%b
)
set now=%ldt:~8,2%:%ldt:~10,2%:%ldt:~12,2%
echo Current time : %now%

echo.
echo === Done! ===
pause
