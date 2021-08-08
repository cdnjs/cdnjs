/**
 * Column series module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { XYSeries, XYSeriesDataItem } from "./XYSeries";
import { visualProperties } from "../../core/Sprite";
import { Container } from "../../core/Container";
import { ListTemplate, ListDisposer } from "../../core/utils/List";
import { Dictionary } from "../../core/utils/Dictionary";
import { ValueAxis } from "../axes/ValueAxis";
import { CategoryAxis } from "../axes/CategoryAxis";
import { registry } from "../../core/Registry";
import { Column } from "../elements/Column";
import { RoundedRectangle } from "../../core/elements/RoundedRectangle";
import { percent, Percent } from "../../core/utils/Percent";
import * as $math from "../../core/utils/Math";
import * as $object from "../../core/utils/Object";
import * as $iter from "../../core/utils/Iterator";
import * as $array from "../../core/utils/Array";
import * as $type from "../../core/utils/Type";
import { Disposer } from "../../core/utils/Disposer";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[ColumnSeries]].
 *
 * @see {@link DataItem}
 */
var ColumnSeriesDataItem = /** @class */ (function (_super) {
    __extends(ColumnSeriesDataItem, _super);
    /**
     * Constructor
     */
    function ColumnSeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "ColumnSeriesDataItem";
        _this.locations["dateX"] = 0.5;
        _this.locations["dateY"] = 0.5;
        _this.locations["categoryX"] = 0.5;
        _this.locations["categoryY"] = 0.5;
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(ColumnSeriesDataItem.prototype, "column", {
        /**
         * @return Column
         */
        get: function () {
            return this._column;
        },
        /**
         * A column used to draw a column for this data item.
         *
         * @param column
         */
        set: function (column) {
            this.setColumn(column);
        },
        enumerable: true,
        configurable: true
    });
    ColumnSeriesDataItem.prototype.setColumn = function (column) {
        var _this = this;
        if (this._column && column != this._column) {
            $array.remove(this.sprites, this._column);
        }
        this._column = column;
        if (column) {
            var prevDataItem = column.dataItem;
            if (prevDataItem && prevDataItem != this) {
                prevDataItem.column = undefined;
            }
            this.addSprite(column);
            this._disposers.push(new Disposer(function () {
                // TODO investigate why component is undefined
                // https://codepen.io/team/amcharts/pen/dac4be245d658233a6d7e5597df2208b?editors=0010
                if (_this.component) {
                    _this.component.columns.removeValue(column);
                }
            }));
        }
    };
    Object.defineProperty(ColumnSeriesDataItem.prototype, "width", {
        get: function () {
            var width = this.properties.width;
            if (this._adapterO) {
                width = this._adapterO.apply("width", width);
            }
            return width;
        },
        set: function (value) {
            if (this.properties.width != value) {
                this.properties.width = value;
                if (this.component) {
                    this.component.validateDataElement(this);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnSeriesDataItem.prototype, "height", {
        get: function () {
            var height = this.properties.height;
            if (this._adapterO) {
                height = this._adapterO.apply("height", height);
            }
            return height;
        },
        set: function (value) {
            if (this.properties.height != value) {
                this.properties.height = value;
                if (this.component) {
                    this.component.validateDataElement(this);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnSeriesDataItem.prototype, "rangesColumns", {
        /**
         * A dictionary storing axes ranges columns by axis uid
         */
        get: function () {
            if (!this._rangesColumns) {
                this._rangesColumns = new Dictionary();
            }
            return this._rangesColumns;
        },
        enumerable: true,
        configurable: true
    });
    return ColumnSeriesDataItem;
}(XYSeriesDataItem));
export { ColumnSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a column graph.
 *
 * @see {@link IColumnSeriesEvents} for a list of available Events
 * @see {@link IColumnSeriesAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
var ColumnSeries = /** @class */ (function (_super) {
    __extends(ColumnSeries, _super);
    /**
     * Constructor
     */
    function ColumnSeries() {
        var _this = _super.call(this) || this;
        /**
         * Start location within cell for columns.
         */
        _this._startLocation = 0;
        /**
         * End location within cell for columns.
         */
        _this._endLocation = 1;
        _this.className = "ColumnSeries";
        _this.width = percent(100);
        _this.height = percent(100);
        _this.strokeOpacity = 0;
        _this.fillOpacity = 1;
        _this.clustered = true;
        var columnsContainer = _this.mainContainer.createChild(Container);
        columnsContainer.shouldClone = false;
        columnsContainer.isMeasured = false;
        columnsContainer.layout = "none";
        _this._columnsContainer = columnsContainer;
        _this.columns.template.pixelPerfect = false;
        _this.tooltipColorSource = _this.columns.template;
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(ColumnSeries.prototype, "columnsContainer", {
        /**
         * A container that columns are created in.
         *
         * @ignore Exclude from docs
         */
        get: function () {
            return this._columnsContainer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    ColumnSeries.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        if (!$type.hasValue(this.readerTitle)) {
            this.readerTitle = this.language.translate("Column Series");
        }
    };
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    ColumnSeries.prototype.createDataItem = function () {
        return new ColumnSeriesDataItem();
    };
    /**
     * (Re)validates the whole series, effectively causing it to redraw.
     *
     * @ignore Exclude from docs
     */
    ColumnSeries.prototype.validate = function () {
        //@todo Check if we can do better than use `instanceof`
        // find start/end locations based on clustered/stacked settings
        // go through chart series instead of base axis series, because axis series doesn't maintain order
        var _this = this;
        this.group.node.removeAttribute("fill");
        if (this.chart && this.xAxis && this.yAxis) {
            var baseAxisSeries = this.chart.series;
            var clusterCount_1 = 0;
            var index_1 = 0;
            var sortedByAxis_1 = [];
            $iter.each(baseAxisSeries.iterator(), function (series) {
                if (series instanceof ColumnSeries) {
                    if (_this.baseAxis == series.baseAxis) {
                        var index_2;
                        if (_this.baseAxis == _this.xAxis) {
                            index_2 = _this.chart.yAxes.indexOf(series.yAxis);
                        }
                        else {
                            index_2 = _this.chart.xAxes.indexOf(series.xAxis);
                        }
                        sortedByAxis_1.push({ series: series, axis: index_2 });
                    }
                }
            });
            sortedByAxis_1.sort(function (a, b) { return a.axis - b.axis; });
            var prevAxisIndex_1;
            $array.each(sortedByAxis_1, function (sortedItem) {
                var series = sortedItem.series;
                if (series instanceof ColumnSeries) {
                    if ((!series.stacked && series.clustered) || (prevAxisIndex_1 != sortedItem.axis && series.clustered)) {
                        clusterCount_1++;
                    }
                    if (series == _this) {
                        index_1 = clusterCount_1 - 1;
                    }
                }
                prevAxisIndex_1 = sortedItem.axis;
            });
            if (!this.clustered) {
                index_1 = 0;
                clusterCount_1 = 1;
            }
            var renderer = this.baseAxis.renderer;
            var cellStartLocation = renderer.cellStartLocation;
            var cellEndLocation = renderer.cellEndLocation;
            this._startLocation = cellStartLocation + (index_1 / clusterCount_1) * (cellEndLocation - cellStartLocation);
            this._endLocation = cellStartLocation + (index_1 + 1) / clusterCount_1 * (cellEndLocation - cellStartLocation);
            var xAxis = this.xAxis;
            var yAxis = this.yAxis;
            if (xAxis instanceof CategoryAxis && yAxis instanceof ValueAxis) {
                if (xAxis.sortBySeries == this) {
                    this.sortCategoryAxis(xAxis, "valueY");
                }
            }
            if (yAxis instanceof CategoryAxis && xAxis instanceof ValueAxis) {
                if (yAxis.sortBySeries == this) {
                    this.sortCategoryAxis(yAxis, "valueX");
                }
            }
        }
        _super.prototype.validate.call(this);
        for (var i = 0; i < this.startIndex; i++) {
            var dataItem = this.dataItems.getIndex(i);
            this.disableUnusedColumns(dataItem);
        }
        for (var i = this.dataItems.length - 1; i > this.endIndex; i--) {
            var dataItem = this.dataItems.getIndex(i);
            this.disableUnusedColumns(dataItem);
        }
        this._propertiesChanged = false;
    };
    ColumnSeries.prototype.sortCategoryAxis = function (axis, key) {
        var _this = this;
        this.dataItems.values.sort(function (x, y) {
            return y.values[key].workingValue - x.values[key].workingValue;
        });
        var i = 0;
        this.dataItems.each(function (dataItem) {
            dataItem._index = i;
            i++;
        });
        axis.dataItems.each(function (dataItem) {
            var axis = dataItem.component;
            var currentPosition = axis.categoryToPosition(dataItem.category) - dataItem.deltaPosition;
            var seriesDataItem = axis.getSeriesDataItemByCategory(dataItem.category, _this);
            if (seriesDataItem) {
                var index = _this.dataItems.indexOf(seriesDataItem);
                dataItem._index = index;
                var deltaPosition = $math.round((index + 0.5) / _this.dataItems.length - currentPosition, 3);
                if (dataItem.deltaAnimation && !dataItem.deltaAnimation.isDisposed() && dataItem.deltaAnimation.animationOptions[0].to == deltaPosition) {
                    // void
                }
                else if (deltaPosition != $math.round(dataItem.deltaPosition, 3)) {
                    if (dataItem.deltaAnimation) {
                        dataItem.deltaAnimation.stop();
                    }
                    dataItem.deltaAnimation = dataItem.animate({ property: "deltaPosition", from: -deltaPosition, to: 0 }, axis.interpolationDuration, axis.interpolationEasing);
                    _this._disposers.push(dataItem.deltaAnimation);
                }
            }
        });
        axis.dataItems.values.sort(function (x, y) {
            return x.index - y.index;
        });
    };
    /**
     * Validates data item's element, effectively redrawing it.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    ColumnSeries.prototype.validateDataElement = function (dataItem) {
        // important oder here, first real, then super. we need this to know size
        if (this.chart && this.xAxis && this.yAxis) {
            this.validateDataElementReal(dataItem);
            _super.prototype.validateDataElement.call(this, dataItem);
        }
    };
    /**
     * Returns relative start location for the data item.
     *
     * @param dataItem  Data item
     * @return Location (0-1)
     */
    ColumnSeries.prototype.getStartLocation = function (dataItem) {
        var startLocation = this._startLocation;
        if (this.baseAxis == this.xAxis) {
            startLocation += dataItem.locations[this.xOpenField] - 0.5;
        }
        else {
            startLocation += dataItem.locations[this.yOpenField] - 0.5;
        }
        return startLocation;
    };
    /**
     * [handleDataItemWorkingValueChange description]
     *
     * @ignore Exclude from docs
     */
    /*
   public handleDataItemWorkingValueChange(dataItem?: this["_dataItem"], name?: string): void {
       if (this.simplifiedProcessing) {
           this.validateDataElement(dataItem);
       }
       else {
           super.handleDataItemWorkingValueChange(dataItem, name);
       }
   }*/
    /**
     * Returns relative end location for the data item.
     *
     * @param dataItem  Data item
     * @return Location (0-1)
     */
    ColumnSeries.prototype.getEndLocation = function (dataItem) {
        var endLocation = this._endLocation;
        if (this.baseAxis == this.xAxis) {
            endLocation += dataItem.locations[this.xField] - 0.5;
        }
        else {
            endLocation += dataItem.locations[this.yField] - 0.5;
        }
        return endLocation;
    };
    /**
     * Validates data item's elements.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    ColumnSeries.prototype.validateDataElementReal = function (dataItem) {
        var _this = this;
        //	if (dataItem.hasValue([this.xField, this.yField])) { // todo: this doesn't work with categories, think of a better way
        var l;
        var r;
        var t;
        var b;
        var startLocation = this.getStartLocation(dataItem);
        var endLocation = this.getEndLocation(dataItem);
        var xField = this.xField;
        var xOpenField = this.xOpenField;
        var yField = this.yField;
        var yOpenField = this.yOpenField;
        var template = this.columns.template;
        var percentWidth = template.percentWidth;
        var percentHeight = template.percentHeight;
        var pixelWidth = template.pixelWidth;
        var pixelHeight = template.pixelHeight;
        var maxWidth = template.maxWidth;
        var maxHeight = template.maxHeight;
        var paddingLeft = template.pixelPaddingLeft;
        var paddingRight = template.pixelPaddingRight;
        var paddingTop = template.pixelPaddingTop;
        var paddingBottom = template.pixelPaddingBottom;
        var outOfBounds = false;
        var diw = dataItem.width;
        if ($type.hasValue(diw)) {
            if ($type.isNumber(diw)) {
                pixelWidth = diw;
            }
            if (diw instanceof Percent) {
                percentWidth = diw.value * 100;
            }
        }
        var dih = dataItem.height;
        if ($type.hasValue(dih)) {
            if ($type.isNumber(dih)) {
                pixelHeight = dih;
            }
            if (dih instanceof Percent) {
                percentHeight = dih.value * 100;
            }
        }
        // two category axes
        if ((this.xAxis instanceof CategoryAxis) && (this.yAxis instanceof CategoryAxis)) {
            if (!dataItem.hasValue(this._xValueFields) || !dataItem.hasValue(this._yValueFields)) {
                return;
            }
            startLocation = 0;
            endLocation = 1;
            if (!$type.isNaN(percentWidth)) {
                var offset = $math.round((endLocation - startLocation) * (1 - percentWidth / 100) / 2, 5);
                startLocation += offset;
                endLocation -= offset;
            }
            l = this.xAxis.getX(dataItem, xOpenField, startLocation);
            r = this.xAxis.getX(dataItem, xField, endLocation);
            // in case width is set in pixels
            if ($type.isNaN(percentWidth)) {
                var offset = ((r - l) - pixelWidth) / 2;
                l += offset;
                r -= offset;
            }
            // in case max width is set in pixels
            if (!$type.isNaN(maxWidth) && maxWidth < Math.abs(r - l)) {
                var offset = ((r - l) - maxWidth) / 2;
                l += offset;
                r -= offset;
            }
            startLocation = 0;
            endLocation = 1;
            if (!$type.isNaN(percentHeight)) {
                var offset = $math.round((1 - percentHeight / 100) / 2, 5);
                startLocation += offset;
                endLocation -= offset;
            }
            t = this.yAxis.getY(dataItem, yOpenField, startLocation);
            b = this.yAxis.getY(dataItem, yField, endLocation);
            // in case width is set in pixels
            if ($type.isNaN(percentHeight)) {
                var offset = ((b - t) - pixelHeight) / 2;
                b += offset;
                t -= offset;
            }
            // in case max width is set in pixels
            if (!$type.isNaN(maxHeight) && maxHeight < Math.abs(b - t)) {
                var offset = ((b - t) - maxHeight) / 2;
                b += offset;
                t -= offset;
            }
            r = this.fixHorizontalCoordinate(r);
            l = this.fixHorizontalCoordinate(l);
            t = this.fixVerticalCoordinate(t);
            b = this.fixVerticalCoordinate(b);
        }
        else if (this.baseAxis == this.xAxis) {
            if (!dataItem.hasValue(this._yValueFields)) {
                return;
            }
            // in case width is set in percent
            if (!$type.isNaN(percentWidth)) {
                var offset = $math.round((endLocation - startLocation) * (1 - percentWidth / 100) / 2, 5);
                startLocation += offset;
                endLocation -= offset;
            }
            l = this.xAxis.getX(dataItem, xOpenField, startLocation);
            r = this.xAxis.getX(dataItem, xField, endLocation);
            // in case width is set in pixels
            if ($type.isNaN(percentWidth)) {
                var offset = ((r - l) - pixelWidth) / 2;
                l += offset;
                r -= offset;
            }
            // in case width is set in pixels
            if (!$type.isNaN(maxWidth) && maxWidth < Math.abs(r - l)) {
                var offset = ((r - l) - maxWidth) / 2;
                l += offset;
                r -= offset;
            }
            var bottomLocation = dataItem.locations[yOpenField];
            var topLocation = dataItem.locations[yField];
            // otherwise gantt chart will start items in the middle of a cell
            if (this.yAxis instanceof ValueAxis) {
                if (this.dataFields[this.yField] != this.dataFields[this.yOpenField]) {
                    bottomLocation = 0;
                    topLocation = 0;
                }
            }
            b = this.yAxis.getY(dataItem, yOpenField, bottomLocation);
            t = this.yAxis.getY(dataItem, yField, topLocation);
            // used to save location for bullets, but it's not a good approach
            // dataItem.locations[xField] = startLocation + (endLocation - startLocation) / 2;
            var axisLenght = Math.ceil(this.yAxis.axisLength);
            if ((t < 0 && b < 0) || (t > axisLenght && b > axisLenght)) {
                outOfBounds = true;
            }
            t = this.fixVerticalCoordinate(t);
            b = this.fixVerticalCoordinate(b);
            if (Math.abs(r - l) - paddingLeft - paddingRight == 0) {
                outOfBounds = true;
            }
        }
        // horizontal bars
        else {
            if (!dataItem.hasValue(this._xValueFields)) {
                return;
            }
            if (!$type.isNaN(percentHeight)) {
                var offset = $math.round((endLocation - startLocation) * (1 - percentHeight / 100) / 2, 5);
                startLocation += offset;
                endLocation -= offset;
            }
            t = this.yAxis.getY(dataItem, yOpenField, startLocation);
            b = this.yAxis.getY(dataItem, yField, endLocation);
            // in case height is set in pixels
            if ($type.isNaN(percentHeight)) {
                var offset = ((b - t) - pixelHeight) / 2;
                b -= offset;
                t += offset;
            }
            // in case height is set in pixels
            if (!$type.isNaN(maxHeight) && maxHeight < Math.abs(b - t)) {
                var offset = ((b - t) - maxHeight) / 2;
                b -= offset;
                t += offset;
            }
            var rightLocation = dataItem.locations[xField];
            var leftLocation = dataItem.locations[xOpenField];
            // otherwise gantt chart will start items in the middle of a cell
            if (this.xAxis instanceof ValueAxis) {
                if (this.dataFields[this.xField] != this.dataFields[this.xOpenField]) {
                    rightLocation = 0;
                    leftLocation = 0;
                }
            }
            r = this.xAxis.getX(dataItem, xField, rightLocation);
            l = this.xAxis.getX(dataItem, xOpenField, leftLocation);
            // used to save location for bullets, but it's not a good approach
            // dataItem.locations[yField] = startLocation + (endLocation - startLocation) / 2;
            var axisLenght = Math.ceil(this.xAxis.axisLength);
            if ((r < 0 && l < 0) || (r > axisLenght && l > axisLenght)) {
                outOfBounds = true;
            }
            r = this.fixHorizontalCoordinate(r);
            l = this.fixHorizontalCoordinate(l);
            if (Math.abs(t - b) - paddingTop - paddingBottom == 0) {
                outOfBounds = true;
            }
        }
        var w = Math.abs(r - l);
        var h = Math.abs(b - t);
        var x = Math.min(l, r);
        var y = Math.min(t, b);
        if (!outOfBounds) {
            var column_1;
            if (!dataItem.column) {
                column_1 = this.columns.create();
                //$object.forceCopyProperties(this.columns.template, column, visualProperties);
                $object.copyProperties(this, column_1, visualProperties); // need this because 3d columns are not in the same container
                $object.copyProperties(this.columns.template, column_1, visualProperties); // second time, no force, so that columns.template would override series properties
                dataItem.addSprite(column_1);
                dataItem.column = column_1;
                column_1.paper = this.paper; // sometimes pattern is not drawn if is set with adapter without this.
                // accessibility
                if (this.itemsFocusable()) {
                    if (!$type.hasValue(this.role)) {
                        this.role = "menu";
                    }
                    if (!$type.hasValue(column_1.role)) {
                        column_1.role = "menuitem";
                    }
                    column_1.focusable = true;
                }
                else {
                    if (!$type.hasValue(this.role)) {
                        this.role = "list";
                    }
                    if (!$type.hasValue(column_1.role)) {
                        column_1.role = "listitem";
                    }
                    column_1.focusable = false;
                }
                if (column_1.focusable) {
                    column_1.events.on("focus", function (ev) {
                        column_1.readerTitle = _this.populateString(_this.itemReaderText, dataItem);
                    }, undefined, false);
                    column_1.events.on("blur", function (ev) {
                        column_1.readerTitle = "";
                    }, undefined, false);
                }
                if (column_1.hoverable) {
                    column_1.events.on("over", function (ev) {
                        column_1.readerTitle = _this.populateString(_this.itemReaderText, dataItem);
                    }, undefined, false);
                    column_1.events.on("out", function (ev) {
                        column_1.readerTitle = "";
                    }, undefined, false);
                }
                column_1.parent = this.columnsContainer;
                column_1.virtualParent = this;
            }
            else {
                column_1 = dataItem.column;
                if (this._propertiesChanged) {
                    $object.copyProperties(this, column_1, visualProperties);
                    $object.copyProperties(this.columns.template, column_1, visualProperties);
                    $array.each(visualProperties, function (property) {
                        column_1[property] = column_1[property];
                    });
                }
            }
            column_1.width = w;
            column_1.height = h;
            column_1.x = x;
            column_1.y = y;
            column_1.realX = l;
            column_1.realY = t;
            column_1.realWidth = r - l;
            column_1.realHeight = b - t;
            this.setColumnStates(column_1);
            if (column_1.invalid) {
                column_1.validate(); // validate as if it was used previously, it will flicker with previous dimensions
            }
            column_1.__disabled = false;
            //column.returnAfterTemp();
            $iter.each(this.axisRanges.iterator(), function (axisRange) {
                var rangeColumn = dataItem.rangesColumns.getKey(axisRange.uid);
                if (!rangeColumn) {
                    rangeColumn = _this.columns.create();
                    //$object.forceCopyProperties(this.columns.template, rangeColumn, visualProperties);
                    $object.copyProperties(axisRange.contents, rangeColumn, visualProperties); // need this because 3d columns are not in the same container
                    dataItem.addSprite(rangeColumn);
                    dataItem.rangesColumns.setKey(axisRange.uid, rangeColumn);
                    rangeColumn.paper = _this.paper; // sometimes pattern is not drawn if is set with adapter without this.
                }
                rangeColumn.parent = axisRange.contents;
                rangeColumn.width = w;
                rangeColumn.height = h;
                rangeColumn.x = x;
                rangeColumn.y = y;
                _this.setColumnStates(rangeColumn);
                if (rangeColumn.invalid) {
                    rangeColumn.validate(); // validate as if it was used previously, it will flicker with previous dimensions
                }
                rangeColumn.__disabled = false;
                //rangeColumn.returnAfterTemp();
            });
        }
        else {
            this.disableUnusedColumns(dataItem);
        }
        dataItem.itemWidth = w;
        dataItem.itemHeight = h;
    };
    /**
     * @ignore
     */
    ColumnSeries.prototype.disableUnusedColumns = function (dataItem) {
        if (dataItem) {
            if (dataItem.column) {
                // otherwise might flicker when enabling
                dataItem.column.width = 0;
                dataItem.column.height = 0;
                dataItem.column.__disabled = true;
            }
            $iter.each(this.axisRanges.iterator(), function (axisRange) {
                var rangeColumn = dataItem.rangesColumns.getKey(axisRange.uid);
                if (rangeColumn) {
                    // otherwise might flicker when enabling
                    rangeColumn.width = 0;
                    rangeColumn.height = 0;
                    rangeColumn.__disabled = true;
                }
            });
        }
    };
    /**
     * Apply different state/coloring to columns based on the change value.
     *
     * @param sprite  Sprite to apply state to
     * @todo Do not apply accessibility to wicks of the candlesticks
     */
    ColumnSeries.prototype.setColumnStates = function (sprite) {
        if (this._dropFromOpenState || this._dropFromPreviousState || this._riseFromOpenState || this._riseFromPreviousState) {
            var dataItem = sprite.dataItem;
            if (this.xAxis instanceof ValueAxis || this.yAxis instanceof ValueAxis) {
                var open_1;
                var value = void 0;
                var change = void 0;
                if (this.baseAxis == this.yAxis) {
                    if (this.xOpenField && this.xField && this.xAxis instanceof ValueAxis) {
                        open_1 = dataItem.getValue(this.xOpenField);
                        value = dataItem.getValue(this.xField);
                    }
                    change = dataItem.getValue(this.xAxis.axisFieldName + "X", "previousChange");
                }
                else {
                    if (this.yOpenField && this.yField && this.yAxis instanceof ValueAxis) {
                        open_1 = dataItem.getValue(this.yOpenField);
                        value = dataItem.getValue(this.yField);
                    }
                    change = dataItem.getValue(this.yAxis.axisFieldName + "Y", "previousChange");
                }
                if (value < open_1) {
                    dataItem.droppedFromOpen = true;
                    sprite.defaultState.copyFrom(this._dropFromOpenState);
                    sprite.setState(this._dropFromOpenState, 0);
                }
                else {
                    dataItem.droppedFromOpen = false;
                    sprite.defaultState.copyFrom(this._riseFromOpenState);
                    sprite.setState(this._riseFromOpenState, 0);
                }
                if (change < 0) {
                    dataItem.droppedFromPrevious = true;
                    sprite.defaultState.copyFrom(this._dropFromPreviousState);
                    sprite.setState((this._dropFromPreviousState), 0);
                }
                else {
                    dataItem.droppedFromPrevious = false;
                    sprite.defaultState.copyFrom(this._riseFromPreviousState);
                    sprite.setState((this._riseFromPreviousState), 0);
                }
            }
        }
    };
    Object.defineProperty(ColumnSeries.prototype, "columns", {
        /**
         * A list of column elements in the series.
         *
         * @return Columns
         */
        get: function () {
            if (!this._columns) {
                this._columns = new ListTemplate(this.createColumnTemplate());
                this._disposers.push(new ListDisposer(this._columns));
                this._disposers.push(this._columns.template);
            }
            return this._columns;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates and returns a column element to use as a template.
     *
     * @return Column template
     */
    ColumnSeries.prototype.createColumnTemplate = function () {
        return new Column();
    };
    Object.defineProperty(ColumnSeries.prototype, "clustered", {
        /**
         * @return Clustered?
         */
        get: function () {
            return this.getPropertyValue("clustered");
        },
        /**
         * Cluster this series columns?
         *
         * Setting to `false` will make columns overlap with other series.
         *
         * @default true
         * @param value  Clustered?
         */
        set: function (value) {
            this.setPropertyValue("clustered", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnSeries.prototype, "dropFromOpenState", {
        /**
         * @return State
         */
        get: function () {
            if (!this._dropFromOpenState) {
                this._dropFromOpenState = this.states.create("dropFromOpenState");
            }
            return this._dropFromOpenState;
        },
        /**
         * A state to apply to a column when close value is lower than open value.
         *
         * Can be used to differentiate appearance based on value relations.
         *
         * NOTE: this will work only if at least one axis is [[ValueAxis]].
         *
         * @readonly You can modify state object, but can't overwrite it
         * @param  value  State
         */
        set: function (value) {
            this._dropFromOpenState = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnSeries.prototype, "dropFromPreviousState", {
        /**
         * @return State
         */
        get: function () {
            if (!this._dropFromPreviousState) {
                this._dropFromPreviousState = this.states.create("dropFromPreviousState");
            }
            return this._dropFromPreviousState;
        },
        /**
         * A state to apply to a column when its value is lower value of a previous
         * column.
         *
         * Can be used to differentiate appearance based on value relations.
         *
         * @readonly You can modify state object, but can't overwrite it
         * @param  value  State
         */
        set: function (value) {
            this._dropFromPreviousState = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnSeries.prototype, "riseFromOpenState", {
        /**
         * @return State
         */
        get: function () {
            if (!this._riseFromOpenState) {
                this._riseFromOpenState = this.states.create("riseFromOpenState");
            }
            return this._riseFromOpenState;
        },
        /**
         * A state to apply to a column when close value is same or higher than open
         * value.
         *
         * Can be used to differentiate appearance based on value relations.
         *
         * NOTE: this will work only if at least one axis is [[ValueAxis]].
         *
         * @readonly You can modify state object, but can't overwrite it
         * @param  value  State
         */
        set: function (value) {
            this._riseFromOpenState = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnSeries.prototype, "riseFromPreviousState", {
        /**
         * @return State
         */
        get: function () {
            if (!this._riseFromPreviousState) {
                this._riseFromPreviousState = this.states.create("riseFromPreviousState");
            }
            return this._riseFromPreviousState;
        },
        /**
         * A state to apply to a column when its value is same or higher than value
         * of a previous column.
         *
         * Can be used to differentiate appearance based on value relations.
         *
         * @readonly You can modify state object, but can't overwrite it
         * @param  value  State
         */
        set: function (value) {
            this._riseFromPreviousState = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates value of the related legend item.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    ColumnSeries.prototype.updateLegendValue = function (dataItem, notRange) {
        var _this = this;
        _super.prototype.updateLegendValue.call(this, dataItem, notRange);
        if (this.legendDataItem) {
            var marker = this.legendDataItem.marker;
            var fromOpenState_1;
            var fromPreviousState_1;
            if (dataItem) {
                if (dataItem.droppedFromOpen) {
                    fromOpenState_1 = this._dropFromOpenState;
                }
                else {
                    fromOpenState_1 = this._riseFromOpenState;
                }
                if (dataItem.droppedFromPrevious) {
                    fromPreviousState_1 = this._dropFromPreviousState;
                }
                else {
                    fromPreviousState_1 = this._riseFromPreviousState;
                }
            }
            $iter.each(marker.children.iterator(), function (child) {
                if (dataItem) {
                    child.setState(fromPreviousState_1);
                    child.setState(fromOpenState_1);
                }
                else {
                    // todo: think what to do here, maybe apply above states based on totals?
                    child.setState(_this._riseFromPreviousState);
                    child.setState(_this._riseFromOpenState);
                }
            });
        }
    };
    /**
     * Creates elements in related legend container, that mimics the look of this
     * Series.
     *
     * @ignore Exclude from docs
     * @param marker  Legend item container
     */
    ColumnSeries.prototype.createLegendMarker = function (marker) {
        var w = marker.pixelWidth;
        var h = marker.pixelHeight;
        marker.removeChildren();
        var column = marker.createChild(RoundedRectangle);
        column.shouldClone = false;
        $object.copyProperties(this, column, visualProperties);
        column.copyFrom(this.columns.template);
        column.padding(0, 0, 0, 0); // if columns will have padding (which is often), legend marker will be very narrow
        column.width = w;
        column.height = h;
        var legendDataItem = marker.dataItem;
        legendDataItem.color = this.fill;
        legendDataItem.colorOrig = this.fill;
    };
    /**
     * Copies all properties from another instance of [[ColumnSeries]].
     *
     * @param source  Source series
     */
    ColumnSeries.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        this.columns.template.copyFrom(source.columns.template);
    };
    /**
    * returns bullet x location
    * @ignore
    */
    ColumnSeries.prototype.getBulletLocationX = function (bullet, field) {
        if (this.baseAxis == this.xAxis) {
            var bulletLocationX = bullet.locationX;
            if (!$type.isNumber(bulletLocationX)) {
                bulletLocationX = 0.5;
            }
            var endLocation = this.getEndLocation(bullet.dataItem);
            var startLocation = this.getStartLocation(bullet.dataItem);
            return endLocation - (endLocation - startLocation) * bulletLocationX;
        }
        else {
            return _super.prototype.getBulletLocationX.call(this, bullet, field);
        }
    };
    /**
    * returns bullet y location
    * @ignore
    */
    ColumnSeries.prototype.getBulletLocationY = function (bullet, field) {
        if (this.baseAxis == this.yAxis) {
            var bulletLocationY = bullet.locationY;
            if (!$type.isNumber(bulletLocationY)) {
                bulletLocationY = 0.5;
            }
            var endLocation = this.getEndLocation(bullet.dataItem);
            var startLocation = this.getStartLocation(bullet.dataItem);
            return endLocation - (endLocation - startLocation) * bulletLocationY;
        }
        else {
            return _super.prototype.getBulletLocationY.call(this, bullet, field);
        }
    };
    ColumnSeries.prototype.getAdjustedXLocation = function (dataItem, field, bulletLocationX) {
        //if (this.baseAxis == this.xAxis) {
        if (!$type.isNumber(bulletLocationX)) {
            if (dataItem) {
                bulletLocationX = dataItem.locations[field];
            }
            else {
                bulletLocationX = 0.5;
            }
        }
        return this._endLocation - (this._endLocation - this._startLocation) * (1 - bulletLocationX);
        //}
        //else {
        //	return super.getAdjustedXLocation(dataItem, field);
        //}
    };
    ColumnSeries.prototype.getAdjustedYLocation = function (dataItem, field, bulletLocationY) {
        //if (this.baseAxis == this.yAxis) {
        if (!$type.isNumber(bulletLocationY)) {
            if (dataItem) {
                bulletLocationY = dataItem.locations[field];
            }
            else {
                bulletLocationY = 0.5;
            }
        }
        return this._endLocation - (this._endLocation - this._startLocation) * bulletLocationY;
        //}
        //else {
        //	return super.getAdjustedYLocation(dataItem, field);
        //}
    };
    /**
     * @ignore Exclude from docs
     */
    ColumnSeries.prototype.fixVerticalCoordinate = function (coordinate) {
        var paddingBottom = this.columns.template.pixelPaddingBottom;
        var paddingTop = this.columns.template.pixelPaddingTop;
        var minY = -paddingTop;
        var maxY = this.yAxis.axisLength + paddingBottom;
        return $math.fitToRange(coordinate, minY, maxY);
    };
    /**
     * @ignore Exclude from docs
     */
    ColumnSeries.prototype.fixHorizontalCoordinate = function (coordinate) {
        var paddingLeft = this.columns.template.pixelPaddingLeft;
        var paddingRight = this.columns.template.pixelPaddingRight;
        var minX = -paddingLeft;
        var maxX = this.xAxis.axisLength + paddingRight;
        return $math.fitToRange(coordinate, minX, maxX);
    };
    /**
     * @ignore
     */
    ColumnSeries.prototype.disposeData = function () {
        _super.prototype.disposeData.call(this);
        this.columns.clear();
    };
    return ColumnSeries;
}(XYSeries));
export { ColumnSeries };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["ColumnSeries"] = ColumnSeries;
registry.registeredClasses["ColumnSeriesDataItem"] = ColumnSeriesDataItem;
//# sourceMappingURL=ColumnSeries.js.map