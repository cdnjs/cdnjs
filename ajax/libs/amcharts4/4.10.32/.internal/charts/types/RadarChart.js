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
import { XYChart, XYChartDataItem } from "./XYChart";
import { percent, Percent } from "../../core/utils/Percent";
import { RadarSeries } from "../series/RadarSeries";
import { Container } from "../../core/Container";
import { Circle } from "../../core/elements/Circle";
import { registry } from "../../core/Registry";
import { AxisRendererCircular } from "../axes/AxisRendererCircular";
import { AxisRendererRadial } from "../axes/AxisRendererRadial";
import * as $utils from "../../core/utils/Utils";
import * as $iter from "../../core/utils/Iterator";
import * as $type from "../../core/utils/Type";
import * as $math from "../../core/utils/Math";
import * as $path from "../../core/rendering/Path";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[RadarChart]].
 *
 * @see {@link DataItem}
 */
var RadarChartDataItem = /** @class */ (function (_super) {
    __extends(RadarChartDataItem, _super);
    /**
     * Constructor
     */
    function RadarChartDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "RadarChartDataItem";
        _this.applyTheme();
        return _this;
    }
    return RadarChartDataItem;
}(XYChartDataItem));
export { RadarChartDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a Radar chart.
 *
 * @see {@link IRadarChartEvents} for a list of available Events
 * @see {@link IRadarChartAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/radar-chart/} for documentation
 * @important
 */
var RadarChart = /** @class */ (function (_super) {
    __extends(RadarChart, _super);
    /**
     * Constructor
     */
    function RadarChart() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * Defines X axis renderer type.
         */
        _this._axisRendererX = AxisRendererCircular;
        /**
         * Defines Y axis renderer type.
         */
        _this._axisRendererY = AxisRendererRadial;
        /**
         * used by cursor. We adjust innerradius if start and end angle are close to each other
         * @ignore Exclude from docs
         */
        _this.innerRadiusModifyer = 1;
        /**
         * @ignore
         */
        _this.mr = 1;
        _this.className = "RadarChart";
        _this.startAngle = -90;
        _this.endAngle = 270;
        _this.radius = percent(80);
        _this.innerRadius = 0;
        var radarContainer = _this.plotContainer.createChild(Container);
        radarContainer.shouldClone = false;
        radarContainer.layout = "absolute";
        radarContainer.align = "center";
        radarContainer.valign = "middle";
        _this.seriesContainer.parent = radarContainer;
        _this.radarContainer = radarContainer;
        _this.bulletsContainer.parent = radarContainer;
        _this.axisBulletsContainer = radarContainer;
        _this._cursorContainer = radarContainer;
        _this.chartContainer.events.on("maxsizechanged", _this.invalidate, _this, false); // need this for the chart to change radius if legend is removed/disabled
        _this._bulletMask = radarContainer.createChild(Circle);
        _this._bulletMask.shouldClone = false;
        _this._bulletMask.element = _this.paper.add("path");
        _this._bulletMask.opacity = 0;
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    RadarChart.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        // Add a default screen reader title for accessibility
        // This will be overridden in screen reader if there are any `titles` set
        if (!$type.hasValue(this.readerTitle)) {
            this.readerTitle = this.language.translate("Radar chart");
        }
    };
    /**
     * Decorates Axis with required properties for this chart.
     *
     * @param axis  Axis
     */
    RadarChart.prototype.processAxis = function (axis) {
        _super.prototype.processAxis.call(this, axis);
        var renderer = axis.renderer;
        renderer.gridContainer.parent = renderer;
        renderer.breakContainer.parent = renderer;
        axis.parent = this.radarContainer;
        renderer.toBack();
    };
    /**
     * Updates all X axes after range change event.
     */
    RadarChart.prototype.handleXAxisRangeChange = function () {
        _super.prototype.handleXAxisRangeChange.call(this);
        $iter.each(this.yAxes.iterator(), function (axis) {
            axis.invalidate();
        });
    };
    /**
     * Updates all Y axes after range change event.
     */
    RadarChart.prototype.handleYAxisRangeChange = function () {
        _super.prototype.handleYAxisRangeChange.call(this);
        $iter.each(this.xAxes.iterator(), function (axis) {
            axis.invalidate();
        });
    };
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    RadarChart.prototype.processConfig = function (config) {
        if (config) {
            // Set up cursor
            if ($type.hasValue(config.cursor) && !$type.hasValue(config.cursor.type)) {
                config.cursor.type = "RadarCursor";
            }
            // Set up series
            if ($type.hasValue(config.series) && $type.isArray(config.series)) {
                for (var i = 0, len = config.series.length; i < len; i++) {
                    config.series[i].type = config.series[i].type || "RadarSeries";
                }
            }
            // Set up axes
            /*if ($type.hasValue(config.xAxes) && $type.isArray(config.xAxes)) {
                for (let i = 0, len = config.xAxes.length; i < len; i++) {
                    config.xAxes[i].type = config.xAxes[i].type || "AxisRendererCircular";
                }
            }
            if ($type.hasValue(config.yAxes) && $type.isArray(config.yAxes)) {
                for (let i = 0, len = config.yAxes.length; i < len; i++) {
                    config.yAxes[i].type = config.yAxes[i].type || "AxisRendererRadial";
                }
            }*/
        }
        _super.prototype.processConfig.call(this, config);
    };
    /**
     * Does calculations before drawing the chart.
     */
    RadarChart.prototype.beforeDraw = function () {
        _super.prototype.beforeDraw.call(this);
        var plotContainer = this.plotContainer;
        var rect = $math.getArcRect(this.startAngle, this.endAngle, 1);
        var innerRect = { x: 0, y: 0, width: 0, height: 0 };
        var wr = plotContainer.innerWidth / rect.width;
        var hr = plotContainer.innerHeight / rect.height;
        var innerRadius = this.innerRadius;
        if (innerRadius instanceof Percent) {
            var value = innerRadius.value;
            var mr = Math.min(wr, hr);
            this.mr = mr;
            value = Math.max(mr * value, mr - Math.min(plotContainer.innerHeight, plotContainer.innerWidth)) / mr;
            innerRect = $math.getArcRect(this.startAngle, this.endAngle, value);
            this.innerRadiusModifyer = value / innerRadius.value;
            innerRadius = percent(value * 100);
        }
        // @todo handle this when innerRadius set in pixels (do it for pie also)
        rect = $math.getCommonRectangle([rect, innerRect]);
        var maxRadius = Math.min(plotContainer.innerWidth / rect.width, plotContainer.innerHeight / rect.height);
        var diameter = $utils.relativeRadiusToValue(this.radius, maxRadius) * 2 || 0;
        var radius = diameter / 2;
        var startAngle = this.startAngle;
        var endAngle = this.endAngle;
        this._pixelInnerRadius = $utils.relativeRadiusToValue(innerRadius, radius);
        this._bulletMask.path = $path.arc(startAngle, endAngle - startAngle, radius, this._pixelInnerRadius);
        $iter.each(this.xAxes.iterator(), function (axis) {
            if (axis.renderer.useChartAngles) {
                axis.renderer.startAngle = startAngle;
                axis.renderer.endAngle = endAngle;
            }
            axis.width = diameter;
            axis.height = diameter;
            //axis.renderer.width = diameter;
            //axis.renderer.height = diameter;
            axis.renderer.pixelRadiusReal = radius;
            //axis.renderer.innerRadius = innerRadius;
        });
        $iter.each(this.yAxes.iterator(), function (axis) {
            axis.renderer.startAngle = startAngle;
            axis.renderer.endAngle = endAngle;
            axis.width = diameter;
            axis.height = diameter;
            //axis.renderer.width = diameter;
            //axis.renderer.height = diameter;
            axis.renderer.pixelRadiusReal = radius;
            //axis.renderer.innerRadius = innerRadius;
        });
        var cursor = this.cursor;
        if (cursor) {
            cursor.width = diameter;
            cursor.height = diameter;
            cursor.startAngle = startAngle;
            cursor.endAngle = endAngle;
        }
        this.radarContainer.definedBBox = { x: radius * rect.x, y: radius * rect.y, width: radius * rect.width, height: radius * rect.height };
        this.radarContainer.validatePosition();
    };
    /**
     * Creates and returns a new Series, suitable for RadarChart.
     *
     * @return New Series
     */
    RadarChart.prototype.createSeries = function () {
        return new RadarSeries();
    };
    Object.defineProperty(RadarChart.prototype, "startAngle", {
        /**
         * @return Start angle (degrees)
         */
        get: function () {
            return this.getPropertyValue("startAngle");
        },
        /**
         * Starting angle of the Radar face. (degrees)
         *
         * Normally, a circular radar face begins (the radial axis is drawn) at the
         * top center. (at -90 degrees)
         *
         * You can use `startAngle` to change this setting.
         *
         * E.g. setting this to 0 will make the radial axis start horizontally to
         * the right, as opposed to vertical.
         *
         * For a perfect circle the absolute sum of `startAngle` and `endAngle`
         * needs to be 360.
         *
         * However, it's **not** necessary to do so. You can set those to lesser
         * numbers, to create semi-circles.
         *
         * E.g. `startAngle = -90` with `endAngle = 0` will create a radar face that
         * looks like a quarter of a circle.
         *
         * @default -90
         * @param value  Start angle (degrees)
         */
        set: function (value) {
            this.setPropertyValue("startAngle", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadarChart.prototype, "endAngle", {
        /**
         * @return End angle (degrees)
         */
        get: function () {
            return this.getPropertyValue("endAngle");
        },
        /**
         * Starting angle of the Radar face. (degrees)
         *
         * Normally, a circular radar face ends (the radial axis is drawn) exactly
         * where it has started, forming a full 360 circle. (at 270 degrees)
         *
         * You can use `endAngle` to end the circle somewhere else.
         *
         * E.g. setting this to 180 will make the radar face end at horizontal line
         * to the left off the center.
         *
         * For a perfect circle the absolute sum of `startAngle` and `endAngle`
         * needs to be 360.
         *
         * However, it's **not** necessary to do so. You can set those to lesser
         * numbers, to create semi-circles.
         *
         * E.g. `startAngle = -90` with `endAngle = 0` will create a radar face that
         * looks like a quarter of a circle.
         *
         * @default -90
         * @param value  End angle (degrees)
         */
        set: function (value) {
            this.setPropertyValue("endAngle", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadarChart.prototype, "radius", {
        /**
         * @return Outer radius
         */
        get: function () {
            return this.getPropertyValue("radius");
        },
        /**
         * Outer radius of the Radar face.
         *
         * This can either be in absolute pixel value, or relative [[Percent]].
         *
         * @param value  Outer radius
         */
        set: function (value) {
            this.setPercentProperty("radius", value, true, false, 10, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadarChart.prototype, "pixelInnerRadius", {
        /**
         * @return Inner radius in pixels
         */
        get: function () {
            return this._pixelInnerRadius;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadarChart.prototype, "innerRadius", {
        /**
         * @return Inner radius
         */
        get: function () {
            return this.getPropertyValue("innerRadius");
        },
        /**
         * Inner radius of the radar face.
         *
         * This can either be in absolute pixel value, or relative [[Percent]].
         *
         * If set in Percent, it will be relative to `radius`. (outer radius)
         *
         * @param value Inner radius
         */
        set: function (value) {
            this.setPercentProperty("innerRadius", value, true, false, 10, false);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Triggers (re)rendering of the horizontal (X) axis.
     *
     * @ignore Exclude from docs
     * @param axis Axis
     */
    RadarChart.prototype.updateXAxis = function (renderer) {
        //do not call super!
        if (renderer) {
            renderer.processRenderer();
        }
    };
    /**
     * Triggers (re)rendering of the vertical (Y) axis.
     *
     * @ignore Exclude from docs
     * @param axis Axis
     */
    RadarChart.prototype.updateYAxis = function (renderer) {
        // do not call super!
        if (renderer) {
            renderer.processRenderer();
        }
    };
    return RadarChart;
}(XYChart));
export { RadarChart };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["RadarChart"] = RadarChart;
//# sourceMappingURL=RadarChart.js.map