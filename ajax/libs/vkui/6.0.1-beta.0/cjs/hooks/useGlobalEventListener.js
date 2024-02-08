"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useGlobalEventListener", {
    enumerable: true,
    get: function() {
        return useGlobalEventListener;
    }
});
const _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
const _useEventListener = require("./useEventListener");
function useGlobalEventListener(element, event, cb, options) {
    const listener = (0, _useEventListener.useEventListener)(event, cb, options);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
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