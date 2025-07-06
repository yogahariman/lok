@echo off
title Menjalankan jalan.py dengan Virtual Env

echo [INFO] Mengaktifkan virtual environment...
call C:\Users\user\my_env\Scripts\activate.bat

echo [INFO] Menjalankan script jalan.py...
python C:\Users\user\jalan.py

echo [INFO] Selesai. Menonaktifkan environment...
call deactivate

echo.
echo [SELESAI] Tekan tombol apa saja untuk keluar.
pause
