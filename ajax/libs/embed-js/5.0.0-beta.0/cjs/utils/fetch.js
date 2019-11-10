"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _isServer = require("is-server");

var _isServer2 = _interopRequireDefault(_isServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _isServer2.default)() ? require("node-fetch") : window.fetch || window.unfetch;