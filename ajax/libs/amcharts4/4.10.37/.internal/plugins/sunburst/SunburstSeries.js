/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { __extends } from "tslib";
import { PieSeries, PieSeriesDataItem } from "../../charts/series/PieSeries";
import * as $type from "../../core/utils/Type";
import { registry } from "../../core/Registry";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[SunburstSeries]].
 *
 * @see {@link DataItem}
 * @since 4.1.6
 */
var SunburstSeriesDataItem = /** @class */ (function (_super) {
    __extends(SunburstSeriesDataItem, _super);
    /**
     * Constructor
     */
    function SunburstSeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "SunburstSeriesDataItem";
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(SunburstSeriesDataItem.prototype, "sunburstDataItem", {
        /**
         * A corresponding data item from the Sunburst.
         *
         * @readonly
         * @return Data item
         */
        get: function () {
            return this._dataContext;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Hide the data item (and corresponding visual elements).
     *
     * @param duration  Duration (ms)
     * @param delay     Delay hiding (ms)
     * @param toValue   Target value for animation
     * @param fields    Fields to animate while hiding
     */
    SunburstSeriesDataItem.prototype.hide = function (duration, delay, toValue, fields) {
        var sunburstDataItem = this.sunburstDataItem;
        if (sunburstDataItem && sunburstDataItem.series) {
            sunburstDataItem.series.dataItems.each(function (dataItem) {
                dataItem.hide(duration, delay, toValue, fields);
            });
        }
        return _super.prototype.hide.call(this, duration, delay, toValue, fields);
    };
    /**
     * Show hidden data item (and corresponding visual elements).
     *
     * @param duration  Duration (ms)
     * @param delay     Delay hiding (ms)
     * @param fields    Fields to animate while hiding
     */
    SunburstSeriesDataItem.prototype.show = function (duration, delay, fields) {
        var sunburstDataItem = this.sunburstDataItem;
        if (sunburstDataItem && sunburstDataItem.series) {
            sunburstDataItem.series.dataItems.each(function (dataItem) {
                dataItem.show(duration, delay, fields);
            });
        }
        return _super.prototype.show.call(this, duration, delay, fields);
    };
    Object.defineProperty(SunburstSeriesDataItem.prototype, "value", {
        /**
         * @return Value
         */
        get: function () {
            var value = 0;
            var sbDataItem = this.sunburstDataItem;
            if (sbDataItem) {
                if (!sbDataItem.series) {
                    value = this.values["value"].value;
                }
                else {
                    sbDataItem.series.dataItems.each(function (dataItem) {
                        var childValue = dataItem.value;
                        if ($type.isNumber(childValue)) {
                            value += childValue;
                        }
                    });
                }
            }
            return value;
        },
        /**
         * Numeric value.
         *
         * @param value  Value
         */
        set: function (value) {
            this.setValue("value", value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @todo description
     * @ignore
     * @return Value
     */
    SunburstSeriesDataItem.prototype.getActualWorkingValue = function (name) {
        var value = 0;
        var sbDataItem = this.sunburstDataItem;
        if (!sbDataItem.series) {
            value = this.values[name].workingValue;
        }
        else {
            sbDataItem.series.dataItems.each(function (dataItem) {
                var childValue = dataItem.getWorkingValue(name);
                if ($type.isNumber(childValue)) {
                    value += childValue;
                }
            });
        }
        return value;
    };
    return SunburstSeriesDataItem;
}(PieSeriesDataItem));
export { SunburstSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a [[Sunburst]] chart.
 *
 * @see {@link ISunburstSeriesEvents} for a list of available Events
 * @see {@link ISunburstSeriesAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/sunburst/} For more information
 * @todo Example
 * @since 4.1.6
 * @important
 */
var SunburstSeries = /** @class */ (function (_super) {
    __extends(SunburstSeries, _super);
    /**
     * Constructor
     */
    function SunburstSeries() {
        var _this = _super.call(this) || this;
        _this.className = "SunburstSeries";
        _this.dataFields.category = "name";
        _this.dataFields.value = "value";
        var interfaceColors = new InterfaceColorSet();
        _this.stroke = interfaceColors.getFor("background");
        _this.strokeOpacity = 1;
        _this.alignLabels = false;
        _this.ticks.template.disabled = true;
        _this.slices.template.hiddenState.properties.visible = true;
        var labelTemplate = _this.labels.template;
        labelTemplate.relativeRotation = 90;
        labelTemplate.radius = 10;
        labelTemplate.inside = true;
        labelTemplate.strokeOpacity = 0;
        labelTemplate.fillOpacity = 1;
        labelTemplate.fill = interfaceColors.getFor("background");
        labelTemplate.padding(0, 0, 0, 0);
        labelTemplate.interactionsEnabled = false;
        var sliceTemplate = _this.slices.template;
        sliceTemplate.stroke = interfaceColors.getFor("background");
        var activeState = sliceTemplate.states.getKey("active");
        if (activeState) {
            activeState.properties.shiftRadius = 0;
        }
        _this.events.on("inited", function () {
            _this.dataItems.each(function (dataItem) {
                if (dataItem.hidden) {
                    dataItem.hide(0);
                }
            });
        }, undefined, false);
        _this.applyTheme();
        return _this;
    }
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    SunburstSeries.prototype.createDataItem = function () {
        return new SunburstSeriesDataItem();
    };
    /**
     * Processes data item.
     *
     * @param dataItem     Data item
     * @param dataContext  Raw data
     * @param index        Index of the data item
     */
    SunburstSeries.prototype.processDataItem = function (dataItem, dataContext) {
        dataContext.seriesDataItem = dataItem; // save a reference here. dataContext is TreeMapDataItem and we need to know dataItem sometimes
        _super.prototype.processDataItem.call(this, dataItem, dataContext);
    };
    /**
     * [handleDataItemValueChange description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    SunburstSeries.prototype.handleDataItemValueChange = function (dataItem, name) {
        _super.prototype.handleDataItemValueChange.call(this, dataItem, name);
        dataItem.sunburstDataItem.setValue(name, dataItem.getValue(name));
    };
    /**
     * [handleDataItemWorkingValueChange description]
     *
     * @ignore
     * @todo Description
     * @param {this["_dataItem"]} dataItem [description]
     * @param {string}            name     [description]
     */
    SunburstSeries.prototype.handleDataItemWorkingValueChange = function (dataItem, name) {
        _super.prototype.handleDataItemWorkingValueChange.call(this, dataItem, name);
        //dataItem.sunburstDataItem.setWorkingValue(name, dataItem.getWorkingValue(name), 0);
        var sunburstDataItem = dataItem.sunburstDataItem.parent.parent;
        while (sunburstDataItem != undefined) {
            sunburstDataItem.series.invalidateProcessedData();
            sunburstDataItem = sunburstDataItem.parent;
        }
    };
    return SunburstSeries;
}(PieSeries));
export { SunburstSeries };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["SunburstSeries"] = SunburstSeries;
registry.registeredClasses["SunburstSeriesDataItem"] = SunburstSeriesDataItem;
//# sourceMappingURL=SunburstSeries.js.map