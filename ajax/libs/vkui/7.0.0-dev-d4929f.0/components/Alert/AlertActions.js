'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform.js";
import { AlertAction } from "./AlertAction.js";
const alignStyles = {
    left: "Alert__actionsAlignLeft--wPpf3",
    center: "Alert__actionsAlignCenter--Q53fE",
    right: "Alert__actionsAlignRight--ZEV6i"
};
const directionStyles = {
    vertical: "Alert__actionsDirectionVertical--Ksj-A",
    horizontal: "Alert__actionsDirectionHorizontal--tBjp8"
};
export const AlertActions = ({ actions = [], renderAction = (props)=>/*#__PURE__*/ _jsx(AlertAction, _object_spread({}, props)), onItemClick, actionsAlign, actionsLayout })=>{
    const platform = usePlatform();
    const direction = platform === 'vkcom' ? 'horizontal' : actionsLayout;
    return /*#__PURE__*/ _jsx("div", {
        className: classNames("Alert__actions--RW9lv", actionsAlign && alignStyles[actionsAlign], direction && directionStyles[direction]),
        children: actions.map((action, i)=>{
            // Убираем
            const { title: children, action: _, autoCloseDisabled } = action, restProps = _object_without_properties(action, [
                "title",
                "action",
                "autoCloseDisabled"
            ]);
            return /*#__PURE__*/ _jsx(React.Fragment, {
                children: renderAction(_object_spread({
                    children,
                    onClick: ()=>onItemClick(action)
                }, restProps))
            }, i);
        })
    });
};

//# sourceMappingURL=AlertActions.js.map