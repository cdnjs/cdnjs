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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _AdaptivityContext = require("../components/AdaptivityProvider/AdaptivityContext");
var _useIsClient = require("./useIsClient");
function useAdaptivityHasPointer() {
    var deferDetect = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
    var _React_useContext = _react.useContext(_AdaptivityContext.AdaptivityContext), hasPointerContext = _React_useContext.hasPointer;
    var needTwoPassRendering = deferDetect || hasPointerContext === undefined;
    var isClient = (0, _useIsClient.useIsClient)(!needTwoPassRendering);
    if (!isClient || hasPointerContext !== undefined) {
        return hasPointerContext;
    }
    return _vkjs.hasMouse;
}

//# sourceMappingURL=useAdaptivityHasPointer.js.map