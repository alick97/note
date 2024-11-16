# fix laptops 4 pin 3.5mm microphone is not detected issue

created: 20241117 updated: 20241117 authors: alick97
   
---

> [see Correctly detect microphone plugged in a 4-pin 3.5mm xxx](https://wiki.archlinux.org/title/Advanced_Linux_Sound_Architecture#Correctly_detect_microphone_plugged_in_a_4-pin_3.5mm_(TRRS)_jack) in alsa(Advanced Linux Sound Architecture) document.

#### fix my acer aspire E1-570G laptops step by step
- my linux use alsa sound system and can play sound but can not use microphone.
- list sound card and found use device ALC282

  ```
  aplay -l
  ```
  
  ```
  *** List of PLAYBACK Hardware Devices ****
  card 0: PCH [HDA Intel PCH], device 0: ALC282 Analog [ALC282 Analog]
    Subdevices: 1/1
    Subdevice #0: subdevice #0
  card 0: PCH [HDA Intel PCH], device 3: HDMI 0 [HDMI 0]
    Subdevices: 1/1
    Subdevice #0: subdevice #0
  ```
- find alc282 driver for pc acre aspire e1
  visit [https://docs.kernel.org/sound/hd-audio/models.html](https://docs.kernel.org/sound/hd-audio/models.html) and find ALC22x/23x/25x/269/27x/28x/29x (and vendor-specific ALC3xxx models) title. This one acer-aspire-e1 (Acer Aspire E1 fixups) is for my pc.
- add line to /etc/modprobe.d/alsa-base.conf

  ```
  options snd-hda-intel model=acer-aspire-e1
  ```
- reboot


