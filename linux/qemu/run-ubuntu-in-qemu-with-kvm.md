# run ubuntu in qemu with kvm

{% tag 'created','20240107' %} {% endtag %} {% tag 'updated','20240107' %} {% endtag %} {% tag 'authors','alick' %} {% endtag %}

---

#### download ubuntu iso
```
aria2c -c -x 10 -j 10 http://cdimage.ubuntu.com/ubuntu/releases/18.04/release/ubuntu-18.04.3-server-amd64.iso.torrent
```
#### create hda disk and load img to setup system
```
qemu-img create vdisk.img 10G
qemu-system-x86_64 -cpu host -enable-kvm -hda vdisk.img -cdrom ./ubuntu-18.04.3-server-amd64.iso -boot d -m 4096
```
#### start installed system and just in console with ssh port
```
qemu-system-x86_64 -cpu host -enable-kvm -hda vdisk.img -boot c -m 4096  -nographic \
    -nic user,hostfwd=tcp:127.0.0.1:4022-:22 

```

> https://qemu-project.gitlab.io/qemu/system/images.html

> https://serverfault.com/questions/471719/how-to-start-qemu-directly-in-the-console-not-in-curses-or-sdl

```
You can update GRUB to pass the required options to the kernel. I'm using Ubuntu 18.04, and I did the following:

Update grub in the guest OS:

sudoedit /etc/default/grub

Change GRUB_CMDLINE_LINUX="" to GRUB_CMDLINE_LINUX="console=tty0 console=ttyS0,9600n8"
run sudo update-grub
```
