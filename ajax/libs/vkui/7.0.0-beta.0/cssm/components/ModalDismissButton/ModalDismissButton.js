import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon20Cancel } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { Tappable } from "../Tappable/Tappable.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import styles from "./ModalDismissButton.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/ModalDismissButton
 */ export const ModalDismissButton = ({ children = 'Закрыть', className, ...restProps })=>{
    return /*#__PURE__*/ _jsxs(Tappable, {
        className: classNames(styles.host, className),
        ...restProps,
        activeMode: styles.active,
        hoverMode: styles.hover,
        children: [
            children && /*#__PURE__*/ _jsx(VisuallyHidden, {
                children: children
            }),
            /*#__PURE__*/ _jsx(Icon20Cancel, {})
        ]
    });
};

//# sourceMappingURL=ModalDismissButton.js.map