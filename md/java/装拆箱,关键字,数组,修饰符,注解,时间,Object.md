# 自动拆装箱
- 基本类型，或者叫做内置类型，是 Java 中不同于类(Class)的特殊类型。它们是我们编程中使用最频繁的类型。
   - 上文提到的8种基本数据类型
   - Java 中还存在另外一种基本类型 void，它也有对应的包装类 java.lang.Void，不过我们无法直接对它们进行操作。
## 基本类型的好处

- 在 Java 语言中，new 一个对象是存储在堆里的，通过栈中的引用来使用这些对象；所以，对象本身来说是比较消耗资源的。
- 对于经常用到的类型，如 int 等，如果每次使用这种变量的时候都需要 new 一个 Java 对象的话，就会比较笨重。所以，和 C++ 一样，Java 提供了基本数据类型，这种数据的变量不需要使用 new 创建，他们不会在堆上创建，而是直接在栈内存中存储，因此会更加高效。
## 包装类型
| **基本数据类型** | **包装类** |
| --- | --- |
| byte | Byte |
| boolean | Boolean |
| short | Short |
| char | Character |
| int | Integer |
| long | Long |
| float | Float |
| double | Double |
| void | Void |

## 为什么需要包装类
这个问题，其实前面已经有了答案，因为 Java 是一种面向对象语言，很多地方都需要使用对象而不是基本数据类型。比如，在集合类中，我们是无法将 int 、double 等类型放进去的。因为集合的容器要求元素是 Object 类型。
为了让基本类型也具有对象的特征，就出现了包装类型，它相当于将基本类型“包装起来”，使得它具有了对象的性质，并且为其添加了属性和方法，丰富了基本类型的操作。

## 自动拆箱与装箱

- 基本数据类型和包装类，肯定有些时候要在他们之间进行转换。
- 在 Java SE5 中，Java 提供了自动拆箱与自动装箱功能。

- 自动装箱: 将基本数据类型自动转换成对应的包装类。
- 自动拆箱：将包装类自动转换成对应的基本数据类型。
```java
Integer integer=1; //装箱
int i=integer;     //拆箱
```
## 原理
以上代码反编译后：
```java
Integer integer=Integer.valueOf(1);
int i=integer.intValue();
```

- **自动装箱都是通过包装类的 **`**valueOf()**`** 方法来实现的，自动拆箱都是通过包装类对象的 **`**xxxValue()**`** 来实现的。**
- **编译器在生成类的字节码时， 插人必要的方法调用。**
## 使用场景
### 基本类型加入到集合
```java
List<Integer> li = new ArrayList<>();
for (int i = 1; i < 50; i ++){
    li.add(i); // 反编译：li.add(Integer.valueOf(i)); 自动装箱
}
```
### 包装类型与基本类型比较大小
```java
Integer a = 1;
boolean b = a == 1 ? "等于" : "不等于"; // boolean b = a.intValue() == 1 ? "等于" : "不等于"  自动拆箱
```
### 包装类运算
```java
Integer i = 10; // Integer i = Integer.valueOf(10);
Integer j = 20; // Integer j = Integer.valueOf(20);

System.out.println(i+j); // System.out.println(i.intValue() + j.intValue());
```
### 三目运算符的使用
```java
boolean flag = true;
Integer i = 0;
int j = 1;
int k = flag ? i : j;

// *****************反编译*****************
boolean flag = true;
Integer i = Integer.valueOf(0); // 装箱
int j = 1;
int k = flag ? i.intValue() : j; // 拆箱

// 所以，如果i = null;就会报错：NPE（NullPointException）
```
### 函数的参数与返回值
```java
//自动拆箱
public int getNum1(Integer num) {
    return num;
}

//自动装箱
public Integer getNum2(int num) {
    return num;
}
```
## 自动拆装箱与缓存
```java
Integer integer1 = 3;
Integer integer2 = 3;
System.out.println(integer1 == integer2); // true
Integer integer3 = 300;
Integer integer4 = 300;
System.out.println(integer3 == integer4); // false
```

