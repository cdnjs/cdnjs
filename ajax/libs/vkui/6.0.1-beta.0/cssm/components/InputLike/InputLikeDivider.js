import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import styles from './InputLike.module.css';
export const InputLikeDivider = ({ children, className, ...props })=>{
    return /*#__PURE__*/ React.createElement("span", {
        className: classNames(styles['InputLike__divider'], className),
        ...props
    }, children);
};

//# sourceMappingURL=InputLikeDivider.js.map