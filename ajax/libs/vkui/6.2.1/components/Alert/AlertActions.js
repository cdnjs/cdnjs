import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { AlertAction } from './AlertAction';
const alignStyles = {
    left: "vkuiAlert__actions--align-left",
    center: "vkuiAlert__actions--align-center",
    right: "vkuiAlert__actions--align-right"
};
const directionStyles = {
    vertical: "vkuiAlert__actions--direction-vertical",
    horizontal: "vkuiAlert__actions--direction-horizontal"
};
export const AlertActions = ({ actions = [], renderAction = (props)=>/*#__PURE__*/ _jsx(AlertAction, _object_spread({}, props)), onItemClick, actionsAlign, actionsLayout })=>{
    const platform = usePlatform();
    const direction = platform === 'vkcom' ? 'horizontal' : actionsLayout;
    return /*#__PURE__*/ _jsx("div", {
        className: classNames("vkuiAlert__actions", actionsAlign && alignStyles[actionsAlign], direction && directionStyles[direction]),
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