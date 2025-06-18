import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import { ScreenSpinnerContext } from "./context.js";
import styles from "./ScreenSpinner.module.css";
const stateClassNames = {
    cancelable: styles.stateCancelable,
    done: styles.stateDone,
    error: styles.stateError,
    custom: styles.stateCustom
};
const modeClassNames = {
    shadow: styles.modeShadow,
    overlay: styles.modeOverlay
};
export const ScreenSpinnerContainer = ({ state = 'loading', mode = 'shadow', customIcon, label, children, ...restProps })=>{
    return /*#__PURE__*/ _jsx(ScreenSpinnerContext.Provider, {
        value: {
            state,
            label,
            customIcon
        },
        children: /*#__PURE__*/ _jsxs(RootComponent, {
            baseClassName: classNames(styles.host, modeClassNames[mode], state !== 'loading' && stateClassNames[state], hasReactNode(label) && styles.hasLabel),
            ...restProps,
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: styles.iconSlot,
                    children: children
                }),
                hasReactNode(label) && /*#__PURE__*/ _jsx(Footnote, {
                    className: styles.label,
                    "aria-hidden": true,
                    children: label
                })
            ]
        })
    });
};
ScreenSpinnerContainer.displayName = 'ScreenSpinnerContainer';

//# sourceMappingURL=ScreenSpinnerContainer.js.map