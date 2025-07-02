#!/bin/bash
# chmod +x lok.sh
# ./lok.sh user1 user2 user3
# sudo apt-get install wmctrl xdotool


# Konfigurasi dalam persentase
window_width_percent=40    # % dari lebar layar
window_height_percent=100  # % dari tinggi layar

# Ambil resolusi layar
read screen_width screen_height < <(xdotool getdisplaygeometry)

# Hitung ukuran jendela berdasarkan persentase
window_width=$((screen_width * window_width_percent / 100))
window_height=$((screen_height * window_height_percent / 100))

echo "Resolusi layar: ${screen_width}x${screen_height}"
echo "Ukuran jendela Firefox: ${window_width}x${window_height} (${window_width_percent}% x ${window_height_percent}%)"

# Fungsi untuk membuka Firefox dan memindahkan ke kanan layar
launch_firefox() {
    local profile=$1
    echo "Menjalankan Firefox dengan profile: $profile"
    
    # Jalankan Firefox di background
    firefox -P "$profile" --new-window "https://www.google.com/" -width "$window_width" -height "$window_height" --no-remote &
    
    local pid=$!
    sleep 5  # Tunggu Firefox terbuka

    # Ambil ID jendela berdasarkan PID
    win_id=$(xdotool search --sync --all --pid $pid --onlyvisible | head -n 1)
    
    if [ -n "$win_id" ]; then
        echo "Memindahkan jendela $win_id ke sisi kanan layar"
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
