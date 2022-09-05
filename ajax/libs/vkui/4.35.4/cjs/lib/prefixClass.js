"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prefixClass = prefixClass;

var _classScopingMode = require("./classScopingMode");

var hasTransformable = /\b(?=[A-Z])/g;
var noConflictCache = {};
var legacyCache = {};

function prefixSingle(scopedStyle) {
  var noConflict = _classScopingMode.classScopingMode.noConflict;
  var cache = noConflict ? noConflictCache : legacyCache;

  if (cache[scopedStyle]) {
    return cache[scopedStyle];
  }

  var prefixed = scopedStyle.replace(hasTransformable, "vkui");
  var resolved = noConflict || scopedStyle === prefixed ? prefixed : prefixed + " " + scopedStyle;
  cache[scopedStyle] = resolved;
  return resolved;
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