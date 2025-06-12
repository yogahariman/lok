#!/bin/bash
#chmod +x ksm_control.sh
#sudo ./ksm_control.sh start     # Untuk mengaktifkan
#sudo ./ksm_control.sh stop      # Untuk menonaktifkan
#sudo ./ksm_control.sh status    # Untuk melihat statistik

# Skrip kontrol KSM sederhana
# Digunakan untuk mengaktifkan, menonaktifkan, dan memantau penggunaan KSM

usage() {
    echo "Pemakaian:"
    echo "  $0 start        → Aktifkan KSM"
    echo "  $0 stop         → Nonaktifkan KSM"
    echo "  $0 status       → Tampilkan status dan statistik KSM"
    exit 1
}

if [ "$EUID" -ne 0 ]; then
    echo "Jalankan dengan sudo!"
    exit 1
fi

case "$1" in
    start)
        echo "Mengaktifkan KSM..."
        echo 1 > /sys/kernel/mm/ksm/run
        echo 100 > /sys/kernel/mm/ksm/sleep_millisecs
        echo "KSM diaktifkan dengan interval pemindaian 100 ms."
        ;;
    stop)
        echo "Menonaktifkan KSM..."
        echo 0 > /sys/kernel/mm/ksm/run
        echo "KSM dinonaktifkan."
        ;;
    status)
        echo "Status KSM:"
        echo "  Aktif       : $(cat /sys/kernel/mm/ksm/run)"
        echo "  pages_to_scan : $(cat /sys/kernel/mm/ksm/pages_to_scan)"
        echo "  sleep_millisecs: $(cat /sys/kernel/mm/ksm/sleep_millisecs)"
        echo "  pages_shared   : $(cat /sys/kernel/mm/ksm/pages_shared)"
        echo "  pages_sharing  : $(cat /sys/kernel/mm/ksm/pages_sharing)"
        echo "  pages_unshared : $(cat /sys/kernel/mm/ksm/pages_unshared)"
        echo "  pages_volatile : $(cat /sys/kernel/mm/ksm/pages_volatile)"
        ;;
    *)
        usage
        ;;
esac

