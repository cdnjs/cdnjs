"use strict";

exports.__esModule = true;

var _receive = require("./receive");

Object.keys(_receive).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _receive[key]) return;
  exports[key] = _receive[key];
});

var _send = require("./send");

Object.keys(_send).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _send[key]) return;
  exports[key] = _send[key];
});

var _listeners = require("./listeners");

Object.keys(_listeners).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _listeners[key]) return;
  exports[key] = _listeners[key];
});