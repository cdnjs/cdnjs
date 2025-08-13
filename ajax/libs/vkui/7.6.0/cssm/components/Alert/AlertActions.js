'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform.js";
import { AlertAction } from "./AlertAction.js";
import styles from "./Alert.module.css";
const alignStyles = {
    left: styles.actionsAlignLeft,
    center: styles.actionsAlignCenter,
    right: styles.actionsAlignRight
};
const directionStyles = {
    vertical: styles.actionsDirectionVertical,
    horizontal: styles.actionsDirectionHorizontal
};
export const AlertActions = ({ actions = [], renderAction = (props)=>/*#__PURE__*/ _jsx(AlertAction, {
        ...props
    }), onItemClick, actionsAlign, actionsLayout })=>{
    const platform = usePlatform();
    const direction = platform === 'vkcom' ? 'horizontal' : actionsLayout;
    return /*#__PURE__*/ _jsx("div", {
        className: classNames(styles.actions, actionsAlign && alignStyles[actionsAlign], direction && directionStyles[direction]),
        children: actions.map((action, i)=>{
            // Убираем
            const { title: children, action: _, autoCloseDisabled, ...restProps } = action;
            return /*#__PURE__*/ _jsx(React.Fragment, {
                children: renderAction({
                    children,
                    onClick: ()=>onItemClick(action),
                    ...restProps
                })
            }, i);
        })
    });
};

//# sourceMappingURL=AlertActions.js.map