"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useAdaptivity", {
    enumerable: true,
    get: function() {
        return useAdaptivity;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _AdaptivityContext = require("../components/AdaptivityProvider/AdaptivityContext");
var useAdaptivity = function() {
    return _react.useContext(_AdaptivityContext.AdaptivityContext);
};

//# sourceMappingURL=useAdaptivity.js.map