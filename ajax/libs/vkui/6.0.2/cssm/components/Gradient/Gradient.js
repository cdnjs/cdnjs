import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './Gradient.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Gradient
 */ export const Gradient = ({ mode = 'default', to = 'top', ...restProps })=>{
    return /*#__PURE__*/ React.createElement(RootComponent, {
        role: "presentation",
        ...restProps,
        baseClassName: classNames(styles['Gradient'], mode !== 'default' && styles['Gradient--mode-tint'], to === 'bottom' && styles['Gradient--to-bottom'])
    });
};

//# sourceMappingURL=Gradient.js.map