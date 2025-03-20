import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import { Footnote } from '../Typography/Footnote/Footnote';
import { ScreenSpinnerContext } from './context';
const stateClassNames = {
    cancelable: "vkuiScreenSpinner--state-cancelable",
    done: "vkuiScreenSpinner--state-done",
    error: "vkuiScreenSpinner--state-error"
};
const modeClassNames = {
    shadow: "vkuiScreenSpinner--mode-shadow",
    overlay: "vkuiScreenSpinner--mode-overlay"
};
export const ScreenSpinnerContainer = (_param)=>{
    var { state = 'loading', mode = 'shadow', caption, children } = _param, restProps = _object_without_properties(_param, [
        "state",
        "mode",
        "caption",
        "children"
    ]);
    return /*#__PURE__*/ _jsx(ScreenSpinnerContext.Provider, {
        value: {
            state,
            caption
        },
        children: /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({
            baseClassName: classNames("vkuiScreenSpinner", modeClassNames[mode], state !== 'loading' && stateClassNames[state], hasReactNode(caption) && "vkuiScreenSpinner--has-caption")
        }, restProps), {
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: "vkuiScreenSpinner__icon-slot",
                    children: children
                }),
                hasReactNode(caption) && /*#__PURE__*/ _jsx(Footnote, {
                    className: "vkuiScreenSpinner__caption",
                    "aria-hidden": true,
                    children: caption
                })
            ]
        }))
    });
};
ScreenSpinnerContainer.displayName = 'ScreenSpinnerContainer';

//# sourceMappingURL=ScreenSpinnerContainer.js.map