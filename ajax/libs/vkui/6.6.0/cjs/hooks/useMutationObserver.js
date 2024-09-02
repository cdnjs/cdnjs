"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useMutationObserver", {
    enumerable: true,
    get: function() {
        return useMutationObserver;
    }
});
const _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
const _useStableCallback = require("./useStableCallback");
const useMutationObserver = (ref, callback)=>{
    const stableCallback = (0, _useStableCallback.useStableCallback)(callback);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
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