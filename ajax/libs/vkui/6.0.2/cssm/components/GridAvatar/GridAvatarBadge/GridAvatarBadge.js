import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { ImageBase, ImageBaseContext } from '../../ImageBase/ImageBase';
import styles from './GridAvatarBadge.module.css';
export const GridAvatarBadge = ({ className, ...restProps })=>{
    const { size } = React.useContext(ImageBaseContext);
    return /*#__PURE__*/ React.createElement(ImageBase.Badge, {
        ...restProps,
        className: classNames(styles['GridAvatarBadge'], size < 96 && styles['GridAvatarBadge--shifted'], className)
    });
};

//# sourceMappingURL=GridAvatarBadge.js.map