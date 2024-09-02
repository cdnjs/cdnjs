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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _AdaptivityContext = require("../components/AdaptivityProvider/AdaptivityContext");
const useAdaptivity = ()=>{
    return _react.useContext(_AdaptivityContext.AdaptivityContext);
};

//# sourceMappingURL=useAdaptivity.js.map