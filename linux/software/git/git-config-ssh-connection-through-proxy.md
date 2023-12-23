# git-config-ssh-connection-through-proxy

created: 20221217 updated: 20221217 authors: alick97

---

issue: cannot connect to github.com port 22 through ssh directly some times in china.

solved methods:

> https://stackoverflow.com/questions/19161960/connect-with-ssh-through-a-proxy

#### config ssh command in file ~/.ssh/config

> change 127.0.0.1:1089 to your proxy address
```
Host github.com
ProxyCommand nc -x 127.0.0.1:1089 %h %p
```