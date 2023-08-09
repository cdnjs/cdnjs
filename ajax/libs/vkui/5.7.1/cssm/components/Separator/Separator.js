import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import styles from './Separator.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Separator
 */ export const Separator = ({ wide, className, ...restProps })=>/*#__PURE__*/ React.createElement("div", {
        ...restProps,
        className: classNames(styles['Separator'], !wide && styles['Separator--padded'], className)
    }, /*#__PURE__*/ React.createElement("hr", {
        className: styles['Separator__in']
    }));

//# sourceMappingURL=Separator.js.map