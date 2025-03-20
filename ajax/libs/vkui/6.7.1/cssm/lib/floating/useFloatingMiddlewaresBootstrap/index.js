import * as React from 'react';
import { arrowMiddleware, autoPlacementMiddleware, flipMiddleware, hideMiddleware, offsetMiddleware, shiftMiddleware, sizeMiddleware } from '../adapters';
import { checkIsNotAutoPlacement, getAutoPlacementAlign } from '../functions';
export const useFloatingMiddlewaresBootstrap = ({ placement = 'bottom-start', arrowRef = null, arrow, arrowHeight, arrowPadding, sameWidth, offsetByMainAxis = 0, offsetByCrossAxis = 0, customMiddlewares, hideWhenReferenceHidden, disableFlipMiddleware = false })=>{
    return React.useMemo(()=>{
        const isAutoPlacement = !checkIsNotAutoPlacement(placement);
        const middlewares = [
            offsetMiddleware({
                crossAxis: offsetByCrossAxis,
                mainAxis: arrow && arrowHeight ? offsetByMainAxis + arrowHeight : offsetByMainAxis
            })
        ];
        // см. https://floating-ui.com/docs/flip#conflict-with-autoplacement
        if (isAutoPlacement) {
            middlewares.push(autoPlacementMiddleware({
                alignment: getAutoPlacementAlign(placement)
            }));
        } else if (!disableFlipMiddleware) {
            middlewares.push(flipMiddleware({
                fallbackAxisSideDirection: 'start'
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
        return {
            middlewares,
            strictPlacement: isAutoPlacement ? undefined : placement
        };
    }, [
        offsetByCrossAxis,
        arrowRef,
        arrow,
        arrowHeight,
        arrowPadding,
        offsetByMainAxis,
        sameWidth,
        customMiddlewares,
        placement,
        hideWhenReferenceHidden,
        disableFlipMiddleware
    ]);
};

//# sourceMappingURL=index.js.map