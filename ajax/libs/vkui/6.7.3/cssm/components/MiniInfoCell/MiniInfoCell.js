import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Icon16Chevron } from '@vkontakte/icons';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import { Tappable } from '../Tappable/Tappable';
import { Paragraph } from '../Typography/Paragraph/Paragraph';
import styles from './MiniInfoCell.module.css';
const stylesMode = {
    add: styles['MiniInfoCell--mode-add'],
    accent: styles['MiniInfoCell--mode-accent'],
    more: styles['MiniInfoCell--mode-more']
};
const stylesTextWrap = {
    nowrap: styles['MiniInfoCell--textWrap-nowrap'],
    full: styles['MiniInfoCell--textWrap-full'],
    short: styles['MiniInfoCell--textWrap-short']
};
/**
 * @see https://vkcom.github.io/VKUI/#/MiniInfoCell
 */ export const MiniInfoCell = ({ before, after, children, mode = 'base', textWrap = 'nowrap', expandable = false, className, ...restProps })=>{
    const cellClasses = classNames(styles['MiniInfoCell'], stylesTextWrap[textWrap], mode !== 'base' && stylesMode[mode], className);
    const cellContent = /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            hasReactNode(before) && /*#__PURE__*/ _jsx("span", {
                className: styles['MiniInfoCell__before'],
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: styles['MiniInfoCell__middle'],
                children: [
                    /*#__PURE__*/ _jsx(Paragraph, {
                        className: styles['MiniInfoCell__content'],
                        weight: mode === 'more' ? '2' : undefined,
                        children: children
                    }),
                    expandable && /*#__PURE__*/ _jsx(Icon16Chevron, {})
                ]
            }),
            hasReactNode(after) && /*#__PURE__*/ _jsx("span", {
                className: styles['MiniInfoCell__after'],
                children: after
            })
        ]
    });
    return restProps.onClick ? /*#__PURE__*/ _jsx(Tappable, {
        Component: "div",
        role: "button",
        ...restProps,
        className: cellClasses,
        children: cellContent
    }) : /*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        baseClassName: cellClasses,
        children: cellContent
    });
};

//# sourceMappingURL=MiniInfoCell.js.map