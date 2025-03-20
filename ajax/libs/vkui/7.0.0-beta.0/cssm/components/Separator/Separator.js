import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./Separator.module.css";
const appearanceClassNames = {
    'primary': styles.appearancePrimary,
    'secondary': styles.appearanceSecondary,
    'primary-alpha': styles.appearancePrimaryAlpha
};
/**
 * @see https://vkcom.github.io/VKUI/#/Separator
 */ export const Separator = ({ wide, appearance = 'primary', ...restProps })=>/*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        baseClassName: classNames(!wide && styles.padded, appearanceClassNames[appearance]),
        children: /*#__PURE__*/ _jsx("hr", {
            className: styles.in
        })
    });

//# sourceMappingURL=Separator.js.map