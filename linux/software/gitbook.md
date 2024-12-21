# gitbook

{% tag 'created','20221001' %} {% endtag %} {% tag 'updated','20230305' %} {% endtag %} {% tag 'authors','alick97' %} {% endtag %}

---
> note: gitbook-cli is legacy, suggest using [honkit](https://github.com/honkit/honkit) which is gitbook alternatives

preview markdown file in cli
###### in ubuntu16.04

#### 1. 安装 node.js
```
download node.js from https://nodejs.org/en/
wget https://nodejs.org/dist/v8.9.4/node-v8.9.4-linux-x64.tar.xz
xz -d node-v8.9.4-linux-x64.tar.xz
tar -xvf node-v8.9.4-linux-x64.tar

移动到指定的位置，创建软链接后，方便下次设置path环境变量后直接启动
mv node-v8.9.4-linux-x64 ~/.bin
创建软连接
ln -s ~/.bin/node-v8.9.3-linux-x64/bin/npm ~/.bin/npm
ln -s ~/.bin/node-v8.9.3-linux-x64/bin/node ~/.bin/node
ln -s ~/node-v8.9.3-linux-x64/bin/gitbook ~/.bin/gitbook

ls
lrwxrwxrwx  1 alick alick    50 1月   3 02:16 gitbook -> /home/alick/.bin/node-v8.9.3-linux-x64/bin/gitbook*
lrwxrwxrwx  1 alick alick    47 1月   3 02:13 node -> /home/alick/.bin/node-v8.9.3-linux-x64/bin/node*
drwxrwxr-x  7 alick alick  4096 1月   3 02:14 node-v8.9.3-linux-x64/
lrwxrwxrwx  1 alick alick    46 1月   3 02:11 npm -> /home/alick/.bin/node-v8.9.3-linux-x64/bin/npm*
设置 path 方便shell中直接使用
在 ~/.bashrc 中添加
export PATH=/home/alick/.bin:$PATH
```
#### 2. 安装gitbook-cli和使用
> [官网链接](https://toolchain.gitbook.com/setup.html)

1. install GitBook:
```
$ npm install gitbook-cli -g
```
gitbook-cli is an utility to install and use multiple versions of GitBook on the same system. It will automatically install the required version of GitBook to build a book.
Create a book

2. GitBook can setup a boilerplate book:
```
$ gitbook init
```
If you wish to create the book into a new directory, you can do so by running gitbook init ./directory

3. Preview and serve your book using:
```
$ gitbook serve
```

4. Or build the static website using:
```
$ gitbook build
```
Install pre-releases

5. gitbook-cli makes it easy to download and install other versions of GitBook to test with your book:
```
$ gitbook fetch beta
```
Use gitbook ls-remote to list remote versions available for install.

6. Debugging
You can use the options --log=debug and --debug to get better error messages (with stack trace). For example:
```
$ gitbook build ./ --log=debug --debug
```

#### export to pdf
#### prepartion in ubuntu
```
sudo apt install calibre
```
#### when use chinese, you need one chinese font at least for export to pdf

You can simply run cmd below:
```
sudo apt install ttf-wqy-microhei
```
or download font files to ```~/.fonts``` and run ```fc-cache -f -v```
#### run cmd
```
gitbook pdf ./ t.pdf
```