"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _useDrag = require("./useDrag");

Object.keys(_useDrag).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useDrag[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useDrag[key];
    }
  });
});