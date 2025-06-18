import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import styles from "./InputLike.module.css";
export const InputLikeDivider = ({ children, className, ...props })=>{
    return /*#__PURE__*/ _jsx("span", {
        className: classNames(styles.divider, className),
        ...props,
        children: children
    });
};

//# sourceMappingURL=InputLikeDivider.js.map