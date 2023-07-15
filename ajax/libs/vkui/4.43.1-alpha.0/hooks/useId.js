import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import * as React from "react";
var id = 0;

// TODO: Remove after React 18
function useIncrementingCounterID() {
  var _React$useState = React.useState(function () {
      return id++;
    }),
    _React$useState2 = _slicedToArray(_React$useState, 1),
    state = _React$useState2[0];
  return ":r".concat(state, ":");
}
export var useId = useIncrementingCounterID;
//# sourceMappingURL=useId.js.map