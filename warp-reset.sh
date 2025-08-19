# restIP.sh
warp-cli disconnect
sleep 3
warp-cli registration delete
sleep 3
warp-cli registration new
#warp-cli registration license vn1s79T2-L0nS217q-zu5a049W
#service systemd-resolved restart
sleep 3
warp-cli connect
#warp-cli mode warp+doh
#warp-cli dns families off
sleep 5
#curl https://www.cloudflare.com/cdn-cgi/trace/
curl ifconfig.co/
sleep 5
curl ifconfig.co/city
now=$(date +"%T")
echo "Current time : $now"
