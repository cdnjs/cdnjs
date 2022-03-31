import { useEffect, useMemo } from 'react';
import { DropTargetImpl } from './DropTargetImpl.mjs';
export function useDropTarget(spec, monitor) {
    const dropTarget = useMemo(()=>new DropTargetImpl(spec, monitor)
    , [
        monitor
    ]);
    useEffect(()=>{
        dropTarget.spec = spec;
    }, [
        spec
    ]);
    return dropTarget;
}

//# sourceMappingURL=useDropTarget.mjs.map