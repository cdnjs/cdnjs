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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
function useIsClient() {
    var initial = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    var _React_useState = _slicedToArray(_react.useState(initial), 2), isClient = _React_useState[0], setIsClient = _React_useState[1];
    _react.useEffect(function() {
        setIsClient(true);
    }, []);
    return isClient;
}

//# sourceMappingURL=useIsClient.js.map