import { useMemo } from 'react';
export function useConnectDragSource(connector) {
  return useMemo(function () {
    return connector.hooks.dragSource();
  }, [connector]);
}
export function useConnectDragPreview(connector) {
  return useMemo(function () {
    return connector.hooks.dragPreview();
  }, [connector]);
}