import * as React from "react";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect.js";
export function usePlacementChangeCallback(initialPlacement, resolvedPlacement, onPlacementChange) {
    const prevPlacementRef = React.useRef(undefined);
    React.useEffect(()=>{
        prevPlacementRef.current = resolvedPlacement;
    });
    useIsomorphicLayoutEffect(()=>{
        if (!onPlacementChange) {
            return;
        }
        const prevPlacement = prevPlacementRef.current;
        const isInitialPlacementChanged = prevPlacement === undefined && initialPlacement !== resolvedPlacement;
        const isResolvedPlacementChanged = prevPlacement !== undefined && prevPlacement !== resolvedPlacement;
        if (isInitialPlacementChanged || isResolvedPlacementChanged) {
            onPlacementChange(resolvedPlacement);
        }
    }, [
        initialPlacement,
        resolvedPlacement,
        onPlacementChange
    ]);
}

//# sourceMappingURL=usePlacementChangeCallback.js.map