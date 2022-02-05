import { useMemo } from 'react';
import { DragSourceMonitorImpl } from '../../internals';
import { useDragDropManager } from '../useDragDropManager';
export function useDragSourceMonitor() {
    const manager = useDragDropManager();
    return useMemo(() => new DragSourceMonitorImpl(manager), [manager]);
}
