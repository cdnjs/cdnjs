"use strict";

exports.__esModule = true;

var _serialize = require("./serialize");

Object.keys(_serialize).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _serialize[key]) return;
  exports[key] = _serialize[key];
});

var _function = require("./function");

Object.keys(_function).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _function[key]) return;
  exports[key] = _function[key];
});

var _promise = require("./promise");

Object.keys(_promise).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _promise[key]) return;
  exports[key] = _promise[key];
});

var _window = require("./window");

Object.keys(_window).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _window[key]) return;
  exports[key] = _window[key];
});