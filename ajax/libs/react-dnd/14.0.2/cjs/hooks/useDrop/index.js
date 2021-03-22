"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _useDrop = require("./useDrop");

Object.keys(_useDrop).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useDrop[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useDrop[key];
    }
  });
});