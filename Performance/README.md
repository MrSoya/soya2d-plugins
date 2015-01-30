# 性能查看插件

直接引入Performance.js即可开启插件
```html
<script src="Performance.js"></script>
```

### 1、设置面板大小
```javascript
//game是实例名，参数可以为1、2、3，分别代表小、中、大
game.performance.setPanelSize(size);
```

### 2、设置字体颜色
```javascript
//支持CSS中的颜色各式，如 #FFFFFF 、 rgba(255,255,255,0.5)
game.performance.setColor(color);
```

### 3、设置面板颜色
```javascript
//支持CSS中的颜色各式，如 #FFFFFF 、 rgba(255,255,255,0.5)
game.performance.setBgColor(color);
```
