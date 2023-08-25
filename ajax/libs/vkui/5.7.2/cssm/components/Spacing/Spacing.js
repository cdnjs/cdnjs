import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import styles from './Spacing.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Spacing
 */ export const Spacing = ({ size = 8, style: styleProp, className, ...restProps })=>{
    const style = {
        height: size,
        padding: `${size / 2}px 0`,
        ...styleProp
    };
    return /*#__PURE__*/ React.createElement("div", {
        ...restProps,
        className: classNames(className, styles['Spacing']),
        style: style
    });
};

//# sourceMappingURL=Spacing.js.map