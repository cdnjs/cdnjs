'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { CustomScrollView } from "../CustomScrollView/CustomScrollView.js";
import styles from "./ModalPageContent.module.css";
export const ModalPageContent = ({ children, className, getRootRef, ...restProps })=>{
    return /*#__PURE__*/ _jsx(CustomScrollView, {
        className: classNames(className, styles.host),
        getRootRef: getRootRef,
        ...restProps,
        children: children
    });
};

//# sourceMappingURL=ModalPageContent.js.map