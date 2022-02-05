import { useMemo } from 'react';
import { DropTargetMonitorImpl } from '../../internals';
import { useDragDropManager } from '../useDragDropManager';
export function useDropTargetMonitor() {
    const manager = useDragDropManager();
    return useMemo(()=>new DropTargetMonitorImpl(manager)
    , [
        manager
    ]);
}

//# sourceMappingURL=useDropTargetMonitor.js.map