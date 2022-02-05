"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDragLayer = void 0;
const react_1 = require("react");
const useDragDropManager_1 = require("./useDragDropManager");
const useCollector_1 = require("./useCollector");
/**
 * useDragLayer Hook
 * @param collector The property collector
 */
function useDragLayer(collect) {
    const dragDropManager = (0, useDragDropManager_1.useDragDropManager)();
    const monitor = dragDropManager.getMonitor();
    const [collected, updateCollected] = (0, useCollector_1.useCollector)(monitor, collect);
    (0, react_1.useEffect)(() => monitor.subscribeToOffsetChange(updateCollected));
    (0, react_1.useEffect)(() => monitor.subscribeToStateChange(updateCollected));
    return collected;
}
exports.useDragLayer = useDragLayer;
