import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
import { useGlobalEscKeyDown } from '../../hooks/useGlobalEscKeyDown';
import { usePatchChildren } from '../../hooks/usePatchChildren';
import { animationFadeClassNames } from '../../lib/animation';
import { getArrowCoordsByMiddlewareData, useFloatingMiddlewaresBootstrap, useFloatingWithInteractions, usePlacementChangeCallback } from '../../lib/floating';
import { AppRootPortal } from '../AppRoot/AppRootPortal';
import { TooltipBase } from '../TooltipBase/TooltipBase';
/**
 * @see https://vkcom.github.io/VKUI/#/Tooltip
 */ export const Tooltip = (_param)=>{
    var { // UseFloatingMiddlewaresBootstrapOptions
    placement: placementProp = 'bottom', arrowPadding = 10, arrowHeight = 8, offsetByMainAxis = 8, offsetByCrossAxis = 0, hideWhenReferenceHidden, disableFlipMiddleware = false, disableTriggerOnFocus = false, // useFloatingWithInteractions
    defaultShown, shown: shownProp, onShownChange, hoverDelay = 150, // инверсированные св-ва для useFloatingWithInteractions
    enableInteractive = false, disableArrow = false, disableCloseAfterClick = false, // Reference
    children, // AppRootProps
    usePortal, // TooltipBaseProps
    id: idProp, getRootRef, appearance = 'neutral', style: styleProp, className, zIndex = 'var(--vkui--z_index_popout)', closable, onPlacementChange } = _param, popperProps = _object_without_properties(_param, [
        "placement",
        "arrowPadding",
        "arrowHeight",
        "offsetByMainAxis",
        "offsetByCrossAxis",
        "hideWhenReferenceHidden",
        "disableFlipMiddleware",
        "disableTriggerOnFocus",
        "defaultShown",
        "shown",
        "onShownChange",
        "hoverDelay",
        "enableInteractive",
        "disableArrow",
        "disableCloseAfterClick",
        "children",
        "usePortal",
        "id",
        "getRootRef",
        "appearance",
        "style",
        "className",
        "zIndex",
        "closable",
        "onPlacementChange"
    ]);
    const generatedId = React.useId();
    const tooltipId = idProp || generatedId;
    const [arrowRef, setArrowRef] = React.useState(null);
    const { middlewares, strictPlacement } = useFloatingMiddlewaresBootstrap({
        placement: placementProp,
        offsetByMainAxis,
        offsetByCrossAxis,
        hideWhenReferenceHidden,
        arrow: !disableArrow,
        arrowRef,
        arrowPadding,
        arrowHeight,
        disableFlipMiddleware
    });
    const { shown, willBeHide, placement, refs, referenceProps, floatingProps, middlewareData, onClose, onEscapeKeyDown } = useFloatingWithInteractions({
        defaultShown,
        shown: shownProp,
        onShownChange,
        placement: strictPlacement,
        trigger: disableTriggerOnFocus ? 'hover' : [
            'hover',
            'focus'
        ],
        hoverDelay,
        closeAfterClick: !disableCloseAfterClick,
        disableInteractive: !enableInteractive,
        middlewares
    });
    const tooltipRef = useExternRef(getRootRef, refs.setFloating);
    usePlacementChangeCallback(placementProp, placement, onPlacementChange);
    let tooltip = null;
    if (shown) {
        tooltip = /*#__PURE__*/ _jsx(AppRootPortal, {
            usePortal: usePortal,
            children: /*#__PURE__*/ _jsx(TooltipBase, _object_spread_props(_object_spread({}, popperProps, floatingProps), {
                style: _object_spread(_object_spread_props(_object_spread({}, floatingProps.style), {
                    zIndex
                }), styleProp),
                id: tooltipId,
                getRootRef: tooltipRef,
                appearance: appearance,
                arrowProps: disableArrow ? undefined : {
                    placement,
                    coords: getArrowCoordsByMiddlewareData(middlewareData),
                    getRootRef: setArrowRef
                },
                className: classNames(willBeHide ? animationFadeClassNames.out : animationFadeClassNames.in, className),
                onCloseIconClick: closable ? onClose : undefined
            }))
        });
    }
    const [, child] = usePatchChildren(children, _object_spread({}, referenceProps, shown && {
        'aria-describedby': tooltipId
    }), refs.setReference);
    useGlobalEscKeyDown(shown, onEscapeKeyDown);
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            child,
            tooltip
        ]
    });
};

//# sourceMappingURL=Tooltip.js.map