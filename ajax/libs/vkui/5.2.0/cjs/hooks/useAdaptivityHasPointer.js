"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAdaptivityHasPointer = useAdaptivityHasPointer;
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _AdaptivityContext = require("../components/AdaptivityProvider/AdaptivityContext");
var _useIsClient = require("./useIsClient");
function useAdaptivityHasPointer() {
  var deferDetect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var _React$useContext = React.useContext(_AdaptivityContext.AdaptivityContext),
    hasPointerContext = _React$useContext.hasPointer;
  var hasPointer = hasPointerContext === undefined ? _vkjs.hasMouse : hasPointerContext;
  var isClient = (0, _useIsClient.useIsClient)(!deferDetect);
  if (!isClient) {
    return undefined;
  }
  return hasPointer;
}
//# sourceMappingURL=useAdaptivityHasPointer.js.map