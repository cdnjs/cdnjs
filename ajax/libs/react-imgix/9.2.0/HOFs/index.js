"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propMerger = require("./propMerger");

Object.keys(_propMerger).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _propMerger[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _propMerger[key];
    }
  });
});

var _propFormatter = require("./propFormatter");

Object.keys(_propFormatter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _propFormatter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _propFormatter[key];
    }
  });
});
//# sourceMappingURL=index.js.map