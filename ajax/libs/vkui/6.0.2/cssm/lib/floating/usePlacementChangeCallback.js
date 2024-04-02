import { usePrevious } from '../../hooks/usePrevious';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
export function usePlacementChangeCallback(placement, onPlacementChange) {
    const prevPlacement = usePrevious(placement);
    useIsomorphicLayoutEffect(()=>{
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