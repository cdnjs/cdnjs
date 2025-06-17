import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon16Spinner, Icon24Spinner, Icon32Spinner, Icon44Spinner } from "@vkontakte/icons";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import { SpinnerAnimation } from "./SpinnerAnimation.js";
const spinnerIconMap = {
    s: Icon16Spinner,
    m: Icon24Spinner,
    l: Icon32Spinner,
    xl: Icon44Spinner
};
/**
 * @see https://vkcom.github.io/VKUI/#/Spinner
 */ export const Spinner = /*#__PURE__*/ React.memo((_param)=>{
    var { size = 'm', children = 'Загружается...', disableAnimation = false, noColor = false } = _param, restProps = _object_without_properties(_param, [
        "size",
        "children",
        "disableAnimation",
        "noColor"
    ]);
    const SpinnerIcon = spinnerIconMap[size];
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({
        Component: "span",
        role: "status"
    }, restProps), {
        baseClassName: classNames("vkuiSpinner__host", noColor && "vkuiSpinner__noColor"),
        children: [
            /*#__PURE__*/ _jsx(SpinnerIcon, {
                children: disableAnimation ? null : /*#__PURE__*/ _jsx(SpinnerAnimation, {
                    size: size
                })
            }),
            hasReactNode(children) && /*#__PURE__*/ _jsx(VisuallyHidden, {
                children: children
            })
        ]
    }));
});
Spinner.displayName = 'Spinner';

//# sourceMappingURL=Spinner.js.map