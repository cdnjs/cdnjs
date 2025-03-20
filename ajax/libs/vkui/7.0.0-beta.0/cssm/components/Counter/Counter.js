import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Caption } from "../Typography/Caption/Caption.js";
import { Headline } from "../Typography/Headline/Headline.js";
import styles from "./Counter.module.css";
const modeClassNames = {
    secondary: styles.modeSecondary,
    primary: styles.modePrimary,
    prominent: styles.modeProminent,
    contrast: styles.modeContrast,
    inherit: styles.modeInherit
};
const sizeClassNames = {
    s: styles.sizeS,
    m: styles.sizeM
};
/**
 * @see https://vkcom.github.io/VKUI/#/Counter
 */ export const Counter = ({ mode = 'inherit', size = 'm', children, className, ...restProps })=>{
    if (React.Children.count(children) === 0) {
        return null;
    }
    const CounterTypography = size === 's' ? Caption : Headline;
    const counterLevel = size === 's' ? '1' : '2';
    return /*#__PURE__*/ _jsx(CounterTypography, {
        ...restProps,
        Component: "span",
        className: classNames('vkuiInternalCounter', styles.host, modeClassNames[mode], sizeClassNames[size], className),
        level: counterLevel,
        children: children
    });
};

//# sourceMappingURL=Counter.js.map