"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useDropTargetConnector = useDropTargetConnector;
var _react = require("react");
var _internals = require("../../internals");
var _useDragDropManager = require("../useDragDropManager");
var _useIsomorphicLayoutEffect = require("../useIsomorphicLayoutEffect");
function useDropTargetConnector(options) {
    const manager = (0, _useDragDropManager).useDragDropManager();
    const connector = (0, _react).useMemo(()=>new _internals.TargetConnector(manager.getBackend())
    , [
        manager
    ]);
    (0, _useIsomorphicLayoutEffect).useIsomorphicLayoutEffect(()=>{
        connector.dropTargetOptions = options || null;
        connector.reconnect();
        return ()=>connector.disconnectDropTarget()
        ;
    }, [
        options
    ]);
    return connector;
}

//# sourceMappingURL=useDropTargetConnector.js.map