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
/**
 * @see https://vkcom.github.io/VKUI/#/Progress
 */ export const Progress = ({ value = 0, appearance = 'accent', height, ...restProps })=>{
    const progress = clamp(value, PROGRESS_MIN_VALUE, PROGRESS_MAX_VALUE);
    const title = `${progress} / ${PROGRESS_MAX_VALUE}`;
    const styleHeight = progressCustomHeightStyle(height);
    return /*#__PURE__*/ _jsx(RootComponent, {
        "aria-valuenow": value,
        title: title,
        ...restProps,
        role: "progressbar",
        "aria-valuemin": PROGRESS_MIN_VALUE,
        "aria-valuemax": PROGRESS_MAX_VALUE,
        baseClassName: classNames(styles.host, stylesAppearance[appearance]),
        baseStyle: styleHeight,
        children: /*#__PURE__*/ _jsx("div", {
            className: styles.in,
            style: {
                width: `${progress}%`
            }
        })
    });
};

//# sourceMappingURL=Progress.js.map