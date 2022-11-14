/**
 * Radar chart module.
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
import * as $math from "../../core/utils/Math";
import { percent } from "../../core/utils/Percent";
import * as $path from "../../core/rendering/Path";
import * as $utils from "../../core/utils/Utils";
import * as $type from "../../core/utils/Type";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[SpiralChart]].
 *
 * @see {@link DataItem}
 */
var SpiralChartDataItem = /** @class */ (function (_super) {
    __extends(SpiralChartDataItem, _super);
    /**
     * Constructor
     */
    function SpiralChartDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "SpiralChartDataItem";
        _this.applyTheme();
        return _this;
    }
    return SpiralChartDataItem;
}(CurveChartDataItem));
export { SpiralChartDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a Spiral chart.
 *
 * @see {@link ISpiralChartEvents} for a list of available Events
 * @see {@link ISpiralChartAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/timeline/#Spiral} for documentation
 * @important
 */
var SpiralChart = /** @class */ (function (_super) {
    __extends(SpiralChart, _super);
    /**
     * Constructor
     */
    function SpiralChart() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "SpiralChart";
        _this.levelCount = 3;
        _this.precisionStep = 5;
        _this.startAngle = 0;
        _this.endAngle = 0;
        _this.innerRadius = percent(25);
        _this.yAxisRadius = percent(35);
        _this.yAxisInnerRadius = percent(-35);
        _this.inversed = false;
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(SpiralChart.prototype, "levelCount", {
        /**
         * @return Number of circles
         */
        get: function () {
            return this.getPropertyValue("levelCount");
        },
        /**
         * Number of rings the spiral will consist of.
         *
         * @default 3
         * @param  value  Number of circles
         */
        set: function (value) {
            this.setPropertyValue("levelCount", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpiralChart.prototype, "startAngle", {
        /**
         * @return End angle
         */
        get: function () {
            return this.getPropertyValue("startAngle");
        },
        /**
         * An angle the spiral will start at.
         *
         * @default 0
         * @param  value  Start angle
         */
        set: function (value) {
            this.setPropertyValue("startAngle", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpiralChart.prototype, "endAngle", {
        /**
         * @return End angle
         */
        get: function () {
            return this.getPropertyValue("endAngle");
        },
        /**
         * An angle the spiral will end at.
         *
         * @default 0
         * @param  value  End angle
         */
        set: function (value) {
            this.setPropertyValue("endAngle", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpiralChart.prototype, "radiusStep", {
        /**
         * @return Radius step (px)
         */
        get: function () {
            return this.getPropertyValue("radiusStep");
        },
        /**
         * Number of pixels the spiral diameter will increase by each full rotation.
         *
         * Normally the chart will calculate it by itself. You can override it by
         * setting your own value of `radiusStep`.
         *
         * In such case the chart might be bigger or smaller than chart container.
         *
         * @param {number} value  Radius step (px)
         */
        set: function (value) {
            this.setPropertyValue("radiusStep", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpiralChart.prototype, "precisionStep", {
        /**
         * @return Precision
         */
        get: function () {
            return this.getPropertyValue("precisionStep");
        },
        /**
         * Precision setting to use when automatically generating axis points for the
         * spiral.
         *
         * The smaller the number, the finer line. However, small number will impact
         * the performace.
         *
         * Depending on actual chart configuration, you might need to find the best
         * possible value to balance between detail and good performance.
         *
         * @default 5
         * @param  value  Precision
         */
        set: function (value) {
            this.setPropertyValue("precisionStep", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpiralChart.prototype, "innerRadius", {
        /**
         * @return Inner radius
         */
        get: function () {
            return this.getPropertyValue("innerRadius");
        },
        /**
         * Inner radius of the spiral.
         *
         * Can be either fixed number in pixels, or in percent.
         *
         * @default 25%
         * @param  value  Inner radius
         */
        set: function (value) {
            this.setPropertyValue("innerRadius", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpiralChart.prototype, "yAxisRadius", {
        /**
         * @return Outer radius
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
         * @default 35%
         * @param  value  Outer radius
         */
        set: function (value) {
            this.setPropertyValue("yAxisRadius", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpiralChart.prototype, "yAxisInnerRadius", {
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
         * @default -35%
         * @param  value  Inner radius
         */
        set: function (value) {
            this.setPropertyValue("yAxisInnerRadius", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpiralChart.prototype, "inversed", {
        /**
         * @return Inversed?
         */
        get: function () {
            return this.getPropertyValue("inversed");
        },
        /**
         * Normally the spiral will start at the center.
         *
         * Set this to `true` to start at the outer end.
         *
         * @default false
         * @param  value  Inversed?
         */
        set: function (value) {
            this.setPropertyValue("inversed", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Validates the chart.
     *
     * @ignore
     */
    SpiralChart.prototype.validate = function () {
        _super.prototype.validate.call(this);
        var curveContainer = this.curveContainer;
        var w = this.plotContainer.maxWidth - curveContainer.pixelPaddingLeft - curveContainer.pixelPaddingRight;
        var h = this.plotContainer.maxHeight - curveContainer.pixelPaddingTop - curveContainer.pixelPaddingBottom;
        var radius = $math.min(w, h) / 2;
        var radiusStep = this.radiusStep;
        var innerRadius = $utils.relativeRadiusToValue(this.innerRadius, radius);
        if (!$type.isNumber(radiusStep)) {
            radiusStep = (radius - innerRadius) / this.levelCount;
        }
        var points = $path.spiralPoints(0, 0, radius, radius, innerRadius, this.precisionStep, radiusStep, this.startAngle, this.endAngle);
        var yInnerRadius = $utils.relativeRadiusToValue(this.yAxisInnerRadius, radiusStep);
        var yRadius = $utils.relativeRadiusToValue(this.yAxisRadius, radiusStep);
        if (this.inversed) {
            points.reverse();
        }
        this.xAxes.each(function (axis) {
            axis.renderer.points = points;
            axis.renderer.autoScale = false;
            axis.renderer.autoCenter = false;
            axis.renderer.polyspline.tensionX = 1;
            axis.renderer.polyspline.tensionY = 1;
        });
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
    SpiralChart.prototype.updateYAxis = function (renderer) {
        _super.prototype.updateYAxis.call(this, renderer);
        renderer.innerRadius = undefined;
        renderer.radius = undefined;
    };
    return SpiralChart;
}(CurveChart));
export { SpiralChart };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["SpiralChart"] = SpiralChart;
//# sourceMappingURL=SpiralChart.js.map