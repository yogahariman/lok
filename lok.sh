#!/bin/bash
# chmod +x lok.sh
# ./lok.sh user1 user2 user3
# sudo apt-get install wmctrl xdotool

# Ukuran jendela Firefox
window_width=750
window_height=1050

# Fungsi untuk membuka Firefox dan memindahkan ke kanan layar
launch_firefox() {
    local profile=$1
    echo "Menjalankan Firefox dengan profile: $profile"
    
    # Jalankan Firefox di background
    firefox -P "$profile" --new-window "https://www.google.com/" -width "$window_width" -height "$window_height" --no-remote &
    
    local pid=$!
    sleep 10  # Tunggu Firefox terbuka

    # Ambil ID jendela berdasarkan PID
    win_id=$(xdotool search --sync --all --pid $pid --onlyvisible | head -n 1)
    
    if [ -n "$win_id" ]; then
        echo "Memindahkan jendela $win_id ke sisi kanan layar"
        screen_width=$(xdotool getdisplaygeometry | awk '{print $1}')
        target_x=$((screen_width - window_width))
        xdotool windowmove "$win_id" "$target_x" 0
    else
        echo "Gagal menemukan jendela Firefox untuk profile: $profile"
    fi
}

# Loop melalui semua profil yang diberikan sebagai argumen
for profile in "$@"; do
    launch_firefox "$profile"
done



# #!/bin/bash
# #chmod +x lok.sh
# #./lok.sh user1 user2 user3
# #firefox -P --new-window https://www.google.com/ -width 700 -height 600 --no-remote
# #firefox -P --new-window https://play.leagueofkingdoms.com/ -width 850 -height 625

# # Fungsi untuk membuka Firefox dengan profil dan URL dalam jendela baru
# launch_firefox() {
#     local profile=$1
#     echo "Menjalankan Firefox dengan profile: $profile"
#     firefox -P "$profile" --new-window "https://www.google.com/" -width 750 -height 1050 --no-remote &
#     sleep 5  # jeda 5 detik antar launching
# }

# # Loop melalui semua argumen yang diberikan ke script
# for profile in "$@"; do
#     launch_firefox "$profile"
# done

