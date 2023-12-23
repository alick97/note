# android terminal emulator termux

created: 20230325 updated: 20230325 authors: alick97

---
[termux official link](https://termux.dev/en/)

#### run nc server for pc connect to android
##### On android ‘server’ side:
```
$ rm -f /tmp/f; mkfifo /tmp/f
$ cat /tmp/f | /bin/sh -i 2>&1 | nc -l 0.0.0.0 4444 > /tmp/f
```
##### On pc ‘client’ side:
```
$ nc [phone-ip] 4444
```

#### run sshd for pc connect to android
##### On android
```
pkg upgrade
pkg install openssh
sshd -p 4444
```
> [see remote acess by ssh](https://wiki.termux.com/wiki/Remote_Access#SSH)

#### run x86 docker in qemu vm without rooting android
> Install Docker on Termux, if link missing, you can search keyword to find same tutoral. [link](https://gist.github.com/oofnikj/e79aef095cd08756f7f26ed244355d62)

> [alpinelinux](https://wiki.alpinelinux.org/wiki/Configure_Networking)
> [install alpine in qemu](https://wiki.alpinelinux.org/wiki/Install_Alpine_in_QEMU)

