'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var web = require('@react-spring/web');



Object.keys(web).forEach(function (k) {
	if (k !== 'default') Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () {
			return web[k];
		}
	});
});
