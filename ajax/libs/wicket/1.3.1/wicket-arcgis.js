/** @license
 *
 *  Copyright (C) 2012 K. Arthur Endsley (kaendsle@mtu.edu)
 *  Michigan Tech Research Institute (MTRI)
 *  3600 Green Court, Suite 100, Ann Arbor, MI, 48105
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

if (!Array.prototype.map) {
    Array.prototype.map = function (fun /* thisArg? */) {
        'use strict';
        var t, len, res, thisArg;

        if (this === void 0 || this === null) {
            throw new TypeError();
        }

        t = Object(this);
        len = t.length >>> 0;

        if (typeof fun !== 'function') {
            throw new TypeError();
        }

        res = new Array(len);
        thisArg = arguments.length >= 2 ? arguments[1] : void 0;

        for (var i = 0; i < len; i++) {
            // NOTE: Absolute correctness would demand Object.defineProperty
            //       be used.  But this method is fairly new, and failure is
            //       possible only if Object.prototype or Array.prototype
            //       has a property |i| (very unlikely), so use a less-correct
            //       but more portable alternative.
            if (i in t) {
                res[i] = fun.call(thisArg, t[i], i, t);
            }
        }

        return res;
    };
}

/**
 * @augments Wkt.Wkt
 * A framework-dependent flag, set for each Wkt.Wkt() instance, that indicates
 * whether or not a closed polygon geometry should be interpreted as a rectangle.
 */
Wkt.Wkt.prototype.isRectangle = false;

/**
 * @augments Wkt.Wkt
 * An object of framework-dependent construction methods used to generate
 * objects belonging to the various geometry classes of the framework.
 */
Wkt.Wkt.prototype.construct = {
    /**
     * Creates the framework's equivalent point geometry object.
     * @param   config      {Object}    An optional properties hash the object should use
     * @param   component   {Object}    An optional component to build from
     * @return              {esri.geometry.Point}
     */
    point: function (config, component) {
        var coord = component || this.components;
        if (coord instanceof Array) {
            coord = coord[0];
        }

        if (config) {
            // Allow the specification of a coordinate system
            coord.spatialReference = config.spatialReference || config.srs;
        }

        return new esri.geometry.Point(coord);
    },

    /**
     * Creates the framework's equivalent multipoint geometry object.
     * @param   config  {Object}    An optional properties hash the object should use
     * @return          {esri.geometry.Multipoint}
     */
    multipoint: function (config) {
        config = config || {};
        if (!config.spatialReference && config.srs) {
            config.spatialReference = config.srs;
        }

        return new esri.geometry.Multipoint({
            // Create an Array of [x, y] coords from each point among the components
            points: this.components.map(function (i) {
                if (Wkt.isArray(i)) {
                    i = i[0]; // Unwrap coords
                }
                return [i.x, i.y];
            }),
            spatialReference: config.spatialReference
        });
    },

    /**
     * Creates the framework's equivalent linestring geometry object.
     * @param   config      {Object}    An optional properties hash the object should use
     * @return              {esri.geometry.Polyline}
     */
    linestring: function (config) {
        config = config || {};
        if (!config.spatialReference && config.srs) {
            config.spatialReference = config.srs;
        }

        return new esri.geometry.Polyline({
            // Create an Array of paths...
            paths: [
                this.components.map(function (i) {
                    return [i.x, i.y];
                })
            ],
            spatialReference: config.spatialReference
        });
    },

    /**
     * Creates the framework's equivalent multilinestring geometry object.
     * @param   config      {Object}    An optional properties hash the object should use
     * @return              {esri.geometry.Polyline}
     */
    multilinestring: function (config) {
        config = config || {};
        if (!config.spatialReference && config.srs) {
            config.spatialReference = config.srs;
        }

        return new esri.geometry.Polyline({
            // Create an Array of paths...
            paths: this.components.map(function (i) {
                // ...Within which are Arrays of coordinate pairs (vertices)
                return i.map(function (j) {
                    return [j.x, j.y];
                });
            }),
            spatialReference: config.spatialReference
        });
    },

    /**
     * Creates the framework's equivalent polygon geometry object.
     * @param   config      {Object}    An optional properties hash the object should use
     * @return              {esri.geometry.Polygon}
     */
    polygon: function (config) {
        config = config || {};
        if (!config.spatialReference && config.srs) {
            config.spatialReference = config.srs;
        }

        return new esri.geometry.Polygon({
            // Create an Array of rings...
            rings: this.components.map(function (i) {
                // ...Within which are Arrays of coordinate pairs (vertices)
                return i.map(function (j) {
                    return [j.x, j.y];
                });
            }),
            spatialReference: config.spatialReference
        });
    },

    /**
     * Creates the framework's equivalent multipolygon geometry object.
     * @param   config      {Object}    An optional properties hash the object should use
     * @return              {esri.geometry.Polygon}
     */
    multipolygon: function (config) {
        var that = this;
        config = config || {};
        if (!config.spatialReference && config.srs) {
            config.spatialReference = config.srs;
        }

        return new esri.geometry.Polygon({
            // Create an Array of rings...
            rings: (function () {
                var i, j, holey, newRings, rings;

                holey = false; // Assume there are no inner rings (holes)
                rings = that.components.map(function (i) {
                    // ...Within which are Arrays of (outer) rings (polygons)
                    var rings = i.map(function (j) {
                        // ...Within which are (possibly) Arrays of (inner) rings (holes)
                        return j.map(function (k) {
                            return [k.x, k.y];
                        });
                    });

                    holey = (rings.length > 1);

                    return rings;
                });

                if (!holey && rings[0].length > 1) { // Easy, if there are no inner rings (holes)
                    // But we add the second condition to check that we're not too deeply nested
                    return rings;
                }

                newRings = [];
                for (i = 0; i < rings.length; i += 1) {
                    if (rings[i].length > 1) {
                        for (j = 0; j < rings[i].length; j += 1) {
                            newRings.push(rings[i][j]);
                        }
                    } else {
                        newRings.push(rings[i][0]);
                    }
                }

                return newRings;

            }()),
            spatialReference: config.spatialReference
        });
    }

};

