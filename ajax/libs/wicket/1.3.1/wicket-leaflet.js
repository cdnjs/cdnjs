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

/**
 * @augments Wkt.Wkt
 * A framework-dependent flag, set for each Wkt.Wkt() instance, that indicates
 * whether or not a closed polygon geometry should be interpreted as a rectangle.
 */
Wkt.Wkt.prototype.isRectangle = false;

/**
 * @augments Wkt.Wkt
 * Truncates an Array of coordinates by the closing coordinate when it is
 * equal to the first coordinate given--this is only to be used for closed
 * geometries in order to provide merely an "implied" closure to Leaflet.
 * @param   coords  {Array}     An Array of x,y coordinates (objects)
 * @return          {Array}
 */
Wkt.Wkt.prototype.trunc = function (coords) {
    var i, verts = [];

    for (i = 0; i < coords.length; i += 1) {
        if (Wkt.isArray(coords[i])) {
            verts.push(this.trunc(coords[i]));

        } else {

            // Add the first coord, but skip the last if it is identical
            if (i === 0 || !this.sameCoords(coords[0], coords[i])) {
                verts.push(coords[i]);
            }
        }
    }

    return verts;
};

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
     * @return              {L.marker}
     */
    point: function (config, component) {
        var coord = component || this.components;
        if (coord instanceof Array) {
            coord = coord[0];
        }

        return L.marker(this.coordsToLatLng(coord), config);
    },

    /**
     * Creates the framework's equivalent multipoint geometry object.
     * @param   config  {Object}    An optional properties hash the object should use
     * @return          {L.featureGroup}
     */
    multipoint: function (config) {
        var i,
            layers = [],
            coords = this.components;

        for (i = 0; i < coords.length; i += 1) {
            layers.push(this.construct.point.call(this, config, coords[i]));
        }

        return L.featureGroup(layers, config);
    },

    /**
     * Creates the framework's equivalent linestring geometry object.
     * @param   config      {Object}    An optional properties hash the object should use
     * @param   component   {Object}    An optional component to build from
     * @return              {L.polyline}
     */
    linestring: function (config, component) {
        var coords = component || this.components,
            latlngs = this.coordsToLatLngs(coords);

        return L.polyline(latlngs, config);
    },

    /**
     * Creates the framework's equivalent multilinestring geometry object.
     * @param   config  {Object}    An optional properties hash the object should use
     * @return          {L.multiPolyline}
     */
    multilinestring: function (config) {
        var coords = this.components,
            latlngs = this.coordsToLatLngs(coords, 1);

        return L.multiPolyline(latlngs, config);
    },

    /**
     * Creates the framework's equivalent polygon geometry object.
     * @param   config      {Object}    An optional properties hash the object should use
     * @return              {L.multiPolygon}
     */
    polygon: function (config) {
        // Truncate the coordinates to remove the closing coordinate
        var coords = this.trunc(this.components),
            latlngs = this.coordsToLatLngs(coords, 1);
        return L.polygon(latlngs, config);
    },

    /**
     * Creates the framework's equivalent multipolygon geometry object.
     * @param   config  {Object}    An optional properties hash the object should use
     * @return          {L.multiPolygon}
     */
    multipolygon: function (config) {
        // Truncate the coordinates to remove the closing coordinate
        var coords = this.trunc(this.components),
            latlngs = this.coordsToLatLngs(coords, 2);

        return L.multiPolygon(latlngs, config);
    },

    /**
     * Creates the framework's equivalent collection of geometry objects.
     * @param   config  {Object}    An optional properties hash the object should use
     * @return          {L.featureGroup}
     */
    geometrycollection: function (config) {
        var comps, i, layers;

        comps = this.trunc(this.components);
        layers = [];
        for (i = 0; i < this.components.length; i += 1) {
            layers.push(this.construct[comps[i].type].call(this, comps[i]));
        }

        return L.featureGroup(layers, config);

    }
};

