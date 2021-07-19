"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroundItem = void 0;
const config_1 = require("../config/config");
const resolved_config_1 = require("../config/resolved-config");
const internal_error_1 = require("../errors/internal-error");
const types_1 = require("../utils/types");
const utils_1 = require("../utils/utils");
const component_item_1 = require("./component-item");
const component_parentable_item_1 = require("./component-parentable-item");
const content_item_1 = require("./content-item");
const row_or_column_1 = require("./row-or-column");
/**
 * GroundItem is the ContentItem whose one child is the root ContentItem (Root is planted in Ground).
 * (Previously it was called root however this was incorrect as its child is the root item)
 * There is only one instance of GroundItem and it is automatically created by the Layout Manager
 * @internal
 */
class GroundItem extends component_parentable_item_1.ComponentParentableItem {
    constructor(layoutManager, rootItemConfig, containerElement) {
        super(layoutManager, resolved_config_1.ResolvedGroundItemConfig.create(rootItemConfig), null, GroundItem.createElement(document));
        this.isGround = true;
        this._childElementContainer = this.element;
        this._containerElement = containerElement;
        this._containerElement.appendChild(this.element);
    }
    init() {
        if (this.isInitialised === true)
            return;
        this.updateNodeSize();
        for (let i = 0; i < this.contentItems.length; i++) {
            this._childElementContainer.appendChild(this.contentItems[i].element);
        }
        super.init();
        this.initContentItems();
    }
    /**
     * Loads a new Layout
     * Internal only.  To load a new layout with API, use {@link (LayoutManager:class).loadLayout}
     */
    loadRoot(rootItemConfig) {
        // Remove existing root if it exists
        this.clearRoot();
        if (rootItemConfig !== undefined) {
            const rootContentItem = this.layoutManager.createAndInitContentItem(rootItemConfig, this);
            this.addChild(rootContentItem, 0);
        }
    }
    clearRoot() {
        // Remove existing root if it exists
        const contentItems = this.contentItems;
        switch (contentItems.length) {
            case 0: {
                return;
            }
            case 1: {
                const existingRootContentItem = contentItems[0];
                existingRootContentItem.remove();
                return;
            }
            default: {
                throw new internal_error_1.AssertError('GILR07721');
            }
        }
    }
    /**
     * Adds a ContentItem child to root ContentItem.
     * Internal only.  To load a add with API, use {@link (LayoutManager:class).addItem}
     * @returns -1 if added as root otherwise index in root ContentItem's content
     */
    addItem(itemConfig, index) {
        this.layoutManager.checkMinimiseMaximisedStack();
        const resolvedItemConfig = config_1.ItemConfig.resolve(itemConfig);
        let parent;
        if (this.contentItems.length > 0) {
            parent = this.contentItems[0];
        }
        else {
            parent = this;
        }
        if (parent.isComponent) {
            throw new Error('Cannot add item as child to ComponentItem');
        }
        else {
            const contentItem = this.layoutManager.createAndInitContentItem(resolvedItemConfig, parent);
            index = parent.addChild(contentItem, index);
            return (parent === this) ? -1 : index;
        }
    }
    loadComponentAsRoot(itemConfig) {
        // Remove existing root if it exists
        this.clearRoot();
        const resolvedItemConfig = config_1.ItemConfig.resolve(itemConfig);
        if (resolvedItemConfig.maximised) {
            throw new Error('Root Component cannot be maximised');
        }
        else {
            const rootContentItem = new component_item_1.ComponentItem(this.layoutManager, resolvedItemConfig, this);
            rootContentItem.init();
            this.addChild(rootContentItem, 0);
        }
    }
    /**
     * Adds a Root ContentItem.
     * Internal only.  To replace Root ContentItem with API, use {@link (LayoutManager:class).loadLayout}
     */
    addChild(contentItem, index) {
        if (this.contentItems.length > 0) {
            throw new Error('Ground node can only have a single child');
        }
        else {
            // contentItem = this.layoutManager._$normalizeContentItem(contentItem, this);
            this._childElementContainer.appendChild(contentItem.element);
            index = super.addChild(contentItem, index);
            this.updateSize();
            this.emitBaseBubblingEvent('stateChanged');
            return index;
        }
    }
    /** @internal */
    calculateConfigContent() {
        const contentItems = this.contentItems;
        const count = contentItems.length;
        const result = new Array(count);
        for (let i = 0; i < count; i++) {
            const item = contentItems[i];
            const itemConfig = item.toConfig();
            if (resolved_config_1.ResolvedRootItemConfig.isRootItemConfig(itemConfig)) {
                result[i] = itemConfig;
            }
            else {
                throw new internal_error_1.AssertError('RCCC66832');
            }
        }
        return result;
    }
    /** @internal */
    setSize(width, height) {
        if (width === undefined || height === undefined) {
            this.updateSize(); // For backwards compatibility with v1.x API
        }
        else {
            utils_1.setElementWidth(this.element, width);
            utils_1.setElementHeight(this.element, height);
            // GroundItem can be empty
            if (this.contentItems.length > 0) {
                utils_1.setElementWidth(this.contentItems[0].element, width);
                utils_1.setElementHeight(this.contentItems[0].element, height);
            }
            this.updateContentItemsSize();
        }
    }
    /**
     * Adds a Root ContentItem.
     * Internal only.  To replace Root ContentItem with API, use {@link (LayoutManager:class).updateRootSize}
     */
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
    createSideAreas() {
        const areaSize = 50;
        const oppositeSides = GroundItem.Area.oppositeSides;
        const result = new Array(Object.keys(oppositeSides).length);
        let idx = 0;
        for (const key in oppositeSides) {
            const side = key;
            const area = this.getElementArea();
            if (area === null) {
                throw new internal_error_1.UnexpectedNullError('RCSA77553');
            }
            else {
                area.side = side;
                if (oppositeSides[side][1] === '2')
                    area[side] = area[oppositeSides[side]] - areaSize;
                else
                    area[side] = area[oppositeSides[side]] + areaSize;
                area.surface = (area.x2 - area.x1) * (area.y2 - area.y1);
                result[idx++] = area;
            }
        }
        return result;
    }
    highlightDropZone(x, y, area) {
        this.layoutManager.tabDropPlaceholder.remove();
        super.highlightDropZone(x, y, area);
    }
    onDrop(contentItem, area) {
        if (contentItem.isComponent) {
            const itemConfig = resolved_config_1.ResolvedStackItemConfig.createDefault();
            // since ResolvedItemConfig.contentItems not set up, we need to add header from Component
            const component = contentItem;
            itemConfig.header = resolved_config_1.ResolvedHeaderedItemConfig.Header.createCopy(component.headerConfig);
            const stack = this.layoutManager.createAndInitContentItem(itemConfig, this);
            stack.addChild(contentItem);
            contentItem = stack;
        }
        if (this.contentItems.length === 0) {
            this.addChild(contentItem);
        }
        else {
            /*
             * If the contentItem that's being dropped is not dropped on a Stack (cases which just passed above and
             * which would wrap the contentItem in a Stack) we need to check whether contentItem is a RowOrColumn.
             * If it is, we need to re-wrap it in a Stack like it was when it was dragged by its Tab (it was dragged!).
             */
            if (contentItem.type === types_1.ItemType.row || contentItem.type === types_1.ItemType.column) {
                const itemConfig = resolved_config_1.ResolvedStackItemConfig.createDefault();
                const stack = this.layoutManager.createContentItem(itemConfig, this);
                stack.addChild(contentItem);
                contentItem = stack;
            }
            const type = area.side[0] == 'x' ? types_1.ItemType.row : types_1.ItemType.column;
            const dimension = area.side[0] == 'x' ? 'width' : 'height';
            const insertBefore = area.side[1] == '2';
            const column = this.contentItems[0];
            if (!(column instanceof row_or_column_1.RowOrColumn) || column.type !== type) {
                const itemConfig = resolved_config_1.ResolvedItemConfig.createDefault(type);
                const rowOrColumn = this.layoutManager.createContentItem(itemConfig, this);
                this.replaceChild(column, rowOrColumn);
                rowOrColumn.addChild(contentItem, insertBefore ? 0 : undefined, true);
                rowOrColumn.addChild(column, insertBefore ? undefined : 0, true);
                column[dimension] = 50;
                contentItem[dimension] = 50;
                rowOrColumn.updateSize();
            }
            else {
                const sibling = column.contentItems[insertBefore ? 0 : column.contentItems.length - 1];
                column.addChild(contentItem, insertBefore ? 0 : undefined, true);
                sibling[dimension] *= 0.5;
                contentItem[dimension] = sibling[dimension];
                column.updateSize();
            }
        }
    }
    // No ContentItem can dock with groundItem.  However Stack can have a GroundItem parent and Stack requires that
    // its parent implement dock() function.  Accordingly this function is implemented but throws an exception as it should
    // never be called
    dock() {
        throw new internal_error_1.AssertError('GID87731');
    }
    // No ContentItem can dock with groundItem.  However Stack can have a GroundItem parent and Stack requires that
    // its parent implement validateDocking() function.  Accordingly this function is implemented but throws an exception as it should
    // never be called
    validateDocking() {
        throw new internal_error_1.AssertError('GIVD87732');
    }
    getAllContentItems() {
        const result = [this];
        this.deepGetAllContentItems(this.contentItems, result);
        return result;
    }
    getConfigMaximisedItems() {
        const result = [];
        this.deepFilterContentItems(this.contentItems, result, (item) => {
            if (content_item_1.ContentItem.isStack(item) && item.initialWantMaximise) {
                return true;
            }
            else {
                if (content_item_1.ContentItem.isComponentItem(item) && item.initialWantMaximise) {
                    return true;
                }
                else {
                    return false;
                }
            }
        });
        return result;
    }
    getItemsByPopInParentId(popInParentId) {
        const result = [];
        this.deepFilterContentItems(this.contentItems, result, (item) => item.popInParentIds.includes(popInParentId));
        return result;
    }
    toConfig() {
        throw new Error('Cannot generate GroundItem config');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setActiveComponentItem(item, focus, suppressFocusEvent) {
        // only applicable if ComponentItem is root and then it always has focus
    }
    updateNodeSize() {
        const { width, height } = utils_1.getElementWidthAndHeight(this._containerElement);
        utils_1.setElementWidth(this.element, width);
        utils_1.setElementHeight(this.element, height);
        /*
         * GroundItem can be empty
         */
        if (this.contentItems.length > 0) {
            utils_1.setElementWidth(this.contentItems[0].element, width);
            utils_1.setElementHeight(this.contentItems[0].element, height);
        }
    }
    deepGetAllContentItems(content, result) {
        for (let i = 0; i < content.length; i++) {
            const contentItem = content[i];
            result.push(contentItem);
            this.deepGetAllContentItems(contentItem.contentItems, result);
        }
    }
    deepFilterContentItems(content, result, checkAcceptFtn) {
        for (let i = 0; i < content.length; i++) {
            const contentItem = content[i];
            if (checkAcceptFtn(contentItem)) {
                result.push(contentItem);
            }
            this.deepFilterContentItems(contentItem.contentItems, result, checkAcceptFtn);
        }
    }
}
exports.GroundItem = GroundItem;
/** @internal */
(function (GroundItem) {
    let Area;
    (function (Area) {
        Area.oppositeSides = {
            y2: 'y1',
            x2: 'x1',
            y1: 'y2',
            x1: 'x2',
        };
    })(Area = GroundItem.Area || (GroundItem.Area = {}));
    function createElement(document) {
        const element = document.createElement('div');
        element.classList.add("lm_goldenlayout" /* GoldenLayout */);
        element.classList.add("lm_item" /* Item */);
        element.classList.add("lm_root" /* Root */);
        return element;
    }
    GroundItem.createElement = createElement;
})(GroundItem = exports.GroundItem || (exports.GroundItem = {}));
//# sourceMappingURL=ground-item.js.map