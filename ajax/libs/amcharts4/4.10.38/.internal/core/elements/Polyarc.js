/**
 * Module for a multi-part arched line.
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
import * as $path from "../../core/rendering/Path";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws a multi-part arched line.
 *
 * @see {@link IPolyarcEvents} for a list of available events
 * @see {@link IPolyarcAdapters} for a list of available Adapters
 */
var Polyarc = /** @class */ (function (_super) {
    __extends(Polyarc, _super);
    /**
     * Constructor
     */
    function Polyarc() {
        var _this = _super.call(this) || this;
        _this.className = "Polyarc";
        _this.controlPointDistance = 0.5;
        _this.controlPointPosition = 0.5;
        _this.applyTheme();
        return _this;
    }
    /**
     * Creats and adds an SVG path for the arc.
     *
     * @ignore Exclude from docs
     */
    Polyarc.prototype.makePath = function () {
        this._distance = 0;
        var segments = this.segments;
        if (segments && segments.length > 0) {
            var path = "";
            this._realSegments = [];
            for (var i = 0, len = segments.length; i < len; i++) {
                var points = segments[i];
                var realPoints = [];
                this._realSegments.push(realPoints);
                if (points.length > 0) {
                    path += $path.moveTo(points[0]);
                    for (var p = 1; p < points.length; p++) {
                        var pointA = points[p - 1];
                        var pointB = points[p];
                        var distanceAB = $math.getDistance(pointB, pointA);
                        var cpDistance = distanceAB * this.controlPointDistance;
                        var controlPointPosition = this.controlPointPosition;
                        var angle = -$math.getAngle(pointA, pointB);
                        var cpx = pointA.x + (pointB.x - pointA.x) * controlPointPosition * 0.5 - cpDistance * $math.sin(angle);
                        var cpy = pointA.y + (pointB.y - pointA.y) * controlPointPosition * 0.5 - cpDistance * $math.cos(angle);
                        var controlPoint1 = { x: cpx, y: cpy };
                        var cpx2 = pointA.x + (pointB.x - pointA.x) * controlPointPosition * 1.5 - cpDistance * $math.sin(angle);
                        var cpy2 = pointA.y + (pointB.y - pointA.y) * controlPointPosition * 1.5 - cpDistance * $math.cos(angle);
                        var controlPoint2 = { x: cpx2, y: cpy2 };
                        path += $path.cubicCurveTo(pointB, controlPoint1, controlPoint2);
                        // we add a lot of points in order to get the position/angle later
                        var stepCount = Math.ceil(distanceAB);
                        var prevPoint = pointA;
                        if (stepCount > 0) {
                            for (var i_1 = 0; i_1 <= stepCount; i_1++) {
                                var point = $math.getPointOnCubicCurve(pointA, pointB, controlPoint1, controlPoint2, i_1 / stepCount);
                                realPoints.push(point);
                                this._distance += $math.getDistance(prevPoint, point);
                                prevPoint = point;
                            }
                        }
                        else {
                            realPoints.push(pointA);
                        }
                    }
                }
            }
            this.path = path;
        }
    };
    Object.defineProperty(Polyarc.prototype, "controlPointPosition", {
        /**
         * @return Position (0-1)
         */
        get: function () {
            return this.getPropertyValue("controlPointPosition");
        },
        /**
         * Relative position along the line the control point is. (0-1)
         *
         * @default 0.5
         * @param value  Position (0-1)
         */
        set: function (value) {
            this.setPropertyValue("controlPointPosition", value);
            this.makePath();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Polyarc.prototype, "controlPointDistance", {
        /**
         * @return Distance (0-1)
         */
        get: function () {
            return this.getPropertyValue("controlPointDistance");
        },
        /**
         * Relative distance of the control point. (0-1)
         *
         * Default is half the length of the line. (0.5)
         *
         * @default 0.5
         * @param value  Distance (0-1)
         */
        set: function (value) {
            this.setPropertyValue("controlPointDistance", value);
            this.makePath();
        },
        enumerable: true,
        configurable: true
    });
    return Polyarc;
}(Polyline));
export { Polyarc };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Polyarc"] = Polyarc;
//# sourceMappingURL=Polyarc.js.map