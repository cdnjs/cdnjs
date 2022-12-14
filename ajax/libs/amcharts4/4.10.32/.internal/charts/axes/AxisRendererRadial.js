/**
 * Module, defining Axis Renderer for radial axes.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { AxisRendererY } from "./AxisRendererY";
import { CategoryAxis } from "./CategoryAxis";
import { WavedCircle } from "../../core/elements/WavedCircle";
import { MutableValueDisposer } from "../../core/utils/Disposer";
import { Percent, percent } from "../../core/utils/Percent";
import { registry } from "../../core/Registry";
import * as $math from "../../core/utils/Math";
import * as $path from "../../core/rendering/Path";
import * as $utils from "../../core/utils/Utils";
import * as $type from "../../core/utils/Type";
import { AxisBullet } from "./AxisBullet";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A renderer for radial axis.
 */
var AxisRendererRadial = /** @class */ (function (_super) {
    __extends(AxisRendererRadial, _super);
    /**
     * Constructor.
     *
     * @param axis Related axis
     */
    function AxisRendererRadial() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * A related chart.
         */
        _this._chart = new MutableValueDisposer();
        /**
         * @ignore
         */
        _this.pixelRadiusReal = 0;
        _this.className = "AxisRendererRadial";
        _this.isMeasured = false;
        _this.startAngle = -90;
        _this.endAngle = 270;
        _this.minGridDistance = 30;
        _this.gridType = "circles";
        _this.axisAngle = -90;
        _this.isMeasured = false;
        _this.layout = "none";
        _this.radius = percent(100);
        _this.line.strokeOpacity = 0;
        _this.labels.template.horizontalCenter = "middle";
        _this._disposers.push(_this._chart);
        _this.applyTheme();
        return _this;
    }
    /**
     * Validates Axis renderer.
     *
     * @ignore Exclude from docs
     */
    AxisRendererRadial.prototype.validate = function () {
        // so that radius would be updated
        if (this.chart && this.chart.invalid) {
            this.chart.validate();
        }
        _super.prototype.validate.call(this);
    };
    Object.defineProperty(AxisRendererRadial.prototype, "axisLength", {
        /**
         * Returns actual length of the Axis, in pixels.
         *
         * @return Length (px)
         */
        get: function () {
            return this.pixelRadius - this.pixelInnerRadius;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRendererRadial.prototype, "radius", {
        /**
         * @return Outer radius
         */
        get: function () {
            return this.getPropertyValue("radius");
        },
        /**
         * Outer radius of the axis.
         *
         * Can be absolute (px) or relative ([[Percent]]).
         *
         * @param value  Outer radius
         */
        set: function (value) {
            this.setPercentProperty("radius", value, false, false, 10, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRendererRadial.prototype, "pixelRadius", {
        /**
         * Outer radius in pixels.
         *
         * @return Outer radius (px)
         */
        get: function () {
            return $utils.relativeRadiusToValue(this.radius, this.pixelRadiusReal) || 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRendererRadial.prototype, "innerRadius", {
        /**
         * @return Inner radius
         */
        get: function () {
            var chart = this.chart;
            var innerRadius = this.getPropertyValue("innerRadius");
            if (chart) {
                if (!$type.hasValue(innerRadius)) {
                    innerRadius = chart.innerRadius;
                    if (innerRadius instanceof Percent && chart) {
                        innerRadius = percent(innerRadius.value * chart.innerRadiusModifyer * 100);
                    }
                }
                else {
                    if (innerRadius instanceof Percent && chart) {
                        var mr = chart.mr;
                        var value = innerRadius.value;
                        value = Math.max(mr * value, mr - Math.min(chart.plotContainer.innerHeight, chart.plotContainer.innerWidth)) / mr;
                        innerRadius = percent(value * 100);
                    }
                }
            }
            return innerRadius;
        },
        /**
         * Inner radius of the axis.
         *
         * Can be absolute (px) or relative ([[Percent]]).
         *
         * @param value  Outer radius
         */
        set: function (value) {
            this.setPercentProperty("innerRadius", value, false, false, 10, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRendererRadial.prototype, "pixelInnerRadius", {
        /**
         * Inner radius in pixels.
         *
         * @return Inner radius (px)
         */
        get: function () {
            return $utils.relativeRadiusToValue(this.innerRadius, this.pixelRadiusReal) || 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Converts relative position on axis to point coordinates.
     *
     * @param position  Position (0-1)
     * @param position2  Position (0-1) Position on the second axis
     * @return Point
     */
    AxisRendererRadial.prototype.positionToPoint = function (position, position2) {
        var radius = $math.fitToRange(this.positionToCoordinate(position), 0, Infinity);
        return { x: radius * $math.cos(this.axisAngle), y: radius * $math.sin(this.axisAngle) };
    };
    /**
     * Updates and positions the axis line element.
     *
     * @ignore Exclude from docs
     */
    AxisRendererRadial.prototype.updateAxisLine = function () {
        this.line.path = $path.moveTo({ x: this.pixelInnerRadius * $math.cos(this.axisAngle), y: this.pixelInnerRadius * $math.sin(this.axisAngle) }) + $path.lineTo({ x: this.pixelRadius * $math.cos(this.axisAngle), y: this.pixelRadius * $math.sin(this.axisAngle) });
        var title = this.axis.title;
        title.valign = "none";
        title.horizontalCenter = "middle";
        title.verticalCenter = "bottom";
        title.y = -this.axisLength / 2;
        var rotation = 90;
        if (this.opposite) {
            if (!this.inside) {
                rotation = -90;
            }
        }
        else {
            if (this.inside) {
                rotation = -90;
            }
        }
        title.rotation = rotation;
    };
    /**
     * Updates and positions a grid element.
     *
     * @ignore Exclude from docs
     * @param grid         Grid element
     * @param position     Starting position
     * @param endPosition  End position
     */
    AxisRendererRadial.prototype.updateGridElement = function (grid, position, endPosition) {
        position = position + (endPosition - position) * grid.location;
        var point = this.positionToPoint(position);
        var path;
        var radius = $math.getDistance(point);
        var startAngle = this.startAngle;
        var endAngle = this.endAngle;
        var chart = this.chart;
        if ($type.isNumber(radius) && grid.element && chart) {
            var xAxis = chart.xAxes.getIndex(0);
            var count = 0;
            var series = chart.series.getIndex(0);
            if (series) {
                count = series.dataItems.length;
            }
            // polygons are only possible if x axis is present
            // @todo: review this
            if (this.gridType == "polygons" && count > 0 && series && xAxis && xAxis instanceof CategoryAxis) {
                var gridLocation = xAxis.renderer.grid.template.location;
                var angle = xAxis.getAngle(series.dataItems.getIndex(0), "categoryX", gridLocation);
                path = $path.moveTo({ x: radius * $math.cos(angle), y: radius * $math.sin(angle) });
                for (var i = 1; i < count; i++) {
                    angle = xAxis.getAngle(series.dataItems.getIndex(i), "categoryX", gridLocation);
                    path += $path.lineTo({ x: radius * $math.cos(angle), y: radius * $math.sin(angle) });
                }
                angle = xAxis.getAngle(series.dataItems.getIndex(count - 1), "categoryX", xAxis.renderer.cellEndLocation);
                path += $path.lineTo({ x: radius * $math.cos(angle), y: radius * $math.sin(angle) });
            }
            else {
                path = $path.moveTo({ x: radius * $math.cos(startAngle), y: radius * $math.sin(startAngle) }) + $path.arcTo(startAngle, endAngle - startAngle, radius, radius);
            }
            grid.path = path;
        }
        this.toggleVisibility(grid, position, 0, 1);
    };
    /**
     * Updates and positions a label element.
     *
     * @ignore Exclude from docs
     * @param label        Label element
     * @param position     Starting position
     * @param endPosition  Ending position
     */
    AxisRendererRadial.prototype.updateLabelElement = function (label, position, endPosition, location) {
        if (!$type.hasValue(location)) {
            location = label.location;
        }
        position = position + (endPosition - position) * location;
        var point = this.positionToPoint(position);
        this.positionItem(label, point);
        this.toggleVisibility(label, position, this.minLabelPosition, this.maxLabelPosition);
    };
    /**
     * Updates and positions the base grid element.
     *
     * @ignore Exclude from docs
     */
    AxisRendererRadial.prototype.updateBaseGridElement = function () {
        // @todo? zero grid for radar chart, is it needed?
    };
    /**
     * Checks if point is within bounds of a container.
     *
     * @ignore Exclude from docs
     * @param point Point coordinates
     * @return Fits?
     */
    AxisRendererRadial.prototype.fitsToBounds = function (point) {
        return true;
    };
    Object.defineProperty(AxisRendererRadial.prototype, "startAngle", {
        /**
         * @return Start angle
         */
        get: function () {
            return this.getPropertyValue("startAngle");
        },
        /**
         * Start angle of the axis in degrees. (0-360)
         *
         * @param value  Start angle
         */
        set: function (value) {
            // do not normalize angle here!
            if (this.setPropertyValue("startAngle", value)) {
                this.invalidateAxisItems();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRendererRadial.prototype, "endAngle", {
        /**
         * @return End angle
         */
        get: function () {
            return this.getPropertyValue("endAngle");
        },
        /**
         * End angle of the axis in degrees. (0-360)
         *
         * @param value  End angle
         */
        set: function (value) {
            // do not normalize angel here!
            if (this.setPropertyValue("endAngle", value)) {
                this.invalidateAxisItems();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRendererRadial.prototype, "axisAngle", {
        /**
         * @return Axis angle
         */
        get: function () {
            return this.getPropertyValue("axisAngle");
            //return $math.fitToRange(this.getPropertyValue("axisAngle"), this.startAngle, this.endAngle); // no good, as less flexible
        },
        /**
         * Angle of the radial axis in degrees. (0-360)
         *
         * @param value  Axis angle
         */
        set: function (value) {
            this.setPropertyValue("axisAngle", $math.normalizeAngle(value));
            this.invalidateAxisItems();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRendererRadial.prototype, "gridType", {
        /**
         * Grid type
         */
        get: function () {
            var axis = this.chart.xAxes.getIndex(0);
            if (axis instanceof CategoryAxis) {
                return this.getPropertyValue("gridType");
            }
            else {
                return "circles";
            }
        },
        // polygons grid type is only possible under these conditions: xAxis is available and it is CategoryAxis, also at least one series should be added to a chart
        /**
         * Grid type for radial axis.
         *
         * A grid on radia axis can either be perfect circles ("circles"), or
         * straight lines ("polygons").
         *
         * @default "circles"
         * @param value  Grid type
         */
        set: function (value) {
            this.setPropertyValue("gridType", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * [getPositionRangePath description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param startPosition  Starting position
     * @param endPosition    End position
     * @return SVG path
     */
    AxisRendererRadial.prototype.getPositionRangePath = function (startPosition, endPosition) {
        var pixelInnerRadius = this.pixelInnerRadius;
        var pixelRadius = this.axisLength + pixelInnerRadius;
        var innerRadius = $math.fitToRange(this.positionToCoordinate(startPosition), pixelInnerRadius, pixelRadius);
        var radius = $math.fitToRange(this.positionToCoordinate(endPosition), pixelInnerRadius, pixelRadius);
        //let angleCount: number = this.angleCount;
        var startAngle = this.startAngle;
        var endAngle = this.endAngle;
        var arc = endAngle - startAngle;
        var path;
        var chart = this.chart;
        var xAxis = chart.xAxes.getIndex(0);
        var series = chart.series.getIndex(0);
        var count = 0;
        if (series) {
            count = series.dataItems.length;
        }
        // polygons are only possible if x axis is present
        // @todo: review this
        if (this.gridType == "polygons" && count > 0 && series && xAxis && xAxis instanceof CategoryAxis) {
            var gridLocation = xAxis.renderer.grid.template.location;
            var angle = xAxis.getAngle(series.dataItems.getIndex(0), "categoryX", gridLocation);
            path = $path.moveTo({ x: radius * $math.cos(angle), y: radius * $math.sin(angle) });
            for (var i = 1; i < count; i++) {
                angle = xAxis.getAngle(series.dataItems.getIndex(i), "categoryX", gridLocation);
                path += $path.lineTo({ x: radius * $math.cos(angle), y: radius * $math.sin(angle) });
            }
            angle = xAxis.getAngle(series.dataItems.getIndex(count - 1), "categoryX", xAxis.renderer.cellEndLocation);
            path += $path.lineTo({ x: radius * $math.cos(angle), y: radius * $math.sin(angle) });
            path += $path.moveTo({ x: innerRadius * $math.cos(angle), y: innerRadius * $math.sin(angle) });
            for (var i = count - 1; i >= 0; i--) {
                angle = xAxis.getAngle(series.dataItems.getIndex(i), "categoryX", gridLocation);
                path += $path.lineTo({ x: innerRadius * $math.cos(angle), y: innerRadius * $math.sin(angle) });
            }
        }
        else {
            path = $path.arc(startAngle, arc, radius, innerRadius);
        }
        return path;
    };
    /**
     * Updates and positions an axis break element.
     *
     * @ignore Exclude from docs
     * @param axisBreak Break element
     */
    AxisRendererRadial.prototype.updateBreakElement = function (axisBreak) {
        // @todo: someday we might need axis break when gridType is polygons
        var startLine = axisBreak.startLine;
        var endLine = axisBreak.endLine;
        var fillShape = axisBreak.fillShape;
        var startPoint = axisBreak.startPoint;
        var endPoint = axisBreak.endPoint;
        startLine.radius = Math.abs(startPoint.y);
        endLine.radius = Math.abs(endPoint.y);
        fillShape.radius = Math.abs(endPoint.y);
        fillShape.innerRadius = Math.abs(startPoint.y);
    };
    /**
     * Creates visual elements for and axis break.
     *
     * @ignore Exclude from docs
     * @param axisBreak Axis break
     */
    AxisRendererRadial.prototype.createBreakSprites = function (axisBreak) {
        axisBreak.startLine = new WavedCircle();
        axisBreak.endLine = new WavedCircle();
        axisBreak.fillShape = new WavedCircle();
    };
    /**
     * Updates some of the Axis tooltip's visual properties, related to
     * rendering of the Axis.
     *
     * @todo Description (review)
     * @ignore Exclude from docs
     */
    AxisRendererRadial.prototype.updateTooltip = function () {
        var axis = this.axis;
        if (axis) {
            var bigNum = 4000;
            var bbx = -4000;
            var bby = -4000;
            var bbw = bigNum * 2;
            var bbh = bigNum * 2;
            var axisAngle = this.axisAngle;
            if (axisAngle < 0) {
                axisAngle += 360;
            }
            var tooltipOrientation = "vertical";
            if ((axisAngle > 45 && axisAngle < 135) || (axisAngle > 225 && axisAngle < 315)) {
                tooltipOrientation = "horizontal";
            }
            this.axis.updateTooltip(tooltipOrientation, { x: bbx, y: bby, width: bbw, height: bbh });
        }
    };
    /**
     * Updates and positions a tick element.
     *
     * @ignore Exclude from docs
     * @param tick      Tick element
     * @param position  Position
     */
    AxisRendererRadial.prototype.updateTickElement = function (tick, position, endPosition) {
        position = position + (endPosition - position) * tick.location;
        var point = this.positionToPoint(position);
        if (tick.element) {
            var angle = $math.normalizeAngle(this.axisAngle + 90);
            if (angle / 90 != Math.round(angle / 90)) {
                tick.pixelPerfect = false;
            }
            else {
                tick.pixelPerfect = true;
            }
            var tickLength = -tick.length;
            if (tick.inside) {
                tickLength *= -1;
            }
            tick.path = $path.moveTo({ x: 0, y: 0 }) + $path.lineTo({ x: tickLength * $math.cos(angle), y: tickLength * $math.sin(angle) });
        }
        this.positionItem(tick, point);
        this.toggleVisibility(tick, position, 0, 1);
    };
    /**
     * Updates and positions axis bullet.
     *
     * @ignore Exclude from docs
     * @param bullet       AxisBullet element
     * @param position     Starting position
     * @param endPosition  End position
     */
    AxisRendererRadial.prototype.updateBullet = function (bullet, position, endPosition) {
        var location = 0.5;
        if (bullet instanceof AxisBullet) {
            location = bullet.location;
        }
        position = position + (endPosition - position) * location;
        var point = this.positionToPoint(position);
        this.positionItem(bullet, point);
        this.toggleVisibility(bullet, position, 0, 1);
    };
    /**
     * Converts a position on the axis to a coordinate in pixels.
     *
     * @ignore Exclude from docs
     * @param position  Position (0-1)
     * @return Coordinate (px)
     */
    AxisRendererRadial.prototype.positionToCoordinate = function (position) {
        var coordinate;
        var axis = this.axis;
        var axisFullLength = axis.axisFullLength;
        var innerRadius = this.pixelInnerRadius;
        if (axis.renderer.inversed) {
            coordinate = (axis.end - position) * axisFullLength + innerRadius;
        }
        else {
            coordinate = (position - axis.start) * axisFullLength + innerRadius;
        }
        return $math.round(coordinate, 1);
    };
    /**
     * Converts a point at specific coordinates to a relative position (0-1)
     * on the axis.
     *
     * @param point  Point
     * @return Position (0-1)
     */
    AxisRendererRadial.prototype.pointToPosition = function (point) {
        var coordinate = ($math.getDistance(point) - this.pixelInnerRadius);
        return this.coordinateToPosition(coordinate);
    };
    Object.defineProperty(AxisRendererRadial.prototype, "chart", {
        /**
         * @ignore Exclude from docs
         * @return Chart
         */
        get: function () {
            return this._chart.get();
        },
        /**
         * A chart, associated with the Axis.
         *
         * @ignore Exclude from docs
         * @param value  Chart
         */
        set: function (value) {
            this._chart.set(value, null);
        },
        enumerable: true,
        configurable: true
    });
    return AxisRendererRadial;
}(AxisRendererY));
export { AxisRendererRadial };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["AxisRendererRadial"] = AxisRendererRadial;
//# sourceMappingURL=AxisRendererRadial.js.map