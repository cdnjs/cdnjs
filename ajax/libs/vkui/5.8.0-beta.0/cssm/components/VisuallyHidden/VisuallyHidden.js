import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import styles from './VisuallyHidden.module.css';
/**
 * Компонент-обертка. Позволяет скрыть контент визуально, но оставить его
 * доступным для ассистивных технологий. По умолчанию — `span`.
 *
 * @since v5.4.0
 * @see https://vkcom.github.io/VKUI/#/VisuallyHidden
 */ export const VisuallyHidden = ({ Component = 'span', getRootRef, className, ...restProps })=>{
    return /*#__PURE__*/ React.createElement(Component, {
        ...restProps,
        className: classNames(styles['VisuallyHidden'], className),
        ref: getRootRef
    });
};

//# sourceMappingURL=VisuallyHidden.js.map