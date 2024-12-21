# python profile tools

{% tag 'created','20230225' %} {% endtag %} {% tag 'updated','20230225' %} {% endtag %} {% tag 'authors','alick97' %} {% endtag %}

---

#### some tools
> [blog how-to-find-out-the-bottleneck-of-my-python-code](https://towardsdatascience.com/how-to-find-out-the-bottleneck-of-my-python-code-46383d8ef9f)
- CProfile
``` 
python -m cProfile scatter.py
python -m cProfile -o scatter.prof scatter.py
gprof2dot --colour-nodes-by-selftime -f pstats output.pstats | \
    dot -Tpng -o output.png
```
- pyinstrument
- py-spy

##### py-spy

###### test code

```
import time
CC = 1

def f1():
    global CC
    CC += 1
    time.sleep(1)

def f2():
    time.sleep(2)

def f3():
    global CC
    time.sleep(1)
    for i in range(100):
        CC += 1

def run():
    for i in range(2):
        f1()
        f2()
        f3()
    print(CC)

if __name__ == "__main__":
    run()

```

###### case for consider io, param with --idle

    sudo py-spy record -o profile.svg --idle -- python3 t.py 

###### case for just consider cpu, param without --idle

    sudo py-spy record -o profile.svg   -- python3 t.py 

