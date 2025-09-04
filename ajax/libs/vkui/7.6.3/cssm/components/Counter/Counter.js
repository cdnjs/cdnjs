'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { mergeStyle } from "../../helpers/mergeStyle.js";
import { Caption } from "../Typography/Caption/Caption.js";
import { Headline } from "../Typography/Headline/Headline.js";
import styles from "./Counter.module.css";
const modeClassNames = {
    primary: styles.modePrimary,
    contrast: styles.modeContrast,
    tertiary: styles.modeTertiary,
    inherit: styles.modeInherit
};
const appearanceClassNames = {
    'custom': styles.appearanceCustom,
    'accent': styles.appearanceAccent,
    'neutral': styles.appearanceNeutral,
    'accent-green': styles.appearanceAccentGreen,
    'accent-red': styles.appearanceAccentRed
};
const sizeClassNames = {
    s: styles.sizeS,
    m: styles.sizeM
};
/**
 * @see https://vkui.io/components/counter
 */ export const Counter = ({ mode = 'inherit', appearance: appearanceProp, color, size = 'm', children, className, style: styleProp, ...restProps })=>{
    const appearance = React.useMemo(()=>{
        if (mode === 'inherit') {
            return undefined;
        }
        if (appearanceProp) {
            return appearanceProp;
        }
        return 'accent';
    }, [
        appearanceProp,
        mode
    ]);
    const style = React.useMemo(()=>{
        if (mode === 'inherit' || appearance !== 'custom' || !color) {
            return undefined;
        }
        switch(mode){
            case 'primary':
                return {
                    '--vkui_internal--counter_background': color
                };
            case 'contrast':
            case 'tertiary':
                return {
                    '--vkui_internal--counter_foreground': color
                };
        }
    }, [
        appearance,
        color,
        mode
    ]);
    if (React.Children.count(children) === 0) {
        return null;
    }
    const CounterTypography = size === 's' ? Caption : Headline;
    const counterLevel = size === 's' ? '1' : '2';
    return /*#__PURE__*/ _jsx(CounterTypography, {
        ...restProps,
        style: mergeStyle(style, styleProp),
        Component: "span",
        className: classNames('vkuiInternalCounter', styles.host, modeClassNames[mode], !!appearance && appearanceClassNames[appearance], sizeClassNames[size], className),
        level: counterLevel,
        children: children
    });
};

//# sourceMappingURL=Counter.js.map