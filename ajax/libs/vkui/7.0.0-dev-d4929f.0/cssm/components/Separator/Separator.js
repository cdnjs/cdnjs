import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { spacingSizeClassNames } from "../../lib/spacings/sizes.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./Separator.module.css";
export const CUSTOM_CSS_TOKEN_FOR_USER_SIZE = '--vkui_internal--spacing_size';
const appearanceClassNames = {
    'primary': styles.appearancePrimary,
    'secondary': styles.appearanceSecondary,
    'primary-alpha': styles.appearancePrimaryAlpha
};
const directionClassNames = {
    horizontal: styles.directionHorizontal,
    vertical: styles.directionVertical
};
const alignClassNames = {
    start: styles.alignStart,
    end: styles.alignEnd
};
/**
 * @see https://vkcom.github.io/VKUI/#/Separator
 */ export const Separator = ({ padding = false, appearance = 'primary', direction = 'horizontal', align = 'center', style, size, ...restProps })=>/*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        baseClassName: classNames(padding && styles.padded, appearanceClassNames[appearance], typeof size === 'string' && spacingSizeClassNames[size], directionClassNames[direction], size !== undefined && styles.sized, align !== 'center' && alignClassNames[align]),
        style: {
            ...typeof size === 'number' && {
                [CUSTOM_CSS_TOKEN_FOR_USER_SIZE]: `${size}px`
            },
            ...style
        },
        children: /*#__PURE__*/ _jsx("hr", {
            className: styles.in
        })
    });

//# sourceMappingURL=Separator.js.map