import { invariant } from '@react-dnd/invariant';
import { useMemo } from 'react';
export function useDragType(spec) {
  return useMemo(function () {
    var _ref, _spec$type, _spec$item;

    var result = (_ref = (_spec$type = spec.type) !== null && _spec$type !== void 0 ? _spec$type : (_spec$item = spec.item) === null || _spec$item === void 0 ? void 0 : _spec$item.type) !== null && _ref !== void 0 ? _ref : null;
    invariant(result != null, 'spec.type or spec.item.type must be defined');
    return result;
  }, [spec]);
}