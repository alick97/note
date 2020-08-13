- [官方文档 python3.7 logging](https://docs.python.org/3.7/library/logging.html)

示例代码
```
import logging

# log1 = logging.getLogger('l1')
# log1_1 = logging.getLogger('l1.1')
# log2 = logging.getLogger('l1')
# 
# assert id(log1) == id(log2), 'log1 and log2 must be same instance.'

# # level = log2.getEffectiveLevel()
# is_enable_info = log2.isEnabledFor(logging.WARNING)
# print(is_enable_info)
# logger = log1.getChild('12')
# print(logger)
# 
# try:
#     raise ValueError('xxx')
# except Exception:
#     log1.exception("=====")
#     t = sys.exc_info()
#     trace = t[2]
#     print(t)
#     pass
# 

# FORMAT = '%(asctime)-15s %(clientip)s %(user)-8s %(message)s'
# logging.basicConfig(format=FORMAT)
# d = {'clientip': '192.168.0.100', 'user': 'fbloggs'}
# logger = logging.getLogger('tcpserver')
# logger.warning('Protocol problem: %s', 'connection reset', extra=d)

a_b1_log_path='a.b1.log'

log_config = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
        'a_b1_file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': a_b1_log_path,
            'maxBytes': 1024*1024*5,
            'backupCount': 5,
            'formatter': 'verbose',
        },
    },
    'formatters': {
        'verbose': {
            'format': 'verbose: {levelname} {asctime} {module}:{funcName} {process:d} '
                      '{threadName}{thread:d} {name}:{lineno} {message}',
            'style': '{',
        },
        'simple': {
            'format': 'simple: {levelname} {message}',
            'style': '{',
        },
    },
    'loggers': {
        'a': {
            'handlers': ['console'],
            'level': 'ERROR',
            'formatter': 'simple',
        },
        'a.b1': {
            'handlers': ['a_b1_file'],
            'level': 'INFO',
            'formatter': 'verbose',
        },
        'a.b2': {
            'handlers': ['console'],
            'level': 'WARNING',
            'formatter': 'verbose',
        }
    }
}

import logging.config

logging.config.dictConfig(log_config)


# clean log
with open(a_b1_log_path, 'w') as f:
    f.write('')

logger_a = logging.getLogger('a')
logger_a_b1 = logging.getLogger('a.b1')
logger_a_b2 = logging.getLogger('a.b2')


logger_a.error('this message from logger_a')
logger_a_b1.info('this message from logger_a_b1')

logger_a_b2.info('this message from logger_a_b2')
logger_a_b2.error('this message from logger_a_b2')

```
输出情况
```
verbose: ERROR 2020-08-12 18:57:07,894 log:<module> 5147 MainThread139875926808320 a:93 this message from logger_a
verbose: INFO 2020-08-12 18:57:07,895 log:<module> 5147 MainThread139875926808320 a.b1:94 this message from logger_a_b1
verbose: ERROR 2020-08-12 18:57:07,895 log:<module> 5147 MainThread139875926808320 a.b2:97 this message from logger_a_b2
verbose: ERROR 2020-08-12 18:57:07,895 log:<module> 5147 MainThread139875926808320 a.b2:97 this message from logger_a_b2
cat a.b1.log 
verbose: INFO 2020-08-12 18:57:07,895 log:<module> 5147 MainThread139875926808320 a.b1:94 this message from logger_a_b1
```
#### logging简单使用总结:

##### 配置中几个主要用到的组件:
- handers 相当与最终写入设备，可以是console， 文件，网络等等.
- formatters, 输出的log的额外的字符应该是什么样式 如时间，进程号，代码行号，函数名等
- loggers， 用于专门记录log的instance.可以配置特定的一个或多个hander，可以配置formatter，以及log的最小级别
- filters 这里没有用到，用于特定的过滤.

#### 关于loggers
- loggers有继承关系，类似于模块命名空间,子空间的logger会流入父空间logger，如果没有父空间那么这个模块就是root. 例子:
```
a
a.b1
a.b2
```
a是a.b1与a.b2的父节点，a.b1与a.b2平级

- logger的level级别 父子节点有关联关系, 但是handler是独立的.

logger level父子节点的关系为:
1. 子节点没有筛出来的log不会出现在父节点, 如
```
logger_a_b2.info('this message from logger_a_b2')
```
不会被a.b2的logger筛出来，应为对应的logger的筛选级别为 WARNING.
2. 子节点筛选出来的log， 哪怕父节点的level比子节点的高， 也会出现在父亲节点中. 如 a的level 为ERROR， a.b1的level 为INFO，只要是a.b1 筛出来的log，都会在a最终筛选结果中出现. 如
```
logger_a_b1.info('this message from logger_a_b1')

```
```
verbose: INFO 2020-08-12 18:57:07,895 log:<module> 5147 MainThread139875926808320 a.b1:94 this message from logger_a_b1
```
所以正确的配置应该是 **子节点的level应该大于等于父节点.**

handler独立，是说log记录到对应的logger后，都会又对应logger配置的handler集合处理。这就出现一种现象， 如 a 和 a.b2 都配置了hander console，同时a.b2 level也比a的低，所以a.b2筛选出来的log都会在a出现，这样同一个log会在console出现两次,造成干扰. 如:
```
logger_a_b2.error('this message from logger_a_b2')
```
```
verbose: ERROR 2020-08-12 18:57:07,895 log:<module> 5147 MainThread139875926808320 a.b2:97 this message from logger_a_b2
verbose: ERROR 2020-08-12 18:57:07,895 log:<module> 5147 MainThread139875926808320 a.b2:97 this message from logger_a_b2
```
处理原则应该是 **子节点的log会流入父节点， 子节点不要和父节点共用同一个handler**
