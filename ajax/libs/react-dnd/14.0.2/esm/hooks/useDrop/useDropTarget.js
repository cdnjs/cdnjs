import { useEffect, useMemo } from 'react';
import { DropTargetImpl } from './DropTargetImpl';
export function useDropTarget(spec, monitor) {
  var dropTarget = useMemo(function () {
    return new DropTargetImpl(spec, monitor);
  }, [monitor]);
  useEffect(function () {
    dropTarget.spec = spec;
  }, [spec]);
  return dropTarget;
}