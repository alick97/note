# ffmpeg

created: 20220129 updated: 20220129 authors: alick97

---

#### convert audio
```
ffmpeg -i my.m4a -acodec mp3 -ac 2 -ab 192k my.mp3
```
#### video 压缩帧率
```
ffmpeg -i VID_20181222_204902.mp4 -b:v 2000k  VID_20181222_204902_1000k.mp4
```
- [ffmpeg org link](https://ffmpeg.org/ffmpeg.html)
- 使用gpu https://www.jianshu.com/p/59da3d350488
```
ffmpeg -hwaccel cuvid -c:v h264_cuvid -noautorotate -i src.mp4 -c:v h264_nvenc -b:v 1024k dest.mp4
```
512k -> 300m film
1024k -> 600m film
