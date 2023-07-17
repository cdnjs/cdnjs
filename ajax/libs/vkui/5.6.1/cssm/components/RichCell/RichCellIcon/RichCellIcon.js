import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import styles from './RichCellIcon.module.css';
export const RichCellIcon = ({ children, className, ...restProps })=>{
    return /*#__PURE__*/ React.createElement("div", {
        ...restProps,
        className: classNames(styles['RichCellIcon'], className)
    }, children);
};

//# sourceMappingURL=RichCellIcon.js.map