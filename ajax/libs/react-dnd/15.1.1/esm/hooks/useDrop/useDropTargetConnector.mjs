import { useMemo } from 'react';
import { TargetConnector } from '../../internals/index.mjs';
import { useDragDropManager } from '../useDragDropManager.mjs';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect.mjs';
export function useDropTargetConnector(options) {
    const manager = useDragDropManager();
    const connector = useMemo(()=>new TargetConnector(manager.getBackend())
    , [
        manager
    ]);
    useIsomorphicLayoutEffect(()=>{
        connector.dropTargetOptions = options || null;
        connector.reconnect();
        return ()=>connector.disconnectDropTarget()
        ;
    }, [
        options
    ]);
    return connector;
}

//# sourceMappingURL=useDropTargetConnector.mjs.map