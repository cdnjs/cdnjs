import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { ImageBase } from "../ImageBase/ImageBase.js";
import { ImageBaseOverlay } from "../ImageBase/ImageBaseOverlay/ImageBaseOverlay.js";
import { AvatarBadge } from "./AvatarBadge/AvatarBadge.js";
import { AvatarBadgeWithPreset } from "./AvatarBadge/AvatarBadgeWithPreset.js";
import { getInitialsFontSize } from "./helpers.js";
import styles from "./Avatar.module.css";
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
    'red': styles.gradientRed,
    'orange': styles.gradientOrange,
    'yellow': styles.gradientYellow,
    'green': styles.gradientGreen,
    'blue': styles.gradientBlue,
    'l-blue': styles.gradientLBlue,
    'violet': styles.gradientViolet
};
/**
 * @see https://vkcom.github.io/VKUI/#/Avatar
 */ export const Avatar = ({ size = AVATAR_DEFAULT_SIZE, className, gradientColor, initials, fallbackIcon: fallbackIconProp, children, ...restProps })=>{
    const gradientName = typeof gradientColor === 'number' ? COLORS_NUMBER_TO_TEXT_MAP[gradientColor] : gradientColor;
    const isGradientNotCustom = gradientName && gradientName !== 'custom';
    const fallbackIcon = initials ? /*#__PURE__*/ _jsx("div", {
        className: styles.initials,
        style: {
            fontSize: getInitialsFontSize(size)
        },
        children: initials
    }) : fallbackIconProp;
    return /*#__PURE__*/ _jsx(ImageBase, {
        ...restProps,
        size: size,
        fallbackIcon: fallbackIcon,
        className: classNames(styles.host, gradientName && styles.hasGradient, isGradientNotCustom && gradientStyles[gradientName], className),
        children: children
    });
};
Avatar.displayName = 'Avatar';
Avatar.Badge = AvatarBadge;
Avatar.Badge.displayName = 'Avatar.Badge';
Avatar.BadgeWithPreset = AvatarBadgeWithPreset;
Avatar.BadgeWithPreset.displayName = 'Avatar.BadgeWithPreset';
Avatar.Overlay = ImageBaseOverlay;
Avatar.Overlay.displayName = 'Avatar.Overlay';
Avatar.getInitialsFontSize = getInitialsFontSize;

//# sourceMappingURL=Avatar.js.map