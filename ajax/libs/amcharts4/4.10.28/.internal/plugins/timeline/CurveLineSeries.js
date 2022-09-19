/**
 * Curve line series module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { LineSeries, LineSeriesDataItem } from "../../charts/series/LineSeries";
import { registry } from "../../core/Registry";
import { Sprite } from "../../core/Sprite";
import * as $math from "../../core/utils/Math";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[CurveLineSeries]].
 *
 * @see {@link DataItem}
 */
var CurveLineSeriesDataItem = /** @class */ (function (_super) {
    __extends(CurveLineSeriesDataItem, _super);
    /**
     * Constructor
     */
    function CurveLineSeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "CurveLineSeriesDataItem";
        _this.applyTheme();
        return _this;
    }
    return CurveLineSeriesDataItem;
}(LineSeriesDataItem));
export { CurveLineSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a radar graph.
 *
 * @see {@link ICurveLineSeriesEvents} for a list of available Events
 * @see {@link ICurveLineSeriesAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
var CurveLineSeries = /** @class */ (function (_super) {
    __extends(CurveLineSeries, _super);
    /**
     * Constructor
     */
    function CurveLineSeries() {
        var _this = _super.call(this) || this;
        _this.className = "CurveLineSeries";
        _this.connectEnds = false;
        _this.bulletsContainer.mask = new Sprite();
        _this.topOffset = 0.2;
        _this.bottomOffset = 0.2;
        _this.applyTheme();
        return _this;
    }
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    CurveLineSeries.prototype.createDataItem = function () {
        return new CurveLineSeriesDataItem();
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
    CurveLineSeries.prototype.getPoint = function (dataItem, xKey, yKey, locationX, locationY, stackKeyX, stackKeyY) {
        if (!stackKeyX) {
            stackKeyX = "valueX";
        }
        if (!stackKeyY) {
            stackKeyY = "valueY";
        }
        var renderer = this.yAxis.renderer;
        var radius = $math.fitToRange(this.yAxis.getY(dataItem, yKey, locationY, stackKeyY), -renderer.radius * (1 + this.bottomOffset), -renderer.innerRadius * (1 + this.topOffset));
        var xx = this.xAxis.getX(dataItem, xKey, locationX, stackKeyX);
        var xy = this.xAxis.getY(dataItem, xKey, locationX, stackKeyX);
        var angle = this.xAxis.getAngle(dataItem, xKey, locationX, stackKeyX);
        return { x: xx + radius * $math.cos(angle), y: xy + radius * $math.sin(angle) };
    };
    /**
     * [addPoints description]
     *
     * @todo Description
     * @param points    [description]
     * @param dataItem  [description]
     * @param xField    [description]
     * @param yField    [description]
     * @param backwards [description]
     */
    CurveLineSeries.prototype.addPoints = function (points, dataItem, xField, yField, backwards) {
        var point = this.getPoint(dataItem, xField, yField, dataItem.locations[xField], dataItem.locations[yField]);
        if (point) {
            points.push(point);
        }
    };
    /**
     * Returns an SVG path to be used as a mask for the series.
     *
     * @return SVG path
     */
    CurveLineSeries.prototype.getMaskPath = function () {
        var rendererY = this.yAxis.renderer;
        var path = rendererY.getPositionRangePath(this.yAxis.start, this.yAxis.end);
        var bulletsContainer = this.bulletsContainer;
        if (this.chart && this.chart.maskBullets) {
            if (!bulletsContainer.mask) {
                bulletsContainer.mask = new Sprite();
            }
            bulletsContainer.mask.path = path;
        }
        else {
            bulletsContainer.mask = undefined;
        }
        return path;
    };
    /**
     * [drawSegment description]
     *
     * @todo Description
     * @param segment      [description]
     * @param points       [description]
     * @param closePoints  [description]
     */
    CurveLineSeries.prototype.drawSegment = function (segment, points, closePoints) {
        if (this.connectEnds) {
            // adds one point to the beginning of closePoints array, if needed
            if (this.dataFields[this._xOpenField] ||
                this.dataFields[this._yOpenField] ||
                this.stacked) {
                points.push(points[0]);
                if (closePoints.length > 0) {
                    closePoints.unshift(closePoints[closePoints.length - 1]);
                }
            }
        }
        _super.prototype.drawSegment.call(this, segment, points, closePoints);
    };
    Object.defineProperty(CurveLineSeries.prototype, "connectEnds", {
        /**
         * @return Connect?
         */
        get: function () {
            return this.getPropertyValue("connectEnds");
        },
        /**
         * Should the last and and first data points be connected, forming a complete
         * closed circle?
         *
         * @default false
         * @param  value  Connect?
         */
        set: function (value) {
            this.setPropertyValue("connectEnds", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurveLineSeries.prototype, "topOffset", {
        /**
         * @return Top offset
         */
        get: function () {
            return this.getPropertyValue("topOffset");
        },
        /**
         * A relative part of an series elements allowed outside of the outer edge of
         * the "plot area".
         *
         * @default 0.2
         * @param  value  Top offset
         */
        set: function (value) {
            this.setPropertyValue("topOffset", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurveLineSeries.prototype, "bottomOffset", {
        /**
         * @return Bottom offset
         */
        get: function () {
            return this.getPropertyValue("bottomOffset");
        },
        /**
         * A relative part of an series elements allowed outside of the inner edge of
         * the "plot area".
         *
         * @default 0.2
         * @param  value  Bottom offset
         */
        set: function (value) {
            this.setPropertyValue("bottomOffset", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * [positionBulletReal description]
     *
     * @param {Sprite} bullet    [description]
     * @param {number} positionX [description]
     * @param {number} positionY [description]
     */
    CurveLineSeries.prototype.positionBulletReal = function (bullet, positionX, positionY) {
        var xAxis = this.xAxis;
        var yAxis = this.yAxis;
        if (positionX < xAxis.start || positionX > xAxis.end || positionY < yAxis.start || positionY > yAxis.end) {
            bullet.visible = false;
        }
        bullet.moveTo(this.xAxis.renderer.positionToPoint(positionX, positionY));
    };
    CurveLineSeries.prototype.setXAxis = function (axis) {
        _super.prototype.setXAxis.call(this, axis);
        this.updateRendererRefs();
    };
    CurveLineSeries.prototype.setYAxis = function (axis) {
        _super.prototype.setYAxis.call(this, axis);
        this.updateRendererRefs();
    };
    CurveLineSeries.prototype.updateRendererRefs = function () {
        var rendererX = this.xAxis.renderer;
        var rendererY = this.yAxis.renderer;
        rendererX.axisRendererY = rendererY;
        rendererY.axisRendererX = rendererX;
    };
    return CurveLineSeries;
}(LineSeries));
export { CurveLineSeries };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["CurveLineSeries"] = CurveLineSeries;
registry.registeredClasses["CurveLineSeriesDataItem"] = CurveLineSeriesDataItem;
//# sourceMappingURL=CurveLineSeries.js.map