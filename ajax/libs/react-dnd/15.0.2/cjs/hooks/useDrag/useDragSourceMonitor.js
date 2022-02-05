"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useDragSourceMonitor = useDragSourceMonitor;
var _react = require("react");
var _internals = require("../../internals");
var _useDragDropManager = require("../useDragDropManager");
function useDragSourceMonitor() {
    const manager = (0, _useDragDropManager).useDragDropManager();
    return (0, _react).useMemo(()=>new _internals.DragSourceMonitorImpl(manager)
    , [
        manager
    ]);
}

//# sourceMappingURL=useDragSourceMonitor.js.map