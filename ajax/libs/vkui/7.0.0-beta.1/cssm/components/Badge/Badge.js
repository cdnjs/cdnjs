import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import styles from "./Badge.module.css";
const stylesMode = {
    new: styles.modeNew,
    prominent: styles.modeProminent
};
/**
 * @see https://vkcom.github.io/VKUI/#/Badge
 *
 * TODO [>=7]: переименовать в Dot
 */ export const Badge = ({ mode = 'new', children, ...restProps })=>/*#__PURE__*/ _jsx(RootComponent, {
        Component: "span",
        baseClassName: classNames(styles.host, 'vkuiInternalBadge', stylesMode[mode]),
        ...restProps,
        children: children && /*#__PURE__*/ _jsx(VisuallyHidden, {
            children: children
        })
    });

//# sourceMappingURL=Badge.js.map