import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './PopoutWrapper.module.css';
const stylesAlignX = {
    center: styles['PopoutWrapper--alignX-center'],
    left: styles['PopoutWrapper--alignX-left'],
    right: styles['PopoutWrapper--alignX-right']
};
const stylesAlignY = {
    center: styles['PopoutWrapper--alignY-center'],
    top: styles['PopoutWrapper--alignY-top'],
    bottom: styles['PopoutWrapper--alignY-bottom']
};
/**
 * @see https://vkcom.github.io/VKUI/#/PopoutWrapper
 */ export const PopoutWrapper = ({ alignY = 'center', alignX = 'center', closing = false, noBackground = false, fixed = true, children, onClick, ...restProps })=>{
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles['PopoutWrapper'], stylesAlignY[alignY], stylesAlignX[alignX], closing ? styles['PopoutWrapper--closing'] : styles['PopoutWrapper--opened'], fixed && styles['PopoutWrapper--fixed'], !noBackground && styles['PopoutWrapper--masked']),
        children: /*#__PURE__*/ _jsxs("div", {
            className: styles['PopoutWrapper__container'],
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: styles['PopoutWrapper__overlay'],
                    onClick: onClick
                }),
                /*#__PURE__*/ _jsx("div", {
                    className: styles['PopoutWrapper__content'],
                    children: children
                })
            ]
        })
    });
};

//# sourceMappingURL=PopoutWrapper.js.map