(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno')) :
	typeof define === 'function' && define.amd ? define(['exports', 'inferno'], factory) :
	(global = global || self, factory(global.Inferno = global.Inferno || {}, global.Inferno));
}(this, (function (exports, inferno) { 'use strict';

	var Component = inferno.Component;

	exports.Component = Component;
	exports.default = Component;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
