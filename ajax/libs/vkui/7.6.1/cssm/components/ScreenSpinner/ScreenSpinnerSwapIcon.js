'use client';
import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable jsdoc/require-jsdoc */ import * as React from "react";
import { Icon24Cancel } from "@vkontakte/icons";
import { mergeCalls } from "../../lib/mergeCalls.js";
import { clickByKeyboardHandler } from "../../lib/utils.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Icon48CancelCircle } from "./Icon48CancelCircle.js";
import { Icon48DoneOutline } from "./Icon48DoneOutline.js";
import { ScreenSpinnerContext } from "./context.js";
import styles from "./ScreenSpinner.module.css";
const ScreenSpinnerCancelIcon = ({ onKeyDown, 'aria-label': ariaLabel = 'Отменить', ...restProps })=>{
    const handlers = mergeCalls({
        onKeyDown: clickByKeyboardHandler
    }, {
        onKeyDown
    });
    let clickableProps = {
        ...handlers,
        'tabIndex': 0,
        'role': 'button',
        'aria-label': ariaLabel
    };
    return /*#__PURE__*/ _jsx(RootComponent, {
        baseClassName: styles.icon,
        ...clickableProps,
        ...restProps,
        children: /*#__PURE__*/ _jsx(Icon24Cancel, {})
    });
};
export const ScreenSpinnerSwapIcon = ({ cancelLabel, ...restProps })=>{
    const { state, customIcon } = React.useContext(ScreenSpinnerContext);
    if (state === 'cancelable') {
        return /*#__PURE__*/ _jsx(ScreenSpinnerCancelIcon, {
            "aria-label": cancelLabel,
            ...restProps
        });
    }
    const getContent = ()=>{
        if (state === 'custom') {
            return customIcon;
        }
        const Icon = {
            loading: ()=>null,
            done: Icon48DoneOutline,
            error: Icon48CancelCircle
        }[state];
        return /*#__PURE__*/ _jsx(Icon, {});
    };
    return /*#__PURE__*/ _jsx(RootComponent, {
        baseClassName: styles.icon,
        ...restProps,
        children: getContent()
    });
};

//# sourceMappingURL=ScreenSpinnerSwapIcon.js.map