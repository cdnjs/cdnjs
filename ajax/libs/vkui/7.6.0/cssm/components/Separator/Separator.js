import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { resolveSpacingSize } from "../../lib/spacings/sizes.js";
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
 * @see https://vkui.io/components/separator
 */ export const Separator = ({ padding = false, appearance = 'primary', direction = 'horizontal', align = 'center', size, ...restProps })=>{
    const [spacingSizeClassName, spacingSizeStyle] = resolveSpacingSize(CUSTOM_CSS_TOKEN_FOR_USER_SIZE, size);
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        baseClassName: classNames(padding && styles.padded, appearanceClassNames[appearance], directionClassNames[direction], size !== undefined && styles.sized, align !== 'center' && alignClassNames[align], spacingSizeClassName),
        baseStyle: spacingSizeStyle,
        children: /*#__PURE__*/ _jsx("hr", {
            className: styles.in
        })
    });
};

//# sourceMappingURL=Separator.js.map