"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useDragSourceMonitor = useDragSourceMonitor;
var _react = require("react");
var _indexJs = require("../../internals/index.js");
var _useDragDropManagerJs = require("../useDragDropManager.js");
function useDragSourceMonitor() {
    const manager = (0, _useDragDropManagerJs).useDragDropManager();
    return (0, _react).useMemo(()=>new _indexJs.DragSourceMonitorImpl(manager)
    , [
        manager
    ]);
}

//# sourceMappingURL=useDragSourceMonitor.js.map