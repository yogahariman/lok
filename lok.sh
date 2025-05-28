#!/bin/bash
#chmod +x lok.sh
#./lok.sh user1 user2 user3
#firefox -P --new-window https://www.google.com/ -width 700 -height 600 --no-remote
#firefox -P --new-window https://play.leagueofkingdoms.com/ -width 850 -height 625

# Fungsi untuk membuka Firefox dengan profil dan URL dalam jendela baru
launch_firefox() {
    local profile=$1
    echo "Menjalankan Firefox dengan profile: $profile"
    firefox -P "$profile" --new-window "https://www.google.com/" -width 700 -height 600 --no-remote &
    sleep 5  # jeda 5 detik antar launching
}

# Loop melalui semua argumen yang diberikan ke script
for profile in "$@"; do
    launch_firefox "$profile"
done

