'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Spinner } from "../Spinner/Spinner.js";
import { ScreenSpinnerContext } from "./context.js";
export const ScreenSpinnerLoader = (_param)=>{
    var { children } = _param, restProps = _object_without_properties(_param, [
        "children"
    ]);
    const { label } = React.useContext(ScreenSpinnerContext);
    const a11yText = children !== null && children !== void 0 ? children : label;
    return /*#__PURE__*/ _jsx(Spinner, _object_spread_props(_object_spread({
        className: classNames("vkuiScreenSpinner__spinner", !label && "vkuiScreenSpinner__spinnerTransition"),
        size: "xl",
        noColor: true
    }, restProps), {
        children: a11yText
    }));
};

//# sourceMappingURL=ScreenSpinnerLoader.js.map