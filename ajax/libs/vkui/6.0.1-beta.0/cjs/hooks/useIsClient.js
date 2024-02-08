"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useIsClient", {
    enumerable: true,
    get: function() {
        return useIsClient;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
function useIsClient(initial = false) {
    const [isClient, setIsClient] = _react.useState(initial);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        setIsClient(true);
    }, []);
    return isClient;
}

//# sourceMappingURL=useIsClient.js.map