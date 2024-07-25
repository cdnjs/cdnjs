"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useAutoPlay", {
    enumerable: true,
    get: function() {
        return useAutoPlay;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _useStableCallback = require("../../hooks/useStableCallback");
const _dom = require("../../lib/dom");
function useAutoPlay(timeout, slideIndex, callbackFnProp) {
    const { document } = (0, _dom.useDOM)();
    const callbackFn = (0, _useStableCallback.useStableCallback)(callbackFnProp);
    _react.useEffect(function initializeAutoPlay() {
        if (!document || !timeout) {
            return;
        }
        let timeoutId = null;
        const stop = ()=>{
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        };
        const start = ()=>{
            switch(document.visibilityState){
                case 'visible':
                    stop();
                    timeoutId = setTimeout(callbackFn, timeout);
                    break;
                case 'hidden':
                    stop();
            }
        };
        start();
        document.addEventListener('visibilitychange', start);
        return ()=>{
            stop();
            document.removeEventListener('visibilitychange', start);
        };
    }, [
        document,
        timeout,
        slideIndex,
        callbackFn
    ]);
}

//# sourceMappingURL=hooks.js.map