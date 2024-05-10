# mysql timestamp field with time_zone

created: 20240511 updated: 20240511 authors: alick

---

##### get mysql server timezone
- sql
```sql
SELECT @@session.time_zone;
```
- result
```
SYSTEM
```
- sql 
```
select timediff(now(),convert_tz(now(),@@session.time_zone,'+00:00'));
```
- result mean it's timezone is utc
```
00:00:00
```

##### create example table
```sql

create table table_1 


CREATE TABLE `table_1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
)

insert into table_1 (id, name) values 
(1, 'n1'),
(2, 'n2')

select * from table_1
```
###### result 
```
"id","name","create_time"
1,n1,2024-05-10 16:39:39.000
2,n2,2024-05-10 16:39:39.000
```

#### timezone effect timestamp result read
- change timezone to +08:00

```
set time_zone = '+08:00';
select * from table_1
```
- result

```
"id","name","create_time"
1,n1,2024-05-11 00:39:39.000
2,n2,2024-05-11 00:39:39.000
```
- conclusion

```
result is effect by timezone, it parse timestamp to related timezone
```

#### timezone effect timestamp field write
- write datetime when tz is +08:00

```sql
set time_zone = '+08:00';
update table_1 set create_time = '2024-05-10 16:39:39' where id = 1
select * from table_1
```
- result
```
"id","name","create_time"
1,n1,2024-05-10 16:39:39.000
2,n2,2024-05-11 00:39:39.000
```
- see result is 16:39:39 +08:00, so when insert time '2024-05-10 16:39:39' when session timezone is '+08:00',
  it actually mean use insert iso datetime '2024-05-10T16:39:39.000+08:00', when change timezone to '+00:00', it is not you need 16:39:39, it is wrong time 08:39.39, less than 8 hours.

```sql
set time_zone = '+00:00';
select * from table_1
```
```
"id","name","create_time"
1,n1,2024-05-10 08:39:39.000
2,n2,2024-05-10 16:39:39.000
```

#### timezone effect timestamp field filter， if you want filter by iso format str
- use +8:00 time 2024-05-11 00:39:39.000 filter when db time zone is utc
```sql
set time_zone = '+00:00';
select * from table_1 where create_time = CONVERT_TZ('2024-05-11 00:39:39.000','+8:00', '+0:00')
```
- result
```
"id","name","create_time"
2,n2,2024-05-10 16:39:39.000
```


#### more in python
- when use pymysql is parse timestamp field data as str like '2024-05-10 16:39:39.000' when write or read with session time_zone.
- when session time zone is not same as program time zone, it may cause issue. eg: db time_zone is +00：00， python program timezone is +08:00.
  read record 2, it get create_time is '2024-05-10 16:39:39.000' -> python ```d1=datetime(2024, 05, 10, 16, 39, 39, tzinfo=None)```, 
  when use d1.timestamp(), it effect python program timezone +08:00, this cause wrong result.
- so it is best when timezone of python program and timezone of db are same.
- timestamp in python [link](/language/python/language/python-timestamp-with-time-zone.md)
