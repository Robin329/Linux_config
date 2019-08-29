qemu-system-arm  \
        -M vexpress-a9 \
        -m 512M \
        -kernel arch/arm/boot/zImage \
        -dtb arch/arm/boot/dts/vexpress-v2p-ca9.dtb \
        -nographic \
        -append "rdinit=/linuxrc console=ttyAMA0 loglevel=8" \
