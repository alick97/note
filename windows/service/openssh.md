### openssh

created: 20221023 updated: 20221023 authors: alick

---

##### in win7
##### 基本操作
- [link](https://wuooyun.cn/2019/04/12/how-to-install-openssh-on-windows/)
##### 修改配置
连接拒绝 注释掉对应的配置 c:\ProgramData\ssh\sshd_config
```
Match User
Match Group
```
#### 使用git bash
- need install git in windows before
- login cmd
```
ssh alick@192.168.1.12 'C:\alick\software\Git\bin\bash.exe -i'
```



