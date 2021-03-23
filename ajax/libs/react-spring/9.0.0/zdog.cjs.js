'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var zdog = require('@react-spring/zdog');



Object.keys(zdog).forEach(function (k) {
	if (k !== 'default') Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () {
			return zdog[k];
		}
	});
});
