# goldendict

{% tag 'created','20230225' %} {% endtag %} {% tag 'updated','20230225' %} {% endtag %} {% tag 'authors','alick97' %} {% endtag %}

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