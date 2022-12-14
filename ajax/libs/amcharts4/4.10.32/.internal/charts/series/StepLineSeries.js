/**
 * Step line series module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { LineSeries, LineSeriesDataItem } from "./LineSeries";
import { StepLineSeriesSegment } from "./StepLineSeriesSegment";
import { registry } from "../../core/Registry";
import * as $math from "../../core/utils/Math";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[StepLineSeries]].
 *
 * @see {@link DataItem}
 */
var StepLineSeriesDataItem = /** @class */ (function (_super) {
    __extends(StepLineSeriesDataItem, _super);
    /**
     * Constructor
     */
    function StepLineSeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "StepLineSeriesDataItem";
        _this.applyTheme();
        return _this;
    }
    return StepLineSeriesDataItem;
}(LineSeriesDataItem));
export { StepLineSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a step line graph.
 *
 * @see {@link IStepLineSeriesEvents} for a list of available Events
 * @see {@link IStepLineSeriesAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
var StepLineSeries = /** @class */ (function (_super) {
    __extends(StepLineSeries, _super);
    /**
     * Constructor
     */
    function StepLineSeries() {
        var _this = _super.call(this) || this;
        _this.className = "StepLineSeries";
        _this.applyTheme();
        _this.startLocation = 0;
        _this.endLocation = 1;
        return _this;
    }
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    StepLineSeries.prototype.createDataItem = function () {
        return new StepLineSeriesDataItem();
    };
    /**
     * [addPoints description]
     *
     * @todo Description
     * @param points     [description]
     * @param dataItem   [description]
     * @param xField     [description]
     * @param yField     [description]
     * @param backwards  [description]
     */
    StepLineSeries.prototype.addPoints = function (points, dataItem, xField, yField, backwards) {
        var startLocationX;
        var endLocationX;
        var startLocationY;
        var endLocationY;
        if (this.baseAxis == this.xAxis) {
            startLocationX = this.startLocation;
            endLocationX = this.endLocation;
            startLocationY = this.getAdjustedXLocation(dataItem, this.yOpenField);
            endLocationY = this.getAdjustedXLocation(dataItem, this.yField);
        }
        if (this.baseAxis == this.yAxis) {
            startLocationY = this.startLocation;
            endLocationY = this.endLocation;
            startLocationX = this.getAdjustedXLocation(dataItem, this.xOpenField);
            endLocationX = this.getAdjustedXLocation(dataItem, this.xField);
        }
        var x0 = this.xAxis.getX(dataItem, xField, startLocationX);
        var y0 = this.yAxis.getY(dataItem, yField, startLocationY);
        var x1 = this.xAxis.getX(dataItem, xField, endLocationX);
        var y1 = this.yAxis.getY(dataItem, yField, endLocationY);
        x0 = $math.fitToRange(x0, -100000, 100000); // from geometric point of view this is not right, but practically it's ok. this is done to avoid too big objects.
        y0 = $math.fitToRange(y0, -100000, 100000); // from geometric point of view this is not right, but practically it's ok. this is done to avoid too big objects.
        x1 = $math.fitToRange(x1, -100000, 100000); // from geometric point of view this is not right, but practically it's ok. this is done to avoid too big objects.
        y1 = $math.fitToRange(y1, -100000, 100000); // from geometric point of view this is not right, but practically it's ok. this is done to avoid too big objects.
        // this might make an impression that points are duplicated, and they indeed are, but this is needed to handle gaps in data
        if (!this.noRisers) {
            if (points.length > 1) {
                var prevPoint = points[points.length - 1];
                if (this.baseAxis == this.xAxis) {
                    if (backwards) {
                        points.push({ x: prevPoint.x, y: y1 });
                    }
                    else {
                        points.push({ x: x0, y: prevPoint.y });
                    }
                }
                if (this.baseAxis == this.yAxis) {
                    if (backwards) {
                        points.push({ x: x1, y: prevPoint.y });
                    }
                    else {
                        points.push({ x: prevPoint.x, y: y0 });
                    }
                }
            }
        }
        var point0 = { x: x0, y: y0 };
        var point1 = { x: x1, y: y1 };
        if (backwards) {
            points.push(point1, point0);
        }
        else {
            points.push(point0, point1);
        }
    };
    /**
     * Draws the line segment.
     *
     * @param segment     Segment
     * @param points      Segment points
     * @param closePoints Segment close points
     */
    StepLineSeries.prototype.drawSegment = function (segment, points, closePoints) {
        var vertical = false;
        if (this.yAxis == this.baseAxis) {
            vertical = true;
        }
        segment.drawSegment(points, closePoints, this.tensionX, this.tensionY, this.noRisers, vertical);
    };
    /**
     * @ignore
     */
    StepLineSeries.prototype.createSegment = function () {
        return new StepLineSeriesSegment();
    };
    Object.defineProperty(StepLineSeries.prototype, "noRisers", {
        /**
         * @return No risers
         */
        get: function () {
            return this.getPropertyValue("noRisers");
        },
        /**
         * Specifies if step line series should draw only horizontal (or only
         * vertical, depending on base axis) lines, instead of connecting them with
         * vertical (or horizontal) lines.
         *
         * @default false
         * @param value  No risers
         */
        set: function (value) {
            this.setPropertyValue("noRisers", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepLineSeries.prototype, "startLocation", {
        /**
         * @return Location (0-1)
         */
        get: function () {
            return this.getPropertyValue("startLocation");
        },
        /**
         * start location of the step
         *
         * @param value Location (0-1)
         * @default 0
         */
        set: function (value) {
            this.setPropertyValue("startLocation", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepLineSeries.prototype, "endLocation", {
        /**
         * @return Location (0-1)
         */
        get: function () {
            return this.getPropertyValue("endLocation");
        },
        /**
         * Step end location.
         *
         * @param value Location (0-1)
         * #default 1
         */
        set: function (value) {
            this.setPropertyValue("endLocation", value, true);
        },
        enumerable: true,
        configurable: true
    });
    return StepLineSeries;
}(LineSeries));
export { StepLineSeries };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["StepLineSeries"] = StepLineSeries;
registry.registeredClasses["StepLineSeriesDataItem"] = StepLineSeriesDataItem;
//# sourceMappingURL=StepLineSeries.js.map