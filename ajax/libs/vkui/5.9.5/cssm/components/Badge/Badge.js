import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './Badge.module.css';
const stylesMode = {
    new: styles['Badge--mode-new'],
    prominent: styles['Badge--mode-prominent']
};
/**
 * @see https://vkcom.github.io/VKUI/#/Badge
 */ export const Badge = ({ mode = 'new', ...restProps })=>/*#__PURE__*/ React.createElement(RootComponent, {
        Component: "span",
        baseClassName: classNames(styles['Badge'], stylesMode[mode]),
        ...restProps
    });

//# sourceMappingURL=Badge.js.map