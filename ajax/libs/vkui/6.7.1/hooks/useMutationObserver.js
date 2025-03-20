import { useIsomorphicLayoutEffect } from '../lib/useIsomorphicLayoutEffect';
import { useStableCallback } from './useStableCallback';
export const useMutationObserver = (ref, callback)=>{
    const stableCallback = useStableCallback(callback);
    useIsomorphicLayoutEffect(()=>{
        if (!ref || !ref.current) {
            return;
        }
        const observer = new MutationObserver(stableCallback);
        observer.observe(ref.current, {
            subtree: true,
            childList: true
        });
        return ()=>observer.disconnect();
    }, [
        ref,
        stableCallback
    ]);
};

//# sourceMappingURL=useMutationObserver.js.map