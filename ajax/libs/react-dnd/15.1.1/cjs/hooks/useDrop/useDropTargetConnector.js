"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useDropTargetConnector = useDropTargetConnector;
var _react = require("react");
var _indexJs = require("../../internals/index.js");
var _useDragDropManagerJs = require("../useDragDropManager.js");
var _useIsomorphicLayoutEffectJs = require("../useIsomorphicLayoutEffect.js");
function useDropTargetConnector(options) {
    const manager = (0, _useDragDropManagerJs).useDragDropManager();
    const connector = (0, _react).useMemo(()=>new _indexJs.TargetConnector(manager.getBackend())
    , [
        manager
    ]);
    (0, _useIsomorphicLayoutEffectJs).useIsomorphicLayoutEffect(()=>{
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