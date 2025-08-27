import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import { ScreenSpinnerContext } from "./context.js";
const stateClassNames = {
    cancelable: "vkuiScreenSpinner__stateCancelable",
    done: "vkuiScreenSpinner__stateDone",
    error: "vkuiScreenSpinner__stateError",
    custom: "vkuiScreenSpinner__stateCustom"
};
const modeClassNames = {
    shadow: "vkuiScreenSpinner__modeShadow",
    overlay: "vkuiScreenSpinner__modeOverlay"
};
export const ScreenSpinnerContainer = (_param)=>{
    var { state = 'loading', mode = 'shadow', customIcon, label, children, visibilityDelay } = _param, restProps = _object_without_properties(_param, [
        "state",
        "mode",
        "customIcon",
        "label",
        "children",
        "visibilityDelay"
    ]);
    return /*#__PURE__*/ _jsx(ScreenSpinnerContext.Provider, {
        value: {
            state,
            label,
            customIcon
        },
        children: /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({
            baseClassName: classNames("vkuiScreenSpinner__host", modeClassNames[mode], state !== 'loading' && stateClassNames[state], hasReactNode(label) && "vkuiScreenSpinner__hasLabel", visibilityDelay && "vkuistyles__visibilityDelay")
        }, restProps), {
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: "vkuiScreenSpinner__iconSlot",
                    children: children
                }),
                hasReactNode(label) && /*#__PURE__*/ _jsx(Footnote, {
                    className: "vkuiScreenSpinner__label",
                    "aria-hidden": true,
                    children: label
                })
            ]
        }))
    });
};

//# sourceMappingURL=ScreenSpinnerContainer.js.map