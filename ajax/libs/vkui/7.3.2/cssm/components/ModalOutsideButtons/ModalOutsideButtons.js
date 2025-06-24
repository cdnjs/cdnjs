import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { Flex } from "../Flex/Flex.js";
import styles from "./ModalOutsideButtons.module.css";
/**
 * @private
 */ export const ModalOutsideButtons = ({ className, children, ...restProps })=>{
    return /*#__PURE__*/ _jsx(Flex, {
        direction: "column",
        className: classNames(styles.host, className),
        ...restProps,
        children: children
    });
};

//# sourceMappingURL=ModalOutsideButtons.js.map