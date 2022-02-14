/**
 * Module, defining Axis Renderer for circular axes.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { AxisRenderer } from "./AxisRenderer";
import { AxisFillCircular } from "./AxisFillCircular";
import { GridCircular } from "./GridCircular";
import { AxisLabelCircular } from "./AxisLabelCircular";
import { registry } from "../../core/Registry";
import { percent, Percent } from "../../core/utils/Percent";
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
 * A renderer for circular axis.
 */
var AxisRendererCircular = /** @class */ (function (_super) {
    __extends(AxisRendererCircular, _super);
    /**
     * Constructor.
     *
     * @param axis Related axis
     */
    function AxisRendererCircular() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * @ignore
         */
        _this.pixelRadiusReal = 0;
        // axis.layout = "none"; // does not trigger redraw when size changes
        _this.layout = "none";
        _this.className = "AxisRendererCircular";
        _this.isMeasured = false;
        _this.startAngle = -90;
        _this.endAngle = 270;
        _this.useChartAngles = true;
        _this.radius = percent(100);
        _this.isMeasured = false;
        _this.grid.template.location = 0;
        _this.labels.template.location = 0;
        _this.labels.template.radius = 15;
        _this.ticks.template.location = 0;
        _this.ticks.template.pixelPerfect = false;
        _this.tooltipLocation = 0;
        _this.line.strokeOpacity = 0;
        _this.applyTheme();
        return _this;
    }
    /**
    * @ignore
    */
    AxisRendererCircular.prototype.setAxis = function (axis) {
        var _this = this;
        _super.prototype.setAxis.call(this, axis);
        axis.isMeasured = false;
        // modify x and y so that tooltip would always be on circle
        var tooltip = axis.tooltip;
        tooltip.adapter.add("dx", function (x, target) {
            var point = $utils.svgPointToSprite({ x: target.pixelX, y: target.pixelY }, _this);
            return _this.pixelRadius * Math.cos(Math.atan2(point.y, point.x)) - point.x;
        });
        tooltip.adapter.add("dy", function (y, target) {
            var point = $utils.svgPointToSprite({ x: target.pixelX, y: target.pixelY }, _this);
            return _this.pixelRadius * Math.sin(Math.atan2(point.y, point.x)) - point.y;
        });
    };
    /**
     * Validates Axis renderer.
     *
     * @ignore Exclude from docs
     */
    AxisRendererCircular.prototype.validate = function () {
        // so that radius would be updated
        if (this.chart && this.chart.invalid) {
            this.chart.validate();
        }
        _super.prototype.validate.call(this);
    };
    Object.defineProperty(AxisRendererCircular.prototype, "axisLength", {
        /**
         * Returns actual length of the Axis, in pixels.
         *
         * @return Length (px)
         */
        get: function () {
            return 2 * Math.PI * this.pixelRadius;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRendererCircular.prototype, "radius", {
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
            if (this.setPercentProperty("radius", value, false, false, 10, false)) {
                if (this.axis) {
                    this.axis.invalidate();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRendererCircular.prototype, "pixelRadius", {
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
    Object.defineProperty(AxisRendererCircular.prototype, "innerRadius", {
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
                return innerRadius;
            }
        },
        /**
         * Inner radius of the axis.
         *
         * Can be absolute (px) or relative ([[Percent]]).
         *
         * @param value  Inner radius
         */
        set: function (value) {
            if (this.setPercentProperty("innerRadius", value, false, false, 10, false)) {
                if (this.axis) {
                    this.axis.invalidate();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRendererCircular.prototype, "useChartAngles", {
        /**
         * @return Use chart angles
         */
        get: function () {
            return this.getPropertyValue("useChartAngles");
        },
        /**
         * Specifies if axis should use its own `startAngle` and `endAngle` or
         * inherit them from relative properties from chart.
         *
         * @default false
         * @param value  Use chart's angles
         */
        set: function (value) {
            this.setPropertyValue("useChartAngles", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRendererCircular.prototype, "pixelInnerRadius", {
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
    AxisRendererCircular.prototype.positionToPoint = function (position, position2) {
        if (!$type.isNumber(position2)) {
            position2 = 1;
        }
        var coordinate = this.positionToCoordinate(position);
        var angle = this.startAngle + (this.endAngle - this.startAngle) * coordinate / this.axisLength;
        var radius = this.pixelRadius;
        var innerRadius = this.pixelInnerRadius;
        if (this.axisRendererY) {
            var realRadius = $math.fitToRange(this.axisRendererY.positionToCoordinate(position2), 0, Infinity);
            if (realRadius == 0) {
                realRadius = 0.000001;
            }
            var point = { x: realRadius * $math.cos(angle), y: realRadius * $math.sin(angle) };
            return point;
        }
        return { x: $math.cos(angle) * innerRadius + (radius - innerRadius) * $math.cos(angle) * position2, y: $math.sin(angle) * innerRadius + (radius - innerRadius) * $math.sin(angle) * position2 };
    };
    /**
     * Converts relative position (0-1) on axis to angle in degrees (0-360).
     *
     * @param position  Position (0-1)
     * @return Angle (0-360)
     */
    AxisRendererCircular.prototype.positionToAngle = function (position) {
        var axis = this.axis;
        var arc = (this.endAngle - this.startAngle) / (axis.end - axis.start);
        var angle;
        if (axis.renderer.inversed) {
            angle = this.startAngle + (axis.end - position) * arc;
        }
        else {
            angle = this.startAngle + (position - axis.start) * arc;
        }
        return $math.round(angle, 3);
    };
    /**
     * Converts angle on axis to relative position(0-1).
     *
     * @param angle Angle in degrees
     * @return Position (0-1)
     */
    AxisRendererCircular.prototype.angleToPosition = function (angle) {
        var axis = this.axis;
        var arc = (this.endAngle - this.startAngle) / (axis.end - axis.start);
        var position;
        if (axis.renderer.inversed) {
            position = axis.end - (angle - this.startAngle) / arc;
        }
        else {
            position = (angle - this.startAngle) / arc + axis.start;
        }
        return $math.round(position, 5);
    };
    /**
     * Updates and positions the axis line element.
     *
     * @ignore Exclude from docs
     */
    AxisRendererCircular.prototype.updateAxisLine = function () {
        var radius = this.pixelRadius;
        var startAngle = this.startAngle;
        var endAngle = this.endAngle;
        var arc = $math.min(360, endAngle - startAngle);
        this.line.path = $path.moveTo({ x: radius * $math.cos(startAngle), y: radius * $math.sin(startAngle) }) + $path.arcTo(startAngle, arc, radius, radius);
    };
    /**
     * Updates and positions a grid element.
     *
     * @ignore Exclude from docs
     * @param grid         Grid element
     * @param position     Starting position
     * @param endPosition  End position
     */
    AxisRendererCircular.prototype.updateGridElement = function (grid, position, endPosition) {
        position = position + (endPosition - position) * grid.location;
        var point = this.positionToPoint(position);
        if ($type.isNumber(point.x) && $type.isNumber(point.y) && grid.element) {
            var angle = $math.DEGREES * Math.atan2(point.y, point.x);
            var radius = $utils.relativeRadiusToValue($type.hasValue(grid.radius) ? grid.radius : percent(100), this.pixelRadius);
            var gridInnerRadius = $utils.relativeRadiusToValue(grid.innerRadius, this.pixelRadius);
            grid.zIndex = 0;
            var innerRadius = $utils.relativeRadiusToValue($type.isNumber(gridInnerRadius) ? gridInnerRadius : this.innerRadius, this.pixelRadiusReal, true);
            if (!$type.isNumber(innerRadius)) {
                innerRadius = 0;
            }
            grid.path = $path.moveTo({ x: innerRadius * $math.cos(angle), y: innerRadius * $math.sin(angle) }) + $path.lineTo({ x: radius * $math.cos(angle), y: radius * $math.sin(angle) });
        }
        this.toggleVisibility(grid, position, 0, 1);
    };
    /**
     * Updates and positions a tick element.
     *
     * @ignore Exclude from docs
     * @param tick         Tick element
     * @param position     Starting position
     * @param endPosition  End position
     */
    AxisRendererCircular.prototype.updateTickElement = function (tick, position, endPosition) {
        position = position + (endPosition - position) * tick.location;
        var point = this.positionToPoint(position);
        if (tick.element) {
            var radius = this.pixelRadius;
            var angle = $math.DEGREES * Math.atan2(point.y, point.x);
            var tickLength = tick.length;
            if (tick.inside) {
                tickLength = -tickLength;
            }
            tick.zIndex = 1;
            tick.path = $path.moveTo({ x: radius * $math.cos(angle), y: radius * $math.sin(angle) }) + $path.lineTo({ x: (radius + tickLength) * $math.cos(angle), y: (radius + tickLength) * $math.sin(angle) });
        }
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
    AxisRendererCircular.prototype.updateBullet = function (bullet, position, endPosition) {
        var location = 0.5;
        if (bullet instanceof AxisBullet) {
            location = bullet.location;
        }
        position = position + (endPosition - position) * location;
        var point = this.positionToPoint(position);
        var radius = this.pixelRadius;
        var angle = $math.DEGREES * Math.atan2(point.y, point.x);
        point = { x: radius * $math.cos(angle), y: radius * $math.sin(angle) };
        this.positionItem(bullet, point);
        this.toggleVisibility(bullet, position, 0, 1);
    };
    /**
     * Updates and positions a label element.
     *
     * @ignore Exclude from docs
     * @param label        Label element
     * @param position     Starting position
     * @param endPosition  Ending position
     */
    AxisRendererCircular.prototype.updateLabelElement = function (label, position, endPosition, location) {
        if (!$type.hasValue(location)) {
            location = label.location;
        }
        position = position + (endPosition - position) * location;
        label.fixPosition(this.positionToAngle(position), this.pixelRadius);
        label.zIndex = 2;
        this.toggleVisibility(label, position, this.minLabelPosition, this.maxLabelPosition);
    };
    /**
     * Checks if point is within bounds of a container.
     *
     * @ignore Exclude from docs
     * @param point Point coordinates
     * @return Fits?
     */
    AxisRendererCircular.prototype.fitsToBounds = function (point) {
        return true;
    };
    Object.defineProperty(AxisRendererCircular.prototype, "startAngle", {
        /**
         * @return Start angle
         */
        get: function () {
            return this.getPropertyValue("startAngle");
        },
        /**
         * Start angle of the axis in degrees (0-360).
         *
         * @param value  Start angle
         */
        set: function (value) {
            // do not normalize angel here!
            if (this.setPropertyValue("startAngle", value)) {
                this.invalidateAxisItems();
                if (this.axis) {
                    this.axis.invalidateSeries();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRendererCircular.prototype, "endAngle", {
        /**
         * @return End angle
         */
        get: function () {
            return this.getPropertyValue("endAngle");
        },
        /**
         * End angle of the axis in degrees (0-360).
         *
         * @param value  End angle
         */
        set: function (value) {
            // do not normalize angel here!
            if (this.setPropertyValue("endAngle", value)) {
                this.invalidateAxisItems();
                if (this.axis) {
                    this.axis.invalidateSeries();
                }
            }
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
    AxisRendererCircular.prototype.getPositionRangePath = function (startPosition, endPosition, radius, innerRadius, cornerRadius) {
        var path = "";
        if ($type.isNumber(startPosition) && $type.isNumber(endPosition)) {
            if (!$type.hasValue(radius)) {
                radius = this.radius;
            }
            startPosition = $math.max(startPosition, this.axis.start);
            endPosition = $math.min(endPosition, this.axis.end);
            if (endPosition < startPosition) {
                endPosition = startPosition;
            }
            var pixelRadius = $utils.relativeRadiusToValue(radius, this.pixelRadius);
            var pixelInnerRadius = $utils.relativeRadiusToValue(innerRadius, this.pixelRadius, true);
            var startAngle = this.positionToAngle(startPosition);
            var endAngle = this.positionToAngle(endPosition);
            var arc = endAngle - startAngle;
            path = $path.arc(startAngle, arc, pixelRadius, pixelInnerRadius, pixelRadius, cornerRadius);
        }
        return path;
    };
    /**
     * Returns a new grid element, suitable for this Axis Renderer type.
     *
     * @return Grid element
     */
    AxisRendererCircular.prototype.createGrid = function () {
        return new GridCircular();
    };
    /**
     * Returns a new fill element, suitable for this Axis Renderer type.
     *
     * @return Fill element
     */
    AxisRendererCircular.prototype.createFill = function (axis) {
        return new AxisFillCircular(axis);
    };
    /**
     * Returns a new label element, suitable for this Axis Renderer type.
     *
     * @return Label element
     */
    AxisRendererCircular.prototype.createLabel = function () {
        return new AxisLabelCircular();
    };
    /**
     * Converts a point at specific coordinates to a relative position (0-1)
     * on the axis.
     *
     * @param point  Point
     * @return Position (0-1)
     */
    AxisRendererCircular.prototype.pointToPosition = function (point) {
        var angle = $math.fitAngleToRange($math.getAngle(point), this.startAngle, this.endAngle);
        return this.coordinateToPosition((angle - this.startAngle) / 360 * this.axisLength);
    };
    return AxisRendererCircular;
}(AxisRenderer));
export { AxisRendererCircular };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["AxisRendererCircular"] = AxisRendererCircular;
//# sourceMappingURL=AxisRendererCircular.js.map