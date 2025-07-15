#conda activate lok
#pip install pyautogui
#pip install pynput
#python /Drive/D/LOK/jalan.py

from pynput.keyboard import Key, Listener, KeyCode
import pyautogui

# Posisi awal drag (misalnya di tengah layar)
drag_start_x = 1550  # ganti sesuai resolusi layar kamu
drag_start_y = 370

drag_distance = 400  # seberapa jauh drag dilakukan
drag_duration = 0.3  # waktu durasi drag

def geser_map(arah):

    if arah == 'atas':
        pyautogui.moveTo(drag_start_x, drag_start_y-175)
        pyautogui.mouseDown()
        pyautogui.dragRel(0, drag_distance, duration=drag_duration)  # drag ke bawah → map ke atas
    #elif arah == 'bawah':
        #pyautogui.dragRel(0, -drag_distance, duration=drag_duration)  # drag ke atas → map ke bawah
    #elif arah == 'kiri':
    #    pyautogui.dragRel(drag_distance, 0, duration=drag_duration)  # drag ke kanan → map ke kiri
    elif arah == 'kanan':
        pyautogui.moveTo(drag_start_x+360, drag_start_y)
        pyautogui.mouseDown()
        pyautogui.dragRel(-drag_distance, 0, duration=drag_duration)  # drag ke kiri → map ke kanan

    pyautogui.mouseUp()

def on_press(key):
    try:
        if key == Key.up:
            geser_map('atas')
        elif key == Key.down:
            geser_map('bawah')
        elif key == Key.left:
            geser_map('kiri')
        elif key == Key.right:
            geser_map('kanan')
        elif key==KeyCode.from_char('p'): #mouse position
            x, y = pyautogui.position()
            print('X : {0} Y : {1} '.format(x,y))            
    except:
        pass

def on_release(key):
    if key == Key.esc:
        return False  # keluar dari script kalau tekan ESC

print("Tekan panah arah untuk geser map. Tekan ESC untuk keluar.")
with Listener(on_press=on_press, on_release=on_release) as listener:
    listener.join()


# import time
# import pyautogui
# from pynput.keyboard import Key, Listener, KeyCode

# #pyautogui.PAUSE = 2.5
# x_mid=1550
# y_mid=330
# y_top=200

# rg_kanan=330
# rg_kiri=200
# rg_atasbawah=400


# def on_press(key):
#     #print('{0} pressed'.format(key))
#     check_key(key)

# def on_release(key):
#     #print('{0} release'.format(key))
#     if key == Key.end:
#         # Stop listener
#         return False

# def check_key(key):
#     if key==Key.up: #Geser map ke atas 
#         pyautogui.moveTo(x_mid, y_top, duration=0.0001)
#         pyautogui.dragTo(x_mid, y_top+rg_atasbawah, duration=0.6, button='left')
#     if key==Key.down: #Geser map ke bawah
#         pyautogui.moveTo(x_mid, y_mid+rg_atasbawah, duration=0.0001)
#         pyautogui.dragTo(x_mid, y_mid, duration=0.7, button='left')
#     if key==Key.right: #Geser map ke kanan  
#         #pyautogui.moveTo(x_mid+rg_kanan, y_mid, duration=0.0001)
#         #pyautogui.dragTo(x_mid-rg_kiri, y_mid, duration=1, button='left')
#         pyautogui.moveTo(500, 330, duration=0.0001)
#     if key==Key.left: #Geser map ke kiri
#         pyautogui.moveTo(x_mid-rg_kiri, y_mid, duration=0.0001)
#         pyautogui.dragTo(x_mid+rg_kanan, y_mid, duration=1, button='left')
#     if key==KeyCode.from_char('p'): #mouse position
#         x, y = pyautogui.position()
#         print('X : {0} Y : {1} '.format(x,y))
# # Collect events until released
# with Listener(
#         on_press=on_press,
#         on_release=on_release) as listener:
#     listener.join()
