# MySQL 5.7 安装指南

## 安装步骤

1. **环境配置**
   
   - 下载 MySQL 5.7 zip 压缩包
   - 解压到目标目录
   - 配置环境变量
   
2. **目录与配置文件**
   
   - 在解压目录中新建 `data` 目录
   
   - 创建 `my.ini` 配置文件
   
   - 在 `my.ini` 文件中添加内容
   
   - ```ini
     [mysql]
     # 设置mysql客户端默认字符集
     default-character-set=utf8
     
     [mysqld]
     port = 3306
     # 设置mysql的安装目录
     basedir=G:\Program Files\mysql-5.7.21-winx64
     # 设置mysql数据库的数据的存放目录
     datadir=G:\Program Files\mysql-5.7.21-winx64\data
     # 最大连接数
     max_connections=200
     # 服务端使用的字符集默认为8比特编码的latin1字符集
     character-set-server=utf8
     # 默认存储引擎
     default-storage-engine=INNODB
     ```

3. **初始化与安装**
   - 以管理员身份打开 cmd
   - 执行命令：`mysqld --initialize --user=mysql --console`
   - 记录最后一行显示的临时密码

4. **安装服务**
   - cmd 进入 bin 目录
   - 输入命令：`mysqld --install`

5. **启动服务**
   
   - 执行命令：`net start mysql`
   
6. **登录与修改密码**
   - 登录：`mysql -uroot -p`，输入临时密码
   - 修改密码：
     ```sql
     SET PASSWORD FOR root@localhost = '123456';
     ```
     或
     ```sql
     ALTER USER user() IDENTIFIED BY "123456";
     ```

## MySQL 服务管理

**服务管理方式：**

- 命令行：`services.msc`
- 管理员 cmd：
  - 开启：`net start mysql`
  - 关闭：`net stop mysql`

**客户端操作：**

- 登录：`mysql -uroot -p`
- 退出：
  - `exit`
  - `quit`

# SQL 语言基础

## SQL 分类

1. **SQL**：结构化查询语言（Structure Query Language）

2. **DDL**（数据定义语言）
   - 用途：定义数据库对象（数据库、表、列等）
   - 关键字：`CREATE`, `DROP`, `ALTER` 等

3. **DML**（数据操作语言）
   - 用途：对数据库中表的数据进行增删改
   - 关键字：`INSERT`, `DELETE`, `UPDATE` 等

4. **DQL**（数据查询语言）
   - 用途：查询数据库中表的记录
   - 关键字：`SELECT`, `WHERE` 等

5. **DCL**（数据控制语言）
   - 用途：定义数据库的访问权限和安全级别，创建用户
   - 关键字：`GRANT`, `REVOKE` 等

## MySQL 数据类型

### 基本数据类型

- **CHAR(n)**：固定长度字符串，用户指定长度 n
- **VARCHAR(n)**：可变长度字符串，用户指定最大长度 n
- **INT**：整数类型
- **SMALLINT**：小整数类型
- **NUMERIC(p, d)**：定点数，精度由用户指定
- **REAL, DOUBLE PRECISION**：浮点数与双精度浮点数
- **FLOAT(n)**：精度至少为 n 位的浮点数

> 每种类型都可能包含空值（NULL），表示缺失的值。

## 数据表操作

### 创建表

```sql
CREATE TABLE department (
    dept_name VARCHAR(20) NOT NULL AUTO_INCREMENT,  -- 非空约束，自增
    building VARCHAR(15),
    budget NUMERIC(6,2),
    PRIMARY KEY (dept_name)  -- 主键
);

CREATE TABLE course (
    course_id VARCHAR(7),
    title VARCHAR(50),
    dept_name VARCHAR(20),
    credits NUMERIC(2,1),
    PRIMARY KEY (course_id),
    FOREIGN KEY (dept_name) REFERENCES department(dept_name)  -- 外键
);
```

### 外键约束选项

