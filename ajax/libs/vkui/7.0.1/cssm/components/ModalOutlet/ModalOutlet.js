import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import styles from "./ModalOutlet.module.css";
/**
 * @private
 */ export const ModalOutlet = ({ className, hidden, children, getRootRef, ...restProps })=>{
    return /*#__PURE__*/ _jsx("div", {
        ref: getRootRef,
        className: classNames(className, styles.host),
        hidden: hidden,
        "aria-hidden": hidden,
        ...restProps,
        children: children
    });
};

//# sourceMappingURL=ModalOutlet.js.map