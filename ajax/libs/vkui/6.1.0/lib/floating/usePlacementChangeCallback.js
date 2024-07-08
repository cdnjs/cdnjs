import { usePrevious } from '../../hooks/usePrevious';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
export function usePlacementChangeCallback(initialPlacement, resolvedPlacement, onPlacementChange) {
    const prevPlacement = usePrevious(resolvedPlacement);
    useIsomorphicLayoutEffect(()=>{
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