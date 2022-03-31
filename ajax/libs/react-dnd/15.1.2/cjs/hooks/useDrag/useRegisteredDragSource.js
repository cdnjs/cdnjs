"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useRegisteredDragSource = useRegisteredDragSource;
var _indexJs = require("../../internals/index.js");
var _useIsomorphicLayoutEffectJs = require("../useIsomorphicLayoutEffect.js");
var _useDragSourceJs = require("./useDragSource.js");
var _useDragDropManagerJs = require("../useDragDropManager.js");
var _useDragTypeJs = require("./useDragType.js");
function useRegisteredDragSource(spec, monitor, connector) {
    const manager = (0, _useDragDropManagerJs).useDragDropManager();
    const handler = (0, _useDragSourceJs).useDragSource(spec, monitor, connector);
    const itemType = (0, _useDragTypeJs).useDragType(spec);
    (0, _useIsomorphicLayoutEffectJs).useIsomorphicLayoutEffect(function registerDragSource() {
        if (itemType != null) {
            const [handlerId, unregister] = (0, _indexJs).registerSource(itemType, handler, manager);
            monitor.receiveHandlerId(handlerId);
            connector.receiveHandlerId(handlerId);
            return unregister;
        }
        return;
    }, [
        manager,
        monitor,
        connector,
        handler,
        itemType
    ]);
}

//# sourceMappingURL=useRegisteredDragSource.js.map