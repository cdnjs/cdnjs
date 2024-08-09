import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { ImageBase } from '../ImageBase/ImageBase';
import { AvatarBadge } from './AvatarBadge/AvatarBadge';
import { AvatarBadgeWithPreset } from './AvatarBadge/AvatarBadgeWithPreset';
import { getInitialsFontSize } from './helpers';
import styles from './Avatar.module.css';
export const AVATAR_DEFAULT_SIZE = 48;
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
    const fallbackIcon = initials ? /*#__PURE__*/ React.createElement("div", {
        className: styles['Avatar__initials'],
        style: {
            fontSize: getInitialsFontSize(size)
        }
    }, initials) : fallbackIconProp;
    return /*#__PURE__*/ React.createElement(ImageBase, {
        ...restProps,
        size: size,
        fallbackIcon: fallbackIcon,
        className: classNames(styles['Avatar'], gradientName && styles['Avatar--has-gradient'], isGradientNotCustom && gradientStyles[gradientName], className)
    }, children);
};
Avatar.Badge = AvatarBadge;
Avatar.BadgeWithPreset = AvatarBadgeWithPreset;
Avatar.Overlay = ImageBase.Overlay;
Avatar.getInitialsFontSize = getInitialsFontSize;

//# sourceMappingURL=Avatar.js.map