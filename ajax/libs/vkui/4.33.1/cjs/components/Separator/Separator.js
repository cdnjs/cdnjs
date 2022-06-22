"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Separator = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classNames = require("../../lib/classNames");

var _excluded = ["wide", "expanded"];

/**
 * @see https://vkcom.github.io/VKUI/#/Separator
 */
var Separator = function Separator(_ref) {
  var wide = _ref.wide,
      expanded = _ref.expanded,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    "aria-hidden": "true",
    vkuiClass: (0, _classNames.classNames)("Separator", wide && "Separator--wide", // TODO: v5 remove
    !wide && "Separator--padded")
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: (0, _classNames.classNames)("Separator__in", expanded && "Separator__in--expanded")
  }));
};

exports.Separator = Separator;
//# sourceMappingURL=Separator.js.map