```sql
CONSTRAINT fk_city_country FOREIGN KEY(country_id) 
REFERENCES country_innodb(country_id) 
ON DELETE RESTRICT 
ON UPDATE CASCADE
```

**外键操作选项：**
- **RESTRICT / NO ACTION**：限制在子表有关联记录的情况下，父表不能更新
- **CASCADE**：父表更新或删除时，更新或删除子表对应记录
- **SET NULL**：父表更新或删除时，子表对应字段被设置为 NULL

### 添加外键

```sql
ALTER TABLE orders 
ADD CONSTRAINT fk_customer 
FOREIGN KEY (customer_id)  
REFERENCES customers(customer_id);
```

## SQL 查询基础

### 单关系查询

**基本查询：**
```sql
SELECT dept_name FROM course;
```

**去重查询：**
```sql
SELECT DISTINCT dept_name FROM course;
```

**带条件查询：**
```sql
SELECT DISTINCT dept_name, building, budget * 1.1  
FROM department 
WHERE building = '3号楼' AND budget = 8000;
```

**WHERE 子句运算符：**
- 比较运算符：`<`, `<=`, `>`, `>=`, `=`, `<>`, `!=`
- 逻辑运算符：`AND`, `OR`, `NOT`（优先级：`NOT` > `AND` > `OR`）

### 多表连接

**使用 ON：**
```sql
SELECT c.dept_name, title, building
FROM course c JOIN department d
ON c.dept_name = d.dept_name;
```

**使用 USING：**
```sql
SELECT c.dept_name, title, building
FROM course c JOIN department d
USING (dept_name);
```

## 高级查询功能

### 别名（AS）

```sql
SELECT name AS instructor_name
FROM instructor AS T
WHERE T.name = '韩梅梅';
```

### 字符串匹配（LIKE）

**通配符：**
- `%`：匹配任意字符串
- `_`：匹配任意单个字符

**示例：**
```sql
SELECT course_id, title
FROM course
WHERE title LIKE '%大学%';
```

### 正则表达式（REGEXP）

```sql
SELECT *
FROM customers
-- WHERE last_name REGEXP 'b'        -- 名字中包含 b
-- WHERE last_name REGEXP '^b'       -- 名字以 b 开头
-- WHERE last_name REGEXP 'y$'       -- 名字以 y 结尾
-- WHERE last_name REGEXP '^b|mg|y'  -- 名字以 b 开头或包含 mg 或 y
-- WHERE last_name REGEXP '[gim]e'   -- 名字包含 ge、ie 或 me
WHERE last_name REGEXP '[a-h]e'      -- 名字包含 ae 到 he 之间的组合
```

### 排序（ORDER BY）

```sql
SELECT first_name, last_name
FROM sql_store.customers
ORDER BY birth_date DESC;
```

### 范围查询（BETWEEN）

```sql
-- 包含边界值
SELECT * FROM students WHERE age BETWEEN 18 AND 20;
-- 等同于：age >= 18 AND age <= 20

-- 不包含边界值
SELECT * FROM students WHERE age NOT BETWEEN 18 AND 20;
-- 等同于：age < 18 OR age > 20
```

# 集合运算

## 并运算（UNION）

**示例：** 找出2000年下学期与2001年上学期开设的课程

```sql
-- 2000年下学期开设的课程
SELECT course_id, title, semester 
FROM course 
WHERE year = 2000 AND semester = '下学期'

UNION

-- 2001年上学期开设的课程  
SELECT course_id, title, semester
FROM course
WHERE year = 2001 AND semester = '上学期';
```

**UNION 特性：**
- 自动去重
- 保留重复使用 `UNION ALL`
- 两个查询结果的列数和数据类型必须兼容

## 交运算（INTERSECT）和差运算（EXCEPT）

**交运算示例：**
```sql
-- 找出既在2000年下学期又在2001年上学期开设的课程
SELECT course_id FROM course WHERE year = 2000 AND semester = '下学期'
INTERSECT
SELECT course_id FROM course WHERE year = 2001 AND semester = '上学期';
```

