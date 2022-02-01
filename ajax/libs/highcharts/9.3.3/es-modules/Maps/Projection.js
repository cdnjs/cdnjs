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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import registry from './Projections/ProjectionRegistry.js';
import U from '../Core/Utilities.js';
var erase = U.erase;
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
        var name = options.name, rotation = options.rotation;
        this.rotator = rotation ? this.getRotator(rotation) : void 0;
        this.def = name ? Projection.registry[name] : void 0;
        var _a = this, def = _a.def, rotator = _a.rotator;
        if (def) {
            if (def.init) {
                def.init(options);
            }
            this.maxLatitude = def.maxLatitude || 90;
            this.hasGeoProjection = true;
        }
        if (rotator && def) {
            this.forward = function (lonLat) {
                lonLat = rotator.forward(lonLat);
                return def.forward(lonLat);
            };
            this.inverse = function (xy) {
                var lonLat = def.inverse(xy);
                return rotator.inverse(lonLat);
            };
        }
        else if (def) {
            this.forward = def.forward;
            this.inverse = def.inverse;
        }
        else if (rotator) {
            this.forward = rotator.forward;
            this.inverse = rotator.inverse;
        }
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
                    poly.splice.apply(poly, __spreadArrays([i + 1, 0], greatCircle));
                }
            }
        }
    };
    Projection.toString = function (options) {
        var _a = options || {}, name = _a.name, rotation = _a.rotation;
        return [name, rotation && rotation.join(',')].join(';');
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
    // Project an xy chart coordinate position to lonlat. Dynamically overridden
    // when projection is set.
    Projection.prototype.inverse = function (xy) {
        return xy;
    };
    Projection.prototype.clipOnAntimeridian = function (poly, isPolygon) {
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
                var fraction = (antimeridian - previousLonLat[0]) /
                    (lonLat[0] - previousLonLat[0]);
                var lat = previousLonLat[1] +
                    fraction * (lonLat[1] - previousLonLat[1]);
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
                    var slice = poly.splice.apply(poly, __spreadArrays([index,
                        intersections[i + 1].i - index], Projection.greatCircle([lonPlus, intersections[i].lat], [lonPlus, intersections[i + 1].lat], true)));
                    // Add interpolated points close to the cut
                    slice.push.apply(slice, Projection.greatCircle([lonMinus, intersections[i + 1].lat], [lonMinus, intersections[i].lat], true));
                    polygons.push(slice);
                    i -= 2;
                }
                // Insert dummy points close to the pole
                if (polarIntersection) {
                    for (var i_1 = 0; i_1 < polygons.length; i_1++) {
                        var poly_1 = polygons[i_1];
                        var indexOf = poly_1.indexOf(polarIntersection.lonLat);
                        if (indexOf > -1) {
                            var polarLatitude = (polarIntersection.lat < 0 ? -1 : 1) *
                                this.maxLatitude;
                            var lon1 = wrapLon(antimeridian +
                                polarIntersection.direction * floatCorrection);
                            var lon2 = wrapLon(antimeridian -
                                polarIntersection.direction * floatCorrection);
                            var polarSegment = Projection.greatCircle([lon1, polarIntersection.lat], [lon1, polarLatitude], true).concat(Projection.greatCircle([lon2, polarLatitude], [lon2, polarIntersection.lat], true));
                            poly_1.splice.apply(poly_1, __spreadArrays([indexOf,
                                0], polarSegment));
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
        // Insert great circles along the cuts
        /*
        if (isPolygon && polygons.length > 1 || polarIntersection) {
            polygons.forEach(Projection.insertGreatCircles);
        }
        */
        return polygons;
    };
    // Take a GeoJSON geometry and return a translated SVGPath
    Projection.prototype.path = function (geometry) {
        var _this = this;
        var _a = this, def = _a.def, rotator = _a.rotator;
        var antimeridian = 180;
        var path = [];
        var isPolygon = geometry.type === 'Polygon' ||
            geometry.type === 'MultiPolygon';
        // @todo: It doesn't really have to do with whether north is
        // positive. It depends on whether the coordinates are
        // pre-projected.
        var hasGeoProjection = this.hasGeoProjection;
        // @todo better test for when to do this
        var projectingToPlane = this.options.name !== 'Orthographic';
        // We need to rotate in a separate step before applying antimeridian
        // clipping
        var preclip = projectingToPlane ? rotator : void 0;
        var postclip = projectingToPlane ? (def || this) : this;
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
                    polygons = _this.clipOnAntimeridian(poly, isPolygon);
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
                for (var i = 0; i < poly.length; i++) {
                    var lonLat = poly[i];
                    var point = postclip.forward(lonLat);
                    var valid = (!isNaN(point[0]) &&
                        !isNaN(point[1]) &&
                        (!hasGeoProjection ||
                            // Limited projections like Web Mercator
                            (lonLat[1] <= _this.maxLatitude &&
                                lonLat[1] >= -_this.maxLatitude)));
                    if (valid) {
                        // In order to be able to interpolate if the first or
                        // last point is invalid (on the far side of the globe
                        // in an orthographic projection), we need to push the
                        // first valid point to the end of the polygon.
                        if (isPolygon && !firstValidLonLat) {
                            firstValidLonLat = lonLat;
                            poly.push(lonLat);
                        }
                        // When entering the first valid point after a gap of
                        // invalid points, typically on the far side of the
                        // globe in an orthographic projection.
                        if (gap && lastValidLonLat) {
                            // For areas, in an orthographic projection, the
                            // great circle between two visible points will be
                            // close to the horizon. A possible exception may be
                            // when the two points are on opposite sides of the
                            // globe. It that poses a problem, we may have to
                            // rewrite this to use the small circle related to
                            // the current lon0 and lat0.
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
