# linux capabilities

created: 20240113 updated: 20240113 authors: alick97

---

#### setcap to program for running program without root

##### example running nethogs without root
- not setting cap
```
alick@alick-pc:/tmp$ nethogs 
To run nethogs without being root you need to enable capabilities on the program (cap_net_admin, cap_net_raw), see the documentation for details.
```
- set cap to execute file. now run program without root
```
alick@alick-pc:/tmp$ sudo setcap   'cap_net_admin+eip cap_net_raw+eip' /usr/sbin/nethogs
```

- example for delete cap
```
alick@alick-pc:/tmp$ sudo setcap   'cap_net_admin-eip cap_net_raw-eip' /usr/sbin/nethogs
```


#### reference:
- [man 8 capabilities](https://man7.org/linux/man-pages/man7/capabilities.7.html)
- [man 8 setcap](https://man7.org/linux/man-pages/man8/setcap.8.html)
- [man 3 cap_from_text](https://man7.org/linux/man-pages/man3/cap_from_text.3.html)


