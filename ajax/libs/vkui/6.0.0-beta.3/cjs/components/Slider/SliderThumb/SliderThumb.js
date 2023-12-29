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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useBooleanState = require("../../../hooks/useBooleanState");
const _useExternRef = require("../../../hooks/useExternRef");
const _useFocusVisible = require("../../../hooks/useFocusVisible");
const _useFocusVisibleClassName = require("../../../hooks/useFocusVisibleClassName");
const _floating = require("../../../lib/floating");
const _TooltipBase = require("../../TooltipBase/TooltipBase");
const SliderThumb = (_param)=>{
    var { className, getRootRef, inputProps, withTooltip } = _param, restProps = _object_without_properties._(_param, [
        "className",
        "getRootRef",
        "inputProps",
        "withTooltip"
    ]);
    const { focusVisible, onBlur, onFocus } = (0, _useFocusVisible.useFocusVisible)(false);
    const focusVisibleClassNames = (0, _useFocusVisibleClassName.useFocusVisibleClassName)({
        focusVisible,
        mode: "vkuiSliderThumb--focus-visible"
    });
    const [arrowRef, setArrowRef] = _react.useState(null);
    const memoizedMiddlewares = _react.useMemo(()=>{
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
    const { x: floatingDataX, y: floatingDataY, placement: resolvedPlacement, refs, strategy: floatingPositionStrategy, middlewareData: { arrow: arrowCoords }, update: updateTooltipPosition } = (0, _floating.useFloating)({
        placement: 'top',
        middleware: memoizedMiddlewares
    });
    const { value: isHovered, setTrue: setHoveredTrue, setFalse: setHoveredFalse } = (0, _useBooleanState.useBooleanState)(false);
    const handleRootRef = (0, _useExternRef.useExternRef)(getRootRef, refs.setReference);
    const shouldShowTooltip = withTooltip && (focusVisible || isHovered);
    const inputValue = inputProps && inputProps.value;
    _react.useEffect(function udpateTooltipPositionOnValueChange() {
        if (shouldShowTooltip && inputValue !== 'undefined') {
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
        style: (0, _floating.convertFloatingDataToReactCSSProperties)(floatingPositionStrategy, floatingDataX, floatingDataY),
        arrowProps: {
            coords: arrowCoords,
            placement: resolvedPlacement,
            getRootRef: setArrowRef
        },
        text: inputValue
    }));
};

//# sourceMappingURL=SliderThumb.js.map