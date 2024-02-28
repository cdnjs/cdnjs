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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
function useIsClient() {
    var initial = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    var _React_useState = _sliced_to_array._(_react.useState(initial), 2), isClient = _React_useState[0], setIsClient = _React_useState[1];
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        setIsClient(true);
    }, []);
    return isClient;
}

//# sourceMappingURL=useIsClient.js.map