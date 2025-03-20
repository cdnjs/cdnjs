import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon16Spinner, Icon24Spinner, Icon32Spinner, Icon44Spinner } from "@vkontakte/icons";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useReducedMotion } from "../../lib/animation/index.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import styles from "./Spinner.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/Spinner
 */ export const Spinner = /*#__PURE__*/ React.memo(({ size = 'm', children = 'Загружается...', disableAnimation = false, noColor = false, ...restProps })=>{
    const isReducedMotion = useReducedMotion();
    const SpinnerIcon = {
        s: Icon16Spinner,
        m: Icon24Spinner,
        l: Icon32Spinner,
        xl: Icon44Spinner
    }[size];
    let svgAnimateElement = null;
    const [isReadyForSetSVGAnimateElement, setIsReadyForSetSVGAnimateElement] = React.useState(disableAnimation ? true : false);
    React.useEffect(function waitReactHydrationBeforeSetSVGAnimateElement() {
        setIsReadyForSetSVGAnimateElement(true);
    }, []);
    if (isReadyForSetSVGAnimateElement && !disableAnimation) {
        if (isReducedMotion) {
            svgAnimateElement = /*#__PURE__*/ _jsx("animate", {
                attributeName: "opacity",
                keyTimes: "0; 0.5; 1",
                values: "1; 0.1; 1",
                begin: "0s",
                dur: "2s",
                repeatCount: "indefinite"
            });
        } else {
            const center = {
                s: 8,
                m: 12,
                l: 16,
                xl: 22
            }[size];
            svgAnimateElement = /*#__PURE__*/ _jsx("animateTransform", {
                attributeType: "XML",
                attributeName: "transform",
                type: "rotate",
                from: `0 ${center} ${center}`,
                to: `360 ${center} ${center}`,
                dur: "0.7s",
                repeatCount: "indefinite"
            });
        }
    }
    return /*#__PURE__*/ _jsxs(RootComponent, {
        Component: "span",
        role: "status",
        ...restProps,
        baseClassName: classNames(styles.host, noColor && styles.noColor),
        children: [
            /*#__PURE__*/ _jsx(SpinnerIcon, {
                children: svgAnimateElement
            }),
            hasReactNode(children) && /*#__PURE__*/ _jsx(VisuallyHidden, {
                children: children
            })
        ]
    });
});
Spinner.displayName = 'Spinner';

//# sourceMappingURL=Spinner.js.map