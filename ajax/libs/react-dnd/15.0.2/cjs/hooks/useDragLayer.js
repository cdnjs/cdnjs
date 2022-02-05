"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useDragLayer = useDragLayer;
var _react = require("react");
var _useDragDropManager = require("./useDragDropManager");
var _useCollector = require("./useCollector");
function useDragLayer(collect) {
    const dragDropManager = (0, _useDragDropManager).useDragDropManager();
    const monitor = dragDropManager.getMonitor();
    const [collected, updateCollected] = (0, _useCollector).useCollector(monitor, collect);
    (0, _react).useEffect(()=>monitor.subscribeToOffsetChange(updateCollected)
    );
    (0, _react).useEffect(()=>monitor.subscribeToStateChange(updateCollected)
    );
    return collected;
}

//# sourceMappingURL=useDragLayer.js.map