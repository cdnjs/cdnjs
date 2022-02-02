"use strict";

exports.__esModule = true;

var _bridge = require("./bridge");

Object.keys(_bridge).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _bridge[key]) return;
  exports[key] = _bridge[key];
});

var _child = require("./child");

Object.keys(_child).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _child[key]) return;
  exports[key] = _child[key];
});

var _common = require("./common");

Object.keys(_common).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _common[key]) return;
  exports[key] = _common[key];
});

var _parent = require("./parent");

Object.keys(_parent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _parent[key]) return;
  exports[key] = _parent[key];
});

var _setup = require("./setup");

Object.keys(_setup).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _setup[key]) return;
  exports[key] = _setup[key];
});