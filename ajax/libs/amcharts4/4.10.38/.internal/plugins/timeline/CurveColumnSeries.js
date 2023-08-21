/**
 * Curve column series module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ColumnSeries, ColumnSeriesDataItem } from "../../charts/series/ColumnSeries";
import { Sprite, visualProperties } from "../../core/Sprite";
//import { AxisRendererCircular } from "../axes/AxisRendererCircular";
import { CurveColumn } from "./CurveColumn";
import { registry } from "../../core/Registry";
import { ValueAxis } from "../../charts/axes/ValueAxis";
import { CategoryAxis } from "../../charts/axes/CategoryAxis";
import * as $math from "../../core/utils/Math";
import * as $type from "../../core/utils/Type";
import * as $path from "../../core/rendering/Path";
import * as $array from "../../core/utils/Array";
import * as $object from "../../core/utils/Object";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[CurveColumnSeries]].
 *
 * @see {@link DataItem}
 */
var CurveColumnSeriesDataItem = /** @class */ (function (_super) {
    __extends(CurveColumnSeriesDataItem, _super);
    /**
     * Constructor
     */
    function CurveColumnSeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "ColumnSeriesDataItem";
        _this.applyTheme();
        return _this;
    }
    return CurveColumnSeriesDataItem;
}(ColumnSeriesDataItem));
export { CurveColumnSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a 3D column graph.
 *
 * @see {@link ICurveColumnSeriesEvents} for a list of available Events
 * @see {@link ICurveColumnSeriesAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
var CurveColumnSeries = /** @class */ (function (_super) {
    __extends(CurveColumnSeries, _super);
    /**
     * Constructor
     */
    function CurveColumnSeries() {
        var _this = _super.call(this) || this;
        _this.className = "CurveColumnSeries";
        _this.bulletsContainer.mask = new Sprite();
        _this.topOffset = 0.2;
        _this.bottomOffset = 0.2;
        _this.applyTheme();
        return _this;
    }
    /**
     * Creates and returns a CurveColumn element to use as column in radar chart.
     *
     * @return CurveColumn.
     */
    CurveColumnSeries.prototype.createColumnTemplate = function () {
        return new CurveColumn();
    };
    /**
     * Validates data item's element, effectively redrawing it.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    CurveColumnSeries.prototype.validateDataElementReal = function (dataItem) {
        //let startAngle = this.chart.startAngle;
        //let endAngle = this.chart.endAngle;
        var _this = this;
        var yField = this.yField;
        var yOpenField = this.yOpenField;
        var xField = this.xField;
        var xOpenField = this.xOpenField;
        var startLocation = this.getStartLocation(dataItem);
        var endLocation = this.getEndLocation(dataItem);
        //let cellAngle = (endAngle - startAngle) / (this.dataItems.length * (this.end - this.start));
        var template = this.columns.template;
        var percentWidth = template.percentWidth;
        var percentHeight = template.percentHeight;
        if ($type.isNaN(percentWidth)) {
            percentWidth = 100;
        }
        var points = [];
        var xAxis = this.xAxis;
        var yAxis = this.yAxis;
        var axisRendererX = xAxis.renderer;
        var middlePoint;
        if (this.baseAxis == this.xAxis) {
            var offset = $math.round((endLocation - startLocation) * (1 - percentWidth / 100) / 2, 5);
            startLocation += offset;
            endLocation -= offset;
            var count = Math.ceil(this.xAxis.axisLength / axisRendererX.precisionStep / (this.endIndex - this.startIndex)) + 2;
            var step = (endLocation - startLocation) / count;
            var bottomLocation = dataItem.locations[yOpenField];
            var topLocation = dataItem.locations[yField];
            // otherwise gantt chart will start items in the middle of a cell
            if (this.yAxis instanceof ValueAxis) {
                if (this.dataFields[this.yField] != this.dataFields[this.yOpenField]) {
                    bottomLocation = 0;
                    topLocation = 0;
                }
            }
            else if (this.yAxis instanceof CategoryAxis) {
                if (!$type.isNaN(percentHeight)) {
                    topLocation = 0;
                    bottomLocation = 1;
                    var offset_1 = $math.round((1 - percentHeight / 100) / 2, 5);
                    topLocation += offset_1;
                    bottomLocation -= offset_1;
                }
            }
            for (var i = startLocation; i <= endLocation; i = i + step) {
                if (i > endLocation) {
                    i = endLocation;
                }
                points.push(this.getPoint(dataItem, xField, yField, i, topLocation));
            }
            points.push(this.getPoint(dataItem, xField, yField, endLocation, topLocation));
            for (var i = endLocation; i >= startLocation; i = i - step) {
                if (i < startLocation) {
                    i = startLocation;
                }
                points.push(this.getPoint(dataItem, xOpenField, yOpenField, i, bottomLocation));
            }
            points.push(this.getPoint(dataItem, xOpenField, yOpenField, startLocation, bottomLocation));
            middlePoint = this.getPoint(dataItem, xField, yField, startLocation + (endLocation - startLocation) / 2, 0.5);
        }
        else {
            var offset = $math.round((endLocation - startLocation) * (1 - percentHeight / 100) / 2, 5);
            startLocation += offset;
            endLocation -= offset;
            var rangeX = { start: xAxis.start, end: xAxis.end };
            var rangeY = { start: yAxis.start, end: yAxis.end };
            var rightLocation = dataItem.locations[xField];
            var leftLocation = dataItem.locations[xOpenField];
            // otherwise gantt chart will start items in the middle of a cell
            if (this.xAxis instanceof ValueAxis) {
                if (this.dataFields[this.xField] != this.dataFields[this.xOpenField]) {
                    rightLocation = 0;
                    leftLocation = 0;
                }
            }
            var openPositionX = xAxis.getPositionX(dataItem, xOpenField, leftLocation, "valueX", rangeX);
            var positionX = xAxis.getPositionX(dataItem, xField, rightLocation, "valueX", rangeX);
            var openPositionY = yAxis.getPositionY(dataItem, yOpenField, startLocation, "valueY", rangeY);
            var positionY = yAxis.getPositionY(dataItem, yField, endLocation, "valueY", rangeY);
            var count = Math.ceil((xAxis.axisLength / axisRendererX.precisionStep) * (positionX - openPositionX) / (xAxis.end - xAxis.start)) + 2;
            var step = (positionX - openPositionX) / count;
            if (positionX > openPositionX) {
                for (var i = openPositionX; i <= positionX; i = i + step) {
                    if (i > positionX) {
                        i = positionX;
                    }
                    points.push(xAxis.renderer.positionToPoint(i, openPositionY));
                }
                points.push(xAxis.renderer.positionToPoint(positionX, openPositionY));
                for (var i = positionX; i >= openPositionX; i = i - step) {
                    if (i < openPositionX) {
                        i = openPositionX;
                    }
                    points.push(xAxis.renderer.positionToPoint(i, positionY));
                }
                points.push(xAxis.renderer.positionToPoint(openPositionX, positionY));
            }
            middlePoint = xAxis.renderer.positionToPoint(openPositionX + (positionX - openPositionX) / 2, openPositionY + (positionY - openPositionY) / 2);
        }
        var column = dataItem.column;
        if (!column) {
            column = this.columns.create();
            $object.copyProperties(this, column, visualProperties); // need this because 3d columns are not in the same container
            $object.copyProperties(this.columns.template, column, visualProperties); // second time, no force, so that columns.template would override series properties			
            dataItem.column = column;
            dataItem.addSprite(column);
            this.setColumnStates(column);
            column.paper = this.paper;
        }
        var curveColumn = column.curveColumn;
        if (points.length > 0) {
            points.push(points[0]);
        }
        curveColumn.path = $path.pointsToPath(points);
        column.__disabled = false;
        column.parent = this.columnsContainer;
        column.tooltipX = middlePoint.x;
        column.tooltipY = middlePoint.y;
        column.curveColumn.tooltipX = middlePoint.x;
        column.curveColumn.tooltipY = middlePoint.y;
        this.axisRanges.each(function (axisRange) {
            var rangeColumn = dataItem.rangesColumns.getKey(axisRange.uid);
            if (!rangeColumn) {
                rangeColumn = _this.columns.create();
                if (rangeColumn.dataItem) {
                    $array.remove(rangeColumn.dataItem.sprites, rangeColumn);
                }
                dataItem.addSprite(rangeColumn);
                rangeColumn.paper = _this.paper;
                _this.setColumnStates(rangeColumn);
                dataItem.rangesColumns.setKey(axisRange.uid, rangeColumn);
            }
            var rangeCurveColumn = rangeColumn.curveColumn;
            rangeCurveColumn.path = curveColumn.path;
            rangeColumn.__disabled = false;
            rangeColumn.parent = axisRange.contents;
        });
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
    CurveColumnSeries.prototype.getPoint = function (dataItem, xKey, yKey, locationX, locationY, stackKeyX, stackKeyY) {
        if (!stackKeyX) {
            stackKeyX = "valueX";
        }
        if (!stackKeyY) {
            stackKeyY = "valueY";
        }
        var renderer = this.yAxis.renderer;
        //let radius = $math.fitToRange(this.yAxis.getY(dataItem, yKey, locationY, stackKeyY), renderer.innerRadius * (1 + this.bottomOffset), renderer.radius * (1 + this.topOffset));
        //let radius = this.yAxis.getY(dataItem, yKey, locationY, stackKeyY);
        var radius = $math.fitToRange(this.yAxis.getY(dataItem, yKey, locationY, stackKeyY), -renderer.radius * (1 + this.topOffset), -renderer.innerRadius * (1 + this.bottomOffset));
        var range = { start: this.xAxis.start, end: this.xAxis.end };
        var xx = this.xAxis.getX(dataItem, xKey, locationX, stackKeyX, range);
        var xy = this.xAxis.getY(dataItem, xKey, locationX, stackKeyX, range);
        var angle = this.xAxis.getAngle(dataItem, xKey, locationX, stackKeyX, range);
        return { x: xx + radius * $math.cos(angle), y: xy + radius * $math.sin(angle) };
    };
    /**
     * Returns an SVG path to be used as a mask for the series.
     *
     * @return SVG path
     */
    CurveColumnSeries.prototype.getMaskPath = function () {
        var renderer = this.yAxis.renderer;
        var path = renderer.getPositionRangePath(renderer.axis.start, renderer.axis.end);
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
    Object.defineProperty(CurveColumnSeries.prototype, "topOffset", {
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
    Object.defineProperty(CurveColumnSeries.prototype, "bottomOffset", {
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
     * @ignore
     * @param {Sprite} bullet    [description]
     * @param {number} positionX [description]
     * @param {number} positionY [description]
     */
    CurveColumnSeries.prototype.positionBulletReal = function (bullet, positionX, positionY) {
        var xAxis = this.xAxis;
        var yAxis = this.yAxis;
        if (positionX < xAxis.start || positionX > xAxis.end || positionY < yAxis.start || positionY > yAxis.end) {
            bullet.visible = false;
        }
        bullet.moveTo(this.xAxis.renderer.positionToPoint(positionX, positionY));
    };
    CurveColumnSeries.prototype.setXAxis = function (axis) {
        _super.prototype.setXAxis.call(this, axis);
        this.updateRendererRefs();
    };
    CurveColumnSeries.prototype.setYAxis = function (axis) {
        _super.prototype.setYAxis.call(this, axis);
        this.updateRendererRefs();
    };
    CurveColumnSeries.prototype.updateRendererRefs = function () {
        var rendererX = this.xAxis.renderer;
        var rendererY = this.yAxis.renderer;
        rendererX.axisRendererY = rendererY;
        rendererY.axisRendererX = rendererX;
    };
    return CurveColumnSeries;
}(ColumnSeries));
export { CurveColumnSeries };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["CurveColumnSeries"] = CurveColumnSeries;
registry.registeredClasses["CurveColumnSeriesDataItem"] = CurveColumnSeriesDataItem;
//# sourceMappingURL=CurveColumnSeries.js.map