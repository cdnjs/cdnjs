"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeObjectKeys = removeObjectKeys;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
function removeObjectKeys(obj) {
  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var newObj = (0, _objectSpread2.default)({}, obj);
  keys.forEach(function (key) {
    return delete newObj[key];
  });
  return newObj;
}
//# sourceMappingURL=removeObjectKeys.js.map