import { ComponentItemConfig, ItemConfig } from '../config/config';
import { AssertError, UnexpectedNullError } from '../errors/internal-error';
import { EventEmitter } from '../utils/event-emitter';
import { deepExtend, setElementHeight, setElementWidth } from '../utils/utils';
/** @public */
export class ComponentContainer extends EventEmitter {
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
        this._width = null;
        this._height = null;
        this._isHidden = false;
        this._isShownWithZeroDimensions = false;
        this._componentType = _config.componentType;
        this._isClosable = _config.isClosable;
        this._initialState = _config.componentState;
        this._state = this._initialState;
        this._component = this.layoutManager.getComponent(this, _config);
    }
    get width() { return this._width; }
    get height() { return this._height; }
    get parent() { return this._parent; }
    /** @internal @deprecated use {@link (ComponentContainer:class).componentType} */
    get componentName() { return this._componentType; }
    get componentType() { return this._componentType; }
    get component() { return this._component; }
    get tab() { return this._tab; }
    get title() { return this._parent.title; }
    get layoutManager() { return this._layoutManager; }
    get isHidden() { return this._isHidden; }
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
    /** @internal */
    checkEmitHide() {
        if (!this._isHidden) {
            this.emit('hide');
            this._isHidden = true;
            this._isShownWithZeroDimensions = false;
        }
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
    /** @internal */
    checkEmitShow() {
        // emit 'show' only if the container has a valid size
        if (this._isHidden) {
            this._isHidden = false;
            if (this._height === 0 && this._width === 0) {
                this._isShownWithZeroDimensions = true;
            }
            else {
                this._isShownWithZeroDimensions = false;
                this.emit('shown');
                this.emit('show');
            }
        }
        else {
            if (this._isShownWithZeroDimensions && (this._height !== 0 || this._width !== 0)) {
                this._isShownWithZeroDimensions = false;
                this.emit('shown');
                this.emit('show');
            }
        }
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
     */
    setSize(width, height) {
        let ancestorItem = this._parent;
        if (ancestorItem.isColumn || ancestorItem.isRow || ancestorItem.parent === null) {
            throw new AssertError('ICSSPRC', 'ComponentContainer cannot have RowColumn Parent');
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
                    throw new UnexpectedNullError('ICSSCS11194');
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
        if (!ItemConfig.isComponent(itemConfig)) {
            throw new Error('ReplaceComponent not passed a component ItemConfig');
        }
        else {
            const config = ComponentItemConfig.resolve(itemConfig);
            this._initialState = config.componentState;
            this._state = this._initialState;
            this._componentType = config.componentType;
            this._updateItemConfigEvent(config);
            this._component = this.layoutManager.getComponent(this, config);
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
        const extendedState = deepExtend(this._state, state);
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
    setDragSize(width, height) {
        setElementWidth(this._element, width);
        setElementHeight(this._element, height);
    }
    /**
     * Set's the containers size. Called by the container's component item.
     * To set the size programmatically from within the component itself,
     * use the public setSize method
     * @param width - in px
     * @param height - in px
     * @internal
     */
    setSizeToNodeSize(width, height) {
        if (width !== this._width || height !== this._height) {
            this._width = width;
            this._height = height;
            setElementWidth(this._element, width);
            setElementHeight(this._element, height);
            this.emit('resize');
            if (this._isShownWithZeroDimensions && (this._height !== 0 || this._width !== 0)) {
                this._isShownWithZeroDimensions = false;
                this.emit('shown');
                this.emit('show');
            }
        }
    }
    /** @internal */
    releaseComponent() {
        this.emit('beforeComponentRelease', this._component);
        this.layoutManager.releaseComponent(this, this._component);
    }
}
//# sourceMappingURL=component-container.js.map