"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prefixClass = prefixClass;
var hasTransformable = /\b(?=[A-Z])/g;
var cache = {};

function prefixSingle(scopedStyle) {
  if (cache[scopedStyle]) {
    return cache[scopedStyle];
  }

  var prefixed = scopedStyle.replace(hasTransformable, "vkui");
  cache[scopedStyle] = prefixed;
  return prefixed;
}

function prefixClass(scopedStyle) {
  if (typeof scopedStyle === "string") {
    return prefixSingle(scopedStyle);
  }

  var resolved = "";

  for (var i = 0; i < scopedStyle.length; i++) {
    var separator = resolved ? " " : "";
    resolved += separator + prefixSingle(scopedStyle[i]);
  }

  return resolved;
}
//# sourceMappingURL=prefixClass.js.map