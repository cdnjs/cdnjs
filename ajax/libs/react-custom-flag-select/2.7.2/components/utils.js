"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomId = exports.cx = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var cx = function cx() {
  var classes = [];

  for (var i = 0; i < arguments.length; i += 1) {
    var arg = i < 0 || arguments.length <= i ? undefined : arguments[i];
    if (!arg) continue;

    var argType = _typeof(arg);

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      var inner = cx.apply(null, arg);

      if (inner) {
        classes.push(inner);
      }
    } else if (argType === 'object') {
      for (var key in arg) {
        if ({}.hasOwnProperty.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
};

exports.cx = cx;

var getRandomId = function getRandomId() {
  return Math.random().toString(36).slice(-8);
};

exports.getRandomId = getRandomId;