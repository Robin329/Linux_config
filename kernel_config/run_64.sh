qemu-system-aarch64 -machine virt -cpu cortex-a57	-machine type=virt \
		-m 512	-smp 8 -kernel arch/arm64/boot/Image \
		--append "rdinit=/linuxrc console=ttyAMA0" 	-nographic \
#--fsdev local,id=kmod_dev,path=$PWD/kmodules,security_model=none \
#-device virtio-9p-device,fsdev=kmod_dev,mount_tag=kmod_mount \
