import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { warnOnce } from '../../lib/warnOnce';
import styles from './VisuallyHiddenInput.module.css';
const warn = warnOnce('VisuallyHiddenInput');
/**
 * @deprecated v5.4.0
 *
 * Компонент устарел и будет удален в v6. Используйте
 * `<VisuallyHidden Component="input" />`
 */ export const VisuallyHiddenInput = ({ getRef, className, ...restProps })=>{
    if (process.env.NODE_ENV === 'development') {
        warn('Компонент устарел и будет удален в v6. Используйте https://vkcom.github.io/VKUI/#/VisuallyHidden');
    }
    return /*#__PURE__*/ React.createElement("input", {
        ...restProps,
        className: classNames(styles['VisuallyHiddenInput'], className),
        ref: getRef
    });
};

//# sourceMappingURL=VisuallyHiddenInput.js.map