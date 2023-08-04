import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { ImageBaseContext } from '../context';
import { validateBadgeIcon } from '../validators';
import styles from './ImageBaseBadge.module.css';
const backgroundStyles = {
    stroke: styles['ImageBaseBadge--background-stroke'],
    shadow: styles['ImageBaseBadge--background-shadow']
};
/**
 * Бейдж в правом нижнем углу компонента.
 *
 * > Не используйте при `size < 24`
 */ export const ImageBaseBadge = ({ background = 'shadow', children, className, ...restProps })=>{
    if (process.env.NODE_ENV === 'development') {
        if (children) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { size } = React.useContext(ImageBaseContext);
            validateBadgeIcon(size, {
                name: 'children',
                value: children
            });
        }
    }
    return /*#__PURE__*/ React.createElement("div", {
        ...restProps,
        className: classNames(styles['ImageBaseBadge'], backgroundStyles[background], className)
    }, children);
};

//# sourceMappingURL=ImageBaseBadge.js.map