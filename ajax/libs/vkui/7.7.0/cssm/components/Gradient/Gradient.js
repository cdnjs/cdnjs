import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./Gradient.module.css";
const modeStyles = {
    overlay: styles.modeOverlay,
    tint: styles.modeTint
};
/**
 * @see https://vkui.io/components/gradient
 */ export const Gradient = ({ mode = 'default', to = 'top', ...restProps })=>{
    return /*#__PURE__*/ _jsx(RootComponent, {
        role: "presentation",
        ...restProps,
        baseClassName: classNames(styles.host, mode !== 'default' && modeStyles[mode], to === 'bottom' && styles.toBottom)
    });
};

//# sourceMappingURL=Gradient.js.map