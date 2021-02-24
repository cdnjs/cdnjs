import { useMemo } from 'react';
export function useAccept(spec) {
  var specAccept = spec.accept;
  return useMemo(function () {
    return Array.isArray(specAccept) ? specAccept : [specAccept];
  }, [specAccept]);
}