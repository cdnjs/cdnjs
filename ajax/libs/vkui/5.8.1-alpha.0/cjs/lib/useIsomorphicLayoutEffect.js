"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useIsomorphicLayoutEffect", {
    enumerable: true,
    get: function() {
        return useIsomorphicLayoutEffect;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _dom = require("./dom");
var useIsomorphicLayoutEffect = _dom.canUseDOM ? _react.useLayoutEffect : _react.useEffect;

//# sourceMappingURL=useIsomorphicLayoutEffect.js.map