- 原因和 Integer 中的缓存机制有关。在 Java 5 中，在 Integer 的操作上引入了一个新功能来节省内存和提高性能。整型对象通过使用相同的对象引用实现了缓存和重用。
- 适用于整数值区间 **-128 至 +127**
- 第一次使用Integer的时候也需要一定的额外时间来初始化这个缓存
- 

- 最大值 127 可以通过 -XX:AutoBoxCacheMax=size 修改。
- 实际上这个功能在 Java 5 中引入的时候,范围是固定的 -128 至 +127。在 Java 6 中，可以通过java.lang.Integer.IntegerCache.high 设置最大值。

- 在 Boxing Conversion 部分的 Java 语言规范(JLS)规定如下：
   - 如果一个变量 p 的值是：
      - -128 至 127 之间的整数 (§3.10.1)
      - true 和 false 的布尔值 (§3.10.3)
      - \u0000 至 \u007f 之间的字符 (§3.10.4)
      - Byte, Short, Long有固定范围: -128 到 127
      - Character, 固定范围是 0 到 127
   - 范围内的时，将 p 包装成 a 和 b 两个对象时，可以直接使用 a == b 判断 a 和 b 的值是否相等。

## 自动拆装箱带来的问题

- 包装对象的数值比较，不能简单的使用 ==，虽然 -128 到 127 之间的数字可以，但是这个范围之外还是**需要使用 equals 比较**。
- 前面提到，有些场景会进行自动拆装箱，同时也说过，由于自动拆箱，如果包**装类对象为 null ，那么自动拆箱时就有可能抛出 NPE**。
- 如果一个 f**or 循环中有大量拆装箱操作，会浪费很多资源**。

## 推荐使用

- 所有的POJO类属性必须使用包装数据类型。
- RPC（Remote Procedure Call 远程过程调用）方法的返回值和参数必须使用包装数据类型。
- 所有的局部变量使用基本数据类型。
# 关键字
**Java中的关键字有哪些？**

- 48个关键字：abstract、**assert**、boolean、break、byte、case、catch、char、class、continue、**default**、do、double、else、enum、extends、final、finally、float、for、if、implements、import、int、interface、instanceof、long、native、new、package、private、protected、public、return、short、static、**strictfp**、super、switch、synchronized、this、throw、throws、transient、try、void、volatile、while

- 2个保留字（现在没用以后可能用到作为关键字）：**goto**、**const【**用法跟final相似，不常用**】**

- 3个特殊直接量：true、false、null
## static

- 可修饰成员变量、成员方法、内部类、代码块
- **特点**
   - 被所有的对象所共享
   - 使用类名调用
   - 随着类的加载而加载，优先于对象加载
- **静态方法**
   - 静态方法只能调用静态的成员变量、方法
- **非静态方法**
   - 可以调用静态的成员变量
   - 可以调用静态的成员方法
   - 可以调用非静态的成员变量
   - 可以调用非静态的成员方法
   - 静态的方法中没有this、super对象
- **静态嵌套类**
   - 使用与其他顶层类一样，嵌套只是为了便于项目打包。
## this 和 super

- this 理解为当前对象的引用
   - 方法中使用this时，this指调用这个方法的对象
   - 子类的构造方法第一行可调用子类其他或父类构造方法

- super 理解为父类的“引用”（super 不是一个对象的引用， 不能将 super 赋给另一个对象变量， 它是**指示编译器调用超类方法的特殊关键字**）
   - 在子类的构造方法第一行调用父类的构造方法（默认调空参）
   - this == super // true
## final

