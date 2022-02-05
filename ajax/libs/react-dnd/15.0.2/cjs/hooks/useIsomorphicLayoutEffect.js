"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useIsomorphicLayoutEffect = void 0;
var _react = require("react");
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? _react.useLayoutEffect : _react.useEffect;
exports.useIsomorphicLayoutEffect = useIsomorphicLayoutEffect;

//# sourceMappingURL=useIsomorphicLayoutEffect.js.map