"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragSource = void 0;
const config_1 = require("../config/config");
const internal_error_1 = require("../errors/internal-error");
const component_item_1 = require("../items/component-item");
const ground_item_1 = require("../items/ground-item");
const drag_listener_1 = require("../utils/drag-listener");
const drag_proxy_1 = require("./drag-proxy");
const resolved_config_1 = require("../config/resolved-config");
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
    /** @internal */
    _componentTypeOrFtn, 
    /** @internal */
    _componentState, 
    /** @internal */
    _title) {
        this._layoutManager = _layoutManager;
        this._element = _element;
        this._extraAllowableChildTargets = _extraAllowableChildTargets;
        this._componentTypeOrFtn = _componentTypeOrFtn;
        this._componentState = _componentState;
        this._title = _title;
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
        let componentType;
        let componentState;
        let title;
        if (typeof this._componentTypeOrFtn === "function") {
            const dragSourceItemConfig = this._componentTypeOrFtn();
            componentType = dragSourceItemConfig.type;
            componentState = dragSourceItemConfig.state;
            title = dragSourceItemConfig.title;
        }
        else {
            componentType = this._componentTypeOrFtn;
            componentState = this._componentState;
            title = this._title;
        }
        // Create a dummy ContentItem only for drag purposes
        // All ContentItems (except for GroundItem) need a parent.  When dragging, the parent is not used.
        // Instead of allowing null parents (as Javascript version did), use a temporary dummy GroundItem parent and add ContentItem to that
        // If this does not work, need to create alternative GroundItem class
        const itemConfig = {
            type: 'component',
            componentType,
            componentState,
            title,
        };
        const resolvedItemConfig = config_1.ComponentItemConfig.resolve(itemConfig);
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
//# sourceMappingURL=drag-source.js.map