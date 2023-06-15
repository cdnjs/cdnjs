"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRefObject = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var isRefObject = function isRefObject(refObject) {
  return (0, _typeof2.default)(refObject) === 'object' && refObject !== null && refObject.hasOwnProperty('current');
};
exports.isRefObject = isRefObject;
//# sourceMappingURL=isRefObject.js.map