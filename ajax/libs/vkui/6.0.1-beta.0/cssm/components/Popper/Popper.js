import * as React from 'react';
import { useExternRef } from '../../hooks/useExternRef';
import { autoUpdateFloatingElement, convertFloatingDataToReactCSSProperties, useFloating, useFloatingMiddlewaresBootstrap, usePlacementChangeCallback } from '../../lib/floating';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { AppRootPortal } from '../AppRoot/AppRootPortal';
import { DEFAULT_ARROW_HEIGHT, DEFAULT_ARROW_PADDING, DefaultIcon } from '../FloatingArrow/DefaultIcon';
import { FloatingArrow } from '../FloatingArrow/FloatingArrow';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './Popper.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Popper
 */ export const Popper = ({ // UseFloatingMiddlewaresBootstrapProps
placement: placementProp = 'bottom-start', sameWidth, hideWhenReferenceHidden, offsetByMainAxis = 8, offsetByCrossAxis = 0, arrow, arrowHeight = DEFAULT_ARROW_HEIGHT, arrowPadding = DEFAULT_ARROW_PADDING, customMiddlewares, // UseFloatingProps
autoUpdateOnTargetResize = false, // ArrowProps
arrowProps, ArrowIcon = DefaultIcon, // rest
targetRef, getRootRef, children, usePortal = true, style: styleProp, onPlacementChange, ...restProps })=>{
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
        customMiddlewares
    });
    const { x: floatingDataX, y: floatingDataY, strategy: floatingPositionStrategy, placement: resolvedPlacement, refs, middlewareData } = useFloating({
        placement: strictPlacement,
        middleware: middlewares,
        whileElementsMounted (...args) {
            /* istanbul ignore next: не знаю как проверить */ return autoUpdateFloatingElement(...args, {
                elementResize: autoUpdateOnTargetResize
            });
        }
    });
    usePlacementChangeCallback(resolvedPlacement, onPlacementChange);
    const { arrow: arrowCoords } = middlewareData;
    const handleRootRef = useExternRef(refs.setFloating, getRootRef);
    useIsomorphicLayoutEffect(()=>{
        refs.setReference('current' in targetRef ? targetRef.current : targetRef);
    }, [
        refs.setReference,
        targetRef
    ]);
    const dropdown = /*#__PURE__*/ React.createElement(RootComponent, {
        ...restProps,
        baseClassName: styles['Popper'],
        getRootRef: handleRootRef,
        style: {
            ...styleProp,
            ...convertFloatingDataToReactCSSProperties(floatingPositionStrategy, floatingDataX, floatingDataY, sameWidth ? null : undefined, middlewareData)
        }
    }, arrow && /*#__PURE__*/ React.createElement(FloatingArrow, {
        ...arrowProps,
        coords: arrowCoords,
        placement: resolvedPlacement,
        getRootRef: setArrowRef,
        Icon: ArrowIcon
    }), children);
    return /*#__PURE__*/ React.createElement(AppRootPortal, {
        usePortal: usePortal
    }, dropdown);
};

//# sourceMappingURL=Popper.js.map