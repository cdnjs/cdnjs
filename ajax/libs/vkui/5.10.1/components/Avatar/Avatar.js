import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { ImageBase } from "../ImageBase/ImageBase";
import { AvatarBadge } from "./AvatarBadge/AvatarBadge";
import { AvatarBadgeWithPreset } from "./AvatarBadge/AvatarBadgeWithPreset";
import { getInitialsFontSize } from "./helpers";
export var AVATAR_DEFAULT_SIZE = 48;
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
/**
 * @see https://vkcom.github.io/VKUI/#/Avatar
 */ export var Avatar = function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? AVATAR_DEFAULT_SIZE : _param_size, className = _param.className, gradientColor = _param.gradientColor, initials = _param.initials, fallbackIconProp = _param.fallbackIcon, children = _param.children, restProps = _object_without_properties(_param, [
        "size",
        "className",
        "gradientColor",
        "initials",
        "fallbackIcon",
        "children"
    ]);
    var gradientName = typeof gradientColor === "number" ? COLORS_NUMBER_TO_TEXT_MAP[gradientColor] : gradientColor;
    var isGradientNotCustom = gradientName && gradientName !== "custom";
    var fallbackIcon = initials ? /*#__PURE__*/ React.createElement("div", {
        className: "vkuiAvatar__initials",
        style: {
            fontSize: getInitialsFontSize(size)
        }
    }, initials) : fallbackIconProp;
    return /*#__PURE__*/ React.createElement(ImageBase, _object_spread_props(_object_spread({}, restProps), {
        size: size,
        fallbackIcon: fallbackIcon,
        className: classNames("vkuiAvatar", gradientName && "vkuiAvatar--has-gradient", isGradientNotCustom && gradientStyles[gradientName], className)
    }), children);
};
Avatar.Badge = AvatarBadge;
Avatar.BadgeWithPreset = AvatarBadgeWithPreset;
Avatar.Overlay = ImageBase.Overlay;
Avatar.getInitialsFontSize = getInitialsFontSize;

//# sourceMappingURL=Avatar.js.map