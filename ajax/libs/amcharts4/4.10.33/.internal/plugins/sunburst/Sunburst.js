/**
 * Sunburst chart module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { PieChart, PieChartDataItem } from "../../charts/types/PieChart";
import { SunburstSeries } from "./SunburstSeries";
import { registry } from "../../core/Registry";
import * as $iter from "../../core/utils/Iterator";
import * as $utils from "../../core/utils/Utils";
import * as $type from "../../core/utils/Type";
import { percent } from "../../core/utils/Percent";
import { ColorSet } from "../../core/utils/ColorSet";
import { DictionaryTemplate, DictionaryDisposer } from "../../core/utils/Dictionary";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[Sunburst]].
 *
 * @since 4.1.6
 * @see {@link DataItem}
 */
var SunburstDataItem = /** @class */ (function (_super) {
    __extends(SunburstDataItem, _super);
    /**
     * Constructor
     */
    function SunburstDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "SunburstDataItem";
        _this.values.value = {};
        _this.hasChildren.children = true;
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(SunburstDataItem.prototype, "value", {
        /**
         * Numeric value of the slice.
         *
         * @return Value
         */
        get: function () {
            var value = 0;
            if (!this.children || this.children.length == 0) {
                value = this.values["value"].workingValue;
            }
            else {
                $iter.each(this.children.iterator(), function (child) {
                    var childValue = child.value;
                    if ($type.isNumber(childValue)) {
                        value += childValue;
                    }
                });
            }
            return value;
        },
        /**
         * Numeric value of the item.
         *
         * @param value  Value
         */
        set: function (value) {
            this.setValue("value", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SunburstDataItem.prototype, "percent", {
        /**
         * Percent of the slice.
         *
         * @return {number} Percent
         */
        get: function () {
            if (this.parent) {
                return this.value / this.parent.value * 100;
            }
            return 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SunburstDataItem.prototype, "name", {
        /**
         * @return Name
         */
        get: function () {
            return this.properties.name;
        },
        /**
         * Item's name.
         *
         * @param name  Name
         */
        set: function (name) {
            this.setProperty("name", name);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SunburstDataItem.prototype, "children", {
        /**
         * @return Item's children
         */
        get: function () {
            return this.properties.children;
        },
        /**
         * A list of item's sub-children.
         *
         * @param children  Item's children
         */
        set: function (children) {
            this.setProperty("children", children);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SunburstDataItem.prototype, "level", {
        /**
         * Depth level in the Sunburst hierarchy.
         *
         * The top-level item will have level set at 0. Its children will have
         * level 1, and so on.
         *
         * @readonly
         * @return Level
         */
        get: function () {
            if (!this.parent) {
                return 0;
            }
            else {
                return this.parent.level + 1;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SunburstDataItem.prototype, "color", {
        /**
         * @return Color
         */
        get: function () {
            var color = this.properties.color;
            if (color == undefined) {
                if (this.parent) {
                    color = this.parent.color;
                }
            }
            if (color == undefined) {
                if (this.component) {
                    color = this.component.colors.getIndex(this.component.colors.step * this.index);
                }
            }
            return color;
        },
        /**
         * Item's color.
         *
         * If not set, will use parent's color, or, if that is not set either,
         * automatically assigned color from chart's color set. (`chart.colors`)
         *
         * @param value  Color
         */
        set: function (value) {
            this.setProperty("color", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SunburstDataItem.prototype, "series", {
        /**
         * @return Child series
         */
        get: function () {
            return this._series;
        },
        /**
         * A series representing slice's children.
         *
         * @param  series Child series
         */
        set: function (series) {
            if (series != this._series) {
                if (this._series) {
                    this.component.series.removeValue(this._series);
                    this._series.dispose();
                }
                this._series = series;
                this._disposers.push(series);
            }
        },
        enumerable: true,
        configurable: true
    });
    return SunburstDataItem;
}(PieChartDataItem));
export { SunburstDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A main class for Sunburst chart type.
 *
 * @since 4.1.6
 * @see {@link ISunburstEvents} for a list of available Events
 * @see {@link ISunburstAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/sunburst/} For more information
 * @todo Example
 * @important
 */
var Sunburst = /** @class */ (function (_super) {
    __extends(Sunburst, _super);
    /**
     * Constructor
     */
    function Sunburst() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "Sunburst";
        _this.colors = new ColorSet();
        _this._usesData = true;
        var template = new SunburstSeries();
        _this.seriesTemplates = new DictionaryTemplate(template);
        template.virtualParent = _this;
        _this._disposers.push(new DictionaryDisposer(_this.seriesTemplates));
        _this._disposers.push(template);
        _this.radius = percent(95);
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Creates and returns a new series of the suitable type.
     *
     * @return New series
     */
    Sunburst.prototype.createSeries = function () {
        return new SunburstSeries();
    };
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    Sunburst.prototype.createDataItem = function () {
        return new SunburstDataItem();
    };
    /**
     * (Re)validates chart's data.
     *
     * @ignore Exclude from docs
     */
    Sunburst.prototype.validateData = function () {
        this.series.clear();
        _super.prototype.validateData.call(this);
        if (this._homeDataItem) {
            this._homeDataItem.dispose();
        }
        var homeDataItem = this.dataItems.template.clone(); // cant' use createDataItem here!
        this._homeDataItem = homeDataItem;
        $iter.each(this.dataItems.iterator(), function (dataItem) {
            dataItem.parent = homeDataItem;
        });
        homeDataItem.children = this.dataItems;
        this._levelCount = 0;
        this.createSunburstSeries(homeDataItem);
    };
    /**
     * Creates [[SunburstSeries]] instance for item's children.
     *
     * @param  dataItem Data item
     */
    Sunburst.prototype.createSunburstSeries = function (dataItem) {
        if (dataItem.children) {
            this.initSeries(dataItem);
            for (var i = 0; i < dataItem.children.length; i++) {
                var child = dataItem.children.getIndex(i);
                if (child.children) {
                    this.createSunburstSeries(child);
                }
            }
        }
    };
    /**
     * Initializes the Sunburst series.
     *
     * @param  dataItem  Chart data item
     */
    Sunburst.prototype.initSeries = function (dataItem) {
        if (!dataItem.series) {
            var series_1;
            var template = this.seriesTemplates.getKey(dataItem.level.toString());
            if (template) {
                series_1 = template.clone();
                this.series.moveValue(series_1);
            }
            else {
                series_1 = this.series.create();
            }
            series_1.name = dataItem.name;
            series_1.parentDataItem = dataItem;
            dataItem.series = series_1;
            var level = dataItem.level;
            series_1.level = level;
            if (this._levelCount < level + 1) {
                this._levelCount = level + 1;
            }
            var dataContext = dataItem.dataContext;
            if (dataContext) {
                series_1.config = dataContext.config;
            }
            this.dataUsers.removeValue(series_1); // series do not use data directly, that's why we remove it
            series_1.data = dataItem.children.values;
            series_1.fill = dataItem.color;
            series_1.dataFields.hidden = this.dataFields.hidden;
            series_1.slices.template.adapter.add("fill", function (fill, target) {
                var dataItem = target.dataItem;
                if (dataItem) {
                    var sunburstDataItem = dataItem.sunburstDataItem;
                    if (sunburstDataItem) {
                        target.fill = sunburstDataItem.color;
                        target.adapter.remove("fill"); //@todo: make it possible adapters applied once?
                        return sunburstDataItem.color;
                    }
                }
            });
            series_1.adapter.add("startAngle", function (startAngle, target) {
                var parentDataItem = target.parentDataItem;
                if (parentDataItem) {
                    var seriesDataItem = parentDataItem.seriesDataItem;
                    if (seriesDataItem) {
                        startAngle = seriesDataItem.slice.startAngle;
                    }
                }
                return startAngle;
            });
            series_1.adapter.add("endAngle", function (endAngle, target) {
                var parentDataItem = target.parentDataItem;
                if (parentDataItem) {
                    var seriesDataItem = parentDataItem.seriesDataItem;
                    if (seriesDataItem) {
                        endAngle = seriesDataItem.slice.startAngle + seriesDataItem.slice.arc;
                    }
                }
                return endAngle;
            });
            series_1.validateData();
            if (dataItem.seriesDataItem) {
                dataItem.seriesDataItem.slice.events.on("propertychanged", function (event) {
                    if (event.property == "startAngle" || event.property == "arc") {
                        series_1.invalidate();
                    }
                });
            }
        }
    };
    /**
     * Recalculates Sunburst radius, based on a number of criteria.
     *
     * @ignore Exclude from docs
     */
    Sunburst.prototype.updateRadius = function () {
        _super.prototype.updateRadius.call(this);
        var chartRadius = this._chartPixelRadius;
        var chartPixelInnerRadius = this._chartPixelInnerRadius;
        var seriesRadius = (chartRadius - chartPixelInnerRadius) / this._levelCount;
        $iter.each($iter.indexed(this.series.iterator()), function (a) {
            var series = a[1];
            var radius = chartPixelInnerRadius + $utils.relativeRadiusToValue(series.radius, chartRadius - chartPixelInnerRadius);
            var innerRadius = chartPixelInnerRadius + $utils.relativeRadiusToValue(series.innerRadius, chartRadius - chartPixelInnerRadius);
            if (!$type.isNumber(radius)) {
                radius = chartPixelInnerRadius + seriesRadius * (series.level + 1);
            }
            if (!$type.isNumber(innerRadius)) {
                innerRadius = chartPixelInnerRadius + seriesRadius * series.level;
            }
            series.pixelRadius = radius;
            series.pixelInnerRadius = innerRadius;
        });
    };
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    Sunburst.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        // Add a default screen reader title for accessibility
        // This will be overridden in screen reader if there are any `titles` set
        if (!$type.hasValue(this.readerTitle)) {
            this.readerTitle = this.language.translate("Sunburst chart");
        }
    };
    /**
     * Since this chart uses hierarchical data, we need to remove childrent
     * dataField from export of non-hierarchical formats such as CSV and XSLX.
     *
     * @return Export
     */
    Sunburst.prototype.getExporting = function () {
        var _this = this;
        var exporting = _super.prototype.getExporting.call(this);
        exporting.adapter.add("formatDataFields", function (info) {
            if (info.format == "csv" || info.format == "xlsx") {
                if ($type.hasValue(_this.dataFields.children)) {
                    delete info.dataFields[_this.dataFields.children];
                }
            }
            return info;
        });
        return exporting;
    };
    Sunburst.prototype.handleSeriesAdded2 = function () {
        // void
    };
    return Sunburst;
}(PieChart));
export { Sunburst };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Sunburst"] = Sunburst;
registry.registeredClasses["SunburstDataItem"] = SunburstDataItem;
//# sourceMappingURL=Sunburst.js.map