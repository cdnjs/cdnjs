import { useIsomorphicLayoutEffect } from '../lib/useIsomorphicLayoutEffect';
import { useEventListener } from './useEventListener';
export function useGlobalEventListener(element, event, cb, options) {
  var listener = useEventListener(event, cb, options);
  useIsomorphicLayoutEffect(function () {
    if (cb && element) {
      listener.add(element);
    } else {
      listener.remove();
    }
  }, [Boolean(cb), Boolean(element)]);
}
//# sourceMappingURL=useGlobalEventListener.js.map