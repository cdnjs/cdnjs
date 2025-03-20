import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './Group.module.css';
const stylesDirection = {
    inline: styles['Group__expanded-content--inline'],
    block: styles['Group__expanded-content--block']
};
export const GroupExpandedContent = ({ direction = 'inline', ...restProps })=>{
    return /*#__PURE__*/ _jsx(RootComponent, {
        Component: "div",
        ...restProps,
        baseClassName: classNames(styles['Group__expanded-content'], stylesDirection[direction])
    });
};

//# sourceMappingURL=GroupExpandedContent.js.map