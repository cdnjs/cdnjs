"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = compose;
Object.defineProperty(exports, "warning", {
  enumerable: true,
  get: function get() {
    return _warning.default;
  }
});
Object.defineProperty(exports, "shallowEqual", {
  enumerable: true,
  get: function get() {
    return _shallowequal.default;
  }
});
Object.defineProperty(exports, "config", {
  enumerable: true,
  get: function get() {
    return _config.default;
  }
});

var _warning = _interopRequireDefault(require("warning"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Taken from https://github.com/reduxjs/redux/blob/v4.0.0/src/compose.js
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}
//# sourceMappingURL=common.js.map