/**
 * Module, defining Axis Renderer for curved axes.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { AxisRendererY } from "../../charts/axes/AxisRendererY";
import { WavedCircle } from "../../core/elements/WavedCircle";
import { MutableValueDisposer } from "../../core/utils/Disposer";
import { registry } from "../../core/Registry";
import * as $math from "../../core/utils/Math";
import * as $path from "../../core/rendering/Path";
import * as $type from "../../core/utils/Type";
import { AxisBullet } from "../../charts/axes/AxisBullet";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A renderer for radial axis.
 */
var AxisRendererCurveY = /** @class */ (function (_super) {
    __extends(AxisRendererCurveY, _super);
    /**
     * Constructor.
     *
     * @param axis Related axis
     */
    function AxisRendererCurveY() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * A related chart.
         */
        _this._chart = new MutableValueDisposer();
        _this.className = "AxisRendererCurveY";
        _this.isMeasured = false;
        _this.minGridDistance = 30;
        _this.isMeasured = false;
        _this.layout = "none";
        _this.radius = 40;
        _this.innerRadius = -40;
        _this.line.strokeOpacity = 0;
        _this.labels.template.horizontalCenter = "right";
        _this._disposers.push(_this._chart);
        _this.applyTheme();
        return _this;
    }
    /**
     * Validates Axis renderer.
     *
     * @ignore Exclude from docs
     */
    AxisRendererCurveY.prototype.validate = function () {
        // so that radius would be updated
        if (this.chart && this.chart.invalid) {
            this.chart.validate();
        }
        _super.prototype.validate.call(this);
    };
    Object.defineProperty(AxisRendererCurveY.prototype, "axisLength", {
        /**
         * Actual length of the Axis, in pixels.
         *
         * @return Length (px)
         */
        get: function () {
            return Math.abs(this.radius - this.innerRadius);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRendererCurveY.prototype, "radius", {
        /**
         * @return Outer radius
         */
        get: function () {
            return this.getPropertyValue("radius");
        },
        /**
         * Outer radius of the vertical (Y) axis in pixels.
         *
         * Indicate distance from the charts X axis control curve.
         *
         * Negative number means inside/below the X axis.
         *
         * @see {@link https://www.amcharts.com/docs/v4/chart-types/timeline/#Axis_radii} for more info
         * @param value  Outer radius
         */
        set: function (value) {
            this.setPropertyValue("radius", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRendererCurveY.prototype, "innerRadius", {
        /**
         * @return Inner radius
         */
        get: function () {
            return this.getPropertyValue("innerRadius");
        },
        /**
         * Inner radius of the vertical (Y) axis in pixels.
         *
         * Indicate distance from the charts X axis control curve.
         *
         * Negative number means inside/below the X axis.
         *
         * @see {@link https://www.amcharts.com/docs/v4/chart-types/timeline/#Axis_radii} for more info
         * @param value  Outer radius
         */
        set: function (value) {
            this.setPropertyValue("innerRadius", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRendererCurveY.prototype, "chart", {
        /**
         * @ignore Exclude from docs
         * @return Chart
         */
        get: function () {
            return this._chart.get();
        },
        /**
         * Chart, associated with the Axis.
         *
         * @ignore Exclude from docs
         * @param value Chart
         */
        set: function (chart) {
            this._chart.set(chart, null);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Converts relative position on axis to point coordinates.
     *
     * @param position  Position (0-1)
     * @return Point
     */
    AxisRendererCurveY.prototype.positionToPoint = function (position) {
        return { x: 0, y: this.positionToCoordinate(position) };
    };
    /**
     * Updates and positions the axis line element.
     *
     * @ignore Exclude from docs
     */
    AxisRendererCurveY.prototype.updateAxisLine = function () {
        var axisRendererX = this.axisRendererX;
        if (axisRendererX) {
            var axis = axisRendererX.axis;
            var point = axisRendererX.positionToPoint(axis.start + (axis.end - axis.start) * this.axisLocation);
            var angle = point.angle;
            var radius = -this.radius;
            var innerRadius = -this.innerRadius;
            this.line.path = $path.moveTo({ x: innerRadius * $math.cos(angle), y: innerRadius * $math.sin(angle) }) + $path.lineTo({ x: radius * $math.cos(angle), y: radius * $math.sin(angle) });
            this.line.moveTo(point);
            var title = this.axis.title;
            title.moveTo({ x: point.x + radius / 2 * $math.cos(angle), y: point.y + radius / 2 * $math.sin(angle) });
            title.rotation = angle - 180;
        }
    };
    /**
     * Updates and positions a grid element.
     *
     * @ignore Exclude from docs
     * @param grid         Grid element
     * @param position     Starting position
     * @param endPosition  End position
     */
    AxisRendererCurveY.prototype.updateGridElement = function (grid, position, endPosition) {
        var axisRendererX = this.axisRendererX;
        if (axisRendererX) {
            position = position + (endPosition - position) * grid.location;
            if (position >= 0 && position <= 1) {
                grid.path = this.getGridPath(position);
            }
            this.positionItem(grid, { x: 0, y: 0 });
            this.toggleVisibility(grid, position, 0, 1);
        }
    };
    /**
     * [getGridPath description]
     *
     * @ignore
     * @todo description
     * @param   position  Position
     * @return            SVG path
     */
    AxisRendererCurveY.prototype.getGridPath = function (position) {
        var axisRendererX = this.axisRendererX;
        var path = "";
        if (axisRendererX && $type.isNumber(position)) {
            var radius = $math.round(this.positionToPoint(position).y, 1);
            var point = axisRendererX.positionToPoint(axisRendererX.axis.start);
            var angle = point.angle;
            var count = Math.ceil(axisRendererX.axisLength / axisRendererX.precisionStep);
            var start = axisRendererX.axis.start;
            var end = axisRendererX.axis.end;
            for (var i = 0; i <= count; i++) {
                var pos = start + i / count * (end - start);
                point = axisRendererX.positionToPoint(pos);
                angle = point.angle;
                var x = point.x + radius * $math.cos(angle);
                var y = point.y + radius * $math.sin(angle);
                path += $path.lineTo({ x: x, y: y });
            }
            path = path.replace("L", "M");
        }
        return path;
    };
    /**
     * Updates and positions a label element.
     *
     * @ignore Exclude from docs
     * @param label        Label element
     * @param position     Starting position
     * @param endPosition  Ending position
     */
    AxisRendererCurveY.prototype.updateLabelElement = function (label, position, endPosition, location) {
        if (!$type.hasValue(location)) {
            location = label.location;
        }
        position = position + (endPosition - position) * location;
        var radius = this.positionToPoint(position).y;
        var axisRendererX = this.axisRendererX;
        if (axisRendererX) {
            var axis = axisRendererX.axis;
            var point = axisRendererX.positionToPoint(axis.start + (axis.end - axis.start) * this.axisLocation);
            var angle = point.angle;
            point.x += radius * $math.cos(angle);
            point.y += radius * $math.sin(angle);
            this.positionItem(label, point);
            this.toggleVisibility(label, position, this.minLabelPosition, this.maxLabelPosition);
        }
    };
    /**
     * Updates and positions a tick element.
     *
     * @ignore Exclude from docs
     * @param tick      Tick element
     * @param position  Position
     */
    AxisRendererCurveY.prototype.updateTickElement = function (tick, position) {
        if (tick.element) {
            var axisRendererX = this.axisRendererX;
            if (axisRendererX) {
                var point = axisRendererX.positionToPoint(this.axisLocation);
                var angle = point.angle;
                var radius = this.positionToPoint(position).y;
                point.x += radius * $math.cos(angle);
                point.y += radius * $math.sin(angle);
                angle = $math.normalizeAngle(angle + 90);
                if (angle / 90 != Math.round(angle / 90)) {
                    tick.pixelPerfect = false;
                }
                else {
                    tick.pixelPerfect = true;
                }
                var tickLength = tick.length;
                if (tick.inside) {
                    tickLength *= -1;
                }
                tick.path = $path.moveTo({ x: 0, y: 0 }) + $path.lineTo({ x: tickLength * $math.cos(angle), y: tickLength * $math.sin(angle) });
                this.positionItem(tick, point);
                this.toggleVisibility(tick, position, 0, 1);
            }
        }
    };
    /**
     * Updates and positions axis bullet.
     *
     * @ignore Exclude from docs
     * @param bullet       AxisBullet element
     * @param position     Starting position
     * @param endPosition  End position
     */
    AxisRendererCurveY.prototype.updateBullet = function (bullet, position, endPosition) {
        var location = 0.5;
        if (bullet instanceof AxisBullet) {
            location = bullet.location;
        }
        position = position + (endPosition - position) * location;
        var axisRendererX = this.axisRendererX;
        if (axisRendererX) {
            var point = axisRendererX.positionToPoint(this.axisLocation);
            var angle = point.angle;
            var radius = this.positionToPoint(position).y;
            point.x += radius * $math.cos(angle);
            point.y += radius * $math.sin(angle);
            angle = $math.normalizeAngle(angle + 90);
            this.positionItem(bullet, point);
            this.toggleVisibility(bullet, position, 0, 1);
        }
    };
    /**
     * Updates and positions the base grid element.
     *
     * @ignore Exclude from docs
     */
    AxisRendererCurveY.prototype.updateBaseGridElement = function () {
        // @todo? zero grid for curve chart, is it needed?
    };
    /**
     * Checks if point is within bounds of a container.
     *
     * @ignore Exclude from docs
     * @param point Point coordinates
     * @return Fits?
     */
    AxisRendererCurveY.prototype.fitsToBounds = function (point) {
        return true;
    };
    /**
     * [getPositionRangePath description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param startPosition  Starting position
     * @param endPosition    End position
     * @return SVG path
     */
    AxisRendererCurveY.prototype.getPositionRangePath = function (startPosition, endPosition) {
        var path = "";
        var axisRendererX = this.axisRendererX;
        if (axisRendererX) {
            var startX = axisRendererX.axis.start;
            var endX = axisRendererX.axis.end;
            var startY = this.axis.start;
            var endY = this.axis.end;
            if ((startPosition <= startY && endPosition <= startY) || (startPosition >= endY && endPosition >= endY)) {
                return path;
            }
            startPosition = $math.fitToRange(startPosition, startY, endY);
            endPosition = $math.fitToRange(endPosition, startY, endY);
            var startRadius = $math.round(this.positionToPoint(startPosition).y, 1);
            var endRadius = $math.round(this.positionToPoint(endPosition).y, 1);
            if ($type.isNaN(startRadius) || $type.isNaN(endRadius)) {
                return "";
            }
            var point = axisRendererX.positionToPoint(startX);
            var angle = point.angle;
            path = $path.moveTo(point);
            var count = Math.ceil(axisRendererX.axisLength / axisRendererX.precisionStep);
            for (var i = 0; i <= count; i++) {
                var pos = startX + i / count * (endX - startX);
                point = axisRendererX.positionToPoint(pos);
                angle = point.angle;
                var x = point.x + startRadius * $math.cos(angle);
                var y = point.y + startRadius * $math.sin(angle);
                path += $path.lineTo({ x: x, y: y });
            }
            for (var i = count; i >= 0; i--) {
                var pos = startX + i / count * (endX - startX);
                point = axisRendererX.positionToPoint(pos);
                angle = point.angle;
                var x = point.x + endRadius * $math.cos(angle);
                var y = point.y + endRadius * $math.sin(angle);
                path += $path.lineTo({ x: x, y: y });
            }
            path += $path.closePath();
        }
        return path;
    };
    /**
     * Updates and positions an axis break element.
     *
     * @ignore Exclude from docs
     * @param axisBreak Break element
     */
    AxisRendererCurveY.prototype.updateBreakElement = function (axisBreak) {
        var axisRendererX = this.axisRendererX;
        if (axisRendererX) {
            axisBreak.fillShape.path = this.getPositionRangePath(axisBreak.startPosition, axisBreak.endPosition);
            this.toggleVisibility(axisBreak.startLine, axisBreak.startPosition, 0, 1);
            this.toggleVisibility(axisBreak.endLine, axisBreak.endPosition, 0, 1);
        }
    };
    /**
     * Creates visual elements for and axis break.
     *
     * @ignore Exclude from docs
     * @param axisBreak Axis break
     */
    AxisRendererCurveY.prototype.createBreakSprites = function (axisBreak) {
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
    AxisRendererCurveY.prototype.updateTooltip = function () {
        var axis = this.axis;
        if (axis) {
            /*
            let bigNum: number = 4000;
            let bbx: number = -4000;
            let bby: number = -4000;
            let bbw: number = bigNum * 2;
            let bbh: number = bigNum * 2;

            this.axis.updateTooltip(tooltipOrientation, { x: bbx, y: bby, width: bbw, height: bbh }); */
        }
    };
    /**
     * Converts a position on the axis to a coordinate in pixels.
     *
     * @param  position  Position (0-1)
     * @return           Coordinate (px)
     */
    AxisRendererCurveY.prototype.positionToCoordinate = function (position) {
        var coordinate;
        var axis = this.axis;
        var axisFullLength = axis.axisFullLength;
        if (axis.renderer.inversed) {
            coordinate = (axis.end - position) * axisFullLength;
        }
        else {
            coordinate = (position - axis.start) * axisFullLength;
        }
        return $math.round(-this.innerRadius - coordinate, 4);
    };
    Object.defineProperty(AxisRendererCurveY.prototype, "axisLocation", {
        /**
         * @return Axis location
         */
        get: function () {
            return this.getPropertyValue("axisLocation");
        },
        // TODO: make this universal?
        /**
         * Relative location of the Y axis along the length of the X axis.
         *
         * Values range from 0 (default) which means start of the X axis, to 1 meaning
         * end of the X axis.
         *
         * @default 0
         * @param  value  Axis location
         */
        set: function (value) {
            this.setPropertyValue("axisLocation", value);
            this.invalidateAxisItems();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Called when rendered is attached to an Axis, as well as a property of
     * Axis that might affect the appearance is updated.
     *
     * E.g. `axis.opposite`, `axis.inside`, etc.
     *
     * This method is called **before** draw, so that any related setting
     * changed in this method can be changed.
     *
     * @todo Description (review)
     * @ignore Exclude from docs
     */
    AxisRendererCurveY.prototype.processRenderer = function () {
        _super.prototype.processRenderer.call(this);
        // can not do this in init, as axis is set later
        var axis = this.axis;
        if (axis) {
            var title = axis.title;
            if (title) {
                title.isMeasured = false;
                title.horizontalCenter = "middle";
                title.verticalCenter = "bottom";
            }
        }
    };
    /**
     * Converts a coordinate in pixels to a relative position. (0-1)
     *
     * @param coordinate  Coordinate (px)
     * @param coordinate2  Coordinate (px) Some more complicated axes need two coordinates
     * @return Position (0-1)
     */
    AxisRendererCurveY.prototype.coordinateToPosition = function (coordinate, coordinate2) {
        var axisRendererX = this.axisRendererX;
        var distance = coordinate;
        if (axisRendererX) {
            var closestPoint = axisRendererX.polyspline.allPoints[axisRendererX.polyspline.getClosestPointIndex({ x: coordinate2, y: coordinate })];
            var angle = closestPoint.angle - 90;
            distance = $math.getDistance({ x: closestPoint.x + this.innerRadius * $math.cos(angle), y: closestPoint.y + this.innerRadius * $math.sin(angle) }, { x: coordinate2, y: coordinate });
        }
        return _super.prototype.coordinateToPosition.call(this, distance);
    };
    /**
     * @ignore
     */
    AxisRendererCurveY.prototype.toAxisPosition = function (value) {
        return value;
    };
    return AxisRendererCurveY;
}(AxisRendererY));
export { AxisRendererCurveY };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["AxisRendererCurveY"] = AxisRendererCurveY;
//# sourceMappingURL=AxisRendererCurveY.js.map