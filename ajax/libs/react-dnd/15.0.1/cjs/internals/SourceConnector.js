"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceConnector = void 0;
const wrapConnectorHooks_1 = require("./wrapConnectorHooks");
const isRef_1 = require("./isRef");
const shallowequal_1 = require("@react-dnd/shallowequal");
class SourceConnector {
    hooks = (0, wrapConnectorHooks_1.wrapConnectorHooks)({
        dragSource: (node, options) => {
            this.clearDragSource();
            this.dragSourceOptions = options || null;
            if ((0, isRef_1.isRef)(node)) {
                this.dragSourceRef = node;
            }
            else {
                this.dragSourceNode = node;
            }
            this.reconnectDragSource();
        },
        dragPreview: (node, options) => {
            this.clearDragPreview();
            this.dragPreviewOptions = options || null;
            if ((0, isRef_1.isRef)(node)) {
                this.dragPreviewRef = node;
            }
            else {
                this.dragPreviewNode = node;
            }
            this.reconnectDragPreview();
        },
    });
    handlerId = null;
    // The drop target may either be attached via ref or connect function
    dragSourceRef = null;
    dragSourceNode;
    dragSourceOptionsInternal = null;
    dragSourceUnsubscribe;
    // The drag preview may either be attached via ref or connect function
    dragPreviewRef = null;
    dragPreviewNode;
    dragPreviewOptionsInternal = null;
    dragPreviewUnsubscribe;
    lastConnectedHandlerId = null;
    lastConnectedDragSource = null;
    lastConnectedDragSourceOptions = null;
    lastConnectedDragPreview = null;
    lastConnectedDragPreviewOptions = null;
    backend;
    constructor(backend) {
        this.backend = backend;
    }
    receiveHandlerId(newHandlerId) {
        if (this.handlerId === newHandlerId) {
            return;
        }
        this.handlerId = newHandlerId;
        this.reconnect();
    }
    get connectTarget() {
        return this.dragSource;
    }
    get dragSourceOptions() {
        return this.dragSourceOptionsInternal;
    }
    set dragSourceOptions(options) {
        this.dragSourceOptionsInternal = options;
    }
    get dragPreviewOptions() {
        return this.dragPreviewOptionsInternal;
    }
    set dragPreviewOptions(options) {
        this.dragPreviewOptionsInternal = options;
    }
    reconnect() {
        const didChange = this.reconnectDragSource();
        this.reconnectDragPreview(didChange);
    }
    reconnectDragSource() {
        const dragSource = this.dragSource;
        // if nothing has changed then don't resubscribe
        const didChange = this.didHandlerIdChange() ||
            this.didConnectedDragSourceChange() ||
            this.didDragSourceOptionsChange();
        if (didChange) {
            this.disconnectDragSource();
        }
        if (!this.handlerId) {
            return didChange;
        }
        if (!dragSource) {
            this.lastConnectedDragSource = dragSource;
            return didChange;
        }
        if (didChange) {
            this.lastConnectedHandlerId = this.handlerId;
            this.lastConnectedDragSource = dragSource;
            this.lastConnectedDragSourceOptions = this.dragSourceOptions;
            this.dragSourceUnsubscribe = this.backend.connectDragSource(this.handlerId, dragSource, this.dragSourceOptions);
        }
        return didChange;
    }
    reconnectDragPreview(forceDidChange = false) {
        const dragPreview = this.dragPreview;
        // if nothing has changed then don't resubscribe
        const didChange = forceDidChange ||
            this.didHandlerIdChange() ||
            this.didConnectedDragPreviewChange() ||
            this.didDragPreviewOptionsChange();
        if (didChange) {
            this.disconnectDragPreview();
        }
        if (!this.handlerId) {
            return;
        }
        if (!dragPreview) {
            this.lastConnectedDragPreview = dragPreview;
            return;
        }
        if (didChange) {
            this.lastConnectedHandlerId = this.handlerId;
            this.lastConnectedDragPreview = dragPreview;
            this.lastConnectedDragPreviewOptions = this.dragPreviewOptions;
            this.dragPreviewUnsubscribe = this.backend.connectDragPreview(this.handlerId, dragPreview, this.dragPreviewOptions);
        }
    }
    didHandlerIdChange() {
        return this.lastConnectedHandlerId !== this.handlerId;
    }
    didConnectedDragSourceChange() {
        return this.lastConnectedDragSource !== this.dragSource;
    }
    didConnectedDragPreviewChange() {
        return this.lastConnectedDragPreview !== this.dragPreview;
    }
    didDragSourceOptionsChange() {
        return !(0, shallowequal_1.shallowEqual)(this.lastConnectedDragSourceOptions, this.dragSourceOptions);
    }
    didDragPreviewOptionsChange() {
        return !(0, shallowequal_1.shallowEqual)(this.lastConnectedDragPreviewOptions, this.dragPreviewOptions);
    }
    disconnectDragSource() {
        if (this.dragSourceUnsubscribe) {
            this.dragSourceUnsubscribe();
            this.dragSourceUnsubscribe = undefined;
        }
    }
    disconnectDragPreview() {
        if (this.dragPreviewUnsubscribe) {
            this.dragPreviewUnsubscribe();
            this.dragPreviewUnsubscribe = undefined;
            this.dragPreviewNode = null;
            this.dragPreviewRef = null;
        }
    }
    get dragSource() {
        return (this.dragSourceNode || (this.dragSourceRef && this.dragSourceRef.current));
    }
    get dragPreview() {
        return (this.dragPreviewNode ||
            (this.dragPreviewRef && this.dragPreviewRef.current));
    }
    clearDragSource() {
        this.dragSourceNode = null;
        this.dragSourceRef = null;
    }
    clearDragPreview() {
        this.dragPreviewNode = null;
        this.dragPreviewRef = null;
    }
}
exports.SourceConnector = SourceConnector;
