import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform.js";
import { PopoutRoot } from "../PopoutRoot/PopoutRoot.js";
import styles from "./SplitLayout.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/SplitLayout
 */ export const SplitLayout = ({ popout, modal, header, children, getRootRef, getRef, className, center, ...restProps })=>{
    const platform = usePlatform();
    return /*#__PURE__*/ _jsxs(PopoutRoot, {
        className: classNames(styles.host, platform === 'ios' && styles.ios),
        popout: popout,
        modal: modal,
        getRootRef: getRootRef,
        children: [
            header,
            /*#__PURE__*/ _jsx("div", {
                ...restProps,
                ref: getRef,
                className: classNames(styles.inner, !!header && styles.innerHeader, center && styles.innerCenter, className),
                children: children
            })
        ]
    });
};

//# sourceMappingURL=SplitLayout.js.map