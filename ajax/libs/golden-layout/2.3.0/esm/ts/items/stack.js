import { ItemConfig } from '../config/config';
import { ResolvedHeaderedItemConfig, ResolvedItemConfig, ResolvedStackItemConfig } from '../config/resolved-config';
import { Header } from '../controls/header';
import { AssertError, UnexpectedNullError, UnexpectedUndefinedError } from '../errors/internal-error';
import { EventEmitter } from '../utils/event-emitter';
import { getJQueryOffset } from '../utils/jquery-legacy';
import { ItemType, Side, WidthOrHeightPropertyName } from '../utils/types';
import { getElementHeight, getElementWidth, getElementWidthAndHeight, numberToPixels, setElementDisplayVisibility } from '../utils/utils';
import { ComponentItem } from './component-item';
import { ComponentParentableItem } from './component-parentable-item';
import { ContentItem } from './content-item';
/** @public */
export class Stack extends ComponentParentableItem {
    /** @internal */
    constructor(layoutManager, config, parent) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        super(layoutManager, config, parent, Stack.createElement(document));
        /** @internal */
        this._headerSideChanged = false;
        /** @internal */
        this._resizeListener = () => this.handleResize();
        /** @internal */
        this._maximisedListener = () => this.handleMaximised();
        /** @internal */
        this._minimisedListener = () => this.handleMinimised();
        this._headerConfig = config.header;
        const layoutHeaderConfig = layoutManager.layoutConfig.header;
        const configContent = config.content;
        // If stack has only one component, then we can also check this for header settings
        let componentHeaderConfig;
        if (configContent.length !== 1) {
            componentHeaderConfig = undefined;
        }
        else {
            const firstChildItemConfig = configContent[0];
            componentHeaderConfig = firstChildItemConfig.header; // will be undefined if not component (and wont be stack)
        }
        this._initialWantMaximise = config.maximised;
        this._initialActiveItemIndex = (_a = config.activeItemIndex) !== null && _a !== void 0 ? _a : 0; // make sure defined
        // check for defined value for each item in order of Stack (this Item), Component (first child), Manager.
        const show = (_d = (_c = (_b = this._headerConfig) === null || _b === void 0 ? void 0 : _b.show) !== null && _c !== void 0 ? _c : componentHeaderConfig === null || componentHeaderConfig === void 0 ? void 0 : componentHeaderConfig.show) !== null && _d !== void 0 ? _d : layoutHeaderConfig.show;
        const popout = (_g = (_f = (_e = this._headerConfig) === null || _e === void 0 ? void 0 : _e.popout) !== null && _f !== void 0 ? _f : componentHeaderConfig === null || componentHeaderConfig === void 0 ? void 0 : componentHeaderConfig.popout) !== null && _g !== void 0 ? _g : layoutHeaderConfig.popout;
        const maximise = (_k = (_j = (_h = this._headerConfig) === null || _h === void 0 ? void 0 : _h.maximise) !== null && _j !== void 0 ? _j : componentHeaderConfig === null || componentHeaderConfig === void 0 ? void 0 : componentHeaderConfig.maximise) !== null && _k !== void 0 ? _k : layoutHeaderConfig.maximise;
        const close = (_o = (_m = (_l = this._headerConfig) === null || _l === void 0 ? void 0 : _l.close) !== null && _m !== void 0 ? _m : componentHeaderConfig === null || componentHeaderConfig === void 0 ? void 0 : componentHeaderConfig.close) !== null && _o !== void 0 ? _o : layoutHeaderConfig.close;
        const minimise = (_r = (_q = (_p = this._headerConfig) === null || _p === void 0 ? void 0 : _p.minimise) !== null && _q !== void 0 ? _q : componentHeaderConfig === null || componentHeaderConfig === void 0 ? void 0 : componentHeaderConfig.minimise) !== null && _r !== void 0 ? _r : layoutHeaderConfig.minimise;
        const tabDropdown = (_u = (_t = (_s = this._headerConfig) === null || _s === void 0 ? void 0 : _s.tabDropdown) !== null && _t !== void 0 ? _t : componentHeaderConfig === null || componentHeaderConfig === void 0 ? void 0 : componentHeaderConfig.tabDropdown) !== null && _u !== void 0 ? _u : layoutHeaderConfig.tabDropdown;
        this._maximisedEnabled = maximise !== false;
        const headerSettings = {
            show: show !== false,
            side: show === false ? Side.top : show,
            popoutEnabled: popout !== false,
            popoutLabel: popout === false ? '' : popout,
            maximiseEnabled: this._maximisedEnabled,
            maximiseLabel: maximise === false ? '' : maximise,
            closeEnabled: close !== false,
            closeLabel: close === false ? '' : close,
            minimiseEnabled: true,
            minimiseLabel: minimise,
            tabDropdownEnabled: tabDropdown !== false,
            tabDropdownLabel: tabDropdown === false ? '' : tabDropdown,
        };
        this._header = new Header(layoutManager, this, headerSettings, config.isClosable && close !== false, () => this.getActiveComponentItem(), () => this.remove(), () => this.handlePopoutEvent(), () => this.toggleMaximise(), (ev) => this.handleHeaderClickEvent(ev), (ev) => this.handleHeaderTouchStartEvent(ev), (item) => this.handleHeaderComponentRemoveEvent(item), (item) => this.handleHeaderComponentFocusEvent(item), (x, y, dragListener, item) => this.handleHeaderComponentStartDragEvent(x, y, dragListener, item));
        // this._dropZones = {};
        this.isStack = true;
        this._childElementContainer = document.createElement('section');
        this._childElementContainer.classList.add("lm_items" /* Items */);
        this.on('resize', this._resizeListener);
        if (this._maximisedEnabled) {
            this.on('maximised', this._maximisedListener);
            this.on('minimised', this._minimisedListener);
        }
        this.element.appendChild(this._header.element);
        this.element.appendChild(this._childElementContainer);
        this.setupHeaderPosition();
        this._header.updateClosability();
    }
    get childElementContainer() { return this._childElementContainer; }
    get headerShow() { return this._header.show; }
    get headerSide() { return this._header.side; }
    get headerLeftRightSided() { return this._header.leftRightSided; }
    /** @internal */
    get contentAreaDimensions() { return this._contentAreaDimensions; }
    /** @internal */
    get initialWantMaximise() { return this._initialWantMaximise; }
    get isMaximised() { return this === this.layoutManager.maximisedStack; }
    get stackParent() {
        if (!this.parent) {
            throw new Error('Stack should always have a parent');
        }
        return this.parent;
    }
    /** @internal */
    updateSize() {
        this.layoutManager.beginVirtualSizedContainerAdding();
        try {
            this.updateNodeSize();
            this.updateContentItemsSize();
        }
        finally {
            this.layoutManager.endVirtualSizedContainerAdding();
        }
    }
    /** @internal */
    init() {
        if (this.isInitialised === true)
            return;
        this.updateNodeSize();
        for (let i = 0; i < this.contentItems.length; i++) {
            this._childElementContainer.appendChild(this.contentItems[i].element);
        }
        super.init();
        const contentItems = this.contentItems;
        const contentItemCount = contentItems.length;
        if (contentItemCount > 0) { // contentItemCount will be 0 on drag drop
            if (this._initialActiveItemIndex < 0 || this._initialActiveItemIndex >= contentItemCount) {
                throw new Error(`ActiveItemIndex out of range: ${this._initialActiveItemIndex} id: ${this.id}`);
            }
            else {
                for (let i = 0; i < contentItemCount; i++) {
                    const contentItem = contentItems[i];
                    if (!(contentItem instanceof ComponentItem)) {
                        throw new Error(`Stack Content Item is not of type ComponentItem: ${i} id: ${this.id}`);
                    }
                    else {
                        this._header.createTab(contentItem, i);
                        contentItem.hide();
                    }
                }
                this.setActiveComponentItem(contentItems[this._initialActiveItemIndex], false);
                this._header.updateTabSizes();
            }
        }
        this._header.updateClosability();
        this.initContentItems();
    }
    /** @deprecated Use {@link (Stack:class).setActiveComponentItem} */
    setActiveContentItem(item) {
        if (!ContentItem.isComponentItem(item)) {
            throw new Error('Stack.setActiveContentItem: item is not a ComponentItem');
        }
        else {
            this.setActiveComponentItem(item, false);
        }
    }
    setActiveComponentItem(componentItem, focus, suppressFocusEvent = false) {
        if (this._activeComponentItem !== componentItem) {
            if (this.contentItems.indexOf(componentItem) === -1) {
                throw new Error('componentItem is not a child of this stack');
            }
            else {
                if (this._activeComponentItem !== undefined) {
                    this._activeComponentItem.hide();
                }
                this._activeComponentItem = componentItem;
                this._header.processActiveComponentChanged(componentItem);
                componentItem.show();
                this.emit('activeContentItemChanged', componentItem);
                this.layoutManager.emit('activeContentItemChanged', componentItem);
                this.emitStateChangedEvent();
            }
        }
        if (this.focused || focus) {
            this.layoutManager.setFocusedComponentItem(componentItem, suppressFocusEvent);
        }
    }
    /** @deprecated Use {@link (Stack:class).getActiveComponentItem} */
    getActiveContentItem() {
        var _a;
        return (_a = this.getActiveComponentItem()) !== null && _a !== void 0 ? _a : null;
    }
    getActiveComponentItem() {
        return this._activeComponentItem;
    }
    /** @internal */
    focusActiveContentItem() {
        var _a;
        (_a = this._activeComponentItem) === null || _a === void 0 ? void 0 : _a.focus();
    }
    /** @internal */
    setFocusedValue(value) {
        this._header.applyFocusedValue(value);
        super.setFocusedValue(value);
    }
    /** @internal */
    setRowColumnClosable(value) {
        this._header.setRowColumnClosable(value);
    }
    newComponent(componentType, componentState, title, index) {
        const itemConfig = {
            type: 'component',
            componentType,
            componentState,
            title,
        };
        return this.newItem(itemConfig, index);
    }
    addComponent(componentType, componentState, title, index) {
        const itemConfig = {
            type: 'component',
            componentType,
            componentState,
            title,
        };
        return this.addItem(itemConfig, index);
    }
    newItem(itemConfig, index) {
        index = this.addItem(itemConfig, index);
        return this.contentItems[index];
    }
    addItem(itemConfig, index) {
        this.layoutManager.checkMinimiseMaximisedStack();
        const resolvedItemConfig = ItemConfig.resolve(itemConfig);
        const contentItem = this.layoutManager.createAndInitContentItem(resolvedItemConfig, this);
        return this.addChild(contentItem, index);
    }
    addChild(contentItem, index, focus = false) {
        if (index !== undefined && index > this.contentItems.length) {
            index -= 1;
            throw new AssertError('SAC99728'); // undisplayChild() removed so this condition should no longer occur
        }
        if (!(contentItem instanceof ComponentItem)) {
            throw new AssertError('SACC88532'); // Stacks can only have Component children
        }
        else {
            index = super.addChild(contentItem, index);
            this._childElementContainer.appendChild(contentItem.element);
            this._header.createTab(contentItem, index);
            this.setActiveComponentItem(contentItem, focus);
            this._header.updateTabSizes();
            this.updateSize();
            this._header.updateClosability();
            this.emitStateChangedEvent();
            return index;
        }
    }
    removeChild(contentItem, keepChild) {
        const componentItem = contentItem;
        const index = this.contentItems.indexOf(componentItem);
        const stackWillBeDeleted = this.contentItems.length === 1;
        if (this._activeComponentItem === componentItem) {
            if (componentItem.focused) {
                componentItem.blur();
            }
            if (!stackWillBeDeleted) {
                // At this point we're already sure we have at least one content item left *after*
                // removing contentItem, so we can safely assume index 1 is a valid one if
                // the index of contentItem is 0, otherwise we just use the previous content item.
                const newActiveComponentIdx = index === 0 ? 1 : index - 1;
                this.setActiveComponentItem(this.contentItems[newActiveComponentIdx], false);
            }
        }
        this._header.removeTab(componentItem);
        super.removeChild(componentItem, keepChild);
        if (!stackWillBeDeleted) {
            this._header.updateClosability();
        }
        this.emitStateChangedEvent();
    }
    /**
     * Maximises the Item or minimises it if it is already maximised
     */
    toggleMaximise() {
        if (this.isMaximised) {
            this.minimise();
        }
        else {
            this.maximise();
        }
    }
    maximise() {
        if (!this.isMaximised) {
            this.layoutManager.setMaximisedStack(this);
            const contentItems = this.contentItems;
            const contentItemCount = contentItems.length;
            for (let i = 0; i < contentItemCount; i++) {
                const contentItem = contentItems[i];
                if (contentItem instanceof ComponentItem) {
                    contentItem.enterStackMaximised();
                }
                else {
                    throw new AssertError('SMAXI87773');
                }
            }
            this.emitStateChangedEvent();
        }
    }
    minimise() {
        if (this.isMaximised) {
            this.layoutManager.setMaximisedStack(undefined);
            const contentItems = this.contentItems;
            const contentItemCount = contentItems.length;
            for (let i = 0; i < contentItemCount; i++) {
                const contentItem = contentItems[i];
                if (contentItem instanceof ComponentItem) {
                    contentItem.exitStackMaximised();
                }
                else {
                    throw new AssertError('SMINI87773');
                }
            }
            this.emitStateChangedEvent();
        }
    }
    /** @internal */
    destroy() {
        var _a;
        if ((_a = this._activeComponentItem) === null || _a === void 0 ? void 0 : _a.focused) {
            this._activeComponentItem.blur();
        }
        super.destroy();
        this.off('resize', this._resizeListener);
        if (this._maximisedEnabled) {
            this.off('maximised', this._maximisedListener);
            this.off('minimised', this._minimisedListener);
        }
        this._header.destroy();
    }
    toConfig() {
        let activeItemIndex;
        if (this._activeComponentItem) {
            activeItemIndex = this.contentItems.indexOf(this._activeComponentItem);
            if (activeItemIndex < 0) {
                throw new Error('active component item not found in stack');
            }
        }
        if (this.contentItems.length > 0 && activeItemIndex === undefined) {
            throw new Error('expected non-empty stack to have an active component item');
        }
        else {
            const result = {
                type: 'stack',
                content: this.calculateConfigContent(),
                width: this.width,
                minWidth: this.minWidth,
                height: this.height,
                minHeight: this.minHeight,
                id: this.id,
                isClosable: this.isClosable,
                maximised: this.isMaximised,
                header: this.createHeaderConfig(),
                activeItemIndex,
            };
            return result;
        }
    }
    /**
     * Ok, this one is going to be the tricky one: The user has dropped a {@link (ContentItem:class)} onto this stack.
     *
     * It was dropped on either the stacks header or the top, right, bottom or left bit of the content area
     * (which one of those is stored in this._dropSegment). Now, if the user has dropped on the header the case
     * is relatively clear: We add the item to the existing stack... job done (might be good to have
     * tab reordering at some point, but lets not sweat it right now)
     *
     * If the item was dropped on the content part things are a bit more complicated. If it was dropped on either the
     * top or bottom region we need to create a new column and place the items accordingly.
     * Unless, of course if the stack is already within a column... in which case we want
     * to add the newly created item to the existing column...
     * either prepend or append it, depending on wether its top or bottom.
     *
     * Same thing for rows and left / right drop segments... so in total there are 9 things that can potentially happen
     * (left, top, right, bottom) * is child of the right parent (row, column) + header drop
     *
     * @internal
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDrop(contentItem, area) {
        /*
         * The item was dropped on the header area. Just add it as a child of this stack and
         * get the hell out of this logic
         */
        if (this._dropSegment === "header" /* Header */) {
            this.resetHeaderDropZone();
            if (this._dropIndex === undefined) {
                throw new UnexpectedUndefinedError('SODDI68990');
            }
            else {
                this.addChild(contentItem, this._dropIndex);
                return;
            }
        }
        /*
         * The stack is empty. Let's just add the element.
         */
        if (this._dropSegment === "body" /* Body */) {
            this.addChild(contentItem, 0, true);
            return;
        }
        /*
         * The item was dropped on the top-, left-, bottom- or right- part of the content. Let's
         * aggregate some conditions to make the if statements later on more readable
         */
        const isVertical = this._dropSegment === "top" /* Top */ || this._dropSegment === "bottom" /* Bottom */;
        const isHorizontal = this._dropSegment === "left" /* Left */ || this._dropSegment === "right" /* Right */;
        const insertBefore = this._dropSegment === "top" /* Top */ || this._dropSegment === "left" /* Left */;
        const hasCorrectParent = (isVertical && this.stackParent.isColumn) || (isHorizontal && this.stackParent.isRow);
        const dimension = isVertical ? 'height' : 'width';
        /*
         * The content item can be either a component or a stack. If it is a component, wrap it into a stack
         */
        if (contentItem.isComponent) {
            const itemConfig = ResolvedStackItemConfig.createDefault();
            itemConfig.header = this.createHeaderConfig();
            const stack = this.layoutManager.createAndInitContentItem(itemConfig, this);
            stack.addChild(contentItem);
            contentItem = stack;
        }
        /*
         * If the contentItem that's being dropped is not dropped on a Stack (cases which just passed above and
         * which would wrap the contentItem in a Stack) we need to check whether contentItem is a RowOrColumn.
         * If it is, we need to re-wrap it in a Stack like it was when it was dragged by its Tab (it was dragged!).
         */
        if (contentItem.type === ItemType.row || contentItem.type === ItemType.column) {
            const itemConfig = ResolvedStackItemConfig.createDefault();
            itemConfig.header = this.createHeaderConfig();
            const stack = this.layoutManager.createContentItem(itemConfig, this);
            stack.addChild(contentItem);
            contentItem = stack;
        }
        /*
         * If the item is dropped on top or bottom of a column or left and right of a row, it's already
         * layd out in the correct way. Just add it as a child
         */
        if (hasCorrectParent) {
            const index = this.stackParent.contentItems.indexOf(this);
            this.stackParent.addChild(contentItem, insertBefore ? index : index + 1, true);
            this[dimension] *= 0.5;
            contentItem[dimension] = this[dimension];
            this.stackParent.updateSize();
            /*
             * This handles items that are dropped on top or bottom of a row or left / right of a column. We need
             * to create the appropriate contentItem for them to live in
             */
        }
        else {
            const type = isVertical ? ItemType.column : ItemType.row;
            const itemConfig = ResolvedItemConfig.createDefault(type);
            const rowOrColumn = this.layoutManager.createContentItem(itemConfig, this);
            this.stackParent.replaceChild(this, rowOrColumn);
            rowOrColumn.addChild(contentItem, insertBefore ? 0 : undefined, true);
            rowOrColumn.addChild(this, insertBefore ? undefined : 0, true);
            this[dimension] = 50;
            contentItem[dimension] = 50;
            rowOrColumn.updateSize();
        }
    }
    /**
     * If the user hovers above the header part of the stack, indicate drop positions for tabs.
     * otherwise indicate which segment of the body the dragged item would be dropped on
     *
     * @param x - Absolute Screen X
     * @param y - Absolute Screen Y
     * @internal
     */
    highlightDropZone(x, y) {
        for (const key in this._contentAreaDimensions) {
            const segment = key;
            const area = this._contentAreaDimensions[segment].hoverArea;
            if (area.x1 < x && area.x2 > x && area.y1 < y && area.y2 > y) {
                if (segment === "header" /* Header */) {
                    this._dropSegment = "header" /* Header */;
                    this.highlightHeaderDropZone(this._header.leftRightSided ? y : x);
                }
                else {
                    this.resetHeaderDropZone();
                    this.highlightBodyDropZone(segment);
                }
                return;
            }
        }
    }
    /** @internal */
    getArea() {
        if (this.element.style.display === 'none') {
            return null;
        }
        const headerArea = super.getElementArea(this._header.element);
        const contentArea = super.getElementArea(this._childElementContainer);
        if (headerArea === null || contentArea === null) {
            throw new UnexpectedNullError('SGAHC13086');
        }
        const contentWidth = contentArea.x2 - contentArea.x1;
        const contentHeight = contentArea.y2 - contentArea.y1;
        this._contentAreaDimensions = {
            header: {
                hoverArea: {
                    x1: headerArea.x1,
                    y1: headerArea.y1,
                    x2: headerArea.x2,
                    y2: headerArea.y2
                },
                highlightArea: {
                    x1: headerArea.x1,
                    y1: headerArea.y1,
                    x2: headerArea.x2,
                    y2: headerArea.y2
                }
            }
        };
        /**
         * Highlight the entire body if the stack is empty
         */
        if (this.contentItems.length === 0) {
            this._contentAreaDimensions.body = {
                hoverArea: {
                    x1: contentArea.x1,
                    y1: contentArea.y1,
                    x2: contentArea.x2,
                    y2: contentArea.y2
                },
                highlightArea: {
                    x1: contentArea.x1,
                    y1: contentArea.y1,
                    x2: contentArea.x2,
                    y2: contentArea.y2
                }
            };
            return super.getElementArea(this.element);
        }
        else {
            this._contentAreaDimensions.left = {
                hoverArea: {
                    x1: contentArea.x1,
                    y1: contentArea.y1,
                    x2: contentArea.x1 + contentWidth * 0.25,
                    y2: contentArea.y2
                },
                highlightArea: {
                    x1: contentArea.x1,
                    y1: contentArea.y1,
                    x2: contentArea.x1 + contentWidth * 0.5,
                    y2: contentArea.y2
                }
            };
            this._contentAreaDimensions.top = {
                hoverArea: {
                    x1: contentArea.x1 + contentWidth * 0.25,
                    y1: contentArea.y1,
                    x2: contentArea.x1 + contentWidth * 0.75,
                    y2: contentArea.y1 + contentHeight * 0.5
                },
                highlightArea: {
                    x1: contentArea.x1,
                    y1: contentArea.y1,
                    x2: contentArea.x2,
                    y2: contentArea.y1 + contentHeight * 0.5
                }
            };
            this._contentAreaDimensions.right = {
                hoverArea: {
                    x1: contentArea.x1 + contentWidth * 0.75,
                    y1: contentArea.y1,
                    x2: contentArea.x2,
                    y2: contentArea.y2
                },
                highlightArea: {
                    x1: contentArea.x1 + contentWidth * 0.5,
                    y1: contentArea.y1,
                    x2: contentArea.x2,
                    y2: contentArea.y2
                }
            };
            this._contentAreaDimensions.bottom = {
                hoverArea: {
                    x1: contentArea.x1 + contentWidth * 0.25,
                    y1: contentArea.y1 + contentHeight * 0.5,
                    x2: contentArea.x1 + contentWidth * 0.75,
                    y2: contentArea.y2
                },
                highlightArea: {
                    x1: contentArea.x1,
                    y1: contentArea.y1 + contentHeight * 0.5,
                    x2: contentArea.x2,
                    y2: contentArea.y2
                }
            };
            return super.getElementArea(this.element);
        }
    }
    /**
     * Programmatically operate with header position.
     *
     * @param position -
     *
     * @returns previous header position
     * @internal
     */
    positionHeader(position) {
        if (this._header.side !== position) {
            this._header.setSide(position);
            this._headerSideChanged = true;
            this.setupHeaderPosition();
        }
    }
    /** @internal */
    updateNodeSize() {
        if (this.element.style.display !== 'none') {
            const content = getElementWidthAndHeight(this.element);
            if (this._header.show) {
                const dimension = this._header.leftRightSided ? WidthOrHeightPropertyName.width : WidthOrHeightPropertyName.height;
                content[dimension] -= this.layoutManager.layoutConfig.dimensions.headerHeight;
            }
            this._childElementContainer.style.width = numberToPixels(content.width);
            this._childElementContainer.style.height = numberToPixels(content.height);
            for (let i = 0; i < this.contentItems.length; i++) {
                this.contentItems[i].element.style.width = numberToPixels(content.width);
                this.contentItems[i].element.style.height = numberToPixels(content.height);
            }
            this.emit('resize');
            this.emitStateChangedEvent();
        }
    }
    /** @internal */
    highlightHeaderDropZone(x) {
        // Only walk over the visible tabs
        const tabsLength = this._header.lastVisibleTabIndex + 1;
        const dropTargetIndicator = this.layoutManager.dropTargetIndicator;
        if (dropTargetIndicator === null) {
            throw new UnexpectedNullError('SHHDZDTI97110');
        }
        let area;
        // Empty stack
        if (tabsLength === 0) {
            const headerOffset = getJQueryOffset(this._header.element);
            const elementHeight = getElementHeight(this._header.element);
            area = {
                x1: headerOffset.left,
                x2: headerOffset.left + 100,
                y1: headerOffset.top + elementHeight - 20,
                y2: headerOffset.top + elementHeight,
            };
        }
        else {
            let tabIndex = 0;
            // This indicates whether our cursor is exactly over a tab
            let isAboveTab = false;
            let tabTop;
            let tabLeft;
            let tabWidth;
            let tabElement;
            do {
                tabElement = this._header.tabs[tabIndex].element;
                const offset = getJQueryOffset(tabElement);
                if (this._header.leftRightSided) {
                    tabLeft = offset.top;
                    tabTop = offset.left;
                    tabWidth = getElementHeight(tabElement);
                }
                else {
                    tabLeft = offset.left;
                    tabTop = offset.top;
                    tabWidth = getElementWidth(tabElement);
                }
                if (x >= tabLeft && x < tabLeft + tabWidth) {
                    isAboveTab = true;
                }
                else {
                    tabIndex++;
                }
            } while (tabIndex < tabsLength && !isAboveTab);
            // If we're not above any tabs, or to the right of any tab, we are out of the area, so give up
            if (isAboveTab === false && x < tabLeft) {
                return;
            }
            const halfX = tabLeft + tabWidth / 2;
            if (x < halfX) {
                this._dropIndex = tabIndex;
                tabElement.insertAdjacentElement('beforebegin', this.layoutManager.tabDropPlaceholder);
            }
            else {
                this._dropIndex = Math.min(tabIndex + 1, tabsLength);
                tabElement.insertAdjacentElement('afterend', this.layoutManager.tabDropPlaceholder);
            }
            const tabDropPlaceholderOffset = getJQueryOffset(this.layoutManager.tabDropPlaceholder);
            const tabDropPlaceholderWidth = getElementWidth(this.layoutManager.tabDropPlaceholder);
            if (this._header.leftRightSided) {
                const placeHolderTop = tabDropPlaceholderOffset.top;
                area = {
                    x1: tabTop,
                    x2: tabTop + tabElement.clientHeight,
                    y1: placeHolderTop,
                    y2: placeHolderTop + tabDropPlaceholderWidth,
                };
            }
            else {
                const placeHolderLeft = tabDropPlaceholderOffset.left;
                area = {
                    x1: placeHolderLeft,
                    x2: placeHolderLeft + tabDropPlaceholderWidth,
                    y1: tabTop,
                    y2: tabTop + tabElement.clientHeight,
                };
            }
        }
        dropTargetIndicator.highlightArea(area);
        return;
    }
    /** @internal */
    resetHeaderDropZone() {
        this.layoutManager.tabDropPlaceholder.remove();
    }
    /** @internal */
    setupHeaderPosition() {
        setElementDisplayVisibility(this._header.element, this._header.show);
        this.element.classList.remove("lm_left" /* Left */, "lm_right" /* Right */, "lm_bottom" /* Bottom */);
        if (this._header.leftRightSided) {
            this.element.classList.add('lm_' + this._header.side);
        }
        //if ([Side.right, Side.bottom].includes(this._header.side)) {
        //    // move the header behind the content.
        //    this.element.appendChild(this._header.element);
        //}
        this.updateSize();
    }
    /** @internal */
    highlightBodyDropZone(segment) {
        if (this._contentAreaDimensions === undefined) {
            throw new UnexpectedUndefinedError('SHBDZC82265');
        }
        else {
            const highlightArea = this._contentAreaDimensions[segment].highlightArea;
            const dropTargetIndicator = this.layoutManager.dropTargetIndicator;
            if (dropTargetIndicator === null) {
                throw new UnexpectedNullError('SHBDZD96110');
            }
            else {
                dropTargetIndicator.highlightArea(highlightArea);
                this._dropSegment = segment;
            }
        }
    }
    /** @internal */
    handleResize() {
        this._header.updateTabSizes();
    }
    /** @internal */
    handleMaximised() {
        this._header.processMaximised();
    }
    /** @internal */
    handleMinimised() {
        this._header.processMinimised();
    }
    /** @internal */
    handlePopoutEvent() {
        this.popout();
    }
    /** @internal */
    handleHeaderClickEvent(ev) {
        const eventName = EventEmitter.headerClickEventName;
        const bubblingEvent = new EventEmitter.ClickBubblingEvent(eventName, this, ev);
        this.emit(eventName, bubblingEvent);
    }
    /** @internal */
    handleHeaderTouchStartEvent(ev) {
        const eventName = EventEmitter.headerTouchStartEventName;
        const bubblingEvent = new EventEmitter.TouchStartBubblingEvent(eventName, this, ev);
        this.emit(eventName, bubblingEvent);
    }
    /** @internal */
    handleHeaderComponentRemoveEvent(item) {
        this.removeChild(item, false);
    }
    /** @internal */
    handleHeaderComponentFocusEvent(item) {
        this.setActiveComponentItem(item, true);
    }
    /** @internal */
    handleHeaderComponentStartDragEvent(x, y, dragListener, componentItem) {
        if (this.isMaximised === true) {
            this.toggleMaximise();
        }
        this.layoutManager.startComponentDrag(x, y, dragListener, componentItem, this);
    }
    /** @internal */
    createHeaderConfig() {
        if (!this._headerSideChanged) {
            return ResolvedHeaderedItemConfig.Header.createCopy(this._headerConfig);
        }
        else {
            const show = this._header.show ? this._header.side : false;
            let result = ResolvedHeaderedItemConfig.Header.createCopy(this._headerConfig, show);
            if (result === undefined) {
                result = {
                    show,
                    popout: undefined,
                    maximise: undefined,
                    close: undefined,
                    minimise: undefined,
                    tabDropdown: undefined,
                };
            }
            return result;
        }
    }
    /** @internal */
    emitStateChangedEvent() {
        this.emitBaseBubblingEvent('stateChanged');
    }
}
/** @public */
(function (Stack) {
    /** @internal */
    function createElement(document) {
        const element = document.createElement('div');
        element.classList.add("lm_item" /* Item */);
        element.classList.add("lm_stack" /* Stack */);
        return element;
    }
    Stack.createElement = createElement;
})(Stack || (Stack = {}));
//# sourceMappingURL=stack.js.map