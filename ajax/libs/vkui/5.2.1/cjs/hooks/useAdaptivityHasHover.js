"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAdaptivityHasHover = useAdaptivityHasHover;
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _AdaptivityContext = require("../components/AdaptivityProvider/AdaptivityContext");
var _useIsClient = require("./useIsClient");
function useAdaptivityHasHover() {
  var deferDetect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var _React$useContext = React.useContext(_AdaptivityContext.AdaptivityContext),
    hasHoverContext = _React$useContext.hasHover;
  var hasHover = hasHoverContext === undefined ? _vkjs.hasHover : hasHoverContext;
  var isClient = (0, _useIsClient.useIsClient)(!deferDetect);
  if (!isClient) {
    return undefined;
  }
  return hasHover;
}
//# sourceMappingURL=useAdaptivityHasHover.js.map