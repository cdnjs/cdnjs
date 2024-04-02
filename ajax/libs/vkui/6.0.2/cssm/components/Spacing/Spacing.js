import * as React from 'react';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './Spacing.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Spacing
 */ export const Spacing = ({ size = 8, style: styleProp, ...restProps })=>{
    const style = {
        height: size,
        padding: `${size / 2}px 0`,
        ...styleProp
    };
    return /*#__PURE__*/ React.createElement(RootComponent, {
        ...restProps,
        baseClassName: styles['Spacing'],
        style: style
    });
};

//# sourceMappingURL=Spacing.js.map