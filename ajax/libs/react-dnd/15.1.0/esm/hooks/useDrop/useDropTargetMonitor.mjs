import { useMemo } from 'react';
import { DropTargetMonitorImpl } from '../../internals/index.mjs';
import { useDragDropManager } from '../useDragDropManager.mjs';
export function useDropTargetMonitor() {
    const manager = useDragDropManager();
    return useMemo(()=>new DropTargetMonitorImpl(manager)
    , [
        manager
    ]);
}

//# sourceMappingURL=useDropTargetMonitor.mjs.map