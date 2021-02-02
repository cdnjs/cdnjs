/**
 * HeatLegend module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container } from "../../core/Container";
import { LinearGradient } from "../../core/rendering/fills/LinearGradient";
import { registry } from "../../core/Registry";
import { toColor, Color } from "../../core/utils/Color";
import { ListTemplate, ListDisposer } from "../../core/utils/List";
import { percent } from "../../core/utils/Percent";
import { ValueAxis } from "../../charts/axes/ValueAxis";
import { AxisRendererX } from "../../charts/axes/AxisRendererX";
import { AxisRendererY } from "../../charts/axes/AxisRendererY";
import * as $iter from "../../core/utils/Iterator";
import * as $type from "../../core/utils/Type";
import * as $colors from "../../core/utils/Colors";
import { RoundedRectangle } from "../../core/elements/RoundedRectangle";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * This class creates a link (waved color-filled line) between two nodes in a
 * Sankey Diagram.
 *
 * @see {@link IHeatLegendEvents} for a list of available events
 * @see {@link IHeatLegendAdapters} for a list of available Adapters
 * @important
 */
var HeatLegend = /** @class */ (function (_super) {
    __extends(HeatLegend, _super);
    /**
     * Constructor
     */
    function HeatLegend() {
        var _this = _super.call(this) || this;
        _this.className = "HeatLegend";
        _this.markerContainer = _this.createChild(Container);
        _this.markerContainer.shouldClone = false;
        _this.markerCount = 1;
        // Create a template container and list for the a marker
        var marker = new RoundedRectangle();
        marker.minHeight = 20;
        marker.minWidth = 20;
        marker.interactionsEnabled = false;
        marker.fillOpacity = 1;
        marker.cornerRadius(0, 0, 0, 0);
        _this.markerContainer.minHeight = 20;
        _this.markerContainer.minWidth = 20;
        _this.orientation = "horizontal";
        _this.markers = new ListTemplate(marker);
        _this._disposers.push(new ListDisposer(_this.markers));
        _this._disposers.push(_this.markers.template);
        _this.applyTheme();
        return _this;
    }
    HeatLegend.prototype.getMinFromRules = function (property) {
        var series = this.series;
        if (series) {
            var minValue_1;
            $iter.eachContinue(series.heatRules.iterator(), function (heatRule) {
                if (heatRule.property == property) {
                    minValue_1 = heatRule.min;
                    return false;
                }
                return true;
            });
            return minValue_1;
        }
    };
    HeatLegend.prototype.getMaxFromRules = function (property) {
        var series = this.series;
        if (series) {
            var maxValue_1;
            $iter.each(series.heatRules.iterator(), function (heatRule) {
                if (heatRule.property == property) {
                    maxValue_1 = heatRule.max;
                    return false;
                }
                return true;
            });
            return maxValue_1;
        }
    };
    /**
     *
     * @ignore Exclude from docs
     */
    HeatLegend.prototype.validate = function () {
        _super.prototype.validate.call(this);
        this.valueAxis.renderer.inversed = this.reverseOrder;
        var series = this.series;
        var minColor = this.minColor;
        var maxColor = this.maxColor;
        if (!$type.hasValue(minColor)) {
            minColor = toColor(this.getMinFromRules("fill"));
        }
        if (!$type.hasValue(maxColor)) {
            maxColor = toColor(this.getMaxFromRules("fill"));
        }
        if (series) {
            var seriesFill = series.fill;
            if (!$type.hasValue(minColor) && seriesFill instanceof Color) {
                minColor = seriesFill;
            }
            if (!$type.hasValue(maxColor) && seriesFill instanceof Color) {
                maxColor = seriesFill;
            }
        }
        if (!$type.hasValue(maxColor)) {
            maxColor = toColor(this.getMaxFromRules("fill"));
        }
        var minOpacity = $type.toNumber(this.getMinFromRules("fillOpacity"));
        if (!$type.isNumber(minOpacity)) {
            minOpacity = 1;
        }
        var maxOpacity = $type.toNumber(this.getMaxFromRules("fillOpacity"));
        if (!$type.isNumber(maxOpacity)) {
            maxOpacity = 1;
        }
        var minStrokeOpacity = $type.toNumber(this.getMinFromRules("strokeOpacity"));
        if (!$type.isNumber(minStrokeOpacity)) {
            minStrokeOpacity = 1;
        }
        var maxStrokeOpacity = $type.toNumber(this.getMaxFromRules("strokeOpacity"));
        if (!$type.isNumber(maxStrokeOpacity)) {
            maxStrokeOpacity = 1;
        }
        var minStroke = toColor(this.getMinFromRules("stroke"));
        var maxStroke = toColor(this.getMaxFromRules("stroke"));
        //if (series) {
        for (var i = 0; i < this.markerCount; i++) {
            var marker = this.markers.getIndex(i);
            if (!marker) {
                marker = this.markers.create();
                marker.parent = this.markerContainer;
                marker.height = percent(100);
                marker.width = percent(100);
            }
            if (this.markerCount == 1) {
                var gradient = new LinearGradient();
                if (this.reverseOrder) {
                    gradient.addColor(maxColor, maxOpacity);
                    gradient.addColor(minColor, minOpacity);
                }
                else {
                    gradient.addColor(minColor, minOpacity);
                    gradient.addColor(maxColor, maxOpacity);
                }
                if (this.orientation == "vertical") {
                    gradient.rotation = -90;
                }
                marker.fill = gradient;
                if ($type.hasValue(minStroke) && $type.hasValue(maxStroke)) {
                    var strokeGradient = new LinearGradient();
                    if (this.reverseOrder) {
                        strokeGradient.addColor(maxStroke, maxStrokeOpacity);
                        strokeGradient.addColor(minStroke, minStrokeOpacity);
                    }
                    else {
                        strokeGradient.addColor(minStroke, minStrokeOpacity);
                        strokeGradient.addColor(maxStroke, maxStrokeOpacity);
                    }
                    if (this.orientation == "vertical") {
                        strokeGradient.rotation = -90;
                    }
                    marker.stroke = strokeGradient;
                }
            }
            else {
                var c = i;
                if (this.reverseOrder) {
                    c = this.markerCount - i - 1;
                }
                var color = new Color($colors.interpolate(minColor.rgb, maxColor.rgb, c / this.markerCount));
                marker.fill = color;
                var opacity = minOpacity + (maxOpacity - minOpacity) * c / this.markerCount;
                marker.fillOpacity = opacity;
                if ($type.hasValue(minStroke) && $type.hasValue(maxStroke)) {
                    var color_1 = new Color($colors.interpolate(minStroke.rgb, maxStroke.rgb, c / this.markerCount));
                    marker.stroke = color_1;
                    var opacity_1 = minStrokeOpacity + (maxStrokeOpacity - minStrokeOpacity) * c / this.markerCount;
                    marker.strokeOpacity = opacity_1;
                }
            }
        }
        var renderer = this.valueAxis.renderer;
        if (this.markerCount > 1) {
            if (this.orientation == "horizontal") {
                renderer.minGridDistance = this.measuredWidth / this.markerCount;
            }
            else {
                renderer.minGridDistance = this.measuredHeight / this.markerCount;
            }
        }
        this.valueAxis.invalidate();
        for (var i = this.markerCount, len = this.markers.length; i < len; i++) {
            this.markers.getIndex(i).parent = undefined;
        }
    };
    Object.defineProperty(HeatLegend.prototype, "minColor", {
        /**
         * Returns minColor value
         * @return {Color}
         */
        get: function () {
            return this.getPropertyValue("minColor");
        },
        /**
         * Min color of a heat legend. If a series is set for the legend, minColor is taken from series.
         *
         * @param {Color}
         */
        set: function (value) {
            if (!(value instanceof Color)) {
                value = toColor(value);
            }
            this.setColorProperty("minColor", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeatLegend.prototype, "maxColor", {
        /**
         * Returns maxColor value
         * @return {Color}
         */
        get: function () {
            return this.getPropertyValue("maxColor");
        },
        /**
         * Max color of a heat legend. If a series is set for the legend, maxColor is taken from series.
         *
         * @param {Color}
         */
        set: function (value) {
            if (!(value instanceof Color)) {
                value = toColor(value);
            }
            this.setColorProperty("maxColor", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeatLegend.prototype, "markerCount", {
        /**
         * Returns number of color squares (markers).
         * @return {number}
         */
        get: function () {
            return this.getPropertyValue("markerCount");
        },
        /**
         * Number of color squares (markers) in the heat legend. If only 1 marker is used, it will be filled with gradient.
         *
         * @param {number}
         */
        set: function (value) {
            this.setPropertyValue("markerCount", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeatLegend.prototype, "minValue", {
        /**
         * Returns minimum value of heat legend.
         * @return {number}
         */
        get: function () {
            return this.getPropertyValue("minValue");
        },
        /**
         * Minimum value of heat legend's value axis. If a series is set for the legend, min is taken from series.
         *
         * @param {number}
         */
        set: function (value) {
            this.setPropertyValue("minValue", value);
            this.valueAxis.min = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeatLegend.prototype, "maxValue", {
        /**
         * Returns maximum value of heat legend.
         * @return {number}
         */
        get: function () {
            return this.getPropertyValue("maxValue");
        },
        /**
         * Maximum value of heat legend's value axis. If a series is set for the legend, max is taken from series.
         *
         * @param {number}
         */
        set: function (value) {
            this.setPropertyValue("maxValue", value);
            this.valueAxis.max = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeatLegend.prototype, "orientation", {
        /**
         * Returns orientation value.
         *
         * @return {"horizontal" | "vertical"}
         */
        get: function () {
            return this.getPropertyValue("orientation");
        },
        /**
        * Heat legend orientation. Note, if you change orientation of a heat legend, you must set value axis renderer properties after that, as with orientation renderer changes.
        *
        * @param {"horizontal" | "vertical"}
        */
        set: function (value) {
            this.setPropertyValue("orientation", value, true);
            var markerContainer = this.markerContainer;
            var valueAxis = this.valueAxis;
            // HORIZONTAL
            if (value == "horizontal") {
                if (!$type.hasValue(this.width)) {
                    this.width = 200;
                }
                this.height = undefined;
                valueAxis.width = percent(100);
                valueAxis.height = undefined;
                valueAxis.tooltip.pointerOrientation = "vertical";
                this.layout = "vertical";
                markerContainer.width = percent(100);
                markerContainer.height = undefined;
                if (!(valueAxis.renderer instanceof AxisRendererX)) {
                    valueAxis.renderer = new AxisRendererX();
                }
            }
            // VERTICAL
            else {
                if (!$type.hasValue(this.height)) {
                    this.height = 200;
                }
                this.width = undefined;
                this.layout = "horizontal";
                markerContainer.width = undefined;
                markerContainer.height = percent(100);
                valueAxis.height = percent(100);
                valueAxis.width = undefined;
                valueAxis.tooltip.pointerOrientation = "horizontal";
                if (!(valueAxis.renderer instanceof AxisRendererY)) {
                    valueAxis.renderer = new AxisRendererY();
                }
                valueAxis.renderer.inside = true;
                valueAxis.renderer.labels.template.inside = true;
                this.markerContainer.reverseOrder = true;
            }
            var renderer = valueAxis.renderer;
            renderer.grid.template.disabled = true;
            renderer.axisFills.template.disabled = true;
            renderer.baseGrid.disabled = true;
            renderer.labels.template.padding(2, 3, 2, 3);
            renderer.minHeight = undefined;
            renderer.minWidth = undefined;
            this.markerContainer.layout = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeatLegend.prototype, "valueAxis", {
        /**
         * Returns valueAxis value.
         * @return {ValueAxis}
         */
        get: function () {
            if (!this._valueAxis) {
                this.valueAxis = this.createChild(ValueAxis);
                this.valueAxis.shouldClone = false;
            }
            return this._valueAxis;
        },
        /**
         * Sets a value axis of heat legend. Value axis for heat legend is created automatically.
         * @param {ValueAxis}
         */
        set: function (valueAxis) {
            this._valueAxis = valueAxis;
            valueAxis.parent = this;
            valueAxis.strictMinMax = true;
            this.orientation = this.orientation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeatLegend.prototype, "series", {
        /**
         * Returns series value.
         * @return {Series}
         */
        get: function () {
            return this._series;
        },
        /**
         * You can set series for heat legend. It will take min, max, minColor and maxColor values from this series.
         * @param series
         */
        set: function (series) {
            var _this = this;
            this._series = series;
            var dataField = "value";
            try {
                var dataFieldDefined = series.heatRules.getIndex(0).dataField;
                if (dataFieldDefined) {
                    dataField = dataFieldDefined;
                }
            }
            catch (err) {
            }
            this.updateMinMax(series.dataItem.values[dataField].low, series.dataItem.values[dataField].high);
            series.dataItem.events.on("calculatedvaluechanged", function (event) {
                _this.updateMinMax(series.dataItem.values[dataField].low, series.dataItem.values[dataField].high);
            }, undefined, false);
            series.heatRules.events.on("inserted", this.invalidate, this, false);
            series.heatRules.events.on("removed", this.invalidate, this, false);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates min/max of value axis.
     * @ignore
     */
    HeatLegend.prototype.updateMinMax = function (min, max) {
        var valueAxis = this.valueAxis;
        if (!$type.isNumber(this.minValue)) {
            valueAxis.min = min;
            valueAxis.invalidate();
        }
        if (!$type.isNumber(this.maxValue)) {
            valueAxis.max = max;
            valueAxis.invalidate();
        }
    };
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    HeatLegend.prototype.processConfig = function (config) {
        if (config) {
            // Set up series
            if ($type.hasValue(config.series) && $type.isString(config.series)) {
                if ($type.isString(config.series)) {
                    if (this.map.hasKey(config.series)) {
                        config.series = this.map.getKey(config.series);
                    }
                    else {
                        var seriesId_1 = config.series;
                        var disposer_1 = this.map.events.on("insertKey", function (ev) {
                            if (ev.key == seriesId_1) {
                                this.series = ev.newValue;
                                disposer_1.dispose();
                            }
                        }, this);
                        this._disposers.push(disposer_1);
                        delete config.series;
                    }
                }
            }
        }
        _super.prototype.processConfig.call(this, config);
    };
    return HeatLegend;
}(Container));
export { HeatLegend };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["HeatLegend"] = HeatLegend;
//# sourceMappingURL=HeatLegend.js.map