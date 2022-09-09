"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Avatar = exports.AVATAR_DEFAULT_SIZE = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _icons = require("@vkontakte/icons");

var _classNames = require("../../lib/classNames");

var _ImageBase = require("../ImageBase/ImageBase");

var _helpers = require("./helpers");

var _icons2 = require("./icons");

var _excluded = ["size", "className", "badge", "gradientColor", "children", "FallbackIcon"];
var styles = {
  "Avatar": "vkuiAvatar",
  "Avatar--has-gradient": "vkuiAvatar--has-gradient",
  "Avatar--gradient-red": "vkuiAvatar--gradient-red",
  "Avatar--gradient-pink": "vkuiAvatar--gradient-pink",
  "Avatar--gradient-orange": "vkuiAvatar--gradient-orange",
  "Avatar--gradient-yellow": "vkuiAvatar--gradient-yellow",
  "Avatar--gradient-green": "vkuiAvatar--gradient-green",
  "Avatar--gradient-l-blue": "vkuiAvatar--gradient-l-blue",
  "Avatar--gradient-blue": "vkuiAvatar--gradient-blue",
  "Avatar--gradient-violet": "vkuiAvatar--gradient-violet",
  "Avatar__content": "vkuiAvatar__content",
  "Avatar__badge": "vkuiAvatar__badge",
  "Avatar__badge--shifted": "vkuiAvatar__badge--shifted",
  "Avatar__badge--online": "vkuiAvatar__badge--online",
  "Avatar__badge--online-mobile": "vkuiAvatar__badge--online-mobile"
};
var BADGE_ONLINE = {
  className: (0, _classNames.classNamesString)(styles["Avatar__badge"], styles["Avatar__badge--online"]),
  background: "stroke",
  Icon: _icons2.Icon12Circle
};
var BADGE_ONLINE_MOBILE = {
  className: (0, _classNames.classNamesString)(styles["Avatar__badge"], styles["Avatar__badge--online-mobile"]),
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
        className: (0, _classNames.classNamesString)(styles["Avatar__badge"], size < 96 && styles["Avatar__badge--shifted"])
      });
  }

  return (0, _jsxRuntime.createScopedElement)(_ImageBase.ImageBase, (0, _extends2.default)({}, restProps, {
    size: size,
    badge: badge,
    className: (0, _classNames.classNamesString)(styles["Avatar"], gradientName && styles["Avatar--has-gradient"], gradientName !== "custom" && styles["Avatar--gradient-".concat(gradientName)], className),
    FallbackIcon: FallbackIcon
  }), children && (0, _jsxRuntime.createScopedElement)("div", {
    className: styles["Avatar__content"],
    style: {
      fontSize: (0, _helpers.getInitialsFontSize)(size)
    }
  }, children));
};

exports.Avatar = Avatar;
//# sourceMappingURL=Avatar.js.map