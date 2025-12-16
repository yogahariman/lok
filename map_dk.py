from pynput.keyboard import Key, Listener
import pyautogui
import time
import threading
import sys

# ===============================
# Konfigurasi XY Target
# ===============================
x_start, x_stop, x_step = 350, 1650, 100
y_start, y_stop, y_step = 650, 1550, 100

xy_targets = []
for xx in range(x_start, x_stop + 1, x_step):
    for yy in range(y_start, y_stop + 1, y_step):
        xy_targets.append((xx, yy))

# ===============================
# Control Flags
# ===============================
running = False
exit_program = False
current_index = 0   # ⬅️ SIMPAN POSISI TERAKHIR

# ===============================
# Main Automation Loop
# ===============================
def automation_loop():
    global running, exit_program, current_index

    while not exit_program:
        if not running:
            time.sleep(0.2)
            continue

        while current_index < len(xy_targets):
            if not running or exit_program:
                break

            xx, yy = xy_targets[current_index]

            # 1. Move cursor to fixed coordinate
            pyautogui.moveTo(1539, 475, duration=0.2)
            pyautogui.click()
            time.sleep(0.2)

            # 2. Input xx
            pyautogui.typewrite(str(xx))
            time.sleep(0.2)

            # 3. TAB
            pyautogui.press('tab')
            time.sleep(0.2)

            # 4. Input yy
            pyautogui.typewrite(str(yy))
            time.sleep(0.2)

            # 5. ENTER
            pyautogui.press('enter')

            # 6. Pause
            time.sleep(1.5)

            current_index += 1  # ⬅️ LANJUT KE STEP BERIKUTNYA

        # Jika selesai semua target → reset
        if current_index >= len(xy_targets):
            print("✅ SEMUA TARGET SELESAI")
            running = False
            current_index = 0

# ===============================
# Keyboard Listener
# ===============================
pressed_keys = set()

def on_press(key):
    global running, exit_program

    pressed_keys.add(key)

    # ⛔ EXIT TOTAL (CTRL + END)
    if (Key.ctrl_l in pressed_keys or Key.ctrl_r in pressed_keys) and key == Key.end:
        print("⛔ EXIT PROGRAM")
        exit_program = True
        return False

    # ▶⏸ TOGGLE START / PAUSE (HOME)
    if key == Key.home:
        running = not running
        state = "▶ START / RESUME" if running else "⏸ PAUSE"
        print(f"{state} (index {current_index})")    

    # # ▶ START / RESUME
    # elif key == Key.home:
    #     running = True
    #     print(f"▶ START / RESUME dari index {current_index}")

    # # ⏸ PAUSE
    # elif key == Key.end:
    #     running = False
    #     print(f"⏸ PAUSE di index {current_index}")

def on_release(key):
    if key in pressed_keys:
        pressed_keys.remove(key)

# ===============================
# Run Threads
# ===============================
threading.Thread(target=automation_loop, daemon=True).start()

with Listener(on_press=on_press, on_release=on_release) as listener:
    listener.join()

sys.exit()