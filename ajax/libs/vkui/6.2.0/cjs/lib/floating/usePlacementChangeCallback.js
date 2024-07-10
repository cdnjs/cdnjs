"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "usePlacementChangeCallback", {
    enumerable: true,
    get: function() {
        return usePlacementChangeCallback;
    }
});
const _usePrevious = require("../../hooks/usePrevious");
const _useIsomorphicLayoutEffect = require("../useIsomorphicLayoutEffect");
function usePlacementChangeCallback(initialPlacement, resolvedPlacement, onPlacementChange) {
    const prevPlacement = (0, _usePrevious.usePrevious)(resolvedPlacement);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        if (!onPlacementChange) {
            return;
        }
        const isInitialPlacementChanged = prevPlacement === undefined && initialPlacement !== resolvedPlacement;
        const isResolvedPlacementChanged = prevPlacement !== undefined && prevPlacement !== resolvedPlacement;
        if (isInitialPlacementChanged || isResolvedPlacementChanged) {
            onPlacementChange(resolvedPlacement);
        }
    }, [
        prevPlacement,
        initialPlacement,
        resolvedPlacement,
        onPlacementChange
    ]);
}

//# sourceMappingURL=usePlacementChangeCallback.js.map