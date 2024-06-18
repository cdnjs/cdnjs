import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './Badge.module.css';
const stylesMode = {
    new: styles['Badge--mode-new'],
    prominent: styles['Badge--mode-prominent']
};
/**
 * @see https://vkcom.github.io/VKUI/#/Badge
 */ export const Badge = ({ mode = 'new', children, ...restProps })=>/*#__PURE__*/ React.createElement(RootComponent, {
        Component: "span",
        baseClassName: classNames(styles['Badge'], stylesMode[mode]),
        ...restProps
    }, children && /*#__PURE__*/ React.createElement(VisuallyHidden, null, children));

//# sourceMappingURL=Badge.js.map