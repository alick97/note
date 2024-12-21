# windows-config-hosts

{% tag 'created','20240411' %} {% endtag %} {% tag 'updated','20240411' %} {% endtag %} {% tag 'authors','alick' %} {% endtag %}

---

### env win10
- run edit as admin, edit C:\Windows\System32\drivers\etc\hosts file
- add host config eg:
```
192.168.31.158 a.local
```
- run in cmd, flush dns
```
ipconfig/flushdns
```