**差运算示例：**
```sql
-- 找出在2000年下学期但不在2001年上学期开设的课程
SELECT course_id FROM course WHERE year = 2000 AND semester = '下学期'
EXCEPT
SELECT course_id FROM course WHERE year = 2001 AND semester = '上学期';
```

> 注意：MySQL 不支持 INTERSECT 和 EXCEPT，可以使用其他方式实现相同功能

# 空值处理

## NULL 值的运算特性

1. **算术表达式中的 NULL：**
   - 任一输入为 NULL，结果即为 NULL
   - 示例：`r.A + 5`，若 `r.A` 为 NULL，则表达式结果为 NULL

2. **比较运算中的 NULL：**
   - 涉及 NULL 的任何比较运算结果视为 `UNKNOWN`
   - 示例：`r.A < 5`，若 `r.A` 为 NULL，则结果为 `UNKNOWN`

## 三值逻辑运算

**AND 运算：**
- `true AND unknown` = `unknown`
- `false AND unknown` = `false`  
- `unknown AND unknown` = `unknown`

**OR 运算：**
- `true OR unknown` = `true`
- `false OR unknown` = `unknown`
- `unknown OR unknown` = `unknown`

**NOT 运算：**
- `not unknown` = `unknown`

## NULL 值检测

使用 `IS NULL` 和 `IS NOT NULL` 检测空值：

```sql
-- 查找没有邮箱的学生
SELECT * FROM students WHERE email IS NULL;

-- 查找有邮箱的学生  
SELECT * FROM students WHERE email IS NOT NULL;
```

# 聚集函数

## 基本聚集函数

聚合函数可以出现在 `SELECT`、`HAVING`、`ORDER BY` 之后。

**常用聚集函数：**
- **AVG()**：平均值
- **MIN()**：最小值  
- **MAX()**：最大值
- **SUM()**：总和
- **COUNT()**：计数

### 基本聚集示例

**示例1：** 金融系所有教师平均工资

```sql
SELECT AVG(salary) AS avg_salary
FROM instructor
WHERE dept_name = '金融系';
```

**示例2：** 统计关系中的元组数量
```sql
SELECT COUNT(*) AS total_count
FROM instructor;
```

### COUNT() 函数详解

**COUNT(column_name)：**

- 统计指定列不为 NULL 的行数
- 只统计有值的行

**COUNT(*)：**

- 统计结果集的所有行数
- 忽略所有列，直接统计行数

**COUNT(1)：**
- 统计所有行数，不会忽略 NULL 值
- 与 `COUNT(*)` 功能相同

## 分组聚集（GROUP BY）

`GROUP BY` 子句将指定属性上取值相同的元组分为一组计算。

**示例：** 每个系教师的平均工资

```sql
SELECT dept_name, AVG(salary) AS avg_salary
FROM instructor
GROUP BY dept_name;
```

## HAVING 子句

`HAVING` 子句根据条件过滤分组。

**示例：** 找出平均工资超过 7000 的系的平均工资
```sql
SELECT dept_name, AVG(salary) AS avg_salary
FROM instructor
GROUP BY dept_name
HAVING AVG(salary) > 7000;
```

## SQL 查询执行顺序

1. **FROM 子句**：计算基础关系
2. **WHERE 子句**：应用到 FROM 子句的结果上
3. **GROUP BY 子句**：形成分组（若无 GROUP BY，整个结果集作为一个分组）
4. **HAVING 子句**：应用到每个分组上，过滤不满足条件的分组
5. **SELECT 子句**：在每个分组上应用聚集函数得到最终结果

# 嵌套子查询

## 集合成员资格（IN）

```sql
SELECT DISTINCT course_id
FROM section
WHERE course_id IN (
    SELECT course_id
    FROM section  
    WHERE semester = '上学期'
);
```

## 空关系测试（EXISTS）

`EXISTS` 在子查询非空时返回 `true`，只关心行数不关心行内容。

