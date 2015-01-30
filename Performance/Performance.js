(function() {
	'use strict';

	function Performance(game) {
		this.prevTime = Date.now();

		this.startTime = 0;
		this.logicTime = 0;
		this.renderTime = 0;

		this.fps = 0;
		this.fpsMin = Infinity;
		this.fpsMax = 0;

		this.frames = 0;
		this.entities = 0;

		this.game = game;
		this.font = null;
		this.text = null;
		this.bg = null;
	}

	Performance.prototype = {

		//场景切换时初始化
		init: function() {
			this.font = new soya2d.Font('17px helvetica,arial,sans-serif');

			this.text = new soya2d.Text({
				font: this.font,
				text: 'Fps:00',
				fillStyle: 'yellow',
				x: 10,
				y: 10,
				z: 999,
				w: 110,
				h: 95
			});
			this.game.scene.add(this.text);

			this.bg = new soya2d.Rect({
				w: 116,
				h: 95,
				fillStyle: 'rgba(0,0,0,0.7)',
				z: 998
			});
			this.game.scene.add(this.bg);
		},

		//逻辑计算前开始计时
		beforeUpdate: function(now) {
			this.startTime = now;
		},

		//逻辑计算后结束计时
		afterUpdate: function(now) {
			this.logicTime = now - this.startTime;
		},

		//渲染开始前开始计时
		beforeRender: function(now) {
			this.startTime = now;
		},

		//渲染结束后结束计时
		afterRender: function(now) {
			this.renderTime = now - this.startTime;
		},

		//更新性能数据
		update: function(now) {
			this.frames++;

			if (now > this.prevTime + 1000) {
				this.fps = Math.round((this.frames * 1000) / (now - this.prevTime));
				this.fpsMin = Math.min(this.fpsMin, this.fps);
				this.fpsMax = Math.max(this.fpsMax, this.fps);

				this.prevTime = now;
				this.frames = 0;
			}

			this.entities = this.game.scene.__renderQueue.length - 2;

			this.text.setText('fps: ' + this.fps +
				"\nentities: " + this.entities +
				"\nupdate: " + this.logicTime +
				"ms\nrender: " + this.renderTime + "ms");
		},

		//设置性能面板大小（1,2,3 分别代表小，中，大）
		setPanelSize: function(size) {
			if (size == 1) {
				this.font.size(14);
				this.bg.w = this.text.w = 100;
				this.bg.h = this.text.h = 80;
			} else if (size == 2) {
				this.font.size(17);
				this.bg.w = this.text.w = 116;
				this.bg.h = this.text.h = 95;
			} else if (size == 3) {
				this.font.size(22);
				this.bg.w = this.text.w = 142;
				this.bg.h = this.text.h = 120;
			}
		},

		//设置字体颜色
		setColor: function(color) {
			this.text.fillStyle = color;
		},

		//设置面板颜色
		setBgColor: function(color) {
			this.bg.fillStyle = color;
		}
	};

	soya2d.module.install('performance', {
		onInit: function(game) {
			game.performance = new Performance(game);
		},
		onStart: function(game) {
			game.performance.init();
		},
		onSceneChange: function(game, scene) {
			game.performance.init();
		},
		onBeforeUpdate: function(game, now, d) {
			game.performance.beforeUpdate(now);
		},
		onAfterUpdate: function(game, now, d) {
			game.performance.afterUpdate(now);
		},
		onBeforeRender: function(game, now, d) {
			game.performance.beforeRender(now);
		},
		onAfterRender: function(game, now, d) {
			game.performance.afterRender(now);
			game.performance.update(now);
		}
	});

})();