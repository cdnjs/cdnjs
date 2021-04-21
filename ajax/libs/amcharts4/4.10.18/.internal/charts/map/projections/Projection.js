/**
 * This module contains funcitonality related to geographical projections
 */
import { registry } from "../../../core/Registry";
import * as $math from "../../../core/utils/Math";
import * as d3geo from "d3-geo";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * This is a base class for a geographical projection.
 */
var Projection = /** @class */ (function () {
    function Projection() {
        this.d3Projection = d3geo.geoEquirectangular();
    }
    Object.defineProperty(Projection.prototype, "d3Projection", {
        /**
         * d3 projection
         */
        get: function () {
            return this._d3Projection;
        },
        /**
         * d3 projection
         */
        set: function (projection) {
            this._d3Projection = projection;
            projection.precision(0.1);
            this._d3Path = d3geo.geoPath().projection(projection);
            if (this.chart) {
                this.chart.invalidateProjection();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Projection.prototype, "d3Path", {
        /**
         * d3 path generator method
         * @ignore
         */
        get: function () {
            return this._d3Path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Projection.prototype, "scale", {
        /**
         * @ignore
         */
        get: function () {
            return this.d3Projection.scale() / 100;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Converts a geographical point (lat/long) to a screen point (x/y)
     * @param geoPoint Geo point (lat/long)
     * @return Screen point (x/y)
     */
    Projection.prototype.convert = function (geoPoint) {
        /*
        geoPoint = $geo.normalizePoint(geoPoint);
        geoPoint = this.rotate(geoPoint, this.deltaLongitude, this.deltaLatitude, this.deltaGama);
        let pointInRadians: IPoint = this.project(geoPoint.longitude * $math.RADIANS, geoPoint.latitude * $math.RADIANS);
        return {
            x: $math.round(pointInRadians.x * $math.DEGREES - this.centerPoint.x, 4) * this.scale,
            y: $math.round(-pointInRadians.y * $math.DEGREES - this.centerPoint.y, 4) * this.scale
        };*/
        var p = this.d3Projection([geoPoint.longitude, geoPoint.latitude]);
        if (p) {
            return { x: p[0], y: p[1] };
        }
    };
    /**
     * Converts a screen point (x/y) to a geographical point (lat/long)
     * @param point Screen point (x/y)
     * @return Geo point (lat/long)
     */
    Projection.prototype.invert = function (point) {
        /*
        let pointInRadians: IGeoPoint = this.unproject((point.x / this.scale + this.centerPoint.x) * $math.RADIANS, (-point.y / this.scale - this.centerPoint.y) * $math.RADIANS);

        let geoPoint = { longitude: pointInRadians.longitude * $math.DEGREES, latitude: pointInRadians.latitude * $math.DEGREES };

        geoPoint = this.unrotate(geoPoint, this.deltaLongitude, this.deltaLatitude, this.deltaGama);
        */
        var p = this.d3Projection.invert([point.x, point.y]);
        if (p) {
            return { longitude: p[0], latitude: p[1] };
        }
    };
    /**
     * Returns X/Y coordinates.
     * Individual projections will override this method to apply their own
     * projection logic.
     * @deprecated
     * @param lambda [description]
     * @param phi    [description]
     * @return X/Y coordinates
     * @todo Needs description
     */
    Projection.prototype.project = function (lambda, phi) {
        return this.convert({ longitude: lambda * $math.DEGREES, latitude: phi * $math.DEGREES });
    };
    /**
     * Returns geographical coordinates (lat/long).
     * Individual projections will override this method to apply their own
     * projection logic.
     * @deprecated
     * @param x X coordinate
     * @param y Y coordinate
     * @return Geographical point
     * @todo Needs description
     */
    Projection.prototype.unproject = function (x, y) {
        return this.invert({ x: x, y: y });
    };
    /**
     * @ignore
     * @deprecated
     */
    Projection.prototype.rotate = function (geoPoint, deltaLongitude, deltaLatitude, deltaGamma) {
        var deltaLambda = deltaLongitude * $math.RADIANS;
        var deltaPhi = deltaLatitude * $math.RADIANS;
        deltaGamma = deltaGamma * $math.RADIANS;
        var lambda = geoPoint.longitude * $math.RADIANS + deltaLambda;
        var phi = geoPoint.latitude * $math.RADIANS;
        var cosDeltaPhi = Math.cos(deltaPhi);
        var sinDeltaPhi = Math.sin(deltaPhi);
        var cosDeltaGamma = Math.cos(deltaGamma);
        var sinDeltaGamma = Math.sin(deltaGamma);
        var cosPhi = Math.cos(phi);
        var x = Math.cos(lambda) * cosPhi;
        var y = Math.sin(lambda) * cosPhi;
        var z = Math.sin(phi);
        var k = z * cosDeltaPhi + x * sinDeltaPhi;
        return { longitude: $math.DEGREES * Math.atan2(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - z * sinDeltaPhi), latitude: $math.DEGREES * Math.asin(k * cosDeltaGamma + y * sinDeltaGamma) };
    };
    /**
     * @ignore
     * @deprecated
     */
    Projection.prototype.unrotate = function (geoPoint, deltaLongitude, deltaLatitude, deltaGamma) {
        var deltaLambda = deltaLongitude * $math.RADIANS;
        var deltaPhi = deltaLatitude * $math.RADIANS;
        deltaGamma = deltaGamma * $math.RADIANS;
        var lambda = geoPoint.longitude * $math.RADIANS - deltaLambda;
        var phi = geoPoint.latitude * $math.RADIANS;
        var cosDeltaPhi = Math.cos(deltaPhi);
        var sinDeltaPhi = Math.sin(deltaPhi);
        var cosDeltaGamma = Math.cos(deltaGamma);
        var sinDeltaGamma = Math.sin(deltaGamma);
        var cosPhi = Math.cos(phi);
        var x = Math.cos(lambda) * cosPhi;
        var y = Math.sin(lambda) * cosPhi;
        var z = Math.sin(phi);
        var k = z * cosDeltaGamma - y * sinDeltaGamma;
        return { longitude: $math.DEGREES * Math.atan2(y * cosDeltaGamma + z * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi), latitude: $math.DEGREES * Math.asin(k * cosDeltaPhi - x * sinDeltaPhi) };
    };
    //@todo: move to some utils?
    //@todo: add credits to: https://www.movable-type.co.uk/scripts/latlong.html
    Projection.prototype.intermediatePoint = function (pointA, pointB, position) {
        var p = d3geo.geoInterpolate([pointA.longitude, pointA.latitude], [pointB.longitude, pointB.latitude])(position);
        return { longitude: p[0], latitude: p[1] };
    };
    ;
    // returns radians
    Projection.prototype.multiDistance = function (multiGeoLine) {
        var distance = 0;
        for (var s = 0; s < multiGeoLine.length; s++) {
            var points = multiGeoLine[s];
            if (points.length > 1) {
                for (var p = 1; p < points.length; p++) {
                    var pointA = points[p - 1];
                    var pointB = points[p];
                    distance += this.distance(pointA, pointB);
                }
            }
        }
        return distance;
    };
    // returns radians
    Projection.prototype.distance = function (pointA, pointB) {
        return d3geo.geoDistance([pointA.longitude, pointA.latitude], [pointB.longitude, pointB.latitude]);
    };
    /**
     * Converts relative position along the line (0-1) into pixel coordinates.
     *
     * @param position  Position (0-1)
     * @return Coordinates
     */
    Projection.prototype.positionToPoint = function (multiGeoLine, position) {
        if (multiGeoLine) {
            var intermediatePoint = this.positionToGeoPoint(multiGeoLine, position);
            var intermediatePointA = this.positionToGeoPoint(multiGeoLine, position - 0.01);
            var intermediatePointB = this.positionToGeoPoint(multiGeoLine, position + 0.01);
            if (intermediatePointA && intermediatePointB) {
                var point = this.convert(intermediatePoint);
                var pa = this.convert(intermediatePointA);
                var pb = this.convert(intermediatePointB);
                return { x: point.x, y: point.y, angle: $math.getAngle(pa, pb) };
            }
        }
        return { x: 0, y: 0, angle: 0 };
    };
    /**
     * Converts relative position along the line (0-1) into pixel coordinates.
     *
     * @param position  Position (0-1)
     * @return Coordinates
     */
    Projection.prototype.positionToGeoPoint = function (multiGeoLine, position) {
        if (multiGeoLine) {
            var totalDistance = this.multiDistance(multiGeoLine);
            var currentDistance = 0;
            var distanceAB = void 0;
            var positionA = 0;
            var positionB = 0;
            var pointA = void 0;
            var pointB = void 0;
            for (var s = 0; s < multiGeoLine.length; s++) {
                var points = multiGeoLine[s];
                if (points.length > 1) {
                    for (var p = 1; p < points.length; p++) {
                        pointA = points[p - 1];
                        pointB = points[p];
                        positionA = currentDistance / totalDistance;
                        distanceAB = this.distance(pointA, pointB);
                        currentDistance += distanceAB;
                        positionB = currentDistance / totalDistance;
                        if (positionA <= position && positionB > position) {
                            s = multiGeoLine.length;
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
                return this.intermediatePoint(pointA, pointB, positionAB);
            }
        }
        return { longitude: 0, latitude: 0 };
    };
    return Projection;
}());
export { Projection };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Projection"] = Projection;
//# sourceMappingURL=Projection.js.map