- 修饰符，可以用于修饰类、方法和变量
- 修饰的类：不能被继承，final 类中的所有成员方法都会被隐式地指定为 final 方法。
- 修饰的方法：不能被重写
- 修饰的变量：是不可以修改的，是常量
- 修饰引用类型地址值不能改变，地址里面的内容可以改变
- 常量：
   - 字面值常量：1, 2, 3
   - 自定义常量：被 final 所修饰的成员变量，一旦初始化则不可改变
   - 注意：final常量必须初始化，可以选择显示初始（final int num = 1）化或者在构造初始化
## instanceof

- instanceof 是 Java 的一个二元操作符，类似于 ==，>，< 等操作符。
- **a instanceof A **：判断对象a是否为类A的实例。
- 作用：为避免向下转型时出现ClassCastException异常，转型前进行instanceof判断，true则向下转型，false则不向下转型
## transient

- 某个对象的属性不被序列化，用 transient 修饰

- ArrayList类和Vector类都是使用数组实现的，但是在定义数组elementData这个属性时稍有不同，那就是ArrayList使用transient关键字
```java
// ArrayList    
transient Object[] elementData; // non-private to simplify nested class access

// Vector
protected Object[] elementData;
```

- 简单说，被transient修饰的成员变量，在序列化的时候其值会被忽略，在被反序列化后， transient 变量的值被设为初始值， 如 int 型的是 0，对象型的是 null。
# 数组
## 一维数组

- 声明
   - int[] arr1 =new int[size];
   - int[] arr2 ={1, 2, 3};
   - new int[]{1, 2, 3};
- 索引越界：ArrayIndexOutOfBoundException
- 数组的复制
   - arr.clone();
   - System.arraycopy() 平均最快
   - Arrays.copyOf() 底层也是调用System.arraycopy()
- 打印数组
   - Arrays.toString(arr);
## 二维数组

- 声明
   - int[][] arr1 = new int[][] { { 1, 2, 3 }, { 1, 2 }, { 3, 4, 5 } };
   - String[][] arr2 = new String[3][2];
   - String[][] arr2 = new String[3][];
- 打印数组 Arrays.deepToString(arr);
# 权限修饰符

根据您提供的文件内容，以下是对 Java 访问修饰符权限的总结表格：

| 修饰符    | 当前类 | 同一包内 | 子孙类（同一包） | 子孙类（不同包） | 其他包 |
| --------- | ------ | -------- | ---------------- | ---------------- | ------ |
| public    | ✅      | ✅        | ✅                | ✅                | ✅      |
| protected | ✅      | ✅        | ✅                | ✅                | ❌      |
| default   | ✅      | ✅        | ✅                | ❌                | ❌      |
| private   | ✅      | ❌        | ❌                | ❌                | ❌      |

# 大数值

- 用** java.math** 包中的两个类：**BigInteger** 和 **BigDecimal**。这两个类可以处理包含任意长度数字序列的数值。Biglnteger 类实现了任意精度的整数运算， BigDecimal 实现了任意精度的浮点数运算。
- 使用静态的 valueOf方法或构造器可以将普通的数值转换为大数值：
   - `BigInteger a = BigInteger.valueOf(100);`
   - `BigInteger b = new BigInteger("100");`
- 不能使用算术运算符（`+、*、...`) 处理大数值。 需要使用大数值类中的 `add` 和 `multiply` 方法。
   - `BigInteger c = a.add(b);    // c = a + b`
   - `BigInteger d = c.nultipiy(b.add(Biglnteger.valueOf(2)));   // d = c * (b + 2)`
   - 比较大小：`int compareTo(BigInteger other)`
- 禁止使用 `BigDecimal(double)` 构造方法，存在精度损失风险。使用
  - `BigDecimal recommend1 = new BigDecimal("0.1");`
  - `BigDecimal.valueOf(0.1);`
# 注解

- jdk 5.0 新增的功能。
## 元注解

- 对现有的注解进行解释说明的注解，即定义其他注解的注解 。
```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.SOURCE)
public @interface Override {
}

```

- `@Target` `@Retention` 就是元注解。
- `@Override` 是自定义注解

