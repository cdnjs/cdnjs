import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["size", "className", "badge", "gradientColor", "children", "FallbackIcon"];
import * as React from "react";
import { Icon28Users } from "@vkontakte/icons";
import { classNamesString } from "../../lib/classNames";
import { ImageBase } from "../ImageBase/ImageBase";
import { getInitialsFontSize } from "./helpers";
import { Icon12Circle, Icon12OnlineMobile } from "./icons";
var BADGE_ONLINE = {
  className: classNamesString("vkuiAvatar__badge", "vkuiAvatar__badge--online"),
  background: "stroke",
  Icon: Icon12Circle
};
var BADGE_ONLINE_MOBILE = {
  className: classNamesString("vkuiAvatar__badge", "vkuiAvatar__badge--online-mobile"),
  background: "stroke",
  Icon: Icon12OnlineMobile
};
var COLORS_NUMBER_TO_TEXT_MAP = {
  1: "red",
  2: "orange",
  3: "yellow",
  4: "green",
  5: "l-blue",
  6: "violet"
};
export var AVATAR_DEFAULT_SIZE = 48;

/**
 * Градиенты, которые можно использовать в алгоритме поиска градиентов по числовому идентификатору пользователя.
 * @example user.id % 6 + 1
 */

/**
 * @see https://vkcom.github.io/VKUI/#/Avatar
 */
export var Avatar = function Avatar(_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? AVATAR_DEFAULT_SIZE : _ref$size,
    className = _ref.className,
    badgeProp = _ref.badge,
    gradientColor = _ref.gradientColor,
    children = _ref.children,
    _ref$FallbackIcon = _ref.FallbackIcon,
    FallbackIcon = _ref$FallbackIcon === void 0 ? Icon28Users : _ref$FallbackIcon,
    restProps = _objectWithoutProperties(_ref, _excluded);
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
      badge = _objectSpread(_objectSpread({}, typeof badgeProp === "function" ? {
        Icon: badgeProp
      } : badgeProp), {}, {
        className: classNamesString("vkuiAvatar__badge", size < 96 && "vkuiAvatar__badge--shifted")
      });
  }
  return /*#__PURE__*/React.createElement(ImageBase, _extends({}, restProps, {
    size: size,
    badge: badge,
    className: classNamesString("vkuiAvatar", gradientName && "vkuiAvatar--has-gradient", isGradientNotCustom && styles["Avatar--gradient-".concat(gradientName)], className),
    FallbackIcon: FallbackIcon
  }), children && /*#__PURE__*/React.createElement("div", {
    className: "vkuiAvatar__content",
    style: {
      fontSize: getInitialsFontSize(size)
    }
  }, children));
};
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