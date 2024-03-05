"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useGlobalOnClickOutside", {
    enumerable: true,
    get: function() {
        return useGlobalOnClickOutside;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _dom = require("../lib/dom");
const _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
const useGlobalOnClickOutside = (callback, ...refs)=>{
    const { document } = (0, _dom.useDOM)();
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        const someRefNotNull = refs.some((ref)=>ref && ref.current !== null);
        if (!document || !someRefNotNull) {
            return;
        }
        const handleClick = (event)=>{
            const targetEl = event.target;
            const someRefHasTargetEl = (0, _dom.isElement)(targetEl) && refs.some((ref)=>ref && ref.current && ref.current.contains(targetEl));
            if (!someRefHasTargetEl) {
                callback(event);
            }
        };
        document.addEventListener('click', handleClick, {
            passive: true,
            capture: true
        });
        return ()=>{
            document.removeEventListener('click', handleClick, true);
        };
    }, [
        document,
        callback,
        ...refs
    ]);
};

//# sourceMappingURL=useGlobalOnClickOutside.js.map