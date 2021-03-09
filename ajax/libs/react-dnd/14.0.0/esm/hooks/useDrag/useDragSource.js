import { useEffect, useMemo } from 'react';
import { DragSourceImpl } from './DragSourceImpl';
export function useDragSource(spec, monitor, connector) {
  var handler = useMemo(function () {
    return new DragSourceImpl(spec, monitor, connector);
  }, [monitor, connector]);
  useEffect(function () {
    handler.spec = spec;
  }, [spec]);
  return handler;
}