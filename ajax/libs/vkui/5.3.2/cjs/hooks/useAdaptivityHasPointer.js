"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useAdaptivityHasPointer", {
    enumerable: true,
    get: function() {
        return useAdaptivityHasPointer;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _adaptivityContext = require("../components/AdaptivityProvider/AdaptivityContext");
var _useIsClient = require("./useIsClient");
function useAdaptivityHasPointer() {
    var deferDetect = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
    var _React_useContext = _react.useContext(_adaptivityContext.AdaptivityContext), hasPointerContext = _React_useContext.hasPointer;
    var hasPointer = hasPointerContext === undefined ? _vkjs.hasMouse : hasPointerContext;
    var isClient = (0, _useIsClient.useIsClient)(!deferDetect);
    if (!isClient) {
        return undefined;
    }
    return hasPointer;
}

//# sourceMappingURL=useAdaptivityHasPointer.js.map