import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { usePlatform } from '../../hooks/usePlatform';
import { SizeType } from '../../lib/adaptivity';
import { Platform } from '../../lib/platform';
import { COMMON_WARNINGS, warnOnce } from '../../lib/warnOnce';
import { Tappable } from '../Tappable/Tappable';
import styles from './IconButton.module.css';
const sizeYClassNames = {
    none: styles['IconButton--sizeY-none'],
    [SizeType.COMPACT]: styles['IconButton--sizeY-compact']
};
const warn = warnOnce('IconButton');
/**
 * @see https://vkcom.github.io/VKUI/#/IconButton
 */ export const IconButton = ({ children, className, ...restProps })=>{
    const platform = usePlatform();
    const { sizeY = 'none' } = useAdaptivity();
    if (process.env.NODE_ENV === 'development') {
        const isAccessible = restProps['aria-label'] || restProps['aria-labelledby'];
        if (!isAccessible) {
            warn(COMMON_WARNINGS.a11y[restProps.href ? 'link-name' : 'button-name'], 'error');
        }
    }
    return /*#__PURE__*/ React.createElement(Tappable, {
        activeEffectDelay: 200,
        activeMode: "background",
        Component: restProps.href ? 'a' : 'button',
        ...restProps,
        className: classNames(styles['IconButton'], sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], platform === Platform.IOS && styles['IconButton--ios'], className)
    }, children);
};

//# sourceMappingURL=IconButton.js.map