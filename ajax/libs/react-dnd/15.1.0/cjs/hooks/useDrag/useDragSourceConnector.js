"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useDragSourceConnector = useDragSourceConnector;
var _react = require("react");
var _indexJs = require("../../internals/index.js");
var _useDragDropManagerJs = require("../useDragDropManager.js");
var _useIsomorphicLayoutEffectJs = require("../useIsomorphicLayoutEffect.js");
function useDragSourceConnector(dragSourceOptions, dragPreviewOptions) {
    const manager = (0, _useDragDropManagerJs).useDragDropManager();
    const connector = (0, _react).useMemo(()=>new _indexJs.SourceConnector(manager.getBackend())
    , [
        manager
    ]);
    (0, _useIsomorphicLayoutEffectJs).useIsomorphicLayoutEffect(()=>{
        connector.dragSourceOptions = dragSourceOptions || null;
        connector.reconnect();
        return ()=>connector.disconnectDragSource()
        ;
    }, [
        connector,
        dragSourceOptions
    ]);
    (0, _useIsomorphicLayoutEffectJs).useIsomorphicLayoutEffect(()=>{
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