```sql
SELECT course_id
FROM section AS S
WHERE EXISTS (
    SELECT 1
    FROM section AS T
    WHERE YEAR = 2001
    AND S.course_id = T.course_id
);
```

使用来自外层查询相关名称的子查询称为**相关子查询**。

## 集合比较（SOME、ALL）

### SOME 运算符

**示例：** 学分至少比音乐系某个课程的学分高的课程
```sql
SELECT course_id, title, credits
FROM course
WHERE credits > SOME (
    SELECT credits
    FROM course
    WHERE dept_name = '音乐系'
);
```

**SOME 运算符：**
- `<SOME`, `<=SOME`, `>=SOME`, `=SOME`, `<>SOME`
- `ANY` 等同于 `SOME`
- `=SOME` 等价于 `IN`
- `<>SOME` 不等价于 `NOT IN`

### ALL 运算符

**ALL 运算符规则：**
- `column_name > ALL (subquery)`：大于子查询返回的最大值
- `column_name <= ALL (subquery)`：小于或等于子查询返回的最小值  
- `column_name = ALL (subquery)`：等于子查询返回的所有值
- `column_name != ALL (subquery)`：不等于子查询返回的任何值

## 标量子查询

当子查询返回单个属性的单个元组时，称为**标量子查询**。

**示例1：** 预算最大的系（出现在 WHERE）
```sql
SELECT dept_name, budget
FROM department
WHERE budget = (
    SELECT MAX(budget)
    FROM department
);
```

**示例2：** 各系教师数量（出现在 SELECT）
```sql
SELECT dept_name,
       (SELECT COUNT(*)
        FROM instructor
        WHERE department.dept_name = instructor.dept_name) AS num_instructor
FROM department;
```

## 分页查询（LIMIT）

`LIMIT` 语法是 MySQL 的方言。

```sql
-- 显示第3页，每页1条数据
SELECT * 
FROM student
LIMIT 2, 1;  -- 2 = (3-1) * 1，偏移量
```

**计算公式：**

- 开始索引 = (当前页码 - 1) × 每页显示的条数

# MySQL 内置函数

MySQL 提供丰富的内置函数，类似于编程语言中的工具类。

https://dev.mysql.com/doc/refman/5.7/en/numeric-functions.html

## 字符串处理函数

```sql
-- LEFT()：返回字符串最左边的len个字符
SELECT LEFT('foobarbar', 5);  -- 结果：'fooba'

-- RIGHT()：返回字符串最右边的len个字符  
SELECT RIGHT('foobarbar', 3); -- 结果：'bar'

-- LENGTH()：返回字符串长度
SELECT LENGTH('text');        -- 结果：4

-- CONCAT()：连接字符串
SELECT CONCAT('1', '2');      -- 结果：'12'

-- REPLACE()：字符串替换
SELECT REPLACE('hahaha', 'a', 'e');  -- 结果：'hehehe'

-- REPLACE INTO：插入或替换数据
REPLACE INTO t_user (id, username, password, email) 
VALUES(3, '3cc', '123456', 'ass@q.com');
```

## 时间和日期处理函数

```sql
SELECT
    CURDATE(),                      -- 当前日期
    CURTIME(),                      -- 当前时间  
    DATE('2020-11-11 23:22:12'),    -- 返回日期部分
    TIME('2020-11-11 23:22:12'),    -- 返回时间部分
    NOW(),                          -- 当前日期时间
    DATEDIFF('2020-03-01','2020-02-01'), -- 两日期相差天数
    HOUR('2020-11-11 12:11:11');    -- 返回小时部分

-- 返回某一天的所有订单
SELECT id, order_id
FROM orders 
WHERE DATE(order_date) = '2005-09-01';
```

### 时间间隔计算

**相隔天数：**

```sql
SELECT DATEDIFF('2020-01-09', '2020-01-01');  -- 结果：8
```

**相隔时间：**

