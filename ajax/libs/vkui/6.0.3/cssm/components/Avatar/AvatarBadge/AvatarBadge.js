import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { ImageBase, ImageBaseContext } from '../../ImageBase/ImageBase';
import styles from './AvatarBadge.module.css';
export const AvatarBadge = ({ className, ...restProps })=>{
    const { size } = React.useContext(ImageBaseContext);
    return /*#__PURE__*/ React.createElement(ImageBase.Badge, {
        ...restProps,
        className: classNames(styles['AvatarBadge'], size < 96 && styles['AvatarBadge--shifted'], className)
    });
};

//# sourceMappingURL=AvatarBadge.js.map