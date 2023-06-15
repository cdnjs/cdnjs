"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useId = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var React = _interopRequireWildcard(require("react"));
// Workaround for https://github.com/webpack/webpack/issues/14814
// https://github.com/eps1lon/material-ui/blob/8d5f135b4d7a58253a99ab56dce4ac8de61f5dc1/packages/mui-utils/src/useId.ts#L21
var maybeReactUseId = React['useId'.toString()];
var id = 0;

// TODO: Remove after React 18
function useIncrementingCounterID() {
  var _React$useState = React.useState(function () {
      return id++;
    }),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 1),
    state = _React$useState2[0];
  return ":r".concat(state, ":");
}
var useId = maybeReactUseId !== null && maybeReactUseId !== void 0 ? maybeReactUseId : useIncrementingCounterID;
exports.useId = useId;
//# sourceMappingURL=useId.js.map