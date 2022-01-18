"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOffsetRect = getOffsetRect;

function getOffsetRect(elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: box.top,
    left: box.left,
    width: elem.offsetWidth,
    height: elem.offsetHeight
  };
}
//# sourceMappingURL=offset.js.map