/**
 * A test for determining whether one ring is an inner ring of another; tests
 * to see whether the first argument (ring1) is an inner ring of the second
 * (ring2) argument
 * @param   ring1   {Array} An Array of vertices that describe a ring in an esri.geometry.Polygon instance
 * @param   ring2   {Array} An Array of vertices that describe a ring in an esri.geometry.Polygon instance
 * @param   srs     {esri.SpatialReference} The SRS to conduct this test within
 * @return          {Boolean}
 */
Wkt.isInnerRingOf = function (ring1, ring2, srs) {
    var contained, i, ply, pnt;

    // Though less common, we assume that the first ring is an inner ring of the
    //  second as this is a stricter case (all vertices must be contained);
    //  we'll test this against the contrary where at least one vertex of the
    //  first ring is not contained by the second ring (ergo, not an inner ring)
    contained = true;

    ply = new esri.geometry.Polygon({ // Create single polygon from second ring
        rings: ring2.map(function (i) {
            // ...Within which are Arrays of coordinate pairs (vertices)
            return i.map(function (j) {
                return [j.x, j.y];
            });
        }),
        spatialReference: srs
    });

    for (i = 0; i < ring1.length; i += 1) {
        // Sample a vertex of the first ring
        pnt = new esri.geometry.Point(ring1[i].x, ring1[i].y, srs);

        // Now we have a test for inner rings: if the second ring does not
        //  contain every vertex of the first, then the first ring cannot be
        //  an inner ring of the second
        if (!ply.contains(pnt)) {
            contained = false;
            break;
        }
    }

    return contained;
};

/**
 * @augments Wkt.Wkt
 * A framework-dependent deconstruction method used to generate internal
 * geometric representations from instances of framework geometry. This method
 * uses object detection to attempt to classify members of framework geometry
 * classes into the standard WKT types.
 * @param   obj {Object}    An instance of one of the framework's geometry classes
 * @return      {Object}    A hash of the 'type' and 'components' thus derived
 */
Wkt.Wkt.prototype.deconstruct = function (obj) {
    var i, j, paths, rings, verts;

    // esri.geometry.Point /////////////////////////////////////////////////////
    if (obj.constructor === esri.geometry.Point) {

        return {
            type: 'point',
            components: [{
                x: obj.x,
                y: obj.y
            }]
        };

    }

    // esri.geometry.Multipoint ////////////////////////////////////////////////
    if (obj.constructor === esri.geometry.Multipoint) {

        verts = [];
        for (i = 0; i < obj.points.length; i += 1) {
            verts.push([{
                x: obj.points[i][0],
                y: obj.points[i][1]
            }]);
        }

        return {
            type: 'multipoint',
            components: verts
        };

    }

    // esri.geometry.Polyline //////////////////////////////////////////////////
    if (obj.constructor === esri.geometry.Polyline) {

        paths = [];
        for (i = 0; i < obj.paths.length; i += 1) {
            verts = [];
            for (j = 0; j < obj.paths[i].length; j += 1) {
                verts.push({
                    x: obj.paths[i][j][0], // First item is longitude, second is latitude
                    y: obj.paths[i][j][1]
                });
            }
            paths.push(verts);
        }

        if (obj.paths.length > 1) { // More than one path means more than one linestring
            return {
                type: 'multilinestring',
                components: paths
            };
        }

        return {
            type: 'linestring',
            components: verts
        };

    }

    // esri.geometry.Polygon ///////////////////////////////////////////////////
    if (obj.constructor === esri.geometry.Polygon || obj.constructor === esri.geometry.Circle) {

        rings = [];
        for (i = 0; i < obj.rings.length; i += 1) {
            verts = [];

            for (j = 0; j < obj.rings[i].length; j += 1) {
                verts.push({
                    x: obj.rings[i][j][0], // First item is longitude, second is latitude
                    y: obj.rings[i][j][1]
                });
            }

            if (i > 0) {
                if (Wkt.isInnerRingOf(verts, rings[rings.length - 1], obj.spatialReference)) {
                    rings[rings.length - 1].push(verts);
                } else {
                    rings.push([verts]);
                }
            } else {
                rings.push([verts]);
            }

        }

        if (rings.length > 1) {
            return {
                type: 'multipolygon',
                components: rings
            };
        }

        return {
            type: 'polygon',
            components: rings[0]
        };

    }
};
