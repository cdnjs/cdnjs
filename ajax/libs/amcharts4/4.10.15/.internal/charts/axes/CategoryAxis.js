/**
 * Category axis module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Axis, AxisDataItem } from "./Axis";
import { AxisRendererX } from "./AxisRendererX";
import { AxisRendererY } from "./AxisRendererY";
import { registry } from "../../core/Registry";
import { Dictionary } from "../../core/utils/Dictionary";
import { CategoryAxisBreak } from "./CategoryAxisBreak";
import * as $math from "../../core/utils/Math";
import * as $type from "../../core/utils/Type";
import * as $iter from "../../core/utils/Iterator";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[CategoryAxis]].
 *
 * @see {@link DataItem}
 */
var CategoryAxisDataItem = /** @class */ (function (_super) {
    __extends(CategoryAxisDataItem, _super);
    /**
     * Constructor
     */
    function CategoryAxisDataItem() {
        var _this = _super.call(this) || this;
        _this.seriesDataItems = {};
        _this.className = "CategoryAxisDataItem";
        _this.text = "{category}";
        _this.locations.category = 0;
        _this.locations.endCategory = 1;
        _this.deltaPosition = 0;
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(CategoryAxisDataItem.prototype, "category", {
        /**
         * @return Category
         */
        get: function () {
            if (this._adapterO) {
                if (this._adapterO.isEnabled("category")) {
                    return this._adapterO.apply("category", this.properties.category);
                }
            }
            return this.properties.category;
        },
        /**
         * Category.
         *
         * @param value  Category
         */
        set: function (value) {
            var oldCategory = this.properties.category;
            this.setProperty("category", value);
            if ($type.hasValue(oldCategory) && oldCategory != value) {
                if (this.component) {
                    this.component.validateDataElement(this);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoryAxisDataItem.prototype, "endCategory", {
        /**
         * @return End category
         */
        get: function () {
            return this.properties.endCategory;
        },
        /**
         * End category.
         *
         * Used for items that span several categories, like [[CategoryAxisBreak]].
         *
         * @param value  End category
         */
        set: function (value) {
            this.setProperty("endCategory", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoryAxisDataItem.prototype, "deltaPosition", {
        get: function () {
            return this.properties.deltaCoordinate;
        },
        set: function (value) {
            if (value != this.properties.deltaCoordinate) {
                this.setProperty("deltaCoordinate", value);
                if (this.component) {
                    this.component.invalidateDataItems();
                    this.component.invalidateSeries();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    return CategoryAxisDataItem;
}(AxisDataItem));
export { CategoryAxisDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to create a category-based axis for the chart.
 *
 * ```TypeScript
 * // Create the axis
 * let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
 *
 * // Set settings
 * xAxis.title.text = "Clients";
 * ```
 * ```JavaScript
 * // Create the axis
 * var valueAxis = chart.xAxes.push(new am4charts.CategoryAxis());
 *
 * // Set settings
 * valueAxis.title.text = "Clients";
 * ```
 * ```JSON
 * "xAxes": [{
 *   "type": "CategoryAxis",
 *   "title": {
 *     "text": "Clients"
 *   }
 * }]
 * ```
 *
 * @see {@link ICategoryAxisEvents} for a list of available Events
 * @see {@link ICategoryAxisAdapters} for a list of available Adapters
 * @important
 */
var CategoryAxis = /** @class */ (function (_super) {
    __extends(CategoryAxis, _super);
    /**
     * Constructor
     */
    function CategoryAxis() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * A collection that holds Axis' data items sorted by each category.
         */
        _this.dataItemsByCategory = new Dictionary();
        _this.className = "CategoryAxis";
        // Set field name
        _this.axisFieldName = "category";
        _this._lastDataItem = _this.createDataItem();
        _this._lastDataItem.component = _this;
        _this._disposers.push(_this._lastDataItem);
        // Apply theme
        _this.applyTheme();
        var dataItemsByCategory = _this.dataItemsByCategory;
        _this.addDisposer(_this.mainDataSet.events.on("removed", function (event) {
            dataItemsByCategory.removeKey(event.oldValue.category);
        }));
        return _this;
    }
    /**
     * Returns a new/empty [[DataItem]] of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    CategoryAxis.prototype.createDataItem = function () {
        return new CategoryAxisDataItem();
    };
    /**
     * Returns a new/empty [[AxisBreak]] of the appropriate type.
     *
     * @return Axis break
     */
    CategoryAxis.prototype.createAxisBreak = function () {
        return new CategoryAxisBreak();
    };
    /**
     * Processes a related series' data item.
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param dataItem  Data item
     */
    CategoryAxis.prototype.processSeriesDataItem = function (dataItem, axisLetter) {
        _super.prototype.processSeriesDataItem.call(this, dataItem, axisLetter);
        var category = dataItem["category" + this.axisLetter];
        if ($type.hasValue(category)) {
            var categoryAxisDataItem = this.dataItemsByCategory.getKey(category);
            if (categoryAxisDataItem) {
                var seriesId = dataItem.component.uid;
                var seriesDataItems = categoryAxisDataItem.seriesDataItems[seriesId];
                if (!seriesDataItems) {
                    seriesDataItems = [];
                    categoryAxisDataItem.seriesDataItems[seriesId] = seriesDataItems;
                }
                seriesDataItems.push(dataItem);
            }
        }
        else {
            dataItem.component.dataItems.remove(dataItem);
        }
    };
    /**
     * Validates the data range.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     */
    CategoryAxis.prototype.validateDataRange = function () {
        var _this = this;
        _super.prototype.validateDataRange.call(this);
        $iter.each(this._series.iterator(), function (series) {
            if ((series.xAxis instanceof CategoryAxis) && (series.yAxis instanceof CategoryAxis)) {
                series.invalidateDataRange();
            }
            else {
                var startIndex = _this.positionToIndex(_this.start);
                var endIndex = _this.positionToIndex(_this.end);
                if (endIndex >= _this.dataItems.length) {
                    endIndex--;
                }
                var seriesId = series.uid;
                var minIndex = void 0;
                var maxIndex = void 0;
                for (var i = startIndex; i <= endIndex; i++) {
                    var axisDataItem = _this.dataItems.getIndex(i);
                    if (axisDataItem) {
                        var seriesDataItems = axisDataItem.seriesDataItems[seriesId];
                        if (seriesDataItems) {
                            for (var i_1 = 0; i_1 < seriesDataItems.length; i_1++) {
                                var seriesDataItem = seriesDataItems[i_1];
                                if (seriesDataItem) {
                                    var index = seriesDataItem.index;
                                    if (!$type.isNumber(minIndex) || index < minIndex) {
                                        minIndex = index;
                                    }
                                    if (!$type.isNumber(maxIndex) || index > maxIndex) {
                                        maxIndex = index;
                                    }
                                }
                            }
                        }
                    }
                }
                if ($type.isNumber(minIndex)) {
                    series.startIndex = minIndex;
                }
                else {
                    series.start = _this.start;
                }
                if ($type.isNumber(maxIndex)) {
                    series.endIndex = maxIndex + 1;
                }
                else {
                    series.end = _this.end;
                }
                // range might not change, but axis breaks might.
                if (_this._axisBreaks && _this._axisBreaks.length > 0) {
                    series.invalidateDataRange();
                }
            }
        });
    };
    /**
     * Validates the whole axis. Causes it to redraw.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     */
    CategoryAxis.prototype.validate = function () {
        var _this = this;
        _super.prototype.validate.call(this);
        var dataCount = this.dataItems.length;
        var startIndex = $math.fitToRange(Math.floor(this.start * dataCount - 1), 0, dataCount);
        var endIndex = $math.fitToRange(Math.ceil(this.end * dataCount), 0, dataCount);
        if (this.renderer.invalid) {
            this.renderer.validate();
        }
        // find frequency at which we'll show items
        var maxCount = this.renderer.axisLength / Math.max(this.renderer.minGridDistance, 1 / Number.MAX_SAFE_INTEGER);
        var frequency = Math.min(this.dataItems.length, Math.ceil((endIndex - startIndex) / maxCount));
        this._startIndex = Math.floor(startIndex / frequency) * frequency;
        this._endIndex = Math.ceil(this.end * dataCount);
        this.fixAxisBreaks();
        if (this._startIndex == this._endIndex) {
            this._endIndex++;
        }
        this._frequency = frequency;
        if (this.axisLength <= 0) {
            return;
        }
        this.maxZoomFactor = this.dataItems.length;
        if (this.dataItems.length <= 0) {
            this.maxZoomFactor = 1;
        }
        this.resetIterators();
        // it's important to use protected variables here, as getters will return 0 - length
        // TODO use iterator instead
        // @ todo: not solved cat axis item fading
        startIndex = $math.max(0, this._startIndex - this._frequency);
        endIndex = $math.min(this.dataItems.length, this._endIndex + this._frequency);
        var itemIndex = 0;
        for (var i = 0; i < startIndex; i++) {
            var dataItem = this.dataItems.getIndex(i);
            dataItem.__disabled = true;
        }
        for (var i = endIndex, len = this.dataItems.length; i < len; i++) {
            var dataItem = this.dataItems.getIndex(i);
            dataItem.__disabled = true;
        }
        for (var i = startIndex; i < endIndex; i++) {
            if (i < this.dataItems.length) {
                var dataItem = this.dataItems.getIndex(i);
                if (i / this._frequency == Math.round(i / this._frequency)) {
                    var axisBreak = this.isInBreak(i);
                    if (!axisBreak) {
                        this.appendDataItem(dataItem);
                        this.validateDataElement(dataItem, itemIndex);
                    }
                    itemIndex++;
                }
                else {
                    //previously we disabled all before, but this is better for cpu
                    //this.validateDataElement(dataItem, itemIndex); // helps to solve shrinking // not good - creates all items
                    dataItem.__disabled = true;
                }
            }
        }
        this.appendDataItem(this._lastDataItem);
        this.validateDataElement(this._lastDataItem, itemIndex + 1, this.dataItems.length);
        if (this._axisBreaks) {
            var axisBreaks = this._axisBreaks;
            axisBreaks.each(function (axisBreak) {
                var adjustedStartValue = axisBreak.adjustedStartValue;
                var adjustedEndValue = axisBreak.adjustedEndValue;
                if ($math.intersect({ start: adjustedStartValue, end: adjustedEndValue }, { start: _this._startIndex, end: _this._endIndex })) {
                    for (var b = adjustedStartValue; b <= adjustedEndValue; b++) {
                        var dataItem = _this.dataItems.getIndex(b);
                        dataItem.__disabled = true;
                    }
                    var frequency_1 = $math.fitToRange(Math.ceil(_this._frequency / axisBreak.breakSize), 1, adjustedEndValue - adjustedStartValue);
                    var itemIndex_1 = 0;
                    if (axisBreak.breakSize > 0) {
                        // TODO use iterator instead
                        for (var b = adjustedStartValue; b <= adjustedEndValue; b = b + frequency_1) {
                            var dataItem = _this.dataItems.getIndex(b);
                            dataItem.__disabled = false;
                            _this.appendDataItem(dataItem);
                            _this.validateDataElement(dataItem, itemIndex_1);
                            itemIndex_1++;
                        }
                    }
                }
            });
        }
        this.validateBreaks();
        this.validateAxisRanges();
        this.ghostLabel.invalidate(); // solves font issue
        this.renderer.invalidateLayout();
    };
    /**
     * [validateDataElement description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param dataItem   [description]
     * @param itemIndex  [description]
     */
    CategoryAxis.prototype.validateDataElement = function (dataItem, itemIndex, index) {
        _super.prototype.validateDataElement.call(this, dataItem);
        dataItem.itemIndex = this._axisItemCount;
        this._axisItemCount++;
        //dataItem.__disabled = false;
        var renderer = this.renderer;
        if (!$type.isNumber(index)) {
            index = this.categoryToIndex(dataItem.category);
        }
        var endIndex = this.categoryToIndex(dataItem.endCategory);
        if (!$type.isNumber(endIndex)) {
            endIndex = index;
        }
        var position = this.indexToPosition(index, dataItem.locations.category);
        var endPosition = this.indexToPosition(endIndex, dataItem.locations.endCategory);
        dataItem.position = position;
        var fillEndIndex;
        var fillPosition;
        var fillEndPosition;
        if (dataItem.isRange) {
            fillEndIndex = endIndex;
            fillPosition = this.indexToPosition(index, dataItem.locations.category);
            fillEndPosition = this.indexToPosition(fillEndIndex, dataItem.locations.endCategory);
        }
        dataItem.point = renderer.positionToPoint(position);
        var tick = dataItem.tick;
        if (tick && !tick.disabled) {
            renderer.updateTickElement(tick, position, endPosition);
        }
        var grid = dataItem.grid;
        if (grid && !grid.disabled) {
            renderer.updateGridElement(grid, position, endPosition);
        }
        var label = dataItem.label;
        if (label && !label.disabled) {
            // theorethically this might result problems if category text changes, the range text won't change. But otherwise range.label.text = "custom text" won't work, which is not intuitive.
            if (!dataItem.isRange || label.text == undefined) {
                dataItem.text = dataItem.text;
            }
            renderer.updateLabelElement(label, position, endPosition);
            if ((renderer instanceof AxisRendererY && dataItem.label.measuredWidth > this.ghostLabel.measuredWidth) || (renderer instanceof AxisRendererX && dataItem.label.measuredHeight > this.ghostLabel.measuredHeight)) {
                if (dataItem.label.html) {
                    this.ghostLabel.html = dataItem.label.currentText;
                }
                else {
                    this.ghostLabel.text = dataItem.label.currentText;
                }
            }
        }
        var fill = dataItem.axisFill;
        if (fill && !fill.disabled) {
            if (!dataItem.isRange) {
                fillEndIndex = index + this._frequency;
                fillPosition = this.indexToPosition(index, fill.location);
                fillEndPosition = this.indexToPosition(fillEndIndex, fill.location);
            }
            renderer.updateFillElement(fill, fillPosition, fillEndPosition);
            if (!dataItem.isRange) {
                this.fillRule(dataItem, itemIndex);
            }
        }
        if (dataItem.bullet) {
            renderer.updateBullet(dataItem.bullet, position, endPosition);
        }
        var mask = dataItem.mask;
        if (mask) {
            renderer.updateFillElement(mask, fillPosition, fillEndPosition);
        }
    };
    /**
     * @ignore
     */
    CategoryAxis.prototype.disposeData = function () {
        this.dataItemsByCategory.clear();
        _super.prototype.disposeData.call(this);
    };
    /**
     * Processes the axis data item.
     *
     * @ignore Exclude from docs
     * @param dataItem     Data item
     * @param dataContext  The raw data that corresponds to this data item
     */
    CategoryAxis.prototype.processDataItem = function (dataItem, dataContext) {
        if (dataItem) {
            // creat a collection for fast access
            _super.prototype.processDataItem.call(this, dataItem, dataContext);
            // check if such category already exists
            //let existingDataItem: CategoryAxisDataItem = this.dataItemsByCategory.getKey(dataItem.category);
            //if (existingDataItem && existingDataItem != dataItem) {
            //	this.dataItems.remove(existingDataItem);
            //}
            if ($type.hasValue(dataItem.category)) {
                this.dataItemsByCategory.setKey(dataItem.category, dataItem);
            }
        }
    };
    CategoryAxis.prototype.getDataItem = function (dataContext) {
        var category = (dataContext[this.dataFields.category]);
        if ($type.hasValue(category)) {
            var dataItem = this.dataItemsByCategory.getKey(category);
            if (dataItem) {
                return dataItem;
            }
            else {
                return this.dataItems.create();
            }
        }
    };
    /**
     * Converts a category index to an actual screen coordinate on the axis.
     *
     * `location` identifies relative location within category. 0 - beginning,
     * 0.5 - middle, 1 - end, and anything inbetween.
     *
     * @param index     Index
     * @param location  Location (0-1)
     * @return Position (px)
     */
    CategoryAxis.prototype.indexToPosition = function (index, location) {
        if (!$type.isNumber(location)) {
            location = 0.5;
        }
        var startIndex = this.startIndex;
        var endIndex = this.endIndex;
        var difference = this.adjustDifference(startIndex, endIndex);
        var startLocation = this.startLocation;
        var endLocation = this.endLocation;
        difference -= startLocation;
        difference -= (1 - endLocation);
        if (this._axisBreaks) {
            var axisBreaks = this._axisBreaks;
            $iter.eachContinue(axisBreaks.iterator(), function (axisBreak) {
                var breakStartIndex = axisBreak.adjustedStartValue;
                var breakEndIndex = axisBreak.adjustedEndValue;
                if (index < startIndex || !$type.isNumber(breakStartIndex) || !$type.isNumber(breakEndIndex)) {
                    return false;
                }
                if ($math.intersect({ start: breakStartIndex, end: breakEndIndex }, { start: startIndex, end: endIndex })) {
                    breakStartIndex = Math.max(startIndex, breakStartIndex);
                    breakEndIndex = Math.min(endIndex, breakEndIndex);
                    var breakSize = axisBreak.breakSize;
                    // value to the right of break end
                    if (index > breakEndIndex) {
                        startIndex += (breakEndIndex - breakStartIndex) * (1 - breakSize);
                    }
                    // value to the left of break start
                    else if (index < breakStartIndex) {
                    }
                    // value within break
                    else {
                        index = breakStartIndex + (index - breakStartIndex) * breakSize;
                    }
                }
                return true;
            });
        }
        var deltaPosition = 0;
        var dataItem = this.dataItems.getIndex(index);
        if (dataItem) {
            deltaPosition = dataItem.deltaPosition;
        }
        return $math.round(deltaPosition + (index + location - startLocation - startIndex) / difference, 5);
    };
    /**
     * Converts a string category name to relative position on axis.
     *
     * `location` identifies relative location within category. 0 - beginning,
     * 0.5 - middle, 1 - end, and anything inbetween.
     *
     * @param category  Category name
     * @param location  Location (0-1)
     * @return Position
     */
    CategoryAxis.prototype.categoryToPosition = function (category, location) {
        var index = this.categoryToIndex(category);
        return this.indexToPosition(index, location);
    };
    /**
     * Converts a string category name to a orientation point (x, y, angle) on axis
     *
     * `location` identifies relative location within category. 0 - beginning,
     * 0.5 - middle, 1 - end, and anything inbetween.
     * @param category  Category name
     * @param location  Location (0-1)
     * @return Orientation point
     */
    CategoryAxis.prototype.categoryToPoint = function (category, location) {
        var position = this.categoryToPosition(category, location);
        var point = this.renderer.positionToPoint(position);
        var angle = this.renderer.positionToAngle(position);
        return { x: point.x, y: point.y, angle: angle };
    };
    /**
     * Converts a string category name to a orientation point (x, y, angle) on axis
     *
     * `location` identifies relative location within category. 0 - beginning,
     * 0.5 - middle, 1 - end, and anything inbetween.
     * @param category  Category name
     * @param location  Location (0-1)
     * @return Orientation point
     */
    CategoryAxis.prototype.anyToPoint = function (category, location) {
        return this.categoryToPoint(category, location);
    };
    /**
     * Converts a string category name to relative position on axis.
     *
     * An alias to `categoryToPosition()`.
     *
     * @param category  Category name
     * @param location  Location (0-1)
     * @return Relative position
     */
    CategoryAxis.prototype.anyToPosition = function (category, location) {
        return this.categoryToPosition(category, location);
    };
    /**
     * Converts named category to an index of data item it corresponds to.
     *
     * @param category  Category
     * @return Data item index
     */
    CategoryAxis.prototype.categoryToIndex = function (category) {
        if ($type.hasValue(category)) {
            var dataItem = this.dataItemsByCategory.getKey(category);
            if (dataItem) {
                return dataItem.index;
            }
        }
    };
    /**
     * Zooms the axis to specific named ctaegories.
     *
     * @param startCategory  Start category
     * @param endCategory    End category
     */
    CategoryAxis.prototype.zoomToCategories = function (startCategory, endCategory) {
        this.zoomToIndexes(this.categoryToIndex(startCategory), this.categoryToIndex(endCategory) + 1);
    };
    /**
     * [getAnyRangePath description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param start         [description]
     * @param end           [description]
     * @param startLocation [description]
     * @param endLocation   [description]
     * @return [description]
     */
    CategoryAxis.prototype.getAnyRangePath = function (start, end, startLocation, endLocation) {
        var startPos = this.categoryToPosition(start, startLocation);
        var endPos = this.categoryToPosition(end, endLocation);
        return this.getPositionRangePath(startPos, endPos); // Base class (Axis) gets range shape from AxisRenderer
    };
    /**
     * Takes an absolute position (px) within axis and adjust it to a specific
     * `location` within category it corresponds to.
     *
     * @param position  Source position (px)
     * @param location  Location within category (0-1)
     * @return Adjusted position (px)
     */
    CategoryAxis.prototype.roundPosition = function (position, location) {
        var index = this.positionToIndex(position);
        return this.indexToPosition(index, location);
    };
    /**
     * Finds and returns first series data item with specific category
     * @param series    Target series
     * @param category  Category
     * @return XYSeriesDataItem data item
     */
    CategoryAxis.prototype.getFirstSeriesDataItem = function (series, category) {
        for (var i = 0; i < series.dataItems.length; i++) {
            var dataItem = series.dataItems.getIndex(i);
            if (series.xAxis == this) {
                if (dataItem.categoryX == category) {
                    return dataItem;
                }
            }
            if (series.yAxis == this) {
                if (dataItem.categoryY == category) {
                    return dataItem;
                }
            }
        }
    };
    /**
     * Finds and returns last series data item with specific category.
     * @param series    Target series
     * @param category  Category
     * @return XYSeriesDataItem data item
     */
    CategoryAxis.prototype.getLastSeriesDataItem = function (series, category) {
        for (var i = series.dataItems.length - 1; i >= 0; i--) {
            var dataItem = series.dataItems.getIndex(i);
            if (series.xAxis == this) {
                if (dataItem.categoryX == category) {
                    return dataItem;
                }
            }
            if (series.yAxis == this) {
                if (dataItem.categoryY == category) {
                    return dataItem;
                }
            }
        }
    };
    // todo: optimize
    CategoryAxis.prototype.getSeriesDataItemByCategory = function (category, series) {
        var _this = this;
        var seriesDataItem;
        series.dataItems.each(function (dataItem) {
            if (series.xAxis == _this) {
                if (dataItem.categoryX == category) {
                    seriesDataItem = dataItem;
                }
            }
            else if (series.yAxis == _this) {
                if (dataItem.categoryY == category) {
                    seriesDataItem = dataItem;
                }
            }
        });
        return seriesDataItem;
    };
    /**
     * Returns a data item from Series that corresponds to a specific absolute
     * position on the Axis.
     *
     * @param series    Target series
     * @param position  Position (px)
     * @return XYSeriesDataItem data item
     */
    CategoryAxis.prototype.getSeriesDataItem = function (series, position, findNearest) {
        var _this = this;
        if ($type.isNumber(position)) {
            var index_1 = this.positionToIndex(position);
            if (index_1 >= this.dataItems.length) {
                index_1--;
            }
            var dataItem = this.dataItems.getIndex(index_1);
            if (dataItem) {
                var category_1 = dataItem.category;
                var sdi_1;
                var seriesDataItem = series.dataItems.getIndex(index_1);
                if (seriesDataItem) {
                    if (series.xAxis == this) {
                        if (seriesDataItem.categoryX == category_1) {
                            return seriesDataItem;
                        }
                    }
                    if (series.yAxis == this) {
                        if (seriesDataItem.categoryY == category_1) {
                            return seriesDataItem;
                        }
                    }
                }
                series.dataItems.each(function (dataItem) {
                    if (series.xAxis == _this) {
                        if (dataItem.categoryX == category_1) {
                            if (!sdi_1) {
                                sdi_1 = dataItem;
                            }
                            if (Math.abs(index_1 - sdi_1.index) > Math.abs(index_1 - dataItem.index)) {
                                sdi_1 = dataItem;
                            }
                        }
                    }
                    if (series.yAxis == _this) {
                        if (dataItem.categoryY == category_1) {
                            if (!sdi_1) {
                                sdi_1 = dataItem;
                            }
                            if (Math.abs(index_1 - sdi_1.index) > Math.abs(index_1 - dataItem.index)) {
                                sdi_1 = dataItem;
                            }
                        }
                    }
                });
                //@todo
                if (findNearest) {
                }
                return sdi_1;
            }
        }
    };
    /**
     * Returns the X coordinate for series' data item.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param dataItem  Data item
     * @param key       Category
     * @param location  Location (0-1)
     * @return X coordinate (px)
     */
    CategoryAxis.prototype.getX = function (dataItem, key, location, stackKey, range) {
        var position = this.getPositionX(dataItem, key, location, stackKey, range);
        if ($type.isNaN(position)) {
            return this.basePoint.x;
        }
        else {
            return this.renderer.positionToPoint(position).x;
        }
    };
    /**
     * Returns relative position on axis for series' data item.
     *
     * @since 4.5.14
     * @param  dataItem  Data item
     * @param  key       Category
     * @param  location  Location (0-1)
     * @return           Relative position
     */
    CategoryAxis.prototype.getPositionX = function (dataItem, key, location, stackKey, range) {
        var position;
        if ($type.hasValue(key)) {
            position = this.categoryToPosition(dataItem.categories[key], location);
        }
        if (range) {
            position = $math.fitToRange(position, range.start, range.end);
        }
        return position;
    };
    /**
     * Returns the Y coordinate for series' data item.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param dataItem  Data item
     * @param key       Category
     * @param location  Location (0-1)
     * @return Y coordinate (px)
     */
    CategoryAxis.prototype.getY = function (dataItem, key, location, stackKey, range) {
        var position = this.getPositionY(dataItem, key, location, stackKey, range);
        if ($type.isNaN(position)) {
            return this.basePoint.y;
        }
        else {
            return this.renderer.positionToPoint(position).y;
        }
    };
    /**
     * Returns relative position on axis for series' data item.
     *
     * @since 4.5.14
     * @param  dataItem  Data item
     * @param  key       Category
     * @param  location  Location (0-1)
     * @return           Relative position
     */
    CategoryAxis.prototype.getPositionY = function (dataItem, key, location, stackKey, range) {
        var position;
        if ($type.hasValue(key)) {
            position = this.categoryToPosition(dataItem.categories[key], location);
        }
        if (range) {
            position = $math.fitToRange(position, range.start, range.end);
        }
        return position;
    };
    /**
     * Returns an angle for series data item.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param dataItem  Data item
     * @param key       Category
     * @param location  Location (0-1)
     * @param stackKey  Stack key (?)
     * @param range Range to fit in
     * @return Angle
     */
    CategoryAxis.prototype.getAngle = function (dataItem, key, location, stackKey, range) {
        var position = this.categoryToPosition(dataItem.categories[key], location);
        if (range) {
            position = $math.fitToRange(position, range.start, range.end);
        }
        return this.positionToAngle(position);
    };
    /**
     * Returns an absolute pixel coordinate of the start of the cell (category),
     * that specific position value falls into.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param position  Position (px)
     * @return Cell start position (px)
     */
    CategoryAxis.prototype.getCellStartPosition = function (position) {
        return this.roundPosition(position, 0);
    };
    /**
     * Returns an absolute pixel coordinate of the end of the cell (category),
     * that specific position value falls into.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param position  Position (px)
     * @return Cell end position (px)
     */
    CategoryAxis.prototype.getCellEndPosition = function (position) {
        return this.roundPosition(position, 1);
    };
    /**
     * Returns text to show in a category tooltip, based on specific position
     * within axis.
     *
     * @ignore Exclude from docs
     * @param position  Position (px)
     * @return Label (category)
     */
    CategoryAxis.prototype.getTooltipText = function (position) {
        var dataItem = this.dataItems.getIndex(this.positionToIndex(position));
        if (dataItem) {
            this.tooltipDataItem = dataItem;
            this.tooltip.dataItem = dataItem;
            if (this.tooltipText) {
                return this.tooltipText;
            }
            if (!this._adapterO) {
                return dataItem.category;
            }
            else {
                return this._adapterO.apply("getTooltipText", dataItem.category);
            }
        }
    };
    /**
     * Returns an index of the category that corresponds to specific pixel
     * position within axis.
     *
     * @param position  Position (px)
     * @return Category index
     */
    CategoryAxis.prototype.positionToIndex = function (position) {
        position = $math.round(position, 10);
        if (position < 0) {
            position = 0;
        }
        if (position > 1) {
            position = 1;
        }
        var startIndex = this.startIndex;
        var endIndex = this.endIndex;
        var difference = endIndex - startIndex - this.startLocation - (1 - this.endLocation);
        position += 1 / difference * this.startLocation;
        var index = null;
        if (this._axisBreaks) {
            var axisBreaks = this._axisBreaks;
            // in case we have some axis breaks
            $iter.eachContinue(axisBreaks.iterator(), function (axisBreak) {
                var breakStartPosition = axisBreak.startPosition;
                var breakEndPosition = axisBreak.endPosition;
                var breakStartIndex = axisBreak.adjustedStartValue;
                var breakEndIndex = axisBreak.adjustedEndValue;
                breakStartIndex = $math.max(breakStartIndex, startIndex);
                breakEndIndex = $math.min(breakEndIndex, endIndex);
                var breakSize = axisBreak.breakSize;
                difference -= (breakEndIndex - breakStartIndex) * (1 - breakSize);
                // position to the right of break end
                if (position > breakEndPosition) {
                    startIndex += (breakEndIndex - breakStartIndex) * (1 - breakSize);
                }
                // position to the left of break start
                else if (position < breakStartPosition) {
                }
                // value within break
                else {
                    var breakPosition = (position - breakStartPosition) / (breakEndPosition - breakStartPosition);
                    index = breakStartIndex + Math.round(breakPosition * (breakEndIndex - breakStartIndex));
                    return false;
                }
                return true;
            });
        }
        if (!$type.isNumber(index)) {
            index = Math.floor(position * difference + startIndex);
        }
        if (index >= this.dataItems.length) {
            index = this.dataItems.length - 1;
        }
        // not good, when panning out of bounds, each time one less item gets selected
        //if (index >= endIndex) {
        //	index--;
        //}
        return index;
    };
    /**
     * Returns category based on position.
     *
     * Please note that `position` represents position within axis which may be
     * zoomed and not correspond to Cursor's `position`.
     *
     * To convert Cursor's `position` to Axis' `position` use `toAxisPosition()` method.
     *
     * This is a synonim of `getPositionLabel()` implemented here for consistentcy.
     *
     * @since 4.3.8
     * @see {@link https://www.amcharts.com/docs/v4/tutorials/tracking-cursors-position-via-api/#Tracking_Cursor_s_position} For more information about cursor tracking.
     * @param position  Relative position on axis (0-1)
     * @return Position label
     */
    CategoryAxis.prototype.positionToCategory = function (position) {
        return this.getPositionLabel(position);
    };
    /**
     * Returns category based on position.
     *
     * Please note that `position` represents position within axis which may be
     * zoomed and not correspond to Cursor's `position`.
     *
     * To convert Cursor's `position` to Axis' `position` use `toAxisPosition()` method.
     *
     * @see {@link https://www.amcharts.com/docs/v4/tutorials/tracking-cursors-position-via-api/#Tracking_Cursor_s_position} For more information about cursor tracking.
     * @param position  Relative position on axis (0-1)
     * @return Position label
     */
    CategoryAxis.prototype.getPositionLabel = function (position) {
        var dataItem = this.dataItems.getIndex(this.positionToIndex(position));
        if (dataItem) {
            return dataItem.category;
        }
    };
    Object.defineProperty(CategoryAxis.prototype, "basePoint", {
        /**
         * Coordinates of the actual axis start.
         *
         * @ignore Exclude from docs
         * @return Base point
         */
        get: function () {
            // This makes base grid to be drawn at the end of the axis and adds extra
            // grid which we need to nicely close the chart.
            return this.renderer.positionToPoint(1);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initializes Axis' renderer.
     *
     * @ignore Exclude from docs
     */
    CategoryAxis.prototype.initRenderer = function () {
        _super.prototype.initRenderer.call(this);
        var renderer = this.renderer;
        renderer.baseGrid.disabled = true;
    };
    Object.defineProperty(CategoryAxis.prototype, "frequency", {
        /**
         * Current frequency of labels of the axis.
         *
         * Normally it would be 1, but when labels start to be hidden due
         * to `minGridDistance` this read-only property will increase.
         *
         * @readonly
         * @since 4.2.0
         * @return Label frequency
         */
        get: function () {
            return this._frequency;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoryAxis.prototype, "sortBySeries", {
        /**
         * @return Sort categories?
         */
        get: function () {
            return this.getPropertyValue("sortBySeries");
        },
        /**
         * If set to a reference of [[ColumnSeries]] the categories will be sorted
         * by actual values.
         *
         * The categories are ordered in descending order (from highest values to
         * lowest). To reverse the order, use axis renderer's `inversed` setting.
         * E.g.:
         *
         * ```TypeScript
         * categoryAxis.sortBySeries = series;
         * categoryAxis.renderer.inversed = true;
         * ```
         * ```JavaScript
         * categoryAxis.sortBySeries = series;
         * categoryAxis.renderer.inversed = true;
         * ```
         * ```JSON
         * {
         *   // ...
         *   "xAxes": [{
         *     // ...
         *     "sortBySeries": "s1",
         *     "renderer": {
         *       // ...
         *       "inversed": true
         *     }
         *   }]
         * }
         * ```
         *
         * @since 4.8.7
         * @param  value  Sort categories?
         */
        set: function (value) {
            this.setPropertyValue("sortBySeries", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    CategoryAxis.prototype.processConfig = function (config) {
        if (config) {
            if ($type.hasValue(config.sortBySeries) && $type.isString(config.sortBySeries)) {
                if (this.map.hasKey(config.sortBySeries)) {
                    config.sortBySeries = this.map.getKey(config.sortBySeries);
                }
                else {
                    this.addDelayedMap("sortBySeries", config.sortBySeries);
                    delete config.sortBySeries;
                }
            }
        }
        _super.prototype.processConfig.call(this, config);
    };
    return CategoryAxis;
}(Axis));
export { CategoryAxis };
/**
 * Register class, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["CategoryAxis"] = CategoryAxis;
registry.registeredClasses["CategoryAxisDataItem"] = CategoryAxisDataItem;
//# sourceMappingURL=CategoryAxis.js.map