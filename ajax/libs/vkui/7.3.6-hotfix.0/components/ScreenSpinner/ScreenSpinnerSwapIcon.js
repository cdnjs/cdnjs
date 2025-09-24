'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable jsdoc/require-jsdoc */ import * as React from "react";
import { Icon24Cancel } from "@vkontakte/icons";
import { mergeCalls } from "../../lib/mergeCalls.js";
import { clickByKeyboardHandler } from "../../lib/utils.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Icon48CancelCircle } from "./Icon48CancelCircle.js";
import { Icon48DoneOutline } from "./Icon48DoneOutline.js";
import { ScreenSpinnerContext } from "./context.js";
const ScreenSpinnerCancelIcon = (_param)=>{
    var { onKeyDown, 'aria-label': ariaLabel = 'Отменить' } = _param, restProps = _object_without_properties(_param, [
        "onKeyDown",
        'aria-label'
    ]);
    const handlers = mergeCalls({
        onKeyDown: clickByKeyboardHandler
    }, {
        onKeyDown
    });
    let clickableProps = _object_spread_props(_object_spread({}, handlers), {
        'tabIndex': 0,
        'role': 'button',
        'aria-label': ariaLabel
    });
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({
        baseClassName: "vkuiScreenSpinner__icon"
    }, clickableProps, restProps), {
        children: /*#__PURE__*/ _jsx(Icon24Cancel, {})
    }));
};
export const ScreenSpinnerSwapIcon = (_param)=>{
    var { cancelLabel } = _param, restProps = _object_without_properties(_param, [
        "cancelLabel"
    ]);
    const { state, customIcon } = React.useContext(ScreenSpinnerContext);
    if (state === 'cancelable') {
        return /*#__PURE__*/ _jsx(ScreenSpinnerCancelIcon, _object_spread({
            "aria-label": cancelLabel
        }, restProps));
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
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({
        baseClassName: "vkuiScreenSpinner__icon"
    }, restProps), {
        children: getContent()
    }));
};

//# sourceMappingURL=ScreenSpinnerSwapIcon.js.map