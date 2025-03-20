"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Avatar", {
    enumerable: true,
    get: function() {
        return Avatar;
    }
});
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _vkjs = require("@vkontakte/vkjs");
const _ImageBase = require("../ImageBase/ImageBase");
const _AvatarBadge = require("./AvatarBadge/AvatarBadge");
const _AvatarBadgeWithPreset = require("./AvatarBadge/AvatarBadgeWithPreset");
const _helpers = require("./helpers");
const AVATAR_DEFAULT_SIZE = 48;
const COLORS_NUMBER_TO_TEXT_MAP = {
    1: 'red',
    2: 'orange',
    3: 'yellow',
    4: 'green',
    5: 'l-blue',
    6: 'violet'
};
const gradientStyles = {
    'red': "vkuiAvatar--gradient-red",
    'orange': "vkuiAvatar--gradient-orange",
    'yellow': "vkuiAvatar--gradient-yellow",
    'green': "vkuiAvatar--gradient-green",
    'blue': "vkuiAvatar--gradient-blue",
    'l-blue': "vkuiAvatar--gradient-l-blue",
    'violet': "vkuiAvatar--gradient-violet"
};
const Avatar = (_param)=>{
    var { size = AVATAR_DEFAULT_SIZE, className, gradientColor, initials, fallbackIcon: fallbackIconProp, children } = _param, restProps = _object_without_properties._(_param, [
        "size",
        "className",
        "gradientColor",
        "initials",
        "fallbackIcon",
        "children"
    ]);
    const gradientName = typeof gradientColor === 'number' ? COLORS_NUMBER_TO_TEXT_MAP[gradientColor] : gradientColor;
    const isGradientNotCustom = gradientName && gradientName !== 'custom';
    const fallbackIcon = initials ? /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
        className: "vkuiAvatar__initials",
        style: {
            fontSize: (0, _helpers.getInitialsFontSize)(size)
        },
        children: initials
    }) : fallbackIconProp;
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_ImageBase.ImageBase, _object_spread_props._(_object_spread._({}, restProps), {
        size: size,
        fallbackIcon: fallbackIcon,
        className: (0, _vkjs.classNames)("vkuiAvatar", gradientName && "vkuiAvatar--has-gradient", isGradientNotCustom && gradientStyles[gradientName], className),
        children: children
    }));
};
Avatar.displayName = 'Avatar';
Avatar.Badge = _AvatarBadge.AvatarBadge;
Avatar.Badge.displayName = 'Avatar.Badge';
Avatar.BadgeWithPreset = _AvatarBadgeWithPreset.AvatarBadgeWithPreset;
Avatar.BadgeWithPreset.displayName = 'Avatar.BadgeWithPreset';
Avatar.Overlay = _ImageBase.ImageBase.Overlay;
Avatar.Overlay.displayName = 'Avatar.Overlay';
Avatar.getInitialsFontSize = _helpers.getInitialsFontSize;

//# sourceMappingURL=Avatar.js.map