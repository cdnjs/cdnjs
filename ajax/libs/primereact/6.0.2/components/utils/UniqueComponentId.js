"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var lastId = 0;

function _default() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'pr_id_';
  lastId++;
  return "".concat(prefix).concat(lastId);
}