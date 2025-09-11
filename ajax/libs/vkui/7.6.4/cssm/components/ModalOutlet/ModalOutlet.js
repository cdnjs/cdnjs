/* eslint-disable jsdoc/require-jsdoc */ import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import styles from "./ModalOutlet.module.css";
/**
 * @private
 */ export const ModalOutlet = ({ className, hidden, isDesktop, children, getRootRef, disableModalOverlay, ...restProps })=>{
    return /*#__PURE__*/ _jsx("div", {
        ref: getRootRef,
        className: classNames(className, styles.host, isDesktop && styles.hostDesktop, disableModalOverlay && styles.disableModalOverlay),
        hidden: hidden,
        "aria-hidden": hidden,
        ...restProps,
        children: children
    });
};

//# sourceMappingURL=ModalOutlet.js.map