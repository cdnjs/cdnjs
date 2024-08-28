import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../../RootComponent/RootComponent';
import { ImageBaseContext } from '../context';
import { validateBadgeIcon } from '../validators';
import styles from './ImageBaseBadge.module.css';
function DevelopmentCheck({ children }) {
    const { size } = React.useContext(ImageBaseContext);
    if (children) {
        validateBadgeIcon(size, {
            name: 'children',
            value: children
        });
    }
    return null;
}
const backgroundStyles = {
    stroke: styles['ImageBaseBadge--background-stroke'],
    shadow: styles['ImageBaseBadge--background-shadow']
};
/**
 * Бейдж в правом нижнем углу компонента.
 *
 * > Не используйте при `size < 24`
 */ export const ImageBaseBadge = ({ background = 'shadow', ...restProps })=>{
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx(RootComponent, {
                ...restProps,
                baseClassName: classNames(styles['ImageBaseBadge'], backgroundStyles[background])
            }),
            process.env.NODE_ENV === 'development' && /*#__PURE__*/ _jsx(DevelopmentCheck, {
                children: restProps.children
            })
        ]
    });
};
ImageBaseBadge.displayName = 'ImageBaseBadge';

//# sourceMappingURL=ImageBaseBadge.js.map