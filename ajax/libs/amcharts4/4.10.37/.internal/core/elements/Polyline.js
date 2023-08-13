/**
 * Polyline module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite } from "../Sprite";
import { color } from "../utils/Color";
import { registry } from "../Registry";
import * as $path from "../rendering/Path";
import * as $math from "../utils/Math";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws a polyline.
 *
 * @see {@link IPolylineEvents} for a list of available events
 * @see {@link IPolylineAdapters} for a list of available Adapters
 */
var Polyline = /** @class */ (function (_super) {
    __extends(Polyline, _super);
    /**
     * Constructor
     */
    function Polyline() {
        var _this = _super.call(this) || this;
        /**
         * [_distance description]
         *
         * @todo Description
         */
        _this._distance = 0;
        _this.className = "Polyline";
        _this.element = _this.paper.add("path");
        _this.shapeRendering = "auto";
        _this.fill = color();
        _this.strokeOpacity = 1;
        _this.applyTheme();
        return _this;
    }
    /**
     * Creats and adds an SVG path for the arc.
     *
     * @ignore Exclude from docs
     */
    Polyline.prototype.makePath = function () {
        this._distance = 0;
        var segments = this.segments;
        if (segments && segments.length > 0) {
            var path = "";
            for (var i = 0, len = segments.length; i < len; i++) {
                var points = segments[i];
                if (points.length > 0) {
                    path += $path.moveTo(points[0]);
                    for (var p = 1; p < points.length; p++) {
                        var point = points[p];
                        path += $path.lineTo(point);
                        this._distance += $math.getDistance(points[p - 1], point);
                    }
                }
            }
            this.path = path;
        }
        this._realSegments = segments;
    };
    Object.defineProperty(Polyline.prototype, "segments", {
        /**
         * @return Segments
         */
        get: function () {
            return this.getPropertyValue("segments");
        },
        /**
         * A list of segment coordinates for the multi-part line.
         *
         * @todo Example
         * @param segments  Segments
         */
        set: function (segments) {
            this.setPropertyValue("segments", segments);
            this.makePath();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Polyline.prototype, "distance", {
        /**
         * [distance description]
         *
         * @todo Description
         * @return [description]
         */
        get: function () {
            return this._distance;
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
    Polyline.prototype.positionToPoint = function (position) {
        var deltaAngle = 0;
        if (position < 0) {
            position = Math.abs(position);
            deltaAngle = 180;
        }
        var segments = this._realSegments;
        if (segments) {
            var totalDistance = this.distance;
            var currentDistance = 0;
            var distanceAB = void 0;
            var positionA = 0;
            var positionB = 0;
            var pointA = void 0;
            var pointB = void 0;
            for (var s = 0; s < segments.length; s++) {
                var points = segments[s];
                if (points.length > 1) {
                    for (var p = 1; p < points.length; p++) {
                        pointA = points[p - 1];
                        pointB = points[p];
                        positionA = currentDistance / totalDistance;
                        distanceAB = $math.getDistance(pointA, pointB);
                        currentDistance += distanceAB;
                        positionB = currentDistance / totalDistance;
                        if (positionA <= position && positionB > position) {
                            s = segments.length;
                            break;
                        }
                    }
                }
                else if (points.length == 1) {
                    pointA = points[0];
                    pointB = points[0];
                    positionA = 0;
                    positionB = 1;
                }
            }
            if (pointA && pointB) {
                var positionAB = (position - positionA) / (positionB - positionA);
                var midPoint = $math.getMidPoint(pointA, pointB, positionAB);
                return { x: midPoint.x, y: midPoint.y, angle: deltaAngle + $math.getAngle(pointA, pointB) };
            }
        }
        return { x: 0, y: 0, angle: 0 };
    };
    Object.defineProperty(Polyline.prototype, "realSegments", {
        /**
         * @ignore
         */
        get: function () {
            return this._realSegments;
        },
        enumerable: true,
        configurable: true
    });
    return Polyline;
}(Sprite));
export { Polyline };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Polyline"] = Polyline;
//# sourceMappingURL=Polyline.js.map