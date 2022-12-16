"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useIsomorphicLayoutEffect = void 0;
var React = _interopRequireWildcard(require("react"));
var _dom = require("./dom");
var useIsomorphicLayoutEffect = _dom.canUseDOM ?
// eslint-disable-next-line no-restricted-properties
React.useLayoutEffect : React.useEffect;
exports.useIsomorphicLayoutEffect = useIsomorphicLayoutEffect;
//# sourceMappingURL=useIsomorphicLayoutEffect.js.map