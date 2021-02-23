import { useMemo } from 'react';
import { DropTargetMonitorImpl, TargetConnector } from '../../internals';
export function useDropTargetMonitor(manager) {
  var monitor = useMemo(function () {
    return new DropTargetMonitorImpl(manager);
  }, [manager]);
  var connector = useMemo(function () {
    return new TargetConnector(manager.getBackend());
  }, [manager]);
  return [monitor, connector];
}