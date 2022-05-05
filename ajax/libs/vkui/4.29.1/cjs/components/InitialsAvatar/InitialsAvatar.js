"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InitialsAvatar = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classNames = require("../../lib/classNames");

var _Avatar = _interopRequireWildcard(require("../Avatar/Avatar"));

var _excluded = ["size", "children", "gradientColor", "style"];
var COLORS_NUMBER_TO_TEXT_MAP = {
  1: "red",
  2: "orange",
  3: "yellow",
  4: "green",
  5: "l-blue",
  6: "violet"
};

function getInitialsFontSize(avatarSize) {
  var calculatedFontSize = Math.ceil(avatarSize * 0.36);
  var evenFix = calculatedFontSize % 2;
  return calculatedFontSize + evenFix;
}

var InitialsAvatar = function InitialsAvatar(_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? _Avatar.AVATAR_DEFAULT_SIZE : _ref$size,
      children = _ref.children,
      gradientColor = _ref.gradientColor,
      style = _ref.style,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var gradientName = typeof gradientColor === "string" ? gradientColor : gradientColor && COLORS_NUMBER_TO_TEXT_MAP[gradientColor];
  return (0, _jsxRuntime.createScopedElement)(_Avatar.default, (0, _extends2.default)({}, restProps, {
    style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), {}, {
      fontSize: getInitialsFontSize(size)
    }),
    size: size,
    vkuiClass: (0, _classNames.classNames)("InitialsAvatar", "InitialsAvatar--color-".concat(gradientName))
  }), (0, _jsxRuntime.createScopedElement)("span", {
    "aria-hidden": "true",
    vkuiClass: "InitialsAvatar__text"
  }, children));
};

exports.InitialsAvatar = InitialsAvatar;
//# sourceMappingURL=InitialsAvatar.js.map