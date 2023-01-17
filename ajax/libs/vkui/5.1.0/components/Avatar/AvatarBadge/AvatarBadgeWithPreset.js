import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["preset"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { ImageBase, ImageBaseContext, getBadgeIconSizeByImageBaseSize } from '../../ImageBase/ImageBase';
import { Icon12Circle, Icon12OnlineMobile } from './icons';
export var AvatarBadgeWithPreset = function AvatarBadgeWithPreset(_ref) {
  var _ref$preset = _ref.preset,
    preset = _ref$preset === void 0 ? 'online' : _ref$preset,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _React$useContext = React.useContext(ImageBaseContext),
    size = _React$useContext.size;
  var badgeSize = getBadgeIconSizeByImageBaseSize(size);
  var isOnlinePreset = preset === 'online';
  var presetClassName = isOnlinePreset ? "vkuiAvatarBadge--preset-online" : "vkuiAvatarBadge--preset-onlineMobile";
  var Icon = isOnlinePreset ? Icon12Circle : Icon12OnlineMobile;
  return /*#__PURE__*/React.createElement(ImageBase.Badge, _extends({}, restProps, {
    background: "stroke",
    className: classNames("vkuiAvatarBadge", presetClassName)
  }), /*#__PURE__*/React.createElement(Icon, {
    width: badgeSize,
    height: badgeSize
  }));
};
//# sourceMappingURL=AvatarBadgeWithPreset.js.map