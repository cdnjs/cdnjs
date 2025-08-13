import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./Typography.module.css";
const stylesWeight = {
    '1': styles.weight1,
    '2': styles.weight2,
    '3': styles.weight3
};
export function weightClassNames(weight, useAccentWeight = false) {
    if (!weight) {
        return '';
    }
    return classNames(stylesWeight[weight], useAccentWeight && styles.accent);
}
export const Typography = ({ weight, useAccentWeight, Component = 'span', normalize, inline, ...restProps })=>/*#__PURE__*/ _jsx(RootComponent, {
        Component: Component,
        baseClassName: classNames(styles.host, normalize && styles.normalize, inline && styles.inline, weightClassNames(weight, useAccentWeight)),
        ...restProps
    });

//# sourceMappingURL=Typography.js.map