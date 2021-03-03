/**
 * Radar column series module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ColumnSeries, ColumnSeriesDataItem } from "../series/ColumnSeries";
import { visualProperties } from "../../core/Sprite";
import { CategoryAxis } from "../axes/CategoryAxis";
import { RadarColumn } from "../elements/RadarColumn";
import { registry } from "../../core/Registry";
import * as $path from "../../core/rendering/Path";
import * as $math from "../../core/utils/Math";
import * as $object from "../../core/utils/Object";
import { Percent } from "../../core/utils/Percent";
import * as $iter from "../../core/utils/Iterator";
import * as $array from "../../core/utils/Array";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[RadarColumnSeries]].
 *
 * @see {@link DataItem}
 */
var RadarColumnSeriesDataItem = /** @class */ (function (_super) {
    __extends(RadarColumnSeriesDataItem, _super);
    /**
     * Constructor
     */
    function RadarColumnSeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "ColumnSeriesDataItem";
        _this.applyTheme();
        return _this;
    }
    return RadarColumnSeriesDataItem;
}(ColumnSeriesDataItem));
export { RadarColumnSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a 3D column graph.
 *
 * @see {@link IRadarColumnSeriesEvents} for a list of available Events
 * @see {@link IRadarColumnSeriesAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
var RadarColumnSeries = /** @class */ (function (_super) {
    __extends(RadarColumnSeries, _super);
    /**
     * Constructor
     */
    function RadarColumnSeries() {
        var _this = _super.call(this) || this;
        _this.className = "RadarColumnSeries";
        _this.applyTheme();
        return _this;
    }
    /**
     * Creates and returns a RadarColumn element to use as column in radar chart.
     *
     * @return RadarColumn.
     */
    RadarColumnSeries.prototype.createColumnTemplate = function () {
        return new RadarColumn();
    };
    /**
     * (Re)validates the whole series, effectively causing it to redraw.
     *
     * @ignore Exclude from docs
     */
    RadarColumnSeries.prototype.validate = function () {
        // so that radius would be updated
        if (this.chart.invalid) {
            this.chart.validate();
        }
        _super.prototype.validate.call(this);
    };
    /**
     * @ignore
     */
    RadarColumnSeries.prototype.disableUnusedColumns = function (dataItem) {
        if (dataItem) {
            if (dataItem.column) {
                dataItem.column.__disabled = true;
            }
            $iter.each(this.axisRanges.iterator(), function (axisRange) {
                var rangeColumn = dataItem.rangesColumns.getKey(axisRange.uid);
                if (rangeColumn) {
                    rangeColumn.__disabled = true;
                }
            });
        }
    };
    /**
     * Validates data item's element, effectively redrawing it.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    RadarColumnSeries.prototype.validateDataElementReal = function (dataItem) {
        var _this = this;
        var startAngle = this.chart.startAngle;
        var endAngle = this.chart.endAngle;
        var yField = this.yField;
        var yOpenField = this.yOpenField;
        var xField = this.xField;
        var xOpenField = this.xOpenField;
        var lAngle;
        var rAngle;
        var tRadius;
        var bRadius;
        var startLocation = this.getStartLocation(dataItem);
        var endLocation = this.getEndLocation(dataItem);
        var cellAngle = (endAngle - startAngle) / (this.dataItems.length * (this.end - this.start));
        var radarColumn = dataItem.column;
        if (!radarColumn) {
            radarColumn = this.columns.create();
            dataItem.column = radarColumn;
            $object.copyProperties(this, radarColumn, visualProperties); // need this 
            $object.copyProperties(this.columns.template, radarColumn, visualProperties); // second time, no force, so that columns.template would override series properties			
            dataItem.addSprite(radarColumn);
            radarColumn.paper = this.paper; // sometimes pattern is not drawn if is set with adapter without this.
            this.setColumnStates(radarColumn);
        }
        var width = radarColumn.width;
        var percentWidth = 100;
        if (width instanceof Percent) {
            percentWidth = width.percent;
        }
        var offset = $math.round((endLocation - startLocation) * (1 - percentWidth / 100) / 2, 5);
        startLocation += offset;
        endLocation -= offset;
        // two category axes
        if ((this.xAxis instanceof CategoryAxis) && (this.yAxis instanceof CategoryAxis)) {
            tRadius = $math.getDistance({ x: this.yAxis.getX(dataItem, yField, 0, "valueY"), y: this.yAxis.getY(dataItem, yField, 0, "valueY") });
            bRadius = $math.getDistance({ x: this.yAxis.getX(dataItem, yOpenField, 1, "valueY"), y: this.yAxis.getY(dataItem, yOpenField, 1, "valueY") });
            lAngle = this.xAxis.getAngle(dataItem, xOpenField, 0, "valueX");
            rAngle = this.xAxis.getAngle(dataItem, xField, 1, "valueX");
            startAngle = startAngle + startLocation * cellAngle;
            endAngle = endAngle - (1 - endLocation) * cellAngle;
        }
        else if (this.baseAxis == this.xAxis) {
            tRadius = $math.getDistance({ x: this.yAxis.getX(dataItem, yField, dataItem.locations[yField], "valueY"), y: this.yAxis.getY(dataItem, yField, dataItem.locations[yField], "valueY") });
            bRadius = $math.getDistance({ x: this.yAxis.getX(dataItem, yOpenField, dataItem.locations[yOpenField], "valueY"), y: this.yAxis.getY(dataItem, yOpenField, dataItem.locations[yOpenField], "valueY") });
            lAngle = this.xAxis.getAngle(dataItem, xOpenField, startLocation, "valueX");
            rAngle = this.xAxis.getAngle(dataItem, xField, endLocation, "valueX");
            startAngle = startAngle + startLocation * cellAngle;
            endAngle = endAngle - (1 - endLocation) * cellAngle;
        }
        else {
            tRadius = $math.getDistance({ x: this.yAxis.getX(dataItem, yField, startLocation, "valueY"), y: this.yAxis.getY(dataItem, yField, startLocation, "valueY") });
            bRadius = $math.getDistance({ x: this.yAxis.getX(dataItem, yOpenField, endLocation, "valueY"), y: this.yAxis.getY(dataItem, yOpenField, endLocation, "valueY") });
            lAngle = this.xAxis.getAngle(dataItem, xField, dataItem.locations[xField], "valueX");
            rAngle = this.xAxis.getAngle(dataItem, xOpenField, dataItem.locations[xOpenField], "valueX");
        }
        if (rAngle < lAngle) {
            var temp = rAngle;
            rAngle = lAngle;
            lAngle = temp;
        }
        lAngle = $math.fitToRange(lAngle, startAngle, endAngle);
        rAngle = $math.fitToRange(rAngle, startAngle, endAngle);
        var slice = radarColumn.radarColumn;
        slice.startAngle = lAngle;
        var arc = rAngle - lAngle;
        if (arc > 0) {
            slice.arc = arc;
            slice.radius = tRadius;
            slice.innerRadius = bRadius;
            radarColumn.__disabled = false;
            radarColumn.parent = this.columnsContainer;
            $iter.each(this.axisRanges.iterator(), function (axisRange) {
                var rangeColumn = dataItem.rangesColumns.getKey(axisRange.uid);
                if (!rangeColumn) {
                    rangeColumn = _this.columns.create();
                    $object.forceCopyProperties(_this.columns.template, rangeColumn, visualProperties);
                    $object.copyProperties(axisRange.contents, rangeColumn, visualProperties); // need this because 3d columns are not in the same container
                    if (rangeColumn.dataItem) {
                        $array.remove(rangeColumn.dataItem.sprites, rangeColumn);
                    }
                    dataItem.addSprite(rangeColumn);
                    rangeColumn.paper = _this.paper; // sometimes pattern is not drawn if is set with adapter without this.					
                    _this.setColumnStates(rangeColumn);
                    dataItem.rangesColumns.setKey(axisRange.uid, rangeColumn);
                }
                var slice = rangeColumn.radarColumn;
                slice.startAngle = lAngle;
                slice.arc = arc;
                slice.radius = tRadius;
                slice.innerRadius = bRadius;
                if (slice.invalid) {
                    slice.paper = _this.paper;
                    slice.validate(); // validate as if it was used previously, it will flicker with previous dimensions
                }
                rangeColumn.__disabled = false;
                rangeColumn.parent = axisRange.contents;
            });
        }
        else {
            this.disableUnusedColumns(dataItem);
        }
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
    RadarColumnSeries.prototype.getPoint = function (dataItem, xKey, yKey, locationX, locationY, stackKeyX, stackKeyY) {
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
        return { x: radius * $math.cos(angle), y: radius * $math.sin(angle) };
    };
    /**
     * Returns an SVG path to be used as a mask for the series.
     *
     * @return SVG path
     */
    RadarColumnSeries.prototype.getMaskPath = function () {
        var renderer = this.yAxis.renderer;
        return $path.arc(renderer.startAngle, renderer.endAngle - renderer.startAngle, renderer.pixelRadius, renderer.pixelInnerRadius);
    };
    RadarColumnSeries.prototype.positionBulletReal = function (bullet, positionX, positionY) {
        var xAxis = this.xAxis;
        var yAxis = this.yAxis;
        if (positionX < xAxis.start || positionX > xAxis.end || positionY < yAxis.start || positionY > yAxis.end) {
            bullet.visible = false;
        }
        bullet.moveTo(this.xAxis.renderer.positionToPoint(positionX, positionY));
    };
    RadarColumnSeries.prototype.setXAxis = function (axis) {
        _super.prototype.setXAxis.call(this, axis);
        this.updateRendererRefs();
    };
    RadarColumnSeries.prototype.setYAxis = function (axis) {
        _super.prototype.setYAxis.call(this, axis);
        this.updateRendererRefs();
    };
    RadarColumnSeries.prototype.updateRendererRefs = function () {
        var rendererX = this.xAxis.renderer;
        var rendererY = this.yAxis.renderer;
        rendererX.axisRendererY = rendererY;
    };
    return RadarColumnSeries;
}(ColumnSeries));
export { RadarColumnSeries };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["RadarColumnSeries"] = RadarColumnSeries;
registry.registeredClasses["RadarColumnSeriesDataItem"] = RadarColumnSeriesDataItem;
//# sourceMappingURL=RadarColumnSeries.js.map