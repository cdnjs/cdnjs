"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useRegisteredDropTarget = useRegisteredDropTarget;
var _internals = require("../../internals");
var _useDragDropManager = require("../useDragDropManager");
var _useIsomorphicLayoutEffect = require("../useIsomorphicLayoutEffect");
var _useAccept = require("./useAccept");
var _useDropTarget = require("./useDropTarget");
function useRegisteredDropTarget(spec, monitor, connector) {
    const manager = (0, _useDragDropManager).useDragDropManager();
    const dropTarget = (0, _useDropTarget).useDropTarget(spec, monitor);
    const accept = (0, _useAccept).useAccept(spec);
    (0, _useIsomorphicLayoutEffect).useIsomorphicLayoutEffect(function registerDropTarget() {
        const [handlerId, unregister] = (0, _internals).registerTarget(accept, dropTarget, manager);
        monitor.receiveHandlerId(handlerId);
        connector.receiveHandlerId(handlerId);
        return unregister;
    }, [
        manager,
        monitor,
        dropTarget,
        connector,
        accept.map((a)=>a.toString()
        ).join('|'), 
    ]);
}

//# sourceMappingURL=useRegisteredDropTarget.js.map