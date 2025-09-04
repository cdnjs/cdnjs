import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { defineComponentDisplayNames } from "../../lib/react/defineComponentDisplayNames.js";
import { animationVisibilityDelayStyles } from "../../styles/animationVisibilityDelay.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import { SpinnerAnimation } from "./SpinnerAnimation.js";
import { Icon16Spinner, Icon24Spinner, Icon32Spinner, Icon44Spinner } from "./icons.js";
import styles from "./Spinner.module.css";
import stylesDelay from "../../styles/animationVisibilityDelay.module.css";
const spinnerIconMap = {
    s: Icon16Spinner,
    m: Icon24Spinner,
    l: Icon32Spinner,
    xl: Icon44Spinner
};
/**
 * @see https://vkui.io/components/spinner
 */ // eslint-disable-next-line react/display-name -- используется defineComponentDisplayNames
export const Spinner = /*#__PURE__*/ React.memo(({ size = 'm', children = 'Загружается...', disableAnimation = false, noColor = false, visibilityDelay, ...restProps })=>{
    const SpinnerIcon = spinnerIconMap[size];
    return /*#__PURE__*/ _jsxs(RootComponent, {
        Component: "span",
        role: "status",
        ...restProps,
        baseClassName: classNames(styles.host, noColor && styles.noColor, visibilityDelay && stylesDelay.visibilityDelay),
        baseStyle: animationVisibilityDelayStyles(visibilityDelay),
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
if (process.env.NODE_ENV !== 'production') {
    defineComponentDisplayNames(Spinner, 'Spinner');
}

//# sourceMappingURL=Spinner.js.map