**元注解有六个**

- @Target（表示该注解可以用于什么地方：类，方法，字段）
- 

- @Retention（表示再什么级别保存该注解信息）
   - SOURCE（注解仅存在于源码中，在class字节码文件中不包含）
   - CLASS（默认的保留策略，注解会在class字节码文件中存在，但运行时无法获取）
   - RUNTIME（注解会在class字节码文件中存在，在运行时可以通过反射获取到）
   - 如果想要在程序运行过程中通过反射来获取注解的信息需要将Retention设置为RUNTIME
- 

- @Documented（将此注解包含再javadoc中）
   - 用于指定被修饰的注解类将被javadoc工具提取成文档
- 

- @Inherited（允许子类继承父类中的注解）
- 

- @Repeatable（1.8新增，允许一个注解在一个元素上使用多次）
- 

- @Native（1.8新增，修饰成员变量，表示这个变量可以被本地代码引用，常常被代码生成工具使用）。
## Java中常见的注解

- @Override 表示当前方法覆盖了父类的方法
- 

- @Deprecated 表示方法已经过时，方法上有横线，使用时会有警告。
- 

- @SuppressWarnings 表示关闭一些警告信息（通知java编译器忽略特定的编译警告）
- 

- @SafeVarargs (jdk1.7更新) 表示：专门为抑制“堆污染”警告提供的。
- 

- @FunctionalInterface (jdk1.8更新) 表示：用来指定某个接口必须是函数式接口，否则就会编译出错。
## Spring 中常见注解

- @Configuration把一个类作为一个IoC容器，它的某个方法头上如果注册了@Bean，就会作为这个Spring容器中的Bean。
- 

- @Scope注解 作用域
- 

- @Lazy(true) 表示延迟初始化
- 

- @Service用于标注业务层组件、@Controller用于标注控制层组件@Repository用于标注数据访问组件，即DAO组件。
- 

- @Component泛指组件，当组件不好归类的时候，我们可以使用这个注解进行标注。
- 

- @Scope用于指定scope作用域的（用在类上）
- 

- @PostConstruct用于指定初始化方法（用在方法上）
- 

- @PreDestory用于指定销毁方法（用在方法上）
- 

- @DependsOn：定义Bean初始化及销毁时的顺序
- 

- @Primary：自动装配时当出现多个Bean候选者时，被注解为@Primary的Bean将作为首选者，否则将抛出异常
- 

- @Autowired 默认按类型装配，如果我们想使用按名称装配，可以结合@Qualifier注解一起使用。如下：
- 

- @Autowired @Qualifier("personDaoBean") 存在多个实例配合使用


- @Resource默认按名称装配，当找不到与名称匹配的bean才会按类型装配。
   - @Resource 并不是Spring提供的注解，由j2ee（Java 2 Platform Enterprise Edition）提供
### @Component 、@Repository、@Service、@Controller 区别

-  @Component指的是组件
   - @Controller，@Repository和@Service 注解都被@Component修饰，用于代码中区分表现层，持久层和业务层的组件，代码中组件不好归类时可以使用@Component来标注
- 

-  当前版本只有区分的作用，未来版本可能会添加更丰富的功能
## 自定义注解

- 使用`@interface`
```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface EnableAuth {
    String key() default "hello"; // 定义成员变量，并带默认值
    String value(); // 成员变量
}
```
# 时间 API

- Java 1.0 有一个 Date 类。
- Java 1.1 引入 Calendar 类之后，Date 类中的大部分方法就被弃用了。但是，Calendar 的 API 还不够给力，它的实例是易变的，并且它没有处理如闰秒这样的问题。
- Java SE 8 中引入的 **java.time.API**，修正了过去的缺陷。
## Calendar

