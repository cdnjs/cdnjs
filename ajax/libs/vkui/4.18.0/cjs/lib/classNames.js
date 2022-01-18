"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classNames = classNames;
exports.classNamesString = classNamesString;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

function classNames() {
  var result = [];

  for (var i = 0; i < arguments.length; i++) {
    var item = arguments[i];

    if (!item) {
      continue;
    }

    switch ((0, _typeof2.default)(item)) {
      case 'string':
        result.push(item);
        break;

      case 'object':
        for (var key in item) {
          if (item[key]) {
            result.push(key);
          }
        }

        break;

      default:
        result.push("".concat(item));
    }
  }

  return result.length > 1 ? result : result[0] || '';
}

function classNamesString() {
  var res = classNames.apply(void 0, arguments);
  return typeof res === 'string' ? res : res.join(' ');
}
//# sourceMappingURL=classNames.js.map