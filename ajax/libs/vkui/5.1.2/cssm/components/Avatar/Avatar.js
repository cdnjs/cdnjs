import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["size", "className", "gradientColor", "initials", "fallbackIcon", "children"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { ImageBase } from '../ImageBase/ImageBase';
import { getInitialsFontSize } from './helpers';
import { AvatarBadge } from './AvatarBadge/AvatarBadge';
import { AvatarBadgeWithPreset } from './AvatarBadge/AvatarBadgeWithPreset';
import "./Avatar.module.css";
export var AVATAR_DEFAULT_SIZE = 48;
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
export var Avatar = function Avatar(_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? AVATAR_DEFAULT_SIZE : _ref$size,
    className = _ref.className,
    gradientColor = _ref.gradientColor,
    initials = _ref.initials,
    fallbackIcon = _ref.fallbackIcon,
    children = _ref.children,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var gradientName = typeof gradientColor === 'number' ? COLORS_NUMBER_TO_TEXT_MAP[gradientColor] : gradientColor;
  var isGradientNotCustom = gradientName && gradientName !== 'custom';
  var rewrittenFallbackIcon = initials ? undefined : fallbackIcon;
  return /*#__PURE__*/React.createElement(ImageBase, _extends({}, restProps, {
    size: size,
    fallbackIcon: rewrittenFallbackIcon,
    className: classNames("vkuiAvatar", gradientName && "vkuiAvatar--has-gradient", isGradientNotCustom && gradientStyles[gradientName], className)
  }), initials && /*#__PURE__*/React.createElement("div", {
    className: "vkuiAvatar__initials",
    style: {
      fontSize: getInitialsFontSize(size)
    }
  }, initials), children);
};
Avatar.Badge = AvatarBadge;
Avatar.BadgeWithPreset = AvatarBadgeWithPreset;
Avatar.Overlay = ImageBase.Overlay;
//# sourceMappingURL=Avatar.js.map