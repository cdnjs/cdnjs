import { AssertError, UnexpectedNullError } from '../errors/internal-error';
import { EventEmitter } from '../utils/event-emitter';
import { getJQueryOffset } from '../utils/jquery-legacy';
import { getUniqueId, setElementDisplayVisibility } from '../utils/utils';
/**
 * This is the baseclass that all content items inherit from.
 * Most methods provide a subset of what the sub-classes do.
 *
 * It also provides a number of functions for tree traversal
 * @public
 */
export class ContentItem extends EventEmitter {
    /** @internal */
    constructor(layoutManager, config, 
    /** @internal */
    _parent, 
    /** @internal */
    _element) {
        super();
        this.layoutManager = layoutManager;
        this._parent = _parent;
        this._element = _element;
        /** @internal */
        this._popInParentIds = [];
        this._type = config.type;
        this._id = config.id;
        this._isInitialised = false;
        this.isGround = false;
        this.isRow = false;
        this.isColumn = false;
        this.isStack = false;
        this.isComponent = false;
        this.width = config.width;
        this.minWidth = config.minWidth;
        this.height = config.height;
        this.minHeight = config.minHeight;
        this._isClosable = config.isClosable;
        this._pendingEventPropagations = {};
        this._throttledEvents = ['stateChanged'];
        this._contentItems = this.createContentItems(config.content);
    }
    get type() { return this._type; }
    get id() { return this._id; }
    /** @internal */
    get popInParentIds() { return this._popInParentIds; }
    get parent() { return this._parent; }
    get contentItems() { return this._contentItems; }
    get isClosable() { return this._isClosable; }
    get element() { return this._element; }
    get isInitialised() { return this._isInitialised; }
    static isStack(item) {
        return item.isStack;
    }
    static isComponentItem(item) {
        return item.isComponent;
    }
    static isComponentParentableItem(item) {
        return item.isStack || item.isGround;
    }
    /**
     * Removes a child node (and its children) from the tree
     * @param contentItem - The child item to remove
     * @param keepChild - Whether to destroy the removed item
     */
    removeChild(contentItem, keepChild = false) {
        /*
         * Get the position of the item that's to be removed within all content items this node contains
         */
        const index = this._contentItems.indexOf(contentItem);
        /*
         * Make sure the content item to be removed is actually a child of this item
         */
        if (index === -1) {
            throw new Error('Can\'t remove child item. Unknown content item');
        }
        /**
         * Call destroy on the content item.
         * All children are destroyed as well
         */
        if (!keepChild) {
            this._contentItems[index].destroy();
        }
        /**
         * Remove the content item from this nodes array of children
         */
        this._contentItems.splice(index, 1);
        /**
         * If this node still contains other content items, adjust their size
         */
        if (this._contentItems.length > 0) {
            this.updateSize();
        }
        else {
            /**
             * If this was the last content item, remove this node as well
             */
            if (!this.isGround && this._isClosable === true) {
                if (this._parent === null) {
                    throw new UnexpectedNullError('CIUC00874');
                }
                else {
                    this._parent.removeChild(this);
                }
            }
        }
    }
    /**
     * Sets up the tree structure for the newly added child
     * The responsibility for the actual DOM manipulations lies
     * with the concrete item
     *
     * @param contentItem -
     * @param index - If omitted item will be appended
     * @param suspendResize - Used by descendent implementations
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addChild(contentItem, index, suspendResize) {
        index !== null && index !== void 0 ? index : (index = this._contentItems.length);
        this._contentItems.splice(index, 0, contentItem);
        contentItem.setParent(this);
        if (this._isInitialised === true && contentItem._isInitialised === false) {
            contentItem.init();
        }
        return index;
    }
    /**
     * Replaces oldChild with newChild
     * @param oldChild -
     * @param newChild -
     * @internal
     */
    replaceChild(oldChild, newChild, destroyOldChild = false) {
        // Do not try to replace ComponentItem - will not work
        const index = this._contentItems.indexOf(oldChild);
        const parentNode = oldChild._element.parentNode;
        if (index === -1) {
            throw new AssertError('CIRCI23232', 'Can\'t replace child. oldChild is not child of this');
        }
        if (parentNode === null) {
            throw new UnexpectedNullError('CIRCP23232');
        }
        else {
            parentNode.replaceChild(newChild._element, oldChild._element);
            /*
            * Optionally destroy the old content item
            */
            if (destroyOldChild === true) {
                oldChild._parent = null;
                oldChild.destroy(); // will now also destroy all children of oldChild
            }
            /*
            * Wire the new contentItem into the tree
            */
            this._contentItems[index] = newChild;
            newChild.setParent(this);
            // newChild inherits the sizes from the old child:
            newChild.height = oldChild.height;
            newChild.width = oldChild.width;
            //TODO This doesn't update the config... refactor to leave item nodes untouched after creation
            if (newChild._parent === null) {
                throw new UnexpectedNullError('CIRCNC45699');
            }
            else {
                if (newChild._parent._isInitialised === true && newChild._isInitialised === false) {
                    newChild.init();
                }
                this.updateSize();
            }
        }
    }
    /**
     * Convenience method.
     * Shorthand for this.parent.removeChild( this )
     */
    remove() {
        if (this._parent === null) {
            throw new UnexpectedNullError('CIR11110');
        }
        else {
            this._parent.removeChild(this);
        }
    }
    /**
     * Removes the component from the layout and creates a new
     * browser window with the component and its children inside
     */
    popout() {
        const parentId = getUniqueId();
        const browserPopout = this.layoutManager.createPopoutFromContentItem(this, undefined, parentId, undefined);
        this.emitBaseBubblingEvent('stateChanged');
        return browserPopout;
    }
    /** @internal */
    calculateConfigContent() {
        const contentItems = this._contentItems;
        const count = contentItems.length;
        const result = new Array(count);
        for (let i = 0; i < count; i++) {
            const item = contentItems[i];
            result[i] = item.toConfig();
        }
        return result;
    }
    /** @internal */
    highlightDropZone(x, y, area) {
        const dropTargetIndicator = this.layoutManager.dropTargetIndicator;
        if (dropTargetIndicator === null) {
            throw new UnexpectedNullError('ACIHDZ5593');
        }
        else {
            dropTargetIndicator.highlightArea(area);
        }
    }
    /** @internal */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDrop(contentItem, area) {
        this.addChild(contentItem);
    }
    /** @internal */
    show() {
        // Not sure why showAllActiveContentItems() was called. GoldenLayout seems to work fine without it.  Left commented code
        // in source in case a reason for it becomes apparent.
        // this.layoutManager.showAllActiveContentItems();
        setElementDisplayVisibility(this._element, true);
        this.layoutManager.updateSizeFromContainer();
        for (let i = 0; i < this._contentItems.length; i++) {
            this._contentItems[i].show();
        }
    }
    /**
     * Destroys this item ands its children
     * @internal
     */
    destroy() {
        for (let i = 0; i < this._contentItems.length; i++) {
            this._contentItems[i].destroy();
        }
        this._contentItems = [];
        this.emitBaseBubblingEvent('beforeItemDestroyed');
        this._element.remove();
        this.emitBaseBubblingEvent('itemDestroyed');
    }
    /**
     * Returns the area the component currently occupies
     * @internal
     */
    getElementArea(element) {
        element = element !== null && element !== void 0 ? element : this._element;
        const offset = getJQueryOffset(element);
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        // const widthAndHeight = getJQueryWidthAndHeight(element);
        return {
            x1: offset.left + 1,
            y1: offset.top + 1,
            x2: offset.left + width - 1,
            y2: offset.top + height - 1,
            surface: width * height,
            contentItem: this
        };
    }
    /**
     * The tree of content items is created in two steps: First all content items are instantiated,
     * then init is called recursively from top to bottem. This is the basic init function,
     * it can be used, extended or overwritten by the content items
     *
     * Its behaviour depends on the content item
     * @internal
     */
    init() {
        this._isInitialised = true;
        this.emitBaseBubblingEvent('itemCreated');
        this.emitUnknownBubblingEvent(this.type + 'Created');
    }
    /** @internal */
    setParent(parent) {
        this._parent = parent;
    }
    /** @internal */
    addPopInParentId(id) {
        if (!this.popInParentIds.includes(id)) {
            this.popInParentIds.push(id);
        }
    }
    /** @internal */
    initContentItems() {
        for (let i = 0; i < this._contentItems.length; i++) {
            this._contentItems[i].init();
        }
    }
    /** @internal */
    hide() {
        setElementDisplayVisibility(this._element, false);
        this.layoutManager.updateSizeFromContainer();
    }
    /** @internal */
    updateContentItemsSize() {
        for (let i = 0; i < this._contentItems.length; i++) {
            this._contentItems[i].updateSize();
        }
    }
    /**
     * creates all content items for this node at initialisation time
     * PLEASE NOTE, please see addChild for adding contentItems at runtime
     * @internal
     */
    createContentItems(content) {
        const count = content.length;
        const result = new Array(count);
        for (let i = 0; i < content.length; i++) {
            result[i] = this.layoutManager.createContentItem(content[i], this);
        }
        return result;
    }
    /**
     * Called for every event on the item tree. Decides whether the event is a bubbling
     * event and propagates it to its parent
     *
     * @param name - The name of the event
     * @param event -
     * @internal
     */
    propagateEvent(name, args) {
        if (args.length === 1) {
            const event = args[0];
            if (event instanceof EventEmitter.BubblingEvent &&
                event.isPropagationStopped === false &&
                this._isInitialised === true) {
                /**
                 * In some cases (e.g. if an element is created from a DragSource) it
                 * doesn't have a parent and is not a child of GroundItem. If that's the case
                 * propagate the bubbling event from the top level of the substree directly
                 * to the layoutManager
                 */
                if (this.isGround === false && this._parent) {
                    this._parent.emitUnknown(name, event);
                }
                else {
                    this.scheduleEventPropagationToLayoutManager(name, event);
                }
            }
        }
    }
    tryBubbleEvent(name, args) {
        if (args.length === 1) {
            const event = args[0];
            if (event instanceof EventEmitter.BubblingEvent &&
                event.isPropagationStopped === false &&
                this._isInitialised === true) {
                /**
                 * In some cases (e.g. if an element is created from a DragSource) it
                 * doesn't have a parent and is not a child of GroundItem. If that's the case
                 * propagate the bubbling event from the top level of the substree directly
                 * to the layoutManager
                 */
                if (this.isGround === false && this._parent) {
                    this._parent.emitUnknown(name, event);
                }
                else {
                    this.scheduleEventPropagationToLayoutManager(name, event);
                }
            }
        }
    }
    /**
     * All raw events bubble up to the Ground element. Some events that
     * are propagated to - and emitted by - the layoutManager however are
     * only string-based, batched and sanitized to make them more usable
     *
     * @param name - The name of the event
     * @internal
     */
    scheduleEventPropagationToLayoutManager(name, event) {
        if (this._throttledEvents.indexOf(name) === -1) {
            this.layoutManager.emitUnknown(name, event);
        }
        else {
            if (this._pendingEventPropagations[name] !== true) {
                this._pendingEventPropagations[name] = true;
                globalThis.requestAnimationFrame(() => this.propagateEventToLayoutManager(name, event));
            }
        }
    }
    /**
     * Callback for events scheduled by _scheduleEventPropagationToLayoutManager
     *
     * @param name - The name of the event
     * @internal
     */
    propagateEventToLayoutManager(name, event) {
        this._pendingEventPropagations[name] = false;
        this.layoutManager.emitUnknown(name, event);
    }
}
//# sourceMappingURL=content-item.js.map