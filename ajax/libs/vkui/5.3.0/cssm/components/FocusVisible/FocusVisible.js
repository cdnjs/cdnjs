import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import styles from './FocusVisible.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/FocusVisible
 */ export const FocusVisible = ({ mode  })=>/*#__PURE__*/ React.createElement("span", {
        "aria-hidden": true,
        className: classNames(styles['FocusVisible'], {
            inside: styles['FocusVisible--mode-inside'],
            outside: styles['FocusVisible--mode-outside']
        }[mode])
    });

//# sourceMappingURL=FocusVisible.js.map