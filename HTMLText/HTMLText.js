
/**
 * @classdesc 支持HTML标签的富文本显示
 * @class 
 * @extends soya2d.DisplayObjectContainer
 * @param {Object} data 所有父类参数
 * @param {string} data.text 文本内容,支持HTML标签、内联样式
 * @param {string} data.className CSS样式名,多个样式名用空格分割
 * @author {@link http://weibo.com/soya2d MrSoya}
 */
soya2d.HTMLText = function(data){
	data = data||{};
    soya2d.DisplayObjectContainer.call(this,data);
    soya2d.ext(this,data);

    
    this.node = document.createElement('div');
    this.node.className = data.className || '';
    this.node.innerHTML = data.text || '';

    this.update();
    this.node.style.position = 'absolute';
    soya2d.HTMLTextManager.add(this);
    document.body.appendChild(this.node);


};
soya2d.inherits(soya2d.HTMLText,soya2d.DisplayObjectContainer);
soya2d.ext(soya2d.HTMLText.prototype,{
    /**
     * 重新设置CSS样式名，多个样式名用空格分割
     * @param {string} className CSS样式名
     */
    setClassName:function(className){
        if(!className)return;
        this.node.className = className;
    },
    /**
     * 设置文本内容
     * @param {string} txt 文本内容
     */
	setText:function(txt){
		this.node.innerHTML = txt;
	},
    update:function(game){
        if(this.__originChange || this.__localChange){
            this.node.style.width = this.w + 'px';
            this.node.style.height = this.h + 'px';

            this.updateTransform();
            var we = this.__worldTransform.e;
            var pe = this.__worldPosition.e;
            var oe = this.__originPosition.e;

            var x = pe[0]-oe[0],
                y = pe[1]-oe[1];

            this.node.style['transformOrigin'] = 
            this.node.style['msTransformOrigin'] = 
            this.node.style['oTransformOrigin'] = 
            this.node.style['webkitTransformOrigin'] = 
            this.node.style['mozTransformOrigin'] = this.originX + ' ' + this.originY;

            this.node.style['transform'] = 
            this.node.style['msTransform'] = 
            this.node.style['oTransform'] = 
            this.node.style['webkitTransform'] = 
            this.node.style['mozTransform'] = 'matrix('+ we[0] +','+ we[1] +','+ we[2] +','+ we[3] +','+ x +','+ y +')';
        }
    }
});