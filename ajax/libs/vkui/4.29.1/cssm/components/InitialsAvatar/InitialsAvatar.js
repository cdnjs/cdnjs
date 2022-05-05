import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["size", "children", "gradientColor", "style"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import Avatar, { AVATAR_DEFAULT_SIZE } from "../Avatar/Avatar";
import "./InitialsAvatar.css";
/**
 * Градиенты, которые можно использовать в алгоритме поиска градиентов по числовому идентификатору пользователя.
 * @example user.id % 6 + 1
 */

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

export var InitialsAvatar = function InitialsAvatar(_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? AVATAR_DEFAULT_SIZE : _ref$size,
      children = _ref.children,
      gradientColor = _ref.gradientColor,
      style = _ref.style,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var gradientName = typeof gradientColor === "string" ? gradientColor : gradientColor && COLORS_NUMBER_TO_TEXT_MAP[gradientColor];
  return createScopedElement(Avatar, _extends({}, restProps, {
    style: _objectSpread(_objectSpread({}, style), {}, {
      fontSize: getInitialsFontSize(size)
    }),
    size: size,
    vkuiClass: classNames("InitialsAvatar", "InitialsAvatar--color-".concat(gradientName))
  }), createScopedElement("span", {
    "aria-hidden": "true",
    vkuiClass: "InitialsAvatar__text"
  }, children));
};
//# sourceMappingURL=InitialsAvatar.js.map