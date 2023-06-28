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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _dom = require("./dom");
var useIsomorphicLayoutEffect = _dom.canUseDOM ? _react.useLayoutEffect : _react.useEffect;

//# sourceMappingURL=useIsomorphicLayoutEffect.js.map