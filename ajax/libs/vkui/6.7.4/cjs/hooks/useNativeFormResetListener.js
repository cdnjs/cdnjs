"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useNativeFormResetListener", {
    enumerable: true,
    get: function() {
        return useNativeFormResetListener;
    }
});
const _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
const useNativeFormResetListener = (ref, handler)=>{
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        if (!ref.current) {
            return;
        }
        // eslint-disable-next-line no-restricted-properties
        const formEl = ref.current.closest('form');
        if (!formEl) {
            return;
        }
        formEl.addEventListener('reset', handler);
        return ()=>{
            formEl.removeEventListener('reset', handler);
        };
    }, [
        ref,
        handler
    ]);
};

//# sourceMappingURL=useNativeFormResetListener.js.map