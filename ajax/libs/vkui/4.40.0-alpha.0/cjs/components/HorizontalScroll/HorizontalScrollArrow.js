"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HorizontalScrollArrow = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _icons = require("@vkontakte/icons");
var _classNames = require("../../lib/classNames");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _Tappable = require("../Tappable/Tappable");
var _excluded = ["size", "direction", "onClick"];
var HorizontalScrollArrow = function HorizontalScrollArrow(_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? "l" : _ref$size,
    direction = _ref.direction,
    onClick = _ref.onClick,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var ArrowIcon;
  if (size === "m") {
    ArrowIcon = direction === "left" ? _icons.Icon16ChevronLeft : _icons.Icon16Chevron;
  } else {
    ArrowIcon = direction === "left" ? _icons.Icon24ChevronCompactLeft : _icons.Icon24Chevron;
  }
  return (0, _jsxRuntime.createScopedElement)(_Tappable.Tappable, (0, _extends2.default)({}, restProps, {
    Component: "button",
    hasHover: false,
    hasActive: false,
    vkuiClass: (0, _classNames.classNames)("HorizontalScrollArrow", "HorizontalScrollArrow--".concat(size), "HorizontalScrollArrow--".concat(direction), platform === _platform.IOS && "HorizontalScrollArrow--ios"),
    onClick: onClick
  }), (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "HorizontalScrollArrow__icon"
  }, (0, _jsxRuntime.createScopedElement)(ArrowIcon, null)));
};
exports.HorizontalScrollArrow = HorizontalScrollArrow;
//# sourceMappingURL=HorizontalScrollArrow.js.map