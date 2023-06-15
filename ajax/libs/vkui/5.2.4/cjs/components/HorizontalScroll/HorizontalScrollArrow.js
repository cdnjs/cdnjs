"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HorizontalScrollArrow = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _Tappable = require("../Tappable/Tappable");
var _excluded = ["size", "direction", "onClick", "className"];
var HorizontalScrollArrow = function HorizontalScrollArrow(_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'l' : _ref$size,
    direction = _ref.direction,
    onClick = _ref.onClick,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var ArrowIcon;
  if (size === 'm') {
    ArrowIcon = direction === 'left' ? _icons.Icon16ChevronLeft : _icons.Icon16Chevron;
  } else {
    ArrowIcon = direction === 'left' ? _icons.Icon24ChevronCompactLeft : _icons.Icon24Chevron;
  }
  return /*#__PURE__*/React.createElement(_Tappable.Tappable, (0, _extends2.default)({}, restProps, {
    Component: "button",
    hasHover: false,
    hasActive: false,
    className: (0, _vkjs.classNames)("vkuiHorizontalScrollArrow", styles["HorizontalScrollArrow--size-".concat(size)], styles["HorizontalScrollArrow--direction-".concat(direction)], className),
    onClick: onClick
  }), /*#__PURE__*/React.createElement("span", {
    className: "vkuiHorizontalScrollArrow__icon"
  }, /*#__PURE__*/React.createElement(ArrowIcon, null)));
};
exports.HorizontalScrollArrow = HorizontalScrollArrow;
var styles = {
  "HorizontalScrollArrow--size-m": "vkuiHorizontalScrollArrow--size-m",
  "HorizontalScrollArrow--size-l": "vkuiHorizontalScrollArrow--size-l",
  "HorizontalScrollArrow--direction-left": "vkuiHorizontalScrollArrow--direction-left",
  "HorizontalScrollArrow--direction-right": "vkuiHorizontalScrollArrow--direction-right"
};
//# sourceMappingURL=HorizontalScrollArrow.js.map