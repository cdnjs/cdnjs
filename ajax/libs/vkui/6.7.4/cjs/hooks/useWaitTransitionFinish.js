"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useWaitTransitionFinish", {
    enumerable: true,
    get: function() {
        return useWaitTransitionFinish;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _dom = require("../lib/dom");
const useWaitTransitionFinish = ()=>{
    const timeoutRef = _react.useRef(null);
    const { document } = (0, _dom.useDOM)();
    const detach = _react.useRef(_vkjs.noop);
    const remove = _react.useCallback(()=>{
        detach.current();
        detach.current = _vkjs.noop;
    }, []);
    const waitTransitionFinish = _react.useCallback((element, eventHandler, durationFallback)=>{
        if (element) {
            if (!(document === null || document === void 0 ? void 0 : document.hidden)) {
                remove();
                element.addEventListener('transitionend', eventHandler);
                detach.current = ()=>{
                    element.removeEventListener('transitionend', eventHandler);
                };
            } else {
                if (timeoutRef === null || timeoutRef === void 0 ? void 0 : timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
                timeoutRef.current = setTimeout(eventHandler, durationFallback);
            }
        }
    }, [
        document,
        remove,
        timeoutRef
    ]);
    return waitTransitionFinish;
};

//# sourceMappingURL=useWaitTransitionFinish.js.map