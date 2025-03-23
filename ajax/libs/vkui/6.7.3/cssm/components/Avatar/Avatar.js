import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { ImageBase } from '../ImageBase/ImageBase';
import { AvatarBadge } from './AvatarBadge/AvatarBadge';
import { AvatarBadgeWithPreset } from './AvatarBadge/AvatarBadgeWithPreset';
import { getInitialsFontSize } from './helpers';
import styles from './Avatar.module.css';
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
    'red': styles['Avatar--gradient-red'],
    'orange': styles['Avatar--gradient-orange'],
    'yellow': styles['Avatar--gradient-yellow'],
    'green': styles['Avatar--gradient-green'],
    'blue': styles['Avatar--gradient-blue'],
    'l-blue': styles['Avatar--gradient-l-blue'],
    'violet': styles['Avatar--gradient-violet']
};
/**
 * @see https://vkcom.github.io/VKUI/#/Avatar
 */ export const Avatar = ({ size = AVATAR_DEFAULT_SIZE, className, gradientColor, initials, fallbackIcon: fallbackIconProp, children, ...restProps })=>{
    const gradientName = typeof gradientColor === 'number' ? COLORS_NUMBER_TO_TEXT_MAP[gradientColor] : gradientColor;
    const isGradientNotCustom = gradientName && gradientName !== 'custom';
    const fallbackIcon = initials ? /*#__PURE__*/ _jsx("div", {
        className: styles['Avatar__initials'],
        style: {
            fontSize: getInitialsFontSize(size)
        },
        children: initials
    }) : fallbackIconProp;
    return /*#__PURE__*/ _jsx(ImageBase, {
        ...restProps,
        size: size,
        fallbackIcon: fallbackIcon,
        className: classNames(styles['Avatar'], gradientName && styles['Avatar--has-gradient'], isGradientNotCustom && gradientStyles[gradientName], className),
        children: children
    });
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