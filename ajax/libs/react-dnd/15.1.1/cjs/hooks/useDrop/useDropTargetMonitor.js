"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useDropTargetMonitor = useDropTargetMonitor;
var _react = require("react");
var _indexJs = require("../../internals/index.js");
var _useDragDropManagerJs = require("../useDragDropManager.js");
function useDropTargetMonitor() {
    const manager = (0, _useDragDropManagerJs).useDragDropManager();
    return (0, _react).useMemo(()=>new _indexJs.DropTargetMonitorImpl(manager)
    , [
        manager
    ]);
}

//# sourceMappingURL=useDropTargetMonitor.js.map