import * as React from "react";
import { useMemo } from "react";
import { useFloatingMiddlewaresBootstrap, useFloatingWithInteractions, usePlacementChangeCallback } from "../lib/floating/index.js";
import { useReferenceHiddenChangeCallback } from "../lib/floating/useReferenceHiddenChangeCallback.js";
import { useExternRef } from "./useExternRef.js";
import { useGlobalEscKeyDown } from "./useGlobalEscKeyDown.js";
export const useFloatingElement = ({ // useFloatingMiddlewaresBootstrap
placement = 'bottom-start', arrow, arrowHeight, arrowPadding, sameWidth, offsetByMainAxis = 0, offsetByCrossAxis = 0, customMiddlewares, hideWhenReferenceHidden, disableFlipMiddleware = false, disableShiftMiddleware = false, // useFloatingWithInteractions
trigger, hoverDelay, closeAfterClick, disabled, disableInteractive, disableCloseOnClickOutside, disableCloseOnEscKey, defaultShown, shown: shownProp, onShownChange, onShownChanged, strategy, onReferenceHiddenChange, onPlacementChange, renderFloatingComponent, externalFloatingElementRef, remapReferenceProps })=>{
    const [arrowRef, setArrowRef] = React.useState(null);
    const { middlewares, strictPlacement } = useFloatingMiddlewaresBootstrap({
        placement,
        offsetByMainAxis,
        offsetByCrossAxis,
        customMiddlewares,
        hideWhenReferenceHidden,
        sameWidth,
        arrow,
        arrowRef,
        arrowPadding,
        arrowHeight,
        disableFlipMiddleware,
        disableShiftMiddleware
    });
    const { placement: resolvedPlacement, shown, willBeHide, refs, referenceProps, floatingProps, middlewareData, onClose, onRestoreFocus, onEscapeKeyDown } = useFloatingWithInteractions({
        middlewares,
        strategy,
        placement: strictPlacement,
        trigger,
        hoverDelay,
        closeAfterClick,
        disabled,
        disableInteractive,
        disableCloseOnClickOutside,
        disableCloseOnEscKey,
        defaultShown,
        shown: shownProp,
        onShownChange,
        onShownChanged
    });
    const resultRef = useExternRef(externalFloatingElementRef, refs.setFloating);
    usePlacementChangeCallback(placement, resolvedPlacement, onPlacementChange);
    useReferenceHiddenChangeCallback(middlewareData.hide, onReferenceHiddenChange);
    const component = renderFloatingComponent({
        shown,
        willBeHide,
        floatingProps,
        floatingRef: resultRef,
        middlewareData,
        placement: resolvedPlacement,
        onClose,
        onRestoreFocus,
        setArrowRef
    });
    useGlobalEscKeyDown(shown, onEscapeKeyDown);
    const remappedReferenceProps = useMemo(()=>remapReferenceProps ? remapReferenceProps({
            ...referenceProps,
            shown
        }) : referenceProps, [
        remapReferenceProps,
        shown,
        referenceProps
    ]);
    return {
        anchorRef: refs.setReference,
        anchorProps: remappedReferenceProps,
        component
    };
};

//# sourceMappingURL=useFloatingElement.js.map