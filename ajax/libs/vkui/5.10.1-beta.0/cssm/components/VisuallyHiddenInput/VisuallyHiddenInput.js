import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
import { warnOnce } from '../../lib/warnOnce';
import styles from './VisuallyHiddenInput.module.css';
const warn = warnOnce('VisuallyHiddenInput');
/**
 * @deprecated v5.4.0
 *
 * Компонент устарел и будет удален в v6. Используйте
 * `<VisuallyHidden Component="input" />`
 */ export const VisuallyHiddenInput = ({ getRef, className, getRootRef, ...restProps })=>{
    const visuallyHiddenInputRef = useExternRef(getRef, getRootRef);
    if (process.env.NODE_ENV === 'development') {
        warn('Компонент устарел и будет удален в v6. Используйте https://vkcom.github.io/VKUI/#/VisuallyHidden');
    }
    return /*#__PURE__*/ React.createElement("input", {
        ...restProps,
        className: classNames(styles['VisuallyHiddenInput'], className),
        ref: visuallyHiddenInputRef
    });
};

//# sourceMappingURL=VisuallyHiddenInput.js.map