- 获取对象 Calendar c = Calendar.getInstance();`
- 获取年, 月, 日, 时间
```java
int year = c.get(Calendar.YEAR);
int month = c.get(Calendar.MARCH) + 1;
int date = c.get(Calendar.DATE);
Date date = c.getTime();
```
## Date

- **时间戳**（timestamp），一个能表示一份数据在某个特定时间之前已经存在的、 完整的、 可验证的数据,通常是一个字符序列，唯一地标识某一刻的时间。
- 时间戳是指格林威治时间`1970年01月01日00时00分00秒(北京时间1970年01月01日08时00分00秒)`起至现在的总秒数。

**使用**

- `**new Date();** // Sat Sep 25 19:26:41 CST 2021`
   - CST：北京时间，China Standard Time，是中国的标准时间。在时区划分上，属东八区，比协调世界时早8小时，记为UTC+8，当格林威治时间为凌晨0:00时，中国标准时间刚好上午8:00。
- `date.getTime();`
   - 获取 timestamp
   - 获取 timestamp 一般使用System中方法currentTimeMillis();
## SimpleDateFormat 用法

- SimpleDateFormat 是 Java 提供的一个格式化和解析日期的工具类。它允许进行格式化（日期 -> 文本）、解析（文本 -> 日期）和规范化。SimpleDateFormat 使得可以选择任何用户定义的日期-时间格式的模式。
- simpleDateFormat 是**线程不安全的类**，一般不要定义为static变量，如果定义为static，须加锁。
   - 定义为局部变量
   - 加锁
   - 使用ThreadLocal
```java
/**
 * 使用ThreadLocal定义一个全局的SimpleDateFormat
 */
private static ThreadLocal<SimpleDateFormat> simpleDateFormatThreadLocal = new ThreadLocal<SimpleDateFormat>() {
    @Override
    protected SimpleDateFormat initialValue() {
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    }
};

//用法
String dateString = simpleDateFormatThreadLocal.get().format(calendar.getTime());
```
### Date、String互转
```java
// Date转String
Date data = new Date();
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
String dataStr = sdf.format(data);
System.out.println(dataStr);  // 2021-09-25 19:51:40

// String转Data
Date d = sdf.parse(dataStr)
System.out.println(d); // Sat Sep 25 19:54:13 CST 2021
```
| 模式字符串                       | 示例                                   |
| -------------------------------- | -------------------------------------- |
| `"yyyy.MM.dd G 'at' HH:mm:ss z"` | `2001.07.04 AD at 12:08:56 PDT`        |
| `"EEE, MMM d, ''yy"`             | `Wed, Jul 4, '01`                      |
| `"h:mm a"`                       | `12:08 PM`                             |
| `"hh 'o''clock' a, zzzz"`        | `12 o'clock PM, Pacific Daylight Time` |
| `"K:mm a, z"`                    | `0:08 PM, PDT`                         |
| `"yyyyy.MMMMM.dd GGG hh:mm aaa"` | `02001.July.04 AD 12:08 PM`            |
| `"EEE, d MMM yyyy HH:mm:ss Z"`   | `Wed, 4 Jul 2001 12:08:56 -0700`       |
| `"yyMMddHHmmssZ"`                | `010704120856-0700`                    |
| `"yyyy-MM-dd'T'HH:mm:ss.SSSZ"`   | `2001-07-04T12:08:56.235-0700`         |

格式符号说明：

- **SSS**：毫秒
- **G**：纪元（AD/BC）
- **z**：时区缩写
- **zzzz**：完整时区名称
- **EEE**：星期几缩写
- **a**：上午/下午标记
- **Z**：时区偏移量（如-0700）

## Java 8 中的时间处理

- Java 8中， 新的时间及⽇期API位于java.time包中

- Instant： 时间戳
   - `Instant now = Instant.now(); // 2021-05-15T11:28:45.028991300Z`
- 

- LocalDate： 只包含⽇期，如： 2016-10-20
- 

- LocalTime： 只包含时间， ⽐如： 23:10
- 

- LocalDateTime： 包含⽇期和时间， ⽐如： 2016-10-20 23:21
- 

