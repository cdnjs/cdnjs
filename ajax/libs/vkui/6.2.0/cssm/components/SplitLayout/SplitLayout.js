import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { PopoutRoot } from '../PopoutRoot/PopoutRoot';
import styles from './SplitLayout.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/SplitLayout
 */ export const SplitLayout = ({ popout, modal, header, children, getRootRef, getRef, className, center, ...restProps })=>{
    const platform = usePlatform();
    return /*#__PURE__*/ _jsxs(PopoutRoot, {
        className: classNames(styles['SplitLayout'], platform === 'ios' && styles['SplitLayout--ios']),
        popout: popout,
        modal: modal,
        getRootRef: getRootRef,
        children: [
            header,
            /*#__PURE__*/ _jsx("div", {
                ...restProps,
                ref: getRef,
                className: classNames(styles['SplitLayout__inner'], !!header && styles['SplitLayout__inner--header'], center && styles['SplitLayout__inner--center'], className),
                children: children
            })
        ]
    });
};

//# sourceMappingURL=SplitLayout.js.map