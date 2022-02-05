"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useConnectDropTarget = useConnectDropTarget;
var _react = require("react");
function useConnectDropTarget(connector) {
    return (0, _react).useMemo(()=>connector.hooks.dropTarget()
    , [
        connector
    ]);
}

//# sourceMappingURL=connectors.js.map