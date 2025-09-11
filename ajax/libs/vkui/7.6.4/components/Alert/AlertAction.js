'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform.js";
import { Button } from "../Button/Button.js";
import { Tappable } from "../Tappable/Tappable.js";
const AlertActionIos = (_param)=>{
    var { mode } = _param, restProps = _object_without_properties(_param, [
        "mode"
    ]);
    return /*#__PURE__*/ _jsx(Tappable, _object_spread({
        Component: restProps.href ? 'a' : 'button',
        baseClassName: classNames("vkuiAlert__action", mode === 'destructive' && "vkuiAlert__actionModeDestructive", mode === 'cancel' && "vkuiAlert__actionModeCancel")
    }, restProps));
};
const AlertActionBase = (_param)=>{
    var { mode } = _param, restProps = _object_without_properties(_param, [
        "mode"
    ]);
    const platform = usePlatform();
    let buttonMode = 'tertiary';
    if (platform === 'vkcom') {
        buttonMode = mode === 'cancel' ? 'secondary' : 'primary';
    }
    return /*#__PURE__*/ _jsx(Button, _object_spread({
        className: classNames("vkuiAlert__button", mode === 'cancel' && "vkuiAlert__buttonModeCancel"),
        mode: buttonMode,
        size: "m"
    }, restProps));
};
export const AlertAction = (props)=>{
    const platform = usePlatform();
    if (platform === 'ios') {
        return /*#__PURE__*/ _jsx(AlertActionIos, _object_spread({}, props));
    }
    return /*#__PURE__*/ _jsx(AlertActionBase, _object_spread({}, props));
};

//# sourceMappingURL=AlertAction.js.map