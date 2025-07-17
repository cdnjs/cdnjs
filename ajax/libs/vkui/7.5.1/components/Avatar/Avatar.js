import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { defineComponentDisplayNames } from "../../lib/react/defineComponentDisplayNames.js";
import { ImageBase } from "../ImageBase/ImageBase.js";
import { ImageBaseOverlay } from "../ImageBase/ImageBaseOverlay/ImageBaseOverlay.js";
import { AvatarBadge } from "./AvatarBadge/AvatarBadge.js";
import { AvatarBadgeWithPreset } from "./AvatarBadge/AvatarBadgeWithPreset.js";
import { getInitialsFontSize } from "./helpers.js";
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
    'red': "vkuiAvatar__gradientRed",
    'orange': "vkuiAvatar__gradientOrange",
    'yellow': "vkuiAvatar__gradientYellow",
    'green': "vkuiAvatar__gradientGreen",
    'blue': "vkuiAvatar__gradientBlue",
    'l-blue': "vkuiAvatar__gradientLBlue",
    'violet': "vkuiAvatar__gradientViolet"
};
/**
 * @see https://vkui.io/components/avatar
 */ export const Avatar = (_param)=>{
    var { size = AVATAR_DEFAULT_SIZE, className, gradientColor, initials, fallbackIcon: fallbackIconProp, children } = _param, restProps = _object_without_properties(_param, [
        "size",
        "className",
        "gradientColor",
        "initials",
        "fallbackIcon",
        "children"
    ]);
    const gradientName = typeof gradientColor === 'number' ? COLORS_NUMBER_TO_TEXT_MAP[gradientColor] : gradientColor;
    const isGradientNotCustom = gradientName && gradientName !== 'custom';
    const fallbackIcon = initials ? /*#__PURE__*/ _jsx("div", {
        className: "vkuiAvatar__initials",
        style: {
            fontSize: getInitialsFontSize(size)
        },
        children: initials
    }) : fallbackIconProp;
    return /*#__PURE__*/ _jsx(ImageBase, _object_spread_props(_object_spread({}, restProps), {
        size: size,
        fallbackIcon: fallbackIcon,
        className: classNames("vkuiAvatar__host", gradientName && "vkuiAvatar__hasGradient", isGradientNotCustom && gradientStyles[gradientName], className),
        children: children
    }));
};
Avatar.Badge = AvatarBadge;
Avatar.BadgeWithPreset = AvatarBadgeWithPreset;
Avatar.Overlay = ImageBaseOverlay;
Avatar.getInitialsFontSize = getInitialsFontSize;
if (process.env.NODE_ENV !== 'production') {
    defineComponentDisplayNames(Avatar.Badge, 'Avatar.Badge');
    defineComponentDisplayNames(Avatar.BadgeWithPreset, 'Avatar.BadgeWithPreset');
    defineComponentDisplayNames(Avatar.Overlay, 'Avatar.Overlay');
}

//# sourceMappingURL=Avatar.js.map