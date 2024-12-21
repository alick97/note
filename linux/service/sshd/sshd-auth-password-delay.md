# sshd-auth-password-delay

{% tag 'created','20221030' %} {% endtag %} {% tag 'updated','20221030' %} {% endtag %} {% tag 'authors','alick97' %} {% endtag %}

---

#### config delay when password auth failed
##### check pam_faildelay.so installed
```
locate pam_faildelay.so
```
##### config pam sshd
```
sudo vim /etc/pam.d/sshd
```
add line to top
```
auth  required  pam_faildelay.so  delay=60000000
```
delay unit is us, 60000000 means 1min

#### Note
> https://stackoverflow.com/questions/69823279/why-is-pam-faildelay-so-not-taking-effect-if-user-clicks-cancel-button