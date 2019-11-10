/**
 * @license jCanvas Donuts v20.0.0
 * Copyright 2013 Caleb Evans
 * Released under the MIT license
 */
(function ($, Math) {
'use strict';

var PI = Math.PI;

$.jCanvas.extend({
	name: 'drawDonut',
	type: 'donut',
	props: {
		holeSize: 0.5
	},
	fn: function (ctx, params) {

		// Enable shape transformation
		$.jCanvas.transformShape(this, ctx, params);
		ctx.beginPath();
		// Draw outer circle
		ctx.arc(params.x, params.y, params.radius, 0, 2 * PI, false);
		// If donut has a hole
		if (params.holeSize > 0) {
			// Draw inner hole
			ctx.moveTo(params.x + (params.radius * params.holeSize), params.y);
			ctx.arc(params.x, params.y, (params.radius * params.holeSize), 0, 2 * PI, true);
		}
		// Enable jCanvas events
		$.jCanvas.detectEvents(this, ctx, params);
		$.jCanvas.closePath(this, ctx, params);

	}
});

}(jQuery, Math));
