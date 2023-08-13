/**
 * Polyspline (smoothed line) module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Polyline } from "./Polyline";
import { registry } from "../Registry";
import * as $math from "../../core/utils/Math";
import * as $type from "../../core/utils/Type";
import * as $path from "../../core/rendering/Path";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws a polysline. (smoothed multi-sigment line)
 *
 * @see {@link IPolysplineEvents} for a list of available events
 * @see {@link IPolysplineAdapters} for a list of available Adapters
 */
var Polyspline = /** @class */ (function (_super) {
    __extends(Polyspline, _super);
    /**
     * Constructor
     */
    function Polyspline() {
        var _this = _super.call(this) || this;
        _this.className = "Polyspline";
        _this.tensionX = 0.5;
        _this.tensionY = 0.5;
        _this.applyTheme();
        return _this;
    }
    /**
     * Creats and adds an SVG path for the arc.
     *
     * @ignore Exclude from docs
     */
    Polyspline.prototype.makePath = function () {
        this._distance = 0;
        var segments = this.segments;
        var tensionX = this.tensionX;
        var tensionY = this.tensionY;
        this.allPoints = [];
        if (segments && segments.length > 0) {
            var path = "";
            this._realSegments = [];
            for (var i = 0, len = segments.length; i < len; i++) {
                var points = segments[i];
                var realPoints = [];
                this._realSegments.push(realPoints);
                if (points.length > 0) {
                    var first = points[0];
                    var last = points[points.length - 1];
                    var closed_1 = false;
                    if ($math.round(first.x, 3) == $math.round(last.x) && $math.round(first.y) == $math.round(last.y)) {
                        closed_1 = true;
                    }
                    path += $path.moveTo(points[0]);
                    for (var p = 0; p < points.length - 1; p++) {
                        var p0 = points[p - 1];
                        var p1 = points[p];
                        var p2 = points[p + 1];
                        var p3 = points[p + 2];
                        if (p === 0) {
                            p0 = points[p];
                        }
                        else if (p == points.length - 2) {
                            p3 = points[p + 1];
                        }
                        if (!p3) {
                            p3 = p2;
                        }
                        if (p === 0) {
                            if (closed_1) {
                                p0 = points[points.length - 2];
                            }
                            else {
                                p0 = points[i];
                            }
                        }
                        else if (p == points.length - 2) {
                            if (closed_1) {
                                p3 = points[1];
                            }
                            else {
                                p3 = points[p + 1];
                            }
                        }
                        var controlPointA = $math.getCubicControlPointA(p0, p1, p2, p3, tensionX, tensionY);
                        var controlPointB = $math.getCubicControlPointB(p0, p1, p2, p3, tensionX, tensionY);
                        path += $path.cubicCurveTo(p2, controlPointA, controlPointB);
                        // now split to small segments so that we could have positionToPoint later
                        var stepCount = Math.ceil($math.getCubicCurveDistance(p1, p2, controlPointA, controlPointB, 20)) * 1.2;
                        var prevPoint = p1;
                        if (stepCount > 0) {
                            // not good for curved charts
                            //this.allPoints[0] = { x: points[0].x, y: points[0].y, angle: $math.getAngle(points[0], points[1]) };
                            //realPoints.push(this.allPoints[0]);
                            for (var s = 0; s <= stepCount; s++) {
                                var point = $math.getPointOnCubicCurve(p1, p2, controlPointA, controlPointB, s / stepCount);
                                if (point.x == prevPoint.x && point.y == prevPoint.y) {
                                    continue;
                                }
                                realPoints.push(point);
                                var angle = $math.round($math.getAngle(prevPoint, point), 5);
                                //this.allPoints.push({ x: point.x, y: point.y, angle: angle });
                                this._distance += $math.getDistance(prevPoint, point);
                                this.allPoints[Math.floor(this._distance)] = { x: point.x, y: point.y, angle: angle };
                                prevPoint = point;
                            }
                        }
                        else {
                            realPoints.push(p0);
                        }
                    }
                }
                var allPoints = this.allPoints;
                if (allPoints.length > 1) {
                    for (var i_1 = 0; i_1 < allPoints.length; i_1++) {
                        if (!allPoints[i_1]) {
                            if (i_1 > 1) {
                                allPoints[i_1] = allPoints[i_1 - 1];
                            }
                            else {
                                for (var k = 1; k < allPoints.length; k++) {
                                    if (allPoints[k]) {
                                        allPoints[i_1] = allPoints[k];
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            this.path = path;
        }
    };
    /**
     * Returns an index of the point that is closest to specified coordinates.
     *
     * @param   point  Reference point
     * @return         Index
     */
    Polyspline.prototype.getClosestPointIndex = function (point) {
        var points = this.allPoints;
        var index;
        var closest = Infinity;
        if (points.length > 1) {
            for (var p = 1; p < points.length; p++) {
                var distance = $math.getDistance(point, points[p]);
                if (distance < closest) {
                    index = p;
                    closest = distance;
                }
            }
        }
        return index;
    };
    Object.defineProperty(Polyspline.prototype, "tensionX", {
        /**
         * @return Tension
         */
        get: function () {
            return this.getPropertyValue("tensionX");
        },
        /**
         * Horizontal tension for the spline.
         *
         * Used by the line smoothing algorithm.
         *
         * @default 0.5
         * @param value  Tension
         */
        set: function (value) {
            this.setPropertyValue("tensionX", value);
            this.makePath();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Polyspline.prototype, "tensionY", {
        /**
         * @return Tension
         */
        get: function () {
            return this.getPropertyValue("tensionY");
        },
        /**
         * Vertical tension for the spline.
         *
         * Used by the line smoothing algorithm.
         *
         * @default 0.5
         * @param value  Tensions
         */
        set: function (value) {
            this.setPropertyValue("tensionY", value, true);
            this.makePath();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Converts relative position along the line (0-1) into pixel coordinates.
     *
     * @param position  Position (0-1)
     * @return Coordinates
     */
    Polyspline.prototype.positionToPoint = function (position, extend) {
        var deltaAngle = 0;
        var allPoints = this.allPoints;
        var len = allPoints.length;
        if (!$type.isNumber(position)) {
            position = 0;
        }
        if (len > 1) {
            if (extend && len > 3) {
                if (position < 0) {
                    if (position < -0.01) {
                        position = -0.01;
                    }
                    var f0 = allPoints[0];
                    var f1 = allPoints[1];
                    var x = f0.x - (f0.x - f1.x) * len * position;
                    var y = f0.y - (f0.y - f1.y) * len * position;
                    return { x: x, y: y, angle: $math.getAngle(f0, f1) };
                }
                else if (position > 1) {
                    if (position > 1.01) {
                        position = 1.01;
                    }
                    var f0 = allPoints[allPoints.length - 2];
                    var f1 = allPoints[allPoints.length - 3];
                    var x = f0.x + (f0.x - f1.x) * len * (position - 1);
                    var y = f0.y + (f0.y - f1.y) * len * (position - 1);
                    return { x: x, y: y, angle: $math.getAngle(f0, { x: x, y: y }) };
                }
                else if (position == 1) {
                    var point_1 = allPoints[allPoints.length - 1];
                    return { x: point_1.x, y: point_1.y, angle: point_1.angle };
                }
            }
            else {
                if (position < 0) {
                    position = Math.abs(position);
                    deltaAngle = 180;
                }
                if (position >= 1) {
                    position = 0.9999999999999;
                }
            }
            var point = allPoints[Math.floor(position * len)];
            return { x: point.x, y: point.y, angle: point.angle + deltaAngle };
        }
        else if (len == 1) {
            var point = allPoints[0];
            return { x: point.x, y: point.y, angle: point.angle };
        }
        else {
            return { x: 0, y: 0, angle: 0 };
        }
    };
    return Polyspline;
}(Polyline));
export { Polyspline };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Polyspline"] = Polyspline;
//# sourceMappingURL=Polyspline.js.map