L.Util.extend(Wkt.Wkt.prototype, {
    coordsToLatLngs: L.GeoJSON.coordsToLatLngs,
    // TODO Why doesn't the coordsToLatLng function in L.GeoJSON already suffice?
    coordsToLatLng: function (coords, reverse) {
        var lat = reverse ? coords.x : coords.y,
            lng = reverse ? coords.y : coords.x;

        return L.latLng(lat, lng, true);
    }
});

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
    var attr, coordsFromLatLngs, features, i, verts, rings, tmp;

    /**
     * Accepts an Array (arr) of LatLngs from which it extracts each one as a
     *  vertex; calls itself recursively to deal with nested Arrays.
     */
    coordsFromLatLngs = function (arr) {
        var i, coords;

        coords = [];
        for (i = 0; i < arr.length; i += 1) {
            if (Wkt.isArray(arr[i])) {
                coords.push(coordsFromLatLngs(arr[i]));

            } else {
                coords.push({
                    x: arr[i].lng,
                    y: arr[i].lat
                });
            }
        }

        return coords;
    };

    // L.Marker ////////////////////////////////////////////////////////////////
    if (obj.constructor === L.Marker || obj.constructor === L.marker) {
        return {
            type: 'point',
            components: [{
                x: obj.getLatLng().lng,
                y: obj.getLatLng().lat
            }]
        };
    }

    // L.Rectangle /////////////////////////////////////////////////////////////
    if (obj.constructor === L.Rectangle || obj.constructor === L.rectangle) {
        tmp = obj.getBounds(); // L.LatLngBounds instance
        return {
            type: 'polygon',
            isRectangle: true,
            components: [
                [
                    { // NW corner
                        x: tmp.getSouthWest().lng,
                        y: tmp.getNorthEast().lat
                    },
                    { // NE corner
                        x: tmp.getNorthEast().lng,
                        y: tmp.getNorthEast().lat
                    },
                    { // SE corner
                        x: tmp.getNorthEast().lng,
                        y: tmp.getSouthWest().lat
                    },
                    { // SW corner
                        x: tmp.getSouthWest().lng,
                        y: tmp.getSouthWest().lat
                    },
                    { // NW corner (again, for closure)
                        x: tmp.getSouthWest().lng,
                        y: tmp.getNorthEast().lat
                    }
                ]
            ]
        };

    }

    // L.Polyline //////////////////////////////////////////////////////////////
    if (obj.constructor === L.Polyline || obj.constructor === L.polyline) {
        verts = [];
        tmp = obj.getLatLngs();

        if (!tmp[0].equals(tmp[tmp.length - 1])) {

            for (i = 0; i < tmp.length; i += 1) {
                verts.push({
                    x: tmp[i].lng,
                    y: tmp[i].lat
                });
            }

            return {
                type: 'linestring',
                components: verts
            };

        }
    }

    // L.Polygon ///////////////////////////////////////////////////////////////

    if (obj.constructor === L.Polygon || obj.constructor === L.polygon) {
        rings = [];
        verts = [];
        tmp = obj.getLatLngs();

        // First, we deal with the boundary points
        for (i = 0; i < obj._latlngs.length; i += 1) {
            verts.push({ // Add the first coordinate again for closure
                x: tmp[i].lng,
                y: tmp[i].lat
            });
        }

        verts.push({ // Add the first coordinate again for closure
            x: tmp[0].lng,
            y: tmp[0].lat
        });

        rings.push(verts);

        // Now, any holes
        if (obj._holes && obj._holes.length > 0) {
            // Reworked to support holes properly
            verts = coordsFromLatLngs(obj._holes);
            for (i=0; i < verts.length;i++) {
                verts[i].push(verts[i][0]); // Copy the beginning coords again for closure
                rings.push(verts[i]);
            }
        }

        return {
            type: 'polygon',
            components: rings
        };

    }

    // L.MultiPolyline /////////////////////////////////////////////////////////
    // L.MultiPolygon //////////////////////////////////////////////////////////
    // L.LayerGroup ////////////////////////////////////////////////////////////
    // L.FeatureGroup //////////////////////////////////////////////////////////
    if (obj.constructor === L.MultiPolyline || obj.constructor === L.MultiPolygon
            || obj.constructor === L.LayerGroup || obj.constructor === L.FeatureGroup) {

        features = [];
        tmp = obj._layers;

        for (attr in tmp) {
            if (tmp.hasOwnProperty(attr)) {
                if (tmp[attr].getLatLngs || tmp[attr].getLatLng) {
                    // Recursively deconstruct each layer
                    features.push(this.deconstruct(tmp[attr]));
                }
            }
        }

        return {

            type: (function () {
                switch (obj.constructor) {
                case L.MultiPolyline:
                    return 'multilinestring';
                case L.MultiPolygon:
                    return 'multipolygon';
                case L.FeatureGroup:
                    return (function () {
                        var i, mpgon, mpline, mpoint;

                        // Assume that all layers are of one type (any one type)
                        mpgon = true;
                        mpline = true;
                        mpoint = true;

                        for (i in obj._layers) {
                            if (obj._layers.hasOwnProperty(i)) {
                                if (obj._layers[i].constructor !== L.Marker) {
                                    mpoint = false;
                                }
                                if (obj._layers[i].constructor !== L.Polyline) {
                                    mpline = false;
                                }
                                if (obj._layers[i].constructor !== L.Polygon) {
                                    mpgon = false;
                                }
                            }
                        }

                        if (mpoint) {
                            return 'multipoint';
                        }
                        if (mpline) {
                            return 'multilinestring';
                        }
                        if (mpgon) {
                            return 'multipolygon';
                        }
                        return 'geometrycollection';

                    }());
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

                return comps;
            }())

        };

    }

    // L.Circle ////////////////////////////////////////////////////////////////
    if (obj.constructor === L.Rectangle || obj.constructor === L.rectangle) {
        console.log('Deconstruction of L.Circle objects is not yet supported');

    } else {
        console.log('The passed object does not have any recognizable properties.');
    }

};