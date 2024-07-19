# capture app https message simply

created: 20240719 updated: 20240719 authors: author

---

#### background information
- I want to get a black box app to call which api.
- This app install in win10.
- I work in linux and run win10 in virtualbox.

#### use software reqable as proxy to do MITM[Man in the Middle] 
> [reqable Advanced API Debugging Proxy](https://reqable.com/en-US/)


#### setup in linux
- install software reqable in linux, you can see proxying on 192.168.x.x:9000, config this later in win as proxy.
- export root ca file, in software reqable, run Certificate -> Root Certificate Management -> Export Root Public Certificate. this will export reqable-ca.crt file.
- click reqable start button.

#### setup in win10
- install dummy root CA to win10. 
    > [import certificate to trusted root authorities](https://superuser.com/questions/1596453/import-certificate-to-trusted-root-authorities-for-the-current-user-with-comman)

    > [example in chinese language link](https://cnzhx.net/blog/self-signed-certificate-as-trusted-root-ca-in-windows/)
- set win10 net proxy to software reqable

```
To set up a proxy manually:

Open Settings.
Click Network & Internet.
Click Proxy.
In the Manual Proxy Setup section, set the Use a Proxy Server switch to On.
In the Address field, type the IP address given to you by your network administrator.
In the Port field, type the port given to you by your network administrator.
Click Save, then close the Settings window. 
```

#### start capture
- run need capture app in win10
- see catpured message in reqable.


#### reference
- [https](https://en.wikipedia.org/wiki/HTTPS)
- [other good mitm toos mitmproxy](https://github.com/mitmproxy/mitmproxy)
