# sshd-auth-password-delay

created: 20221030 updated: 20221030 authors: allick97

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