import { ItemConfig } from '../config/config';
import { ResolvedItemConfig } from '../config/resolved-config';
import { UnexpectedNullError } from '../errors/internal-error';
import { ComponentItem } from '../items/component-item';
import { GroundItem } from '../items/ground-item';
import { DragListener } from '../utils/drag-listener';
import { DragProxy } from './drag-proxy';
/**
 * Allows for any DOM item to create a component on drag
 * start to be dragged into the Layout
 * @public
 */
export class DragSource {
    /** @internal */
    constructor(_element, _extraAllowableChildTargets, _itemConfigOrFtn, _layoutManager) {
        this._element = _element;
        this._extraAllowableChildTargets = _extraAllowableChildTargets;
        this._itemConfigOrFtn = _itemConfigOrFtn;
        this._layoutManager = _layoutManager;
        this._dragListener = null;
        // Need to review dummyGroundContainer
        // Should this part of a fragment or template?
        // Does this need to be regenerated with each drag operation?
        this._dummyGroundContainer = document.createElement('div');
        this._dummyGroundContentItem = new GroundItem(this._layoutManager, this._layoutManager.layoutConfig.root, this._dummyGroundContainer);
        this.createDragListener();
    }
    /**
     * Disposes of the drag listeners so the drag source is not usable any more.
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
        this._dragListener = new DragListener(this._element, this._extraAllowableChildTargets);
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
        let itemConfig;
        if (typeof this._itemConfigOrFtn === "function") {
            itemConfig = this._itemConfigOrFtn();
        }
        else {
            itemConfig = this._itemConfigOrFtn;
        }
        const resolvedItemConfig = ItemConfig.resolve(itemConfig);
        // const contentItem = this._layoutManager._$normalizeContentItem($.extend(true, {}, itemConfig));
        const copiedConfig = ResolvedItemConfig.createCopy(resolvedItemConfig);
        // Create a dummy ContentItem only for drag purposes
        // All ContentItems (except for GroundItem) need a parent.  When dragging, the parent is not used.
        // Instead of allowing null parents (as Javascript version did), use a temporary dummy GroundItem parent and add ContentItem to that
        // If this does not work, need to create alternative GroundItem class
        const componentItem = new ComponentItem(this._layoutManager, copiedConfig, this._dummyGroundContentItem);
        if (this._dragListener === null) {
            throw new UnexpectedNullError('DSODSD66746');
        }
        else {
            const dragProxy = new DragProxy(x, y, this._dragListener, this._layoutManager, componentItem, this._dummyGroundContentItem);
            const transitionIndicator = this._layoutManager.transitionIndicator;
            if (transitionIndicator === null) {
                throw new UnexpectedNullError('DSODST66746');
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
//# sourceMappingURL=drag-source.js.map