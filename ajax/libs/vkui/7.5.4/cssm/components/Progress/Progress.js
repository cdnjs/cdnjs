import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { clamp } from "../../helpers/math.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./Progress.module.css";
const stylesAppearance = {
    accent: styles.appearanceAccent,
    positive: styles.appearancePositive,
    negative: styles.appearanceNegative
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
 * @see https://vkui.io/components/progress
 */ export const Progress = ({ value = 0, height, trackDisable = false, appearance = 'accent', ...restProps })=>{
    const progress = clamp(value, PROGRESS_MIN_VALUE, PROGRESS_MAX_VALUE);
    const title = `${progress} / ${PROGRESS_MAX_VALUE}`;
    const styleHeight = progressCustomHeightStyle(height);
    const [appearanceStyles, appearanceClassName] = resolveAppearance(appearance);
    const style = {
        ...styleHeight,
        ...appearanceStyles,
        '--vkui_internal_Progress_progress': progress
    };
    return /*#__PURE__*/ _jsx(RootComponent, {
        "aria-valuenow": value,
        title: title,
        ...restProps,
        role: "progressbar",
        "aria-valuemin": PROGRESS_MIN_VALUE,
        "aria-valuemax": PROGRESS_MAX_VALUE,
        baseClassName: classNames(styles.host, trackDisable && styles.trackDisable, appearanceClassName),
        baseStyle: style
    });
};

//# sourceMappingURL=Progress.js.map