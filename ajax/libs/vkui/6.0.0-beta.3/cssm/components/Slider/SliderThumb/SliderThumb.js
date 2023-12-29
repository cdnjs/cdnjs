import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useBooleanState } from '../../../hooks/useBooleanState';
import { useExternRef } from '../../../hooks/useExternRef';
import { useFocusVisible } from '../../../hooks/useFocusVisible';
import { useFocusVisibleClassName } from '../../../hooks/useFocusVisibleClassName';
import { arrowMiddleware, convertFloatingDataToReactCSSProperties, flipMiddleware, offsetMiddleware, shiftMiddleware, useFloating } from '../../../lib/floating';
import { TooltipBase } from '../../TooltipBase/TooltipBase';
import styles from './SliderThumb.module.css';
export const SliderThumb = ({ className, getRootRef, inputProps, withTooltip, ...restProps })=>{
    const { focusVisible, onBlur, onFocus } = useFocusVisible(false);
    const focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible,
        mode: styles['SliderThumb--focus-visible']
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
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("span", {
        ...restProps,
        ref: handleRootRef,
        onMouseEnter: setHoveredTrue,
        onMouseLeave: setHoveredFalse,
        className: classNames(styles['SliderThumb'], focusVisibleClassNames, className)
    }, /*#__PURE__*/ React.createElement("input", {
        ...inputProps,
        type: "range",
        className: styles['SliderThumb__nativeInput'],
        "aria-orientation": "horizontal",
        onBlur: onBlur,
        onFocus: onFocus
    })), shouldShowTooltip && /*#__PURE__*/ React.createElement(TooltipBase, {
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