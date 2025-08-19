#!/bin/bash
# === Resetting WARP and Checking IP ===

# Disconnect
warp-cli disconnect
sleep 3

# Delete registration
warp-cli registration delete
sleep 3

# New registration
warp-cli registration new
# warp-cli set-license vn1s79T2-L0nS217q-zu5a049W   # kalau mau pakai license, hapus tanda #

sleep 3

# Connect again
warp-cli connect
# warp-cli mode warp+doh
# warp-cli dns families off

sleep 5

# Check IP
curl ifconfig.co/
sleep 5
curl ifconfig.co/city

# Show current time
now=$(date +"%H:%M:%S")
echo "Current time : $now"

echo
echo "=== Done! ==="
