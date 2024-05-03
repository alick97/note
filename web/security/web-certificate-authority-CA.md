# web certificate authority (CA)

created: 20240502 updated: 20240502 authors: alick97

---

#### get url ca chain
```
echo quit | openssl  s_client -showcerts -connect qq.com:443|less
```

#### extract info from pem
```
x509 -in DigiCert_Global_Root_CA.crt -pubkey  -text|less
```
#### get issue public key from pem
```
 x509 -pubkey -noout -in DigiCert_Global_Root_CA.crt |sed '1d;$d'| base64 -d| openssl sha256 
SHA256(stdin)= aff988906dde12955d9bebbf928fdcc31cce328d5b9384f21c8941ca26e20391

```


#### Reference
> https://en.wikipedia.org/wiki/X.509

> https://en.wikipedia.org/wiki/Public_key_certificate

> https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security

> https://daniel.haxx.se/blog/2018/11/07/get-the-ca-cert-for-curl/
