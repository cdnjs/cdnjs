"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RichTooltip = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _HoverPopper = require("../HoverPopper/HoverPopper");

var _getClassName = require("../../helpers/getClassName");

var _usePlatform = require("../../hooks/usePlatform");

var _useAppearance = require("../../hooks/useAppearance");

var _classNames2 = require("../../lib/classNames");

var _prefixClass = require("../../lib/prefixClass");

var _excluded = ["children", "arrow"];

var RichTooltip = function RichTooltip(_ref) {
  var children = _ref.children,
      _ref$arrow = _ref.arrow,
      arrow = _ref$arrow === void 0 ? true : _ref$arrow,
      popperProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var appearance = (0, _useAppearance.useAppearance)();
  return (0, _jsxRuntime.createScopedElement)(_HoverPopper.HoverPopper, (0, _extends2.default)({
    vkuiClass: (0, _classNames2.classNames)((0, _getClassName.getClassName)("RichTooltip", platform), (0, _defineProperty2.default)({}, "RichTooltip--".concat(appearance), !!appearance)),
    arrow: arrow,
    arrowClassName: (0, _prefixClass.prefixClass)("RichTooltip__arrow")
  }, popperProps), children);
};

exports.RichTooltip = RichTooltip;
//# sourceMappingURL=RichTooltip.js.map