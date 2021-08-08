/**
 * Curve step line series module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { CurveLineSeries, CurveLineSeriesDataItem } from "./CurveLineSeries";
import { DateAxis } from "../../charts/axes/DateAxis";
import { registry } from "../../core/Registry";
//import * as $math from "../../core/utils/Math";
import * as $type from "../../core/utils/Type";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[CurveStepLineSeries]].
 *
 * @see {@link DataItem}
 */
var CurveStepLineSeriesDataItem = /** @class */ (function (_super) {
    __extends(CurveStepLineSeriesDataItem, _super);
    /**
     * Constructor
     */
    function CurveStepLineSeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "CurveStepLineSeriesDataItem";
        _this.applyTheme();
        return _this;
    }
    return CurveStepLineSeriesDataItem;
}(CurveLineSeriesDataItem));
export { CurveStepLineSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a radar graph.
 *
 * @see {@link ICurveStepLineSeriesEvents} for a list of available Events
 * @see {@link ICurveStepLineSeriesAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
var CurveStepLineSeries = /** @class */ (function (_super) {
    __extends(CurveStepLineSeries, _super);
    /**
     * Constructor
     */
    function CurveStepLineSeries() {
        var _this = _super.call(this) || this;
        _this.className = "CurveStepLineSeries";
        _this.startLocation = 0;
        _this.endLocation = 1;
        _this.applyTheme();
        return _this;
    }
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    CurveStepLineSeries.prototype.createDataItem = function () {
        return new CurveStepLineSeriesDataItem();
    };
    /**
     * [addPoints description]
     *
     * @ignore
     * @todo Description
     * @param points    [description]
     * @param dataItem  [description]
     * @param xField    [description]
     * @param yField    [description]
     * @param backwards [description]
     */
    CurveStepLineSeries.prototype.addPoints = function (points, dataItem, xField, yField, backwards) {
        var startLocation = this.startLocation;
        var endLocation = this.endLocation;
        if (backwards) {
            startLocation = this.endLocation;
            endLocation = this.startLocation;
        }
        var xAxis = this.xAxis;
        var yAxis = this.yAxis;
        var previousPosition = this._previousPosition;
        var rangeX = { start: xAxis.start, end: xAxis.end };
        var rangeY = { start: yAxis.start, end: yAxis.end };
        var xRenderer = xAxis.renderer;
        if (this.baseAxis == this.xAxis) {
            var count = Math.ceil(this.xAxis.axisLength / xRenderer.precisionStep / (this.endIndex - this.startIndex)) + 2;
            var step = Math.abs(endLocation - startLocation) / count;
            // this solves issues with missing values
            // this is not done for when y is date axis due to unlikely situation
            if (this.xAxis instanceof DateAxis) {
                var index = dataItem.index;
                if (backwards) {
                    var nextDataItem = this.dataItems.getIndex(index - 1);
                    var baseDuration = this.xAxis.baseDuration;
                    if (nextDataItem) {
                        var nextTime = nextDataItem.dateX.getTime();
                        var currentTime = dataItem.dateX.getTime();
                        if (nextTime < currentTime - baseDuration) {
                            endLocation -= (currentTime - nextTime) / baseDuration - 1;
                        }
                    }
                }
                else {
                    var nextDataItem = this.dataItems.getIndex(index + 1);
                    var baseDuration = this.xAxis.baseDuration;
                    if (nextDataItem) {
                        var nextTime = nextDataItem.dateX.getTime();
                        var currentTime = dataItem.dateX.getTime();
                        if (nextTime > currentTime + baseDuration) {
                            endLocation += (nextTime - currentTime) / baseDuration - 1;
                        }
                    }
                }
            }
            if (backwards) {
                for (var i = startLocation; i >= endLocation; i = i - step) {
                    if (i < endLocation) {
                        i = endLocation;
                    }
                    points.push(this.getPoint(dataItem, xField, yField, i, dataItem.locations[yField]));
                }
                points.push(this.getPoint(dataItem, xField, yField, endLocation, dataItem.locations[yField]));
            }
            else {
                for (var i = startLocation; i <= endLocation; i = i + step) {
                    if (i > endLocation) {
                        i = endLocation;
                    }
                    points.push(this.getPoint(dataItem, xField, yField, i, dataItem.locations[yField]));
                }
                points.push(this.getPoint(dataItem, xField, yField, endLocation, dataItem.locations[yField]));
            }
        }
        else {
            var positionX = xAxis.getPositionX(dataItem, xField, dataItem.locations[xField], "valueX", rangeX);
            var positionY = yAxis.getPositionY(dataItem, yField, startLocation, "valueY", rangeY);
            if ($type.isNumber(previousPosition)) {
                var count = Math.ceil((xAxis.axisLength / xRenderer.precisionStep) * (positionX - previousPosition) / (xAxis.end - xAxis.start)) + 2;
                var step = Math.abs((positionX - previousPosition) / count);
                if (positionX > previousPosition) {
                    for (var i = previousPosition; i <= positionX; i = i + step) {
                        if (i > positionX) {
                            i = positionX;
                        }
                        points.push(xAxis.renderer.positionToPoint(i, positionY));
                    }
                }
                else if (positionX < previousPosition) {
                    for (var i = previousPosition; i >= positionX; i = i - step) {
                        if (i < positionX) {
                            i = positionX;
                        }
                        points.push(xAxis.renderer.positionToPoint(i, positionY));
                    }
                }
            }
            var startPoint = this.getPoint(dataItem, xField, yField, dataItem.locations[xField], startLocation);
            if (startPoint) {
                points.push(startPoint);
            }
            var endPoint = this.getPoint(dataItem, xField, yField, dataItem.locations[xField], endLocation);
            if (endPoint) {
                points.push(endPoint);
            }
            this._previousPosition = positionX;
        }
    };
    Object.defineProperty(CurveStepLineSeries.prototype, "startLocation", {
        /**
         * @return Location (0-1)
         */
        get: function () {
            return this.getPropertyValue("startLocation");
        },
        //protected createSegment(): this["_segment"] {
        //	return new StepLineSeriesSegment();
        //}	
        /**
         * Relative location in cell where step should start.
         *
         * @default 0
         * @param value Location (0-1)
         */
        set: function (value) {
            this.setPropertyValue("startLocation", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurveStepLineSeries.prototype, "endLocation", {
        /**
         * @return Location (0-1)
         */
        get: function () {
            return this.getPropertyValue("endLocation");
        },
        /**
         * Relative location in cell where step should end.
         *
         * @default 1
         * @param value Location (0-1)
         */
        set: function (value) {
            this.setPropertyValue("endLocation", value, true);
        },
        enumerable: true,
        configurable: true
    });
    return CurveStepLineSeries;
}(CurveLineSeries));
export { CurveStepLineSeries };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["CurveStepLineSeries"] = CurveStepLineSeries;
registry.registeredClasses["CurveStepLineSeriesDataItem"] = CurveStepLineSeriesDataItem;
//# sourceMappingURL=CurveStepLineSeries.js.map