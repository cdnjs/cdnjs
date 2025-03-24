import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { clamp } from "../../helpers/math.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
const stylesAppearance = {
    accent: "Progress__appearanceAccent--kPj7k",
    positive: "Progress__appearancePositive--woJT2",
    negative: "Progress__appearanceNegative--oOiKd"
};
function progressCustomHeightStyle(height) {
    return height ? {
        height,
        borderRadius: height / 2
    } : undefined;
}
const PROGRESS_MIN_VALUE = 0;
const PROGRESS_MAX_VALUE = 100;
/**
 * @see https://vkcom.github.io/VKUI/#/Progress
 */ export const Progress = (_param)=>{
    var { value = 0, appearance = 'accent', height, style } = _param, restProps = _object_without_properties(_param, [
        "value",
        "appearance",
        "height",
        "style"
    ]);
    const progress = clamp(value, PROGRESS_MIN_VALUE, PROGRESS_MAX_VALUE);
    const title = `${progress} / ${PROGRESS_MAX_VALUE}`;
    const styleHeight = progressCustomHeightStyle(height);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({
        "aria-valuenow": value,
        title: title,
        style: _object_spread({}, styleHeight, style)
    }, restProps), {
        role: "progressbar",
        "aria-valuemin": PROGRESS_MIN_VALUE,
        "aria-valuemax": PROGRESS_MAX_VALUE,
        baseClassName: classNames("Progress__host--uwrSD", stylesAppearance[appearance]),
        children: /*#__PURE__*/ _jsx("div", {
            className: "Progress__in--C-4WF",
            style: {
                width: `${progress}%`
            }
        })
    }));
};

//# sourceMappingURL=Progress.js.map