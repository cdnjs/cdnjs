"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useFloatingMiddlewaresBootstrap", {
    enumerable: true,
    get: function() {
        return useFloatingMiddlewaresBootstrap;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _adapters = require("../adapters");
const _functions = require("../functions");
const useFloatingMiddlewaresBootstrap = ({ placement = 'bottom-start', arrowRef = null, arrow, arrowHeight, arrowPadding, sameWidth, offsetByMainAxis = 0, offsetByCrossAxis = 0, customMiddlewares, hideWhenReferenceHidden })=>{
    return _react.useMemo(()=>{
        const isNotAutoPlacement = (0, _functions.checkIsNotAutoPlacement)(placement);
        const middlewares = [
            (0, _adapters.offsetMiddleware)({
                crossAxis: offsetByCrossAxis,
                mainAxis: arrow && arrowHeight ? offsetByMainAxis + arrowHeight : offsetByMainAxis
            })
        ];
        // см. https://floating-ui.com/docs/flip#conflict-with-autoplacement
        if (isNotAutoPlacement) {
            middlewares.push((0, _adapters.flipMiddleware)({
                fallbackAxisSideDirection: 'start'
            }));
        } else {
            middlewares.push((0, _adapters.autoPlacementMiddleware)({
                alignment: (0, _functions.getAutoPlacementAlign)(placement)
            }));
        }
        middlewares.push((0, _adapters.shiftMiddleware)());
        if (sameWidth) {
            middlewares.push((0, _adapters.sizeMiddleware)({
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
            middlewares.push((0, _adapters.arrowMiddleware)({
                element: arrowRef,
                padding: arrowPadding
            }));
        }
        if (hideWhenReferenceHidden) {
            middlewares.push((0, _adapters.hideMiddleware)());
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