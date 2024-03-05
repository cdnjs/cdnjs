import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { getWindow } from '@vkontakte/vkui-floating-ui/utils/dom';
import { useExternRef } from '../../hooks/useExternRef';
import { usePatchChildren } from '../../hooks/usePatchChildren';
import { Keys, pressedKey } from '../../lib/accessibility';
import { animationFadeClassNames } from '../../lib/cssAnimation';
import { getArrowCoordsByMiddlewareData, useFloatingMiddlewaresBootstrap, useFloatingWithInteractions, usePlacementChangeCallback } from '../../lib/floating';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { AppRootPortal } from '../AppRoot/AppRootPortal';
import { TooltipBase } from '../TooltipBase/TooltipBase';
import { Subhead } from '../Typography/Subhead/Subhead';
/**
 * @see https://vkcom.github.io/VKUI/#/Tooltip
 */ export const Tooltip = ({ // UseFloatingMiddlewaresBootstrapOptions
placement: placementProp = 'bottom', arrowPadding = 10, arrowHeight = 8, offsetByMainAxis = 8, offsetByCrossAxis = 0, hideWhenReferenceHidden, // useFloatingWithInteractions
defaultShown, shown: shownProp, onShownChange, hoverDelay = 150, // инверсированные св-ва для useFloatingWithInteractions
enableInteractive = false, disableArrow = false, disableCloseAfterClick = false, // Reference
children, // AppRootProps
usePortal, // TooltipBaseProps
id: idProp, getRootRef, text, header, appearance = 'neutral', style: styleProp, className, zIndex = 'var(--vkui--z_index_popout)', onPlacementChange, ...popperProps })=>{
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
        arrowHeight
    });
    const { shown, willBeHide, placement, refs, referenceProps, floatingProps, middlewareData, onEscapeKeyDown } = useFloatingWithInteractions({
        defaultShown,
        shown: shownProp,
        onShownChange,
        placement: strictPlacement,
        trigger: [
            'hover',
            'focus'
        ],
        hoverDelay,
        closeAfterClick: !disableCloseAfterClick,
        disableInteractive: !enableInteractive,
        middlewares
    });
    const tooltipRef = useExternRef(getRootRef, refs.setFloating);
    usePlacementChangeCallback(placement, onPlacementChange);
    let tooltip = null;
    if (shown) {
        referenceProps['aria-describedby'] = tooltipId;
        floatingProps.style.zIndex = zIndex;
        if (styleProp) {
            Object.assign(floatingProps.style, styleProp);
        }
        tooltip = /*#__PURE__*/ React.createElement(AppRootPortal, {
            usePortal: usePortal
        }, /*#__PURE__*/ React.createElement(TooltipBase, {
            ...popperProps,
            ...floatingProps,
            id: tooltipId,
            getRootRef: tooltipRef,
            appearance: appearance,
            arrowProps: disableArrow ? undefined : {
                placement,
                coords: getArrowCoordsByMiddlewareData(middlewareData),
                getRootRef: setArrowRef
            },
            text: /*#__PURE__*/ React.createElement(React.Fragment, null, hasReactNode(header) && /*#__PURE__*/ React.createElement(Subhead, {
                weight: "2"
            }, header), hasReactNode(text) && /*#__PURE__*/ React.createElement(Subhead, null, text)),
            className: classNames(willBeHide ? animationFadeClassNames.out : animationFadeClassNames.in, className)
        }));
    }
    const [childRef, child] = usePatchChildren(children, referenceProps, refs.setReference);
    useIsomorphicLayoutEffect(function handleGlobalKeyDownIfTooltipShown() {
        if (!onEscapeKeyDown || !shown) {
            return;
        }
        const handleKeyDown = (event)=>{
            if (pressedKey(event) === Keys.ESCAPE) {
                onEscapeKeyDown();
            }
        };
        const doc = getWindow(childRef.current).document;
        doc.addEventListener('keydown', handleKeyDown, {
            passive: true,
            capture: true
        });
        return ()=>{
            doc.removeEventListener('keydown', handleKeyDown, {
                capture: true
            });
        };
    }, [
        shown,
        childRef,
        onEscapeKeyDown
    ]);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, child, tooltip);
};

//# sourceMappingURL=Tooltip.js.map