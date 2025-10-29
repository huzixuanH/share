# HTML

## 1. HTML 基础概念

**HTML** - Hyper Text Markup Language（超文本标记语言）

**超文本**：使用超链接方法将各种不同空间的文字信息组织在一起的网状文本

## 2. 文档基本结构

| 标签                  | 说明                                                         | 重要属性                  |
| --------------------- | ------------------------------------------------------------ | ------------------------- |
| `<!DOCTYPE html>`     | 文档类型声明，告诉浏览器使用标准模式，有助于防止[怪异模式](https://developer.mozilla.org/en-US/docs/Web/HTML/Quirks_Mode_and_Standards_Mode) | -                         |
| `<html lang="en-US">` | HTML根标签                                                   | `lang` - 定义文档主要语言 |
| `<head>`              | 文档头部，包含元数据和资源引用                               | -                         |
| `<body>`              | 文档主体内容                                                 | -                         |

### head 标签内容
```html
<head>
  <meta charset="utf-8" />          <!-- 字符编码 -->
  <title>页面标题</title>            <!-- 页面标题 -->
  <meta name="viewport" content="width=device-width" />  <!-- 视口设置 -->
</head>
```

## 3. 文本标签

### 标题与段落
| 标签             | 说明                 |
| ---------------- | -------------------- |
| `<h1>` 到 `<h6>` | 标题标签，重要性递减 |
| `<p>`            | 段落标签             |
| `<br>`           | 换行                 |
| `<hr>`           | 水平线               |

### 文本格式化
| 标签       | 效果              |
| ---------- | ----------------- |
| `<strong>` | **加粗**          |
| `<em>`     | *倾斜*            |
| `<del>`    | ~~删除线~~        |
| `<ins>`    | <ins>下划线</ins> |

## 4. 图像标签

```html
<img src="../image/man.jpg" align="right" alt="钢铁侠" title="钢铁侠" width="200" height="150" />
```

| 属性           | 说明                     |
| -------------- | ------------------------ |
| `src`          | 图片路径                 |
| `alt`          | 图片无法显示时的替代文本 |
| `title`        | 鼠标悬停提示文本         |
| `width/height` | 宽高设置                 |

## 5. 列表标签

### 有序列表
```html
<ol type="I" start="2">
  <li>第一项</li>
  <li>第二项</li>
</ol>
```

### 无序列表
```html
<ul type="circle">
  <li>项目一</li>
  <li>项目二</li>
</ul>
```

### 定义列表
```html
<dl>
  <dt>名词1</dt>
  <dd>名词1解释1</dd>
  <dd>名词1解释2</dd>
</dl>
```

## 6. 链接与多媒体

### 超链接
```html
<a href="url" target="_blank">链接文本</a>
```

| 属性     | 值         | 说明                 |
| -------- | ---------- | -------------------- |
| `href`   | URL        | 链接地址             |
| `target` | `_self`    | 当前页面打开（默认） |
|          | `_blank`   | 新窗口打开           |
|          | iframe名称 | 在指定iframe中打开   |

### 图片映射
```html
<map name="workmap">
  <area shape="rect" coords="34,44,270,350" href="computer.htm">
</map>
<img src="workplace.jpg" alt="Workplace" usemap="#workmap">
```

### 图形与标题
```html
<figure>
  <img src="image.jpg" alt="描述">
  <figcaption>图片标题</figcaption>
</figure>
```

## 7. 容器标签

| 标签     | 类型 | 说明                       |
| -------- | ---- | -------------------------- |
| `<div>`  | 块级 | 独占一行，常用作布局容器   |
| `<span>` | 行内 | 行内容器，用于文本片段     |
| `<pre>`  | 块级 | 保留空白格式（不折叠空格） |

## 8. 表格标签

### 基本表格结构
```html
<table border="1" width="50%" cellpadding="0" cellspacing="0">
  <caption>表格标题</caption>
  <thead>
    <tr>
      <th>表头1</th>
      <th>表头2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="2">合并列</td>
    </tr>
    <tr>
      <td rowspan="2">合并行</td>
      <td>内容</td>
    </tr>
  </tbody>
</table>
```

### 表格属性
| 属性          | 说明             |
| ------------- | ---------------- |
| `border`      | 边框宽度         |
| `cellpadding` | 内容与单元格间距 |
| `cellspacing` | 单元格间距       |
| `colspan`     | 合并列           |
| `rowspan`     | 合并行           |

## 9. 框架标签

```html
<iframe src="https://baidu.com" width="600" height="600" name="myframe"></iframe>

<!-- 链接在指定iframe中打开 -->
<a href="page.html" target="myframe">在iframe中打开</a>
```

## 10. 表单标签

### 表单基本结构
```html
<form action="submit.php" method="post">
  <!-- 表单项 -->
</form>
```

| 属性     | 值     | 说明                       |
| -------- | ------ | -------------------------- |
| `action` | URL    | 数据提交地址               |
| `method` | `get`  | 参数在URL中显示，大小有限  |
|          | `post` | 参数在请求体中，无大小限制 |

### 表单项类型

#### 输入框
```html
<label for="username">用户名：</label>
<input type="text" id="username" name="username" placeholder="请输入用户名">
```

#### 单选和复选框
```html
<!-- 单选框 -->
<input type="radio" name="gender" value="male" checked> 男
<input type="radio" name="gender" value="female"> 女

<!-- 复选框 -->
<input type="checkbox" name="hobby" value="reading"> 阅读
<input type="checkbox" name="hobby" value="sports"> 运动
```

#### 下拉列表
```html
<select name="province">
  <option value="">--请选择--</option>
  <option value="1">北京</option>
  <option value="2">上海</option>
</select>
```

#### 文本域
```html
<textarea name="message" rows="4" cols="50"></textarea>
```

### input类型总结
| type       | 说明     |
| ---------- | -------- |
| `text`     | 文本输入 |
| `password` | 密码输入 |
| `radio`    | 单选框   |
| `checkbox` | 复选框   |
| `file`     | 文件选择 |
| `submit`   | 提交按钮 |
| `button`   | 普通按钮 |
| `image`    | 图片按钮 |
| `hidden`   | 隐藏域   |

## 11. 元素分类

### 块级元素
- 特征：独占一行，可设置宽高，默认宽度100%
- 示例：`<h1>-<h6>`, `<p>`, `<div>`, `<ul>`, `<ol>`, `<li>`

### 行内元素
- 特征：同行显示，不可设置宽高，宽度为内容宽度
- 示例：`<a>`, `<strong>`, `<em>`, `<span>`

### 行内块元素
- 特征：同行显示，可设置宽高
- 示例：`<img>`, `<input>`, `<td>`

### CSS显示控制
```css
display: block;      /* 转为块级 */
display: inline;     /* 转为行内 */
display: inline-block; /* 转为行内块 */
```

## 12. HTML5 新特性

### 语义化标签
```html
<header>头部</header>
<nav>导航</nav>
<main>主要内容</main>
<article>文章内容</article>
<section>文档章节</section>
<aside>侧边栏</aside>
<footer>尾部</footer>
```

### 多媒体标签

#### 视频
```html
<video src="video.mp4" controls width="320" height="240">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  您的浏览器不支持视频标签
</video>
```

#### 音频
```html
<audio src="audio.mp3" controls>
  您的浏览器不支持音频标签
</audio>
```

### 新增input类型
| type     | 说明     |
| -------- | -------- |
| `email`  | 邮箱输入 |
| `url`    | URL输入  |
| `number` | 数字输入 |
| `range`  | 范围滑块 |
| `date`   | 日期选择 |
| `color`  | 颜色选择 |
| `search` | 搜索框   |

### 新增input属性
| 属性           | 说明               |
| -------------- | ------------------ |
| `autocomplete` | 自动完成（on/off） |
| `autofocus`    | 自动获得焦点       |
| `required`     | 必填字段           |
| `placeholder`  | 提示文本           |
| `multiple`     | 多文件上传         |
