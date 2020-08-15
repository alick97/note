循环引用 泄露错误实例
```
#include <memory>
#include <string>
#include <iostream>
 
struct Foo {
    Foo(const char* s):name(s) { std::cout << name << " Foo...\n"; }
    ~Foo() { std::cout << name << " ~Foo...\n"; }

    std::shared_ptr<Foo> other;
    std::string name;
};
 
 
int main()
{
    std::shared_ptr<Foo> f1, f2;
    std::cout << "f1 count: " << f1.use_count() << std::endl;
    std::cout << "f2 count: " << f2.use_count() << std::endl;
    f1 = std::make_shared<Foo>("f1");
    // f2 = std::make_shared<Foo>("f2");
    f1->other = f1;
    // f2->other = f1;

    std::cout << "f1 count: " << f1.use_count() << std::endl;
    // std::cout << "f2 count: " << f2.use_count() << std::endl;
    return 0;
}

```
运行结果:
```
f1 count: 0
f2 count: 0
f1 Foo...
f1 count: 2
```
永远调用不到析构函数, 原因f1中other是自己， f1的总引用计数为2.
main栈结束，f1引用计数为1，没变成0不会调用到真正的引用对象的析构函数。

解决方法，将结构体Foo中的other换成std::weak_ptr
```
struct Foo {
    Foo(const char* s):name(s) { std::cout << name << " Foo...\n"; }
    ~Foo() { std::cout << name << " ~Foo...\n"; }

    std::weak_ptr<Foo> other;
    std::string name;
};
```
weak_ptr 不增加引用计数， 不控制生命周期

其他例子：
> https://blog.csdn.net/jacketinsysu/article/details/53341370
