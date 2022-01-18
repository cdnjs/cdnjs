"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FocusVisible = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _classNames = require("../../lib/classNames");

var FocusVisible = function FocusVisible(_ref) {
  var mode = _ref.mode;
  return (0, _jsxRuntime.createScopedElement)("span", {
    "aria-hidden": "true",
    vkuiClass: (0, _classNames.classNames)('FocusVisible', "FocusVisible--".concat(mode))
  });
};

exports.FocusVisible = FocusVisible;
//# sourceMappingURL=FocusVisible.js.map