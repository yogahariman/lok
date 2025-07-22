import requests
import time
import subprocess
import platform
from datetime import datetime

CHECK_INTERVAL = 60  # 1 menit

def timestamp():
    return datetime.now().strftime("[%Y-%m-%d %H:%M:%S]")

def get_current_ip():
    try:
        response = requests.get('https://api.ipify.org', timeout=5)
        return response.text.strip()
    except Exception as e:
        print(f"{timestamp()} Gagal mengambil IP:", e)
        return None

def kill_browser():
    os_name = platform.system()
    print(f"{timestamp()} Menutup browser karena IP berubah...")

    if os_name == "Windows":
        subprocess.call(['taskkill', '/F', '/IM', 'firefox.exe'])
        subprocess.call(['taskkill', '/F', '/IM', 'chrome.exe'])
        subprocess.call(['taskkill', '/F', '/IM', 'msedge.exe'])
    elif os_name == "Linux":
        subprocess.call(['pkill', 'firefox'])
        subprocess.call(['pkill', 'chrome'])
    elif os_name == "Darwin":  # macOS
        subprocess.call(['pkill', 'Firefox'])
        subprocess.call(['pkill', 'Google Chrome'])

if __name__ == "__main__":
    print(f"{timestamp()} Mengambil IP awal sebagai acuan...")
    base_ip = get_current_ip()
    if not base_ip:
        print(f"{timestamp()} Tidak bisa mengambil IP awal. Keluar.")
        exit(1)

    print(f"{timestamp()} IP awal: {base_ip}")

    while True:
        time.sleep(CHECK_INTERVAL)
        current_ip = get_current_ip()

        if not current_ip:
            continue

        if current_ip != base_ip:
            print(f"{timestamp()} [IP BERUBAH] {base_ip} → {current_ip}")
            kill_browser()
            break  # Hentikan program
        else:
            print(f"{timestamp()} [IP SAMA] {current_ip}")
