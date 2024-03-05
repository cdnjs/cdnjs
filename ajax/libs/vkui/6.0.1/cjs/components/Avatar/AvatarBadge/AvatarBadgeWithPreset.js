"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AvatarBadgeWithPreset", {
    enumerable: true,
    get: function() {
        return AvatarBadgeWithPreset;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _ImageBase = require("../../ImageBase/ImageBase");
const _icons = require("./icons");
const AvatarBadgeWithPreset = (_param)=>{
    var { preset = 'online', className } = _param, restProps = _object_without_properties._(_param, [
        "preset",
        "className"
    ]);
    const { size } = _react.useContext(_ImageBase.ImageBaseContext);
    const badgeSize = (0, _ImageBase.getBadgeIconSizeByImageBaseSize)(size);
    const isOnlinePreset = preset === 'online';
    const presetClassName = isOnlinePreset ? "vkuiAvatarBadge--preset-online" : "vkuiAvatarBadge--preset-onlineMobile";
    const Icon = isOnlinePreset ? _icons.Icon12Circle : _icons.Icon12OnlineMobile;
    return /*#__PURE__*/ _react.createElement(_ImageBase.ImageBase.Badge, _object_spread._({
        background: "stroke",
        className: (0, _vkjs.classNames)("vkuiAvatarBadge", presetClassName, className)
    }, restProps), /*#__PURE__*/ _react.createElement(Icon, {
        width: badgeSize,
        height: badgeSize
    }));
};

//# sourceMappingURL=AvatarBadgeWithPreset.js.map