import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["src", "size", "badge", "className"];
import * as React from "react";
import { classNamesString } from "../../lib/classNames";
import { warnOnce } from "../../lib/warnOnce";
import { ImageBase } from "../ImageBase/ImageBase";
import "./GridAvatar.module.css";
export var GRID_AVATAR_DEFAULT_SIZE = 48;
export var MAX_GRID_LENGTH = 4;
var warn = warnOnce("GridAvatar");

/**
 * @see https://vkcom.github.io/VKUI/#/GridAvatar
 */
export var GridAvatar = function GridAvatar(_ref) {
  var _ref$src = _ref.src,
    src = _ref$src === void 0 ? [] : _ref$src,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? GRID_AVATAR_DEFAULT_SIZE : _ref$size,
    badgeProp = _ref.badge,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  if (process.env.NODE_ENV === "development") {
    if (src.length > MAX_GRID_LENGTH) {
      warn("\u0414\u043B\u0438\u043D\u0430 \u043C\u0430\u0441\u0441\u0438\u0432\u0430 src (".concat(src.length, ") \u0431\u043E\u043B\u044C\u0448\u0435 \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0439 (").concat(MAX_GRID_LENGTH, ")"), "error");
    }
  }
  var badge = badgeProp ? _objectSpread(_objectSpread({}, typeof badgeProp === "function" ? {
    Icon: badgeProp
  } : badgeProp), {}, {
    className: classNamesString("vkuiGridAvatar__badge", size < 96 && "vkuiGridAvatar__badge--shifted")
  }) : undefined;
  return /*#__PURE__*/React.createElement(ImageBase, _extends({}, restProps, {
    size: size,
    badge: badge,
    className: classNamesString("vkuiGridAvatar", className)
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiGridAvatar__in",
    "aria-hidden": "true"
  }, src.map(function (url, index) {
    return index < MAX_GRID_LENGTH ? /*#__PURE__*/React.createElement("div", {
      key: url,
      className: "vkuiGridAvatar__item",
      style: {
        backgroundImage: "url(".concat(url, ")")
      }
    }) : null;
  })));
};
//# sourceMappingURL=GridAvatar.js.map