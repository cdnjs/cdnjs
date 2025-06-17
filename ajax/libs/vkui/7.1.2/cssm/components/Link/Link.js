import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { Tappable } from "../Tappable/Tappable.js";
import styles from "./Link.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/Link
 */ export const Link = ({ before: beforeProp, after: afterProp, noUnderline, hasVisited, children, ...restProps })=>{
    const before = beforeProp ? /*#__PURE__*/ _jsx("span", {
        className: styles.before,
        children: beforeProp
    }) : null;
    const after = afterProp ? /*#__PURE__*/ _jsx("span", {
        className: styles.after,
        children: afterProp
    }) : null;
    return /*#__PURE__*/ _jsxs(Tappable, {
        Component: restProps.href ? 'a' : 'button',
        ...restProps,
        baseClassName: classNames(styles.host, hasVisited && styles.hasVisited, noUnderline ? undefined : styles.withUnderline),
        hasHover: false,
        activeMode: "opacity",
        hoverMode: "none",
        focusVisibleMode: "outside",
        children: [
            before,
            children,
            after
        ]
    });
};

//# sourceMappingURL=Link.js.map