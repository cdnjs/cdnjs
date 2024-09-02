import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { DATA_DRAGGABLE_PLACEHOLDER_REACT_PROP } from '../../hooks/useDraggableWithDomApi';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './List.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/List
 */ export const List = ({ children, gap = 0, className, style, ...restProps })=>{
    return /*#__PURE__*/ _jsxs(RootComponent, {
        role: "list",
        className: classNames(styles.List, className),
        style: {
            ...style,
            gridGap: gap
        },
        ...restProps,
        children: [
            children,
            /*#__PURE__*/ _jsx("div", {
                "aria-hidden": true,
                ...DATA_DRAGGABLE_PLACEHOLDER_REACT_PROP,
                className: styles['List__placeholder']
            })
        ]
    });
};

//# sourceMappingURL=List.js.map