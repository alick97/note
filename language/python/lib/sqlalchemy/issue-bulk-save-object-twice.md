#### sqlalchemy bulk_save_object 使用中注意点记录

#### 问题
> sqlalchemy 1.4.23

session创建的时候feature为False， 使用orm 对象外键指定的是对象 而不是id的时候 或者 不管session创建的时候feature指定False or True， 主动使用refobject.backref_collections.append(current_object) 都会导致使用 bulk_save_object 有重复插入数据的问题

关于session feature为False的说明， 其中有一个行为就是 定义外键的时候， relationship.cascade_backrefs=True。这会导致你给对象指定外键的时候只用的是外键的对象而不是id指定的时候 如 EntityB_instance.a = EntityA_instance, 就会发生一个默认的行为
EntityA_instance.bs.append(EntityB_instance) 这个行为会将EntityB_instance添加到session中，就是上面说的第二个情况，然后bulk_save_object的时候就会再加一次， 发生两次insert，原本只要一次

#### 避免的方式
使用core原生sql， 或者使用orm_bulk_save_object的时候对象所有外键只指定id不指定对象 同时不主动或者被动发生外键对象backref集合append当前对象的情况 官方建议使用core

#### 相关参考
> https://docs.sqlalchemy.org/en/14/orm/persistence_techniques.html#bulk-operations-caveats
> https://github.com/sqlalchemy/sqlalchemy/discussions/5928
> https://github.com/sqlalchemy/sqlalchemy/issues/5833

#### 这个例子会复现，出现两个B对象记录
> 如果调整EntityB __init__ 为

```
# self.a = a
self.a_id = a.id
```

就会正常
```
import pathlib

import sqlalchemy
import sqlalchemy.orm
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()
class EntityA(Base):
    __tablename__ = "entity_a"

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    name = sqlalchemy.Column(sqlalchemy.String)

    # bs = sqlalchemy.orm.relationship("EntityB", back_populates="a", cascade_backrefs=False)
    bs = sqlalchemy.orm.relationship("EntityB", back_populates="a")
    # bs = sqlalchemy.orm.relationship("EntityB", backref="a")

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"<EntityA {self.id} '{self.name}'>"


class EntityB(Base):
    __tablename__ = "entity_b"

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    a_id = sqlalchemy.Column(sqlalchemy.Integer, sqlalchemy.ForeignKey('entity_a.id'))

    # a = sqlalchemy.orm.relationship("EntityA", backref="bs")
    a = sqlalchemy.orm.relationship("EntityA", back_populates="bs")

    def __init__(self, a):
        self.a = a
        # self.a_id = a.id  # 如果按照id只指定这个 不使用self.a = a 就 bulk_save不会发生 重复插入两次数据

    def __repr__(self):
        return f"<EntityB {self.id} {self.a_id} {self.a!r}>"


db_file = pathlib.Path(__file__).resolve().with_suffix(".db")
db_file.unlink(missing_ok=True)
db_engine = sqlalchemy.create_engine(f"sqlite:///{db_file}", echo=True)
Base.metadata.create_all(db_engine)

db_session = sqlalchemy.orm.sessionmaker(db_engine, future=True)()

a = EntityA("foo")
db_session.add(a)
db_session.commit()

aa = db_session.query(EntityA).first()
b = EntityB(aa)
db_session.bulk_save_objects([b])
db_session.commit()

print("=====")
for obj in db_session.query(EntityB):
    print("[  ", repr(obj))
```