```sql
SELECT TIME_TO_SEC('09:10') - TIME_TO_SEC('09:00');  -- 结果：600（秒）
```

# 数据库修改操作

## 查看数据库信息

```sql
-- 查看当前库的所有表
SHOW TABLES;
```

## 删除数据（DELETE）

```sql
DELETE FROM table_name WHERE condition;

-- 示例：删除工资在6000-7999之间的教师
DELETE FROM instructor 
WHERE salary BETWEEN 6000 AND 7999;
```

## 插入数据（INSERT INTO）

**基本插入：**
```sql
INSERT INTO staffs VALUES
    (DEFAULT, '可乐', 1, '总统', '2020-07-03 13:43:00'),
    (DEFAULT, '百事', 1, '会长', '2020-01-03 23:43:00');
```

**获取自增ID：**
```sql
SELECT LAST_INSERT_ID();  -- 获得最近一次插入的ID值
```

**基于查询结果的插入：**
```sql
-- 计算机系修满144学分的学生成为计算机系教师，工资7800
INSERT INTO instructor (ID, name, dept_name, salary)
SELECT ID, name, '计算机系', 7800
FROM student
WHERE dept_name = '计算机系' AND total_credits >= 144;
```

## 更新数据（UPDATE、CASE）

**基本更新：**
```sql
-- 低于平均工资的教师涨5%的工资
UPDATE instructor
SET salary = salary * 1.05
WHERE salary < (SELECT AVG(salary) FROM instructor);
```

**多表更新：**
```sql
UPDATE instructor i
SET salary = 1234
FROM user u
WHERE i.id = u.id
  AND u.age > 30;
```

## CASE 表达式

`CASE` 结构可以用在任何出现值的地方。

```sql
CASE
    WHEN predicate1 THEN result1
    WHEN predicate2 THEN result2  
    ELSE result3
END

-- 示例：根据工资等级设置职称
UPDATE instructor
SET title = CASE
    WHEN salary > 10000 THEN '教授'
    WHEN salary BETWEEN 7000 AND 10000 THEN '副教授' 
    ELSE '讲师'
END;
```

# 连接表达式

## 内连接（INNER JOIN）

```sql
SELECT *
FROM student JOIN takes ON student.ID = takes.ID;
-- INNER JOIN 可简写为 JOIN
```

## 外连接（OUTER JOIN）

### 左外连接（LEFT OUTER JOIN）

保留左表的所有记录，右表无匹配时填充 NULL。

```sql
SELECT *
FROM student NATURAL LEFT JOIN takes;
```

**找出未选课的学生：**
```sql
SELECT ID
FROM student NATURAL LEFT OUTER JOIN takes
WHERE course_id IS NULL;
```

### 右外连接（RIGHT OUTER JOIN）

保留右表的所有记录，左表无匹配时填充 NULL。

### 全外连接（FULL OUTER JOIN）

保留两个表的所有记录，MySQL 不支持，可用 UNION 模拟：

```sql
SELECT *
FROM student NATURAL LEFT OUTER JOIN takes
UNION
SELECT *  
FROM student NATURAL RIGHT OUTER JOIN takes;
```

## ON 子句与外连接

```sql
SELECT *
FROM student LEFT OUTER JOIN takes 
ON student.ID = takes.ID;
```

**ON 与 WHERE 的区别：**
- `ON` 是外连接中内连接步骤的条件
- `WHERE` 是对最终结果的过滤

## 连接类型总结

| 连接类型 | 说明 |
|---------|------|
| INNER JOIN | 内连接，返回匹配的记录 |
| LEFT OUTER JOIN | 左外连接，返回左表所有记录 |
| RIGHT OUTER JOIN | 右外连接，返回右表所有记录 |
| FULL JOIN | 全外连接，MySQL 不支持 |

| 连接条件 | 说明 |
|---------|------|
| NATURAL | 自然连接，自动匹配相同列名 |
| ON predicate | 指定连接条件 |
| USING (A₁,A₂,···Aₙ) | 指定用于连接的列 |

