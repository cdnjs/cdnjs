"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useStableCallback", {
    enumerable: true,
    get: function() {
        return useStableCallback;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
function useStableCallback(fn) {
    const ref = _react.useRef(fn);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        ref.current = fn;
    });
    return _react.useRef((...args)=>(0, ref.current)(...args)).current;
}

//# sourceMappingURL=useStableCallback.js.map