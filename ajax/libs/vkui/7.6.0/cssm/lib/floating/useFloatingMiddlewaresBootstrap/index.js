import * as React from "react";
import { arrowMiddleware, autoPlacementMiddleware, flipMiddleware, hideMiddleware, offsetMiddleware, shiftMiddleware, sizeMiddleware } from "../adapters.js";
import { checkIsNotAutoPlacement, getAutoPlacementAlign } from "../functions.js";
export const useFloatingMiddlewaresBootstrap = ({ placement = 'bottom-start', arrowRef = null, arrow, arrowHeight, arrowPadding, sameWidth, offsetByMainAxis = 0, offsetByCrossAxis = 0, customMiddlewares, hideWhenReferenceHidden, disableFlipMiddleware = false, disableShiftMiddleware = false, flipMiddlewareFallbackAxisSideDirection = 'end' })=>{
    return React.useMemo(()=>{
        const isAutoPlacement = !checkIsNotAutoPlacement(placement);
        const middlewares = [
            offsetMiddleware({
                crossAxis: offsetByCrossAxis,
                mainAxis: arrow && arrowHeight ? offsetByMainAxis + arrowHeight : offsetByMainAxis
            })
        ];
        const shift = disableShiftMiddleware ? null : shiftMiddleware();
        // см. https://github.com/floating-ui/floating-ui/blob/%40floating-ui/core%401.7.1/website/pages/docs/flip.mdx#conflict-with-autoplacementjs
        if (isAutoPlacement) {
            middlewares.push(autoPlacementMiddleware({
                alignment: getAutoPlacementAlign(placement)
            }));
            if (shift) {
                middlewares.push(shift);
            }
        } else if (!disableFlipMiddleware) {
            const flip = flipMiddleware({
                crossAxis: 'alignment',
                fallbackAxisSideDirection: flipMiddlewareFallbackAxisSideDirection
            });
            // см. https://github.com/floating-ui/floating-ui/blob/%40floating-ui/core%401.7.1/website/pages/docs/flip.mdx#combining-with-shiftjs
            if (placement.includes('-')) {
                middlewares.push(flip);
                if (shift) {
                    middlewares.push(shift);
                }
            } else {
                if (shift) {
                    middlewares.push(shift);
                }
                middlewares.push(flip);
            }
        } else if (shift) {
            middlewares.push(shift);
        }
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
        // см. https://github.com/floating-ui/floating-ui/blob/%40floating-ui/core%401.7.1/website/pages/docs/arrow.mdx#order
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
        placement,
        offsetByCrossAxis,
        arrow,
        arrowHeight,
        offsetByMainAxis,
        disableFlipMiddleware,
        disableShiftMiddleware,
        flipMiddlewareFallbackAxisSideDirection,
        sameWidth,
        customMiddlewares,
        hideWhenReferenceHidden,
        arrowRef,
        arrowPadding
    ]);
};

//# sourceMappingURL=index.js.map