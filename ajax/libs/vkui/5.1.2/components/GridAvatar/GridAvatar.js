import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["src", "size", "className", "children"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { warnOnce } from '../../lib/warnOnce';
import { ImageBase } from '../ImageBase/ImageBase';
import { GridAvatarBadge } from './GridAvatarBadge/GridAvatarBadge';
export var GRID_AVATAR_DEFAULT_SIZE = 48;
export var MAX_GRID_LENGTH = 4;
var warn = warnOnce('GridAvatar');

/**
 * @see https://vkcom.github.io/VKUI/#/GridAvatar
 */
export var GridAvatar = function GridAvatar(_ref) {
  var _ref$src = _ref.src,
    src = _ref$src === void 0 ? [] : _ref$src,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? GRID_AVATAR_DEFAULT_SIZE : _ref$size,
    className = _ref.className,
    children = _ref.children,
    restProps = _objectWithoutProperties(_ref, _excluded);
  if (process.env.NODE_ENV === 'development') {
    if (src.length > MAX_GRID_LENGTH) {
      warn("\u0414\u043B\u0438\u043D\u0430 \u043C\u0430\u0441\u0441\u0438\u0432\u0430 src (".concat(src.length, ") \u0431\u043E\u043B\u044C\u0448\u0435 \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0439 (").concat(MAX_GRID_LENGTH, ")"), 'error');
    }
  }
  return /*#__PURE__*/React.createElement(ImageBase, _extends({}, restProps, {
    size: size,
    className: classNames("vkuiGridAvatar", className)
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiGridAvatar__in",
    "aria-hidden": true
  }, src.map(function (url, index) {
    return index < MAX_GRID_LENGTH ? /*#__PURE__*/React.createElement("div", {
      key: url,
      className: "vkuiGridAvatar__item",
      style: {
        backgroundImage: "url(".concat(url, ")")
      }
    }) : null;
  })), children);
};
GridAvatar.Badge = GridAvatarBadge;
//# sourceMappingURL=GridAvatar.js.map