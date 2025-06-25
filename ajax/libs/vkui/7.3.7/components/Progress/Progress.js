import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { clamp } from "../../helpers/math.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
const stylesAppearance = {
    accent: "vkuiProgress__appearanceAccent",
    positive: "vkuiProgress__appearancePositive",
    negative: "vkuiProgress__appearanceNegative"
};
function progressCustomHeightStyle(height) {
    return height ? {
        height,
        borderRadius: height / 2
    } : undefined;
}
const PROGRESS_MIN_VALUE = 0;
const PROGRESS_MAX_VALUE = 100;
const resolveAppearance = (appearance)=>{
    switch(appearance){
        case 'accent':
        case 'positive':
        case 'negative':
            return [
                undefined,
                stylesAppearance[appearance]
            ];
        default:
            {
                return [
                    {
                        '--vkui_internal_Progress_background_color': appearance
                    },
                    undefined
                ];
            }
    }
};
/**
 * @see https://vkcom.github.io/VKUI/#/Progress
 */ export const Progress = (_param)=>{
    var { value = 0, height, trackDisable = false, appearance = 'accent' } = _param, restProps = _object_without_properties(_param, [
        "value",
        "height",
        "trackDisable",
        "appearance"
    ]);
    const progress = clamp(value, PROGRESS_MIN_VALUE, PROGRESS_MAX_VALUE);
    const title = `${progress} / ${PROGRESS_MAX_VALUE}`;
    const styleHeight = progressCustomHeightStyle(height);
    const [appearanceStyles, appearanceClassName] = resolveAppearance(appearance);
    const style = _object_spread_props(_object_spread({}, styleHeight, appearanceStyles), {
        '--vkui_internal_Progress_progress': progress
    });
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({
        "aria-valuenow": value,
        title: title
    }, restProps), {
        role: "progressbar",
        "aria-valuemin": PROGRESS_MIN_VALUE,
        "aria-valuemax": PROGRESS_MAX_VALUE,
        baseClassName: classNames("vkuiProgress__host", trackDisable && "vkuiProgress__trackDisable", appearanceClassName),
        baseStyle: style
    }));
};

//# sourceMappingURL=Progress.js.map