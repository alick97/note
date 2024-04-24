# iptables use linux as windows gateway and forward target connect to linux local port

created: 20240425 updated: 20240425 authors: alick97

---

#### background
- use linux as gateway
- window10 pc config gateway to linux
- window10 connect to public ip port 112.60.14.252:6666, linux not send this connect, redirect it to local
- router ip 192.168.31.1
- linux ip 192.168.31.158
- window10 ip 192.168.31.172
- window10 and linux connect to router


#### in win, config window10 gateway
- control panel -> internat -> connect -> property -> TCP/IPv4 -> property
```
ip 192.168.31.172
netmask 255.255.255.0
gateway 192.168.31.158   (linux pc ip)
```

dns server
```
114.114.114.114
8.8.8.8
```
#### in linux config forward and start http server
- config ip forward
```
sysctl -w net.ipv4.ip_forward=1
```
- config redirect rule by iptables
```
sudo iptables -t nat -A PREROUTING -p tcp -d 112.60.14.252 --dport 6666 -j DNAT --to 192.168.31.158:7777
sudo service iptables restart
```
- start demo server in linux
```
python3 -m http.server  7777
```

#### in win, access target url
- in browser access ```http://112.60.14.252:6666/```
- all will be sended to linux 7777 port
- in wireshark see ```ip.addr == 112.60.14.252```

#### more iptables
> http://cn.linux.vbird.org/linux_server/0250simple_firewall.php#nat_what

> https://www.karlrupp.net/en/computer/nat_tutorial