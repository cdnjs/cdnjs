import { useMemo } from 'react';
import { DragSourceMonitorImpl } from '../../internals';
import { useDragDropManager } from '../useDragDropManager';
export function useDragSourceMonitor() {
  var manager = useDragDropManager();
  return useMemo(function () {
    return new DragSourceMonitorImpl(manager);
  }, [manager]);
}