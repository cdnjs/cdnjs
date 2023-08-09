import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import styles from './FocusVisible.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/FocusVisible
 */ export const FocusVisible = ({ visible, mode, thin, ...restProps })=>/*#__PURE__*/ React.createElement("span", {
        ...restProps,
        "aria-hidden": true,
        className: classNames(styles['FocusVisible'], visible && styles['FocusVisible--visible'], thin && styles['FocusVisible--thin'], {
            inside: styles['FocusVisible--mode-inside'],
            outside: styles['FocusVisible--mode-outside'],
            outline: styles['FocusVisible--mode-outline']
        }[mode])
    });

//# sourceMappingURL=FocusVisible.js.map