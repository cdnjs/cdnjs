import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import styles from './Badge.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Badge
 */ export const Badge = ({ mode = 'new', className, ...restProps })=>/*#__PURE__*/ React.createElement("span", {
        className: classNames(styles['Badge'], {
            new: styles['Badge--mode-new'],
            prominent: styles['Badge--mode-prominent']
        }[mode], className),
        ...restProps
    });

//# sourceMappingURL=Badge.js.map