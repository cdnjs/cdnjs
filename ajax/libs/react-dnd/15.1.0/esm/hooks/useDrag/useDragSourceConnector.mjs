import { useMemo } from 'react';
import { SourceConnector } from '../../internals/index.mjs';
import { useDragDropManager } from '../useDragDropManager.mjs';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect.mjs';
export function useDragSourceConnector(dragSourceOptions, dragPreviewOptions) {
    const manager = useDragDropManager();
    const connector = useMemo(()=>new SourceConnector(manager.getBackend())
    , [
        manager
    ]);
    useIsomorphicLayoutEffect(()=>{
        connector.dragSourceOptions = dragSourceOptions || null;
        connector.reconnect();
        return ()=>connector.disconnectDragSource()
        ;
    }, [
        connector,
        dragSourceOptions
    ]);
    useIsomorphicLayoutEffect(()=>{
        connector.dragPreviewOptions = dragPreviewOptions || null;
        connector.reconnect();
        return ()=>connector.disconnectDragPreview()
        ;
    }, [
        connector,
        dragPreviewOptions
    ]);
    return connector;
}

//# sourceMappingURL=useDragSourceConnector.mjs.map