## 网站性能优化项目
对 `index.html` 和 `views/js/main.js`进行了优化，`index.html`在移动设备和桌面上的`PageSpeed`分数达到90分以上。`views/pizza.html` 在滚动时保持 `60fps` 的帧速，调整pizza尺寸的时间小于5毫秒

## 文件说明
  **dist** 里的文件是生产代码，**src** 里的文件是源代码

## install
 * 在项目根目录运行命令行
``` bash
  $> npm install
```
 * 成功安装后，在**dist**文件夹里面运行命令行，创建一个本地服务器
 ``` bash
   $> python -m http.server 8080
 ```
 浏览器输入网址 `localhost:8080`，即可看到项目网站


## 优化概述
  * 减小请求的数据量
      * 使用gulp工具压缩html、css、js文件

  * index.html
    1. 减少关键资源的数量
        *  引用外部的js时，在`<script>`中使用 **async** 属性，实现js异步执行

    2. 使用ps软件修改pizzeria.jpg图片的宽高，减小图片大小

    3. 使用gulp工具对所有图片进行压缩

  * views/js/main.js
    1. `views/pizza.html` 在滚动时，使用`requestAnimationFrame`来调用`updatePositions`

    2. 将`updatePositions`函数里的`document.body.scrollTop`放在for循环外面获取，避免了强制同步布局

    3. `sizeSwitcher (size)`修改原来的改变宽度的方式，通过百分比来改变`randomPizzaContainer`的宽度，避免了强制同步布局

## gulp工具说明
  gulp的任务已经全部加在`mywatch`任务里，
  如果需要修改项目代码，需在项目根目录运行命令行
``` bash
$> npm run start
```
  修改代码，再保存代码，**dist** 里对应的文件将会更新
  * **注意:** 如果修改了gulpfile.js文件，需要重新运行上面这条命令行
