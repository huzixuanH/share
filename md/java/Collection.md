+ Collection 是一个集合接口。 它提供了对集合对象进行基本操作的通用接口方法。Collection接口在Java 类库中有很多具体的实现。是list，set等的父接口。

![](https://cdn.nlark.com/yuque/0/2021/png/2348240/1629715420563-7a8605df-564e-4aa5-a230-04c3afa42d62.png)

# 常用方法

```java
public static void main(String[] args) {
    //创建对象
    Collection c = new ArrayList();

    // 1. boolean add(E e):确保此集合包含指定的元素。
    c.add("hello");

    // 2.boolean addAll(Collection c): 将集合c中的元素添加到现有集合中
    c.addAll(c2);

    // 3.void clear() 				从此集合中删除所有元素。
    // 4.boolean remove(Object o) 	如果存在，则从此集合中删除指定元素的单个实例。
    // 5.removeAll (Collection c)	除交集。 如果存在，移除当前集合中所有集合c中元素
    // 6.retainAll(Collection c)	取当前集合与集合c的交集；将交集的返回给当前集合
    // 7.boolean contains(Object o)	此集合是否包含指定的元素。
    // 8.boolean containsAll(Collection c)	判断形参c中的所有元素是否存在与当前集合 
    // 11. Object[]  toArray(T[] a) 集合到数组
    String[] strings1 = list.toArray(new String[0]);
    
    // 数组-->集合
    List<String> list = Arrays.asList(new String[]{"1", "3", "2"});
}
```


# List, Set, Queue, Map 四者的区别？
+ **List**(对付顺序的好帮手)：存储的元素是有序的、可重复的。
+ **Set**(注重独一无二的性质)：存储的元素是无序的、不可重复的。
+ **Queue**(实现排队功能的叫号机)：按特定的排队规则来确定先后顺序，存储的元素是有序的、可重复的。
+ **Map**(用 key 来搜索的专家)：使用键值对（key-value）存储，类似于数学上的函数 y=f(x)，"x" 代表 key，"y" 代表 value，key 是无序的、不可重复的，value 是无序的、可重复的，每个键最多映射到一个值。

# List特有的迭代器
```java
public interface ListIterator<E> extends Iterator<E> {
 
    boolean hasNext();

    E next();

    // 如果此列表迭代器在相反方向遍历列表时具有更多元素，则返回 true 。 
    boolean hasPrevious(); 

	// 返回列表中的上一个元素，并向后移动光标位置。 
    E previous();

    // 获取下一次调用next方法返回的元素的索引
    int nextIndex();

    // 获取下一次调用previous方法返回的元素的索引
    int previousIndex();

    void remove(); 

    // 用指定的元素（可选操作）替换 next()或 previous()返回的最后一个元素。 
    void set(E e);

    void add(E e);
}
```




ListIterator 接口：列表迭代器

+ 通过集合 List 的 listIterator 方法得到，是 List 集合和Vector特有迭代器
+ 可以从任一方向遍历列表，可以迭代期间修改列表元素，并获取列表中迭代器的当前位置。

```java
List<String> list = new ArrayList<>();
list.add("a");
list.add("bb");

ListIterator<String> lit = list.listIterator(); // 获取迭代器

// 顺序迭代
while (lit.hasNext()) {
    System.out.println(lit.nextIndex());
    String s = lit.next();
    System.out.println(s);
}
lit.add("ccc"); // 利用迭代器先集合添加元素

System.out.println("-------------------");
// 逆序迭代
while (lit.hasPrevious()) {
    System.out.println(lit.previousIndex());
    String previous = lit.previous();

    System.out.println(previous);
}
```

# 遍历集合
+ Iterator
+ **for(E e : list)**  // Iterator
+ ListIterator
+ **forEach**
+ 手写 `for(int i = 0; i < list.size(); i++)`

# Collections 工具类
+ Collections 是一个包装类。 它包含有各种有关集合操作的静态多态方法。此类不能实例化，就像一个工具类，服务于Java的Collection框架。

  ```text
  static <T> void copy(List<? super T> dest, List<? extends T> src)：将所有元素从一个列表(src)复制(覆盖)到另一个列表(dest)中
  
  static void reverse(List<?> list) : 反转指定列表中元素的顺序。
  
  static <T extends Comparable<? super T>> void sort(List<T> list)：根据元素的自然排序排序。
  
  static sort(List, Comparator)：根据指定的 Comparator 产生的顺序对 List 进行排序
  
  Object max(Collection):根据元素的自然顺序，返回给定集合中最大的元素。
  
  Object max(Collection, Comparator):根据Comparator中指定排序，返回集合中最大的元素
  ```

  ```text
  // 根据传入的集合返回一个线程安全的集合
  static <T> Set<T> synchronizedSet(Set<T> s)
  
  static <T> Collection<T> synchronizedCollection(Collection<T> c) 
  
  static <T> List<T> synchronizedList(List<T> list)
  
  static <K,V> Map<K,V> synchronizedMap(Map<K,V> m)
  ```

