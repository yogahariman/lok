from pynput.keyboard import Key, Listener
import pyautogui
import time
import threading
import sys
import json
import os
import math

# ===============================
# Load XY Target dari JSON
# ===============================
JSON_FILE = "xy_target.json"

if not os.path.exists(JSON_FILE):
    print(f"❌ File {JSON_FILE} tidak ditemukan")
    sys.exit(1)

with open(JSON_FILE, "r") as f:
    data = json.load(f)

# Center
center = data.get("center", {"x": 1000, "y": 1000})
cx, cy = center["x"], center["y"]

# Targets
xy_targets = [(t["x"], t["y"]) for t in data.get("targets", [])]

if not xy_targets:
    print("❌ xy_targets kosong")
    sys.exit(1)

# ===============================
# Euclidean Distance
# ===============================
def euclidean_distance(x, y):
    return math.sqrt((x - cx) ** 2 + (y - cy) ** 2)

# Sort: terdekat → terjauh
xy_targets.sort(key=lambda p: euclidean_distance(p[0], p[1]))

print(f"🎯 Center : ({cx}, {cy})")
print("📍 Target terurut:")
for i, (x, y) in enumerate(xy_targets, 1):
    print(f"{i}. ({x}, {y}) | d = {euclidean_distance(x, y):.2f}")

# ===============================
# Control Flags
# ===============================
running = False
exit_program = False

# ===============================
# Main Automation Loop
# ===============================
def automation_loop():
    global running, exit_program

    while not exit_program:
        if not running:
            time.sleep(0.2)
            continue

        for xx, yy in xy_targets:
            if not running or exit_program:
                break

            print(f"➡ Move to ({xx}, {yy})")

            # 1. Klik field koordinat (sesuaikan posisi)
            pyautogui.moveTo(1539, 475, duration=0.2)
            pyautogui.click()
            time.sleep(0.2)

            # 2. Input X
            pyautogui.typewrite(str(xx))
            time.sleep(0.2)

            # 3. TAB
            pyautogui.press("tab")
            time.sleep(0.2)

            # 4. Input Y
            pyautogui.typewrite(str(yy))
            time.sleep(0.2)

            # 5. ENTER
            pyautogui.press("enter")

            # 6. Delay antar target
            time.sleep(1.5)

        running = False
        print("⏹ Selesai satu putaran")

# ===============================
# Keyboard Listener
# ===============================
pressed_keys = set()

def on_press(key):
    global running, exit_program
    pressed_keys.add(key)

    # ⛔ EXIT TOTAL (Ctrl + End)
    if (Key.ctrl_l in pressed_keys or Key.ctrl_r in pressed_keys) and key == Key.end:
        print("⛔ EXIT PROGRAM")
        exit_program = True
        return False

    # ▶ START
    if key == Key.home:
        running = True
        print("▶ START")

    # ⏸ PAUSE
    elif key == Key.end:
        running = False
        print("⏸ PAUSE")

def on_release(key):
    pressed_keys.discard(key)

# ===============================
# Run
# ===============================
threading.Thread(target=automation_loop, daemon=True).start()

with Listener(on_press=on_press, on_release=on_release) as listener:
    listener.join()

sys.exit()
