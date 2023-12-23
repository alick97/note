# ubuntu 设置过程记录
1. 安装 shadowsocket
```
sudo apt-get install python-pip
sudo pip install shadowsocks
```
2. 配置客户
local_port 自己随便配置， 其他的参数和服务器端的保持一致
```
alick@alick-ubuntu:~/workspace/vpn$ cat shadowsocks_g.json 
{
        "server":"144.48.141.168",
        "server_port":443,
        "local_address": "127.0.0.1",
        "local_port":1080,
        "password":"xxx",
        "timeout":600,
        "method":"aes-256-cfb"
}
```
3. 启动客户端
-d start 选项是让在后台运行， 调试查看log 可以先不加这个参数
```
alick@alick-ubuntu:~/workspace/vpn$ sudo sslocal -c shadowsocks_g.json -d start
```
到这里，已经支持socks5协议的代理， http的不支持

#### 检验方式:
- curl 

有代理的环境变量http_proxy， 端口1080是前边设置的本地端口， 可以设置其他，但是要和前面的保持一直
```
alick@alick-ubuntu:~$ http_proxy=socks5://localhost:1080 curl ip.gs
Current IP / 当前 IP: 144.48.141.168
ISP / 运营商:  serverrun.com
City / 城市:  Hong Kong
Country / 国家: China
IP.GS is now IP.SB, please visit https://ip.sb/ for more information. / IP.GS 已更改为 IP.SB ，请访问 https://ip.sb/ 获取更详细 IP 信息！
Please join Telegram group https://t.me/sbfans if you have any issues. / 如有问题，请加入 Telegram 群 https://t.me/sbfans 

  /\_/\
=( °w° )=
  )   (  //
 (__ __)//

```
- google-chrome 

google-chrome的代理参数[目前不起作用]
```
google-chrome --proxy-server="socks5://localhost:1080"
```
chromium[可以]
```
chromium --proxy-server="socks5://localhost:1080"
```
**到这里已经满足基本的功能**

4. 支持http协议的代理，使用http代理服务，这里使用polipo

- 安装软件
```
$ sudo apt-get install polipo
```
- 修改配置， 其中socksParentProxy 是之前shadowsocker代理的本地端口1080，这里对这个socks代理端口再代理， 转换成http协议代理端口， polipo本地代理端口默认为8123

```
alick@alick-ubuntu:~$ cat /etc/polipo/config 
# This file only needs to list configuration variables that deviate
# from the default values.  See /usr/share/doc/polipo/examples/config.sample
# and "polipo -v" for variables you can tweak and further information.

logSyslog = true
logFile = /var/log/polipo/polipo.log

# alick add beg
socksParentProxy = 127.0.0.1:1080
socksProxyType = socks5
logLevel=4
# alick add end

```
- 启动服务
```
 sudo service  polipo start
```
#### 检验
- curl

```
alick@alick-ubuntu:~$ http_proxy=http://localhost:8123 curl ip.gs
Current IP / 当前 IP: 144.48.141.168
ISP / 运营商:  serverrun.com
City / 城市:  Hong Kong
Country / 国家: China
IP.GS is now IP.SB, please visit https://ip.sb/ for more information. / IP.GS 已更改为 IP.SB ，请访问 https://ip.sb/ 获取更详细 IP 信息！
Please join Telegram group https://t.me/sbfans if you have any issues. / 如有问题，请加入 Telegram 群 https://t.me/sbfans 

  /\_/\
=( °w° )=
  )   (  //
 (__ __)//

```
- firfox

```
http_proxy=http://127.0.0.1:8123 firefox
```
**一般的shell环境都用 http_proxy 环境变量**

- google-chrome[设置不起作用， 先用chromiu]

```
chromium --proxy-server="http://localhost:8123"
```

5. 设置ubuntu的全局[不推荐]
在网络设置中，设置代理 填入http代理http://localhost:8123



#### 自己的启动脚本
```
#!/bin/bash -e

function show_help() {
    echo "my vpn service ctrl\

          usage: $0 [stop|start|-h|--help]
"
}

while getopts ":h-:" opt;do
    case "$opt" in
        h)
            show_help
            exit 0
            ;;
        -)
            opt=$OPTARG
            case $opt in
                start)
                     sudo sslocal -c /home/alick/workspace/vpn/shadowsocks_g.json -d restart
                     sudo service polipo restart
                    ;;
                stop)
                        sudo service polipo stop
                        sudo sslocal -c /home/alick/workspace/vpn/shadowsocks_g.json -d stop
                    ;;
                help)
                        show_help && exit 0;;
                *) echo "param error: $opt" && show_help && exit 1
                    ;;
            esac
                    ;;
        *)
            echo "error param" && show_help && exit 1
            ;;
        esac
done

shift $[$OPTIND -1]
if [ "$*" != "" ];then
    echo "param error: $@" && exit 1
fi

```

#### start chrome
```
alick@alick-ubuntu:~/.local/bin$ cat my_chrome 
#!/bin/bash -e
if [[ "`ps -ef | grep sslocal`" == "" ]] || [[ "`ps -e | grep polipo`" == "" ]];then
    my_proxy --stop
    my_proxy --start
fi
chromium --proxy-server="localhost:8123"
```

#### other record
https://blog.csdn.net/jdliyao/article/details/80609742
https://www.linuxbabe.com/desktop-linux/how-to-install-and-use-shadowsocks-command-line-client

#### 报错处理

> ShadowSocks启动报错undefined symbol EVP_CIPHER_CTX_cleanup
https://kionf.com/2016/12/15/errornote-ss/

```
ubuntu18.04中报错解决方法 ：
1. vim打开文件openssl.py
vim /usr/local/lib/python3.5/dist-packages/shadowsocks/crypto/openssl.py

路径不同根据报错路径而定

2. 修改libcrypto.EVP_CIPHER_CTX_cleanup.argtypes
:%s/cleanup/reset/

:x

以上两条为VIM命令， 替换文中libcrypto.EVP_CIPHER_CTX_cleanup.argtypes 为libcrypto.EVP_CIPHER_CTX_reset.argtypes 共两处，并保存

3. 运行Shadowsocks ok
```
#### 原因
```
这个问题是由于在openssl1.1.0版本中，废弃了EVP_CIPHER_CTX_cleanup函数，如官网中所说：

EVP_CIPHER_CTX was made opaque in OpenSSL 1.1.0. As a result, EVP_CIPHER_CTX_reset() appeared and EVP_CIPHER_CTX_cleanup() disappeared. EVP_CIPHER_CTX_init() remains as an alias for EVP_CIPHER_CTX_reset().

EVP_CIPHER_CTX_reset函数替代了EVP_CIPHER_CTX_cleanup函数

EVP_CIPHER_CTX_reset函数说明：

EVP_CIPHER_CTX_reset() clears all information from a cipher context and free up any allocated memory associate with it, except the ctx itself. This function should be called anytime ctx is to be reused for another EVP_CipherInit() / EVP_CipherUpdate() / EVP_CipherFinal() series of calls.

EVP_CIPHER_CTX_cleanup函数说明：

EVP_CIPHER_CTX_cleanup() clears all information from a cipher context and free up any allocated memory associate with it. It should be called after all operations using a cipher are complete so sensitive information does not remain in memory.

可以看出，二者功能基本上相同，都是释放内存，只是应该调用的时机稍有不同，所以用reset代替cleanup问题不大。
```
