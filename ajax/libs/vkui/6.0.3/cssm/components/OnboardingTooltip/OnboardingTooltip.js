import * as React from 'react';
import { hasReactNode } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
import { usePatchChildren } from '../../hooks/usePatchChildren';
import { createPortal } from '../../lib/createPortal';
import { autoUpdateFloatingElement, convertFloatingDataToReactCSSProperties, useFloating, useFloatingMiddlewaresBootstrap, usePlacementChangeCallback } from '../../lib/floating';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { warnOnce } from '../../lib/warnOnce';
import { DEFAULT_ARROW_HEIGHT, DEFAULT_ARROW_PADDING } from '../FloatingArrow/DefaultIcon';
import { useNavTransition } from '../NavTransitionContext/NavTransitionContext';
import { TOOLTIP_MAX_WIDTH, TooltipBase } from '../TooltipBase/TooltipBase';
import { onboardingTooltipContainerAttr } from './OnboardingTooltipContainer';
import styles from './OnboardingTooltip.module.css';
const warn = warnOnce('OnboardingTooltip');
/**
 * @see https://vkcom.github.io/VKUI/#/Tooltip
 */ export const OnboardingTooltip = ({ id: idProp, children, shown: shownProp = true, arrowPadding = DEFAULT_ARROW_PADDING, arrowHeight = DEFAULT_ARROW_HEIGHT, offsetByMainAxis = 0, offsetByCrossAxis = 0, arrowOffset = 0, isStaticArrowOffset = false, onClose, placement: placementProp = 'bottom-start', maxWidth = TOOLTIP_MAX_WIDTH, style: styleProp, getRootRef, disableArrow = false, onPlacementChange, ...restProps })=>{
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
        arrowPadding
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
    usePlacementChangeCallback(resolvedPlacement, onPlacementChange);
    let tooltip = null;
    if (shown) {
        const floatingStyle = convertFloatingDataToReactCSSProperties(positionStrategy, floatingDataX, floatingDataY);
        if (styleProp) {
            Object.assign(floatingStyle, styleProp);
        }
        tooltip = createPortal(/*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(TooltipBase, {
            ...restProps,
            id: tooltipId,
            getRootRef: tooltipRef,
            style: floatingStyle,
            maxWidth: maxWidth,
            arrowProps: disableArrow ? undefined : {
                offset: arrowOffset,
                isStaticOffset: isStaticArrowOffset,
                coords: arrowCoords,
                placement: resolvedPlacement,
                getRootRef: setArrowRef
            }
        }), /*#__PURE__*/ React.createElement("div", {
            className: styles['OnboardingTooltip__overlay'],
            onClickCapture: onClose
        })), tooltipContainer);
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
    return /*#__PURE__*/ React.createElement(React.Fragment, null, child, tooltip);
};

//# sourceMappingURL=OnboardingTooltip.js.map