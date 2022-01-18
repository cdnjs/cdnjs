import { useMemo } from 'react';
import { DropTargetMonitorImpl } from '../../internals';
import { useDragDropManager } from '../useDragDropManager';
export function useDropTargetMonitor() {
  var manager = useDragDropManager();
  return useMemo(function () {
    return new DropTargetMonitorImpl(manager);
  }, [manager]);
}