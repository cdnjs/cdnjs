import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useBooleanState } from '../../../hooks/useBooleanState';
import { useExternRef } from '../../../hooks/useExternRef';
import { useFocusVisible } from '../../../hooks/useFocusVisible';
import { useFocusVisibleClassName } from '../../../hooks/useFocusVisibleClassName';
import { arrowMiddleware, convertFloatingDataToReactCSSProperties, flipMiddleware, offsetMiddleware, shiftMiddleware, useFloating } from '../../../lib/floating';
import { TooltipBase } from '../../TooltipBase/TooltipBase';
export const SliderThumb = (_param)=>{
    var { className, getRootRef, inputProps, withTooltip } = _param, restProps = _object_without_properties(_param, [
        "className",
        "getRootRef",
        "inputProps",
        "withTooltip"
    ]);
    const { focusVisible, onBlur, onFocus } = useFocusVisible(false);
    const focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible,
        mode: "vkuiSliderThumb--focus-visible"
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
    const shouldShowTooltip = withTooltip && (focusVisible || isHovered);
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
        style: convertFloatingDataToReactCSSProperties(floatingPositionStrategy, floatingDataX, floatingDataY),
        arrowProps: {
            coords: arrowCoords,
            placement: resolvedPlacement,
            getRootRef: setArrowRef
        },
        text: inputValue
    }));
};

//# sourceMappingURL=SliderThumb.js.map