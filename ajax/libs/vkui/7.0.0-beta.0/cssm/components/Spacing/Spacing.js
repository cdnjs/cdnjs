import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./Spacing.module.css";
export const CUSTOM_CSS_TOKEN_FOR_USER_GAP = '--vkui_internal--Spacing_gap';
export const sizesClassNames = {
    '2xs': styles.size2XS,
    'xs': styles.sizeXS,
    's': styles.sizeS,
    'm': styles.sizeM,
    'l': styles.sizeL,
    'xl': styles.sizeXL,
    '2xl': styles.size2XL,
    '3xl': styles.size3XL,
    '4xl': styles.size4XL
};
/**
 * @see https://vkcom.github.io/VKUI/#/Spacing
 */ export const Spacing = ({ size = 'm', style, ...restProps })=>{
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        style: {
            ...typeof size === 'number' && {
                [CUSTOM_CSS_TOKEN_FOR_USER_GAP]: `${size}px`
            },
            ...style
        },
        baseClassName: classNames(styles.host, typeof size === 'string' && sizesClassNames[size])
    });
};

//# sourceMappingURL=Spacing.js.map