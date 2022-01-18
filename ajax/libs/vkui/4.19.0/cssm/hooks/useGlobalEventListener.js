import { useIsomorphicLayoutEffect } from "../lib/useIsomorphicLayoutEffect";
import { useEventListener } from "./useEventListener";
export function useGlobalEventListener(element, event, cb, options) {
  var listener = useEventListener(event, cb, options);
  useIsomorphicLayoutEffect(function () {
    return cb ? listener.add(element) : listener.remove();
  }, [Boolean(cb)]);
}
//# sourceMappingURL=useGlobalEventListener.js.map