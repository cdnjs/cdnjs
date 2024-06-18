import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { usePlatform } from '../../hooks/usePlatform';
import { hasAccessibleName } from '../../lib/accessibility';
import { COMMON_WARNINGS, warnOnce } from '../../lib/warnOnce';
import { Tappable } from '../Tappable/Tappable';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './IconButton.module.css';
const sizeYClassNames = {
    none: styles['IconButton--sizeY-none'],
    compact: styles['IconButton--sizeY-compact']
};
const warn = warnOnce('IconButton');
/**
 * @see https://vkcom.github.io/VKUI/#/IconButton
 */ export const IconButton = ({ label, children, className, ...restProps })=>{
    const platform = usePlatform();
    const { sizeY = 'none' } = useAdaptivity();
    if (process.env.NODE_ENV === 'development') {
        /* istanbul ignore next: проверка в dev mode, тест на hasAccessibleName() есть в lib/accessibility.test.tsx */ const isAccessible = hasAccessibleName({
            children: [
                children,
                label
            ],
            ...restProps
        });
        if (!isAccessible) {
            warn(COMMON_WARNINGS.a11y[restProps.href ? 'link-name' : 'button-name'], 'error');
        }
    }
    return /*#__PURE__*/ React.createElement(Tappable, {
        activeEffectDelay: 200,
        activeMode: "background",
        Component: restProps.href ? 'a' : 'button',
        ...restProps,
        className: classNames(styles['IconButton'], sizeY !== 'regular' && sizeYClassNames[sizeY], platform === 'ios' && styles['IconButton--ios'], className)
    }, label && /*#__PURE__*/ React.createElement(VisuallyHidden, null, label), children);
};

//# sourceMappingURL=IconButton.js.map