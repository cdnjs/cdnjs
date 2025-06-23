'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { useCallback } from "react";
import { classNames } from "@vkontakte/vkjs";
import { useFloatingElement } from "../../hooks/useFloatingElement.js";
import { animationFadeClassNames } from "../../lib/animation/index.js";
import { getArrowCoordsByMiddlewareData } from "../../lib/floating/index.js";
import { AppRootPortal } from "../AppRoot/AppRootPortal.js";
import { TooltipBase } from "../TooltipBase/TooltipBase.js";
export const useTooltip = ({ // UseFloatingMiddlewaresBootstrapOptions
placement: placementProp = 'bottom', arrowPadding = 10, arrowHeight = 8, offsetByMainAxis = 8, offsetByCrossAxis = 0, hideWhenReferenceHidden, disableFlipMiddleware = false, disableTriggerOnFocus = false, onReferenceHiddenChange, // useFloatingWithInteractions
defaultShown, shown: shownProp, onShownChange, hoverDelay = 150, strategy, // инверсированные св-ва для useFloatingWithInteractions
enableInteractive = false, disableArrow = false, disableCloseAfterClick = false, // AppRootProps
usePortal, // TooltipBaseProps
id: idProp, getRootRef, appearance = 'neutral', style: styleProp, className, zIndex = 'var(--vkui--z_index_popout)', closable, onPlacementChange, ...popperProps })=>{
    const generatedId = React.useId();
    const tooltipId = idProp || generatedId;
    const renderFloatingComponent = useCallback(({ shown, floatingProps, floatingRef, placement: resultPlacement, middlewareData, setArrowRef, willBeHide, onClose })=>{
        if (!shown) {
            return null;
        }
        return /*#__PURE__*/ _jsx(AppRootPortal, {
            usePortal: usePortal,
            children: /*#__PURE__*/ _jsx(TooltipBase, {
                ...popperProps,
                ...floatingProps,
                style: {
                    ...floatingProps.style,
                    zIndex,
                    ...styleProp
                },
                id: tooltipId,
                getRootRef: floatingRef,
                appearance: appearance,
                arrowProps: disableArrow ? undefined : {
                    placement: resultPlacement,
                    coords: getArrowCoordsByMiddlewareData(middlewareData),
                    getRootRef: setArrowRef
                },
                className: classNames(willBeHide ? animationFadeClassNames.out : animationFadeClassNames.in, className),
                onCloseIconClick: closable ? onClose : undefined
            })
        });
    }, [
        appearance,
        className,
        closable,
        disableArrow,
        popperProps,
        styleProp,
        tooltipId,
        usePortal,
        zIndex
    ]);
    const remapReferenceProps = useCallback(({ shown, ...referenceProps })=>({
            ...referenceProps,
            ...shown && {
                'aria-describedby': tooltipId
            }
        }), [
        tooltipId
    ]);
    const { component, anchorRef, anchorProps } = useFloatingElement({
        placement: placementProp,
        arrow: !disableArrow,
        arrowHeight,
        arrowPadding,
        offsetByMainAxis,
        offsetByCrossAxis,
        hideWhenReferenceHidden,
        disableFlipMiddleware,
        defaultShown,
        shown: shownProp,
        onShownChange,
        trigger: disableTriggerOnFocus ? 'hover' : [
            'hover',
            'focus'
        ],
        onReferenceHiddenChange,
        hoverDelay,
        closeAfterClick: !disableCloseAfterClick,
        disableInteractive: !enableInteractive,
        strategy,
        onPlacementChange,
        renderFloatingComponent,
        externalFloatingElementRef: getRootRef,
        remapReferenceProps
    });
    return {
        anchorRef,
        anchorProps,
        tooltip: component
    };
};

//# sourceMappingURL=useTooltip.js.map