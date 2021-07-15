"use strict";

exports.__esModule = true;

var _hello = require("./hello");

Object.keys(_hello).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _hello[key]) return;
  exports[key] = _hello[key];
});

var _compat = require("./compat");

Object.keys(_compat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _compat[key]) return;
  exports[key] = _compat[key];
});

var _windows = require("./windows");

Object.keys(_windows).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _windows[key]) return;
  exports[key] = _windows[key];
});