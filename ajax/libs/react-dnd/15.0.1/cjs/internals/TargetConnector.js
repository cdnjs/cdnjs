"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetConnector = void 0;
const shallowequal_1 = require("@react-dnd/shallowequal");
const wrapConnectorHooks_1 = require("./wrapConnectorHooks");
const isRef_1 = require("./isRef");
class TargetConnector {
    hooks = (0, wrapConnectorHooks_1.wrapConnectorHooks)({
        dropTarget: (node, options) => {
            this.clearDropTarget();
            this.dropTargetOptions = options;
            if ((0, isRef_1.isRef)(node)) {
                this.dropTargetRef = node;
            }
            else {
                this.dropTargetNode = node;
            }
            this.reconnect();
        },
    });
    handlerId = null;
    // The drop target may either be attached via ref or connect function
    dropTargetRef = null;
    dropTargetNode;
    dropTargetOptionsInternal = null;
    unsubscribeDropTarget;
    lastConnectedHandlerId = null;
    lastConnectedDropTarget = null;
    lastConnectedDropTargetOptions = null;
    backend;
    constructor(backend) {
        this.backend = backend;
    }
    get connectTarget() {
        return this.dropTarget;
    }
    reconnect() {
        // if nothing has changed then don't resubscribe
        const didChange = this.didHandlerIdChange() ||
            this.didDropTargetChange() ||
            this.didOptionsChange();
        if (didChange) {
            this.disconnectDropTarget();
        }
        const dropTarget = this.dropTarget;
        if (!this.handlerId) {
            return;
        }
        if (!dropTarget) {
            this.lastConnectedDropTarget = dropTarget;
            return;
        }
        if (didChange) {
            this.lastConnectedHandlerId = this.handlerId;
            this.lastConnectedDropTarget = dropTarget;
            this.lastConnectedDropTargetOptions = this.dropTargetOptions;
            this.unsubscribeDropTarget = this.backend.connectDropTarget(this.handlerId, dropTarget, this.dropTargetOptions);
        }
    }
    receiveHandlerId(newHandlerId) {
        if (newHandlerId === this.handlerId) {
            return;
        }
        this.handlerId = newHandlerId;
        this.reconnect();
    }
    get dropTargetOptions() {
        return this.dropTargetOptionsInternal;
    }
    set dropTargetOptions(options) {
        this.dropTargetOptionsInternal = options;
    }
    didHandlerIdChange() {
        return this.lastConnectedHandlerId !== this.handlerId;
    }
    didDropTargetChange() {
        return this.lastConnectedDropTarget !== this.dropTarget;
    }
    didOptionsChange() {
        return !(0, shallowequal_1.shallowEqual)(this.lastConnectedDropTargetOptions, this.dropTargetOptions);
    }
    disconnectDropTarget() {
        if (this.unsubscribeDropTarget) {
            this.unsubscribeDropTarget();
            this.unsubscribeDropTarget = undefined;
        }
    }
    get dropTarget() {
        return (this.dropTargetNode || (this.dropTargetRef && this.dropTargetRef.current));
    }
    clearDropTarget() {
        this.dropTargetRef = null;
        this.dropTargetNode = null;
    }
}
exports.TargetConnector = TargetConnector;
