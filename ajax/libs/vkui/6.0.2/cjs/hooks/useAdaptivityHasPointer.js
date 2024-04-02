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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _AdaptivityContext = require("../components/AdaptivityProvider/AdaptivityContext");
const _useIsClient = require("./useIsClient");
function useAdaptivityHasPointer(deferDetect = true) {
    const { hasPointer: hasPointerContext } = _react.useContext(_AdaptivityContext.AdaptivityContext);
    const needTwoPassRendering = deferDetect || hasPointerContext === undefined;
    const isClient = (0, _useIsClient.useIsClient)(!needTwoPassRendering);
    if (!isClient || hasPointerContext !== undefined) {
        return hasPointerContext;
    }
    return _vkjs.hasMouse;
}

//# sourceMappingURL=useAdaptivityHasPointer.js.map