import { useMemo } from 'react';
import { DragSourceMonitorImpl } from '../../internals/index.mjs';
import { useDragDropManager } from '../useDragDropManager.mjs';
export function useDragSourceMonitor() {
    const manager = useDragDropManager();
    return useMemo(()=>new DragSourceMonitorImpl(manager)
    , [
        manager
    ]);
}

//# sourceMappingURL=useDragSourceMonitor.mjs.map