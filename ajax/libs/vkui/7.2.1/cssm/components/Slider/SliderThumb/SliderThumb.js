'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useBooleanState } from "../../../hooks/useBooleanState.js";
import { useExternRef } from "../../../hooks/useExternRef.js";
import { useFocusVisible } from "../../../hooks/useFocusVisible.js";
import { useFocusVisibleClassName } from "../../../hooks/useFocusVisibleClassName.js";
import { arrowMiddleware, convertFloatingDataToReactCSSProperties, flipMiddleware, offsetMiddleware, shiftMiddleware, useFloating } from "../../../lib/floating/index.js";
import { TooltipBase } from "../../TooltipBase/TooltipBase.js";
import styles from "./SliderThumb.module.css";
export const SliderThumb = ({ className, getRootRef, inputProps, withTooltip, isActive, ...restProps })=>{
    const { focusVisible, onBlur, onFocus } = useFocusVisible();
    const focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible,
        mode: styles.focusVisible
    });
    const [arrowRef, setArrowRef] = React.useState(null);
    const memoizedMiddlewares = React.useMemo(()=>{
        return [
            offsetMiddleware({
                crossAxis: 0,
                mainAxis: 15
            }),
            flipMiddleware(),
            shiftMiddleware({
                padding: 8
            }),
            arrowMiddleware({
                element: arrowRef
            })
        ];
    }, [
        arrowRef
    ]);
    const { x: floatingDataX, y: floatingDataY, placement: resolvedPlacement, refs, strategy: floatingPositionStrategy, middlewareData: { arrow: arrowCoords }, update: updateTooltipPosition } = useFloating({
        placement: 'top',
        middleware: memoizedMiddlewares
    });
    const { value: isHovered, setTrue: setHoveredTrue, setFalse: setHoveredFalse } = useBooleanState(false);
    const handleRootRef = useExternRef(getRootRef, refs.setReference);
    const shouldShowTooltip = withTooltip && (focusVisible || isHovered || isActive);
    const inputValue = inputProps && inputProps.value;
    React.useEffect(function udpateTooltipPositionOnValueChange() {
        if (shouldShowTooltip && inputValue !== 'undefined') {
            updateTooltipPosition();
        }
    }, [
        inputValue,
        updateTooltipPosition,
        shouldShowTooltip
    ]);
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            /*#__PURE__*/ _jsx("span", {
                ...restProps,
                ref: handleRootRef,
                onMouseEnter: setHoveredTrue,
                onMouseLeave: setHoveredFalse,
                className: classNames(styles.host, focusVisibleClassNames, isActive && styles.active, isHovered && styles.hover, className),
                children: /*#__PURE__*/ _jsx("input", {
                    ...inputProps,
                    type: "range",
                    className: styles.nativeInput,
                    "aria-orientation": "horizontal",
                    onBlur: onBlur,
                    onFocus: onFocus
                })
            }),
            shouldShowTooltip && /*#__PURE__*/ _jsx(TooltipBase, {
                appearance: "neutral",
                getRootRef: refs.setFloating,
                style: convertFloatingDataToReactCSSProperties({
                    strategy: floatingPositionStrategy,
                    x: floatingDataX,
                    y: floatingDataY
                }),
                arrowProps: {
                    coords: arrowCoords,
                    placement: resolvedPlacement,
                    getRootRef: setArrowRef
                },
                description: inputValue
            })
        ]
    });
};

//# sourceMappingURL=SliderThumb.js.map