import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
import { arrowMiddleware, autoPlacementMiddleware, autoUpdateFloatingElement, checkIsNotAutoPlacement, convertFloatingDataToReactCSSProperties, flipMiddleware, getAutoPlacementAlign, offsetMiddleware, shiftMiddleware, sizeMiddleware, useFloating } from '../../lib/floating';
import { AppRootPortal } from '../AppRoot/AppRootPortal';
import { ARROW_HEIGHT, ARROW_PADDING, PopperArrow } from '../PopperArrow/PopperArrow';
import styles from './Popper.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Popper
 */ export const Popper = ({ targetRef , children , getRef , placement: placementProp = 'bottom-start' , onPlacementChange , arrow , arrowClassName , sameWidth , offsetDistance =8 , offsetSkidding =0 , forcePortal =true , autoUpdateOnTargetResize =false , style: styleProp , customMiddlewares , renderContent , className , ...restProps })=>{
    const arrowRef = React.useRef(null);
    const isNotAutoPlacement = checkIsNotAutoPlacement(placementProp);
    const memoizedMiddlewares = React.useMemo(()=>{
        const middlewares = [
            offsetMiddleware({
                crossAxis: offsetSkidding,
                mainAxis: arrow ? offsetDistance + ARROW_HEIGHT : offsetDistance
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
                apply ({ rects , elements  }) {
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
                padding: ARROW_PADDING
            }));
        }
        return middlewares;
    }, [
        arrow,
        sameWidth,
        offsetSkidding,
        offsetDistance,
        customMiddlewares,
        placementProp,
        isNotAutoPlacement
    ]);
    const { x: floatingDataX , y: floatingDataY , strategy: floatingPositionStrategy , placement: resolvedPlacement , refs , middlewareData: { arrow: arrowCoords  }  } = useFloating({
        placement: isNotAutoPlacement ? placementProp : undefined,
        middleware: memoizedMiddlewares,
        whileElementsMounted (...args) {
            return autoUpdateFloatingElement(...args, {
                elementResize: autoUpdateOnTargetResize
            });
        }
    });
    const handleRootRef = useExternRef(refs.setFloating, getRef);
    React.useEffect(()=>{
        refs.setReference(targetRef.current);
    }, [
        refs,
        targetRef
    ]);
    React.useEffect(()=>{
        if (resolvedPlacement && onPlacementChange) {
            onPlacementChange({
                placement: resolvedPlacement
            });
        }
    }, [
        onPlacementChange,
        resolvedPlacement
    ]);
    const dropdown = /*#__PURE__*/ React.createElement("div", {
        ...restProps,
        className: classNames(styles['Popper'], className),
        ref: handleRootRef,
        style: {
            ...styleProp,
            ...convertFloatingDataToReactCSSProperties(floatingPositionStrategy, floatingDataX, floatingDataY, sameWidth ? null : undefined)
        }
    }, arrow && /*#__PURE__*/ React.createElement(PopperArrow, {
        coords: arrowCoords,
        placement: resolvedPlacement,
        arrowClassName: arrowClassName,
        getRootRef: arrowRef
    }), renderContent ? renderContent({
        className: ''
    }) : children);
    return /*#__PURE__*/ React.createElement(AppRootPortal, {
        forcePortal: forcePortal
    }, dropdown);
};

//# sourceMappingURL=Popper.js.map