import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../../RootComponent/RootComponent';
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
 */ export const ImageBaseBadge = ({ background = 'shadow', ...restProps })=>{
    if (process.env.NODE_ENV === 'development') {
        if (restProps.children) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { size } = React.useContext(ImageBaseContext);
            validateBadgeIcon(size, {
                name: 'children',
                value: restProps.children
            });
        }
    }
    return /*#__PURE__*/ React.createElement(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles['ImageBaseBadge'], backgroundStyles[background])
    });
};

//# sourceMappingURL=ImageBaseBadge.js.map