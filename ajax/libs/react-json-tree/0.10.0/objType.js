'use strict';

exports.__esModule = true;

var _iterator = require('babel-runtime/core-js/symbol/iterator');

var _iterator2 = _interopRequireDefault(_iterator);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports['default'] = objType;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function objType(obj) {
  if (obj !== null && (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3['default'])(obj)) === 'object' && !Array.isArray(obj) && typeof obj[_iterator2['default']] === 'function') {
    return 'Iterable';
  }
  return Object.prototype.toString.call(obj).slice(8, -1);
}