"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useAdaptivityHasHover", {
    enumerable: true,
    get: function() {
        return useAdaptivityHasHover;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _AdaptivityContext = require("../components/AdaptivityProvider/AdaptivityContext");
var _useIsClient = require("./useIsClient");
function useAdaptivityHasHover() {
    var deferDetect = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
    var _React_useContext = _react.useContext(_AdaptivityContext.AdaptivityContext), hasHoverContext = _React_useContext.hasHover;
    var hasHover = hasHoverContext === undefined ? _vkjs.hasHover : hasHoverContext;
    var needTwoPassRendering = deferDetect || hasHoverContext === undefined;
    var isClient = (0, _useIsClient.useIsClient)(!needTwoPassRendering);
    if (!isClient || hasHoverContext !== undefined) {
        return hasHoverContext;
    }
    return hasHover;
}

//# sourceMappingURL=useAdaptivityHasHover.js.map