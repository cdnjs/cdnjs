import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { resolveSpacingSize } from "../../lib/spacings/sizes.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./Spacing.module.css";
export const CUSTOM_CSS_TOKEN_FOR_USER_GAP = '--vkui_internal--spacing_size';
/**
 * @see https://vkui.io/components/spacing
 */ export const Spacing = ({ size = 'm', ...restProps })=>{
    const [spacingSizeClassName, spacingSizeStyle] = resolveSpacingSize(CUSTOM_CSS_TOKEN_FOR_USER_GAP, size);
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        baseStyle: spacingSizeStyle,
        baseClassName: classNames(styles.host, spacingSizeClassName)
    });
};

//# sourceMappingURL=Spacing.js.map