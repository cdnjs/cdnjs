import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon16Spinner, Icon24Spinner, Icon32Spinner, Icon44Spinner } from "@vkontakte/icons";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import { SpinnerAnimation } from "./SpinnerAnimation.js";
import styles from "./Spinner.module.css";
const spinnerIconMap = {
    s: Icon16Spinner,
    m: Icon24Spinner,
    l: Icon32Spinner,
    xl: Icon44Spinner
};
/**
 * @see https://vkcom.github.io/VKUI/#/Spinner
 */ export const Spinner = /*#__PURE__*/ React.memo(({ size = 'm', children = 'Загружается...', disableAnimation = false, noColor = false, ...restProps })=>{
    const SpinnerIcon = spinnerIconMap[size];
    return /*#__PURE__*/ _jsxs(RootComponent, {
        Component: "span",
        role: "status",
        ...restProps,
        baseClassName: classNames(styles.host, noColor && styles.noColor),
        children: [
            /*#__PURE__*/ _jsx(SpinnerIcon, {
                children: disableAnimation ? null : /*#__PURE__*/ _jsx(SpinnerAnimation, {
                    size: size
                })
            }),
            hasReactNode(children) && /*#__PURE__*/ _jsx(VisuallyHidden, {
                children: children
            })
        ]
    });
});
Spinner.displayName = 'Spinner';

//# sourceMappingURL=Spinner.js.map