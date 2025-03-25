import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { spacingSizeClassNames } from "../../lib/spacings/sizes.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./Spacing.module.css";
export const CUSTOM_CSS_TOKEN_FOR_USER_GAP = '--vkui_internal--spacing_size';
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
        baseClassName: classNames(styles.host, typeof size === 'string' && spacingSizeClassNames[size])
    });
};

//# sourceMappingURL=Spacing.js.map