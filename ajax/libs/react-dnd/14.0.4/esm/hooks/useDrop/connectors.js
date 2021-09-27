import { useMemo } from 'react';
export function useConnectDropTarget(connector) {
  return useMemo(function () {
    return connector.hooks.dropTarget();
  }, [connector]);
}