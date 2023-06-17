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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var isRefObject = function(refObject) {
    return typeof refObject === "object" && refObject !== null && refObject.hasOwnProperty("current");
};

//# sourceMappingURL=isRefObject.js.map