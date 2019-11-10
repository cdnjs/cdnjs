"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _isServer = require("is-server");

var _isServer2 = _interopRequireDefault(_isServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var count = 0;

function jsonP(url) {
	return new Promise(function (resolve) {
		var cb = "__c" + count++;
		var param = "callback";
		var query = param + "=" + cb;
		var script = document.createElement("script");

		var cleanup = function cleanup() {
			document.head.removeChild(script);
			window[cb] = function () {};
		};

		window[cb] = function (data) {
			resolve(data);
			cleanup();
		};

		script.src = url + "&" + query;
		document.head.appendChild(script);
	});
}

var unfetch = void 0;
if ((0, _isServer2.default)()) {
	unfetch = require("node-fetch");
}

exports.default = unfetch || jsonP;