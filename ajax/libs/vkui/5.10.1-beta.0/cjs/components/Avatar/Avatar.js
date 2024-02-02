"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    AVATAR_DEFAULT_SIZE: function() {
        return AVATAR_DEFAULT_SIZE;
    },
    Avatar: function() {
        return Avatar;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _ImageBase = require("../ImageBase/ImageBase");
var _AvatarBadge = require("./AvatarBadge/AvatarBadge");
var _AvatarBadgeWithPreset = require("./AvatarBadge/AvatarBadgeWithPreset");
var _helpers = require("./helpers");
var AVATAR_DEFAULT_SIZE = 48;
var COLORS_NUMBER_TO_TEXT_MAP = {
    1: "red",
    2: "orange",
    3: "yellow",
    4: "green",
    5: "l-blue",
    6: "violet"
};
var gradientStyles = {
    "red": "vkuiAvatar--gradient-red",
    "orange": "vkuiAvatar--gradient-orange",
    "yellow": "vkuiAvatar--gradient-yellow",
    "green": "vkuiAvatar--gradient-green",
    "blue": "vkuiAvatar--gradient-blue",
    "l-blue": "vkuiAvatar--gradient-l-blue",
    "violet": "vkuiAvatar--gradient-violet"
};
var Avatar = function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? AVATAR_DEFAULT_SIZE : _param_size, className = _param.className, gradientColor = _param.gradientColor, initials = _param.initials, fallbackIconProp = _param.fallbackIcon, children = _param.children, restProps = _object_without_properties._(_param, [
        "size",
        "className",
        "gradientColor",
        "initials",
        "fallbackIcon",
        "children"
    ]);
    var gradientName = typeof gradientColor === "number" ? COLORS_NUMBER_TO_TEXT_MAP[gradientColor] : gradientColor;
    var isGradientNotCustom = gradientName && gradientName !== "custom";
    var fallbackIcon = initials ? /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiAvatar__initials",
        style: {
            fontSize: (0, _helpers.getInitialsFontSize)(size)
        }
    }, initials) : fallbackIconProp;
    return /*#__PURE__*/ _react.createElement(_ImageBase.ImageBase, _object_spread_props._(_object_spread._({}, restProps), {
        size: size,
        fallbackIcon: fallbackIcon,
        className: (0, _vkjs.classNames)("vkuiAvatar", gradientName && "vkuiAvatar--has-gradient", isGradientNotCustom && gradientStyles[gradientName], className)
    }), children);
};
Avatar.Badge = _AvatarBadge.AvatarBadge;
Avatar.BadgeWithPreset = _AvatarBadgeWithPreset.AvatarBadgeWithPreset;
Avatar.Overlay = _ImageBase.ImageBase.Overlay;
Avatar.getInitialsFontSize = _helpers.getInitialsFontSize;

//# sourceMappingURL=Avatar.js.map