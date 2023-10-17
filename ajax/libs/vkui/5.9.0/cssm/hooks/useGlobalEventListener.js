import { useIsomorphicLayoutEffect } from '../lib/useIsomorphicLayoutEffect';
import { useEventListener } from './useEventListener';
export function useGlobalEventListener(element, event, cb, options) {
    const listener = useEventListener(event, cb, options);
    useIsomorphicLayoutEffect(()=>{
        if (cb && element) {
            listener.add(element);
        } else {
            listener.remove();
        }
    }, [
        Boolean(cb),
        Boolean(element)
    ]);
}

//# sourceMappingURL=useGlobalEventListener.js.map