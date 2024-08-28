import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { ImageBase } from '../ImageBase/ImageBase';
import { AvatarBadge } from './AvatarBadge/AvatarBadge';
import { AvatarBadgeWithPreset } from './AvatarBadge/AvatarBadgeWithPreset';
import { getInitialsFontSize } from './helpers';
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
/**
 * @see https://vkcom.github.io/VKUI/#/Avatar
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
        className: classNames("vkuiAvatar", gradientName && "vkuiAvatar--has-gradient", isGradientNotCustom && gradientStyles[gradientName], className),
        children: children
    }));
};
Avatar.displayName = 'Avatar';
Avatar.Badge = AvatarBadge;
Avatar.Badge.displayName = 'Avatar.Badge';
Avatar.BadgeWithPreset = AvatarBadgeWithPreset;
Avatar.BadgeWithPreset.displayName = 'Avatar.BadgeWithPreset';
Avatar.Overlay = ImageBase.Overlay;
Avatar.Overlay.displayName = 'Avatar.Overlay';
Avatar.getInitialsFontSize = getInitialsFontSize;

//# sourceMappingURL=Avatar.js.map