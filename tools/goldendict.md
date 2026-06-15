# goldendict

{% tag 'created','20230225' %} {% endtag %} {% tag 'updated','20260615' %} {% endtag %} {% tag 'authors','alick97' %} {% endtag %}

---

#### goldendict is a translation tools
- [link](https://github.com/goldendict/goldendict)
- Add offline dict, goldendict can use stardict files.

   [Download link](http://download.huzheng.org/)

   For chinese, i use these.
```
/opt/stardict/dic/
├── stardict-cedict-gb-2.4.2
├── stardict-HanYuChengYuCiDian-new_colors-2.4.2
├── stardict-langdao-ce-gb-2.4.2
├── stardict-langdao-ec-gb-2.4.2
├── stardict-lazyworm-ec-2.4.2
├── stardict-oald-cn-2.4.2
├── stardict-oxford-gb-formated-2.4.2
├── stardict-powerword2011_1_901-2.4.2
└── stardict-ProECCE-2.4.2
```
- Add plugin online translation [translate-shell](https://github.com/soimort/translate-shell)

In ubuntu, you can run below command:
```
sudo apt install translate-shell
```
Integration
  Config in Menu Edit -> Sources -> Dictionaries -> Programs
  
  |Type| Name| Command Line|
  |--|--|--|
  |Plain Text|trans-shell-zh|trans -x http://127.0.0.1:7890 -no-ansi -t zh  %GDWORD%|
  |Plain Text|trans-shell-en|trans -x http://127.0.0.1:7890 -no-ansi -t en  %GDWORD%|
  
- Or use in terminal, you can set alias
```
alias s='_s() { goldendict "$1"; unset -f _s; }; _s'
```
- For searching word in other app, you can select word in other app and input ```Ctrl + c + c```. Be sure of goldendict is opened firstly. 

### old goldendict is maintained slowly. when not run in new ubuntu, you can use new.
- new goldendict is [GoldenDict-ng](https://xiaoyifang.github.io/goldendict-ng/install/)
- linux install by flatpak
```
sudo apt update
sudo apt install flatpak
flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo
# change apk source for speed
# flatpak remote-modify flathub --url=https://mirrors.ustc.edu.cn/flathub/
# recover apk source
# flatpak remote-modify flathub --url=https://dl.flathub.org/repo/flathub
flatpak install flathub io.github.xiaoyifang.goldendict_ng -y
```
- shell alias
```
alias s='_s() { flatpak run --env=QTWEBENGINE_DISABLE_SANDBOX=1  --env=QT_QPA_PLATFORM=xcb  --env=QTWEBENGINE_CHROMIUM_FLAGS="--disable-gpu"  io.github.xiaoyifang.goldendict_ng "$1"; unset -f _s; }; _s'
```
- install trans
```
sudo apt install translate-shell
```
- dict program config, F3 -> sources->programs
```
# PlainText trans-shell-zh
sh -c "cd /tmp && flatpak-spawn --host  trans  -no-ansi -t zh %GDWORD%"
# PlainText trans-shell-en
sh -c "cd /tmp && flatpak-spawn --host   trans  -no-ansi -t en %GDWORD%"
```