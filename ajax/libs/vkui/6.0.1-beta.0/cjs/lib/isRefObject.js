"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isRefObject", {
    enumerable: true,
    get: function() {
        return isRefObject;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const isRefObject = (refObject)=>{
    return typeof refObject === 'object' && refObject !== null && refObject.hasOwnProperty('current');
};

//# sourceMappingURL=isRefObject.js.map