'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform.js";
import { Button } from "../Button/Button.js";
import { Tappable } from "../Tappable/Tappable.js";
import styles from "./Alert.module.css";
const AlertActionIos = ({ mode, ...restProps })=>{
    return /*#__PURE__*/ _jsx(Tappable, {
        Component: restProps.href ? 'a' : 'button',
        baseClassName: classNames(styles.action, mode === 'destructive' && styles.actionModeDestructive, mode === 'cancel' && styles.actionModeCancel),
        ...restProps
    });
};
const AlertActionBase = ({ mode, ...restProps })=>{
    const platform = usePlatform();
    let buttonMode = 'tertiary';
    if (platform === 'vkcom') {
        buttonMode = mode === 'cancel' ? 'secondary' : 'primary';
    }
    return /*#__PURE__*/ _jsx(Button, {
        className: classNames(styles.button, mode === 'cancel' && styles.buttonModeCancel),
        mode: buttonMode,
        size: "m",
        ...restProps
    });
};
export const AlertAction = (props)=>{
    const platform = usePlatform();
    if (platform === 'ios') {
        return /*#__PURE__*/ _jsx(AlertActionIos, {
            ...props
        });
    }
    return /*#__PURE__*/ _jsx(AlertActionBase, {
        ...props
    });
};

//# sourceMappingURL=AlertAction.js.map