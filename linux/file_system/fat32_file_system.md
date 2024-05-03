# fat32 file system

created: 20240503 updated: 20240503 authors: alick97

---

### fat32 format explore


#### create fat32 dev file

```
dd if=/dev/zero of=./test_fat32_file bs=1M count=10
mkfs.vfat -F 32 -v ./test_fat32_file
```

#### mount file
```
mkdir t_dir
sudo mount -t vfat -o rw,user,uid=1000,umask=007,exec ./test_fat32_file ./t_dir
```

#### create file and dir for exployer fat32 how to origanize struct for dir and file
```
cd t_dir
mkdir -p dir_bbb/{dir_ccc,dir_ddd}
echo "eee" > dir_bbb/file_eee.txt
echo "aaa" > file_aaa.txt
```

#### first 512 bytes
```
Hex View  00 01 02 03 04 05 06 07  08 09 0A 0B 0C 0D 0E 0F
 
00000000  EB 58 90 6D 6B 66 73 2E  66 61 74 00 02 01 20 00  .X.mkfs.fat... .
00000010  02 00 00 00 50 F8 00 00  20 00 02 00 00 00 00 00  ....P... .......
00000020  00 00 00 00 9E 00 00 00  00 00 00 00 02 00 00 00  ................
00000030  01 00 06 00 00 00 00 00  00 00 00 00 00 00 00 00  ................
00000040  80 01 29 20 5B 7A 86 4E  4F 20 4E 41 4D 45 20 20  ..) [z.NO NAME  
00000050  20 20 46 41 54 33 32 20  20 20 0E 1F BE 77 7C AC    FAT32   ...w|.
00000060  22 C0 74 0B 56 B4 0E BB  07 00 CD 10 5E EB F0 32  ".t.V.......^..2
00000070  E4 CD 16 CD 19 EB FE 54  68 69 73 20 69 73 20 6E  .......This is n
00000080  6F 74 20 61 20 62 6F 6F  74 61 62 6C 65 20 64 69  ot a bootable di
00000090  73 6B 2E 20 20 50 6C 65  61 73 65 20 69 6E 73 65  sk.  Please inse
000000A0  72 74 20 61 20 62 6F 6F  74 61 62 6C 65 20 66 6C  rt a bootable fl
000000B0  6F 70 70 79 20 61 6E 64  0D 0A 70 72 65 73 73 20  oppy and..press 
000000C0  61 6E 79 20 6B 65 79 20  74 6F 20 74 72 79 20 61  any key to try a
000000D0  67 61 69 6E 20 2E 2E 2E  20 0D 0A 00 00 00 00 00  gain ... .......
000000E0  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  ................
000000F0  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  ................
00000100  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  ................
00000110  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  ................
00000120  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  ................
00000130  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  ................
00000140  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  ................
00000150  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  ................
00000160  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  ................
00000170  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  ................
00000180  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  ................
00000190  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  ................
000001A0  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  ................
000001B0  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  ................
000001C0  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  ................
000001D0  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  ................
000001E0  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  ................
000001F0  00 00 00 00 00 00 00 00  00 00 00 00 00 00 55 AA  ..............U.
```

#### find fat32 table #1 address
- sector size in 0x0b(2).
- find align 0x0e(2) value is 32, so align is 32 * 512 = 0x4000  512 is sector size.
- value  
```
Hex View  00 01 02 03 04 05 06 07  08 09 0A 0B 0C 0D 0E 0F
 
00004000  F8 FF FF 0F FF FF FF 0F  F8 FF FF 0F FF FF FF 0F  ................
00004010  FF FF FF 0F FF FF FF 0F  FF FF FF 0F FF FF FF 0F  ................
00004020  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  ................
```
- fat32 table 4 bytes is one cluster data address or flag.   cluster index is 1,2,3,4... one cluster address is 4 bytes.
- cluster data size is 0x0d(1) = 1 sector = 512bytes	

