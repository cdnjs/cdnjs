"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Avatar = exports.AVATAR_DEFAULT_SIZE = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _classNames = require("../../lib/classNames");
var _ImageBase = require("../ImageBase/ImageBase");
var _helpers = require("./helpers");
var _icons2 = require("./icons");
var _excluded = ["size", "className", "badge", "gradientColor", "children", "FallbackIcon"];
var BADGE_ONLINE = {
  className: (0, _classNames.classNamesString)("vkuiAvatar__badge", "vkuiAvatar__badge--online"),
  background: "stroke",
  Icon: _icons2.Icon12Circle
};
var BADGE_ONLINE_MOBILE = {
  className: (0, _classNames.classNamesString)("vkuiAvatar__badge", "vkuiAvatar__badge--online-mobile"),
  background: "stroke",
  Icon: _icons2.Icon12OnlineMobile
};
var COLORS_NUMBER_TO_TEXT_MAP = {
  1: "red",
  2: "orange",
  3: "yellow",
  4: "green",
  5: "l-blue",
  6: "violet"
};
var AVATAR_DEFAULT_SIZE = 48;

/**
 * Градиенты, которые можно использовать в алгоритме поиска градиентов по числовому идентификатору пользователя.
 * @example user.id % 6 + 1
 */
exports.AVATAR_DEFAULT_SIZE = AVATAR_DEFAULT_SIZE;
/**
 * @see https://vkcom.github.io/VKUI/#/Avatar
 */
var Avatar = function Avatar(_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? AVATAR_DEFAULT_SIZE : _ref$size,
    className = _ref.className,
    badgeProp = _ref.badge,
    gradientColor = _ref.gradientColor,
    children = _ref.children,
    _ref$FallbackIcon = _ref.FallbackIcon,
    FallbackIcon = _ref$FallbackIcon === void 0 ? _icons.Icon28Users : _ref$FallbackIcon,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var gradientName = typeof gradientColor === "number" ? COLORS_NUMBER_TO_TEXT_MAP[gradientColor] : gradientColor;
  var isGradientNotCustom = gradientName && gradientName !== "custom";
  var badge = undefined;
  switch (badgeProp) {
    case undefined:
      break;
    case "online":
      badge = BADGE_ONLINE;
      break;
    case "online-mobile":
      badge = BADGE_ONLINE_MOBILE;
      break;
    default:
      badge = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, typeof badgeProp === "function" ? {
        Icon: badgeProp
      } : badgeProp), {}, {
        className: (0, _classNames.classNamesString)("vkuiAvatar__badge", size < 96 && "vkuiAvatar__badge--shifted")
      });
  }
  return /*#__PURE__*/React.createElement(_ImageBase.ImageBase, (0, _extends2.default)({}, restProps, {
    size: size,
    badge: badge,
    className: (0, _classNames.classNamesString)("vkuiAvatar", gradientName && "vkuiAvatar--has-gradient", isGradientNotCustom && styles["Avatar--gradient-".concat(gradientName)], className),
    FallbackIcon: FallbackIcon
  }), children && /*#__PURE__*/React.createElement("div", {
    className: "vkuiAvatar__content",
    style: {
      fontSize: (0, _helpers.getInitialsFontSize)(size)
    }
  }, children));
};
exports.Avatar = Avatar;
var styles = {
  "Avatar--gradient-red": "vkuiAvatar--gradient-red",
  "Avatar--gradient-pink": "vkuiAvatar--gradient-pink",
  "Avatar--gradient-orange": "vkuiAvatar--gradient-orange",
  "Avatar--gradient-yellow": "vkuiAvatar--gradient-yellow",
  "Avatar--gradient-green": "vkuiAvatar--gradient-green",
  "Avatar--gradient-l-blue": "vkuiAvatar--gradient-l-blue",
  "Avatar--gradient-blue": "vkuiAvatar--gradient-blue",
  "Avatar--gradient-violet": "vkuiAvatar--gradient-violet"
};
//# sourceMappingURL=Avatar.js.map