/**
 * XY series module.
 */
import { __extends, __values } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Series, SeriesDataItem } from "./Series";
import { Sprite, visualProperties } from "../../core/Sprite";
import { ValueAxis } from "../axes/ValueAxis";
import { Dictionary } from "../../core/utils/Dictionary";
import { MutableValueDisposer } from "../../core/utils/Disposer";
import { XYChart } from "../types/XYChart";
import { CategoryAxis } from "../axes/CategoryAxis";
import { DateAxis } from "../axes/DateAxis";
import { registry } from "../../core/Registry";
import * as $iter from "../../core/utils/Iterator";
import * as $math from "../../core/utils/Math";
import * as $utils from "../../core/utils/Utils";
import * as $type from "../../core/utils/Type";
import * as $time from "../../core/utils/Time";
import * as $array from "../../core/utils/Array";
import * as $object from "../../core/utils/Object";
import * as $path from "../../core/rendering/Path";
import { options } from "../../core/Options";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[XYSeries]].
 *
 * @see {@link DataItem}
 */
var XYSeriesDataItem = /** @class */ (function (_super) {
    __extends(XYSeriesDataItem, _super);
    /**
     * Constructor
     */
    function XYSeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "XYSeriesDataItem";
        _this.values.customValue = {};
        _this.values.valueX = { stack: 0 };
        _this.values.valueY = { stack: 0 };
        _this.values.openValueX = {};
        _this.values.openValueY = {};
        _this.values.dateX = {};
        _this.values.dateY = {};
        _this.values.openDateX = {};
        _this.values.openDateY = {};
        _this.setLocation("dateX", 0.5, 0);
        _this.setLocation("dateY", 0.5, 0);
        _this.setLocation("categoryX", 0.5, 0);
        _this.setLocation("categoryY", 0.5, 0);
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(XYSeriesDataItem.prototype, "valueX", {
        /**
         * @return Value
         */
        get: function () {
            return this.values.valueX.value;
        },
        /**
         * Item's numeric value on X value axis.
         *
         * @param value  Value
         */
        set: function (value) {
            this.setValue("valueX", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYSeriesDataItem.prototype, "customValue", {
        /**
         * @return Value
         */
        get: function () {
            return this.values.customValue.value;
        },
        /**
         * Item's custom numeric value.
         *
         * @param value  Value
         */
        set: function (value) {
            this.setValue("customValue", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYSeriesDataItem.prototype, "valueY", {
        /**
         * @return Value
         */
        get: function () {
            return this.values.valueY.value;
        },
        /**
         * Item's numeric value on Y value axis.
         *
         * @param value  Value
         */
        set: function (value) {
            this.setValue("valueY", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYSeriesDataItem.prototype, "dateX", {
        /**
         * @return Date
         */
        get: function () {
            return this.getDate("dateX");
        },
        /**
         * Item's date value on X date-based axis.
         *
         * @param date  Date
         */
        set: function (date) {
            this.setDate("dateX", date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYSeriesDataItem.prototype, "dateY", {
        /**
         * @return Date
         */
        get: function () {
            return this.getDate("dateY");
        },
        /**
         * Item's date value on Y date-based axis.
         *
         * @param date  Date
         */
        set: function (date) {
            this.setDate("dateY", date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYSeriesDataItem.prototype, "categoryX", {
        /**
         * @return Category
         */
        get: function () {
            return this.categories.categoryX;
        },
        /**
         * Item's category on X category axis.
         *
         * @param category  Category
         */
        set: function (category) {
            this.setCategory("categoryX", category);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYSeriesDataItem.prototype, "categoryY", {
        /**
         * @return Category
         */
        get: function () {
            return this.categories.categoryY;
        },
        /**
         * Item's category on Y category axis.
         *
         * @param category  Category
         */
        set: function (category) {
            this.setCategory("categoryY", category);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYSeriesDataItem.prototype, "openValueX", {
        /**
         * @return Value
         */
        get: function () {
            return this.values.openValueX.value;
        },
        /**
         * Item's open numeric value on X value axis.
         *
         * @param value  Value
         */
        set: function (value) {
            this.setValue("openValueX", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYSeriesDataItem.prototype, "openValueY", {
        /**
         * @return Value
         */
        get: function () {
            return this.values.openValueY.value;
        },
        /**
         * Item's open numeric value on Y value axis.
         *
         * @param value  Value
         */
        set: function (value) {
            this.setValue("openValueY", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYSeriesDataItem.prototype, "openDateX", {
        /**
         * @return Date
         */
        get: function () {
            return this.getDate("openDateX");
        },
        /**
         * Item's open date value on X date-based axis.
         *
         * @param date  Date
         */
        set: function (date) {
            this.setDate("openDateX", date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYSeriesDataItem.prototype, "openDateY", {
        /**
         * @return Date
         */
        get: function () {
            return this.getDate("openDateY");
        },
        /**
         * Item's open date value on Y date-based axis.
         *
         * @param date  Date
         */
        set: function (date) {
            this.setDate("openDateY", date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYSeriesDataItem.prototype, "openCategoryX", {
        /**
         * @return Category
         */
        get: function () {
            return this.categories.openCategoryX;
        },
        /**
         * Item's open category on X category axis.
         *
         * @param category  Category
         */
        set: function (category) {
            this.setCategory("openCategoryX", category);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYSeriesDataItem.prototype, "openCategoryY", {
        /**
         * @return Category
         */
        get: function () {
            return this.categories.openCategoryY;
        },
        /**
         * Item's open category on Y category axis.
         *
         * @param category  Category
         */
        set: function (category) {
            this.setCategory("openCategoryY", category);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Return smallest value out of all item's value fields.
     *
     * @ignore Exclude from docs
     * @param fields      Fields to check in
     * @param working     Include working (temporary) values
     * @param stackValue  If item is in a stack, the value item starts as
     * @return Value
     */
    XYSeriesDataItem.prototype.getMin = function (fields, working, stackValue) {
        var _this = this;
        //if (this.visible) {  // dumped because of non smooth zooming
        var min;
        if (!$type.isNumber(stackValue)) {
            stackValue = 0;
        }
        $array.each(fields, function (field) {
            var value;
            if (working) {
                value = _this.getWorkingValue(field);
            }
            else {
                value = _this.getValue(field);
            }
            value += stackValue;
            if (value < min || !$type.isNumber(min)) {
                min = value;
            }
        });
        return min;
        //}
    };
    /**
     * Return biggest value out of all item's value fields.
     *
     * @ignore Exclude from docs
     * @param fields      Fields to check in
     * @param working     Include working (temporary) values
     * @param stackValue  If item is in a stack, the value item starts as
     * @return Value
     */
    XYSeriesDataItem.prototype.getMax = function (fields, working, stackValue) {
        var _this = this;
        //if (this.visible) { // dumped because of non smooth zooming
        var max;
        if (!$type.isNumber(stackValue)) {
            stackValue = 0;
        }
        $array.each(fields, function (field) {
            var value;
            if (working) {
                value = _this.getWorkingValue(field);
            }
            else {
                value = _this.getValue(field);
            }
            value += stackValue;
            if (value > max || !$type.isNumber(max)) {
                max = value;
            }
        });
        return max;
        //}
    };
    return XYSeriesDataItem;
}(SeriesDataItem));
export { XYSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines Series for [[XYChart]].
 *
 * @see {@link IXYSeriesEvents} for a list of available Events
 * @see {@link IXYSeriesAdapters} for a list of available Adapters
 * @important
 */
var XYSeries = /** @class */ (function (_super) {
    __extends(XYSeries, _super);
    /**
     * Constructor
     */
    function XYSeries() {
        var _this = _super.call(this) || this;
        /**
         * Indicates which of the series' `dataFields` to calculate aggregate values
         * for.
         *
         * Available data fields for all [[XYSeries]] are:
         * `valueX`, `valueY`, `openValueX`, and `openValueY`.
         *
         * [[CandlestickSeries]] adds:
         * `lowValueX`, `lowValueY`, `highValueX`, and `highValueY`.
         *
         * Available options:
         * `"open"`, `"close"`, `"low"`, `"high"`, `"average"`, `"sum"`.
         *
         * Defaults are as follows:
         * * `valueX`: `"close"`
         * * `valueY`: `"close"`
         * * `openValueX`: `"open"`
         * * `openValueY`: `"open"`
         * * `lowValueX`: `"low"`
         * * `lowValueY`: `"low"`
         * * `highValueX`: `"high"`
         * * `highValueY`: `"high"`
         *
         * Is required only if data being plotted on a `DateAxis` and
         * its `groupData` is set to `true`.
         *
         * ```TypeScript
         * let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
         * dateAxis.groupData = true;
         *
         * let valueAxis = chart.xAxes.push(new am4charts.valueAxis());
         *
         * let series = chart.series.push(new am4charts.LineSeries());
         * series.dataFields.dateX = "date";
         * series.dataFields.valueY = "value";
         * series.groupFields.valueY = "average";
         * ```
         * ```JavaScript
         * var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
         * dateAxis.groupData = true;
         *
         * var valueAxis = chart.xAxes.push(new am4charts.valueAxis());
         *
         * var series = chart.series.push(new am4charts.LineSeries());
         * series.dataFields.dateX = "date";
         * series.dataFields.valueY = "value";
         * series.groupFields.valueY = "average";
         * ```
         * ```JSON
         * {
         *   // ...
         *   "xAxes": [{
         *     "type": "DateAxis",
         *     "groupData": true
         *   }],
         *   "yAxes": [{
         *     "type": "ValueAxis"
         *   }],
         *   "series": [{
         *     "type": "LineSeries",
         *     "dataFields": {
         *       "dateX": "date",
         *       "valueY": "value"
         *     },
         *     "groupFields": {
         *       "valueY": "average"
         *     }
         *   }]
         * }
         * ```
         *
         * The above setup will ensure, that if there are many data items within
         * selected range, they will be grouped into aggregated data points, using
         * average value of all the values.
         *
         * For example if we have 2 years worth of daily data (~700 data items), when
         * fully zoomed out, the chart would show ~100 data items instead: one for
         * each week in those two years.
         *
         * Grouping will occur automatically, based on current selection range, and
         * will change dynamically when user zooms in/out the chart.
         *
         * @see {@link https://www.amcharts.com/docs/v4/concepts/axes/date-axis/#Dynamic_data_item_grouping} for more information about dynamic data item grouping.
         * @since 4.7.0
         */
        _this.groupFields = {};
        /**
         * X axis the series is attached to.
         */
        _this._xAxis = new MutableValueDisposer();
        /**
         * Y axis the series is attached to.
         */
        _this._yAxis = new MutableValueDisposer();
        /**
         * [_xValueFields description]
         *
         * @todo Description
         */
        _this._xValueFields = [];
        /**
         * [_yValueFields description]
         *
         * @todo Description
         */
        _this._yValueFields = [];
        /**
         * @ignore
         */
        _this._baseInterval = {};
        /**
         * @ignore
         */
        _this.dataGrouped = false;
        /**
         * @ignore
         */
        _this.usesShowFields = false;
        /**
         * @ignore
         */
        _this._dataSetChanged = false;
        _this._maxxX = 100000;
        _this._maxxY = 100000;
        _this._propertiesChanged = false;
        /**
         * @ignore
         */
        _this.outOfRange = false;
        _this.className = "XYSeries";
        _this.isMeasured = false;
        _this.groupFields.valueX = "close";
        _this.groupFields.valueY = "close";
        _this.groupFields.customValue = "close";
        _this.groupFields.openValueX = "open";
        _this.groupFields.openValueY = "open";
        _this.cursorTooltipEnabled = true;
        _this.cursorHoverEnabled = true;
        _this.excludeFromTotal = false;
        _this.mainContainer.mask = new Sprite();
        _this.mainContainer.mask.setElement(_this.paper.add("path"));
        _this.stacked = false;
        _this.snapTooltip = false;
        _this._showBullets = false;
        _this.tooltip.pointerOrientation = "horizontal";
        _this.properties.stackToNegative = true;
        _this.hideTooltipWhileZooming = true;
        _this.setPropertyValue("maskBullets", true);
        _this.tooltip.events.on("hidden", function () {
            _this.returnBulletDefaultState();
        }, undefined, false);
        _this._disposers.push(_this._xAxis);
        _this._disposers.push(_this._yAxis);
        _this.observe(visualProperties, function () {
            if (_this.inited) {
                _this._propertiesChanged = true;
                if (_this.legendDataItem) {
                    _this.legendDataItem.childrenCreated = false;
                }
                if (_this.chart && _this.chart.legend) {
                    _this.chart.legend.invalidateDataItems();
                }
                _this.invalidate();
            }
        }, undefined, false);
        _this.applyTheme();
        return _this;
    }
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    XYSeries.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        if (!$type.hasValue(this.readerTitle)) {
            this.readerTitle = this.language.translate("X/Y Series");
        }
    };
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    XYSeries.prototype.createDataItem = function () {
        return new XYSeriesDataItem();
    };
    /**
     * @ignore
     */
    XYSeries.prototype.resetExtremes = function () {
        this._tmin.clear();
        this._tmax.clear();
        this._smin.clear();
        this._smax.clear();
    };
    /**
     * @ignore
     */
    XYSeries.prototype.dataChangeUpdate = function () {
        this.dataGrouped = false;
        this._baseInterval = {};
        this._currentDataSetId = "";
        this.resetExtremes();
        if (this.xAxis) {
            this.xAxis.seriesDataChangeUpdate(this);
        }
        if (this.yAxis) {
            this.yAxis.seriesDataChangeUpdate(this);
        }
    };
    /**
     * (Re)validates the series' data.
     *
     * @ignore Exclude from docs
     */
    XYSeries.prototype.validateData = function () {
        this._baseInterval = {};
        var dataFields = this.dataFields;
        if (dataFields.valueYShow || dataFields.openValueXShow || dataFields.openValueXShow || dataFields.openValueYShow) {
            this.usesShowFields = true;
        }
        else {
            this.usesShowFields = false;
        }
        this.defineFields();
        if (this.data.length > 0) {
            this.dataChangeUpdate();
        }
        _super.prototype.validateData.call(this);
        this.updateItemReaderText();
        if (this.chart) {
            if (!$type.hasValue(this.dataFields[this._xField]) || !$type.hasValue(this.dataFields[this._yField])) {
                throw Error("Data fields for series \"" + (this.name ? this.name : this.uid) + "\" are not properly defined.");
            }
        }
        // 4.7.21 solves 51540
        if (this.inited && this.isHidden) {
            this.hide(0);
        }
        this.dataGrouped = false;
    };
    /**
     * Processes data item.
     *
     * @param dataItem     Data item
     * @param dataContext  Raw data
     * @param index        Index of the data item
     */
    XYSeries.prototype.processDataItem = function (dataItem, dataContext) {
        try {
            _super.prototype.processDataItem.call(this, dataItem, dataContext);
            this.xAxis.processSeriesDataItem(dataItem, "X");
            this.yAxis.processSeriesDataItem(dataItem, "Y");
            this.setInitialWorkingValues(dataItem);
        }
        catch (e) {
            if (this._chart) {
                this._chart.raiseCriticalError(e);
            }
        }
    };
    /**
     *
     * When validating raw data, instead of processing data item, we update it
     *
     * @ignore Exclude from docs
     * @param item
     */
    XYSeries.prototype.updateDataItem = function (dataItem) {
        _super.prototype.updateDataItem.call(this, dataItem);
        //dataItem.events.disable();
        this.xAxis.processSeriesDataItem(dataItem, "X");
        this.yAxis.processSeriesDataItem(dataItem, "Y");
        //dataItem.events.enable();		
    };
    /**
     * Inits data item's working values.
     *
     * @param dataItem  Data item
     * @param index     Data item's index
     */
    XYSeries.prototype.setInitialWorkingValues = function (dataItem) {
    };
    /**
     * @ignore
     */
    XYSeries.prototype.disposeData = function () {
        _super.prototype.disposeData.call(this);
        var xAxis = this.xAxis;
        var yAxis = this.yAxis;
        if (xAxis) {
            var dataItemsX = this.dataItemsByAxis.getKey(xAxis.uid);
            if (dataItemsX) {
                dataItemsX.clear();
            }
            if (xAxis instanceof CategoryAxis) {
                this.clearCatAxis(xAxis);
            }
        }
        if (yAxis) {
            var dataItemsY = this.dataItemsByAxis.getKey(yAxis.uid);
            if (dataItemsY) {
                dataItemsY.clear();
            }
            if (yAxis instanceof CategoryAxis) {
                this.clearCatAxis(yAxis);
            }
        }
    };
    /**
     * @ignore
     */
    XYSeries.prototype.clearCatAxis = function (axis) {
        var uid = this.uid;
        axis.dataItems.each(function (dataItem) {
            if (dataItem.seriesDataItems[uid]) {
                dataItem.seriesDataItems[uid] = [];
            }
        });
    };
    /**
     * Sets up which data fields to use for data access.
     */
    XYSeries.prototype.defineFields = function () {
        var xAxis = this.xAxis;
        var yAxis = this.yAxis;
        if (xAxis && yAxis) {
            var xAxisFieldName = xAxis.axisFieldName;
            var xField = (xAxisFieldName + "X");
            var xOpenField = ("open" + $utils.capitalize(xAxisFieldName) + "X");
            var yAxisFieldName = yAxis.axisFieldName;
            var yField = (yAxisFieldName + "Y");
            var yOpenField = ("open" + $utils.capitalize(yAxisFieldName) + "Y");
            this._xField = xField;
            this._yField = yField;
            if (this.dataFields[xOpenField]) {
                this._xOpenField = xOpenField;
            }
            if (this.dataFields[yOpenField]) {
                this._yOpenField = yOpenField;
            }
            if (!this.dataFields[yOpenField] && this.baseAxis == yAxis) {
                this._yOpenField = yField;
            }
            if (!this.dataFields[xOpenField] && this.baseAxis == xAxis) {
                this._xOpenField = xField;
            }
            if (this.stacked && this.baseAxis == xAxis) {
                this._xOpenField = xField;
            }
            if (this.stacked && this.baseAxis == yAxis) {
                this._yOpenField = yField;
            }
            if ((xAxis instanceof CategoryAxis) && (yAxis instanceof CategoryAxis)) {
                if (!this._yOpenField) {
                    this._yOpenField = yField;
                }
            }
            this._xValueFields = [];
            this._yValueFields = [];
            this.addValueField(xAxis, this._xValueFields, this._xField);
            this.addValueField(xAxis, this._xValueFields, this._xOpenField);
            this.addValueField(yAxis, this._yValueFields, this._yField);
            this.addValueField(yAxis, this._yValueFields, this._yOpenField);
        }
    };
    /**
     * [axis description]
     *
     * @todo Description
     * @param axis    Axis
     * @param fields  Fields (?)
     * @param field   Field
     */
    XYSeries.prototype.addValueField = function (axis, fields, field) {
        if (axis instanceof ValueAxis) {
            if ($type.hasValue(this.dataFields[field]) && fields.indexOf(field) == -1) {
                fields.push(field);
            }
        }
    };
    /**
     * Sets category field from the category axis.
     *
     * User might set field for category axis only, but not for series. In such
     * case, we take field value from axis and set it for series.
     *
     * @param field  Field
     * @param axis   Axis
     */
    XYSeries.prototype.setCategoryAxisField = function (field, axis) {
        if (!$type.hasValue(this.dataFields[field])) {
            this.dataFields[field] = axis.dataFields.category;
        }
    };
    /**
     * Sets date field from the date axis.
     *
     * User might set field for category axis only, but not for series. In such
     * case, we take field value from axis and set it for series.
     *
     * @param field  Field
     * @param axis   Axis
     */
    XYSeries.prototype.setDateAxisField = function (field, axis) {
        if (!$type.hasValue(this.dataFields[field])) {
            this.dataFields[field] = axis.dataFields.date;
        }
    };
    /**
     * Performs after-draw tasks, e.g. creates masks.
     */
    XYSeries.prototype.afterDraw = function () {
        _super.prototype.afterDraw.call(this);
        this.createMask();
    };
    /**
     * Create a mask for the series.
     *
     * @ignore Exclude from docs
     */
    XYSeries.prototype.createMask = function () {
        // this mask from which we cut out ranges. does not work well if ranges overlap.
        if (this.mainContainer.mask) {
            var path_1 = this.getMaskPath();
            // @todo: this approach won't work well on circluar or other non x/y axes
            $iter.each(this.axisRanges.iterator(), function (range) {
                if (range.axisFill.fillPath) {
                    range.axisFill.validate();
                    path_1 += range.axisFill.fillPath;
                }
            });
            this.mainContainer.mask.path = path_1;
        }
    };
    /**
     * Returns an SVG path to use as series mask.
     *
     * @return SVG path
     */
    XYSeries.prototype.getMaskPath = function () {
        if (this.xAxis && this.yAxis) {
            return $path.rectToPath({
                x: 0,
                y: 0,
                width: this.xAxis.axisLength,
                height: this.yAxis.axisLength
            });
        }
        return "";
    };
    /**
     * Returns axis data field to use.
     *
     * @param axis  Axis
     * @return Field name
     */
    XYSeries.prototype.getAxisField = function (axis) {
        if (axis == this.xAxis) {
            return this.xField;
        }
        if (axis == this.yAxis) {
            return this.yField;
        }
    };
    /**
     * Validates data items.
     *
     * @ignore Exclude from docs
     */
    XYSeries.prototype.validateDataItems = function () {
        var chart = this.chart;
        if (chart) {
            this._maxxX = $math.max(100000, chart.plotContainer.maxWidth * 2);
            this._maxxY = $math.max(100000, chart.plotContainer.maxHeight * 2);
        }
        // this helps date axis to check which baseInterval we should use
        var xAxis = this.xAxis;
        var yAxis = this.yAxis;
        if (xAxis && yAxis) {
            xAxis.updateAxisBySeries();
            yAxis.updateAxisBySeries();
        }
        _super.prototype.validateDataItems.call(this);
        if (xAxis && yAxis) {
            xAxis.postProcessSeriesDataItems(this);
            yAxis.postProcessSeriesDataItems(this);
        }
    };
    /**
     * Validates data range.
     *
     * @ignore Exclude from docs
     */
    XYSeries.prototype.validateDataRange = function () {
        var xAxis = this.xAxis;
        var yAxis = this.yAxis;
        if (xAxis && yAxis) {
            if (xAxis.dataRangeInvalid) {
                xAxis.validateDataRange();
            }
            if (yAxis.dataRangeInvalid) {
                yAxis.validateDataRange();
            }
        }
        _super.prototype.validateDataRange.call(this);
    };
    /**
     * (Re)validates the whole series, effectively causing it to redraw.
     *
     * @ignore Exclude from docs
     */
    XYSeries.prototype.validate = function () {
        var xAxis = this.xAxis;
        var yAxis = this.yAxis;
        if (xAxis && yAxis) {
            if (xAxis.invalid) {
                xAxis.validate();
            }
            if (yAxis.invalid) {
                yAxis.validate();
            }
            this.y = yAxis.pixelY;
            this.x = xAxis.pixelX;
            this._showBullets = true;
            var minBulletDistance = this.minBulletDistance;
            if ($type.isNumber(minBulletDistance)) {
                if (this.baseAxis.axisLength / (this.endIndex - this.startIndex) < minBulletDistance) {
                    this._showBullets = false;
                }
            }
        }
        this.updateTooltip();
        if ((xAxis instanceof DateAxis && xAxis.groupData && !this.dataGrouped) || (yAxis instanceof DateAxis && yAxis.groupData && !this.dataGrouped)) {
            return;
        }
        _super.prototype.validate.call(this);
        var chart = this.chart;
        var maskBullets = this.maskBullets;
        if (chart && maskBullets) {
            if (chart.className == "XYChart") {
                if (chart.leftAxesContainer.layout == "vertical" || chart.rightAxesContainer.layout == "vertical") {
                    if (this.yAxis) {
                        this.bulletsContainer.mask = this.yAxis.renderer.gridContainer;
                    }
                    else {
                        this.bulletsContainer.mask = undefined;
                    }
                }
                if (chart.topAxesContainer.layout == "horizontal" || chart.bottomAxesContainer.layout == "horizontal") {
                    if (this.xAxis) {
                        this.bulletsContainer.mask = this.xAxis.renderer.gridContainer;
                    }
                    else {
                        this.bulletsContainer.mask = undefined;
                    }
                }
            }
        }
    };
    Object.defineProperty(XYSeries.prototype, "xAxis", {
        /**
         * @return Axis
         */
        get: function () {
            if (this.chart) {
                if (!this._xAxis.get()) {
                    var axis = this.chart.xAxes.getIndex(0);
                    if (!axis) {
                        throw Error("There are no X axes on chart.");
                    }
                    this.xAxis = axis;
                }
                return this._xAxis.get();
            }
        },
        /**
         * X axis the series is attached to.
         *
         * @param axis  Axis
         */
        set: function (axis) {
            this.setXAxis(axis);
        },
        enumerable: true,
        configurable: true
    });
    XYSeries.prototype.setXAxis = function (axis) {
        var oldAxis = this._xAxis.get();
        if (oldAxis != axis) {
            if (oldAxis) {
                this.dataItemsByAxis.removeKey(oldAxis.uid);
                // TODO why is this here ?
                this._xAxis.dispose();
                // temp @todo: why it is not disposed?
                oldAxis.series.removeValue(this);
            }
            this._xAxis.set(axis, axis.registerSeries(this));
            this.dataItemsByAxis.setKey(axis.uid, new Dictionary());
            this.invalidateData();
        }
    };
    Object.defineProperty(XYSeries.prototype, "yAxis", {
        /**
         * @return Axis
         */
        get: function () {
            if (this.chart) {
                if (!this._yAxis.get()) {
                    var axis = this.chart.yAxes.getIndex(0);
                    if (!axis) {
                        throw Error("There are no Y axes on chart.");
                    }
                    this.yAxis = axis;
                }
                return this._yAxis.get();
            }
        },
        /**
         * Y axis the series is attached to.
         *
         * @param axis  Axis
         */
        set: function (axis) {
            this.setYAxis(axis);
        },
        enumerable: true,
        configurable: true
    });
    XYSeries.prototype.setYAxis = function (axis) {
        var oldAxis = this._yAxis.get();
        if (oldAxis != axis) {
            if (oldAxis) {
                this.dataItemsByAxis.removeKey(oldAxis.uid);
                // TODO why is this here ?
                this._yAxis.dispose();
                // temp @todo: why it is not disposed?
                oldAxis.series.removeValue(this);
            }
            this._yAxis.set(axis, axis.registerSeries(this));
            if (axis.chart instanceof XYChart) {
                axis.chart.handleYAxisSet(this);
            }
            this.dataItemsByAxis.setKey(axis.uid, new Dictionary());
            this.invalidateData();
        }
    };
    Object.defineProperty(XYSeries.prototype, "baseAxis", {
        /**
         * @return Axis
         */
        get: function () {
            var xAxis = this.xAxis;
            var yAxis = this.yAxis;
            if (!this._baseAxis && xAxis && yAxis) {
                if (yAxis instanceof DateAxis) {
                    this._baseAxis = yAxis;
                }
                if (xAxis instanceof DateAxis) {
                    this._baseAxis = xAxis;
                }
                if (yAxis instanceof CategoryAxis) {
                    this._baseAxis = yAxis;
                }
                if (xAxis instanceof CategoryAxis) {
                    this._baseAxis = xAxis;
                }
                if (!this._baseAxis) {
                    this._baseAxis = xAxis;
                }
            }
            return this._baseAxis;
        },
        /**
         * The main (base) axis.
         *
         * This is the axis that series fills will go to, or grow animations will
         * happen from.
         *
         * @param value  Axis
         */
        set: function (value) {
            if (this._baseAxis != value) {
                this._baseAxis = value;
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds one or several (array) of data items to the existing data.
     *
     * @param rawDataItem One or many raw data item objects
     */
    XYSeries.prototype.addData = function (rawDataItem, removeCount, skipRaw) {
        _super.prototype.addData.call(this, rawDataItem, removeCount, skipRaw);
        var scrollbarSeries = this.scrollbarSeries;
        if (scrollbarSeries) {
            this.scrollbarSeries.addData(rawDataItem, removeCount, true);
            this.scrollbarSeries._parseDataFrom = this._parseDataFrom;
        }
    };
    XYSeries.prototype.setData = function (value) {
        _super.prototype.setData.call(this, value);
        if (this.scrollbarSeries) {
            this.scrollbarSeries.setData(value);
        }
    };
    /**
     * Makes the chart use particular data set.
     *
     * If `id` is not provided or there is no such data set, main data will be
     * used.
     *
     * @ignore
     * @since 4.7.0
     * @param  id  Data set id
     */
    XYSeries.prototype.setDataSet = function (id) {
        var changed = _super.prototype.setDataSet.call(this, id);
        if (changed) {
            this._dataSetChanged = true;
            var dataItems = this.dataItems;
            this.resetExtremes();
            if (dataItems && dataItems.length > 0) {
                var xAxis = this.xAxis;
                var yAxis = this.yAxis;
                this._prevStartIndex = undefined;
                this._prevEndIndex = undefined;
                this._startIndex = undefined;
                this._endIndex = undefined;
                if (!this.appeared) {
                    this.processValues(false); // this will slow down!
                }
                if (xAxis instanceof DateAxis && xAxis == this.baseAxis) {
                    this._tmin.setKey(xAxis.uid, dataItems.getIndex(0).dateX.getTime());
                    this._tmax.setKey(xAxis.uid, dataItems.getIndex(dataItems.length - 1).dateX.getTime());
                    this.dispatch("extremeschanged");
                }
                if (yAxis instanceof DateAxis && yAxis == this.baseAxis) {
                    this._tmin.setKey(yAxis.uid, dataItems.getIndex(0).dateY.getTime());
                    this._tmax.setKey(yAxis.uid, dataItems.getIndex(dataItems.length - 1).dateY.getTime());
                    this.dispatch("extremeschanged");
                }
            }
        }
        return changed;
    };
    /**
     * Processes values after data items' were added.
     *
     * @ignore Exclude from docs
     * @param dataItems  Data items
     */
    XYSeries.prototype.processValues = function (working) {
        _super.prototype.processValues.call(this, working);
        var xAxis = this.xAxis;
        var yAxis = this.yAxis;
        if (!xAxis || !yAxis) {
            return;
        }
        var dataItems = this.dataItems;
        var minX = Infinity;
        var maxX = -Infinity;
        var minY = Infinity;
        var maxY = -Infinity;
        var startIndex = this.startIndex;
        var endIndex = this.endIndex;
        var workingStartIndex = startIndex;
        var workingEndIndex = endIndex;
        if (!working) {
            startIndex = 0;
            endIndex = this.dataItems.length;
        }
        for (var i = startIndex; i < endIndex; i++) {
            var dataItem = dataItems.getIndex(i);
            this.getStackValue(dataItem, working);
            var stackX = dataItem.getValue("valueX", "stack");
            var stackY = dataItem.getValue("valueY", "stack");
            if (!working) {
                stackX = dataItem.getValue("valueX", "stackTrue");
                stackY = dataItem.getValue("valueY", "stackTrue");
            }
            minX = $math.min(dataItem.getMin(this._xValueFields, working, stackX), minX);
            minY = $math.min(dataItem.getMin(this._yValueFields, working, stackY), minY);
            maxX = $math.max(dataItem.getMax(this._xValueFields, working, stackX), maxX);
            maxY = $math.max(dataItem.getMax(this._yValueFields, working, stackY), maxY);
            // if it's stacked, pay attention to stack value
            if (this.stacked) {
                if (this.baseAxis == xAxis) {
                    if (stackY < minY) {
                        minY = stackY;
                    }
                    if (stackY > maxY) {
                        maxY = stackY;
                    }
                }
                if (this.baseAxis == yAxis) {
                    if (stackX < minX) {
                        minX = stackX;
                    }
                    if (stackX > maxX) {
                        maxX = stackX;
                    }
                }
            }
        }
        // this is mainly for value axis to calculate total and perecent.total of each series category
        xAxis.processSeriesDataItems();
        yAxis.processSeriesDataItems();
        var xAxisId = xAxis.uid;
        var yAxisId = yAxis.uid;
        if (this.xAxis instanceof ValueAxis && (minX == Infinity || maxX == -Infinity)) {
            this._smin.setKey(xAxisId, undefined);
            this._smax.setKey(xAxisId, undefined);
            this.dispatchImmediately("selectionextremeschanged");
            return;
        }
        if (this.yAxis instanceof ValueAxis && (minY == Infinity || maxY == -Infinity)) {
            this._smin.setKey(yAxisId, undefined);
            this._smax.setKey(yAxisId, undefined);
            this.dispatchImmediately("selectionextremeschanged");
            return;
        }
        if (!working) {
            if (this._tmin.getKey(xAxisId) != minX || this._tmax.getKey(xAxisId) != maxX || this._tmin.getKey(yAxisId) != minY || this._tmax.getKey(yAxisId) != maxY) {
                this._tmin.setKey(xAxisId, minX);
                this._tmax.setKey(xAxisId, maxX);
                this._tmin.setKey(yAxisId, minY);
                this._tmax.setKey(yAxisId, maxY);
                var stackedSeries = this.stackedSeries;
                if (stackedSeries) {
                    if (stackedSeries.isDisposed()) {
                        this.stackedSeries = undefined;
                    }
                    else {
                        stackedSeries.processValues(false);
                    }
                }
                this.dispatchImmediately("extremeschanged");
            }
        }
        if (startIndex != workingStartIndex || endIndex != workingEndIndex) {
            minX = Infinity;
            maxX = -Infinity;
            minY = Infinity;
            maxY = -Infinity;
            for (var i = workingStartIndex; i < workingEndIndex; i++) {
                var dataItem = dataItems.getIndex(i);
                this.getStackValue(dataItem, working);
                var stackX = dataItem.getValue("valueX", "stack");
                var stackY = dataItem.getValue("valueY", "stack");
                if (!working) {
                    stackX = dataItem.getValue("valueX", "stackTrue");
                    stackY = dataItem.getValue("valueY", "stackTrue");
                }
                minX = $math.min(dataItem.getMin(this._xValueFields, working, stackX), minX);
                minY = $math.min(dataItem.getMin(this._yValueFields, working, stackY), minY);
                maxX = $math.max(dataItem.getMax(this._xValueFields, working, stackX), maxX);
                maxY = $math.max(dataItem.getMax(this._yValueFields, working, stackY), maxY);
                // if it's stacked, pay attention to stack value
                if (this.stacked) {
                    if (this.baseAxis == xAxis) {
                        if (stackY < minY) {
                            minY = stackY;
                        }
                        if (stackY > maxY) {
                            maxY = stackY;
                        }
                    }
                    if (this.baseAxis == yAxis) {
                        if (stackX < minX) {
                            minX = stackX;
                        }
                        if (stackX > maxX) {
                            maxX = stackX;
                        }
                    }
                }
            }
        }
        if (this.xAxis instanceof ValueAxis && (minX == Infinity || maxX == -Infinity)) {
            this._smin.setKey(xAxisId, undefined);
            this._smax.setKey(xAxisId, undefined);
            this.dispatchImmediately("selectionextremeschanged");
            return;
        }
        if (this.yAxis instanceof ValueAxis && (minY == Infinity || maxY == -Infinity)) {
            this._smin.setKey(yAxisId, undefined);
            this._smax.setKey(yAxisId, undefined);
            this.dispatchImmediately("selectionextremeschanged");
            return;
        }
        if (this._smin.getKey(xAxisId) != minX || this._smax.getKey(xAxisId) != maxX || this._smin.getKey(yAxisId) != minY || this._smax.getKey(yAxisId) != maxY) {
            this._smin.setKey(xAxisId, minX);
            this._smax.setKey(xAxisId, maxX);
            this._smin.setKey(yAxisId, minY);
            this._smax.setKey(yAxisId, maxY);
            if (this.appeared || this.start != 0 || this.end != 1 || this.dataItems != this.mainDataSet) {
                /// new, helps to handle issues with change percent
                var changed = false;
                if (yAxis instanceof ValueAxis && !(yAxis instanceof DateAxis)) {
                    var tmin = this._tmin.getKey(yAxisId);
                    if (!$type.isNumber(tmin) || ((this.usesShowFields || this._dataSetChanged || (xAxis instanceof DateAxis && xAxis.groupData && this.isShowing)) && minY < tmin) || (this.stackedSeries && !this.isHidden && !working)) {
                        this._tmin.setKey(yAxisId, minY);
                        changed = true;
                    }
                    var tmax = this._tmax.getKey(yAxisId);
                    if (!$type.isNumber(tmax) || ((this.usesShowFields || this._dataSetChanged || (xAxis instanceof DateAxis && xAxis.groupData && this.isShowing)) && maxY > tmax) || (this.stackedSeries && !this.isHidden && !working)) {
                        this._tmax.setKey(yAxisId, maxY);
                        changed = true;
                    }
                }
                if (xAxis instanceof ValueAxis && !(xAxis instanceof DateAxis)) {
                    var tmin = this._tmin.getKey(xAxisId);
                    if (!$type.isNumber(tmin) || ((this.usesShowFields || this._dataSetChanged || (yAxis instanceof DateAxis && yAxis.groupData && this.isShowing)) && minX < tmin) || (this.stackedSeries && !this.isHidden && !working)) {
                        this._tmin.setKey(xAxisId, minX);
                        changed = true;
                    }
                    var tmax = this._tmax.getKey(xAxisId);
                    if (!$type.isNumber(tmax) || ((this.usesShowFields || this._dataSetChanged || (yAxis instanceof DateAxis && yAxis.groupData && this.isShowing)) && maxX > tmax) || (this.stackedSeries && !this.isHidden && !working)) {
                        this._tmax.setKey(xAxisId, maxX);
                        changed = true;
                    }
                }
                if (changed) {
                    this.dispatchImmediately("extremeschanged");
                }
                if (this.start == 0 && this.end == 1) {
                    // yes, its ok. otherwise min/max won't be updated when zooming out
                    this._dataSetChanged = false;
                }
                this.dispatchImmediately("selectionextremeschanged");
            }
        }
        if (!working && this.stacked) {
            this.processValues(true);
        }
    };
    /**
     * Hides element's [[Tooltip]].
     *
     * @see {@link Tooltip}
     */
    XYSeries.prototype.hideTooltip = function (duration) {
        _super.prototype.hideTooltip.call(this, duration);
        this.returnBulletDefaultState();
        this._prevTooltipDataItem = undefined;
    };
    /**
     * Shows series tooltip at specific position.
     *
     * @param xPosition  X
     * @param yPosition  Y
     */
    XYSeries.prototype.showTooltipAtPosition = function (xPosition, yPosition) {
        var dataItem;
        if (this.visible && !this.isHiding && !this.isShowing) {
            var xAxis = this._xAxis.get();
            var yAxis = this._yAxis.get();
            if (xAxis == this.baseAxis) {
                dataItem = xAxis.getSeriesDataItem(this, xAxis.toAxisPosition(xPosition), this.snapTooltip);
            }
            if (yAxis == this.baseAxis) {
                dataItem = yAxis.getSeriesDataItem(this, yAxis.toAxisPosition(yPosition), this.snapTooltip);
            }
            var point = this.showTooltipAtDataItem(dataItem);
            if (point) {
                return point;
            }
            // so that if tooltip is shown on columns or bullets for it not to be hidden
            if (!this.tooltipText && !this.tooltipHTML) {
                return;
            }
        }
        this.hideTooltip();
    };
    XYSeries.prototype.getAdjustedXLocation = function (dataItem, field, bulletLocationX) {
        return dataItem.locations[field];
    };
    XYSeries.prototype.getAdjustedYLocation = function (dataItem, field, bulletLocationY) {
        return dataItem.locations[field];
    };
    /**
     * Shows series tooltip at specific dataItem.
     *
     * @param dataItem
     */
    XYSeries.prototype.showTooltipAtDataItem = function (dataItem) {
        var e_1, _a;
        var cursor = this.chart.cursor;
        if (cursor && cursor.hideSeriesTooltipsOnSelection && cursor.selection.visible && cursor.downPoint) {
            this.hideTooltip();
            return;
        }
        this.returnBulletDefaultState(dataItem);
        if (dataItem && dataItem.visible) {
            this.updateLegendValue(dataItem);
            if (this.cursorTooltipEnabled) {
                this.tooltipDataItem = dataItem;
                // todo: add tooltipXField and tooltipYField.
                var tooltipXField = this.tooltipXField;
                var tooltipYField = this.tooltipYField;
                if ($type.hasValue(dataItem[tooltipXField]) && $type.hasValue(dataItem[tooltipYField])) {
                    var tooltipPoint = this.getPoint(dataItem, tooltipXField, tooltipYField, this.getAdjustedXLocation(dataItem, tooltipXField), this.getAdjustedYLocation(dataItem, tooltipYField));
                    if (tooltipPoint) {
                        if (this.chart.className == "XYChart" && (tooltipPoint.y < -1 || tooltipPoint.y > this.yAxis.pixelHeight + 1 || tooltipPoint.x < -1 || tooltipPoint.x > this.xAxis.pixelWidth + 1)) {
                            // void
                        }
                        else {
                            this.tooltipX = tooltipPoint.x;
                            this.tooltipY = tooltipPoint.y;
                            if (this._prevTooltipDataItem != dataItem) {
                                this.dispatchImmediately("tooltipshownat", {
                                    type: "tooltipshownat",
                                    target: this,
                                    dataItem: dataItem
                                });
                                this._prevTooltipDataItem = dataItem;
                            }
                            if (this.cursorHoverEnabled) {
                                try {
                                    for (var _b = __values(dataItem.sprites), _c = _b.next(); !_c.done; _c = _b.next()) {
                                        var sprite = _c.value;
                                        if (!sprite.parent.visible || sprite.isHidden || sprite.__disabled || sprite.disabled || sprite.isHiding) {
                                        }
                                        else {
                                            if (!sprite.interactions.isRealHover) {
                                                sprite.dispatchImmediately("over");
                                                sprite.interactions.isRealHover = true;
                                            }
                                            sprite.isHover = true;
                                        }
                                    }
                                }
                                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                finally {
                                    try {
                                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                    }
                                    finally { if (e_1) throw e_1.error; }
                                }
                            }
                            if (this.showTooltip()) {
                                return $utils.spritePointToSvg({ x: tooltipPoint.x, y: tooltipPoint.y }, this);
                            }
                            return;
                        }
                    }
                }
            }
        }
        else {
            this.updateLegendValue(dataItem, true);
        }
    };
    /**
     * Returns default state to bullets when tooltip is shown at some other data
     * item or hidden
     */
    XYSeries.prototype.returnBulletDefaultState = function (dataItem) {
        var e_2, _a;
        if (this._prevTooltipDataItem && this._prevTooltipDataItem != dataItem) {
            try {
                for (var _b = __values(this._prevTooltipDataItem.sprites), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var sprite = _c.value;
                    if (!sprite.isDisposed()) {
                        var fireEvent = sprite.interactions.isRealHover;
                        sprite.isHover = false;
                        if (fireEvent) {
                            sprite.dispatchImmediately("out");
                        }
                    }
                    else {
                        this._prevTooltipDataItem = undefined;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    };
    XYSeries.prototype.shouldCreateBullet = function (dataItem, bulletTemplate) {
        // use series xField/yField if bullet doesn't have fields set
        var xField = bulletTemplate.xField;
        if (!$type.hasValue(xField)) {
            xField = this.xField;
        }
        var yField = bulletTemplate.yField;
        if (!$type.hasValue(yField)) {
            yField = this.yField;
        }
        if ((this.xAxis instanceof ValueAxis && !dataItem.hasValue([xField])) || (this.yAxis instanceof ValueAxis && !dataItem.hasValue([yField]))) {
            return false;
        }
        if (bulletTemplate.disabled) {
            var disabledField = bulletTemplate.propertyFields.disabled;
            var dataContext = dataItem.dataContext;
            if (dataContext && dataContext[disabledField] === false) {
                return true;
            }
            else {
                return false;
            }
        }
        return true;
    };
    /**
     * @ignore
     */
    XYSeries.prototype.updateTooltip = function () {
        if (!this.hideTooltipWhileZooming && this.tooltip && !this.tooltip.isHidden && !this.isHiding && !this.isHidden && this.tooltipDataItem) {
            this.showTooltipAtDataItem(this.tooltipDataItem);
        }
    };
    /**
     * @ignore
     */
    XYSeries.prototype.positionBullet = function (bullet) {
        _super.prototype.positionBullet.call(this, bullet);
        var dataItem = bullet.dataItem;
        // use series xField/yField if bullet doesn't have fields set
        var xField = bullet.xField;
        if (!$type.hasValue(xField)) {
            xField = this.xField;
        }
        var yField = bullet.yField;
        if (!$type.hasValue(yField)) {
            yField = this.yField;
        }
        var xAxis = this.xAxis;
        var yAxis = this.yAxis;
        if ((xAxis instanceof ValueAxis && !dataItem.hasValue([xField])) || (yAxis instanceof ValueAxis && !dataItem.hasValue([yField]))) {
            bullet.visible = false;
        }
        else {
            var bulletLocationX = this.getBulletLocationX(bullet, xField);
            var bulletLocationY = this.getBulletLocationY(bullet, yField);
            var point = this.getPoint(dataItem, xField, yField, bulletLocationX, bulletLocationY);
            if (point) {
                var xOpenField = this.xOpenField;
                var yOpenField = this.yOpenField;
                var positionX = void 0;
                var positionY = void 0;
                if (xAxis instanceof DateAxis) {
                    if (!$type.isNumber(bulletLocationX)) {
                        bulletLocationX = 0;
                    }
                    var openValue = void 0;
                    var closeValue = dataItem.getWorkingValue(xField);
                    if (!xOpenField) {
                        if (xAxis == this.baseAxis) {
                            openValue = xAxis.baseValue;
                        }
                    }
                    else {
                        openValue = dataItem.getWorkingValue(xOpenField);
                    }
                    if (!$type.isNumber(openValue)) {
                        openValue = closeValue;
                    }
                    var stack = dataItem.getValue("valueX", "stack");
                    openValue += stack;
                    closeValue += stack;
                    if (openValue == closeValue) {
                        var baseInterval = xAxis.baseInterval;
                        var dateFormatter = xAxis.dateFormatter;
                        openValue = $time.round(new Date(openValue), baseInterval.timeUnit, baseInterval.count, dateFormatter.firstDayOfWeek, dateFormatter.utc, undefined, dateFormatter.timezoneMinutes, dateFormatter.timezone).getTime();
                        closeValue = $time.add(new Date(openValue), baseInterval.timeUnit, baseInterval.count, dateFormatter.utc).getTime();
                    }
                    var middleValue = void 0;
                    if (xAxis == this.baseAxis) {
                        middleValue = openValue + (closeValue - openValue) * bulletLocationX;
                    }
                    else {
                        middleValue = openValue + (closeValue - openValue) * (1 - bulletLocationX);
                    }
                    positionX = xAxis.valueToPosition(middleValue);
                }
                else if (xAxis instanceof ValueAxis) {
                    if (!$type.isNumber(bulletLocationX)) {
                        bulletLocationX = 0;
                    }
                    var openValue = void 0;
                    var closeValue = dataItem.getWorkingValue(xField);
                    if (!xOpenField) {
                        openValue = xAxis.baseValue;
                    }
                    else {
                        openValue = dataItem.getWorkingValue(xOpenField);
                    }
                    var stack = dataItem.getValue("valueX", "stack");
                    openValue += stack;
                    closeValue += stack;
                    var middleValue = openValue + (closeValue - openValue) * (1 - bulletLocationX);
                    positionX = xAxis.valueToPosition(middleValue);
                }
                else if (xAxis instanceof CategoryAxis) {
                    var rightLocation = this.getAdjustedXLocation(dataItem, xField, bullet.locationX);
                    var leftLocation = this.getAdjustedXLocation(dataItem, xOpenField, bullet.locationX);
                    positionX = xAxis.categoryToPosition(dataItem[xField], rightLocation);
                    var openPositionX = void 0;
                    if (xOpenField) {
                        openPositionX = xAxis.categoryToPosition(dataItem[xOpenField], leftLocation);
                    }
                    if (!$type.isNumber(openPositionX)) {
                        openPositionX = 1;
                    }
                    positionX = openPositionX + (positionX - openPositionX) * bulletLocationX;
                }
                if (yAxis instanceof DateAxis) {
                    if (!$type.isNumber(bulletLocationY)) {
                        bulletLocationY = 0;
                    }
                    var openValue = void 0;
                    var closeValue = dataItem.getWorkingValue(yField);
                    if (!yOpenField) {
                        if (yAxis == this.baseAxis) {
                            openValue = yAxis.baseValue;
                        }
                    }
                    else {
                        openValue = dataItem.getWorkingValue(yOpenField);
                    }
                    if (!$type.isNumber(openValue)) {
                        openValue = closeValue;
                    }
                    var stack = dataItem.getValue("valueY", "stack");
                    openValue += stack;
                    closeValue += stack;
                    if (openValue == closeValue) {
                        var baseInterval = yAxis.baseInterval;
                        var dateFormatter = yAxis.dateFormatter;
                        openValue = $time.round(new Date(openValue), baseInterval.timeUnit, baseInterval.count, dateFormatter.firstDayOfWeek, dateFormatter.utc, undefined, dateFormatter.timezoneMinutes, dateFormatter.timezone).getTime();
                        closeValue = $time.add(new Date(openValue), baseInterval.timeUnit, baseInterval.count, dateFormatter.utc).getTime();
                    }
                    var middleValue = void 0;
                    if (yAxis == this.baseAxis) {
                        middleValue = openValue + (closeValue - openValue) * bulletLocationY;
                    }
                    else {
                        middleValue = openValue + (closeValue - openValue) * (1 - bulletLocationY);
                    }
                    positionY = yAxis.valueToPosition(middleValue);
                }
                else if (yAxis instanceof ValueAxis) {
                    if (!$type.isNumber(bulletLocationY)) {
                        bulletLocationY = 0;
                    }
                    var openValue = void 0;
                    var closeValue = dataItem.getWorkingValue(yField);
                    if (!yOpenField) {
                        openValue = yAxis.baseValue;
                    }
                    else {
                        openValue = dataItem.getWorkingValue(yOpenField);
                    }
                    var stack = dataItem.getValue("valueY", "stack");
                    openValue += stack;
                    closeValue += stack;
                    var middleValue = openValue + (closeValue - openValue) * (1 - bulletLocationY);
                    positionY = yAxis.valueToPosition(middleValue);
                }
                else if (yAxis instanceof CategoryAxis) {
                    positionY = yAxis.categoryToPosition(dataItem[yField], bulletLocationY);
                    var topLocation = this.getAdjustedYLocation(dataItem, yField, bullet.locationY);
                    var bottomLocation = this.getAdjustedYLocation(dataItem, yOpenField, bullet.locationY);
                    positionY = yAxis.categoryToPosition(dataItem[yField], topLocation);
                    var openPositionY = void 0;
                    if (yOpenField) {
                        openPositionY = yAxis.categoryToPosition(dataItem[yOpenField], bottomLocation);
                    }
                    if (!$type.isNumber(openPositionY)) {
                        openPositionY = 1;
                    }
                    positionY = openPositionY + (positionY - openPositionY) * bulletLocationY;
                }
                bullet.visible = true;
                this.positionBulletReal(bullet, positionX, positionY);
            }
            else {
                bullet.visible = false;
            }
        }
    };
    XYSeries.prototype.positionBulletReal = function (bullet, positionX, positionY) {
        bullet.x = this.xAxis.renderer.positionToPoint(positionX, positionY).x;
        bullet.y = this.yAxis.renderer.positionToPoint(positionY, positionX).y;
    };
    /**
     * returns bullet x location
     * @ignore
     */
    XYSeries.prototype.getBulletLocationX = function (bullet, field) {
        var bulletLocation = bullet.locationX;
        var dataItem = bullet.dataItem;
        if (!$type.isNumber(bulletLocation)) {
            bulletLocation = dataItem.workingLocations[field];
        }
        return bulletLocation;
    };
    /**
     * Returns bullet x location
     * @ignore
     */
    XYSeries.prototype.getBulletLocationY = function (bullet, field) {
        var bulletLocation = bullet.locationY;
        var dataItem = bullet.dataItem;
        if (!$type.isNumber(bulletLocation)) {
            bulletLocation = dataItem.workingLocations[field];
        }
        return bulletLocation;
    };
    /**
     * This method must be called if you update Series' data fields that might
     * affect stacking of the series.
     *
     * Since individual `dataField` changes are not being monitored, you need
     * todo it manually for changes to take affect.
     *
     * @since 4.7.21
     */
    XYSeries.prototype.updateStacking = function () {
        var _this = this;
        this.invalidateDataItems();
        if (this.chart) {
            this.chart.series.each(function (series) {
                if (series.baseAxis == _this.baseAxis) {
                    series.stackedSeries = undefined;
                    series.invalidateDataItems();
                    series.invalidateProcessedData();
                }
            });
        }
    };
    Object.defineProperty(XYSeries.prototype, "stacked", {
        /**
         * @return Can be stacked?
         */
        get: function () {
            return this.getPropertyValue("stacked");
        },
        /**
         * Can items from this series be included into stacks?
         *
         * Note: proper stacking is only possible if series have the same number
         * of data items. To ensure this, don't set data directly on series
         * but do this on chart instead.
         *
         * @default false
         * @param stacked  Can be stacked?
         */
        set: function (stacked) {
            if (this.setPropertyValue("stacked", stacked, true)) {
                this.updateStacking();
                var xAxis = this.xAxis;
                var yAxis = this.yAxis;
                if (!stacked) {
                    var field_1;
                    if (xAxis != this.baseAxis && xAxis instanceof ValueAxis) {
                        field_1 = this.xField;
                    }
                    if (yAxis != this.baseAxis && yAxis instanceof ValueAxis) {
                        field_1 = this.yField;
                    }
                    if (field_1) {
                        this.dataItems.each(function (dataItem) {
                            dataItem.setCalculatedValue(field_1, 0, "stack");
                            dataItem.setCalculatedValue(field_1, 0, "stackTrue");
                        });
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYSeries.prototype, "snapTooltip", {
        /**
         * @return Should snap?
         */
        get: function () {
            return this.getPropertyValue("snapTooltip");
        },
        /**
         * Should the nearest tooltip be shown if no data item is found on the
         * current cursor position? In order this to work, you should set snapTooltip = false on the series baseAxis.
         *
         * @default false
         * @param value  Should snap?
         */
        set: function (value) {
            this.setPropertyValue("snapTooltip", value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Shows hidden series.
     *
     * @param duration  Duration of reveal animation (ms)
     * @return Animation
     */
    XYSeries.prototype.show = function (duration) {
        var _this = this;
        if (this.isHidden) {
            if (this.appeared && this.xAxis instanceof DateAxis && this.xAxis.groupData) {
                this._tmin.setKey(this.yAxis.uid, undefined);
                this._tmax.setKey(this.yAxis.uid, undefined);
            }
            if (this.appeared && this.yAxis instanceof DateAxis && this.yAxis.groupData) {
                this._tmin.setKey(this.xAxis.uid, undefined);
                this._tmax.setKey(this.xAxis.uid, undefined);
            }
        }
        var fields;
        if (this.xAxis instanceof ValueAxis && this.xAxis != this.baseAxis) {
            fields = this._xValueFields;
        }
        if (this.yAxis instanceof ValueAxis && this.yAxis != this.baseAxis) {
            fields = this._yValueFields;
        }
        var startIndex = this.startIndex;
        var endIndex = this.endIndex;
        var delay = 0;
        var interpolationDuration = this.defaultState.transitionDuration;
        if ($type.isNumber(duration)) {
            interpolationDuration = duration;
        }
        if (!options.animationsEnabled) {
            interpolationDuration = 0;
        }
        var anim;
        $iter.each($iter.indexed(this.dataItems.iterator()), function (a) {
            var i = a[0];
            var dataItem = a[1];
            var realDuration = interpolationDuration;
            if (i < _this.startIndex - 10 || i > _this.endIndex + 10) {
                realDuration = 0;
                delay = 0;
            }
            if (_this.sequencedInterpolation && realDuration > 0) {
                delay = _this.sequencedInterpolationDelay * i + interpolationDuration * (i - startIndex) / (endIndex - startIndex);
            }
            anim = dataItem.show(realDuration, delay, fields);
        });
        // other data sets
        this.dataSets.each(function (key, dataSet) {
            if (dataSet != _this.dataItems) {
                dataSet.each(function (dataItem) {
                    dataItem.events.disable();
                    dataItem.show(0, 0, fields);
                    dataItem.events.enable();
                });
            }
        });
        if (this.mainDataSet != this.dataItems) {
            this.mainDataSet.each(function (dataItem) {
                dataItem.events.disable();
                dataItem.show(0, 0, fields);
                dataItem.events.enable();
            });
        }
        var animation = _super.prototype.show.call(this, duration);
        if (anim && !anim.isFinished()) {
            animation = anim;
        }
        if (this.hidden) {
            this.dispatchImmediately("selectionextremeschanged");
            this.hidden = false;
        }
        return animation;
    };
    /**
     * Hides series.
     *
     * @param duration  Duration of hiding animation (ms)
     * @return Animation
     */
    XYSeries.prototype.hide = function (duration) {
        var _this = this;
        var fields;
        var value;
        var xAxis = this.xAxis;
        if (xAxis instanceof ValueAxis && xAxis != this.baseAxis) {
            fields = this._xValueFields;
            // animate to zero if 0 is within zoomMin/zoomMax
            if (this.stacked || (xAxis.minZoomed < xAxis.baseValue && xAxis.maxZoomed > xAxis.baseValue) || this.stackedSeries) {
                value = xAxis.baseValue;
            }
            else {
                value = xAxis.min;
            }
        }
        var yAxis = this.yAxis;
        if (yAxis instanceof ValueAxis && yAxis != this.baseAxis) {
            fields = this._yValueFields;
            // animate to zero if 0 is within zoomMin/zoomMax
            if (this.stacked || (yAxis.minZoomed < yAxis.baseValue && yAxis.maxZoomed > yAxis.baseValue) || this.stackedSeries) {
                value = yAxis.baseValue;
            }
            else {
                value = yAxis.min;
            }
        }
        //if ($type.hasValue(fields)) {
        var startIndex = this.startIndex;
        var endIndex = this.endIndex;
        var interpolationDuration = this.hiddenState.transitionDuration;
        if ($type.isNumber(duration)) {
            interpolationDuration = duration;
        }
        if (!options.animationsEnabled) {
            interpolationDuration = 0;
        }
        var delay = 0;
        var anim;
        $iter.each($iter.indexed(this.dataItems.iterator()), function (a) {
            var i = a[0];
            var dataItem = a[1];
            var realDuration = interpolationDuration;
            if (i < _this.startIndex - 10 || i > _this.endIndex + 10) {
                realDuration = 0;
            }
            if (realDuration == 0) {
                dataItem.hide(0, 0, value, fields);
            }
            else {
                if (_this.sequencedInterpolation && realDuration > 0) {
                    delay = _this.sequencedInterpolationDelay * i + interpolationDuration * (i - startIndex) / (endIndex - startIndex);
                }
                anim = dataItem.hide(realDuration, delay, value, fields);
            }
        });
        // other data sets
        this.dataSets.each(function (key, dataSet) {
            if (dataSet != _this.dataItems) {
                dataSet.each(function (dataItem) {
                    dataItem.events.disable();
                    dataItem.hide(0, 0, value, fields);
                    dataItem.events.enable();
                });
            }
        });
        if (this.mainDataSet != this.dataItems) {
            this.mainDataSet.each(function (dataItem) {
                dataItem.events.disable();
                dataItem.hide(0, 0, value, fields);
                dataItem.events.enable();
            });
        }
        var animation = _super.prototype.hide.call(this, interpolationDuration);
        if (animation && !animation.isFinished()) {
            animation.delay(delay);
        }
        if (anim && !anim.isFinished()) {
            animation = anim;
        }
        if (this.appeared) {
            this.dispatch("selectionextremeschanged");
        }
        // helps to avoid flicker. otherwise columns will show up at full size and only on next frame will animate from 0
        this.validateDataElements();
        //}
        return animation;
    };
    /**
     * [handleDataItemWorkingValueChange description]
     *
     * @ignore Exclude from docs
     */
    XYSeries.prototype.handleDataItemWorkingValueChange = function (dataItem, name) {
        _super.prototype.handleDataItemWorkingValueChange.call(this, dataItem, name);
        // to calculate stack values
        var axisSeries = this.baseAxis.series;
        $iter.each(axisSeries.iterator(), function (series) {
            if (series.stacked || series.stackedSeries) {
                series.invalidateProcessedData();
            }
        });
    };
    /**
     * [getStackValue description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param dataItem  Data item
     */
    XYSeries.prototype.getStackValue = function (dataItem, working) {
        // todo: here wer stack x and y values only. question is - what should we do with other values, like openX, openY?
        // if this series is not stacked or new stack begins, return.
        var _this = this;
        var xAxis = this.xAxis;
        var yAxis = this.yAxis;
        if (!this.stacked || !xAxis || !yAxis) {
            return;
        }
        else {
            // it might seem that it's better to go through base axis series, but we do not maintain the same order as in chart.series there.
            var chart = this.chart;
            var index = chart.series.indexOf(this);
            var field_2;
            if (xAxis != this.baseAxis && xAxis instanceof ValueAxis) {
                field_2 = this.xField;
            }
            if (yAxis != this.baseAxis && yAxis instanceof ValueAxis) {
                field_2 = this.yField;
            }
            if (!field_2) {
                return;
            }
            //this is good for removing series, otherwise stack values will remain the same and chart won't pay atention when adding/removing series			
            dataItem.setCalculatedValue(field_2, 0, "stack");
            dataItem.setCalculatedValue(field_2, 0, "stackTrue");
            $iter.eachContinue(chart.series.range(0, index).backwards().iterator(), function (prevSeries) {
                // stacking is only possible if both axes are the same
                if (prevSeries.xAxis == xAxis && prevSeries.yAxis == yAxis && prevSeries.className == _this.className) {
                    // saving value
                    prevSeries.stackedSeries = _this;
                    var prevDataItem = prevSeries.dataItems.getIndex(dataItem.index); // indexes should match
                    if (prevDataItem && prevDataItem.hasValue(_this._xValueFields) && prevDataItem.hasValue(_this._yValueFields)) {
                        var value = dataItem.getValue(field_2);
                        var prevValue = void 0;
                        var prevStack = prevDataItem.getValue(field_2, "stackTrue");
                        if (prevStack == null) {
                            prevStack = 0;
                        }
                        var prevRealValue = prevDataItem.getValue(field_2) + prevStack;
                        prevValue = prevDataItem.getWorkingValue(field_2) + prevDataItem.getValue(field_2, "stack");
                        if (_this.stackToNegative) {
                            if ((value >= 0 && prevRealValue >= 0) || (value < 0 && prevRealValue < 0)) {
                                dataItem.setCalculatedValue(field_2, prevValue, "stack");
                                dataItem.setCalculatedValue(field_2, prevRealValue, "stackTrue");
                                return false;
                            }
                            else if (!prevSeries.stacked) {
                                return false;
                            }
                        }
                        else {
                            dataItem.setCalculatedValue(field_2, prevValue, "stack");
                            dataItem.setCalculatedValue(field_2, prevRealValue, "stackTrue");
                            return false;
                        }
                    }
                    else if (!prevSeries.stacked) {
                        return false;
                    }
                }
                return true;
            });
        }
    };
    Object.defineProperty(XYSeries.prototype, "stackToNegative", {
        /**
         * @return Stack to base line
         */
        get: function () {
            return this.getPropertyValue("stackToNegative");
        },
        /**
         * This setting indicates how negative values are treated in stacked stacked
         * series.
         *
         * If set to `true` (default), negative values will stack on the base line.
         *
         * If set to `false`, negative value will stack in relation to the previous
         * value in the stack.
         *
         * @since 4.9.34
         * @param  value  Stack to base line
         */
        set: function (value) {
            this.setPropertyValue("stackToNegative", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYSeries.prototype, "xField", {
        /**
         * [xField description]
         *
         * @ignore Exclude from docs
         * @todo Description
         * @return [description]
         */
        get: function () {
            return this._xField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYSeries.prototype, "yField", {
        /**
         * [yField description]
         *
         * @ignore Exclude from docs
         * @todo Description
         * @return [description]
         */
        get: function () {
            return this._yField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYSeries.prototype, "xOpenField", {
        /**
         * [xOpenField description]
         *
         * @ignore Exclude from docs
         * @todo Description
         * @return [description]
         */
        get: function () {
            return this._xOpenField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYSeries.prototype, "yOpenField", {
        /**
         * [yOpenField description]
         *
         * @ignore Exclude from docs
         * @todo Description
         * @return [description]
         */
        get: function () {
            return this._yOpenField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYSeries.prototype, "tooltipXField", {
        /**
         * @ignore Exclude from docs
         * @todo Description
         * @return [description]
         */
        get: function () {
            if (this._tooltipXField) {
                return this._tooltipXField;
            }
            return this._xField;
        },
        /**
         * [tooltipXField description]
         *
         * @ignore Exclude from docs
         * @todo Description
         * @param value [description]
         */
        set: function (value) {
            this._tooltipXField = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYSeries.prototype, "tooltipYField", {
        /**
         * @ignore Exclude from docs
         * @todo Description
         * @return [description]
         */
        get: function () {
            if (this._tooltipYField) {
                return this._tooltipYField;
            }
            return this._yField;
        },
        /**
         * [tooltipYField description]
         *
         * @ignore Exclude from docs
         * @todo Description
         * @param value [description]
         */
        set: function (value) {
            this._tooltipYField = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns lowest value in the series for the specific axis.
     *
     * @ignore Exclude from docs
     * @param axis  Axis
     * @return value
     */
    XYSeries.prototype.min = function (axis) {
        return this._tmin.getKey(axis.uid);
    };
    /**
     * Returns highest value in the series for the specific axis.
     *
     * @ignore Exclude from docs
     * @param axis  Axis
     * @return value
     */
    XYSeries.prototype.max = function (axis) {
        return this._tmax.getKey(axis.uid);
    };
    /**
     * Returns lowest value in the series for the specific axis within current
     * selection.
     *
     * @ignore Exclude from docs
     * @param axis  Axis
     * @return value
     */
    XYSeries.prototype.selectionMin = function (axis) {
        var value = this._smin.getKey(axis.uid);
        // not good, because bad if there are no items with values in selection
        //if (!$type.isNumber(value)) {
        //value = this.min(axis);
        //}		
        return value;
    };
    /**
     * Returns highest value in the series for the specific axis within current
     * selection.
     *
     * @ignore Exclude from docs
     * @param axis  Axis
     * @return value
     */
    XYSeries.prototype.selectionMax = function (axis) {
        var value = this._smax.getKey(axis.uid);
        // not good, because bad if there are no items with values in selection
        //if (!$type.isNumber(value)) {
        //value = this.max(axis);
        //}
        return value;
    };
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    XYSeries.prototype.processConfig = function (config) {
        if (config) {
            // Set up base axes
            if ($type.hasValue(config.baseAxis) && $type.isString(config.baseAxis)) {
                if (this.map.hasKey(config.baseAxis)) {
                    config.baseAxis = this.map.getKey(config.baseAxis);
                }
                else {
                    this.processingErrors.push("[XYSeries (" + (this.name || "unnamed") + ")] No axis with id \"" + config.baseAxis + "\" found for `baseAxis`.");
                    delete config.baseAxis;
                }
            }
            // Set up axes
            if ($type.hasValue(config.xAxis) && $type.isString(config.xAxis)) {
                if (this.map.hasKey(config.xAxis)) {
                    config.xAxis = this.map.getKey(config.xAxis);
                }
                else {
                    this.processingErrors.push("[XYSeries (" + (this.name || "unnamed") + ")] No axis with id \"" + config.xAxis + "\" found for `xAxis`.");
                    delete config.xAxis;
                }
            }
            if ($type.hasValue(config.yAxis) && $type.isString(config.yAxis)) {
                if (this.map.hasKey(config.yAxis)) {
                    config.yAxis = this.map.getKey(config.yAxis);
                }
                else {
                    this.processingErrors.push("[XYSeries (" + (this.name || "unnamed") + ")] No axis with id \"" + config.yAxis + "\" found for `yAxis`.");
                    delete config.yAxis;
                }
            }
            // Set up axis ranges
            if ($type.hasValue(config.axisRanges) && $type.isArray(config.axisRanges)) {
                for (var i = 0, len = config.axisRanges.length; i < len; i++) {
                    var range = config.axisRanges[i];
                    if (!$type.hasValue(range.type)) {
                        range.type = "AxisDataItem";
                    }
                    if ($type.hasValue(range.axis) && $type.isString(range.axis) && this.map.hasKey(range.axis)) {
                        range.component = this.map.getKey(range.axis);
                    }
                    else if ($type.hasValue(range.component) && $type.isString(range.component) && this.map.hasKey(range.component)) {
                        range.component = this.map.getKey(range.component);
                    }
                }
            }
            // Parse date fields based on the series fields
            if (!$type.hasValue(config.dataFields) || !$type.isObject(config.dataFields)) {
                this.processingErrors.push("`dataFields` is not set for series [" + (this.name || "unnamed") + "]");
            }
        }
        _super.prototype.processConfig.call(this, config);
    };
    /**
     * Returns an [[IPoint]] coordinates of the specific Serie's data point.
     *
     * @param    dataItem   Data item
     * @param    xKey       Name of X data field
     * @param    yKey       Name of Y data field
     * @param    locationX  X location
     * @param    locationY  Y location
     * @param    stackKeyX  ?
     * @param    stackKeyY  ?
     * @returns             Coordinates
     */
    XYSeries.prototype.getPoint = function (dataItem, xKey, yKey, locationX, locationY, stackKeyX, stackKeyY) {
        if (this.xAxis && this.yAxis) {
            var x = this.xAxis.getX(dataItem, xKey, locationX);
            var y = this.yAxis.getY(dataItem, yKey, locationY);
            x = $math.fitToRange(x, -this._maxxX, this._maxxX); // from geometric point of view this is not right, but practically it's ok. this is done to avoid too big objects.
            y = $math.fitToRange(y, -this._maxxY, this._maxxY); // from geometric point of view this is not right, but practically it's ok. this is done to avoid too big objects.
            return { x: x, y: y };
        }
    };
    /**
     * Updates item reader text based on the type and set up of axis.
     */
    XYSeries.prototype.updateItemReaderText = function () {
        // We do not want to overwrite this if `itemReaderText` was changed by
        // user code.
        if (this._itemReaderTextChanged) {
            return;
        }
        var text = "";
        $object.each(this.dataFields, function (key, val) {
            text += "{" + key + "} ";
        });
        this.itemReaderText = text;
        this._itemReaderTextChanged = false;
    };
    Object.defineProperty(XYSeries.prototype, "cursorTooltipEnabled", {
        /**
         * @return Display tooltip?
         */
        get: function () {
            return this.getPropertyValue("cursorTooltipEnabled");
        },
        /**
         * Indicates if series should display a tooltip for chart's cursor.
         *
         * If set to `true` (default), the tooltips set for all series item's
         * elements like columns and bullets will be automatically shown
         * when [[XYCursor]] passes over category/date, even if its not hovered
         * directly over the item.
         *
         * Set this to `false` to disable such behavior and display item-specific
         * tooltips only when hovered directly over them
         *
         * @default true
         * @param value Display tooltip?
         */
        set: function (value) {
            this.setPropertyValue("cursorTooltipEnabled", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYSeries.prototype, "cursorHoverEnabled", {
        /**
         * @return Hover enabled?
         */
        get: function () {
            return this.getPropertyValue("cursorHoverEnabled");
        },
        /**
         * Indicates if series should apply hover state on bullets/columns/etc when
         * cursor is over the data item.
         *
         * If set to `true` (default) and chart cursor is enabled on th chart,
         * hovering over date/category will trigger hover states on related Series
         * items like bullets and columns.
         *
         * @default true
         * @since 4.2.2
         * @param  value  Hover enabled?
         */
        set: function (value) {
            this.setPropertyValue("cursorHoverEnabled", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYSeries.prototype, "excludeFromTotal", {
        /**
         * @return Exclude from totals?
         */
        get: function () {
            return this.getPropertyValue("excludeFromTotal");
        },
        /**
         * Indicates if series' values should be excluded when calculating totals.
         *
         * @default false
         * @since 4.4.9
         * @param  value  Exclude from totals?
         */
        set: function (value) {
            this.setPropertyValue("excludeFromTotal", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYSeries.prototype, "hideTooltipWhileZooming", {
        /**
         * @return Hide tooltip while zooming?
         */
        get: function () {
            return this.getPropertyValue("hideTooltipWhileZooming");
        },
        /**
         * Indicates if series' tooltip should be hidden while series axis range is
         * animating (zooming).
         *
         * @default true
         * @since 4.7.16
         * @param  value  Hide tooltip while zooming?
         */
        set: function (value) {
            this.setPropertyValue("hideTooltipWhileZooming", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYSeries.prototype, "maskBullets", {
        /**
         * @return Mask bullets?
         */
        get: function () {
            return this.getPropertyValue("maskBullets");
        },
        /**
         * Indicates if series' bullets should be masked.
         *
         * @default true
         * @since 4.7.17
         * @param  value  Mask bullets?
         */
        set: function (value) {
            this.setPropertyValue("maskBullets", value);
            var chart = this.chart;
            if (chart) {
                if (value) {
                    this.bulletsContainer.parent = chart.bulletsContainer;
                }
                else {
                    this.bulletsContainer.parent = chart.axisBulletsContainer;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copies all properties from another instance of [[Series]].
     *
     * @param source  Source series
     */
    XYSeries.prototype.copyFrom = function (source) {
        this.groupFields = $utils.copyProperties(source.groupFields, {});
        _super.prototype.copyFrom.call(this, source);
    };
    /**
     * Destroys this object and all related data.
     */
    XYSeries.prototype.dispose = function () {
        if (this.scrollbarSeries) {
            this.scrollbarSeries.dispose();
        }
        _super.prototype.dispose.call(this);
    };
    return XYSeries;
}(Series));
export { XYSeries };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["XYSeries"] = XYSeries;
registry.registeredClasses["XYSeriesDataItem"] = XYSeriesDataItem;
//# sourceMappingURL=XYSeries.js.map