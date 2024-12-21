# create or resize linux swap

{% tag 'created','20240211' %} {% endtag %} {% tag 'updated','20240211' %} {% endtag %} {% tag 'authors','alick97' %} {% endtag %}

---
### how to resize swap
#### create new swap file eg: 8GB
- create empty file
```
sudo dd if=/dev/zero of=/swapfile.img bs=1024 count=8M
sudo chmod 600 /swapfile.img
```
- change format to swap
```
sudo mkswap /swapfile.img
```
- mount to filesystem
```
sudo swapon /swapfile.img
```
- set for reboot
```
# vim /etc/fstab
# add line
/swapfile.img                                 none            swap    sw              0       0
```

#### if exist old swap, stop it and delete it.
- check it
```
cat /etc/fatab
```
- stop it, eg: it is /swapfile
```
sudo swapoff /swapfile
```
- remove if from tab for reboot
```
# vim /etc/fstab
# find line /swapfile and remove line
```
- remove file
```
sudo rm /swapfile
```