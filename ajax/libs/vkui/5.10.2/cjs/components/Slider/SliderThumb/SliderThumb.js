"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SliderThumb", {
    enumerable: true,
    get: function() {
        return SliderThumb;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useBooleanState = require("../../../hooks/useBooleanState");
var _useExternRef = require("../../../hooks/useExternRef");
var _useFocusVisible = require("../../../hooks/useFocusVisible");
var _useFocusVisibleClassName = require("../../../hooks/useFocusVisibleClassName");
var _floating = require("../../../lib/floating");
var _TooltipBase = require("../../TooltipBase/TooltipBase");
var SliderThumb = function(_param) {
    var className = _param.className, getRootRef = _param.getRootRef, inputProps = _param.inputProps, withTooltip = _param.withTooltip, restProps = _object_without_properties._(_param, [
        "className",
        "getRootRef",
        "inputProps",
        "withTooltip"
    ]);
    var _useFocusVisible1 = (0, _useFocusVisible.useFocusVisible)(false), focusVisible = _useFocusVisible1.focusVisible, onBlur = _useFocusVisible1.onBlur, onFocus = _useFocusVisible1.onFocus;
    var focusVisibleClassNames = (0, _useFocusVisibleClassName.useFocusVisibleClassName)({
        focusVisible: focusVisible,
        mode: "vkuiSliderThumb--focus-visible"
    });
    var _React_useState = _sliced_to_array._(_react.useState(null), 2), arrowRef = _React_useState[0], setArrowRef = _React_useState[1];
    var memoizedMiddlewares = _react.useMemo(function() {
        return [
            (0, _floating.offsetMiddleware)({
                crossAxis: 0,
                mainAxis: 15
            }),
            (0, _floating.flipMiddleware)(),
            (0, _floating.shiftMiddleware)({
                padding: 8
            }),
            (0, _floating.arrowMiddleware)({
                element: arrowRef
            })
        ];
    }, [
        arrowRef
    ]);
    var _useFloating = (0, _floating.useFloating)({
        placement: "top",
        middleware: memoizedMiddlewares
    }), floatingDataX = _useFloating.x, floatingDataY = _useFloating.y, resolvedPlacement = _useFloating.placement, refs = _useFloating.refs, floatingPositionStrategy = _useFloating.strategy, _useFloating_middlewareData = _useFloating.middlewareData, arrowCoords = _useFloating_middlewareData.arrow, updateTooltipPosition = _useFloating.update;
    var _useBooleanState1 = (0, _useBooleanState.useBooleanState)(false), isHovered = _useBooleanState1.value, setHoveredTrue = _useBooleanState1.setTrue, setHoveredFalse = _useBooleanState1.setFalse;
    var handleRootRef = (0, _useExternRef.useExternRef)(getRootRef, refs.setReference);
    var shouldShowTooltip = withTooltip && (focusVisible || isHovered);
    var inputValue = inputProps && inputProps.value;
    _react.useEffect(function udpateTooltipPositionOnValueChange() {
        if (shouldShowTooltip && inputValue !== "undefined") {
            updateTooltipPosition();
        }
    }, [
        inputValue,
        updateTooltipPosition,
        shouldShowTooltip
    ]);
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, /*#__PURE__*/ _react.createElement("span", _object_spread_props._(_object_spread._({}, restProps), {
        ref: handleRootRef,
        onMouseEnter: setHoveredTrue,
        onMouseLeave: setHoveredFalse,
        className: (0, _vkjs.classNames)("vkuiSliderThumb", focusVisibleClassNames, className)
    }), /*#__PURE__*/ _react.createElement("input", _object_spread_props._(_object_spread._({}, inputProps), {
        type: "range",
        className: "vkuiSliderThumb__nativeInput",
        "aria-orientation": "horizontal",
        onBlur: onBlur,
        onFocus: onFocus
    }))), shouldShowTooltip && /*#__PURE__*/ _react.createElement(_TooltipBase.TooltipBase, {
        appearance: "neutral",
        getRootRef: refs.setFloating,
        floatingStyle: (0, _floating.convertFloatingDataToReactCSSProperties)(floatingPositionStrategy, floatingDataX, floatingDataY),
        arrowCoords: arrowCoords,
        arrowPlacement: resolvedPlacement,
        getArrowRef: setArrowRef,
        text: inputValue
    }));
};

//# sourceMappingURL=SliderThumb.js.map