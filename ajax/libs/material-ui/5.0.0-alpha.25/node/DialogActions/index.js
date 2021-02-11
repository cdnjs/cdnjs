"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  dialogActionsClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _DialogActions.default;
  }
});
Object.defineProperty(exports, "dialogActionsClasses", {
  enumerable: true,
  get: function () {
    return _dialogActionsClasses.default;
  }
});

var _DialogActions = _interopRequireDefault(require("./DialogActions"));

var _dialogActionsClasses = _interopRequireWildcard(require("./dialogActionsClasses"));

Object.keys(_dialogActionsClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _dialogActionsClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dialogActionsClasses[key];
    }
  });
});