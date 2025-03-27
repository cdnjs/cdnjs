import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import styles from "./Footer.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/Footer
 */ export const Footer = ({ children, className, Component = 'footer', role: roleProp, ...restProps })=>{
    const role = roleProp ?? (Component === 'footer' ? 'contentinfo' : undefined);
    return /*#__PURE__*/ _jsx(Footnote, {
        Component: Component,
        role: role,
        ...restProps,
        className: classNames(styles.host, className),
        children: children
    });
};

//# sourceMappingURL=Footer.js.map