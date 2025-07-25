import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./Card.module.css";
/**
 * @see https://vkui.io/components/card
 */ export const Card = ({ mode = 'tint', Component = 'li', ...restProps })=>{
    const withBorder = mode === 'outline' || mode === 'outline-tint';
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        Component: Component,
        baseClassName: classNames(styles.host, mode === 'outline' && styles.modeOutline, mode === 'shadow' && styles.modeShadow, mode === 'plain' && styles.modePlain, withBorder && styles.withBorder)
    });
};

//# sourceMappingURL=Card.js.map