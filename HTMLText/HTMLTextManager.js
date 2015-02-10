/**
 * HTML文本管理器接口<br/>
 * @namespace soya2d.HTMLTextManager
 * @author {@link http://weibo.com/soya2d MrSoya}
 */
soya2d.HTMLTextManager = new function(){
	var txts = [];
	this.add = function(txt){
		var i = txts.indexOf(txt);
		if(i>-1){
			return false;
		}
		txts.push(txt);
		return this;
	};
	this.remove = function(txt) {
		var i = txts.indexOf(txt);
		if(i>-1)txts.splice(txt, 1);
		return this;
	};

	this.update = function(){
		var toDel = [];
		for(var i=txts.length;i--;){
			if(!txts[i].parent){
				toDel.push(txts[i]);
				continue;
			}
			txts[i].update();
		}
		for(var i=toDel.length;i--;){
			soya2d.HTMLTextManager.remove(toDel[i]);
		}
	};
	
};
