"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useRegisteredDropTarget = useRegisteredDropTarget;
var _indexJs = require("../../internals/index.js");
var _useDragDropManagerJs = require("../useDragDropManager.js");
var _useIsomorphicLayoutEffectJs = require("../useIsomorphicLayoutEffect.js");
var _useAcceptJs = require("./useAccept.js");
var _useDropTargetJs = require("./useDropTarget.js");
function useRegisteredDropTarget(spec, monitor, connector) {
    const manager = (0, _useDragDropManagerJs).useDragDropManager();
    const dropTarget = (0, _useDropTargetJs).useDropTarget(spec, monitor);
    const accept = (0, _useAcceptJs).useAccept(spec);
    (0, _useIsomorphicLayoutEffectJs).useIsomorphicLayoutEffect(function registerDropTarget() {
        const [handlerId, unregister] = (0, _indexJs).registerTarget(accept, dropTarget, manager);
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