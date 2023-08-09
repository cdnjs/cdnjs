import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import styles from './RadioGroup.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/RadioGroup
 */ export const RadioGroup = ({ mode = 'vertical', children, className, ...restProps })=>/*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['RadioGroup'], 'vkuiInternalRadioGroup', mode === 'horizontal' && styles['RadioGroup--mode-horizontal'], className),
        ...restProps
    }, children);

//# sourceMappingURL=RadioGroup.js.map