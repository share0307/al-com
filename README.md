# al-com

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

代码规范化
vscode格式化vue-beautify   Beautify



npm
npm install vant -S
npm install mand-mobile -S
npm install vue-navigation -S
npm install less less-loader --save-dev
npm install scss scss-loader --save-dev
cnpm install node-sass --save-dev 
cnpm install sass-loader --save-dev
npm install stylus stylus-loader --save-dev
babel-plugin-import 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式(配置写在babel.config.js里面)
# 安装 babel-plugin-import 插件
npm i babel-plugin-import -D



###console日志级别
接口级别       red-yellow-green
router级别     



vw适配方案
link(https://www.w3cplus.com/mobile/vw-layout-in-vue.html)
需要npm的插件
npm i postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext postcss-viewport-units cssnano --S
cssnano的额外补充插件
npm i cssnano-preset-advanced --save-dev

注：更新说明（2018-11-02）: 经过一段时间项目的验证，在我们团队已经开始不引用Polyfill。也可以把postcss-viewport-units不安装引用，以及去除对应的viewport-units-buggyfill。
所以新的npm为
npm i postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext cssnano --S





css
## 内置样式
Vant 中默认包含了一些常用样式，可以直接通过 className 的方式使用。

### 文字省略
当文本内容长度超过容器最大宽度时，自动省略多余的文本。

```html
<div class="van-ellipsis">这是一段宽度限制 250px 的文字，后面的内容会省略</div>
```
### 1px 边框
为元素添加 Retina 屏幕下的 1px 边框（即 hairline），基于伪类 transform 实现。

```html
<!-- 上边框 -->
<div class="van-hairline--top"></div>
<!-- 下边框 -->
<div class="van-hairline--bottom"></div>
<!-- 左边框 -->
<div class="van-hairline--left"></div>
<!-- 右边框 -->
<div class="van-hairline--right"></div>
<!-- 上下边框 -->
<div class="van-hairline--top-bottom"></div>
<!-- 全边框 -->
<div class="van-hairline--surround"></div>
```
### 动画
可以通过 `transition` 组件使用内置的动画

```html
<!-- 淡入 -->
<transition name="van-fade">
  <div v-show="visible">Fade</div>
</transition>

<!-- 下滑 -->
<transition name="van-slide-bottom">
  <div v-show="visible">Fade</div>
</transition>
```




### 参考组件
#### 骨架屏svg  https://github.com/michalsnik/vue-content-placeholders(使用第二个npm)
###### npm install vue-content-placeholders --save
###### npm install --save-dev page-skeleton-webpack-plugin
       npm install --save-dev html-webpack-plugin
表单验证   https://github.com/baianat/vee-validate
专场特效参考不使用https://github.com/jaweii/vueg.git

### tencent调试工具
npm install vconsole
