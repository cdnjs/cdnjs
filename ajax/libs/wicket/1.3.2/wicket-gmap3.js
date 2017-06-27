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
(function (Wkt) {

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
         * @return              {google.maps.Marker}
         */
        point: function (config, component) {
            var c = component || this.components;

            config = config || {};

            config.position = new google.maps.LatLng(c[0].y, c[0].x);

            return new google.maps.Marker(config);
        },

        /**
         * Creates the framework's equivalent multipoint geometry object.
         * @param   config  {Object}    An optional properties hash the object should use
         * @return          {Array}     Array containing multiple google.maps.Marker
         */
        multipoint: function (config) {
            var i, c, arr;

            c = this.components;

            config = config || {};

            arr = [];

            for (i = 0; i < c.length; i += 1) {
                arr.push(this.construct.point(config, c[i]));
            }

            return arr;
        },

        /**
         * Creates the framework's equivalent linestring geometry object.
         * @param   config      {Object}    An optional properties hash the object should use
         * @param   component   {Object}    An optional component to build from
         * @return              {google.maps.Polyline}
         */
        linestring: function (config, component) {
            var i, c;

            c = component || this.components;

            config = config || {
                editable: false
            };

            config.path = [];

            for (i = 0; i < c.length; i += 1) {
                config.path.push(new google.maps.LatLng(c[i].y, c[i].x));
            }

            return new google.maps.Polyline(config);
        },

        /**
         * Creates the framework's equivalent multilinestring geometry object.
         * @param   config  {Object}    An optional properties hash the object should use
         * @return          {Array}     Array containing multiple google.maps.Polyline instances
         */
        multilinestring: function (config) {
            var i, c, arr;

            c = this.components;

            config = config || {
                editable: false
            };

            config.path = [];

            arr = [];

            for (i = 0; i < c.length; i += 1) {
                arr.push(this.construct.linestring(config, c[i]));
            }

            return arr;
        },

        /**
         * Creates the framework's equivalent Box or Rectangle geometry object.
         * @param   config      {Object}    An optional properties hash the object should use
         * @param   component   {Object}    An optional component to build from
         * @return              {google.maps.Rectangle}
         */
        box: function (config, component) {
            var c = component || this.components;

            config = config || {};

            config.bounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(c[0].y, c[0].x),
                new google.maps.LatLng(c[1].y, c[1].x));

            return new google.maps.Rectangle(config);
        },

        /**
         * Creates the framework's equivalent polygon geometry object.
         * @param   config      {Object}    An optional properties hash the object should use
         * @param   component   {Object}    An optional component to build from
         * @return              {google.maps.Polygon}
         */
        polygon: function (config, component) {
            var j, k, c, rings, verts;

            var polygonIsClockwise = function (coords) {
				var area = 0,
					j = null,
					i = 0;

				for (i = 0; i < coords.length; i++) {
					j = (i + 1) % coords.length;
					area += coords[i].x * coords[j].x;
					area -= coords[j].y * coords[i].y;
				}

				return area > 0;
			};

            c = component || this.components;

            config = config || {
                editable: false // Editable geometry off by default
            };

            config.paths = [];

            rings = [];
            for (j = 0; j < c.length; j += 1) { // For each ring...

                verts = [];
                // NOTE: We iterate to one (1) less than the Array length to skip the last vertex
                for (k = 0; k < c[j].length - 1; k += 1) { // For each vertex...
                    verts.push(new google.maps.LatLng(c[j][k].y, c[j][k].x));

                } // eo for each vertex

                if (j !== 0) {
                   // Orient inner rings correctly
					if (polygonIsClockwise(c[j]) && this.type == 'polygon') {
						verts.reverse();
					}
                }

                rings.push(verts);
            } // eo for each ring

            config.paths = config.paths.concat(rings);

            if (this.isRectangle) {
                return (function () {
                    var bounds, v;

                    bounds = new google.maps.LatLngBounds();

                    for (v in rings[0]) { // Ought to be only 1 ring in a Rectangle
                        if (rings[0].hasOwnProperty(v)) {
                            bounds.extend(rings[0][v]);
                        }
                    }

                    return new google.maps.Rectangle({
                        bounds: bounds
                    });
                }());
            } else {
                return new google.maps.Polygon(config);
            }
        },

        /**
         * Creates the framework's equivalent multipolygon geometry object.
         * @param   config  {Object}    An optional properties hash the object should use
         * @return          {Array}     Array containing multiple google.maps.Polygon
         */
        multipolygon: function (config) {
            var i, c, arr;

            c = this.components;

            config = config || {
                editable: false
            };

            config.path = [];

            arr = [];

            for (i = 0; i < c.length; i += 1) {
                arr.push(this.construct.polygon(config, c[i]));
            }

            return arr;
        }

    };

    /**
     * @augments Wkt.Wkt
     * A framework-dependent deconstruction method used to generate internal
     * geometric representations from instances of framework geometry. This method
     * uses object detection to attempt to classify members of framework geometry
     * classes into the standard WKT types.
     * @param obj       {Object}    An instance of one of the framework's geometry classes
     * @param multiFlag {Boolean} If true, then the deconstructor will be forced to return a MultiGeometry (multipoint, multilinestring or multipolygon)
     * @return          {Object}    A hash of the 'type' and 'components' thus derived, plus the WKT string of the feature.
     */
    Wkt.Wkt.prototype.deconstruct = function (obj, multiFlag) {
        var features, i, j, multiFlag, verts, rings, sign, tmp, response, lat, lng;

        // Shortcut to signed area function (determines clockwise vs counter-clock)
        if (google.maps.geometry) {
          sign = google.maps.geometry.spherical.computeSignedArea;
        };

        // google.maps.LatLng //////////////////////////////////////////////////////
        if (obj.constructor === google.maps.LatLng) {

            response = {
                type: 'point',
                components: [{
                    x: obj.lng(),
                    y: obj.lat()
                }]
            };
            return response;
        }

        // google.maps.Point //////////////////////////////////////////////////////
        if (obj.constructor === google.maps.Point) {
            response = {
                type: 'point',
                components: [{
                    x: obj.x,
                    y: obj.y
                }]
            };
            return response;
        }

        // google.maps.Marker //////////////////////////////////////////////////////
        if (obj.constructor === google.maps.Marker) {
            response = {
                type: 'point',
                components: [{
                    x: obj.getPosition().lng(),
                    y: obj.getPosition().lat()
                }]
            };
            return response;
        }

        // google.maps.Polyline ////////////////////////////////////////////////////
        if (obj.constructor === google.maps.Polyline) {

            verts = [];
            for (i = 0; i < obj.getPath().length; i += 1) {
                tmp = obj.getPath().getAt(i);
                verts.push({
                    x: tmp.lng(),
                    y: tmp.lat()
                });
            }
            response = {
                type: 'linestring',
                components: verts
            };
            return response;

        }

        // google.maps.Polygon /////////////////////////////////////////////////////
        if (obj.constructor === google.maps.Polygon) {

            rings = [];

            if (multiFlag === undefined) {
                multiFlag = (function () {
                    var areas, i, l;

                    l = obj.getPaths().length;
                    if (l <= 1) { // Trivial; this is a single polygon
                        return false;
                    }

                    if (l === 2) {
                        // If clockwise*clockwise or counter*counter, i.e.
                        //  (-1)*(-1) or (1)*(1), then result would be positive
                        if (sign(obj.getPaths().getAt(0)) * sign(obj.getPaths().getAt(1)) < 0) {
                            return false; // Most likely single polygon with 1 hole
                        }

                        return true;
                    }

                    // Must be longer than 3 polygons at this point...
                    areas = obj.getPaths().getArray().map(function (k) {
                        return sign(k) / Math.abs(sign(k)); // Unit normalization (outputs 1 or -1)
                    });

                    // If two clockwise or two counter-clockwise rings are found
                    //  (at different indices)...
                    if (areas.indexOf(areas[0]) !== areas.lastIndexOf(areas[0])) {
                        multiFlag = true; // Flag for holes in one or more polygons
                        return true;
                    }

                    return false;

                }());
            }

            for (i = 0; i < obj.getPaths().length; i += 1) { // For each polygon (ring)...
                tmp = obj.getPaths().getAt(i);
                verts = [];
                for (j = 0; j < obj.getPaths().getAt(i).length; j += 1) { // For each vertex...
                    verts.push({
                        x: tmp.getAt(j).lng(),
                        y: tmp.getAt(j).lat()
                    });

                }

                if (!tmp.getAt(tmp.length - 1).equals(tmp.getAt(0))) {
                    if (i % 2 !== 0) { // In inner rings, coordinates are reversed...
                        verts.unshift({ // Add the first coordinate again for closure
                            x: tmp.getAt(tmp.length - 1).lng(),
                            y: tmp.getAt(tmp.length - 1).lat()
                        });

                    } else {
                        verts.push({ // Add the first coordinate again for closure
                            x: tmp.getAt(0).lng(),
                            y: tmp.getAt(0).lat()
                        });

                    }

                }

                if (obj.getPaths().length > 1 && i > 0) {
                    // If this and the last ring have the same signs...
                    if (sign(obj.getPaths().getAt(i)) > 0 && sign(obj.getPaths().getAt(i - 1)) > 0 ||
                        sign(obj.getPaths().getAt(i)) < 0 && sign(obj.getPaths().getAt(i - 1)) < 0 && !multiFlag) {
                        // ...They must both be inner rings (or both be outer rings, in a multipolygon)
                        verts = [verts]; // Wrap multipolygons once more (collection)
                    }

                }

                //TODO This makes mistakes when a second polygon has holes; it sees them all as individual polygons
                if (i % 2 !== 0) { // In inner rings, coordinates are reversed...
                    verts.reverse();
                }
                rings.push(verts);
            }

            response = {
                type: (multiFlag) ? 'multipolygon' : 'polygon',
                components: rings
            };
            return response;

        }

        // google.maps.Circle //////////////////////////////////////////////////////
        if (obj.constructor === google.maps.Circle) {
            var point = obj.getCenter();
            var radius = obj.getRadius();
            verts = [];
            var d2r = Math.PI / 180; // degrees to radians
            var r2d = 180 / Math.PI; // radians to degrees
            radius = radius / 1609; // meters to miles
            var earthsradius = 3963; // 3963 is the radius of the earth in miles
            var num_seg = 32; // number of segments used to approximate a circle
            var rlat = (radius / earthsradius) * r2d;
            var rlng = rlat / Math.cos(point.lat() * d2r);

            for (var n = 0; n <= num_seg; n++) {
                var theta = Math.PI * (n / (num_seg / 2));
                lng = point.lng() + (rlng * Math.cos(theta)); // center a + radius x * cos(theta)
                lat = point.lat() + (rlat * Math.sin(theta)); // center b + radius y * sin(theta)
                verts.push({
                    x: lng,
                    y: lat
                });
            }

            response = {
                type: 'polygon',
                components: [verts]
            };

            return response;

        }

        // google.maps.LatLngBounds ///////////////////////////////////////////////////
        if (obj.constructor === google.maps.LatLngBounds) {

            tmp = obj;
            verts = [];
            verts.push({ // NW corner
                x: tmp.getSouthWest().lng(),
                y: tmp.getNorthEast().lat()
            });

            verts.push({ // NE corner
                x: tmp.getNorthEast().lng(),
                y: tmp.getNorthEast().lat()
            });

            verts.push({ // SE corner
                x: tmp.getNorthEast().lng(),
                y: tmp.getSouthWest().lat()
            });

            verts.push({ // SW corner
                x: tmp.getSouthWest().lng(),
                y: tmp.getSouthWest().lat()
            });

            verts.push({ // NW corner (again, for closure)
                x: tmp.getSouthWest().lng(),
                y: tmp.getNorthEast().lat()
            });


            response = {
                type: 'polygon',
                isRectangle: true,
                components: [verts]
            };

            return response;

        }

        // google.maps.Rectangle ///////////////////////////////////////////////////
        if (obj.constructor === google.maps.Rectangle) {

            tmp = obj.getBounds();
            verts = [];
            verts.push({ // NW corner
                x: tmp.getSouthWest().lng(),
                y: tmp.getNorthEast().lat()
            });

            verts.push({ // NE corner
                x: tmp.getNorthEast().lng(),
                y: tmp.getNorthEast().lat()
            });

            verts.push({ // SE corner
                x: tmp.getNorthEast().lng(),
                y: tmp.getSouthWest().lat()
            });

            verts.push({ // SW corner
                x: tmp.getSouthWest().lng(),
                y: tmp.getSouthWest().lat()
            });

            verts.push({ // NW corner (again, for closure)
                x: tmp.getSouthWest().lng(),
                y: tmp.getNorthEast().lat()
            });


            response = {
                type: 'polygon',
                isRectangle: true,
                components: [verts]
            };

            return response;

        }

        // google.maps.Data Geometry Types /////////////////////////////////////////////////////

        // google.maps.Data.Feature /////////////////////////////////////////////////////
        if (obj.constructor === google.maps.Data.Feature) {
            return this.deconstruct.call(this, obj.getGeometry());
        }

        // google.maps.Data.Point /////////////////////////////////////////////////////
        if (obj.constructor === google.maps.Data.Point) {
            //console.log('It is a google.maps.Data.Point');
            response = {
                type: 'point',
                components: [{
                    x: obj.get().lng(),
                    y: obj.get().lat()
                }]
            };
            return response;
        }

        // google.maps.Data.LineString /////////////////////////////////////////////////////
        if (obj.constructor === google.maps.Data.LineString) {
            verts = [];
            //console.log('It is a google.maps.Data.LineString');
            for (i = 0; i < obj.getLength(); i += 1) {
                vertex = obj.getAt(i);
                verts.push({
                    x: vertex.lng(),
                    y: vertex.lat()
                });
            }
            response = {
                type: 'linestring',
                components: verts
            };
            return response;
        }




        // google.maps.Data.Polygon /////////////////////////////////////////////////////
        if (obj.constructor === google.maps.Data.Polygon) {
            var rings = [];
            //console.log('It is a google.maps.Data.Polygon');
            for (i = 0; i < obj.getLength(); i += 1) { // For each ring...
                ring = obj.getAt(i);
                var verts = [];
                for (j = 0; j < ring.getLength(); j += 1) { // For each vertex...
                    vertex = ring.getAt(j);
                    verts.push({
                        x: vertex.lng(),
                        y: vertex.lat()
                    });
                }
                verts.push({
                    x: ring.getAt(0).lng(),
                    y: ring.getAt(0).lat()
                });

                rings.push(verts);
            }
            response = {
                type: 'polygon',
                components: rings
            };

            return response;
        }


        // google.maps.Data.MultiPoint /////////////////////////////////////////////////////
        if (obj.constructor === google.maps.Data.MultiPoint) {
            verts = [];
            for (i = 0; i < obj.getLength(); i += 1) {
                vertex = obj.getAt(i);
                verts.push([{
                    x: vertex.lng(),
                    y: vertex.lat()
                }]);
            }
            response = {
                type: 'multipoint',
                components: verts
            };
            return response;
        }

        // google.maps.Data.MultiLineString /////////////////////////////////////////////////////
        if (obj.constructor === google.maps.Data.MultiLineString) {
            linestrings = []
            for (i = 0; i < obj.getLength(); i += 1) {
                verts = [];
                var linestring = obj.getAt(i);
                for (j = 0; j < linestring.getLength(); j += 1) {
                    vertex = linestring.getAt(j);
                    verts.push({
                        x: vertex.lng(),
                        y: vertex.lat()
                    });
                }
                linestrings.push(verts);
            }
            response = {
                type: 'multilinestring',
                components: linestrings
            };
            return response;
        }

        // google.maps.Data.MultiPolygon /////////////////////////////////////////////////////
        if (obj.constructor === google.maps.Data.MultiPolygon) {

            var polygons = [];

            //console.log('It is a google.maps.Data.MultiPolygon');
            for (k = 0; k < obj.getLength(); k += 1) { // For each multipolygon
                var polygon = obj.getAt(k);
                var rings = [];
                for (i = 0; i < polygon.getLength(); i += 1) { // For each ring...
                    ring = polygon.getAt(i);
                    var verts = [];
                    for (j = 0; j < ring.getLength(); j += 1) { // For each vertex...
                        vertex = ring.getAt(j);
                        verts.push({
                            x: vertex.lng(),
                            y: vertex.lat()
                        });
                    }
                    verts.push({
                        x: ring.getAt(0).lng(),
                        y: ring.getAt(0).lat()
                    });

                    rings.push(verts);
                }
                polygons.push(rings);
            }

            response = {
                type: 'multipolygon',
                components: polygons
            };
            return response;
        }

        // google.maps.Data.GeometryCollection /////////////////////////////////////////////////////
        if (obj.constructor === google.maps.Data.GeometryCollection) {

            var objects = [];
            for (k = 0; k < obj.getLength(); k += 1) { // For each multipolygon
                var object = obj.getAt(k);
                objects.push(this.deconstruct.call(this, object));
            }
            //console.log('It is a google.maps.Data.GeometryCollection', objects);
            response = {
                type: 'geometrycollection',
                components: objects
            };
            return response;
        }


        // Array ///////////////////////////////////////////////////////////////////
        if (Wkt.isArray(obj)) {
            features = [];

            for (i = 0; i < obj.length; i += 1) {
                features.push(this.deconstruct.call(this, obj[i], true));
            }

            response = {

                type: (function () {
                    var k, type = obj[0].constructor;

                    for (k = 0; k < obj.length; k += 1) {
                        // Check that all items have the same constructor as the first item
                        if (obj[k].constructor !== type) {
                            // If they don't, type is heterogeneous geometry collection
                            return 'geometrycollection';
                        }
                    }

                    switch (type) {
                    case google.maps.Marker:
                        return 'multipoint';
                    case google.maps.Polyline:
                        return 'multilinestring';
                    case google.maps.Polygon:
                        return 'multipolygon';
                    default:
                        return 'geometrycollection';
                    }

                }()),
                components: (function () {
                    // Pluck the components from each Wkt
                    var i, comps;

                    comps = [];
                    for (i = 0; i < features.length; i += 1) {
                        if (features[i].components) {
                            comps.push(features[i].components);
                        }
                    }

                    return {
                        comps: comps
                    };
                }())

            };
            response.components = response.components.comps;
            return response;

        }

        console.log('The passed object does not have any recognizable properties.');

    };
}(Wkt || require('./wicket')));
