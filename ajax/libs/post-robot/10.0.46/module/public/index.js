"use strict";

exports.__esModule = true;

var _on = require("./on");

Object.keys(_on).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _on[key]) return;
  exports[key] = _on[key];
});

var _send = require("./send");

Object.keys(_send).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _send[key]) return;
  exports[key] = _send[key];
});