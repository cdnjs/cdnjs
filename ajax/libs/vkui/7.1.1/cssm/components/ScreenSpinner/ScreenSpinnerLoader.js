'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Spinner } from "../Spinner/Spinner.js";
import { ScreenSpinnerContext } from "./context.js";
import styles from "./ScreenSpinner.module.css";
export const ScreenSpinnerLoader = ({ children, ...restProps })=>{
    const { label } = React.useContext(ScreenSpinnerContext);
    const a11yText = children ?? label;
    return /*#__PURE__*/ _jsx(Spinner, {
        className: classNames(styles.spinner, !label && styles.spinnerTransition),
        size: "xl",
        noColor: true,
        ...restProps,
        children: a11yText
    });
};
ScreenSpinnerLoader.displayName = 'ScreenSpinnerLoader';

//# sourceMappingURL=ScreenSpinnerLoader.js.map