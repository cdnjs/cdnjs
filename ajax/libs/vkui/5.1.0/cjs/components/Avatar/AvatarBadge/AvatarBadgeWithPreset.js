"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AvatarBadgeWithPreset = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _ImageBase = require("../../ImageBase/ImageBase");
var _icons = require("./icons");
var _excluded = ["preset"];
var AvatarBadgeWithPreset = function AvatarBadgeWithPreset(_ref) {
  var _ref$preset = _ref.preset,
    preset = _ref$preset === void 0 ? 'online' : _ref$preset,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _React$useContext = React.useContext(_ImageBase.ImageBaseContext),
    size = _React$useContext.size;
  var badgeSize = (0, _ImageBase.getBadgeIconSizeByImageBaseSize)(size);
  var isOnlinePreset = preset === 'online';
  var presetClassName = isOnlinePreset ? "vkuiAvatarBadge--preset-online" : "vkuiAvatarBadge--preset-onlineMobile";
  var Icon = isOnlinePreset ? _icons.Icon12Circle : _icons.Icon12OnlineMobile;
  return /*#__PURE__*/React.createElement(_ImageBase.ImageBase.Badge, (0, _extends2.default)({}, restProps, {
    background: "stroke",
    className: (0, _vkjs.classNames)("vkuiAvatarBadge", presetClassName)
  }), /*#__PURE__*/React.createElement(Icon, {
    width: badgeSize,
    height: badgeSize
  }));
};
exports.AvatarBadgeWithPreset = AvatarBadgeWithPreset;
//# sourceMappingURL=AvatarBadgeWithPreset.js.map