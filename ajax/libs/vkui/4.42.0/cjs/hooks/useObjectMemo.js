"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.objectEquals = objectEquals;
exports.useObjectMemo = useObjectMemo;
var React = _interopRequireWildcard(require("react"));
function objectEquals(o1, o2) {
  return Object.keys(o1).length === Object.keys(o2).length && Object.keys(o1).every(function (k) {
    return o1[k] === o2[k];
  });
}
function useObjectMemo(object) {
  var cache = React.useRef(object);
  if (!objectEquals(cache.current, object)) {
    cache.current = object;
  }
  return cache.current;
}
//# sourceMappingURL=useObjectMemo.js.map