#### 查看温度
##### 第一次要更新检测配置
```
sudo sensors-detect
```
##### 查看温度
```
sensors
```
输出
```
Core 0:        +49.0°C  (high = +100.0°C, crit = +100.0°C)
Core 1:        +49.0°C  (high = +100.0°C, crit = +100.0°C)
Core 2:        +49.0°C  (high = +100.0°C, crit = +100.0°C)
Core 3:        +49.0°C  (high = +100.0°C, crit = +100.0°C)
Core 4:        +51.0°C  (high = +100.0°C, crit = +100.0°C)
Core 5:        +48.0°C  (high = +100.0°C, crit = +100.0°C)

BAT0-acpi-0
Adapter: ACPI interface
in0:          14.32 V  
curr1:         1.79 A  

iwlwifi_1-virtual-0
Adapter: Virtual device
temp1:        +38.0°C  

pch_cannonlake-virtual-0
Adapter: Virtual device
temp1:        +69.0°C  

acpitz-acpi-0
Adapter: ACPI interface
temp1:        +51.0°C  (crit = +120.0°C
```

#### 安装电池管理服务 
> https://linrunner.de/tlp/
```
sudo add-apt-repository ppa:linrunner/tlp
sudo apt update
sudo apt install tlp tlp-rdw
sudo tlp start
```

##### 安装ui工具
> https://github.com/d4nj1/TLPUI
```
sudo add-apt-repository -y ppa:linuxuprising/apps
sudo apt update
sudo apt install tlpui
```
