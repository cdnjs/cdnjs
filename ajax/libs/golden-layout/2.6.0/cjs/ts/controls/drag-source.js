"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragSource = void 0;
const config_1 = require("../config/config"); // remove alias in version 3
const resolved_config_1 = require("../config/resolved-config");
const internal_error_1 = require("../errors/internal-error");
const component_item_1 = require("../items/component-item");
const ground_item_1 = require("../items/ground-item");
const drag_listener_1 = require("../utils/drag-listener");
const drag_proxy_1 = require("./drag-proxy");
/**
 * Allows for any DOM item to create a component on drag
 * start to be dragged into the Layout
 * @public
 */
class DragSource {
    /** @internal */
    constructor(
    /** @internal */
    _layoutManager, 
    /** @internal */
    _element, 
    /** @internal */
    _extraAllowableChildTargets, 
    /** @internal @deprecated replace with componentItemConfigOrFtn in version 3 */
    _componentTypeOrFtn, 
    /** @internal @deprecated remove in version 3 */
    _componentState, 
    /** @internal @deprecated remove in version 3 */
    _title, 
    /** @internal @deprecated remove in version 3 */
    _id) {
        this._layoutManager = _layoutManager;
        this._element = _element;
        this._extraAllowableChildTargets = _extraAllowableChildTargets;
        this._componentTypeOrFtn = _componentTypeOrFtn;
        this._componentState = _componentState;
        this._title = _title;
        this._id = _id;
        this._dragListener = null;
        this._dummyGroundContainer = document.createElement('div');
        const dummyRootItemConfig = resolved_config_1.ResolvedRowOrColumnItemConfig.createDefault('row');
        this._dummyGroundContentItem = new ground_item_1.GroundItem(this._layoutManager, dummyRootItemConfig, this._dummyGroundContainer);
        this.createDragListener();
    }
    /**
     * Disposes of the drag listeners so the drag source is not usable any more.
     * @internal
     */
    destroy() {
        this.removeDragListener();
    }
    /**
     * Called initially and after every drag
     * @internal
     */
    createDragListener() {
        this.removeDragListener();
        this._dragListener = new drag_listener_1.DragListener(this._element, this._extraAllowableChildTargets);
        this._dragListener.on('dragStart', (x, y) => this.onDragStart(x, y));
        this._dragListener.on('dragStop', () => this.onDragStop());
    }
    /**
     * Callback for the DragListener's dragStart event
     *
     * @param x - The x position of the mouse on dragStart
     * @param y - The x position of the mouse on dragStart
     * @internal
     */
    onDragStart(x, y) {
        var _a;
        const type = 'component';
        let dragSourceItemConfig;
        if (typeof this._componentTypeOrFtn === "function") {
            const ftnDragSourceItemConfig = this._componentTypeOrFtn();
            // If the componentType property exists, then it is already a ComponentItemConfig so nothing to do
            if (DragSource.isDragSourceComponentItemConfig(ftnDragSourceItemConfig)) {
                dragSourceItemConfig = {
                    type,
                    componentState: ftnDragSourceItemConfig.state,
                    componentType: ftnDragSourceItemConfig.type,
                    title: (_a = ftnDragSourceItemConfig.title) !== null && _a !== void 0 ? _a : this._title,
                };
            }
            else {
                dragSourceItemConfig = ftnDragSourceItemConfig;
            }
        }
        else {
            dragSourceItemConfig = {
                type,
                componentState: this._componentState,
                componentType: this._componentTypeOrFtn,
                title: this._title,
                id: this._id,
            };
        }
        // Create a dummy ContentItem only for drag purposes
        // All ContentItems (except for GroundItem) need a parent.  When dragging, the parent is not used.
        // Instead of allowing null parents (as Javascript version did), use a temporary dummy GroundItem parent and add ContentItem to that
        // If this does not work, need to create alternative GroundItem class
        const resolvedItemConfig = config_1.ComponentItemConfig.resolve(dragSourceItemConfig, false);
        const componentItem = new component_item_1.ComponentItem(this._layoutManager, resolvedItemConfig, this._dummyGroundContentItem);
        this._dummyGroundContentItem.contentItems.push(componentItem);
        if (this._dragListener === null) {
            throw new internal_error_1.UnexpectedNullError('DSODSD66746');
        }
        else {
            const dragProxy = new drag_proxy_1.DragProxy(x, y, this._dragListener, this._layoutManager, componentItem, this._dummyGroundContentItem);
            const transitionIndicator = this._layoutManager.transitionIndicator;
            if (transitionIndicator === null) {
                throw new internal_error_1.UnexpectedNullError('DSODST66746');
            }
            else {
                transitionIndicator.transitionElements(this._element, dragProxy.element);
            }
        }
    }
    /** @internal */
    onDragStop() {
        // if (this._dummyGroundContentItem === undefined) {
        //     throw new UnexpectedUndefinedError('DSODSDRU08116');
        // } else {
        //     this._dummyGroundContentItem._$destroy
        //     this._dummyGroundContentItem = undefined;
        // }
        this.createDragListener();
    }
    /**
     * Called after every drag and when the drag source is being disposed of.
     * @internal
     */
    removeDragListener() {
        if (this._dragListener !== null) {
            this._dragListener.destroy();
            this._dragListener = null;
        }
    }
}
exports.DragSource = DragSource;
/** @public */
(function (DragSource) {
    /** @deprecated remove in version 3 */
    function isDragSourceComponentItemConfig(config) {
        return !("componentType" in config);
    }
    DragSource.isDragSourceComponentItemConfig = isDragSourceComponentItemConfig;
})(DragSource = exports.DragSource || (exports.DragSource = {}));
//# sourceMappingURL=drag-source.js.map