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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
function usePrevious(value) {
    var ref = _react.useRef();
    _react.useEffect(function() {
        ref.current = value;
    });
    return ref.current;
}

//# sourceMappingURL=usePrevious.js.map