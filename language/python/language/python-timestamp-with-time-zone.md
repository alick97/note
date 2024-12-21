# python timestamp with time_zone

{% tag 'created','20240511' %} {% endtag %} {% tag 'updated','20240511' %} {% endtag %} {% tag 'authors','alick' %} {% endtag %}

---

#### when system time zone is +08:00 Asia/Shanghai
##### example
```python
from datetime import datetime, timezone
from zoneinfo import ZoneInfo

asia_shanghai_tz = ZoneInfo("Asia/Shanghai")
d = datetime(2024, 5, 11, 8, 0, 0)
d_with_tz = datetime(2024, 5, 11, 0, 0, 0, tzinfo=ZoneInfo("UTC"))
t = d.timestamp()
t2 = d_with_tz.timestamp()
print(f"d: {d} timestamp: {t}")
print(f"d_with_tz: {d_with_tz} timestamp: {t2}")
d1 = datetime.fromtimestamp(t)
d2 = datetime.fromtimestamp(t, timezone.utc)
d3 = datetime.fromtimestamp(t, asia_shanghai_tz)
print(f"from timestamp, datetime: {d1}, tzinfo: {d1.tzinfo}")
print(f"from utc tz timestamp, datetime: {d2}, tzinfo: {d2.tzinfo}")
print(f"from Asia/Shanghai tz timestamp, datetime: {d3}, tzinfo: {d3.tzinfo}")
```
##### result

```
d: 2024-05-11 08:00:00 timestamp: 1715385600.0
d_with_tz: 2024-05-11 00:00:00+00:00 timestamp: 1715385600.0
from timestamp, datetime: 2024-05-11 08:00:00, tzinfo: None
from utc tz timestamp, datetime: 2024-05-11 00:00:00+00:00, tzinfo: UTC
from Asia/Shanghai tz timestamp, datetime: 2024-05-11 08:00:00+08:00, tzinfo: Asia/Shanghai
```
##### conclusion
- note when tz is utc, fromtimestamp parse datetime is with tz and show as utc datetime
- when tz is Asia/Shanghai or is None (use default system time zone +08:00), it parse tiemstamp result is same as d ```d = datetime(2024, 5, 11, 8, 0, 0)```. so when use datetime.fromtimestamp without param tz, is result is effect by system timezone
- but datetime.timestamp() is effect by system timezone  when datetime is without tz, it use system tz.
  when datetime with tz, datetime.timestamp() is not effect by system tz.
