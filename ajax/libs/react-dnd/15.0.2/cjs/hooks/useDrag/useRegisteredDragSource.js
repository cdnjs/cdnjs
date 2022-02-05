"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useRegisteredDragSource = useRegisteredDragSource;
var _internals = require("../../internals");
var _useIsomorphicLayoutEffect = require("../useIsomorphicLayoutEffect");
var _useDragSource = require("./useDragSource");
var _useDragDropManager = require("../useDragDropManager");
var _useDragType = require("./useDragType");
function useRegisteredDragSource(spec, monitor, connector) {
    const manager = (0, _useDragDropManager).useDragDropManager();
    const handler = (0, _useDragSource).useDragSource(spec, monitor, connector);
    const itemType = (0, _useDragType).useDragType(spec);
    (0, _useIsomorphicLayoutEffect).useIsomorphicLayoutEffect(function registerDragSource() {
        if (itemType != null) {
            const [handlerId, unregister] = (0, _internals).registerSource(itemType, handler, manager);
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