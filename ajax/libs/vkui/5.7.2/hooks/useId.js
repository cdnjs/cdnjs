import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
// Workaround for https://github.com/webpack/webpack/issues/14814
// https://github.com/eps1lon/material-ui/blob/8d5f135b4d7a58253a99ab56dce4ac8de61f5dc1/packages/mui-utils/src/useId.ts#L21
var maybeReactUseId = React["useId".toString()];
var id = 0;
// TODO [react@>=18]: Remove after React 18
function useIncrementingCounterID() {
    var _React_useState = _sliced_to_array(React.useState(function() {
        return id++;
    }), 1), state = _React_useState[0];
    return ":r".concat(state, ":");
}
export var useId = maybeReactUseId !== null && maybeReactUseId !== void 0 ? maybeReactUseId : useIncrementingCounterID;

//# sourceMappingURL=useId.js.map