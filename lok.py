import subprocess
import time
import pyautogui
import pygetwindow as gw

jumlah_profil = 7
firefox_path = r"C:\Program Files\Mozilla Firefox\firefox.exe"
url = "https://play.leagueofkingdoms.com/"
window_width = "900"
window_height = "980"

def minimize_firefox():
    for win in gw.getAllTitles():
        if "Firefox" in win:
            w = gw.getWindowsWithTitle(win)[0]
            w.minimize()

def refresh_firefox():
    pyautogui.hotkey('f5')

for i in range(1, jumlah_profil + 1):
    profile = f"user{i}"
    print(f"Menjalankan profil: {profile}")

    # buka firefox
    subprocess.Popen([
        firefox_path,
        "-P", profile,
        "--no-remote",
        "-width", window_width,
        "-height", window_height,
        url
    ])

    # Tunggu Firefox buka tab
    time.sleep(10)

    # Refresh F5
    print("Refresh...")
    refresh_firefox()

    # Tunggu 90 detik
    print("Menunggu 90 detik...")
    time.sleep(90)

    # Minimize semua Firefox
    print("Minimize Firefox...")
    minimize_firefox()

print("Selesai.")
