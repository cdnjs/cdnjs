"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useDragSourceConnector = useDragSourceConnector;
var _react = require("react");
var _internals = require("../../internals");
var _useDragDropManager = require("../useDragDropManager");
var _useIsomorphicLayoutEffect = require("../useIsomorphicLayoutEffect");
function useDragSourceConnector(dragSourceOptions, dragPreviewOptions) {
    const manager = (0, _useDragDropManager).useDragDropManager();
    const connector = (0, _react).useMemo(()=>new _internals.SourceConnector(manager.getBackend())
    , [
        manager
    ]);
    (0, _useIsomorphicLayoutEffect).useIsomorphicLayoutEffect(()=>{
        connector.dragSourceOptions = dragSourceOptions || null;
        connector.reconnect();
        return ()=>connector.disconnectDragSource()
        ;
    }, [
        connector,
        dragSourceOptions
    ]);
    (0, _useIsomorphicLayoutEffect).useIsomorphicLayoutEffect(()=>{
        connector.dragPreviewOptions = dragPreviewOptions || null;
        connector.reconnect();
        return ()=>connector.disconnectDragPreview()
        ;
    }, [
        connector,
        dragPreviewOptions
    ]);
    return connector;
}

//# sourceMappingURL=useDragSourceConnector.js.map