import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './RadioGroup.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/RadioGroup
 */ export const RadioGroup = ({ mode = 'vertical', ...restProps })=>/*#__PURE__*/ React.createElement(RootComponent, {
        baseClassName: classNames(styles['RadioGroup'], 'vkuiInternalRadioGroup', mode === 'horizontal' && styles['RadioGroup--mode-horizontal']),
        ...restProps
    });

//# sourceMappingURL=RadioGroup.js.map