- Period： 时间段
- ......
### 获取当前时间
```java
LocalDateTime localDateTime = LocalDateTime.now();
System.out.println(localDateTime); // 2021-09-26T16:28:16.141114200

// localDateTime.getXxx(); 获取相关属性
int year = localDateTime.getYear();
int month = localDateTime.getMonthValue();
int day = localDateTime.getDayOfMonth();

System.out.printf("Year: %d; Month: %d; day: %d%n", year,month, day); 
// Year: 2021; Month: 9; day: 26
		
```
### 创建指定时间
```java
// 设置指定的年、月、日、时、分、秒
LocalDateTime localDateTime1 = LocalDateTime.of(2000, 01, 02, 03, 04, 05);
System.out.println(localDateTime1); // 2000-01-02T03:04:05
```
### 检查闰年
```java
LocalDate nowDate = LocalDate.now();
//判断闰年
boolean leapYear = nowDate.isLeapYear();
```
### 计算2个日期之间的天数、月数
```java
Period period = Period.between(LocalDate.of(2020, 7, 5),LocalDate.of(2021, 9, 26));
int years = period.getYears();
int months = period.getMonths();
int days = period.getDays();

System.out.println(period); // P1Y2M21D 二者相距1年2个月零21天
```
### DateTimeFormatter 用法

- 如果是Java 8应用，可以使用**DateTimeFormatter**代替SimpleDateFormat，这是一个线程安全的格式化工具类
```java
// 解析日期
String dateStr= "2016年10月25日";
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy年MM月dd日");
LocalDate date= LocalDate.parse(dateStr, formatter);
System.out.println(date);

// 日期转换为字符串
LocalDateTime now = LocalDateTime.now();
DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy年MM月dd日 hh:mm a");
String nowStr = now.format(format);
System.out.println(nowStr);
```
## ZonedDateTime

- 表示带时区的日期和时间
```java
ZonedDateTime zbj = ZonedDateTime.now(); // 默认时区
ZonedDateTime zny = ZonedDateTime.now(ZoneId.of("America/New_York")); // 指定时区
System.out.println(zbj); // 2022-05-29T00:29:45.197+08:00[Asia/Shanghai]
System.out.println(zny); // 2022-05-28T12:29:45.205-04:00[America/New_York]
```

- LocalDateTime与ZonedDateTime转换
```java
LocalDateTime ldt = LocalDateTime.now();
ZonedDateTime zbj = ldt.atZone(ZoneId.systemDefault());
ZonedDateTime zny = ldt.atZone(ZoneId.of("America/New_York"));
System.out.println(zbj); // 2022-05-29T00:32:49.479+08:00[Asia/Shanghai]
System.out.println(zny); // 2022-05-29T00:32:49.479-04:00[America/New_York]
LocalDateTime ldt2 = zbj.toLocalDateTime();
System.out.println(ldt2); // 2022-05-29T00:42:27.622
```

- 时区转换`ZonedDateTime zny = zbj.**withZoneSameInstant**(ZoneId.of("America/New_York"));`
# Object 类

所有类的超类

方法：

- **static class initializer regist** - 静态类初始化器注册
- **registerNatives(): void** - 注册本地方法

- **getClass(): Class<?>** - 获取对象的运行时类

- **hashCode(): int** - 返回对象的哈希码值
- **equals(Object): boolean** - 判断对象是否相等

- **clone(): Object** - 创建并返回对象的副本
- **toString(): String** - 返回对象的字符串表示

- **notify(): void** - 唤醒在此对象监视器上等待的单个线程
- **notifyAll(): void** - 唤醒在此对象监视器上等待的所有线程
- **wait(long): void** - 使当前线程等待，直到其他线程调用 notify() 或 notifyAll()
- **wait(long, int): void** - 使当前线程等待，支持纳秒级精度
- **wait(): void** - 使当前线程无限期等待