# 完整性约束

## 单个关系上的约束

### 主键约束

```sql
-- 添加主键
ALTER TABLE stu ADD PRIMARY KEY (id);

-- 删除主键  
ALTER TABLE stu DROP PRIMARY KEY;
```

### NOT NULL 约束

```sql
-- 创建表时指定
name VARCHAR(50) NOT NULL,

-- 修改表添加非空约束
ALTER TABLE student CHANGE sex sex CHAR(2) NOT NULL;

-- 撤销非空约束
ALTER TABLE student CHANGE sex sex CHAR(2) NULL;
```

### UNIQUE 约束

```sql
-- 创建表时指定
ID VARCHAR(6) UNIQUE,

-- 添加唯一约束
ALTER TABLE student ADD UNIQUE (tel);

-- 添加复合唯一约束
ALTER TABLE student ADD CONSTRAINT sname_sex UNIQUE(sname, sex);

-- 撤销唯一约束（MySQL）
ALTER TABLE student DROP INDEX sname_sex;
```

### CHECK 子句

> MySQL 不支持 CHECK 约束

```sql
CREATE TABLE student (
    id VARCHAR(5),
    gender VARCHAR(10),
    CHECK(gender IN('男','女'))  -- 限制gender只能为'男'或'女'
);
```

## 参照完整性

### 外键约束

```sql
FOREIGN KEY(dept_name) REFERENCES department(dept_name);
```

### CASCADE 操作

```sql
CREATE TABLE stu (
    id VARCHAR(3),
    gender VARCHAR(10),
    FOREIGN KEY (id) REFERENCES student(ID)
    ON DELETE CASCADE    -- 级联删除
    ON UPDATE CASCADE    -- 级联更新
);
```

**其他选项：**
- `SET NULL`：参照域设为 NULL
- `SET DEFAULT`：设为默认值

# SQL 数据类型与模式

## 日期和时间类型

**常用类型：**
- **DATE**：日历日期（年-月-日）
- **TIME**：一天中的时间（时:分:秒）
- **TIMESTAMP**：DATE 和 TIME 的组合

```sql
CREATE TABLE datetime (
    id VARCHAR(3),
    t1 TIME,
    t2 DATE, 
    t3 TIMESTAMP(6)  -- 秒后6位小数
);

INSERT datetime VALUES 
(2, '08:10:02', '2020-12-12', '2020-04-26 09:08:23');
```

### 日期时间提取

**使用 EXTRACT 函数：**
```sql
SELECT EXTRACT(YEAR FROM t2) AS year
FROM datetime;
```

**MySQL 专用函数：**
```sql
SELECT 
    MONTH(NOW()),     -- 当前月份
    DAY(CURDATE()),   -- 当前日期
    HOUR(CURTIME());  -- 当前小时
```

### 当前时间函数

```sql
SELECT 
    CURRENT_DATE,      -- 当前日期
    CURRENT_TIME,      -- 当前时间
    CURRENT_TIMESTAMP, -- 当前日期时间
    LOCALTIME,
    LOCALTIMESTAMP,
    NOW(),             -- 当前日期时间（MySQL）
    CURDATE(),         -- 当前日期（MySQL） 
    CURTIME();         -- 当前时间（MySQL）
```

## 默认值（DEFAULT）

```sql
CREATE TABLE table1 (
    id VARCHAR(5) DEFAULT 0,  -- 默认值为0
    name VARCHAR(50)
);

-- 插入时使用默认值
INSERT INTO table1(name) VALUES('李明');
```

## 索引创建（INDEX）

```sql
-- 在student表的ID列创建索引
CREATE INDEX studentID_index ON student(ID);
```

## 大对象类型

- **CLOB**：字符大对象
- **BLOB**：二进制大对象

```sql
book_review CLOB(10KB),   -- 10KB文本数据
image BLOB(10MB)          -- 10MB二进制数据
```

## 表创建扩展

