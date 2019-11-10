"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (params) {
	var esc = encodeURIComponent;
	return Object.keys(params).map(function (k) {
		return esc(k) + "=" + esc(params[k]);
	}).join("&");
};