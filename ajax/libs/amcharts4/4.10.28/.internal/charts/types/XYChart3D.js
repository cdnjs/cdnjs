/**
 * Module for building 3D serial charts.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * Imports
 * ============================================================================
 * @hidden
 */
import { XYChart, XYChartDataItem } from "./XYChart";
import { Container } from "../../core/Container";
import { Sprite } from "../../core/Sprite";
import { AxisRendererX3D } from "../axes/AxisRendererX3D";
import { AxisRendererY3D } from "../axes/AxisRendererY3D";
import { ColumnSeries3D } from "../series/ColumnSeries3D";
import { registry } from "../../core/Registry";
import * as $iter from "../../core/utils/Iterator";
import * as $math from "../../core/utils/Math";
import * as $type from "../../core/utils/Type";
import * as $path from "../../core/rendering/Path";
import * as $utils from "../../core/utils/Utils";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[XYChart3D]].
 *
 * @see {@link DataItem}
 */
var XYChart3DDataItem = /** @class */ (function (_super) {
    __extends(XYChart3DDataItem, _super);
    function XYChart3DDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "XYChart3DDataItem";
        _this.applyTheme();
        return _this;
    }
    return XYChart3DDataItem;
}(XYChartDataItem));
export { XYChart3DDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a 3D XY chart.
 *
 * @see {@link IXYChart3DEvents} for a list of available Events
 * @see {@link IXYChart3DAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/xy-chart/} for documentation
 * @important
 */
var XYChart3D = /** @class */ (function (_super) {
    __extends(XYChart3D, _super);
    /**
     * Constructor
     */
    function XYChart3D() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * Type of the axis renderer to use for X axes.
         */
        _this._axisRendererX = AxisRendererX3D;
        /**
         * Type of the axis renderer to use for Y axes.
         */
        _this._axisRendererY = AxisRendererY3D;
        _this.className = "XYChart3D";
        // Set defaults
        _this.depth = 30;
        _this.angle = 30;
        // Creeate container for columns
        var columnsContainer = _this.seriesContainer.createChild(Container);
        columnsContainer.shouldClone = false;
        columnsContainer.isMeasured = false;
        columnsContainer.layout = "none";
        _this.columnsContainer = columnsContainer;
        _this.columnsContainer.mask = _this.createChild(Sprite);
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * This is done because for some reason IE doesn't change mask if path of a
     * mask changes.
     */
    XYChart3D.prototype.updateSeriesMasks = function () {
        _super.prototype.updateSeriesMasks.call(this);
        if ($utils.isIE()) {
            var columnsContainer = this.columnsContainer;
            var mask = columnsContainer.mask;
            columnsContainer.mask = undefined;
            columnsContainer.mask = mask;
        }
    };
    Object.defineProperty(XYChart3D.prototype, "depth", {
        /**
         * @return Depth (px)
         */
        get: function () {
            return this.getPropertyValue("depth");
        },
        /**
         * Depth of the 3D chart / columns in pixels.
         *
         * @param value  Depth (px)
         */
        set: function (value) {
            this.setPropertyValue("depth", value);
            this.fixLayout();
            this.invalidateDataUsers();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYChart3D.prototype, "angle", {
        /**
         * @return Angle
         */
        get: function () {
            return this.getPropertyValue("angle");
        },
        /**
         * Angle the chart is viewed at.
         *
         * @todo Description (review)
         * @param value  Angle
         */
        set: function (value) {
            this.setPropertyValue("angle", value);
            this.fixLayout();
            this.invalidateDataUsers();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYChart3D.prototype, "dx3D", {
        /**
         * A calculated horizontal 3D offset (px).
         *
         * @readonly
         * @return Offset (px)
         */
        get: function () {
            return $math.cos(this.angle) * this.depth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYChart3D.prototype, "dy3D", {
        /**
         * A calculated vertical 3D offset (px).
         *
         * @readonly
         * @return Offset (px)
         */
        get: function () {
            return -$math.sin(this.angle) * this.depth;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * (Re)validates layout
     *
     * @ignore Exclude from docs
     */
    XYChart3D.prototype.validateLayout = function () {
        _super.prototype.validateLayout.call(this);
        this.fixColumns();
    };
    /**
     * Updates the layout (padding and scrollbar positions) to accommodate for
     * 3D depth and angle.
     */
    XYChart3D.prototype.fixLayout = function () {
        this.chartContainer.paddingTop = -this.dy3D;
        this.chartContainer.paddingRight = this.dx3D;
        if (this.scrollbarX) {
            this.scrollbarX.dy = this.dy3D;
            this.scrollbarX.dx = this.dx3D;
        }
        if (this.scrollbarY) {
            this.scrollbarY.dy = this.dy3D;
            this.scrollbarY.dx = this.dx3D;
        }
        this.fixColumns();
        _super.prototype.fixLayout.call(this);
    };
    /**
     * Updates column positions, offset and dimensions based on chart's angle
     * and depth.
     */
    XYChart3D.prototype.fixColumns = function () {
        var _this = this;
        var count = 1;
        var i = 0;
        $iter.each(this.series.iterator(), function (series) {
            if (series instanceof ColumnSeries3D) {
                if (!series.clustered && i > 0) {
                    count++;
                }
                series.depthIndex = count - 1;
                i++;
            }
        });
        var s = 0;
        $iter.each(this.series.iterator(), function (series) {
            if (series instanceof ColumnSeries3D) {
                series.depth = _this.depth / (count);
                series.angle = _this.angle;
                if (series.columnsContainer == _this.columnsContainer) {
                    series.dx = _this.depth / (count) * $math.cos(_this.angle) * (series.depthIndex);
                    series.dy = -_this.depth / (count) * $math.sin(_this.angle) * (series.depthIndex);
                }
                var inversed_1 = false;
                if ((series.baseAxis == series.xAxis && series.xAxis.renderer.inversed) || (series.baseAxis == series.yAxis && series.yAxis.renderer.inversed)) {
                    inversed_1 = true;
                }
                var i_1 = 1;
                series.dataItems.each(function (dataItem) {
                    var column = dataItem.column;
                    if (column) {
                        if (inversed_1) {
                            column.zIndex = 1000 * (1000 - i_1) + s - series.depthIndex * 100;
                        }
                        else {
                            column.zIndex = 1000 * i_1 + s - series.depthIndex * 100;
                        }
                    }
                    i_1++;
                });
                if (inversed_1) {
                    s--;
                }
                else {
                    s++;
                }
            }
        });
        this.maskColumns();
    };
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    XYChart3D.prototype.processConfig = function (config) {
        if (config) {
            // Set up series
            if ($type.hasValue(config.series) && $type.isArray(config.series)) {
                for (var i = 0, len = config.series.length; i < len; i++) {
                    config.series[i].type = config.series[i].type || "ColumnSeries3D";
                }
            }
        }
        _super.prototype.processConfig.call(this, config);
    };
    XYChart3D.prototype.maskColumns = function () {
        var w = this.plotContainer.pixelWidth;
        var h = this.plotContainer.pixelHeight;
        var dx = this.dx3D;
        var dy = this.dy3D;
        var path = $path.moveTo({ x: 0, y: 0 }) + $path.lineTo({ x: dx, y: dy }) + $path.lineTo({ x: w + dx, y: dy }) + $path.lineTo({ x: w + dx, y: h + dy }) + $path.lineTo({ x: w, y: h }) + $path.lineTo({ x: w, y: h }) + $path.lineTo({ x: 0, y: h }) + $path.closePath();
        var columnsContainer = this.columnsContainer;
        if (columnsContainer && columnsContainer.mask) {
            columnsContainer.mask.path = path;
        }
    };
    return XYChart3D;
}(XYChart));
export { XYChart3D };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["XYChart3D"] = XYChart3D;
//# sourceMappingURL=XYChart3D.js.map