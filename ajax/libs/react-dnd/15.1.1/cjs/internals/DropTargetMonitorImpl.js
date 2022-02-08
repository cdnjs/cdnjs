"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _invariant = require("@react-dnd/invariant");
let isCallingCanDrop = false;
class DropTargetMonitorImpl {
    receiveHandlerId(targetId) {
        this.targetId = targetId;
    }
    getHandlerId() {
        return this.targetId;
    }
    subscribeToStateChange(listener, options) {
        return this.internalMonitor.subscribeToStateChange(listener, options);
    }
    canDrop() {
        // Cut out early if the target id has not been set. This should prevent errors
        // where the user has an older version of dnd-core like in
        // https://github.com/react-dnd/react-dnd/issues/1310
        if (!this.targetId) {
            return false;
        }
        (0, _invariant).invariant(!isCallingCanDrop, 'You may not call monitor.canDrop() inside your canDrop() implementation. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor');
        try {
            isCallingCanDrop = true;
            return this.internalMonitor.canDropOnTarget(this.targetId);
        } finally{
            isCallingCanDrop = false;
        }
    }
    isOver(options) {
        if (!this.targetId) {
            return false;
        }
        return this.internalMonitor.isOverTarget(this.targetId, options);
    }
    getItemType() {
        return this.internalMonitor.getItemType();
    }
    getItem() {
        return this.internalMonitor.getItem();
    }
    getDropResult() {
        return this.internalMonitor.getDropResult();
    }
    didDrop() {
        return this.internalMonitor.didDrop();
    }
    getInitialClientOffset() {
        return this.internalMonitor.getInitialClientOffset();
    }
    getInitialSourceClientOffset() {
        return this.internalMonitor.getInitialSourceClientOffset();
    }
    getSourceClientOffset() {
        return this.internalMonitor.getSourceClientOffset();
    }
    getClientOffset() {
        return this.internalMonitor.getClientOffset();
    }
    getDifferenceFromInitialOffset() {
        return this.internalMonitor.getDifferenceFromInitialOffset();
    }
    constructor(manager){
        this.targetId = null;
        this.internalMonitor = manager.getMonitor();
    }
}
exports.DropTargetMonitorImpl = DropTargetMonitorImpl;

//# sourceMappingURL=DropTargetMonitorImpl.js.map