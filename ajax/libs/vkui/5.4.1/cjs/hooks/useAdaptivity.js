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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _adaptivityContext = require("../components/AdaptivityProvider/AdaptivityContext");
var useAdaptivity = function() {
    return _react.useContext(_adaptivityContext.AdaptivityContext);
};

//# sourceMappingURL=useAdaptivity.js.map