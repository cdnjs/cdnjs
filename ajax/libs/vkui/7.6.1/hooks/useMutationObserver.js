import { useIsomorphicLayoutEffect } from "../lib/useIsomorphicLayoutEffect.js";
import { useStableCallback } from "./useStableCallback.js";
export const DEFAULT_MUTATION_OBSERVER_OPTIONS = {
    subtree: true,
    childList: true
};
export const useMutationObserver = (ref, callback, options = DEFAULT_MUTATION_OBSERVER_OPTIONS)=>{
    const stableCallback = useStableCallback(callback);
    useIsomorphicLayoutEffect(()=>{
        if (!ref || !ref.current) {
            return;
        }
        const observer = new MutationObserver(stableCallback);
        observer.observe(ref.current, options);
        return ()=>observer.disconnect();
    }, [
        ref,
        stableCallback
    ]);
};

//# sourceMappingURL=useMutationObserver.js.map