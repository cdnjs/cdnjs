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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _ImageBase = require("../../ImageBase/ImageBase");
var _icons = require("./icons");
var AvatarBadgeWithPreset = function(_param) {
    var _param_preset = _param.preset, preset = _param_preset === void 0 ? "online" : _param_preset, className = _param.className, restProps = _object_without_properties._(_param, [
        "preset",
        "className"
    ]);
    var size = _react.useContext(_ImageBase.ImageBaseContext).size;
    var badgeSize = (0, _ImageBase.getBadgeIconSizeByImageBaseSize)(size);
    var isOnlinePreset = preset === "online";
    var presetClassName = isOnlinePreset ? "vkuiAvatarBadge--preset-online" : "vkuiAvatarBadge--preset-onlineMobile";
    var Icon = isOnlinePreset ? _icons.Icon12Circle : _icons.Icon12OnlineMobile;
    return /*#__PURE__*/ _react.createElement(_ImageBase.ImageBase.Badge, _object_spread._({
        background: "stroke",
        className: (0, _vkjs.classNames)("vkuiAvatarBadge", presetClassName, className)
    }, restProps), /*#__PURE__*/ _react.createElement(Icon, {
        width: badgeSize,
        height: badgeSize
    }));
};

//# sourceMappingURL=AvatarBadgeWithPreset.js.map