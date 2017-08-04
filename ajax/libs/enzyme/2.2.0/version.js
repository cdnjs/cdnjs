'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REACT15 = exports.REACT014 = exports.REACT013 = exports.VERSION = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var VERSION = exports.VERSION = _react2['default'].version;
var REACT013 = exports.REACT013 = VERSION.slice(0, 4) === '0.13';
var REACT014 = exports.REACT014 = VERSION.slice(0, 4) === '0.14';
var REACT15 = exports.REACT15 = VERSION.slice(0, 3) === '15.';