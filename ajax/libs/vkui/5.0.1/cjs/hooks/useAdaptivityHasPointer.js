"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAdaptivityHasPointer = useAdaptivityHasPointer;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _AdaptivityContext = require("../components/AdaptivityProvider/AdaptivityContext");
function useAdaptivityHasPointer() {
  var deferDetect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var _React$useContext = React.useContext(_AdaptivityContext.AdaptivityContext),
    hasPointerContext = _React$useContext.hasPointer;
  var _React$useState = React.useState(function () {
      return !deferDetect && hasPointerContext === undefined ? _vkjs.hasMouse : hasPointerContext;
    }),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    hasPointer = _React$useState2[0],
    setHasPointer = _React$useState2[1];
  React.useEffect(function () {
    setHasPointer(function (prevHasPointer) {
      var newHasHover = hasPointerContext === undefined ? _vkjs.hasMouse : hasPointerContext;
      return prevHasPointer === newHasHover ? prevHasPointer : newHasHover;
    });
  }, [hasPointerContext]);
  return hasPointer;
}
//# sourceMappingURL=useAdaptivityHasPointer.js.map