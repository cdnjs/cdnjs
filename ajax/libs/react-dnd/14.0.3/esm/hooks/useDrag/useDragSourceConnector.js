import { useMemo } from 'react';
import { SourceConnector } from '../../internals';
import { useDragDropManager } from '../useDragDropManager';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
export function useDragSourceConnector(dragSourceOptions, dragPreviewOptions) {
  var manager = useDragDropManager();
  var connector = useMemo(function () {
    return new SourceConnector(manager.getBackend());
  }, [manager]);
  useIsomorphicLayoutEffect(function () {
    connector.dragSourceOptions = dragSourceOptions || null;
    connector.reconnect();
    return function () {
      return connector.disconnectDragSource();
    };
  }, [connector, dragSourceOptions]);
  useIsomorphicLayoutEffect(function () {
    connector.dragPreviewOptions = dragPreviewOptions || null;
    connector.reconnect();
    return function () {
      return connector.disconnectDragPreview();
    };
  }, [connector, dragPreviewOptions]);
  return connector;
}