#### find root dir address
- has 2 fat table 0x10(1)=2, one table size 0x24(4) = 158 sector, 158 * 512 = 0x13c00
- 0x4000 + (0x13c00 * 2) = 0x2b800
- value
```
Hex View  00 01 02 03 04 05 06 07  08 09 0A 0B 0C 0D 0E 0F
 
0002B800  41 64 00 69 00 72 00 5F  00 62 00 0F 00 18 62 00  Ad.i.r._.b....b.
0002B810  62 00 00 00 FF FF FF FF  FF FF 00 00 FF FF FF FF  b...............
0002B820  44 49 52 5F 42 42 42 20  20 20 20 10 00 84 16 27  DIR_BBB    ....'
0002B830  A3 58 A3 58 00 00 1A 27  A3 58 03 00 00 00 00 00  .X.X...'.X......
0002B840  41 66 00 69 00 6C 00 65  00 5F 00 0F 00 E5 61 00  Af.i.l.e._....a.
0002B850  61 00 61 00 2E 00 74 00  78 00 00 00 74 00 00 00  a.a...t.x...t...
0002B860  46 49 4C 45 5F 41 41 41  54 58 54 20 00 61 20 27  FILE_AAATXT .a '
0002B870  A3 58 A3 58 00 00 20 27  A3 58 07 00 04 00 00 00  .X.X.. '.X......
0002B880  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  ................
```
- file_aaa.txt cluster is (0x2b870, 04)0 (0x2b870, 0a)07   = 7, first 2 cluster is reserved partition. so cluster index is 7 - 2 = 5
- file_aaa.txt data address is 5 * 0x200 + 0x2b800 = 0x2c200, 0x200=512bytes


#### find data address, in fat32 data address is same as root dir address
- which is 0x2b800


#### read file_aaa.txt example code, run as root
- read_file_aaa.c
```
#include <sys/types.h>
#include <unistd.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <stdio.h>
#include <errno.h>
#include <string.h>


int main() {
    int dev_f = open("/dev/loop20", O_RDONLY);
    const int sector_size = 0x200;
    unsigned char buf[0x200] = {0};
    int fat_table_1_pos = 32 * sector_size;
    int data_pos = fat_table_1_pos + (158 * sector_size * 2);
    // find aaa cluster index, change this value in 0x0a column
    int file_aaa_cluster_index = 7;
    int cluster_size = sector_size * 1;
    printf("data pos: %8x\n", data_pos);
    lseek(dev_f, data_pos, SEEK_SET);
    int n = read(dev_f, buf, sizeof(buf));
    if (n < 0) {
        printf("err: %s\n", strerror(errno));
        return n;
    }
    int i, j;
    printf("----: ");
    for (j=0; j<0x10; j++) {
        printf("%02x ", j);
    }
    printf("\n");
    for (i=0; i< 0x20; i++) {
        printf("%04x: ", i);
        for (j=0; j < 0x10; j++) {
            printf("%02x ", buf[i*0x10+j]);
        }
        printf("\n");
    }
    unsigned long new_pos = lseek(dev_f, cluster_size * (file_aaa_cluster_index - 2) - sector_size, SEEK_CUR);
    printf("new pos: %08lx\n", new_pos);
    
    n = read(dev_f, buf, sizeof(buf));
    // expect aaa
    printf("file content: %s\n", buf);
    return 0;
}
```
- result
```
data pos:    2b800
----: 00 01 02 03 04 05 06 07 08 09 0a 0b 0c 0d 0e 0f 
0000: 41 64 00 69 00 72 00 5f 00 62 00 0f 00 18 62 00 
0001: 62 00 00 00 ff ff ff ff ff ff 00 00 ff ff ff ff 
0002: 44 49 52 5f 42 42 42 20 20 20 20 10 00 84 16 27 
0003: a3 58 a3 58 00 00 1a 27 a3 58 03 00 00 00 00 00 
0004: 41 66 00 69 00 6c 00 65 00 5f 00 0f 00 e5 61 00 
0005: 61 00 61 00 2e 00 74 00 78 00 00 00 74 00 00 00 
0006: 46 49 4c 45 5f 41 41 41 54 58 54 20 00 61 20 27 
0007: a3 58 a3 58 00 00 20 27 a3 58 07 00 04 00 00 00 
0008: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
0009: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
000a: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
000b: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
000c: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
000d: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
000e: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
000f: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
0010: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
0011: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
0012: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
0013: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
0014: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
0015: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
0016: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
0017: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
0018: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
0019: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
001a: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
001b: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
001c: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
001d: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
001e: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
001f: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
new pos: 0002c200
file content: aaa

```

#### reference
- https://en.wikipedia.org/wiki/File_Allocation_Table
- cn link https://zh.wikipedia.org/wiki/%E6%AA%94%E6%A1%88%E9%85%8D%E7%BD%AE%E8%A1%A8#%E4%B8%BB%E7%A3%81%E7%9B%98%E7%BB%93%E6%9E%84
- [tools ImHex](https://github.com/WerWolv/ImHex?tab=readme-ov-file)
