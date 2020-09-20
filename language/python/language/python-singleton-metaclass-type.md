
### python3 singleton metaclass 实现以及 对象模型

created: 20200920 updated: 20200920 author: alick97

----
示例代码 运行python3.8中:
```
class Singleton(type):
    def __init__(cls, *args, **kwargs):
        print(f"singleton __init__: {cls}")
        cls.__a__instance = None
        # super(Singleton, cls).__init__(*args, **kwargs)
        super().__init__(*args, **kwargs)
        cls.show_a = cls.show

    def show(self):
        print('show')

    def ssss(self):
        print(f'sssssss {self}')

    def __new__(cls, name, bases, dct):
        # bases default is object class.
        print(f"singleton __new__: cls {cls}, name {name}, base {bases}")
        return super().__new__(cls, name, bases, dct)

    def __call__(self, *args, **kwargs):
        print(f"singleton __call__: {self}")
        if self.__a__instance is None:
            self.__a__instance = super().__call__(*args, **kwargs)
            return self.__a__instance
        else:
            print(f'singleton {self} has_instance, {self.__a__instance}')
            return self.__a__instance


class Foo(object, metaclass=Singleton):
    AAAA = 1
    BBBB = 2

    def showccc(self):
        pass

    # aclass__ = Singleton #  在代码执行到这里的时候，元类中的__new__方法和__init__方法其实已经被执行了，而不是在Foo实例化的时候执行。且仅会执行一次。
    def __new__(cls, *args, **kwargs):
        print(f"Foo __new__: {cls}")
        return super().__new__(cls, *args, **kwargs)

    def __init__(self):
        print(f'Foo __init__: {self}')


class BBB(object, metaclass=Singleton):
    def __init__(self):
        print("BBB self init: {}".format(self))


a = Foo()
b = Foo()
c = BBB()
cc = BBB()

Foo.ssss()
# a.ssss() #  error
a.show_a()
Foo.show_a()
```
运行结果:
```
singleton __new__: cls <class '__main__.Singleton'>, name Foo, base (<class 'object'>,)
singleton __init__: <class '__main__.Foo'>
singleton __new__: cls <class '__main__.Singleton'>, name BBB, base (<class 'object'>,)
singleton __init__: <class '__main__.BBB'>
singleton __call__: <class '__main__.Foo'>
Foo __new__: <class '__main__.Foo'>
Foo __init__: <__main__.Foo object at 0x7ff7f036ab80>
singleton __call__: <class '__main__.Foo'>
singleton <class '__main__.Foo'> has_instance, <__main__.Foo object at 0x7ff7f036ab80>
singleton __call__: <class '__main__.BBB'>
BBB self init: <__main__.BBB object at 0x7ff7f036a670>
singleton __call__: <class '__main__.BBB'>
singleton <class '__main__.BBB'> has_instance, <__main__.BBB object at 0x7ff7f036a670>
sssssss <class '__main__.Foo'>
show
show
```

上面代码的理解:
- 用Foo类型的metaclass Singleton创建Foo类型，调用singleton的__new__创建Foo， base默认为object， name为类型名，使用的就是父metaclass type的__new__.
- metaclass Singleton __init__初始化Foo类型, Foo类型创建完成.
- a = Foo() 调用metaclass Singleton的__call__方法， 来创建对应的Foo的实例对象。
- Singleton的__call__ 会执行两个重要的动作， 调用对应Foo的__new__创建对应的的对象，然后调用对应的Foo的__init__初始化对应的Foo的实例，这样Foo得实例a就创建成功了。
- b = Foo() 由于Foo类型已经又对应的metaclass Singleton创建所以这里不会再创建，也就是Singleton的__new__和__init__不会执行。直接执行Singleton的__call__, 由于__call__中我们做的hook，之前存储的创建的Foo的实例已经存储直接返回， 就打到了Singleton的效果。
- c = BBB（） cc = BBB()逻辑同上.
- Foo.ssss() 可以调用是因为Foo作为类型是Singleton的实例， 对应的__class__指向Singleton，所以有singleton的方法ssss()。
- a.ssss() 报错，是因为Foo作为类型没有这个方法，Foo继承的是object, 导致a的方法映射不会出现ssss这个方法。 这里Foo有两面性， 一个是作为metaclass Singleton的实例，一个是作为a的父类.
- a有show_a()的方法是它的父类有show_a()的方法， 这个方法是在Singleton在__init__ 初始化Foo类型的时候 执行 cls.show_a = cls.show 赠予给Foo的.这里的cls都是Foo，右边是Foo作为Singleton的实例， 左边也是Singleton这样做的目的 是 Foo建立作为a的父类能够将show_a -> show这样一个映射传递下去.
- 从上面 可以看到， 设计模式singleton在不同的语言的实现是有细节差异的
- metaclass这种定制类型的应用有内建的enum等， 也有应用级别如django中的orm model的应用.


#### about metaclass-type class class-instance
metaclass中的方法是**类型级别**的操作，不是class级别的. 

python中类型就是我们所说的class也是一种metaclass的实例，大多数class的metaclass都是type. class的最初的base也就是所有class的起源都是从object这个class来的.
class instance是对应的class实例化的.

类与类之间的关系是 is-kind-of的关系， 查看__bases__

类的实例和对应的类之间的关系 is-instance-of 查看__class__

三种类型的经典关系:
```
     metaclass        |      class              |     class instance
  |-- <type 'type'>  <------  <type 'object'>
  |     /\                     /\
  |---->|                      ||
        |                      ||
        ----------------- <class 'A'>    <-----------  a 'A instance'
```
其中:

---> 代表 is-instance-of

===> 代表 is-kind-of

class Foo的metaclass是Singleton，所以它是由这个metaclass类型创建的,是is-instance-of的关系， 查看它的__class__就是Singleton.

##### TODO: 关于为什么要搞出来一个type metaclass, 直接所有的class都从顶级的object发芽不行吗? 

有很多原因， 如多个class共通的都抽到type中， 允许用户做些hook来定制class的行为，如enum staticmethod等等类型都是在metaclass的基础上搞出来的。
最主要的 可以动态创建类.

至于能否去掉，因为很多class的type都是type的实例，有待研究源码，目前源码是从class对应type给上搜索反向初始化的. 还有就是涉及研究 动态解释语言以及反射等。

关于类型创建, 可以参见[type](https://docs.python.org/3/library/functions.html?highlight=type#type)

```
class type(object)
class type(name, bases, dict)

class X:
    a = 1

X = type('X', (object,), dict(a=1))
```

> 参考
- https://stackoverflow.com/questions/44178162/call-method-of-type-class
- https://stackoverflow.com/questions/100003/what-are-metaclasses-in-python
- https://realpython.com/python-metaclasses/
- << Python 源码剖析 >> 作者 陈儒 章节 python虚拟机中的类机制
- super 以及 多继承方法解析顺序 Method Resolution Order [MRO]
