"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useTimeout", {
    enumerable: true,
    get: function() {
        return useTimeout;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _dom = require("../lib/dom");
const _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
function useTimeout(cb, duration) {
    const options = _react.useRef({
        cb,
        duration
    });
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        options.current.cb = cb;
        options.current.duration = duration;
    }, [
        cb,
        duration
    ]);
    const timeout = _react.useRef();
    const clear = _react.useCallback(()=>{
        if (_dom.canUseDOM && (timeout === null || timeout === void 0 ? void 0 : timeout.current)) {
            clearTimeout(timeout.current);
        }
    }, []);
    const set = _react.useCallback((duration = options.current.duration)=>{
        clear();
        if (_dom.canUseDOM) {
            timeout.current = setTimeout(()=>{
                const { cb } = options.current;
                typeof cb === 'function' && cb();
            }, duration);
        }
    }, [
        clear
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>clear, []);
    return {
        set,
        clear
    };
}

//# sourceMappingURL=useTimeout.js.map