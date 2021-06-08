"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  dialogTitleClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _DialogTitle.default;
  }
});
Object.defineProperty(exports, "dialogTitleClasses", {
  enumerable: true,
  get: function () {
    return _dialogTitleClasses.default;
  }
});

var _DialogTitle = _interopRequireDefault(require("./DialogTitle"));

var _dialogTitleClasses = _interopRequireWildcard(require("./dialogTitleClasses"));

Object.keys(_dialogTitleClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _dialogTitleClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dialogTitleClasses[key];
    }
  });
});