- **finalize(): void** - 当垃圾回收器确定不存在对该对象的更多引用时调用

## getClass 方法

- 返回对象所属的类型
## equals 方法

-  equals 方法用于检测一个对象是否等于另外一个对象。
- 在 Object 类中，这方法将判断两个对象是否具有相同的引用。

- 重写 equals 方法：
```java
public boolean equals(Object otherObject) {
    // 对象地址相同返回true
    if (this == otherObject) return true;

    // 如果显式参数为null 或 类别不匹配（不是同一个类的对象），返回false
    if (otherObject == null || getClass() != otherObject.getClass()) return false;

    // 将参数对象可强转为比较对象（是一个不为null的employee对象）
    Employee other = (Employee) otherObject;

    // 测试这些字段是否具有相同的值，name与hireDay是引用数据类型，salary是基本数据类型，为防止name，或other.name为null，可使用Objects.equals 方法比较
    return Objects.equals(name, other.name) && salary == other.salary  && Objects.equals(hireDay, other.hireDay);
    // 对于某一个类的子类，可先调用super.equals 方法，再比较子类独有的字段
}

```

- 重写 equals 方法原则：
   - 自反性：对于任何非空引用 x, x.equals(x) 应该返回 true
   - 对称性: 对于任何引用 x 和 y, 当且仅当 y.equals(x) 返回 true , x.equals(y) 也应该返回 true。
      - e.equals(m);  e 是一个 Employee 对象， m【子类】 是一个 Manager 对象， 如果在 Employee.equals 中用 instanceof 进行检测，则返回 true，但是 m.equals(e)返回 false、 但是对称性要求这个方法调用返回 false，或抛出异常。
      - 有一个应用 AbstractSet 类的 equals 方法的典型例子，它将检测两个集合是否有相同的元素。AbstractSet 类有两个具体子类（子类并没有重写 equals 方法）： TreeSet 和 HashSet, 它们分别使用不同的算法实现查找集合元素的操作。无论集合采用何种方式实现，都需要拥有对任意两个集合进行比较的功能。
      - 

      - 如果子类能够拥有自己的相等概念， 则对称性需求将强制采用 getClass 进行检测。
      - 如果由超类决定相等的概念，就可以使用 intanceof 进行检测， 这样可以在不同子类的对象之间进行相等的比较。

   - 在标准 Java 库中包含150多个 equals 方法的实现，包括使用 instanceof 检测、调用 getClass 检测、 捕获ClassCastException 或者什么也不做。
   - 

   - 对于数组类型的域， 可以使用静态的** Arrays.equals **方法检测相应的数组元素是否相等
- 

- 传递性： 对于任何引用 x、 y 和 z, 如果 x.equals(y) 返会 true， y.equals(z) 返回 true, x.equals(z) 也应该返回 true。
- 

- 一致性： 如果 x 和 y 引用的对象没有发生变化，反复调用 x.equals(y) 应该返回同样的结果。
- 

- 对于任意非空引用 x, x.equals(null) 应该返回 false
## hashCode 方法

- 散列码（ hash code ) 是由对象导出的一个整型值。散列码是没有规律的。如果 x 和 y 是两个不同的对象， x.hashCode() 与 y.hashCode( ) 基本上不会相同。
- hashCode方法定义在 Object 类中，是一个本地方法， 因此每个对象都有一个默认的散列码，其值为对象的存储地址。
- 如果重新定义 equals 方法，就必须重新定义 hashCode 方法， 以便用户可以将对象插人到散列表中。
```java
public int hashCode() {
    return Objects.hash(name, salary, hireDay);
}
```

- equals 与 hashCode 的定义必须一致：如果 x.equals(y) 返回 true, 那么 x.hashCode() 必须与 y.hashCode() 具有相同的值。

