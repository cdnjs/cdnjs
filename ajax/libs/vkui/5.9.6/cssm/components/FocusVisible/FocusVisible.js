import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './FocusVisible.module.css';
const stylesMode = {
    inside: styles['FocusVisible--mode-inside'],
    outside: styles['FocusVisible--mode-outside'],
    outline: styles['FocusVisible--mode-outline']
};
/**
 * @see https://vkcom.github.io/VKUI/#/FocusVisible
 */ export const FocusVisible = ({ visible, mode, thin, ...restProps })=>/*#__PURE__*/ React.createElement(RootComponent, {
        ...restProps,
        "aria-hidden": true,
        baseClassName: classNames(styles['FocusVisible'], visible && styles['FocusVisible--visible'], thin && styles['FocusVisible--thin'], stylesMode[mode])
    });

//# sourceMappingURL=FocusVisible.js.map