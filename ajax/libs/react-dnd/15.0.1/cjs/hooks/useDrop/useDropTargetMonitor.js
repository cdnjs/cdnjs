"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDropTargetMonitor = void 0;
const react_1 = require("react");
const internals_1 = require("../../internals");
const useDragDropManager_1 = require("../useDragDropManager");
function useDropTargetMonitor() {
    const manager = (0, useDragDropManager_1.useDragDropManager)();
    return (0, react_1.useMemo)(() => new internals_1.DropTargetMonitorImpl(manager), [manager]);
}
exports.useDropTargetMonitor = useDropTargetMonitor;
