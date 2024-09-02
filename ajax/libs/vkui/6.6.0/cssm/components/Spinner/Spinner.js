import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Icon16Spinner, Icon24Spinner, Icon32Spinner, Icon44Spinner } from '@vkontakte/icons';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useReducedMotion } from '../../lib/animation';
import { RootComponent } from '../RootComponent/RootComponent';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './Spinner.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Spinner
 */ export const Spinner = /*#__PURE__*/ React.memo(({ size = 'regular', children = 'Загружается...', disableAnimation = false, noColor = false, ...restProps })=>{
    const isReducedMotion = useReducedMotion();
    const SpinnerIcon = {
        small: Icon16Spinner,
        regular: Icon24Spinner,
        medium: Icon32Spinner,
        large: Icon44Spinner
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
                small: 8,
                regular: 12,
                medium: 16,
                large: 22
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
        baseClassName: classNames(styles['Spinner'], noColor && styles['Spinner--no-color']),
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