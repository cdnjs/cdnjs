"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "usePrevious", {
    enumerable: true,
    get: function() {
        return usePrevious;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
function usePrevious(value) {
    var ref = _react.useRef();
    _react.useEffect(function() {
        ref.current = value;
    });
    return ref.current;
}

//# sourceMappingURL=usePrevious.js.map