import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import styles from './VisuallyHiddenInput.module.css';
/**
 * @description
 * Обертка над обычным `<input/>`; дает
 * скрыть его визуально и оставить
 * доступным для ассистивных технологий.
 */ export const VisuallyHiddenInput = ({ getRef , className , ...restProps })=>{
    return /*#__PURE__*/ React.createElement("input", {
        ...restProps,
        className: classNames(styles['VisuallyHiddenInput'], className),
        ref: getRef
    });
};

//# sourceMappingURL=VisuallyHiddenInput.js.map