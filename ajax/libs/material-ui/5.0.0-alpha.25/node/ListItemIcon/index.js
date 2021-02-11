"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  listItemIconClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _ListItemIcon.default;
  }
});
Object.defineProperty(exports, "listItemIconClasses", {
  enumerable: true,
  get: function () {
    return _listItemIconClasses.default;
  }
});

var _ListItemIcon = _interopRequireDefault(require("./ListItemIcon"));

var _listItemIconClasses = _interopRequireWildcard(require("./listItemIconClasses"));

Object.keys(_listItemIconClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _listItemIconClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _listItemIconClasses[key];
    }
  });
});