(function() {
	'use strict';

	var prevTime = Date.now();

	var fps = 0;
	var fpsMin = Infinity;
	var fpsMax = 0;

	var frames = 0;
	var visible = true;

	var text;

	soya2d.module.install('performance', {
		onLoop: function(game, d, now) {
			var time = Date.now();

			frames++;

			if (time > prevTime + 1000) {
				fps = Math.round((frames * 1000) / (time - prevTime));
				fpsMin = Math.min(fpsMin, fps);
				fpsMax = Math.max(fpsMax, fps);

				prevTime = time;
				frames = 0;
			}

			text.setText('Fps:' + fps + "\n" + "Items:" + game.scene.__renderQueue.length);
		},
		onSceneChange: function(game, scene) {
			text = new soya2d.Text({
				font: new soya2d.Font('normal 400 30px/normal xirod,sans-serif'),
				text: 'Fps:00',
				fillStyle: 'yellow',
				x: 10,
				y: 10,
				z: 999,
				w: 300
			});
			game.scene.add(text);
		}
	});

})();