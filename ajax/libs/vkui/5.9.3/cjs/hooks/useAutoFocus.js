"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useAutoFocus", {
    enumerable: true,
    get: function() {
        return useAutoFocus;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
function useAutoFocus(ref, autoFocus) {
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        if (!autoFocus || !ref.current) {
            return;
        }
        ref.current.focus();
    }, []);
}

//# sourceMappingURL=useAutoFocus.js.map