import { useMemo } from 'react';
import { DragSourceMonitorImpl, SourceConnector } from '../../internals';
export function useDragSourceMonitor(manager) {
  var monitor = useMemo(function () {
    return new DragSourceMonitorImpl(manager);
  }, [manager]);
  var connector = useMemo(function () {
    return new SourceConnector(manager.getBackend());
  }, [manager]);
  return [monitor, connector];
}