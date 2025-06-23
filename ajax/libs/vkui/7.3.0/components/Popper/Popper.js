'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { mergeStyle } from "../../helpers/mergeStyle.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { autoUpdateFloatingElement, convertFloatingDataToReactCSSProperties, useFloating, useFloatingMiddlewaresBootstrap, usePlacementChangeCallback } from "../../lib/floating/index.js";
import { useReferenceHiddenChangeCallback } from "../../lib/floating/useReferenceHiddenChangeCallback.js";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect.js";
import { AppRootPortal } from "../AppRoot/AppRootPortal.js";
import { DEFAULT_ARROW_HEIGHT, DEFAULT_ARROW_PADDING, DefaultIcon } from "../FloatingArrow/DefaultIcon.js";
import { FloatingArrow } from "../FloatingArrow/FloatingArrow.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
/**
 * @see https://vkcom.github.io/VKUI/#/Popper
 */ export const Popper = (_param)=>{
    var { // UseFloatingMiddlewaresBootstrapProps
    placement: placementProp = 'bottom-start', sameWidth, hideWhenReferenceHidden, offsetByMainAxis = 8, offsetByCrossAxis = 0, arrow, arrowHeight = DEFAULT_ARROW_HEIGHT, arrowPadding = DEFAULT_ARROW_PADDING, customMiddlewares, disableFlipMiddleware = false, flipMiddlewareFallbackAxisSideDirection, // UseFloatingProps
    autoUpdateOnTargetResize = false, strategy: strategyProp, // ArrowProps
    arrowProps, ArrowIcon = DefaultIcon, // rest
    targetRef, getRootRef, children, usePortal = true, onPlacementChange, onReferenceHiddenChange, zIndex, style } = _param, restProps = _object_without_properties(_param, [
        "placement",
        "sameWidth",
        "hideWhenReferenceHidden",
        "offsetByMainAxis",
        "offsetByCrossAxis",
        "arrow",
        "arrowHeight",
        "arrowPadding",
        "customMiddlewares",
        "disableFlipMiddleware",
        "flipMiddlewareFallbackAxisSideDirection",
        "autoUpdateOnTargetResize",
        "strategy",
        "arrowProps",
        "ArrowIcon",
        "targetRef",
        "getRootRef",
        "children",
        "usePortal",
        "onPlacementChange",
        "onReferenceHiddenChange",
        "zIndex",
        "style"
    ]);
    const [arrowRef, setArrowRef] = React.useState(null);
    const { strictPlacement, middlewares } = useFloatingMiddlewaresBootstrap({
        placement: placementProp,
        sameWidth,
        arrow,
        arrowRef,
        arrowHeight,
        arrowPadding,
        offsetByMainAxis,
        offsetByCrossAxis,
        hideWhenReferenceHidden,
        customMiddlewares,
        disableFlipMiddleware,
        flipMiddlewareFallbackAxisSideDirection
    });
    const { x: floatingDataX, y: floatingDataY, strategy: floatingPositionStrategy, placement: resolvedPlacement, refs, middlewareData } = useFloating({
        placement: strictPlacement,
        strategy: strategyProp,
        middleware: middlewares,
        whileElementsMounted (...args) {
            /* istanbul ignore next: не знаю как проверить */ return autoUpdateFloatingElement(...args, {
                elementResize: autoUpdateOnTargetResize
            });
        }
    });
    usePlacementChangeCallback(placementProp, resolvedPlacement, onPlacementChange);
    useReferenceHiddenChangeCallback(middlewareData.hide, onReferenceHiddenChange);
    const { arrow: arrowCoords } = middlewareData;
    const handleRootRef = useExternRef(refs.setFloating, getRootRef);
    useIsomorphicLayoutEffect(()=>{
        refs.setReference('current' in targetRef ? targetRef.current : targetRef);
    }, [
        refs.setReference,
        targetRef
    ]);
    const dropdownStyle = typeof zIndex !== 'undefined' ? {
        zIndex
    } : undefined;
    const dropdown = /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        style: mergeStyle(dropdownStyle, style),
        baseClassName: "vkuiPopper__host",
        getRootRef: handleRootRef,
        baseStyle: convertFloatingDataToReactCSSProperties({
            strategy: floatingPositionStrategy,
            x: floatingDataX,
            y: floatingDataY,
            initialWidth: sameWidth ? null : undefined,
            middlewareData
        }),
        children: [
            arrow && /*#__PURE__*/ _jsx(FloatingArrow, _object_spread_props(_object_spread({}, arrowProps), {
                coords: arrowCoords,
                placement: resolvedPlacement,
                getRootRef: setArrowRef,
                Icon: ArrowIcon
            })),
            children
        ]
    }));
    return /*#__PURE__*/ _jsx(AppRootPortal, {
        usePortal: usePortal,
        children: dropdown
    });
};

//# sourceMappingURL=Popper.js.map