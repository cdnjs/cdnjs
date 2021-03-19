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
import { AxisRendererX } from "../../charts/axes/AxisRendererX";
import { Sprite } from "../../core/Sprite";
import { registry } from "../../core/Registry";
import { Polyspline } from "../../core/elements/Polyspline";
import * as $math from "../../core/utils/Math";
import * as $path from "../../core/rendering/Path";
import * as $type from "../../core/utils/Type";
import * as $array from "../../core/utils/Array";
import { AxisBullet } from "../../charts/axes/AxisBullet";
import { wavedLine } from "../../core/rendering/Smoothing";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A renderer for "horizontal" curve axis.
 */
var AxisRendererCurveX = /** @class */ (function (_super) {
    __extends(AxisRendererCurveX, _super);
    /**
     * Constructor.
     */
    function AxisRendererCurveX() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * @ignore
         */
        _this.pixelRadiusReal = 0;
        /**
         * @readonly
         * @ignore
         */
        _this.autoScaleScale = 1;
        // axis.layout = "none"; // does not trigger redraw when size changes
        // axis.layout = "none"; // does not trigger redraw when size changes
        _this.layout = "none";
        _this.autoScale = true;
        _this.autoCenter = true;
        _this.isMeasured = false;
        _this.className = "AxisRendererCurveX";
        _this.line.strokeOpacity = 1;
        _this.precisionStep = 10;
        _this.line.isMeasured = false;
        _this.points = [{ x: -300, y: 0 }, { x: 300, y: 0 }];
        _this._tempSprite = _this.createChild(Sprite);
        _this._tempSprite.visible = false;
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(AxisRendererCurveX.prototype, "axisLength", {
        /**
         * Returns actual length of the Axis, in pixels.
         *
         * @return Length (px)
         */
        get: function () {
            return this.polyspline.distance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates and positions the axis line element.
     *
     * @ignore Exclude from docs
     */
    AxisRendererCurveX.prototype.updateAxisLine = function () {
        this.line.path = this.polyspline.path;
    };
    Object.defineProperty(AxisRendererCurveX.prototype, "polyspline", {
        /**
         * @return Polyspline
         */
        get: function () {
            var polyspline = this.getPropertyValue("polyspline");
            if (!polyspline) {
                polyspline = this.createChild(Polyspline);
                polyspline.tensionX = 1;
                polyspline.tensionY = 1;
                this.polyspline = polyspline;
            }
            return polyspline;
        },
        /**
         * A [[Polyspline]] elment that represents axis shape / curve.
         *
         * @param  value  Polyspline
         */
        set: function (value) {
            this.setPropertyValue("polyspline", value, true);
            value.parent = this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRendererCurveX.prototype, "autoScale", {
        /**
         * @return Auto-scale?
         */
        get: function () {
            return this.getPropertyValue("autoScale");
        },
        /**
         * Should the chart be scaled automatically, to fit into container?
         *
         * @default true
         * @param  value  Auto-scale?
         */
        set: function (value) {
            this.setPropertyValue("autoScale", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRendererCurveX.prototype, "autoCenter", {
        /**
         * @return {boolean} Auto-center?
         */
        get: function () {
            return this.getPropertyValue("autoCenter");
        },
        /**
         * Should chart be centered within chart area?
         *
         * @default true
         * @param  value  Auto-center?
         */
        set: function (value) {
            this.setPropertyValue("autoCenter", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRendererCurveX.prototype, "precisionStep", {
        /**
         * @return Precision step
         */
        get: function () {
            return this.getPropertyValue("precisionStep");
        },
        /**
         * Precision setting to use when drawing chart objects. Basically, it's
         * number of pixels that a control point should be added at.
         *
         * The smaller the number, the finer line. However, small number will impact
         * the performace.
         *
         * Depending on actual chart configuration, you might need to find the best
         * possible value to balance between detail and good performance.
         *
         * @default 10
         * @param  value  Precision step
         */
        set: function (value) {
            this.setPropertyValue("precisionStep", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisRendererCurveX.prototype, "points", {
        /**
         * @return Control points
         */
        get: function () {
            return this.getPropertyValue("points");
        },
        /**
         * An array of control points that define axis curve.
         *
         * @see {@link https://www.amcharts.com/docs/v4/chart-types/timeline/#Control_points} for more info
         * @param  value  Control points
         */
        set: function (value) {
            if (this.setPropertyValue("points", value, true)) {
                this._pointsChanged = true;
                this.polyspline.segments = [value];
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
    * @ignore
    */
    AxisRendererCurveX.prototype.setAxis = function (axis) {
        var _this = this;
        _super.prototype.setAxis.call(this, axis);
        if (axis && axis.chart) {
            var chart = axis.chart;
            this._disposers.push(chart.curveContainer.events.on("positionchanged", function () {
                _this.handleSizeChange();
            }));
            this._disposers.push(chart.events.on("maxsizechanged", function () {
                _this.handleSizeChange();
            }));
        }
    };
    /**
     * A handler for when axis size changes.
     */
    AxisRendererCurveX.prototype.handleSizeChange = function () {
        if (this._pointsChanged) {
            var pp = this.axis.getPositionRangePath(0, 1);
            this._tempSprite.path = pp;
            this._pointsChanged = false;
        }
        if (this.points) {
            var chart = this.axis.chart;
            var curveContainer = chart.curveContainer;
            var mw = chart.plotContainer.maxWidth - curveContainer.pixelPaddingLeft - curveContainer.pixelPaddingRight;
            var mh = chart.plotContainer.maxHeight - curveContainer.pixelPaddingTop - curveContainer.pixelPaddingBottom;
            var bbox = this._tempSprite.element.getBBox();
            var centerPoint_1 = { x: 0, y: 0 };
            if (this.autoCenter) {
                centerPoint_1 = { x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height / 2 };
            }
            var scale_1 = 1;
            if (this.autoScale) {
                scale_1 = $math.min(mw / bbox.width, mh / bbox.height);
            }
            var modifiedPoints_1 = [];
            $array.each(this.points, function (point) {
                modifiedPoints_1.push({ x: (point.x - centerPoint_1.x) * scale_1, y: (point.y - centerPoint_1.y) * scale_1 });
            });
            this.polyspline.segments = [modifiedPoints_1];
        }
    };
    /**
     * Converts relative position on axis to point coordinates.
     *
     * @param position  Position (0-1)
     * @param position2  Position (0-1) Position on the second axis
     * @return Point
     */
    AxisRendererCurveX.prototype.positionToPoint = function (position, position2) {
        var axis = this.axis;
        position = (position - axis.start) / (axis.end - axis.start);
        var point = this.polyspline.positionToPoint(position, true);
        point.angle += 90;
        var axisRendererY = this.axisRendererY;
        if ($type.isNumber(position2) && axisRendererY) {
            var radius = axisRendererY.positionToPoint(position2).y;
            point.x += radius * $math.cos(point.angle);
            point.y += radius * $math.sin(point.angle);
        }
        return point;
    };
    /**
     * Converts relative position (0-1) on axis to angle in degrees (0-360).
     *
     * @param position  Position (0-1)
     * @return Angle (0-360)
     */
    AxisRendererCurveX.prototype.positionToAngle = function (position) {
        var axis = this.axis;
        position = $math.max(0, (position - axis.start) / (axis.end - axis.start));
        return this.polyspline.positionToPoint(position, true).angle + 90;
    };
    /**
     * Updates and positions a grid element.
     *
     * @ignore Exclude from docs
     * @param grid         Grid element
     * @param position     Starting position
     * @param endPosition  End position
     */
    AxisRendererCurveX.prototype.updateGridElement = function (grid, position, endPosition) {
        if (grid.element) {
            position = position + (endPosition - position) * grid.location;
            grid.zIndex = 0;
            grid.path = this.getGridPath(position);
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
    AxisRendererCurveX.prototype.getGridPath = function (position) {
        var point = this.positionToPoint(position);
        var angle = point.angle;
        var axisRendererY = this.axisRendererY;
        if (axisRendererY) {
            var radius = -axisRendererY.radius;
            var innerRadius = -axisRendererY.innerRadius;
            return $path.moveTo({ x: point.x + innerRadius * $math.cos(angle), y: point.y + innerRadius * $math.sin(angle) }) + $path.lineTo({ x: point.x + radius * $math.cos(angle), y: point.y + radius * $math.sin(angle) });
        }
        return "";
    };
    /**
     * Updates and positions a tick element.
     *
     * @ignore Exclude from docs
     * @param tick      Tick element
     * @param position  Position
     */
    AxisRendererCurveX.prototype.updateTickElement = function (tick, position) {
        if (tick.element) {
            var point = this.positionToPoint(position);
            var angle = point.angle;
            var tickLength = tick.length;
            if (tick.inside) {
                tickLength *= -1;
            }
            tick.path = $path.moveTo({ x: point.x, y: point.y }) + $path.lineTo({ x: point.x + tickLength * $math.cos(angle), y: point.y + tickLength * $math.sin(angle) });
            this.toggleVisibility(tick, position, 0, 1);
        }
    };
    /**
     * Updates and positions a label element.
     *
     * @ignore Exclude from docs
     * @param label        Label element
     * @param position     Starting position
     * @param endPosition  Ending position
     */
    AxisRendererCurveX.prototype.updateLabelElement = function (label, position, endPosition, location) {
        if (!$type.hasValue(location)) {
            location = label.location;
        }
        position = position + (endPosition - position) * location;
        var point = this.positionToPoint(position);
        label.x = point.x;
        label.y = point.y;
        label.zIndex = 2;
        this.toggleVisibility(label, position, this.minLabelPosition, this.maxLabelPosition);
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
    AxisRendererCurveX.prototype.getPositionRangePath = function (startPosition, endPosition) {
        var path = "";
        var axisRendererY = this.axisRendererY;
        if (axisRendererY) {
            if (startPosition > endPosition) {
                var temp = startPosition;
                startPosition = endPosition;
                endPosition = temp;
            }
            var startY = axisRendererY.axis.start;
            var endY = axisRendererY.axis.end;
            var startX = this.axis.start;
            var endX = this.axis.end;
            if ((startPosition <= startX && endPosition <= startX) || (startPosition >= endX && endPosition >= endX)) {
                return path;
            }
            startPosition = $math.fitToRange(startPosition, startX, endX);
            endPosition = $math.fitToRange(endPosition, startX, endX);
            if (endPosition == startX || startPosition == endX) {
                return path;
            }
            if (endPosition == startPosition) {
                return path;
            }
            var startRadius = $math.round(axisRendererY.positionToPoint(startY).y, 1) | 0;
            var endRadius = $math.round(axisRendererY.positionToPoint(endY).y, 1) | 0;
            var point = this.positionToPoint(startPosition);
            var angle = point.angle;
            path = $path.moveTo(point);
            var count = Math.ceil(this.axisLength / this.precisionStep * (endPosition - startPosition) / (endX - startX));
            for (var i = 0; i <= count; i++) {
                var pos = startPosition + i / count * (endPosition - startPosition);
                point = this.positionToPoint(pos);
                angle = point.angle;
                var x = point.x + startRadius * $math.cos(angle);
                var y = point.y + startRadius * $math.sin(angle);
                path += $path.lineTo({ x: x, y: y });
            }
            for (var i = count; i >= 0; i--) {
                var pos = startPosition + i / count * (endPosition - startPosition);
                point = this.positionToPoint(pos);
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
     * Updates and positions the base grid element.
     *
     * @ignore Exclude from docs
     */
    AxisRendererCurveX.prototype.updateBaseGridElement = function () {
    };
    /**
     * Updates and positions axis bullet.
     *
     * @ignore Exclude from docs
     * @param bullet       AxisBullet element
     * @param position     Starting position
     * @param endPosition  End position
     */
    AxisRendererCurveX.prototype.updateBullet = function (bullet, position, endPosition) {
        var location = 0.5;
        if (bullet instanceof AxisBullet) {
            location = bullet.location;
        }
        position = position + (endPosition - position) * location;
        var point = this.positionToPoint(position);
        //let angle = point.angle;
        bullet.moveTo({ x: point.x, y: point.y });
        //bullet.rotation = angle - 90;
        this.toggleVisibility(bullet, position, 0, 1);
    };
    /**
     * Updates and positions an axis break element.
     *
     * @ignore Exclude from docs
     * @param axisBreak Break element
     */
    AxisRendererCurveX.prototype.updateBreakElement = function (axisBreak) {
        var axisRendererY = this.axisRendererY;
        if (axisRendererY) {
            var startPosition = axisBreak.startPosition;
            var endPosition = axisBreak.endPosition;
            var startAngle = this.positionToAngle(startPosition);
            var startPoint = this.positionToPoint(startPosition);
            var endAngle = this.positionToAngle(endPosition);
            var endPoint = this.positionToPoint(endPosition);
            var startLine = axisBreak.startLine;
            var endLine = axisBreak.endLine;
            var fillShape = axisBreak.fillShape;
            var radius = -axisRendererY.radius + axisBreak.pixelMarginTop;
            var innerRadius = -axisRendererY.innerRadius - axisBreak.pixelMarginBottom;
            var x1 = startPoint.x + innerRadius * $math.cos(startAngle);
            var y1 = startPoint.y + innerRadius * $math.sin(startAngle);
            var x2 = startPoint.x + radius * $math.cos(startAngle);
            var y2 = startPoint.y + radius * $math.sin(startAngle);
            var x3 = endPoint.x + innerRadius * $math.cos(endAngle);
            var y3 = endPoint.y + innerRadius * $math.sin(endAngle);
            var x4 = endPoint.x + radius * $math.cos(endAngle);
            var y4 = endPoint.y + radius * $math.sin(endAngle);
            var p1 = { x: x1, y: y1 };
            var p2 = { x: x2, y: y2 };
            var p3 = { x: x3, y: y3 };
            var p4 = { x: x4, y: y4 };
            startLine.path = $path.moveTo(p1) + wavedLine(p1, p2, startLine.waveLength, startLine.waveHeight, startLine.tension, true);
            endLine.path = $path.moveTo(p4) + wavedLine(p4, p3, endLine.waveLength, endLine.waveHeight, endLine.tension, true);
            var path = $path.moveTo(p1);
            path += wavedLine(p1, p2, fillShape.waveLength, fillShape.waveHeight, fillShape.tension, true);
            var startX = this.axis.start;
            var endX = this.axis.end;
            var count = Math.ceil(this.axisLength / this.precisionStep * (endPosition - startPosition) / (endX - startX));
            for (var i = 0; i <= count; i++) {
                var pos = startPosition + i / count * (endPosition - startPosition);
                var point = this.positionToPoint(pos);
                var angle = point.angle;
                var x = point.x + radius * $math.cos(angle);
                var y = point.y + radius * $math.sin(angle);
                path += $path.lineTo({ x: x, y: y });
            }
            path += wavedLine(p4, p3, fillShape.waveLength, fillShape.waveHeight, fillShape.tension, true);
            for (var i = count; i >= 0; i--) {
                var pos = startPosition + i / count * (endPosition - startPosition);
                var point = this.positionToPoint(pos);
                var angle = point.angle;
                var x = point.x + innerRadius * $math.cos(angle);
                var y = point.y + innerRadius * $math.sin(angle);
                path += $path.lineTo({ x: x, y: y });
            }
            fillShape.path = path;
            this.toggleVisibility(axisBreak.startLine, axisBreak.startPosition, 0, 1);
            this.toggleVisibility(axisBreak.endLine, axisBreak.endPosition, 0, 1);
        }
    };
    /**
     * @ignore
     */
    AxisRendererCurveX.prototype.toAxisPosition = function (value) {
        return value;
    };
    /**
     * Converts a coordinate in pixels to a relative position. (0-1)
     *
     * @param coordinate  Coordinate (px)
     * @param coordinate2  Coordinate (px) Some more complicated axes need two coordinates
     * @return Position (0-1)
     */
    AxisRendererCurveX.prototype.coordinateToPosition = function (coordinate, coordinate2) {
        var points = this.polyspline.allPoints;
        var closestPoint = this.polyspline.getClosestPointIndex({ x: coordinate, y: coordinate2 });
        return _super.prototype.coordinateToPosition.call(this, closestPoint / (points.length - 1) * this.axisLength);
    };
    /**
     * Updates some of the Axis tooltip's visual properties, related to
     * rendering of the Axis.
     *
     * @todo Description (review)
     * @ignore Exclude from docs
     */
    AxisRendererCurveX.prototype.updateTooltip = function () {
    };
    Object.defineProperty(AxisRendererCurveX.prototype, "inversed", {
        /**
         * @return Flip axis?
         */
        get: function () {
            return false;
        },
        /**
         * [[CurveChart]] does not support inversed X axes. This setting will be
         * ignored.
         * @param  value  Flip axis?
         */
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    return AxisRendererCurveX;
}(AxisRendererX));
export { AxisRendererCurveX };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["AxisRendererCurveX"] = AxisRendererCurveX;
//# sourceMappingURL=AxisRendererCurveX.js.map