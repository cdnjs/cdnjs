'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { hasReactNode } from "@vkontakte/vkjs";
import { mergeStyle } from "../../helpers/mergeStyle.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { usePatchChildren } from "../../hooks/usePatchChildren.js";
import { createPortal } from "../../lib/createPortal.js";
import { autoUpdateFloatingElement, convertFloatingDataToReactCSSProperties, useFloating, useFloatingMiddlewaresBootstrap, usePlacementChangeCallback } from "../../lib/floating/index.js";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect.js";
import { warnOnce } from "../../lib/warnOnce.js";
import { DEFAULT_ARROW_HEIGHT, DEFAULT_ARROW_PADDING } from "../FloatingArrow/DefaultIcon.js";
import { FocusTrap } from "../FocusTrap/FocusTrap.js";
import { useNavTransition } from "../NavTransitionContext/NavTransitionContext.js";
import { TOOLTIP_MAX_WIDTH, TooltipBase } from "../TooltipBase/TooltipBase.js";
import { onboardingTooltipContainerAttr } from "./OnboardingTooltipContainer.js";
const warn = warnOnce('OnboardingTooltip');
/**
 * @see https://vkui.io/components/onboarding-tooltip
 */ export const OnboardingTooltip = (_param)=>{
    var { 'id': idProp, children, 'shown': shownProp = true, arrowPadding = DEFAULT_ARROW_PADDING, arrowHeight = DEFAULT_ARROW_HEIGHT, offsetByMainAxis = 0, offsetByCrossAxis = 0, arrowOffset = 0, isStaticArrowOffset = false, onClose, 'placement': placementProp = 'bottom-start', maxWidth = TOOLTIP_MAX_WIDTH, 'style': styleProp, getRootRef, disableArrow = false, onPlacementChange, disableFlipMiddleware = false, disableShiftMiddleware = false, overlayLabel = 'Закрыть', title, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, restoreFocus, disableFocusTrap } = _param, restProps = _object_without_properties(_param, [
        'id',
        "children",
        'shown',
        "arrowPadding",
        "arrowHeight",
        "offsetByMainAxis",
        "offsetByCrossAxis",
        "arrowOffset",
        "isStaticArrowOffset",
        "onClose",
        'placement',
        "maxWidth",
        'style',
        "getRootRef",
        "disableArrow",
        "onPlacementChange",
        "disableFlipMiddleware",
        "disableShiftMiddleware",
        "overlayLabel",
        "title",
        'aria-label',
        'aria-labelledby',
        "restoreFocus",
        "disableFocusTrap"
    ]);
    const generatedId = React.useId();
    const tooltipId = idProp || generatedId;
    const { entering } = useNavTransition();
    const [arrowRef, setArrowRef] = React.useState(null);
    const [tooltipContainer, setTooltipContainer] = React.useState(null);
    const [positionStrategy, setPositionStrategy] = React.useState('absolute');
    const shown = shownProp && tooltipContainer && !entering;
    const { middlewares, strictPlacement } = useFloatingMiddlewaresBootstrap({
        placement: placementProp,
        offsetByMainAxis,
        offsetByCrossAxis,
        arrowRef,
        arrow: !disableArrow,
        arrowHeight,
        arrowPadding,
        disableFlipMiddleware,
        disableShiftMiddleware
    });
    const { x: floatingDataX, y: floatingDataY, refs, placement: resolvedPlacement, middlewareData: { arrow: arrowCoords } } = useFloating({
        strategy: positionStrategy,
        placement: strictPlacement,
        middleware: middlewares,
        whileElementsMounted: autoUpdateFloatingElement
    });
    const tooltipRef = useExternRef(getRootRef, refs.setFloating);
    const [childRef, child] = usePatchChildren(children, {
        'aria-describedby': shown ? tooltipId : undefined
    });
    usePlacementChangeCallback(placementProp, resolvedPlacement, onPlacementChange);
    const titleId = React.useId();
    if (process.env.NODE_ENV === 'development' && !title && !ariaLabel && !ariaLabelledBy) {
        warn('Если "title" не используется, то необходимо задать либо "aria-label", либо "aria-labelledby" (см. правило axe aria-dialog-name)');
    }
    let tooltip = null;
    if (shown) {
        const floatingStyle = convertFloatingDataToReactCSSProperties({
            strategy: positionStrategy,
            x: floatingDataX,
            y: floatingDataY
        });
        tooltip = createPortal(/*#__PURE__*/ _jsxs(FocusTrap, {
            role: "dialog",
            "aria-modal": "true",
            "aria-label": ariaLabel,
            "aria-labelledby": title ? titleId : ariaLabel ? undefined : ariaLabelledBy,
            onClose: onClose,
            disabled: disableFocusTrap,
            restoreFocus: restoreFocus,
            children: [
                /*#__PURE__*/ _jsx("button", {
                    "aria-label": overlayLabel,
                    className: "vkuiOnboardingTooltip__overlay",
                    onClickCapture: onClose
                }),
                /*#__PURE__*/ _jsx(TooltipBase, _object_spread_props(_object_spread({}, restProps), {
                    id: tooltipId,
                    title: title,
                    titleId: title ? titleId : undefined,
                    getRootRef: tooltipRef,
                    style: mergeStyle(floatingStyle, styleProp),
                    maxWidth: maxWidth,
                    arrowProps: disableArrow ? undefined : {
                        offset: arrowOffset,
                        isStaticOffset: isStaticArrowOffset,
                        coords: arrowCoords,
                        placement: resolvedPlacement,
                        getRootRef: setArrowRef
                    }
                }))
            ]
        }), tooltipContainer);
    }
    useIsomorphicLayoutEffect(function initialize() {
        const referenceEl = childRef.current;
        if (referenceEl) {
            setTooltipContainer(referenceEl.closest(`[${onboardingTooltipContainerAttr}]`));
            setPositionStrategy(referenceEl.style.position === 'fixed' ? 'fixed' : 'absolute');
            refs.setReference(referenceEl);
        }
    }, [
        childRef
    ]);
    if (process.env.NODE_ENV === 'development') {
        const multiChildren = React.Children.count(children) > 1;
        // Empty children is a noop
        const primitiveChild = hasReactNode(children) && typeof children !== 'object';
        (multiChildren || primitiveChild) && warn([
            'children должен быть одним React элементом, получено',
            multiChildren && 'несколько',
            primitiveChild && JSON.stringify(children)
        ].filter(Boolean).join(' '), 'error');
        if (refs.reference.current && !tooltipContainer) {
            throw new Error('Use TooltipContainer for Tooltip outside Panel (see docs)');
        }
    }
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            child,
            tooltip
        ]
    });
};

//# sourceMappingURL=OnboardingTooltip.js.map