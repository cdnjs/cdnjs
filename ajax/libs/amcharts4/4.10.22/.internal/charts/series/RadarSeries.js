/**
 * Radar series module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { LineSeries, LineSeriesDataItem } from "./LineSeries";
import { registry } from "../../core/Registry";
import * as $math from "../../core/utils/Math";
import * as $path from "../../core/rendering/Path";
//import { AxisRendererCircular } from "../axes/AxisRendererCircular";
//import { Sprite } from "../../core/Sprite";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[RadarSeries]].
 *
 * @see {@link DataItem}
 */
var RadarSeriesDataItem = /** @class */ (function (_super) {
    __extends(RadarSeriesDataItem, _super);
    /**
     * Constructor
     */
    function RadarSeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "RadarSeriesDataItem";
        _this.setLocation("dateX", 0, 0);
        _this.setLocation("dateY", 0, 0);
        _this.setLocation("categoryX", 0, 0);
        _this.setLocation("categoryY", 0, 0);
        _this.applyTheme();
        return _this;
    }
    return RadarSeriesDataItem;
}(LineSeriesDataItem));
export { RadarSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a radar graph.
 *
 * @see {@link IRadarSeriesEvents} for a list of available Events
 * @see {@link IRadarSeriesAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
var RadarSeries = /** @class */ (function (_super) {
    __extends(RadarSeries, _super);
    /**
     * Constructor
     */
    function RadarSeries() {
        var _this = _super.call(this) || this;
        _this.className = "RadarSeries";
        _this.connectEnds = true;
        _this.applyTheme();
        return _this;
    }
    /**
     * (Re)validates the whole series, effectively causing it to redraw.
     *
     * @ignore Exclude from docs
     */
    RadarSeries.prototype.validate = function () {
        // so that radius would be updated
        if (this.chart.invalid) {
            this.chart.validate();
        }
        _super.prototype.validate.call(this);
    };
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    RadarSeries.prototype.createDataItem = function () {
        return new RadarSeriesDataItem();
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
    RadarSeries.prototype.getPoint = function (dataItem, xKey, yKey, locationX, locationY, stackKeyX, stackKeyY) {
        if (!stackKeyX) {
            stackKeyX = "valueX";
        }
        if (!stackKeyY) {
            stackKeyY = "valueY";
        }
        var x = this.yAxis.getX(dataItem, yKey, locationY, stackKeyY);
        var y = this.yAxis.getY(dataItem, yKey, locationY, stackKeyY);
        var radius = $math.getDistance({ x: x, y: y });
        // hack to be able to determine angle later
        if (radius == 0) {
            radius = 0.00001;
        }
        var angle = this.xAxis.getAngle(dataItem, xKey, locationX, stackKeyX);
        var startAngle = this.chart.startAngle;
        var endAngle = this.chart.endAngle;
        //		angle = $math.fitToRange(angle, startAngle, endAngle);
        if (angle < startAngle || angle > endAngle) {
            return undefined;
        }
        else {
            return { x: radius * $math.cos(angle), y: radius * $math.sin(angle) };
        }
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
    RadarSeries.prototype.addPoints = function (points, dataItem, xField, yField, backwards) {
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
    RadarSeries.prototype.getMaskPath = function () {
        var renderer = this.yAxis.renderer;
        return $path.arc(renderer.startAngle, renderer.endAngle - renderer.startAngle, renderer.pixelRadius, renderer.pixelInnerRadius);
    };
    /**
     * [drawSegment description]
     *
     * @todo Description
     * @param segment      [description]
     * @param points       [description]
     * @param closePoints  [description]
     */
    RadarSeries.prototype.drawSegment = function (segment, points, closePoints) {
        var axis = this.yAxis;
        var renderer = axis.renderer;
        if (this.connectEnds && Math.abs(renderer.endAngle - renderer.startAngle) == 360) {
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
    Object.defineProperty(RadarSeries.prototype, "connectEnds", {
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
         * @default true
         * @param value  Connect?
         */
        set: function (value) {
            this.setPropertyValue("connectEnds", value, true);
        },
        enumerable: true,
        configurable: true
    });
    RadarSeries.prototype.positionBulletReal = function (bullet, positionX, positionY) {
        var xAxis = this.xAxis;
        var yAxis = this.yAxis;
        if (positionX < xAxis.start || positionX > xAxis.end || positionY < yAxis.start || positionY > yAxis.end) {
            bullet.visible = false;
        }
        bullet.moveTo(this.xAxis.renderer.positionToPoint(positionX, positionY));
    };
    RadarSeries.prototype.setXAxis = function (axis) {
        _super.prototype.setXAxis.call(this, axis);
        this.updateRendererRefs();
    };
    RadarSeries.prototype.setYAxis = function (axis) {
        _super.prototype.setYAxis.call(this, axis);
        this.updateRendererRefs();
    };
    RadarSeries.prototype.updateRendererRefs = function () {
        var rendererX = this.xAxis.renderer;
        var rendererY = this.yAxis.renderer;
        rendererX.axisRendererY = rendererY;
    };
    return RadarSeries;
}(LineSeries));
export { RadarSeries };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["RadarSeries"] = RadarSeries;
registry.registeredClasses["RadarSeriesDataItem"] = RadarSeriesDataItem;
//# sourceMappingURL=RadarSeries.js.map