"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Avatar = exports.AVATAR_DEFAULT_SIZE = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _ImageBase = require("../ImageBase/ImageBase");
var _helpers = require("./helpers");
var _AvatarBadge = require("./AvatarBadge/AvatarBadge");
var _AvatarBadgeWithPreset = require("./AvatarBadge/AvatarBadgeWithPreset");
var _excluded = ["size", "className", "gradientColor", "initials", "fallbackIcon", "children"];
var AVATAR_DEFAULT_SIZE = 48;
exports.AVATAR_DEFAULT_SIZE = AVATAR_DEFAULT_SIZE;
var COLORS_NUMBER_TO_TEXT_MAP = {
  1: 'red',
  2: 'orange',
  3: 'yellow',
  4: 'green',
  5: 'l-blue',
  6: 'violet'
};

/**
 * Градиенты, которые можно использовать в алгоритме поиска градиентов по числовому идентификатору пользователя.
 * @example user.id % 6 + 1
 */

var gradientStyles = {
  'red': "vkuiAvatar--gradient-red",
  'orange': "vkuiAvatar--gradient-orange",
  'yellow': "vkuiAvatar--gradient-yellow",
  'green': "vkuiAvatar--gradient-green",
  'blue': "vkuiAvatar--gradient-blue",
  'l-blue': "vkuiAvatar--gradient-l-blue",
  'violet': "vkuiAvatar--gradient-violet"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Avatar
 */
var Avatar = function Avatar(_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? AVATAR_DEFAULT_SIZE : _ref$size,
    className = _ref.className,
    gradientColor = _ref.gradientColor,
    initials = _ref.initials,
    fallbackIcon = _ref.fallbackIcon,
    children = _ref.children,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var gradientName = typeof gradientColor === 'number' ? COLORS_NUMBER_TO_TEXT_MAP[gradientColor] : gradientColor;
  var isGradientNotCustom = gradientName && gradientName !== 'custom';
  var rewrittenFallbackIcon = initials ? undefined : fallbackIcon;
  return /*#__PURE__*/React.createElement(_ImageBase.ImageBase, (0, _extends2.default)({}, restProps, {
    size: size,
    fallbackIcon: rewrittenFallbackIcon,
    className: (0, _vkjs.classNames)("vkuiAvatar", gradientName && "vkuiAvatar--has-gradient", isGradientNotCustom && gradientStyles[gradientName], className)
  }), initials && /*#__PURE__*/React.createElement("div", {
    className: "vkuiAvatar__initials",
    style: {
      fontSize: (0, _helpers.getInitialsFontSize)(size)
    }
  }, initials), children);
};
exports.Avatar = Avatar;
Avatar.Badge = _AvatarBadge.AvatarBadge;
Avatar.BadgeWithPreset = _AvatarBadgeWithPreset.AvatarBadgeWithPreset;
Avatar.Overlay = _ImageBase.ImageBase.Overlay;
//# sourceMappingURL=Avatar.js.map