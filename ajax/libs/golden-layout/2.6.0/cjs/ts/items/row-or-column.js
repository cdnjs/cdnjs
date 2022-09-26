"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowOrColumn = void 0;
const config_1 = require("../config/config");
const splitter_1 = require("../controls/splitter");
const internal_error_1 = require("../errors/internal-error");
const types_1 = require("../utils/types");
const utils_1 = require("../utils/utils");
const content_item_1 = require("./content-item");
/** @public */
class RowOrColumn extends content_item_1.ContentItem {
    /** @internal */
    constructor(isColumn, layoutManager, config, 
    /** @internal */
    _rowOrColumnParent) {
        super(layoutManager, config, _rowOrColumnParent, RowOrColumn.createElement(document, isColumn));
        this._rowOrColumnParent = _rowOrColumnParent;
        /** @internal */
        this._splitter = [];
        this.isRow = !isColumn;
        this.isColumn = isColumn;
        this._childElementContainer = this.element;
        this._splitterSize = layoutManager.layoutConfig.dimensions.borderWidth;
        this._splitterGrabSize = layoutManager.layoutConfig.dimensions.borderGrabWidth;
        this._isColumn = isColumn;
        this._dimension = isColumn ? 'height' : 'width';
        this._splitterPosition = null;
        this._splitterMinPosition = null;
        this._splitterMaxPosition = null;
        switch (config.type) {
            case types_1.ItemType.row:
            case types_1.ItemType.column:
                this._configType = config.type;
                break;
            default:
                throw new internal_error_1.AssertError('ROCCCT00925');
        }
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
        const createdItem = this.contentItems[index];
        if (content_item_1.ContentItem.isStack(createdItem) && (config_1.ItemConfig.isComponent(itemConfig))) {
            // createdItem is a Stack which was created to hold wanted component.  Return component
            return createdItem.contentItems[0];
        }
        else {
            return createdItem;
        }
    }
    addItem(itemConfig, index) {
        this.layoutManager.checkMinimiseMaximisedStack();
        const resolvedItemConfig = config_1.ItemConfig.resolve(itemConfig, false);
        const contentItem = this.layoutManager.createAndInitContentItem(resolvedItemConfig, this);
        return this.addChild(contentItem, index, false);
    }
    /**
     * Add a new contentItem to the Row or Column
     *
     * @param contentItem -
     * @param index - The position of the new item within the Row or Column.
     *                If no index is provided the item will be added to the end
     * @param suspendResize - If true the items won't be resized. This will leave the item in
     *                        an inconsistent state and is only intended to be used if multiple
     *                        children need to be added in one go and resize is called afterwards
     *
     * @returns
     */
    addChild(contentItem, index, suspendResize) {
        // contentItem = this.layoutManager._$normalizeContentItem(contentItem, this);
        if (index === undefined) {
            index = this.contentItems.length;
        }
        if (this.contentItems.length > 0) {
            const splitterElement = this.createSplitter(Math.max(0, index - 1)).element;
            if (index > 0) {
                this.contentItems[index - 1].element.insertAdjacentElement('afterend', splitterElement);
                splitterElement.insertAdjacentElement('afterend', contentItem.element);
            }
            else {
                this.contentItems[0].element.insertAdjacentElement('beforebegin', splitterElement);
                splitterElement.insertAdjacentElement('beforebegin', contentItem.element);
            }
        }
        else {
            this._childElementContainer.appendChild(contentItem.element);
        }
        super.addChild(contentItem, index);
        const newItemSize = (1 / this.contentItems.length) * 100;
        if (suspendResize === true) {
            this.emitBaseBubblingEvent('stateChanged');
            return index;
        }
        for (let i = 0; i < this.contentItems.length; i++) {
            const indexedContentItem = this.contentItems[i];
            if (indexedContentItem === contentItem) {
                contentItem.size = newItemSize;
            }
            else {
                const itemSize = indexedContentItem.size *= (100 - newItemSize) / 100;
                indexedContentItem.size = itemSize;
            }
        }
        this.updateSize(false);
        this.emitBaseBubblingEvent('stateChanged');
        return index;
    }
    /**
     * Removes a child of this element
     *
     * @param contentItem -
     * @param keepChild - If true the child will be removed, but not destroyed
     *
     */
    removeChild(contentItem, keepChild) {
        const index = this.contentItems.indexOf(contentItem);
        const splitterIndex = Math.max(index - 1, 0);
        if (index === -1) {
            throw new Error('Can\'t remove child. ContentItem is not child of this Row or Column');
        }
        /**
         * Remove the splitter before the item or after if the item happens
         * to be the first in the row/column
         */
        if (this._splitter[splitterIndex]) {
            this._splitter[splitterIndex].destroy();
            this._splitter.splice(splitterIndex, 1);
        }
        super.removeChild(contentItem, keepChild);
        if (this.contentItems.length === 1 && this.isClosable === true) {
            const childItem = this.contentItems[0];
            this.contentItems.length = 0;
            this._rowOrColumnParent.replaceChild(this, childItem, true);
        }
        else {
            this.updateSize(false);
            this.emitBaseBubblingEvent('stateChanged');
        }
    }
    /**
     * Replaces a child of this Row or Column with another contentItem
     */
    replaceChild(oldChild, newChild) {
        const size = oldChild.size;
        super.replaceChild(oldChild, newChild);
        newChild.size = size;
        this.updateSize(false);
        this.emitBaseBubblingEvent('stateChanged');
    }
    /**
     * Called whenever the dimensions of this item or one of its parents change
     */
    updateSize(force) {
        this.layoutManager.beginVirtualSizedContainerAdding();
        try {
            this.updateNodeSize();
            this.updateContentItemsSize(force);
        }
        finally {
            this.layoutManager.endVirtualSizedContainerAdding();
        }
    }
    /**
     * Invoked recursively by the layout manager. ContentItem.init appends
     * the contentItem's DOM elements to the container, RowOrColumn init adds splitters
     * in between them
     * @internal
     */
    init() {
        if (this.isInitialised === true)
            return;
        this.updateNodeSize();
        for (let i = 0; i < this.contentItems.length; i++) {
            this._childElementContainer.appendChild(this.contentItems[i].element);
        }
        super.init();
        for (let i = 0; i < this.contentItems.length - 1; i++) {
            this.contentItems[i].element.insertAdjacentElement('afterend', this.createSplitter(i).element);
        }
        this.initContentItems();
    }
    toConfig() {
        const result = {
            type: this.type,
            content: this.calculateConfigContent(),
            size: this.size,
            sizeUnit: this.sizeUnit,
            minSize: this.minSize,
            minSizeUnit: this.minSizeUnit,
            id: this.id,
            isClosable: this.isClosable,
        };
        return result;
    }
    /** @internal */
    setParent(parent) {
        this._rowOrColumnParent = parent;
        super.setParent(parent);
    }
    /** @internal */
    updateNodeSize() {
        if (this.contentItems.length > 0) {
            this.calculateRelativeSizes();
            this.setAbsoluteSizes();
        }
        this.emitBaseBubblingEvent('stateChanged');
        this.emit('resize');
    }
    /**
     * Turns the relative sizes calculated by calculateRelativeSizes into
     * absolute pixel values and applies them to the children's DOM elements
     *
     * Assigns additional pixels to counteract Math.floor
     * @internal
     */
    setAbsoluteSizes() {
        const absoluteSizes = this.calculateAbsoluteSizes();
        for (let i = 0; i < this.contentItems.length; i++) {
            if (absoluteSizes.additionalPixel - i > 0) {
                absoluteSizes.itemSizes[i]++;
            }
            if (this._isColumn) {
                (0, utils_1.setElementWidth)(this.contentItems[i].element, absoluteSizes.crossAxisSize);
                (0, utils_1.setElementHeight)(this.contentItems[i].element, absoluteSizes.itemSizes[i]);
            }
            else {
                (0, utils_1.setElementWidth)(this.contentItems[i].element, absoluteSizes.itemSizes[i]);
                (0, utils_1.setElementHeight)(this.contentItems[i].element, absoluteSizes.crossAxisSize);
            }
        }
    }
    /**
     * Calculates the absolute sizes of all of the children of this Item.
     * @returns Set with absolute sizes and additional pixels.
     * @internal
     */
    calculateAbsoluteSizes() {
        const totalSplitterSize = (this.contentItems.length - 1) * this._splitterSize;
        const { width: elementWidth, height: elementHeight } = (0, utils_1.getElementWidthAndHeight)(this.element);
        let totalSize;
        let crossAxisSize;
        if (this._isColumn) {
            totalSize = elementHeight - totalSplitterSize;
            crossAxisSize = elementWidth;
        }
        else {
            totalSize = elementWidth - totalSplitterSize;
            crossAxisSize = elementHeight;
        }
        let totalAssigned = 0;
        const itemSizes = [];
        for (let i = 0; i < this.contentItems.length; i++) {
            const contentItem = this.contentItems[i];
            let itemSize;
            if (contentItem.sizeUnit === types_1.SizeUnitEnum.Percent) {
                itemSize = Math.floor(totalSize * (contentItem.size / 100));
            }
            else {
                throw new internal_error_1.AssertError('ROCCAS6692');
            }
            totalAssigned += itemSize;
            itemSizes.push(itemSize);
        }
        const additionalPixel = Math.floor(totalSize - totalAssigned);
        return {
            itemSizes,
            additionalPixel,
            totalSize,
            crossAxisSize,
        };
    }
    /**
     * Calculates the relative sizes of all children of this Item. The logic
     * is as follows:
     *
     * - Add up the total size of all items that have a configured size
     *
     * - If the total == 100 (check for floating point errors)
     *        Excellent, job done
     *
     * - If the total is \> 100,
     *        set the size of items without set dimensions to 1/3 and add this to the total
     *        set the size off all items so that the total is hundred relative to their original size
     *
     * - If the total is \< 100
     *        If there are items without set dimensions, distribute the remainder to 100 evenly between them
     *        If there are no items without set dimensions, increase all items sizes relative to
     *        their original size so that they add up to 100
     *
     * @internal
     */
    calculateRelativeSizes() {
        let total = 0;
        const itemsWithFractionalSize = [];
        let totalFractionalSize = 0;
        for (let i = 0; i < this.contentItems.length; i++) {
            const contentItem = this.contentItems[i];
            const sizeUnit = contentItem.sizeUnit;
            switch (sizeUnit) {
                case types_1.SizeUnitEnum.Percent: {
                    total += contentItem.size;
                    break;
                }
                case types_1.SizeUnitEnum.Fractional: {
                    itemsWithFractionalSize.push(contentItem);
                    totalFractionalSize += contentItem.size;
                    break;
                }
                default:
                    throw new internal_error_1.AssertError('ROCCRS49110', JSON.stringify(contentItem));
            }
        }
        /**
         * Everything adds up to hundred, all good :-)
         */
        if (Math.round(total) === 100) {
            this.respectMinItemSize();
            return;
        }
        else {
            /**
             * Allocate the remaining size to the items with a fractional size
             */
            if (Math.round(total) < 100 && itemsWithFractionalSize.length > 0) {
                const fractionalAllocatedSize = 100 - total;
                for (let i = 0; i < itemsWithFractionalSize.length; i++) {
                    const contentItem = itemsWithFractionalSize[i];
                    contentItem.size = fractionalAllocatedSize * (contentItem.size / totalFractionalSize);
                    contentItem.sizeUnit = types_1.SizeUnitEnum.Percent;
                }
                this.respectMinItemSize();
                return;
            }
            else {
                /**
                 * If the total is > 100, but there are also items with a fractional size, assign another 50%
                 * to the fractional items
                 *
                 * This will be reset in the next step
                 */
                if (Math.round(total) > 100 && itemsWithFractionalSize.length > 0) {
                    for (let i = 0; i < itemsWithFractionalSize.length; i++) {
                        const contentItem = itemsWithFractionalSize[i];
                        contentItem.size = 50 * (contentItem.size / totalFractionalSize);
                        contentItem.sizeUnit = types_1.SizeUnitEnum.Percent;
                    }
                    total += 50;
                }
                /**
                 * Set every items size relative to 100 relative to its size to total
                 */
                for (let i = 0; i < this.contentItems.length; i++) {
                    const contentItem = this.contentItems[i];
                    contentItem.size = (contentItem.size / total) * 100;
                }
                this.respectMinItemSize();
            }
        }
    }
    /**
     * Adjusts the column widths to respect the dimensions minItemWidth if set.
     * @internal
     */
    respectMinItemSize() {
        const minItemSize = this.calculateContentItemMinSize(this);
        if (minItemSize <= 0 || this.contentItems.length <= 1) {
            return;
        }
        else {
            let totalOverMin = 0;
            let totalUnderMin = 0;
            const entriesOverMin = [];
            const allEntries = [];
            const absoluteSizes = this.calculateAbsoluteSizes();
            /**
             * Figure out how much we are under the min item size total and how much room we have to use.
             */
            for (let i = 0; i < absoluteSizes.itemSizes.length; i++) {
                const itemSize = absoluteSizes.itemSizes[i];
                let entry;
                if (itemSize < minItemSize) {
                    totalUnderMin += minItemSize - itemSize;
                    entry = {
                        size: minItemSize
                    };
                }
                else {
                    totalOverMin += itemSize - minItemSize;
                    entry = {
                        size: itemSize
                    };
                    entriesOverMin.push(entry);
                }
                allEntries.push(entry);
            }
            /**
             * If there is nothing under min, or there is not enough over to make up the difference, do nothing.
             */
            if (totalUnderMin === 0 || totalUnderMin > totalOverMin) {
                return;
            }
            else {
                /**
                 * Evenly reduce all columns that are over the min item width to make up the difference.
                 */
                const reducePercent = totalUnderMin / totalOverMin;
                let remainingSize = totalUnderMin;
                for (let i = 0; i < entriesOverMin.length; i++) {
                    const entry = entriesOverMin[i];
                    const reducedSize = Math.round((entry.size - minItemSize) * reducePercent);
                    remainingSize -= reducedSize;
                    entry.size -= reducedSize;
                }
                /**
                 * Take anything remaining from the last item.
                 */
                if (remainingSize !== 0) {
                    allEntries[allEntries.length - 1].size -= remainingSize;
                }
                /**
                 * Set every items size relative to 100 relative to its size to total
                 */
                for (let i = 0; i < this.contentItems.length; i++) {
                    const contentItem = this.contentItems[i];
                    contentItem.size = (allEntries[i].size / absoluteSizes.totalSize) * 100;
                }
            }
        }
    }
    /**
     * Instantiates a new Splitter, binds events to it and adds
     * it to the array of splitters at the position specified as the index argument
     *
     * What it doesn't do though is append the splitter to the DOM
     *
     * @param index - The position of the splitter
     *
     * @returns
     * @internal
     */
    createSplitter(index) {
        const splitter = new splitter_1.Splitter(this._isColumn, this._splitterSize, this._splitterGrabSize);
        splitter.on('drag', (offsetX, offsetY) => this.onSplitterDrag(splitter, offsetX, offsetY));
        splitter.on('dragStop', () => this.onSplitterDragStop(splitter));
        splitter.on('dragStart', () => this.onSplitterDragStart(splitter));
        this._splitter.splice(index, 0, splitter);
        return splitter;
    }
    /**
     * Locates the instance of Splitter in the array of
     * registered splitters and returns a map containing the contentItem
     * before and after the splitters, both of which are affected if the
     * splitter is moved
     *
     * @returns A map of contentItems that the splitter affects
     * @internal
     */
    getSplitItems(splitter) {
        const index = this._splitter.indexOf(splitter);
        return {
            before: this.contentItems[index],
            after: this.contentItems[index + 1]
        };
    }
    calculateContentItemMinSize(contentItem) {
        const minSize = contentItem.minSize;
        if (minSize !== undefined) {
            if (contentItem.minSizeUnit === types_1.SizeUnitEnum.Pixel) {
                return minSize;
            }
            else {
                throw new internal_error_1.AssertError('ROCGMD98831', JSON.stringify(contentItem));
            }
        }
        else {
            const dimensions = this.layoutManager.layoutConfig.dimensions;
            return this._isColumn ? dimensions.defaultMinItemHeight : dimensions.defaultMinItemWidth;
        }
    }
    /**
     * Gets the minimum dimensions for the given item configuration array
     * @internal
     */
    calculateContentItemsTotalMinSize(contentItems) {
        let totalMinSize = 0;
        for (const contentItem of contentItems) {
            totalMinSize += this.calculateContentItemMinSize(contentItem);
        }
        return totalMinSize;
    }
    /**
     * Invoked when a splitter's dragListener fires dragStart. Calculates the splitters
     * movement area once (so that it doesn't need calculating on every mousemove event)
     * @internal
     */
    onSplitterDragStart(splitter) {
        const items = this.getSplitItems(splitter);
        const beforeWidth = (0, utils_1.pixelsToNumber)(items.before.element.style[this._dimension]);
        const afterSize = (0, utils_1.pixelsToNumber)(items.after.element.style[this._dimension]);
        const beforeMinSize = this.calculateContentItemsTotalMinSize(items.before.contentItems);
        const afterMinSize = this.calculateContentItemsTotalMinSize(items.after.contentItems);
        this._splitterPosition = 0;
        this._splitterMinPosition = -1 * (beforeWidth - beforeMinSize);
        this._splitterMaxPosition = afterSize - afterMinSize;
    }
    /**
     * Invoked when a splitter's DragListener fires drag. Updates the splitter's DOM position,
     * but not the sizes of the elements the splitter controls in order to minimize resize events
     *
     * @param splitter -
     * @param offsetX - Relative pixel values to the splitter's original position. Can be negative
     * @param offsetY - Relative pixel values to the splitter's original position. Can be negative
     * @internal
     */
    onSplitterDrag(splitter, offsetX, offsetY) {
        let offset = this._isColumn ? offsetY : offsetX;
        if (this._splitterMinPosition === null || this._splitterMaxPosition === null) {
            throw new internal_error_1.UnexpectedNullError('ROCOSD59226');
        }
        offset = Math.max(offset, this._splitterMinPosition);
        offset = Math.min(offset, this._splitterMaxPosition);
        this._splitterPosition = offset;
        const offsetPixels = (0, utils_1.numberToPixels)(offset);
        if (this._isColumn) {
            splitter.element.style.top = offsetPixels;
        }
        else {
            splitter.element.style.left = offsetPixels;
        }
    }
    /**
     * Invoked when a splitter's DragListener fires dragStop. Resets the splitters DOM position,
     * and applies the new sizes to the elements before and after the splitter and their children
     * on the next animation frame
     * @internal
     */
    onSplitterDragStop(splitter) {
        if (this._splitterPosition === null) {
            throw new internal_error_1.UnexpectedNullError('ROCOSDS66932');
        }
        else {
            const items = this.getSplitItems(splitter);
            const sizeBefore = (0, utils_1.pixelsToNumber)(items.before.element.style[this._dimension]);
            const sizeAfter = (0, utils_1.pixelsToNumber)(items.after.element.style[this._dimension]);
            const splitterPositionInRange = (this._splitterPosition + sizeBefore) / (sizeBefore + sizeAfter);
            const totalRelativeSize = items.before.size + items.after.size;
            items.before.size = splitterPositionInRange * totalRelativeSize;
            items.after.size = (1 - splitterPositionInRange) * totalRelativeSize;
            splitter.element.style.top = (0, utils_1.numberToPixels)(0);
            splitter.element.style.left = (0, utils_1.numberToPixels)(0);
            globalThis.requestAnimationFrame(() => this.updateSize(false));
        }
    }
}
exports.RowOrColumn = RowOrColumn;
/** @public */
(function (RowOrColumn) {
    /** @internal */
    function getElementDimensionSize(element, dimension) {
        if (dimension === 'width') {
            return (0, utils_1.getElementWidth)(element);
        }
        else {
            return (0, utils_1.getElementHeight)(element);
        }
    }
    RowOrColumn.getElementDimensionSize = getElementDimensionSize;
    /** @internal */
    function setElementDimensionSize(element, dimension, value) {
        if (dimension === 'width') {
            return (0, utils_1.setElementWidth)(element, value);
        }
        else {
            return (0, utils_1.setElementHeight)(element, value);
        }
    }
    RowOrColumn.setElementDimensionSize = setElementDimensionSize;
    /** @internal */
    function createElement(document, isColumn) {
        const element = document.createElement('div');
        element.classList.add("lm_item" /* Item */);
        if (isColumn) {
            element.classList.add("lm_column" /* Column */);
        }
        else {
            element.classList.add("lm_row" /* Row */);
        }
        return element;
    }
    RowOrColumn.createElement = createElement;
})(RowOrColumn = exports.RowOrColumn || (exports.RowOrColumn = {}));
//# sourceMappingURL=row-or-column.js.map