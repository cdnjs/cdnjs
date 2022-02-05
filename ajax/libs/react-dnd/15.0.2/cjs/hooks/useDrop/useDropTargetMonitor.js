"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useDropTargetMonitor = useDropTargetMonitor;
var _react = require("react");
var _internals = require("../../internals");
var _useDragDropManager = require("../useDragDropManager");
function useDropTargetMonitor() {
    const manager = (0, _useDragDropManager).useDragDropManager();
    return (0, _react).useMemo(()=>new _internals.DropTargetMonitorImpl(manager)
    , [
        manager
    ]);
}

//# sourceMappingURL=useDropTargetMonitor.js.map