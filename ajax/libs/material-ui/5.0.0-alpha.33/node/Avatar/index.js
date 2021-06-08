"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  avatarClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Avatar.default;
  }
});
Object.defineProperty(exports, "avatarClasses", {
  enumerable: true,
  get: function () {
    return _avatarClasses.default;
  }
});

var _Avatar = _interopRequireDefault(require("./Avatar"));

var _avatarClasses = _interopRequireWildcard(require("./avatarClasses"));

Object.keys(_avatarClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _avatarClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _avatarClasses[key];
    }
  });
});