/**
 * Curve chart module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { XYChart, XYChartDataItem } from "../../charts/types/XYChart";
import { CurveLineSeries } from "./CurveLineSeries";
import { Container } from "../../core/Container";
import { registry } from "../../core/Registry";
import { AxisRendererCurveX } from "./AxisRendererCurveX";
import { AxisRendererCurveY } from "./AxisRendererCurveY";
import * as $type from "../../core/utils/Type";
import { options } from "../../core/Options";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[CurveChart]].
 *
 * @see {@link DataItem}
 */
var CurveChartDataItem = /** @class */ (function (_super) {
    __extends(CurveChartDataItem, _super);
    /**
     * Constructor
     */
    function CurveChartDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "CurveChartDataItem";
        _this.applyTheme();
        return _this;
    }
    return CurveChartDataItem;
}(XYChartDataItem));
export { CurveChartDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a Curve chart.
 *
 * @see {@link ICurveChartEvents} for a list of available Events
 * @see {@link ICurveChartAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/timeline/} for documentation
 * @important
 */
var CurveChart = /** @class */ (function (_super) {
    __extends(CurveChart, _super);
    /**
     * Constructor
     */
    function CurveChart() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * Defines X axis renderer type.
         */
        _this._axisRendererX = AxisRendererCurveX;
        /**
         * Defines Y axis renderer type.
         */
        _this._axisRendererY = AxisRendererCurveY;
        _this.className = "CurveChart";
        var curvedContainer = _this.plotContainer.createChild(Container);
        curvedContainer.shouldClone = false;
        curvedContainer.layout = "absolute";
        curvedContainer.align = "center";
        curvedContainer.valign = "middle";
        _this.seriesContainer.parent = curvedContainer;
        _this.curveContainer = curvedContainer;
        _this.bulletsContainer.parent = curvedContainer;
        _this.axisBulletsContainer.parent = curvedContainer;
        _this._cursorContainer = curvedContainer;
        _this._bulletMask = undefined;
        //this._bulletMask.shouldClone = false;
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    CurveChart.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        // Add a default screen reader title for accessibility
        // This will be overridden in screen reader if there are any `titles` set
        if (!$type.hasValue(this.readerTitle)) {
            //this.readerTitle = this.language.translate("Curved chart");
        }
    };
    /**
     * Decorates Axis with required properties for this chart.
     *
     * @param axis  Axis
     */
    CurveChart.prototype.processAxis = function (axis) {
        _super.prototype.processAxis.call(this, axis);
        var renderer = axis.renderer;
        renderer.gridContainer.parent = renderer;
        renderer.breakContainer.parent = renderer;
        axis.parent = this.curveContainer;
        renderer.toBack();
    };
    /**
     * Updates all X axes after range change event.
     */
    /*
   protected handleXAxisRangeChange() {
       super.handleXAxisRangeChange();
       $iter.each(this.yAxes.iterator(), (axis) => {
           axis.invalidate();
       });
   }*/
    /**
     * Updates all Y axes after range change event.
     */
    /*
   protected handleYAxisRangeChange() {
       super.handleYAxisRangeChange();
       $iter.each(this.xAxes.iterator(), (axis) => {
           axis.invalidate();
       });
   }*/
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    CurveChart.prototype.processConfig = function (config) {
        if (config) {
            // Set up cursor
            if ($type.hasValue(config.cursor) && !$type.hasValue(config.cursor.type)) {
                config.cursor.type = "CurveCursor";
            }
            // Set up series
            if ($type.hasValue(config.series) && $type.isArray(config.series)) {
                for (var i = 0, len = config.series.length; i < len; i++) {
                    config.series[i].type = config.series[i].type || "CurveLineSeries";
                }
            }
        }
        _super.prototype.processConfig.call(this, config);
    };
    /**
     * Creates and returns a new Series, suitable for [[CurveChart]].
     *
     * @return New Series
     */
    CurveChart.prototype.createSeries = function () {
        return new CurveLineSeries();
    };
    /**
     * Triggers (re)rendering of the horizontal (X) axis.
     *
     * @ignore Exclude from docs
     * @param axis Axis
     */
    CurveChart.prototype.updateXAxis = function (renderer) {
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
    CurveChart.prototype.updateYAxis = function (renderer) {
        // do not call super!
        if (renderer) {
            renderer.processRenderer();
        }
    };
    /**
     * @ignore
     * @return Has license?
     */
    CurveChart.prototype.hasLicense = function () {
        if (!_super.prototype.hasLicense.call(this)) {
            return false;
        }
        for (var i = 0; i < options.licenses.length; i++) {
            if (options.licenses[i].match(/^TL.{5,}/i)) {
                return true;
            }
        }
        return false;
    };
    return CurveChart;
}(XYChart));
export { CurveChart };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["CurveChart"] = CurveChart;
//# sourceMappingURL=CurveChart.js.map