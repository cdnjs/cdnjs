"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MAX_GRID_LENGTH = exports.GridAvatar = exports.GRID_AVATAR_DEFAULT_SIZE = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _warnOnce = require("../../lib/warnOnce");
var _ImageBase = require("../ImageBase/ImageBase");
var _GridAvatarBadge = require("./GridAvatarBadge/GridAvatarBadge");
var _excluded = ["src", "size", "className", "children"];
var GRID_AVATAR_DEFAULT_SIZE = 48;
exports.GRID_AVATAR_DEFAULT_SIZE = GRID_AVATAR_DEFAULT_SIZE;
var MAX_GRID_LENGTH = 4;
exports.MAX_GRID_LENGTH = MAX_GRID_LENGTH;
var warn = (0, _warnOnce.warnOnce)('GridAvatar');

/**
 * @see https://vkcom.github.io/VKUI/#/GridAvatar
 */
var GridAvatar = function GridAvatar(_ref) {
  var _ref$src = _ref.src,
    src = _ref$src === void 0 ? [] : _ref$src,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? GRID_AVATAR_DEFAULT_SIZE : _ref$size,
    className = _ref.className,
    children = _ref.children,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  if (process.env.NODE_ENV === 'development') {
    if (src.length > MAX_GRID_LENGTH) {
      warn("\u0414\u043B\u0438\u043D\u0430 \u043C\u0430\u0441\u0441\u0438\u0432\u0430 src (".concat(src.length, ") \u0431\u043E\u043B\u044C\u0448\u0435 \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0439 (").concat(MAX_GRID_LENGTH, ")"), 'error');
    }
  }
  return /*#__PURE__*/React.createElement(_ImageBase.ImageBase, (0, _extends2.default)({}, restProps, {
    size: size,
    className: (0, _vkjs.classNames)("vkuiGridAvatar", className)
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
exports.GridAvatar = GridAvatar;
GridAvatar.Badge = _GridAvatarBadge.GridAvatarBadge;
//# sourceMappingURL=GridAvatar.js.map