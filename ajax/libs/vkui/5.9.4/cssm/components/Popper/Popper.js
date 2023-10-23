import * as React from 'react';
import { useExternRef } from '../../hooks/useExternRef';
import { arrowMiddleware, autoPlacementMiddleware, autoUpdateFloatingElement, checkIsNotAutoPlacement, convertFloatingDataToReactCSSProperties, flipMiddleware, getAutoPlacementAlign, hideMiddleware, offsetMiddleware, shiftMiddleware, sizeMiddleware, useFloating } from '../../lib/floating';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { AppRootPortal } from '../AppRoot/AppRootPortal';
import { DEFAULT_ARROW_HEIGHT, DEFAULT_ARROW_PADDING, DefaultIcon } from '../PopperArrow/DefaultIcon';
import { PopperArrow } from '../PopperArrow/PopperArrow';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './Popper.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Popper
 */ export const Popper = ({ targetRef, children, getRef, placement: placementProp = 'bottom-start', onPlacementChange, arrow, arrowHeight = DEFAULT_ARROW_HEIGHT, arrowPadding = DEFAULT_ARROW_PADDING, arrowClassName, ArrowIcon = DefaultIcon, sameWidth, offsetDistance = 8, offsetSkidding = 0, forcePortal = true, portalRoot, autoUpdateOnTargetResize = false, style: styleProp, customMiddlewares, renderContent, getRootRef, hideWhenReferenceHidden, ...restProps })=>{
    const [arrowRef, setArrowRef] = React.useState(null);
    const isNotAutoPlacement = checkIsNotAutoPlacement(placementProp);
    const memoizedMiddlewares = React.useMemo(()=>{
        const middlewares = [
            offsetMiddleware({
                crossAxis: offsetSkidding,
                mainAxis: arrow ? offsetDistance + arrowHeight : offsetDistance
            })
        ];
        // см. https://floating-ui.com/docs/flip#conflict-with-autoplacement
        if (isNotAutoPlacement) {
            middlewares.push(flipMiddleware());
        } else {
            middlewares.push(autoPlacementMiddleware({
                alignment: getAutoPlacementAlign(placementProp)
            }));
        }
        middlewares.push(shiftMiddleware());
        if (sameWidth) {
            middlewares.push(sizeMiddleware({
                apply ({ rects, elements }) {
                    Object.assign(elements.floating.style, {
                        width: `${rects.reference.width}px`
                    });
                }
            }));
        }
        if (customMiddlewares) {
            middlewares.push(...customMiddlewares);
        }
        // см. https://floating-ui.com/docs/arrow#order
        if (arrow) {
            middlewares.push(arrowMiddleware({
                element: arrowRef,
                padding: arrowPadding
            }));
        }
        if (hideWhenReferenceHidden) {
            middlewares.push(hideMiddleware());
        }
        return middlewares;
    }, [
        offsetSkidding,
        arrowRef,
        arrow,
        arrowHeight,
        arrowPadding,
        offsetDistance,
        isNotAutoPlacement,
        sameWidth,
        customMiddlewares,
        placementProp,
        hideWhenReferenceHidden
    ]);
    const { x: floatingDataX, y: floatingDataY, strategy: floatingPositionStrategy, placement: resolvedPlacement, refs, middlewareData: { arrow: arrowCoords, hide } } = useFloating({
        placement: isNotAutoPlacement ? placementProp : undefined,
        middleware: memoizedMiddlewares,
        whileElementsMounted (...args) {
            return autoUpdateFloatingElement(...args, {
                elementResize: autoUpdateOnTargetResize
            });
        }
    });
    // TODO [>=6]: убрать getRef
    const handleRootRef = useExternRef(refs.setFloating, getRef, getRootRef);
    useIsomorphicLayoutEffect(()=>{
        refs.setReference(targetRef.current);
    }, [
        refs,
        targetRef
    ]);
    useIsomorphicLayoutEffect(()=>{
        if (resolvedPlacement && onPlacementChange) {
            onPlacementChange({
                placement: resolvedPlacement
            });
        }
    }, [
        onPlacementChange,
        resolvedPlacement
    ]);
    const dropdown = /*#__PURE__*/ React.createElement(RootComponent, {
        ...restProps,
        baseClassName: styles['Popper'],
        getRootRef: handleRootRef,
        style: {
            ...styleProp,
            ...convertFloatingDataToReactCSSProperties(floatingPositionStrategy, floatingDataX, floatingDataY, sameWidth ? null : undefined),
            ...hide?.referenceHidden && {
                visibility: 'hidden'
            }
        }
    }, arrow && /*#__PURE__*/ React.createElement(PopperArrow, {
        coords: arrowCoords,
        placement: resolvedPlacement,
        arrowClassName: arrowClassName,
        getRootRef: setArrowRef,
        Icon: ArrowIcon
    }), renderContent ? renderContent({
        className: ''
    }) : children);
    return /*#__PURE__*/ React.createElement(AppRootPortal, {
        forcePortal: forcePortal,
        portalRoot: portalRoot
    }, dropdown);
};

//# sourceMappingURL=Popper.js.map