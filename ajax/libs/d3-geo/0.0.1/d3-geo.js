(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.d3_geo = global.d3_geo || {})));
}(this, function (exports) { 'use strict';

	var version = "0.0.1";

	exports.version = version;

}));