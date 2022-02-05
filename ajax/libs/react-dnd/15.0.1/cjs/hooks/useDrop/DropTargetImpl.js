"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropTargetImpl = void 0;
class DropTargetImpl {
    spec;
    monitor;
    constructor(spec, monitor) {
        this.spec = spec;
        this.monitor = monitor;
    }
    canDrop() {
        const spec = this.spec;
        const monitor = this.monitor;
        return spec.canDrop ? spec.canDrop(monitor.getItem(), monitor) : true;
    }
    hover() {
        const spec = this.spec;
        const monitor = this.monitor;
        if (spec.hover) {
            spec.hover(monitor.getItem(), monitor);
        }
    }
    drop() {
        const spec = this.spec;
        const monitor = this.monitor;
        if (spec.drop) {
            return spec.drop(monitor.getItem(), monitor);
        }
        return;
    }
}
exports.DropTargetImpl = DropTargetImpl;
