/**
 * Serpentine chart module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { CurveChart, CurveChartDataItem } from "./CurveChart";
import { registry } from "../../core/Registry";
import { percent } from "../../core/utils/Percent";
import * as $math from "../../core/utils/Math";
import * as $utils from "../../core/utils/Utils";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[SerpentineChart]].
 *
 * @see {@link DataItem}
 */
var SerpentineChartDataItem = /** @class */ (function (_super) {
    __extends(SerpentineChartDataItem, _super);
    /**
     * Constructor
     */
    function SerpentineChartDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "SerpentineChartDataItem";
        _this.applyTheme();
        return _this;
    }
    return SerpentineChartDataItem;
}(CurveChartDataItem));
export { SerpentineChartDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a Serpentine chart.
 *
 * @see {@link ISerpentineChartEvents} for a list of available Events
 * @see {@link ISerpentineChartAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/timeline/#Serpentine} for documentation
 * @important
 */
var SerpentineChart = /** @class */ (function (_super) {
    __extends(SerpentineChart, _super);
    /**
     * Constructor
     */
    function SerpentineChart() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "SerpentineChart";
        _this.orientation = "vertical";
        _this.levelCount = 3;
        _this.yAxisRadius = percent(25);
        _this.yAxisInnerRadius = percent(-25);
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(SerpentineChart.prototype, "orientation", {
        /**
         * @return Orientation
         */
        get: function () {
            return this.getPropertyValue("orientation");
        },
        /**
         * Orientation (direction) of the chart.
         *
         * Options: "vertical" (default) or "horizontal".
         *
         * @default vertical
         * @param  value  Orientaiton
         */
        set: function (value) {
            this.setPropertyValue("orientation", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SerpentineChart.prototype, "levelCount", {
        /**
         * @return Level count
         */
        get: function () {
            return this.getPropertyValue("levelCount");
        },
        /**
         * How many "turns" (levels) the chart will have.
         *
         * @default 3
         * @param  value  Level count
         */
        set: function (value) {
            this.setPropertyValue("levelCount", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SerpentineChart.prototype, "yAxisRadius", {
        /**
         * @return {number} Outer radius
         */
        get: function () {
            return this.getPropertyValue("yAxisRadius");
        },
        /**
         * Outer radius of the Y axis.
         *
         * It can be fixed number of pixels or percentage of the radius of distance
         * between rings of the spiral.
         *
         * IMPORTANT: this will override `radius` setting set on directly on the
         * Y axis renderer.
         *
         * @default 25%
         * @param  value  Outer radius
         */
        set: function (value) {
            this.setPropertyValue("yAxisRadius", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SerpentineChart.prototype, "yAxisInnerRadius", {
        /**
         * @return Inner radius
         */
        get: function () {
            return this.getPropertyValue("yAxisInnerRadius");
        },
        /**
         * Inner radius of the Y axis.
         *
         * It can be fixed number of pixels or percentage of the radius of distance
         * between rings of the spiral.
         *
         * IMPORTANT: this will override `innerRadius` setting set on directly on the
         * Y axis renderer.
         *
         * @default -25%
         * @param  value  Inner radius
         */
        set: function (value) {
            this.setPropertyValue("yAxisInnerRadius", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Validates the chart.
     *
     * @ignore
     */
    SerpentineChart.prototype.validate = function () {
        _super.prototype.validate.call(this);
        var curveContainer = this.curveContainer;
        var w = this.plotContainer.maxWidth - curveContainer.pixelPaddingLeft - curveContainer.pixelPaddingRight;
        var h = this.plotContainer.maxHeight - curveContainer.pixelPaddingTop - curveContainer.pixelPaddingBottom;
        var axisRadius = 0;
        this.yAxes.each(function (axis) {
            axisRadius = $math.max(axis.renderer.radius, axisRadius);
        });
        w -= 2 * axisRadius;
        h -= 2 * axisRadius;
        var points = [];
        var levelCount = this.levelCount;
        var radius;
        if (this.orientation == "vertical") {
            radius = $math.min(h / (levelCount - 1) / 2, w / 2);
            h = $math.min(radius * (levelCount - 1) * 2, h);
            for (var i = 0; i < this.levelCount; i++) {
                if (i % 2 === 0) {
                    points.push({ x: -w / 2 + radius, y: -h / 2 + h / (levelCount - 1) * i });
                    points.push({ x: w / 2 - radius, y: -h / 2 + h / (levelCount - 1) * i });
                    var centerPoint = { x: w / 2 - radius, y: -h / 2 + h / (levelCount - 1) * (i + 0.5) };
                    if (i < this.levelCount - 1) {
                        for (var i_1 = 0; i_1 < 50; i_1++) {
                            var angle = -90 + i_1 / 50 * 180;
                            points.push({ x: centerPoint.x + radius * $math.cos(angle), y: centerPoint.y + radius * $math.sin(angle) });
                        }
                    }
                }
                else {
                    points.push({ x: w / 2 - radius, y: -h / 2 + h / (levelCount - 1) * i });
                    points.push({ x: -w / 2 + radius, y: -h / 2 + h / (levelCount - 1) * i });
                    var centerPoint = { x: -w / 2 + radius, y: -h / 2 + h / (levelCount - 1) * (i + 0.5) };
                    if (i < this.levelCount - 1) {
                        for (var i_2 = 0; i_2 < 50; i_2++) {
                            var angle = -90 - i_2 / 50 * 180;
                            points.push({ x: centerPoint.x + radius * $math.cos(angle), y: centerPoint.y + radius * $math.sin(angle) });
                        }
                    }
                }
            }
        }
        else {
            radius = $math.min(w / (levelCount - 1) / 2, h / 2);
            w = $math.min(radius * (levelCount - 1) * 2, w);
            for (var i = 0; i < this.levelCount; i++) {
                if (i % 2 === 0) {
                    points.push({ y: -h / 2 + radius, x: -w / 2 + w / (levelCount - 1) * i });
                    points.push({ y: h / 2 - radius, x: -w / 2 + w / (levelCount - 1) * i });
                    var centerPoint = { y: h / 2 - radius, x: -w / 2 + w / (levelCount - 1) * (i + 0.5) };
                    if (i < this.levelCount - 1) {
                        for (var i_3 = 0; i_3 < 50; i_3++) {
                            var angle = -90 + i_3 / 50 * 180;
                            points.push({ y: centerPoint.y + radius * $math.cos(angle), x: centerPoint.x + radius * $math.sin(angle) });
                        }
                    }
                }
                else {
                    points.push({ y: h / 2 - radius, x: -w / 2 + w / (levelCount - 1) * i });
                    points.push({ y: -h / 2 + radius, x: -w / 2 + w / (levelCount - 1) * i });
                    var centerPoint = { y: -h / 2 + radius, x: -w / 2 + w / (levelCount - 1) * (i + 0.5) };
                    if (i < this.levelCount - 1) {
                        for (var i_4 = 0; i_4 < 50; i_4++) {
                            var angle = -90 - i_4 / 50 * 180;
                            points.push({ y: centerPoint.y + radius * $math.cos(angle), x: centerPoint.x + radius * $math.sin(angle) });
                        }
                    }
                }
            }
        }
        this.xAxes.each(function (axis) {
            axis.renderer.points = points;
            axis.renderer.autoScale = false;
            axis.renderer.autoCenter = false;
            axis.renderer.polyspline.tensionX = 1;
            axis.renderer.polyspline.tensionY = 1;
        });
        var yInnerRadius = $utils.relativeRadiusToValue(this.yAxisInnerRadius, radius * 2);
        var yRadius = $utils.relativeRadiusToValue(this.yAxisRadius, radius * 2);
        this.yAxes.each(function (axis) {
            axis.renderer.radius = yRadius;
            axis.renderer.innerRadius = yInnerRadius;
        });
    };
    /**
     * Triggers (re)rendering of the vertical (Y) axis.
     *
     * @ignore Exclude from docs
     * @param axis  Axis
     */
    SerpentineChart.prototype.updateYAxis = function (renderer) {
        _super.prototype.updateYAxis.call(this, renderer);
        renderer.innerRadius = undefined;
        renderer.radius = undefined;
    };
    return SerpentineChart;
}(CurveChart));
export { SerpentineChart };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["SerpentineChart"] = SerpentineChart;
//# sourceMappingURL=SerpentineChart.js.map