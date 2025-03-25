import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './RadioGroup.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/RadioGroup
 */ export const RadioGroup = ({ mode = 'vertical', ...restProps })=>/*#__PURE__*/ _jsx(RootComponent, {
        baseClassName: classNames(styles['RadioGroup'], 'vkuiInternalRadioGroup', mode === 'horizontal' && styles['RadioGroup--mode-horizontal']),
        role: "radiogroup",
        ...restProps
    });

//# sourceMappingURL=RadioGroup.js.map