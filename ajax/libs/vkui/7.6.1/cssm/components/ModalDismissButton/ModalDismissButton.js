import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon20Cancel } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { ModalOutsideButton } from "../ModalOutsideButton/ModalOutsideButton.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import styles from "./ModalDismissButton.module.css";
/**
 * @see https://vkui.io/components/modal-dismiss-button
 */ export const ModalDismissButton = ({ children = 'Закрыть', className, ...restProps })=>{
    return /*#__PURE__*/ _jsxs(ModalOutsideButton, {
        className: classNames(styles.host, className),
        ...restProps,
        children: [
            children && /*#__PURE__*/ _jsx(VisuallyHidden, {
                children: children
            }),
            /*#__PURE__*/ _jsx(Icon20Cancel, {})
        ]
    });
};

//# sourceMappingURL=ModalDismissButton.js.map