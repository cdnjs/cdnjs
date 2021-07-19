"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentContainer = void 0;
const config_1 = require("../config/config");
const internal_error_1 = require("../errors/internal-error");
const event_emitter_1 = require("../utils/event-emitter");
const style_constants_1 = require("../utils/style-constants");
const types_1 = require("../utils/types");
const utils_1 = require("../utils/utils");
/** @public */
class ComponentContainer extends event_emitter_1.EventEmitter {
    /** @internal */
    constructor(
    /** @internal */
    _config, 
    /** @internal */
    _parent, 
    /** @internal */
    _layoutManager, 
    /** @internal */
    _element, 
    /** @internal */
    _updateItemConfigEvent, 
    /** @internal */
    _showEvent, 
    /** @internal */
    _hideEvent, 
    /** @internal */
    _focusEvent, 
    /** @internal */
    _blurEvent) {
        super();
        this._config = _config;
        this._parent = _parent;
        this._layoutManager = _layoutManager;
        this._element = _element;
        this._updateItemConfigEvent = _updateItemConfigEvent;
        this._showEvent = _showEvent;
        this._hideEvent = _hideEvent;
        this._focusEvent = _focusEvent;
        this._blurEvent = _blurEvent;
        /** @internal */
        this._stackMaximised = false;
        this._width = 0;
        this._height = 0;
        this._visible = true;
        this._isShownWithZeroDimensions = true;
        this._componentType = _config.componentType;
        this._isClosable = _config.isClosable;
        this._initialState = _config.componentState;
        this._state = this._initialState;
        this._boundComponent = this.layoutManager.bindComponent(this, _config);
        this.updateElementPositionPropertyFromBoundComponent();
    }
    get width() { return this._width; }
    get height() { return this._height; }
    get parent() { return this._parent; }
    /** @internal @deprecated use {@link (ComponentContainer:class).componentType} */
    get componentName() { return this._componentType; }
    get componentType() { return this._componentType; }
    get virtual() { return this._boundComponent.virtual; }
    get component() { return this._boundComponent.component; }
    get tab() { return this._tab; }
    get title() { return this._parent.title; }
    get layoutManager() { return this._layoutManager; }
    get isHidden() { return !this._visible; }
    get visible() { return this._visible; }
    get state() { return this._state; }
    /** Return the initial component state */
    get initialState() { return this._initialState; }
    /** The inner DOM element where the container's content is intended to live in */
    get element() { return this._element; }
    /** @internal */
    destroy() {
        this.releaseComponent();
        this.stateRequestEvent = undefined;
        this.emit('destroy');
    }
    /** @deprecated use {@link (ComponentContainer:class).element } */
    getElement() {
        return this._element;
    }
    /**
     * Hides the container's component item (and hence, the container) if not already hidden.
     * Emits hide event prior to hiding the container.
     */
    hide() {
        this._hideEvent();
    }
    /**
     * Shows the container's component item (and hence, the container) if not visible.
     * Emits show event prior to hiding the container.
     */
    show() {
        this._showEvent();
    }
    /**
     * Focus this component in Layout.
     */
    focus(suppressEvent = false) {
        this._focusEvent(suppressEvent);
    }
    /**
     * Remove focus from this component in Layout.
     */
    blur(suppressEvent = false) {
        this._blurEvent(suppressEvent);
    }
    /**
     * Set the size from within the container. Traverses up
     * the item tree until it finds a row or column element
     * and resizes its items accordingly.
     *
     * If this container isn't a descendant of a row or column
     * it returns false
     * @param width - The new width in pixel
     * @param height - The new height in pixel
     *
     * @returns resizeSuccesful
     *
     * @internal
     */
    setSize(width, height) {
        let ancestorItem = this._parent;
        if (ancestorItem.isColumn || ancestorItem.isRow || ancestorItem.parent === null) {
            throw new internal_error_1.AssertError('ICSSPRC', 'ComponentContainer cannot have RowColumn Parent');
        }
        else {
            let ancestorChildItem;
            do {
                ancestorChildItem = ancestorItem;
                ancestorItem = ancestorItem.parent;
            } while (ancestorItem !== null && !ancestorItem.isColumn && !ancestorItem.isRow);
            if (ancestorItem === null) {
                // no Row or Column found
                return false;
            }
            else {
                // ancestorItem is Row or Column
                const direction = ancestorItem.isColumn ? 'height' : 'width';
                const currentSize = this[direction];
                if (currentSize === null) {
                    throw new internal_error_1.UnexpectedNullError('ICSSCS11194');
                }
                else {
                    const newSize = direction === 'height' ? height : width;
                    const totalPixel = currentSize * (1 / (ancestorChildItem[direction] / 100));
                    const percentage = (newSize / totalPixel) * 100;
                    const delta = (ancestorChildItem[direction] - percentage) / (ancestorItem.contentItems.length - 1);
                    for (let i = 0; i < ancestorItem.contentItems.length; i++) {
                        if (ancestorItem.contentItems[i] === ancestorChildItem) {
                            ancestorItem.contentItems[i][direction] = percentage;
                        }
                        else {
                            ancestorItem.contentItems[i][direction] += delta;
                        }
                    }
                    ancestorItem.updateSize();
                    return true;
                }
            }
        }
    }
    /**
     * Closes the container if it is closable. Can be called by
     * both the component within at as well as the contentItem containing
     * it. Emits a close event before the container itself is closed.
     */
    close() {
        if (this._isClosable) {
            this.emit('close');
            this._parent.close();
        }
    }
    /** Replaces component without affecting layout */
    replaceComponent(itemConfig) {
        this.releaseComponent();
        if (!config_1.ItemConfig.isComponent(itemConfig)) {
            throw new Error('ReplaceComponent not passed a component ItemConfig');
        }
        else {
            const config = config_1.ComponentItemConfig.resolve(itemConfig);
            this._initialState = config.componentState;
            this._state = this._initialState;
            this._componentType = config.componentType;
            this._updateItemConfigEvent(config);
            this._boundComponent = this.layoutManager.bindComponent(this, config);
            this.updateElementPositionPropertyFromBoundComponent();
            this.emit('stateChanged');
        }
    }
    /**
     * Returns the initial component state or the latest passed in setState()
     * @returns state
     * @deprecated Use {@link (ComponentContainer:class).initialState}
     */
    getState() {
        return this._state;
    }
    /**
     * Merges the provided state into the current one
     * @deprecated Use {@link (ComponentContainer:class).stateRequestEvent}
     */
    extendState(state) {
        const extendedState = utils_1.deepExtend(this._state, state);
        this.setState(extendedState);
    }
    /**
     * Sets the component state
     * @deprecated Use {@link (ComponentContainer:class).stateRequestEvent}
     */
    setState(state) {
        this._state = state;
        this._parent.emitBaseBubblingEvent('stateChanged');
    }
    /**
     * Set's the components title
     */
    setTitle(title) {
        this._parent.setTitle(title);
    }
    /** @internal */
    setTab(tab) {
        this._tab = tab;
        this.emit('tab', tab);
    }
    /** @internal */
    setVisibility(value) {
        if (this._boundComponent.virtual) {
            if (this.virtualVisibilityChangeRequiredEvent !== undefined) {
                this.virtualVisibilityChangeRequiredEvent(this, value);
            }
        }
        if (value) {
            if (!this._visible) {
                this._visible = true;
                if (this._height === 0 && this._width === 0) {
                    this._isShownWithZeroDimensions = true;
                }
                else {
                    this._isShownWithZeroDimensions = false;
                    this.setSizeToNodeSize(this._width, this._height, true);
                    this.emitShow();
                }
            }
            else {
                if (this._isShownWithZeroDimensions && (this._height !== 0 || this._width !== 0)) {
                    this._isShownWithZeroDimensions = false;
                    this.setSizeToNodeSize(this._width, this._height, true);
                    this.emitShow();
                }
            }
        }
        else {
            if (this._visible) {
                this._visible = false;
                this._isShownWithZeroDimensions = false;
                this.emitHide();
            }
        }
    }
    /**
     * Set the container's size, but considered temporary (for dragging)
     * so don't emit any events.
     * @internal
     */
    enterDragMode(width, height) {
        this._width = width;
        this._height = height;
        utils_1.setElementWidth(this._element, width);
        utils_1.setElementHeight(this._element, height);
        if (this.virtualZIndexChangeRequiredEvent !== undefined) {
            this.virtualZIndexChangeRequiredEvent(this, types_1.LogicalZIndex.drag, style_constants_1.StyleConstants.defaultComponentDragZIndex);
        }
        this.drag();
    }
    /** @internal */
    exitDragMode() {
        if (this.virtualZIndexChangeRequiredEvent !== undefined) {
            this.virtualZIndexChangeRequiredEvent(this, types_1.LogicalZIndex.base, style_constants_1.StyleConstants.defaultComponentBaseZIndex);
        }
    }
    /** @internal */
    enterStackMaximised() {
        this._stackMaximised = true;
        if (this.virtualZIndexChangeRequiredEvent !== undefined) {
            this.virtualZIndexChangeRequiredEvent(this, types_1.LogicalZIndex.stackMaximised, style_constants_1.StyleConstants.defaultComponentStackMaximisedZIndex);
        }
    }
    /** @internal */
    exitStackMaximised() {
        if (this.virtualZIndexChangeRequiredEvent !== undefined) {
            this.virtualZIndexChangeRequiredEvent(this, types_1.LogicalZIndex.base, style_constants_1.StyleConstants.defaultComponentBaseZIndex);
        }
        this._stackMaximised = false;
    }
    /** @internal */
    drag() {
        if (this._boundComponent.virtual) {
            if (this.virtualRectingRequiredEvent !== undefined) {
                this._layoutManager.fireBeforeVirtualRectingEvent(1);
                try {
                    this.virtualRectingRequiredEvent(this, this._width, this._height);
                }
                finally {
                    this._layoutManager.fireAfterVirtualRectingEvent();
                }
            }
        }
    }
    /**
     * Sets the container's size. Called by the container's component item.
     * To instead set the size programmatically from within the component itself,
     * use the public setSize method
     * @param width - in px
     * @param height - in px
     * @param force - set even if no change
     * @internal
     */
    setSizeToNodeSize(width, height, force) {
        if (width !== this._width || height !== this._height || force) {
            this._width = width;
            this._height = height;
            utils_1.setElementWidth(this._element, width);
            utils_1.setElementHeight(this._element, height);
            if (this._boundComponent.virtual) {
                this.addVirtualSizedContainerToLayoutManager();
            }
            else {
                this.emit('resize');
                this.checkShownFromZeroDimensions();
            }
        }
    }
    /** @internal */
    notifyVirtualRectingRequired() {
        if (this.virtualRectingRequiredEvent !== undefined) {
            this.virtualRectingRequiredEvent(this, this._width, this._height);
            this.emit('resize');
            this.checkShownFromZeroDimensions();
        }
    }
    /** @internal */
    updateElementPositionPropertyFromBoundComponent() {
        if (this._boundComponent.virtual) {
            this._element.style.position = 'static';
        }
        else {
            this._element.style.position = ''; // set it back to attribute value
        }
    }
    /** @internal */
    addVirtualSizedContainerToLayoutManager() {
        this._layoutManager.beginVirtualSizedContainerAdding();
        try {
            this._layoutManager.addVirtualSizedContainer(this);
        }
        finally {
            this._layoutManager.endVirtualSizedContainerAdding();
        }
    }
    /** @internal */
    checkShownFromZeroDimensions() {
        if (this._isShownWithZeroDimensions && (this._height !== 0 || this._width !== 0)) {
            this._isShownWithZeroDimensions = false;
            this.emitShow();
        }
    }
    /** @internal */
    emitShow() {
        this.emit('shown');
        this.emit('show');
    }
    /** @internal */
    emitHide() {
        this.emit('hide');
    }
    /** @internal */
    releaseComponent() {
        if (this._stackMaximised) {
            this.exitStackMaximised();
        }
        this.emit('beforeComponentRelease', this._boundComponent.component);
        this.layoutManager.unbindComponent(this, this._boundComponent.virtual, this._boundComponent.component);
    }
}
exports.ComponentContainer = ComponentContainer;
//# sourceMappingURL=component-container.js.map