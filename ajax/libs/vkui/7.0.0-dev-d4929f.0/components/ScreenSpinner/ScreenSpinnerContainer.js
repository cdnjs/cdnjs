import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import { ScreenSpinnerContext } from "./context.js";
const stateClassNames = {
    cancelable: "ScreenSpinner__stateCancelable--L5vrE",
    done: "ScreenSpinner__stateDone--swi8C",
    error: "ScreenSpinner__stateError--jJJKF",
    custom: "ScreenSpinner__stateCustom---agfP"
};
const modeClassNames = {
    shadow: "ScreenSpinner__modeShadow--Fghx9",
    overlay: "ScreenSpinner__modeOverlay--IPwNW"
};
export const ScreenSpinnerContainer = (_param)=>{
    var { state = 'loading', mode = 'shadow', customIcon, label, children } = _param, restProps = _object_without_properties(_param, [
        "state",
        "mode",
        "customIcon",
        "label",
        "children"
    ]);
    return /*#__PURE__*/ _jsx(ScreenSpinnerContext.Provider, {
        value: {
            state,
            label,
            customIcon
        },
        children: /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({
            baseClassName: classNames("ScreenSpinner__host--3v-oJ", modeClassNames[mode], state !== 'loading' && stateClassNames[state], hasReactNode(label) && "ScreenSpinner__hasLabel--YxhjW")
        }, restProps), {
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: "ScreenSpinner__iconSlot--h-JN9",
                    children: children
                }),
                hasReactNode(label) && /*#__PURE__*/ _jsx(Footnote, {
                    className: "ScreenSpinner__label---D92b",
                    "aria-hidden": true,
                    children: label
                })
            ]
        }))
    });
};
ScreenSpinnerContainer.displayName = 'ScreenSpinnerContainer';

//# sourceMappingURL=ScreenSpinnerContainer.js.map