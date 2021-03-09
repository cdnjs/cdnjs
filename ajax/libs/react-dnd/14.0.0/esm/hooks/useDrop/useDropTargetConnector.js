import { useMemo } from 'react';
import { TargetConnector } from '../../internals';
import { useDragDropManager } from '../useDragDropManager';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
export function useDropTargetConnector(options) {
  var manager = useDragDropManager();
  var connector = useMemo(function () {
    return new TargetConnector(manager.getBackend());
  }, [manager]);
  useIsomorphicLayoutEffect(function () {
    connector.dropTargetOptions = options || null;
    connector.reconnect();
  }, [options]);
  return connector;
}