"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  avatarGroupClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _AvatarGroup.default;
  }
});
Object.defineProperty(exports, "avatarGroupClasses", {
  enumerable: true,
  get: function () {
    return _avatarGroupClasses.default;
  }
});

var _AvatarGroup = _interopRequireDefault(require("./AvatarGroup"));

var _avatarGroupClasses = _interopRequireWildcard(require("./avatarGroupClasses"));

Object.keys(_avatarGroupClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _avatarGroupClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _avatarGroupClasses[key];
    }
  });
});