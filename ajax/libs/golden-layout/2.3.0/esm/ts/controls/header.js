import { UnexpectedUndefinedError } from '../errors/internal-error';
import { EventEmitter } from '../utils/event-emitter';
import { Side } from '../utils/types';
import { numberToPixels, setElementDisplayVisibility } from '../utils/utils';
import { HeaderButton } from './header-button';
import { TabsContainer } from './tabs-container';
/**
 * This class represents a header above a Stack ContentItem.
 * @public
 */
export class Header extends EventEmitter {
    /** @internal */
    constructor(
    /** @internal */
    _layoutManager, 
    /** @internal */
    _parent, settings, 
    /** @internal */
    _configClosable, 
    /** @internal */
    _getActiveComponentItemEvent, closeEvent, 
    /** @internal */
    _popoutEvent, 
    /** @internal */
    _maximiseToggleEvent, 
    /** @internal */
    _clickEvent, 
    /** @internal */
    _touchStartEvent, 
    /** @internal */
    _componentRemoveEvent, 
    /** @internal */
    _componentFocusEvent, 
    /** @internal */
    _componentDragStartEvent) {
        super();
        this._layoutManager = _layoutManager;
        this._parent = _parent;
        this._configClosable = _configClosable;
        this._getActiveComponentItemEvent = _getActiveComponentItemEvent;
        this._popoutEvent = _popoutEvent;
        this._maximiseToggleEvent = _maximiseToggleEvent;
        this._clickEvent = _clickEvent;
        this._touchStartEvent = _touchStartEvent;
        this._componentRemoveEvent = _componentRemoveEvent;
        this._componentFocusEvent = _componentFocusEvent;
        this._componentDragStartEvent = _componentDragStartEvent;
        /** @internal */
        this._clickListener = (ev) => this.onClick(ev);
        /** @internal */
        this._touchStartListener = (ev) => this.onTouchStart(ev);
        /** @internal */
        this._rowColumnClosable = true;
        /** @internal */
        this._closeButton = null;
        /** @internal */
        this._popoutButton = null;
        this._tabsContainer = new TabsContainer(this._layoutManager, (item) => this.handleTabInitiatedComponentRemoveEvent(item), (item) => this.handleTabInitiatedComponentFocusEvent(item), (x, y, dragListener, item) => this.handleTabInitiatedDragStartEvent(x, y, dragListener, item), () => this.processTabDropdownActiveChanged());
        this._show = settings.show;
        this._popoutEnabled = settings.popoutEnabled;
        this._popoutLabel = settings.popoutLabel;
        this._maximiseEnabled = settings.maximiseEnabled;
        this._maximiseLabel = settings.maximiseLabel;
        this._minimiseEnabled = settings.minimiseEnabled;
        this._minimiseLabel = settings.minimiseLabel;
        this._closeEnabled = settings.closeEnabled;
        this._closeLabel = settings.closeLabel;
        this._tabDropdownEnabled = settings.tabDropdownEnabled;
        this._tabDropdownLabel = settings.tabDropdownLabel;
        this.setSide(settings.side);
        this._canRemoveComponent = this._configClosable;
        this._element = document.createElement('section');
        this._element.classList.add("lm_header" /* Header */);
        this._controlsContainerElement = document.createElement('section');
        this._controlsContainerElement.classList.add("lm_controls" /* Controls */);
        this._element.appendChild(this._tabsContainer.element);
        this._element.appendChild(this._controlsContainerElement);
        this._element.appendChild(this._tabsContainer.dropdownElement);
        this._element.addEventListener('click', this._clickListener, { passive: true });
        this._element.addEventListener('touchstart', this._touchStartListener, { passive: true });
        this._documentMouseUpListener = () => this._tabsContainer.hideAdditionalTabsDropdown();
        globalThis.document.addEventListener('mouseup', this._documentMouseUpListener, { passive: true });
        this._tabControlOffset = this._layoutManager.layoutConfig.settings.tabControlOffset;
        this._tabDropdownButton = new HeaderButton(this, this._tabDropdownLabel, "lm_tabdropdown" /* TabDropdown */, () => this._tabsContainer.showAdditionalTabsDropdown());
        if (this._popoutEnabled) {
            this._popoutButton = new HeaderButton(this, this._popoutLabel, "lm_popout" /* Popout */, () => this.handleButtonPopoutEvent());
        }
        /**
         * Maximise control - set the component to the full size of the layout
         */
        if (this._maximiseEnabled) {
            this._maximiseButton = new HeaderButton(this, this._maximiseLabel, "lm_maximise" /* Maximise */, (ev) => this.handleButtonMaximiseToggleEvent(ev));
        }
        /**
         * Close button
         */
        if (this._configClosable) {
            this._closeButton = new HeaderButton(this, this._closeLabel, "lm_close" /* Close */, () => closeEvent());
        }
        this.processTabDropdownActiveChanged();
    }
    // /** @internal */
    // private _activeComponentItem: ComponentItem | null = null; // only used to identify active tab
    /** @internal */
    get show() { return this._show; }
    /** @internal */
    get side() { return this._side; }
    /** @internal */
    get leftRightSided() { return this._leftRightSided; }
    get layoutManager() { return this._layoutManager; }
    get parent() { return this._parent; }
    get tabs() { return this._tabsContainer.tabs; }
    get lastVisibleTabIndex() { return this._tabsContainer.lastVisibleTabIndex; }
    /**
     * @deprecated use {@link (Stack:class).getActiveComponentItem} */
    get activeContentItem() {
        const activeComponentItem = this._getActiveComponentItemEvent();
        if (activeComponentItem === undefined) {
            return null;
        }
        else {
            return activeComponentItem;
        }
    }
    get element() { return this._element; }
    /** @deprecated use {@link (Header:class).tabsContainerElement} */
    get tabsContainer() { return this._tabsContainer.element; }
    get tabsContainerElement() { return this._tabsContainer.element; }
    get controlsContainerElement() { return this._controlsContainerElement; }
    /** @deprecated use {@link (Header:class).controlsContainerElement} */
    get controlsContainer() { return this._controlsContainerElement; }
    /**
     * Destroys the entire header
     * @internal
     */
    destroy() {
        this.emit('destroy');
        this._popoutEvent = undefined;
        this._maximiseToggleEvent = undefined;
        this._clickEvent = undefined;
        this._touchStartEvent = undefined;
        this._componentRemoveEvent = undefined;
        this._componentFocusEvent = undefined;
        this._componentDragStartEvent = undefined;
        this._tabsContainer.destroy();
        globalThis.document.removeEventListener('mouseup', this._documentMouseUpListener);
        this._element.remove();
    }
    /**
     * Creates a new tab and associates it with a contentItem
     * @param index - The position of the tab
     * @internal
     */
    createTab(componentItem, index) {
        this._tabsContainer.createTab(componentItem, index);
    }
    /**
     * Finds a tab based on the contentItem its associated with and removes it.
     * Cannot remove tab if it has the active ComponentItem
     * @internal
     */
    removeTab(componentItem) {
        this._tabsContainer.removeTab(componentItem);
    }
    /** @internal */
    processActiveComponentChanged(newActiveComponentItem) {
        this._tabsContainer.processActiveComponentChanged(newActiveComponentItem);
        this.updateTabSizes();
    }
    /** @internal */
    setSide(value) {
        this._side = value;
        this._leftRightSided = [Side.right, Side.left].includes(this._side);
    }
    /**
     * Programmatically set closability.
     * @param value - Whether to enable/disable closability.
     * @returns Whether the action was successful
     * @internal
     */
    setRowColumnClosable(value) {
        this._rowColumnClosable = value;
        this.updateClosability();
    }
    /**
     * Updates the header's closability. If a stack/header is able
     * to close, but has a non closable component added to it, the stack is no
     * longer closable until all components are closable.
     * @internal
     */
    updateClosability() {
        let isClosable;
        if (!this._configClosable) {
            isClosable = false;
        }
        else {
            if (!this._rowColumnClosable) {
                isClosable = false;
            }
            else {
                isClosable = true;
                const len = this.tabs.length;
                for (let i = 0; i < len; i++) {
                    const tab = this._tabsContainer.tabs[i];
                    const item = tab.componentItem;
                    if (!item.isClosable) {
                        isClosable = false;
                        break;
                    }
                }
            }
        }
        if (this._closeButton !== null) {
            setElementDisplayVisibility(this._closeButton.element, isClosable);
        }
        if (this._popoutButton !== null) {
            setElementDisplayVisibility(this._popoutButton.element, isClosable);
        }
        this._canRemoveComponent = isClosable || this._tabsContainer.tabCount > 1;
    }
    /** @internal */
    applyFocusedValue(value) {
        if (value) {
            this._element.classList.add("lm_focused" /* Focused */);
        }
        else {
            this._element.classList.remove("lm_focused" /* Focused */);
        }
    }
    /** @internal */
    processMaximised() {
        if (this._maximiseButton === undefined) {
            throw new UnexpectedUndefinedError('HPMAX16997');
        }
        else {
            this._maximiseButton.element.setAttribute('title', this._minimiseLabel);
        }
    }
    /** @internal */
    processMinimised() {
        if (this._maximiseButton === undefined) {
            throw new UnexpectedUndefinedError('HPMIN16997');
        }
        else {
            this._maximiseButton.element.setAttribute('title', this._maximiseLabel);
        }
    }
    /**
     * Pushes the tabs to the tab dropdown if the available space is not sufficient
     * @internal
     */
    updateTabSizes() {
        if (this._tabsContainer.tabCount > 0) {
            const headerHeight = this._show ? this._layoutManager.layoutConfig.dimensions.headerHeight : 0;
            if (this._leftRightSided) {
                this._element.style.height = '';
                this._element.style.width = numberToPixels(headerHeight);
            }
            else {
                this._element.style.width = '';
                this._element.style.height = numberToPixels(headerHeight);
            }
            let availableWidth;
            if (this._leftRightSided) {
                availableWidth = this._element.offsetHeight - this._controlsContainerElement.offsetHeight - this._tabControlOffset;
            }
            else {
                availableWidth = this._element.offsetWidth - this._controlsContainerElement.offsetWidth - this._tabControlOffset;
            }
            this._tabsContainer.updateTabSizes(availableWidth, this._getActiveComponentItemEvent());
        }
    }
    /** @internal */
    handleTabInitiatedComponentRemoveEvent(componentItem) {
        if (this._canRemoveComponent) {
            if (this._componentRemoveEvent === undefined) {
                throw new UnexpectedUndefinedError('HHTCE22294');
            }
            else {
                this._componentRemoveEvent(componentItem);
            }
        }
    }
    /** @internal */
    handleTabInitiatedComponentFocusEvent(componentItem) {
        if (this._componentFocusEvent === undefined) {
            throw new UnexpectedUndefinedError('HHTAE22294');
        }
        else {
            this._componentFocusEvent(componentItem);
        }
    }
    /** @internal */
    handleTabInitiatedDragStartEvent(x, y, dragListener, componentItem) {
        if (!this._canRemoveComponent) {
            dragListener.cancelDrag();
        }
        else {
            if (this._componentDragStartEvent === undefined) {
                throw new UnexpectedUndefinedError('HHTDSE22294');
            }
            else {
                this._componentDragStartEvent(x, y, dragListener, componentItem);
            }
        }
    }
    /** @internal */
    processTabDropdownActiveChanged() {
        setElementDisplayVisibility(this._tabDropdownButton.element, this._tabsContainer.dropdownActive);
    }
    /** @internal */
    handleButtonPopoutEvent() {
        if (this._layoutManager.layoutConfig.settings.popoutWholeStack) {
            if (this._popoutEvent === undefined) {
                throw new UnexpectedUndefinedError('HHBPOE17834');
            }
            else {
                this._popoutEvent();
            }
        }
        else {
            const activeComponentItem = this._getActiveComponentItemEvent();
            if (activeComponentItem) {
                activeComponentItem.popout();
            }
            // else: if the stack is empty there won't be an active item (and nothing to popout)
        }
    }
    /** @internal */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleButtonMaximiseToggleEvent(ev) {
        if (this._maximiseToggleEvent === undefined) {
            throw new UnexpectedUndefinedError('HHBMTE16834');
        }
        else {
            this._maximiseToggleEvent();
        }
    }
    /**
     * Invoked when the header's background is clicked (not it's tabs or controls)
     * @internal
     */
    onClick(event) {
        if (event.target === this._element) {
            this.notifyClick(event);
        }
    }
    /**
     * Invoked when the header's background is touched (not it's tabs or controls)
     * @internal
     */
    onTouchStart(event) {
        if (event.target === this._element) {
            this.notifyTouchStart(event);
        }
    }
    /** @internal */
    notifyClick(ev) {
        if (this._clickEvent === undefined) {
            throw new UnexpectedUndefinedError('HNHC46834');
        }
        else {
            this._clickEvent(ev);
        }
    }
    /** @internal */
    notifyTouchStart(ev) {
        if (this._touchStartEvent === undefined) {
            throw new UnexpectedUndefinedError('HNHTS46834');
        }
        else {
            this._touchStartEvent(ev);
        }
    }
}
//# sourceMappingURL=header.js.map