- **写equals方法的时候需要重写hashCode方法呢？**
   - 当你把对象加入 HashSet 时， HashSet 会先计算对象的 hashcode 值来判断对象加入的位置，同时也会与其他已经加入的对象的 hashcode 值作比较：
      - 如果没有相符的 hashcode， HashSet 会假设对象没有重复出现。
      - 如果发现有相同 hashcode 值的对象，这时会调 equals() 方法来检查 hashcode 相等的对象是否真的相同。
      - 如果两者相同， HashSet 就不会让其加入操作成功。
      - 如果不同就加入。
   - 如果不重写hashCode方法，默认是通过地址值得到hash值，即使对象相同，地址值也会不同，所以要重写。
## toString 方法

- toString方法， 它用于返回表示对象值的字符串。
- 对于数组：Arrays.toString
- 对于多维数组：Arrays.deepToString
## clone 方法

- protected native Object **clone**() throws CloneNotSupportedException;
- 

- **Cloneable **接口，这个接口指示一个类提供了一个安全的 clone 方法。
   - 这个接口只作为一个标记，指示类设计者了解克隆过程。 如果一个对象请求克隆， 但没有实现这个接口， 就会生成一个受査异常。

- 克隆的具体含义，一个包含对象引用的变量建立副本时会发生什么。原变量和副本都是同一个对象的引用。

	​	

- 默认的克隆操作是“浅拷贝”，当类中属性有其他类的对象（除开8种基本数据类型），只是复制了地址值，并没有将该对象复制一遍。
   - ①如果原对象和浅克隆对象共享的子对象是不可变（用final修饰）的， 这种共享就是安全的。如果子对象属于一个不可变的类， 如 String, 这种情况下同样是安全的。
   - ②通常子对象都是可变的， 必须重新定义 clone 方法来建立一个深拷贝， 同时克隆所有子对象（不仅仅只是复制对象的引用）。

### 如果浅拷贝满足需求
```java
public class Employee implements Cloneable{
    private String name;
    private LocalDate birthDay;

    @Override
    protected Employee clone() throws CloneNotSupportedException {
        return (Employee) super.clone();
    }
}
```
### 需要时使用深拷贝
```java
public class Employee implements Cloneable{
    private String name;
    private Date birthDay; // public class Date implements Cloneable
    private Employeer boss; // public class Employer implements Cloneable

    @Override
    public Employee clone() throws CloneNotSupportedException {
        Employee clone = (Employee) super.clone();
        clone.birthDay = (Date) birthDay.clone(); // 一般这里是getter/stter方法，这里简化了
        clone.boss = (Employeer)boss.clone();
        return clone;
    }
}
```

- 通过序列化实现深拷贝(比上一个方法慢)：
   - 类是可序列化的
   - 直接将对象序列化到输出流中，再将其读回。即实现深拷贝
```java
class Employee extends SerialCloneable {
    private String name;
    private Date birthDay;
    private Employer boss;
}

class SerialCloneable implements Cloneable, Serializable {
    @Override
    public Object clone() throws CloneNotSupportedException {
        try {
            ByteArrayOutputStream bout = new ByteArrayOutputStream(); // 将读入的数据保存到字节数组中，可以不用保存到文件
            try (
                ObjectOutputStream out = new ObjectOutputStream(bout)
            ) {
                out.writeObject(this);
            }

            try (
                ByteArrayInputStream bin = new ByteArrayInputStream(bout.toByteArray());
            ) {
                ObjectInputStream in = new ObjectInputStream(bin);
                return in.readObject();
            }
        } catch (IOException | ClassNotFoundException e) {
            CloneNotSupportedException e2 = new CloneNotSupportedException();
            e2.printStackTrace();
            // e2.initCause(e); // 包装异常类型
            throw e2;
        }
    }
}
```
## finalize 方法
Java 语言提供了对象终止（finalization）机制来允许开发人员提供对象被销毁之前的自定义处理逻辑。
垃圾回收某个对象之前，会先调用这个对象的 `protected void finalize() throws Throwable { }` 方法。
