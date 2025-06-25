#conda activate lok
#pip install pyautogui
#pip install pynput
#python /Drive/D/LOK/jalan.py 

import time
import pyautogui
from pynput.keyboard import Key, Listener, KeyCode

#pyautogui.PAUSE = 2.5
x_mid=1480
#y_mid=330
y_top=174
y_battle1=300
y_battle2=400
y_battle3=500

#button alliance
x_alliance=1790
y_alliance=560

#battle tab
x_battle=1170
y_battle=290

#button Join
x_join=1485
y_join=565

#tab choose troops
x_troops1=1710 #1710,1765,1815,1875
y_troops1=225

#button March
x_march=1820
y_march=560

rg_kanan=400
rg_kiri=250
#rg_atasbawah=100
rg_atasbawah=400


def on_press(key):
    #print('{0} pressed'.format(key))
    check_key(key)

def on_release(key):
    #print('{0} release'.format(key))
    if key == Key.end:
        # Stop listener
        return False

def check_key(key):
    if key==Key.up: #Geser map ke atas 
        pyautogui.moveTo(x_mid, y_top, duration=0.0001)
        pyautogui.dragTo(x_mid, y_top+rg_atasbawah, duration=0.6, button='left')
    #if key==Key.down: #Geser map ke bawah
    #    pyautogui.moveTo(x_mid, y_mid+rg_atasbawah, duration=0.0001)
    #    pyautogui.dragTo(x_mid, y_mid, duration=0.7, button='left')
    #if key==Key.right: #Geser map ke kanan  
    #    pyautogui.moveTo(x_mid+rg_kanan, y_mid, duration=0.0001)
    #    pyautogui.dragTo(x_mid-rg_kiri, y_mid, duration=1, button='left')
    #if key==Key.left: #Geser map ke kiri
    #    pyautogui.moveTo(x_mid-rg_kiri, y_mid, duration=0.0001)
    #    pyautogui.dragTo(x_mid+rg_kanan, y_mid, duration=1, button='left')
    if key==KeyCode.from_char('p'): #mouse position
        x, y = pyautogui.position()
        print('X : {0} Y : {1} '.format(x,y))
# Collect events until released
with Listener(
        on_press=on_press,
        on_release=on_release) as listener:
    listener.join()
