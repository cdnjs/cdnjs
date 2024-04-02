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
function usePlacementChangeCallback(placement, onPlacementChange) {
    const prevPlacement = (0, _usePrevious.usePrevious)(placement);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        if (prevPlacement === undefined || !onPlacementChange) {
            return;
        }
        if (prevPlacement !== placement) {
            onPlacementChange(placement);
        }
    }, [
        prevPlacement,
        placement,
        onPlacementChange
    ]);
}

//# sourceMappingURL=usePlacementChangeCallback.js.map