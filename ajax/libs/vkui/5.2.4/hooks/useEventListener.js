import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import * as React from 'react';
import { noop } from '@vkontakte/vkjs';
import { canUseDOM } from '../lib/dom';
import { useIsomorphicLayoutEffect } from '../lib/useIsomorphicLayoutEffect';
export function useEventListener(event, _cb, _options) {
  var cbRef = React.useRef(_cb);
  useIsomorphicLayoutEffect(function () {
    cbRef.current = _cb;
  }, [_cb]);
  var cb = React.useCallback(function (e) {
    return cbRef.current && cbRef.current(e);
  }, []);
  var detach = React.useRef(noop);
  var remove = React.useCallback(function () {
    detach.current();
    detach.current = noop;
  }, []);
  var add = React.useCallback(function (el) {
    if (!canUseDOM) {
      return;
    }
    remove();
    if (!el) {
      return;
    }
    var options = _objectSpread({}, _options);
    el.addEventListener(event, cb, options);
    detach.current = function () {
      return el.removeEventListener(event, cb, options);
    };
  }, [_options, cb, event, remove]);
  React.useEffect(function () {
    return remove;
  }, [remove]);
  return React.useMemo(function () {
    return {
      add: add,
      remove: remove
    };
  }, [add, remove]);
}
//# sourceMappingURL=useEventListener.js.map