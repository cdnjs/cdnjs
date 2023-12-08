import * as React from 'react';
import { arrowMiddleware, autoPlacementMiddleware, flipMiddleware, hideMiddleware, offsetMiddleware, shiftMiddleware, sizeMiddleware } from '../adapters';
import { checkIsNotAutoPlacement, getAutoPlacementAlign } from '../functions';
export const useFloatingMiddlewaresBootstrap = ({ placement = 'bottom-start', arrowRef = null, arrow, arrowHeight, arrowPadding, sameWidth, offsetByMainAxis = 0, offsetByCrossAxis = 0, customMiddlewares, hideWhenReferenceHidden })=>{
    return React.useMemo(()=>{
        const isNotAutoPlacement = checkIsNotAutoPlacement(placement);
        const middlewares = [
            offsetMiddleware({
                crossAxis: offsetByCrossAxis,
                mainAxis: arrow && arrowHeight ? offsetByMainAxis + arrowHeight : offsetByMainAxis
            })
        ];
        // см. https://floating-ui.com/docs/flip#conflict-with-autoplacement
        if (isNotAutoPlacement) {
            middlewares.push(flipMiddleware({
                fallbackAxisSideDirection: 'start'
            }));
        } else {
            middlewares.push(autoPlacementMiddleware({
                alignment: getAutoPlacementAlign(placement)
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
            strictPlacement: isNotAutoPlacement ? placement : undefined
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
        hideWhenReferenceHidden
    ]);
};

//# sourceMappingURL=index.js.map