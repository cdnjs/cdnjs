import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useBooleanState } from "../../../hooks/useBooleanState";
import { useExternRef } from "../../../hooks/useExternRef";
import { useFocusVisible } from "../../../hooks/useFocusVisible";
import { useFocusVisibleClassName } from "../../../hooks/useFocusVisibleClassName";
import { arrowMiddleware, convertFloatingDataToReactCSSProperties, flipMiddleware, offsetMiddleware, shiftMiddleware, useFloating } from "../../../lib/floating";
import { TooltipBase } from "../../TooltipBase/TooltipBase";
export var SliderThumb = function(_param) {
    var className = _param.className, getRootRef = _param.getRootRef, inputProps = _param.inputProps, withTooltip = _param.withTooltip, restProps = _object_without_properties(_param, [
        "className",
        "getRootRef",
        "inputProps",
        "withTooltip"
    ]);
    var _useFocusVisible = useFocusVisible(false), focusVisible = _useFocusVisible.focusVisible, onBlur = _useFocusVisible.onBlur, onFocus = _useFocusVisible.onFocus;
    var focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible: focusVisible,
        mode: "vkuiSliderThumb--focus-visible"
    });
    var _React_useState = _sliced_to_array(React.useState(null), 2), arrowRef = _React_useState[0], setArrowRef = _React_useState[1];
    var memoizedMiddlewares = React.useMemo(function() {
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
    var _useFloating = useFloating({
        placement: "top",
        middleware: memoizedMiddlewares
    }), floatingDataX = _useFloating.x, floatingDataY = _useFloating.y, resolvedPlacement = _useFloating.placement, refs = _useFloating.refs, floatingPositionStrategy = _useFloating.strategy, _useFloating_middlewareData = _useFloating.middlewareData, arrowCoords = _useFloating_middlewareData.arrow, updateTooltipPosition = _useFloating.update;
    var _useBooleanState = useBooleanState(false), isHovered = _useBooleanState.value, setHoveredTrue = _useBooleanState.setTrue, setHoveredFalse = _useBooleanState.setFalse;
    var handleRootRef = useExternRef(getRootRef, refs.setReference);
    var shouldShowTooltip = withTooltip && (focusVisible || isHovered);
    var inputValue = inputProps && inputProps.value;
    React.useEffect(function udpateTooltipPositionOnValueChange() {
        if (shouldShowTooltip && inputValue !== "undefined") {
            updateTooltipPosition();
        }
    }, [
        inputValue,
        updateTooltipPosition,
        shouldShowTooltip
    ]);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("span", _object_spread_props(_object_spread({}, restProps), {
        ref: handleRootRef,
        onMouseEnter: setHoveredTrue,
        onMouseLeave: setHoveredFalse,
        className: classNames("vkuiSliderThumb", focusVisibleClassNames, className)
    }), /*#__PURE__*/ React.createElement("input", _object_spread_props(_object_spread({}, inputProps), {
        type: "range",
        className: "vkuiSliderThumb__nativeInput",
        "aria-orientation": "horizontal",
        onBlur: onBlur,
        onFocus: onFocus
    }))), shouldShowTooltip && /*#__PURE__*/ React.createElement(TooltipBase, {
        appearance: "neutral",
        getRootRef: refs.setFloating,
        floatingStyle: convertFloatingDataToReactCSSProperties(floatingPositionStrategy, floatingDataX, floatingDataY),
        arrowCoords: arrowCoords,
        arrowPlacement: resolvedPlacement,
        getArrowRef: setArrowRef,
        text: inputValue
    }));
};

//# sourceMappingURL=SliderThumb.js.map