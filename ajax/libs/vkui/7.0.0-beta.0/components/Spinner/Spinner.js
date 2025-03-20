import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon16Spinner, Icon24Spinner, Icon32Spinner, Icon44Spinner } from "@vkontakte/icons";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useReducedMotion } from "../../lib/animation/index.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
/**
 * @see https://vkcom.github.io/VKUI/#/Spinner
 */ export const Spinner = /*#__PURE__*/ React.memo((_param)=>{
    var { size = 'm', children = 'Загружается...', disableAnimation = false, noColor = false } = _param, restProps = _object_without_properties(_param, [
        "size",
        "children",
        "disableAnimation",
        "noColor"
    ]);
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
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({
        Component: "span",
        role: "status"
    }, restProps), {
        baseClassName: classNames("vkuiSpinner__host", noColor && "vkuiSpinner__noColor"),
        children: [
            /*#__PURE__*/ _jsx(SpinnerIcon, {
                children: svgAnimateElement
            }),
            hasReactNode(children) && /*#__PURE__*/ _jsx(VisuallyHidden, {
                children: children
            })
        ]
    }));
});
Spinner.displayName = 'Spinner';

//# sourceMappingURL=Spinner.js.map