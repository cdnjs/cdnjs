"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAdaptivityHasHover = useAdaptivityHasHover;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _AdaptivityContext = require("../components/AdaptivityProvider/AdaptivityContext");
function useAdaptivityHasHover() {
  var deferDetect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var _React$useContext = React.useContext(_AdaptivityContext.AdaptivityContext),
    hasHoverContext = _React$useContext.hasHover;
  var _React$useState = React.useState(function () {
      return !deferDetect && hasHoverContext === undefined ? _vkjs.hasHover : hasHoverContext;
    }),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    hasHover = _React$useState2[0],
    setHasHover = _React$useState2[1];
  React.useEffect(function () {
    setHasHover(function (prevHasHover) {
      var newHasHover = hasHoverContext === undefined ? _vkjs.hasHover : hasHoverContext;
      return prevHasHover === newHasHover ? prevHasHover : newHasHover;
    });
  }, [hasHoverContext]);
  return hasHover;
}
//# sourceMappingURL=useAdaptivityHasHover.js.map