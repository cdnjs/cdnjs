"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  listItemAvatarClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _ListItemAvatar.default;
  }
});
Object.defineProperty(exports, "listItemAvatarClasses", {
  enumerable: true,
  get: function () {
    return _listItemAvatarClasses.default;
  }
});

var _ListItemAvatar = _interopRequireDefault(require("./ListItemAvatar"));

var _listItemAvatarClasses = _interopRequireWildcard(require("./listItemAvatarClasses"));

Object.keys(_listItemAvatarClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _listItemAvatarClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _listItemAvatarClasses[key];
    }
  });
});