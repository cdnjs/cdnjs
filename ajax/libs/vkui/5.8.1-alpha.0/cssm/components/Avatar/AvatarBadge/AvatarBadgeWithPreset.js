import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { getBadgeIconSizeByImageBaseSize, ImageBase, ImageBaseContext } from '../../ImageBase/ImageBase';
import { Icon12Circle, Icon12OnlineMobile } from './icons';
import styles from './AvatarBadge.module.css';
export const AvatarBadgeWithPreset = ({ preset = 'online', className, ...restProps })=>{
    const { size } = React.useContext(ImageBaseContext);
    const badgeSize = getBadgeIconSizeByImageBaseSize(size);
    const isOnlinePreset = preset === 'online';
    const presetClassName = isOnlinePreset ? styles['AvatarBadge--preset-online'] : styles['AvatarBadge--preset-onlineMobile'];
    const Icon = isOnlinePreset ? Icon12Circle : Icon12OnlineMobile;
    return /*#__PURE__*/ React.createElement(ImageBase.Badge, {
        background: "stroke",
        className: classNames(styles['AvatarBadge'], presetClassName, className),
        ...restProps
    }, /*#__PURE__*/ React.createElement(Icon, {
        width: badgeSize,
        height: badgeSize
    }));
};

//# sourceMappingURL=AvatarBadgeWithPreset.js.map