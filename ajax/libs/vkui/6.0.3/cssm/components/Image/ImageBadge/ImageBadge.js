import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { ImageBase, ImageBaseContext } from '../../ImageBase/ImageBase';
import styles from './ImageBadge.module.css';
export const ImageBadge = ({ className, ...restProps })=>{
    const { size } = React.useContext(ImageBaseContext);
    return /*#__PURE__*/ React.createElement(ImageBase.Badge, {
        ...restProps,
        className: classNames(styles['ImageBadge'], size < 96 && styles['ImageBadge--shifted'], className)
    });
};

//# sourceMappingURL=ImageBadge.js.map