**创建相同模式的表：**
```sql
CREATE TABLE temp_instructor LIKE instructor;
```

**基于查询结果创建表：**
```sql
CREATE TABLE t1 AS 
SELECT *
FROM instructor
WHERE dept_name = '法律系';
```

# 授权管理

## 权限授予（GRANT）

**基本语法：**
```sql
GRANT <权限列表>
ON <关系名或视图>
TO <用户/角色列表>;
```

**具体权限示例：**
```sql
-- 授予读取权限
GRANT SELECT ON department TO ming@localhost, li@localhost;

-- 授予特定列更新权限
GRANT UPDATE(budget) ON department TO ming@localhost;

-- 授予插入权限
GRANT INSERT ON department TO ming@localhost;

-- 授予删除权限  
GRANT DELETE ON department TO ming@localhost;
```

**特殊用户：**
- `PUBLIC`：所有当前和将来的用户

## 权限收回（REVOKE）

```sql
REVOKE <权限列表>
ON <关系名或视图>  
FROM <用户/角色列表>;

-- 示例
REVOKE SELECT ON department FROM ming@localhost;
REVOKE UPDATE(budget) ON department FROM ming@localhost;
```

## 权限转移

```sql
GRANT SELECT ON department TO ming@localhost 
WITH GRANT OPTION;  -- 允许用户将权限授予他人
```

## 权限收回选项

**级联收回：** 默认情况下，收回用户权限时会级联收回该用户授予他人的权限。

**防止级联收回：**
```sql
REVOKE SELECT ON department FROM ming@localhost RESTRICT;
```

# 变量

## 系统变量

**全局变量**
```sql
-- 查看所有全局变量
SHOW GLOBAL VARIABLES;

-- 查看部分全局变量
SHOW GLOBAL VARIABLES LIKE '%char%';

-- 查看指定全局变量
SELECT @@global.autocommit;  -- 自动提交设置
SELECT @@tx_isolation;       -- 事务隔离级别

-- 设置全局变量
SET @@global.autocommit = 1;
```

**会话变量：**
```sql
-- 查看所有会话变量
SHOW SESSION VARIABLES;

-- 查看部分会话变量  
SHOW SESSION VARIABLES LIKE '%char%';
```

## 自定义变量

```sql
-- 声明并初始化
SET @count = 1;
SET @count := 1; 
SELECT @count := 1;

-- 赋值（通过查询）
SELECT COUNT(budget) INTO @count
FROM department;

-- 使用变量
SELECT @count;
```

## 局部变量

```sql
-- 在存储过程或函数中声明
DECLARE var_name INT DEFAULT 0;

-- 赋值
SET var_name = 10;
SELECT column_name INTO var_name FROM table_name;
```

# DDL（数据库和表操作）

## 数据库操作

```sql
-- 创建数据库
CREATE DATABASE IF NOT EXISTS db_name CHARACTER SET utf8mb4;

-- 查询所有数据库
SHOW DATABASES;

-- 查询当前数据库
SELECT DATABASE();

-- 使用数据库
USE db_name;

-- 查询数据库字符集
SHOW CREATE DATABASE db_name;

-- 修改数据库字符集
ALTER DATABASE db_name CHARACTER SET utf8mb4;

-- 删除数据库
DROP DATABASE IF EXISTS db_name;
```

## 表操作

```sql
-- 查询表
SHOW TABLES;

-- 查询表结构
DESC table_name;

-- 查询表字符集
SHOW CREATE TABLE table_name;

-- 修改表名
ALTER TABLE table_name RENAME TO new_table_name;

-- 修改表字符集
ALTER TABLE table_name CHARACTER SET utf8mb4;

-- 添加列
ALTER TABLE table_name ADD column_name data_type;

-- 修改列
ALTER TABLE table_name CHANGE column_name new_column_name new_data_type;

-- 删除列
ALTER TABLE table_name DROP column_name;

-- 删除表
DROP TABLE IF EXISTS table_name;
```