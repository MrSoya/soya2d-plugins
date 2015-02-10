# HTMLText 富文本类
用于在soya2d游戏内显示复杂的文本信息，同时保持和其他显示对象相同的使用方法

## 特性
* **soya2d显示对象**
    * 继承自soya2d显示对象，保持统一的API
* **HTML & CSS**
    * 支持HTML标签作为文本内容，同时支持使用CSS来渲染文本，比如裁剪
* **性能**
    * 使用HTMLElement实现，不需要每帧更新，性能更好，显示更平滑

## 使用方法
在soya2d.js后，引入插件的3个文件
```html
<script src="HTMLText.js"></script>
<script src="HTMLTextManager.js"></script>
<script src="install.js"></script>
```

### 创建方式
```javascript
var HTMLTxt = new soya2d.HTMLText({
	text:'这是一段<b>富</b>文本<br/>内容，你可以随意插入HTML代码',
	className:'txt',//css样式名
	//显示对象属性
	x:100,
	y:100,
	w:100,
	h:100,
	originX:0,
	originY:0,
	onUpdate:function(){
		this.rotation++;
		this.skewX++;
	}
});
```
### API
```javascript
	setClassName(classname) //更新样式名，多个样式名用空格分割
```
```javascript
	setText(txt) //更新文本内容
```