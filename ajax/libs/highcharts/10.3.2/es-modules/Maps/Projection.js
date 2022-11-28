/* *
 *
 *  (c) 2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import PC from '../Core/Geometry/PolygonClip.js';
var clipLineString = PC.clipLineString, clipPolygon = PC.clipPolygon;
import registry from './Projections/ProjectionRegistry.js';
import U from '../Core/Utilities.js';
var clamp = U.clamp, erase = U.erase;
var deg2rad = Math.PI * 2 / 360;
// Safe padding on either side of the antimeridian to avoid points being
// projected to the wrong side of the plane
var floatCorrection = 0.000001;
// Keep longitude within -180 and 180. This is faster than using the modulo
// operator, and preserves the distinction between -180 and 180.
var wrapLon = function (lon) {
    // Replacing the if's with while would increase the range, but make it prone
    // to crashes on bad data
    if (lon < -180) {
        lon += 360;
    }
    if (lon > 180) {
        lon -= 360;
    }
    return lon;
};
var Projection = /** @class */ (function () {
    function Projection(options) {
        if (options === void 0) { options = {}; }
        // Whether the chart has points, lines or polygons given as coordinates
        // with positive up, as opposed to paths in the SVG plane with positive
        // down.
        this.hasCoordinates = false;
        // Whether the chart has true projection as opposed to pre-projected geojson
        // as in the legacy map collection.
        this.hasGeoProjection = false;
        this.maxLatitude = 90;
        this.options = options;
        var name = options.name, projectedBounds = options.projectedBounds, rotation = options.rotation;
        this.rotator = rotation ? this.getRotator(rotation) : void 0;
        var ProjectionDefinition = name ? Projection.registry[name] : void 0;
        if (ProjectionDefinition) {
            this.def = new ProjectionDefinition(options);
        }
        var _a = this, def = _a.def, rotator = _a.rotator;
        if (def) {
            this.maxLatitude = def.maxLatitude || 90;
            this.hasGeoProjection = true;
        }
        if (rotator && def) {
            this.forward = function (lonLat) {
                return def.forward(rotator.forward(lonLat));
            };
            this.inverse = function (xy) {
                return rotator.inverse(def.inverse(xy));
            };
        }
        else if (def) {
            this.forward = function (lonLat) { return def.forward(lonLat); };
            this.inverse = function (xy) { return def.inverse(xy); };
        }
        else if (rotator) {
            this.forward = rotator.forward;
            this.inverse = rotator.inverse;
        }
        // Projected bounds/clipping
        this.bounds = projectedBounds === 'world' ?
            def && def.bounds :
            projectedBounds;
    }
    // Add a projection definition to the registry, accessible by its `name`.
    Projection.add = function (name, definition) {
        Projection.registry[name] = definition;
    };
    // Calculate the great circle between two given coordinates
    Projection.greatCircle = function (point1, point2, inclusive) {
        var atan2 = Math.atan2, cos = Math.cos, sin = Math.sin, sqrt = Math.sqrt;
        var lat1 = point1[1] * deg2rad;
        var lon1 = point1[0] * deg2rad;
        var lat2 = point2[1] * deg2rad;
        var lon2 = point2[0] * deg2rad;
        var deltaLat = lat2 - lat1;
        var deltaLng = lon2 - lon1;
        var calcA = sin(deltaLat / 2) * sin(deltaLat / 2) +
            cos(lat1) * cos(lat2) * sin(deltaLng / 2) * sin(deltaLng / 2);
        var calcB = 2 * atan2(sqrt(calcA), sqrt(1 - calcA));
        var distance = calcB * 6371e3; // in meters
        var jumps = Math.round(distance / 500000); // 500 km each jump
        var lineString = [];
        if (inclusive) {
            lineString.push(point1);
        }
        if (jumps > 1) {
            var step = 1 / jumps;
            for (var fraction = step; fraction < 0.999; // Account for float errors
             fraction += step) {
                var A = sin((1 - fraction) * calcB) / sin(calcB);
                var B = sin(fraction * calcB) / sin(calcB);
                var x = A * cos(lat1) * cos(lon1) + B * cos(lat2) * cos(lon2);
                var y = A * cos(lat1) * sin(lon1) + B * cos(lat2) * sin(lon2);
                var z = A * sin(lat1) + B * sin(lat2);
                var lat3 = atan2(z, sqrt(x * x + y * y));
                var lon3 = atan2(y, x);
                lineString.push([lon3 / deg2rad, lat3 / deg2rad]);
            }
        }
        if (inclusive) {
            lineString.push(point2);
        }
        return lineString;
    };
    Projection.insertGreatCircles = function (poly) {
        var i = poly.length - 1;
        while (i--) {
            // Distance in degrees, either in lon or lat. Avoid heavy
            // calculation of true distance.
            var roughDistance = Math.max(Math.abs(poly[i][0] - poly[i + 1][0]), Math.abs(poly[i][1] - poly[i + 1][1]));
            if (roughDistance > 10) {
                var greatCircle = Projection.greatCircle(poly[i], poly[i + 1]);
                if (greatCircle.length) {
                    poly.splice.apply(poly, __spreadArray([i + 1, 0], greatCircle, false));
                }
            }
        }
    };
    Projection.toString = function (options) {
        var _a = options || {}, name = _a.name, rotation = _a.rotation;
        return [name, rotation && rotation.join(',')].join(';');
    };
    Projection.prototype.lineIntersectsBounds = function (line) {
        var _a = this.bounds || {}, x1 = _a.x1, x2 = _a.x2, y1 = _a.y1, y2 = _a.y2;
        var getIntersect = function (line, dim, val) {
            var p1 = line[0], p2 = line[1], otherDim = dim ? 0 : 1;
            // Check if points are on either side of the line
            if (typeof val === 'number' && p1[dim] >= val !== p2[dim] >= val) {
                var fraction = ((val - p1[dim]) / (p2[dim] - p1[dim])), crossingVal = p1[otherDim] +
                    fraction * (p2[otherDim] - p1[otherDim]);
                return dim ? [crossingVal, val] : [val, crossingVal];
            }
        };
        var intersection, ret = line[0];
        if ((intersection = getIntersect(line, 0, x1))) {
            ret = intersection;
            // Assuming line[1] was originally outside, replace it with the
            // intersection point so that the horizontal intersection will
            // be correct.
            line[1] = intersection;
        }
        else if ((intersection = getIntersect(line, 0, x2))) {
            ret = intersection;
            line[1] = intersection;
        }
        if ((intersection = getIntersect(line, 1, y1))) {
            ret = intersection;
        }
        else if ((intersection = getIntersect(line, 1, y2))) {
            ret = intersection;
        }
        return ret;
    };
    /*
     * Take the rotation options and return the appropriate projection functions
     */
    Projection.prototype.getRotator = function (rotation) {
        var deltaLambda = rotation[0] * deg2rad, deltaPhi = (rotation[1] || 0) * deg2rad, deltaGamma = (rotation[2] || 0) * deg2rad;
        var cosDeltaPhi = Math.cos(deltaPhi), sinDeltaPhi = Math.sin(deltaPhi), cosDeltaGamma = Math.cos(deltaGamma), sinDeltaGamma = Math.sin(deltaGamma);
        if (deltaLambda === 0 && deltaPhi === 0 && deltaGamma === 0) {
            // Don't waste processing time
            return;
        }
        return {
            forward: function (lonLat) {
                // Lambda (lon) rotation
                var lon = lonLat[0] * deg2rad + deltaLambda;
                // Phi (lat) and gamma rotation
                var lat = lonLat[1] * deg2rad, cosLat = Math.cos(lat), x = Math.cos(lon) * cosLat, y = Math.sin(lon) * cosLat, sinLat = Math.sin(lat), k = sinLat * cosDeltaPhi + x * sinDeltaPhi;
                return [
                    Math.atan2(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - sinLat * sinDeltaPhi) / deg2rad,
                    Math.asin(k * cosDeltaGamma + y * sinDeltaGamma) / deg2rad
                ];
            },
            inverse: function (rLonLat) {
                // Lambda (lon) unrotation
                var lon = rLonLat[0] * deg2rad;
                // Phi (lat) and gamma unrotation
                var lat = rLonLat[1] * deg2rad, cosLat = Math.cos(lat), x = Math.cos(lon) * cosLat, y = Math.sin(lon) * cosLat, sinLat = Math.sin(lat), k = sinLat * cosDeltaGamma - y * sinDeltaGamma;
                return [
                    (Math.atan2(y * cosDeltaGamma + sinLat * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi) - deltaLambda) / deg2rad,
                    Math.asin(k * cosDeltaPhi - x * sinDeltaPhi) / deg2rad
                ];
            }
        };
    };
    // Project a lonlat coordinate position to xy. Dynamically overridden when
    // projection is set.
    Projection.prototype.forward = function (lonLat) {
        return lonLat;
    };
    // Unproject an xy chart coordinate position to lonlat. Dynamically
    // overridden when projection is set.
    Projection.prototype.inverse = function (xy) {
        return xy;
    };
    Projection.prototype.cutOnAntimeridian = function (poly, isPolygon) {
        var antimeridian = 180;
        var intersections = [];
        var polygons = [poly];
        poly.forEach(function (lonLat, i) {
            var previousLonLat = poly[i - 1];
            if (!i) {
                if (!isPolygon) {
                    return;
                }
                // Else, wrap to beginning
                previousLonLat = poly[poly.length - 1];
            }
            var lon1 = previousLonLat[0], lon2 = lonLat[0];
            if (
            // Both points, after rotating for antimeridian, are on the far
            // side of the Earth
            (lon1 < -90 || lon1 > 90) &&
                (lon2 < -90 || lon2 > 90) &&
                // ... and on either side of the plane
                (lon1 > 0) !== (lon2 > 0)) {
                // Interpolate to the intersection latitude
                var fraction = clamp((antimeridian - (lon1 + 360) % 360) /
                    ((lon2 + 360) % 360 - (lon1 + 360) % 360), 0, 1), lat = (previousLonLat[1] +
                    fraction * (lonLat[1] - previousLonLat[1]));
                intersections.push({
                    i: i,
                    lat: lat,
                    direction: lon1 < 0 ? 1 : -1,
                    previousLonLat: previousLonLat,
                    lonLat: lonLat
                });
            }
        });
        var polarIntersection;
        if (intersections.length) {
            if (isPolygon) {
                // Simplified use of the even-odd rule, if there is an odd
                // amount of intersections between the polygon and the
                // antimeridian, the pole is inside the polygon. Applies
                // primarily to Antarctica.
                if (intersections.length % 2 === 1) {
                    polarIntersection = intersections.slice().sort(function (a, b) { return Math.abs(b.lat) - Math.abs(a.lat); })[0];
                    erase(intersections, polarIntersection);
                }
                // Pull out slices of the polygon that is on the opposite side
                // of the antimeridian compared to the starting point
                var i = intersections.length - 2;
                while (i >= 0) {
                    var index = intersections[i].i;
                    var lonPlus = wrapLon(antimeridian +
                        intersections[i].direction * floatCorrection);
                    var lonMinus = wrapLon(antimeridian -
                        intersections[i].direction * floatCorrection);
                    var slice = poly.splice.apply(poly, __spreadArray([index,
                        intersections[i + 1].i - index], Projection.greatCircle([lonPlus, intersections[i].lat], [lonPlus, intersections[i + 1].lat], true), false));
                    // Add interpolated points close to the cut
                    slice.push.apply(slice, Projection.greatCircle([lonMinus, intersections[i + 1].lat], [lonMinus, intersections[i].lat], true));
                    polygons.push(slice);
                    i -= 2;
                }
                // Insert dummy points close to the pole
                if (polarIntersection) {
                    for (var i_1 = 0; i_1 < polygons.length; i_1++) {
                        var direction = polarIntersection.direction, lat = polarIntersection.lat, poly_1 = polygons[i_1], indexOf = poly_1.indexOf(polarIntersection.lonLat);
                        if (indexOf > -1) {
                            var polarLatitude = (lat < 0 ? -1 : 1) *
                                this.maxLatitude;
                            var lon1 = wrapLon(antimeridian +
                                direction * floatCorrection);
                            var lon2 = wrapLon(antimeridian -
                                direction * floatCorrection);
                            var polarSegment = Projection.greatCircle([lon1, lat], [lon1, polarLatitude], true);
                            // Circle around the pole point in order to make
                            // polygon clipping right. Without this, Antarctica
                            // would wrap the wrong way in an LLC projection
                            // with parallels [30, 40].
                            for (var lon = lon1 + 120 * direction; lon > -180 && lon < 180; lon += 120 * direction) {
                                polarSegment.push([lon, polarLatitude]);
                            }
                            polarSegment.push.apply(polarSegment, Projection.greatCircle([lon2, polarLatitude], [lon2, polarIntersection.lat], true));
                            poly_1.splice.apply(poly_1, __spreadArray([indexOf,
                                0], polarSegment, false));
                            break;
                        }
                    }
                }
                // Map lines, not closed
            }
            else {
                var i = intersections.length;
                while (i--) {
                    var index = intersections[i].i;
                    var slice = poly.splice(index, poly.length, 
                    // Add interpolated point close to the cut
                    [
                        wrapLon(antimeridian +
                            intersections[i].direction * floatCorrection),
                        intersections[i].lat
                    ]);
                    // Add interpolated point close to the cut
                    slice.unshift([
                        wrapLon(antimeridian -
                            intersections[i].direction * floatCorrection),
                        intersections[i].lat
                    ]);
                    polygons.push(slice);
                }
            }
        }
        return polygons;
    };
    // Take a GeoJSON geometry and return a translated SVGPath
    Projection.prototype.path = function (geometry) {
        var _this = this;
        var _a = this, bounds = _a.bounds, def = _a.def, rotator = _a.rotator;
        var antimeridian = 180;
        var path = [];
        var isPolygon = geometry.type === 'Polygon' ||
            geometry.type === 'MultiPolygon';
        // @todo: It doesn't really have to do with whether north is
        // positive. It depends on whether the coordinates are
        // pre-projected.
        var hasGeoProjection = this.hasGeoProjection;
        // Detect whether we need to do antimeridian cutting and clipping to
        // bounds. The alternative (currently for Orthographic) is to apply a
        // clip angle.
        var projectingToPlane = !def || def.antimeridianCutting !== false;
        // We need to rotate in a separate step before applying antimeridian
        // cutting
        var preclip = projectingToPlane ? rotator : void 0;
        var postclip = projectingToPlane ? (def || this) : this;
        var boundsPolygon;
        if (bounds) {
            boundsPolygon = [
                [bounds.x1, bounds.y1],
                [bounds.x2, bounds.y1],
                [bounds.x2, bounds.y2],
                [bounds.x1, bounds.y2]
            ];
        }
        var addToPath = function (polygon) {
            // Create a copy of the original coordinates. The copy applies a
            // correction of points close to the antimeridian in order to
            // prevent the points to be projected to the wrong side of the
            // plane. Float errors in topojson or in the projection may cause
            // that.
            var poly = polygon.map(function (lonLat) {
                if (projectingToPlane) {
                    if (preclip) {
                        lonLat = preclip.forward(lonLat);
                    }
                    var lon = lonLat[0];
                    if (Math.abs(lon - antimeridian) < floatCorrection) {
                        if (lon < antimeridian) {
                            lon = antimeridian - floatCorrection;
                        }
                        else {
                            lon = antimeridian + floatCorrection;
                        }
                    }
                    lonLat = [lon, lonLat[1]];
                }
                return lonLat;
            });
            var polygons = [poly];
            if (hasGeoProjection) {
                // Insert great circles into long straight lines
                Projection.insertGreatCircles(poly);
                if (projectingToPlane) {
                    polygons = _this.cutOnAntimeridian(poly, isPolygon);
                }
            }
            polygons.forEach(function (poly) {
                if (poly.length < 2) {
                    return;
                }
                var movedTo = false;
                var firstValidLonLat;
                var lastValidLonLat;
                var gap = false;
                var pushToPath = function (point) {
                    if (!movedTo) {
                        path.push(['M', point[0], point[1]]);
                        movedTo = true;
                    }
                    else {
                        path.push(['L', point[0], point[1]]);
                    }
                };
                var someOutside = false, someInside = false;
                var points = poly.map(function (lonLat) {
                    var xy = postclip.forward(lonLat);
                    if (xy.outside) {
                        someOutside = true;
                    }
                    else {
                        someInside = true;
                    }
                    // Mercator projects pole points to Infinity, and
                    // clipPolygon is not able to handle it.
                    if (xy[1] === Infinity) {
                        xy[1] = 10e9;
                    }
                    else if (xy[1] === -Infinity) {
                        xy[1] = -10e9;
                    }
                    return xy;
                });
                if (projectingToPlane) {
                    // Wrap around in order for pointInPolygon to work
                    if (isPolygon) {
                        points.push(points[0]);
                    }
                    if (someOutside) {
                        // All points are outside
                        if (!someInside) {
                            return;
                        }
                        // Some inside, some outside. Clip to the bounds.
                        if (boundsPolygon) {
                            // Polygons
                            if (isPolygon) {
                                points = clipPolygon(points, boundsPolygon);
                                // Linestrings
                            }
                            else if (bounds) {
                                clipLineString(points, boundsPolygon)
                                    .forEach(function (points) {
                                    movedTo = false;
                                    points.forEach(pushToPath);
                                });
                                return;
                            }
                        }
                    }
                    points.forEach(pushToPath);
                    // For orthographic projection, or when a clipAngle applies
                }
                else {
                    for (var i = 0; i < points.length; i++) {
                        var lonLat = poly[i], point = points[i];
                        if (!point.outside) {
                            // In order to be able to interpolate if the first
                            // or last point is invalid (on the far side of the
                            // globe in an orthographic projection), we need to
                            // push the first valid point to the end of the
                            // polygon.
                            if (isPolygon && !firstValidLonLat) {
                                firstValidLonLat = lonLat;
                                poly.push(lonLat);
                                points.push(point);
                            }
                            // When entering the first valid point after a gap
                            // of invalid points, typically on the far side of
                            // the globe in an orthographic projection.
                            if (gap && lastValidLonLat) {
                                // For areas, in an orthographic projection, the
                                // great circle between two visible points will
                                // be close to the horizon. A possible exception
                                // may be when the two points are on opposite
                                // sides of the globe. It that poses a problem,
                                // we may have to rewrite this to use the small
                                // circle related to the current lon0 and lat0.
                                if (isPolygon && hasGeoProjection) {
                                    var greatCircle = Projection.greatCircle(lastValidLonLat, lonLat);
                                    greatCircle.forEach(function (lonLat) {
                                        return pushToPath(postclip.forward(lonLat));
                                    });
                                    // For lines, just jump over the gap
                                }
                                else {
                                    movedTo = false;
                                }
                            }
                            pushToPath(point);
                            lastValidLonLat = lonLat;
                            gap = false;
                        }
                        else {
                            gap = true;
                        }
                    }
                }
            });
        };
        if (geometry.type === 'LineString') {
            addToPath(geometry.coordinates);
        }
        else if (geometry.type === 'MultiLineString') {
            geometry.coordinates.forEach(function (c) { return addToPath(c); });
        }
        else if (geometry.type === 'Polygon') {
            geometry.coordinates.forEach(function (c) { return addToPath(c); });
            if (path.length) {
                path.push(['Z']);
            }
        }
        else if (geometry.type === 'MultiPolygon') {
            geometry.coordinates.forEach(function (polygons) {
                polygons.forEach(function (c) { return addToPath(c); });
            });
            if (path.length) {
                path.push(['Z']);
            }
        }
        return path;
    };
    Projection.registry = registry;
    return Projection;
}());
export default Projection;
