# decompiler android app

{% tag 'created','20240723' %} {% endtag %} {% tag 'updated','20240723' %} {% endtag %} {% tag 'authors','alick97' %} {% endtag %}

---
- unzip app file
- find classes.dex file
- download https://github.com/pxb1988/dex2jar/releases
- unzip dex-tools-v2.4 and mv to /opt/
- ```/opt/dex-tools-v2.4/d2j-dex2jar.sh -f classes.dex```
- find *.jar
- download https://github.com/java-decompiler/jd-gui/releases
- start jd-gui and mv xx.jar to it
