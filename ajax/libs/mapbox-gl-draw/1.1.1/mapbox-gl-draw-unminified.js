(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.MapboxDraw = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var runSetup = require('./src/setup');

var setupOptions = require('./src/options');

var setupAPI = require('./src/api');

var Constants = require('./src/constants');

var setupDraw = function setupDraw(options, api) {
  options = setupOptions(options);
  var ctx = {
    options: options
  };
  api = setupAPI(ctx, api);
  ctx.api = api;
  var setup = runSetup(ctx);
  api.onAdd = setup.onAdd;
  api.onRemove = setup.onRemove;
  api.types = Constants.types;
  api.options = options;
  return api;
};

module.exports = function (options) {
  setupDraw(options, this);
};

module.exports.modes = require('./src/modes');

},{"./src/api":22,"./src/constants":23,"./src/modes":56,"./src/options":61,"./src/setup":63}],2:[function(require,module,exports){
module.exports = Extent;

function Extent(bbox) {
    if (!(this instanceof Extent)) {
        return new Extent(bbox);
    }
    this._bbox = bbox || [Infinity, Infinity, -Infinity, -Infinity];
    this._valid = !!bbox;
}

Extent.prototype.include = function(ll) {
    this._valid = true;
    this._bbox[0] = Math.min(this._bbox[0], ll[0]);
    this._bbox[1] = Math.min(this._bbox[1], ll[1]);
    this._bbox[2] = Math.max(this._bbox[2], ll[0]);
    this._bbox[3] = Math.max(this._bbox[3], ll[1]);
    return this;
};

Extent.prototype.equals = function(_) {
    var other;
    if (_ instanceof Extent) { other = _.bbox(); } else { other = _; }
    return this._bbox[0] == other[0] &&
        this._bbox[1] == other[1] &&
        this._bbox[2] == other[2] &&
        this._bbox[3] == other[3];
};

Extent.prototype.center = function(_) {
    if (!this._valid) return null;
    return [
        (this._bbox[0] + this._bbox[2]) / 2,
        (this._bbox[1] + this._bbox[3]) / 2]
};

Extent.prototype.union = function(_) {
    this._valid = true;
    var other;
    if (_ instanceof Extent) { other = _.bbox(); } else { other = _; }
    this._bbox[0] = Math.min(this._bbox[0], other[0]);
    this._bbox[1] = Math.min(this._bbox[1], other[1]);
    this._bbox[2] = Math.max(this._bbox[2], other[2]);
    this._bbox[3] = Math.max(this._bbox[3], other[3]);
    return this;
};

Extent.prototype.bbox = function() {
    if (!this._valid) return null;
    return this._bbox;
};

Extent.prototype.contains = function(ll) {
    if (!ll) return this._fastContains();
    if (!this._valid) return null;
    var lon = ll[0], lat = ll[1];
    return this._bbox[0] <= lon &&
        this._bbox[1] <= lat &&
        this._bbox[2] >= lon &&
        this._bbox[3] >= lat;
};

Extent.prototype.intersect = function(_) {
    if (!this._valid) return null;

    var other;
    if (_ instanceof Extent) { other = _.bbox(); } else { other = _; }

    return !(
      this._bbox[0] > other[2] ||
      this._bbox[2] < other[0] ||
      this._bbox[3] < other[1] ||
      this._bbox[1] > other[3]
    );
};

Extent.prototype._fastContains = function() {
    if (!this._valid) return new Function('return null;');
    var body = 'return ' +
        this._bbox[0] + '<= ll[0] &&' +
        this._bbox[1] + '<= ll[1] &&' +
        this._bbox[2] + '>= ll[0] &&' +
        this._bbox[3] + '>= ll[1]';
    return new Function('ll', body);
};

Extent.prototype.polygon = function() {
    if (!this._valid) return null;
    return {
        type: 'Polygon',
        coordinates: [
            [
                // W, S
                [this._bbox[0], this._bbox[1]],
                // E, S
                [this._bbox[2], this._bbox[1]],
                // E, N
                [this._bbox[2], this._bbox[3]],
                // W, N
                [this._bbox[0], this._bbox[3]],
                // W, S
                [this._bbox[0], this._bbox[1]]
            ]
        ]
    };
};

},{}],3:[function(require,module,exports){
var wgs84 = require('wgs84');

module.exports.geometry = geometry;
module.exports.ring = ringArea;

function geometry(_) {
    var area = 0, i;
    switch (_.type) {
        case 'Polygon':
            return polygonArea(_.coordinates);
        case 'MultiPolygon':
            for (i = 0; i < _.coordinates.length; i++) {
                area += polygonArea(_.coordinates[i]);
            }
            return area;
        case 'Point':
        case 'MultiPoint':
        case 'LineString':
        case 'MultiLineString':
            return 0;
        case 'GeometryCollection':
            for (i = 0; i < _.geometries.length; i++) {
                area += geometry(_.geometries[i]);
            }
            return area;
    }
}

function polygonArea(coords) {
    var area = 0;
    if (coords && coords.length > 0) {
        area += Math.abs(ringArea(coords[0]));
        for (var i = 1; i < coords.length; i++) {
            area -= Math.abs(ringArea(coords[i]));
        }
    }
    return area;
}

/**
 * Calculate the approximate area of the polygon were it projected onto
 *     the earth.  Note that this area will be positive if ring is oriented
 *     clockwise, otherwise it will be negative.
 *
 * Reference:
 * Robert. G. Chamberlain and William H. Duquette, "Some Algorithms for
 *     Polygons on a Sphere", JPL Publication 07-03, Jet Propulsion
 *     Laboratory, Pasadena, CA, June 2007 http://trs-new.jpl.nasa.gov/dspace/handle/2014/40409
 *
 * Returns:
 * {float} The approximate signed geodesic area of the polygon in square
 *     meters.
 */

function ringArea(coords) {
    var p1, p2, p3, lowerIndex, middleIndex, upperIndex, i,
    area = 0,
    coordsLength = coords.length;

    if (coordsLength > 2) {
        for (i = 0; i < coordsLength; i++) {
            if (i === coordsLength - 2) {// i = N-2
                lowerIndex = coordsLength - 2;
                middleIndex = coordsLength -1;
                upperIndex = 0;
            } else if (i === coordsLength - 1) {// i = N-1
                lowerIndex = coordsLength - 1;
                middleIndex = 0;
                upperIndex = 1;
            } else { // i = 0 to N-3
                lowerIndex = i;
                middleIndex = i+1;
                upperIndex = i+2;
            }
            p1 = coords[lowerIndex];
            p2 = coords[middleIndex];
            p3 = coords[upperIndex];
            area += ( rad(p3[0]) - rad(p1[0]) ) * Math.sin( rad(p2[1]));
        }

        area = area * wgs84.RADIUS * wgs84.RADIUS / 2;
    }

    return area;
}

function rad(_) {
    return _ * Math.PI / 180;
}
},{"wgs84":20}],4:[function(require,module,exports){
module.exports = function flatten(list) {
    return _flatten(list);

    function _flatten(list) {
        if (Array.isArray(list) && list.length &&
            typeof list[0] === 'number') {
            return [list];
        }
        return list.reduce(function (acc, item) {
            if (Array.isArray(item) && Array.isArray(item[0])) {
                return acc.concat(_flatten(item));
            } else {
                acc.push(item);
                return acc;
            }
        }, []);
    }
};

},{}],5:[function(require,module,exports){
var geojsonNormalize = require('@mapbox/geojson-normalize'),
    geojsonFlatten = require('geojson-flatten'),
    flatten = require('./flatten');

module.exports = function(_) {
    if (!_) return [];
    var normalized = geojsonFlatten(geojsonNormalize(_)),
        coordinates = [];
    normalized.features.forEach(function(feature) {
        if (!feature.geometry) return;
        coordinates = coordinates.concat(flatten(feature.geometry.coordinates));
    });
    return coordinates;
};

},{"./flatten":4,"@mapbox/geojson-normalize":7,"geojson-flatten":13}],6:[function(require,module,exports){
var geojsonCoords = require('@mapbox/geojson-coords'),
    traverse = require('traverse'),
    extent = require('@mapbox/extent');

var geojsonTypesByDataAttributes = {
    features: ['FeatureCollection'],
    coordinates: ['Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon'],
    geometry: ['Feature'],
    geometries: ['GeometryCollection']
}

var dataAttributes = Object.keys(geojsonTypesByDataAttributes);

module.exports = function(_) {
    return getExtent(_).bbox();
};

module.exports.polygon = function(_) {
    return getExtent(_).polygon();
};

module.exports.bboxify = function(_) {
    return traverse(_).map(function(value) {
        if (!value) return ;

        var isValid = dataAttributes.some(function(attribute){
            if(value[attribute]) {
                return geojsonTypesByDataAttributes[attribute].indexOf(value.type) !== -1;
            }
            return false;
        });

        if(isValid){
            value.bbox = getExtent(value).bbox();
            this.update(value);
        }

    });
};

function getExtent(_) {
    var bbox = [Infinity, Infinity, -Infinity, -Infinity],
        ext = extent(),
        coords = geojsonCoords(_);
    for (var i = 0; i < coords.length; i++) ext.include(coords[i]);
    return ext;
}

},{"@mapbox/extent":2,"@mapbox/geojson-coords":5,"traverse":19}],7:[function(require,module,exports){
module.exports = normalize;

var types = {
    Point: 'geometry',
    MultiPoint: 'geometry',
    LineString: 'geometry',
    MultiLineString: 'geometry',
    Polygon: 'geometry',
    MultiPolygon: 'geometry',
    GeometryCollection: 'geometry',
    Feature: 'feature',
    FeatureCollection: 'featurecollection'
};

/**
 * Normalize a GeoJSON feature into a FeatureCollection.
 *
 * @param {object} gj geojson data
 * @returns {object} normalized geojson data
 */
function normalize(gj) {
    if (!gj || !gj.type) return null;
    var type = types[gj.type];
    if (!type) return null;

    if (type === 'geometry') {
        return {
            type: 'FeatureCollection',
            features: [{
                type: 'Feature',
                properties: {},
                geometry: gj
            }]
        };
    } else if (type === 'feature') {
        return {
            type: 'FeatureCollection',
            features: [gj]
        };
    } else if (type === 'featurecollection') {
        return gj;
    }
}

},{}],8:[function(require,module,exports){
var jsonlint = require('jsonlint-lines'),
  geojsonHintObject = require('./object');

/**
 * @alias geojsonhint
 * @param {(string|object)} GeoJSON given as a string or as an object
 * @param {Object} options
 * @param {boolean} [options.noDuplicateMembers=true] forbid repeated
 * properties. This is only available for string input, becaused parsed
 * Objects cannot have duplicate properties.
 * @param {boolean} [options.precisionWarning=true] warn if GeoJSON contains
 * unnecessary coordinate precision.
 * @returns {Array<Object>} an array of errors
 */
function hint(str, options) {

    var gj, errors = [];

    if (typeof str === 'object') {
        gj = str;
    } else if (typeof str === 'string') {
        try {
            gj = jsonlint.parse(str);
        } catch(e) {
            var match = e.message.match(/line (\d+)/);
            var lineNumber = parseInt(match[1], 10);
            return [{
                line: lineNumber - 1,
                message: e.message,
                error: e
            }];
        }
    } else {
        return [{
            message: 'Expected string or object as input',
            line: 0
        }];
    }

    errors = errors.concat(geojsonHintObject.hint(gj, options));

    return errors;
}

module.exports.hint = hint;

},{"./object":9,"jsonlint-lines":15}],9:[function(require,module,exports){
var rightHandRule = require('./rhr');

/**
 * @alias geojsonhint
 * @param {(string|object)} GeoJSON given as a string or as an object
 * @param {Object} options
 * @param {boolean} [options.noDuplicateMembers=true] forbid repeated
 * properties. This is only available for string input, becaused parsed
 * Objects cannot have duplicate properties.
 * @param {boolean} [options.precisionWarning=true] warn if GeoJSON contains
 * unnecessary coordinate precision.
 * @returns {Array<Object>} an array of errors
 */
function hint(gj, options) {

    var errors = [];
    var precisionWarningCount = 0;
    var maxPrecisionWarnings = 10;
    var maxPrecision = 6;

    function root(_) {

        if ((!options || options.noDuplicateMembers !== false) &&
           _.__duplicateProperties__) {
            errors.push({
                message: 'An object contained duplicate members, making parsing ambigous: ' + _.__duplicateProperties__.join(', '),
                line: _.__line__
            });
        }

        if (requiredProperty(_, 'type', 'string')) {
            return;
        }

        if (!types[_.type]) {
            var expectedType = typesLower[_.type.toLowerCase()];
            if (expectedType !== undefined) {
                errors.push({
                    message: 'Expected ' + expectedType + ' but got ' + _.type + ' (case sensitive)',
                    line: _.__line__
                });
            } else {
                errors.push({
                    message: 'The type ' + _.type + ' is unknown',
                    line: _.__line__
                });
            }
        } else if (_) {
            types[_.type](_);
        }
    }

    function everyIs(_, type) {
        // make a single exception because typeof null === 'object'
        return _.every(function(x) {
            return x !== null && typeof x === type;
        });
    }

    function requiredProperty(_, name, type) {
        if (typeof _[name] === 'undefined') {
            return errors.push({
                message: '"' + name + '" member required',
                line: _.__line__
            });
        } else if (type === 'array') {
            if (!Array.isArray(_[name])) {
                return errors.push({
                    message: '"' + name +
                        '" member should be an array, but is an ' +
                        (typeof _[name]) + ' instead',
                    line: _.__line__
                });
            }
        } else if (type === 'object' && _[name] && _[name].constructor.name !== 'Object') {
            return errors.push({
                message: '"' + name +
                    '" member should be ' + (type) +
                    ', but is an ' + (_[name].constructor.name) + ' instead',
                line: _.__line__
            });
        } else if (type && typeof _[name] !== type) {
            return errors.push({
                message: '"' + name +
                    '" member should be ' + (type) +
                    ', but is an ' + (typeof _[name]) + ' instead',
                line: _.__line__
            });
        }
    }

    // https://tools.ietf.org/html/rfc7946#section-3.3
    function FeatureCollection(featureCollection) {
        crs(featureCollection);
        bbox(featureCollection);
        if (featureCollection.properties !== undefined) {
            errors.push({
                message: 'FeatureCollection object cannot contain a "properties" member',
                line: featureCollection.__line__
            });
        }
        if (featureCollection.coordinates !== undefined) {
            errors.push({
                message: 'FeatureCollection object cannot contain a "coordinates" member',
                line: featureCollection.__line__
            });
        }
        if (!requiredProperty(featureCollection, 'features', 'array')) {
            if (!everyIs(featureCollection.features, 'object')) {
                return errors.push({
                    message: 'Every feature must be an object',
                    line: featureCollection.__line__
                });
            }
            featureCollection.features.forEach(Feature);
        }
    }

    // https://tools.ietf.org/html/rfc7946#section-3.1.1
    function position(_, line) {
        if (!Array.isArray(_)) {
            return errors.push({
                message: 'position should be an array, is a ' + (typeof _) +
                    ' instead',
                line: _.__line__ || line
            });
        }
        if (_.length < 2) {
            return errors.push({
                message: 'position must have 2 or more elements',
                line: _.__line__ || line
            });
        }
        if (_.length > 3) {
            return errors.push({
                message: 'position should not have more than 3 elements',
                level: 'message',
                line: _.__line__ || line
            });
        }
        if (!everyIs(_, 'number')) {
            return errors.push({
                message: 'each element in a position must be a number',
                line: _.__line__ || line
            });
        }

        if (options && options.precisionWarning) {
            if (precisionWarningCount === maxPrecisionWarnings) {
                precisionWarningCount += 1;
                return errors.push({
                    message: 'truncated warnings: we\'ve encountered coordinate precision warning ' + maxPrecisionWarnings + ' times, no more warnings will be reported',
                    level: 'message',
                    line: _.__line__ || line
                });
            } else if (precisionWarningCount < maxPrecisionWarnings) {
                _.forEach(function(num) {
                    var precision = 0;
                    var decimalStr = String(num).split('.')[1];
                    if (decimalStr !== undefined)
                        precision = decimalStr.length;
                    if (precision > maxPrecision) {
                        precisionWarningCount += 1;
                        return errors.push({
                            message: 'precision of coordinates should be reduced',
                            level: 'message',
                            line: _.__line__ || line
                        });
                    }
                });
            }
        }
    }

    function positionArray(coords, type, depth, line) {
        if (line === undefined && coords.__line__ !== undefined) {
            line = coords.__line__;
        }
        if (depth === 0) {
            return position(coords, line);
        }
        if (depth === 1 && type) {
            if (type === 'LinearRing') {
                if (!Array.isArray(coords[coords.length - 1])) {
                    errors.push({
                        message: 'a number was found where a coordinate array should have been found: this needs to be nested more deeply',
                        line: line
                    });
                    return true;
                }
                if (coords.length < 4) {
                    errors.push({
                        message: 'a LinearRing of coordinates needs to have four or more positions',
                        line: line
                    });
                }
                if (coords.length &&
                    (coords[coords.length - 1].length !== coords[0].length ||
                    !coords[coords.length - 1].every(function(pos, index) {
                        return coords[0][index] === pos;
                }))) {
                    errors.push({
                        message: 'the first and last positions in a LinearRing of coordinates must be the same',
                        line: line
                    });
                    return true;
                }
            } else if (type === 'Line' && coords.length < 2) {
                return errors.push({
                    message: 'a line needs to have two or more coordinates to be valid',
                    line: line
                });
            }
        }
        if (!Array.isArray(coords)) {
            errors.push({
                message: 'a number was found where a coordinate array should have been found: this needs to be nested more deeply',
                line: line
            });
        } else {
            var results = coords.map(function(c) {
                return positionArray(c, type, depth - 1, c.__line__ || line);
            });
            return results.some(function(r) {
                return r;
            });
        }
    }

    function crs(_) {
        if (!_.crs) return;
        var defaultCRSName = 'urn:ogc:def:crs:OGC:1.3:CRS84';
        if (typeof _.crs === 'object' && _.crs.properties && _.crs.properties.name === defaultCRSName) {
            errors.push({
                message: 'old-style crs member is not recommended, this object is equivalent to the default and should be removed',
                line: _.__line__
            });
        } else {
            errors.push({
                message: 'old-style crs member is not recommended',
                line: _.__line__
            });
        }
    }

    function bbox(_) {
        if (!_.bbox) {
            return;
        }
        if (Array.isArray(_.bbox)) {
            if (!everyIs(_.bbox, 'number')) {
                errors.push({
                    message: 'each element in a bbox member must be a number',
                    line: _.bbox.__line__
                });
            }
            if (!(_.bbox.length === 4 || _.bbox.length === 6)) {
                errors.push({
                    message: 'bbox must contain 4 elements (for 2D) or 6 elements (for 3D)',
                    line: _.bbox.__line__
                });
            }
            return errors.length;
        }
        errors.push({
            message: 'bbox member must be an array of numbers, but is a ' + (typeof _.bbox),
            line: _.__line__
        });
    }

    function geometrySemantics(geom) {
        if (geom.properties !== undefined) {
            errors.push({
                message: 'geometry object cannot contain a "properties" member',
                line: geom.__line__
            });
        }
        if (geom.geometry !== undefined) {
            errors.push({
                message: 'geometry object cannot contain a "geometry" member',
                line: geom.__line__
            });
        }
        if (geom.features !== undefined) {
            errors.push({
                message: 'geometry object cannot contain a "features" member',
                line: geom.__line__
            });
        }
    }

    // https://tools.ietf.org/html/rfc7946#section-3.1.2
    function Point(point) {
        crs(point);
        bbox(point);
        geometrySemantics(point);
        if (!requiredProperty(point, 'coordinates', 'array')) {
            position(point.coordinates);
        }
    }

    // https://tools.ietf.org/html/rfc7946#section-3.1.6
    function Polygon(polygon) {
        crs(polygon);
        bbox(polygon);
        if (!requiredProperty(polygon, 'coordinates', 'array')) {
            if (!positionArray(polygon.coordinates, 'LinearRing', 2)) {
                rightHandRule(polygon, errors);
            }
        }
    }

    // https://tools.ietf.org/html/rfc7946#section-3.1.7
    function MultiPolygon(multiPolygon) {
        crs(multiPolygon);
        bbox(multiPolygon);
        if (!requiredProperty(multiPolygon, 'coordinates', 'array')) {
            if (!positionArray(multiPolygon.coordinates, 'LinearRing', 3)) {
                rightHandRule(multiPolygon, errors);
            }
        }
    }

    // https://tools.ietf.org/html/rfc7946#section-3.1.4
    function LineString(lineString) {
        crs(lineString);
        bbox(lineString);
        if (!requiredProperty(lineString, 'coordinates', 'array')) {
            positionArray(lineString.coordinates, 'Line', 1);
        }
    }

    // https://tools.ietf.org/html/rfc7946#section-3.1.5
    function MultiLineString(multiLineString) {
        crs(multiLineString);
        bbox(multiLineString);
        if (!requiredProperty(multiLineString, 'coordinates', 'array')) {
            positionArray(multiLineString.coordinates, 'Line', 2);
        }
    }

    // https://tools.ietf.org/html/rfc7946#section-3.1.3
    function MultiPoint(multiPoint) {
        crs(multiPoint);
        bbox(multiPoint);
        if (!requiredProperty(multiPoint, 'coordinates', 'array')) {
            positionArray(multiPoint.coordinates, '', 1);
        }
    }

    // https://tools.ietf.org/html/rfc7946#section-3.1.8
    function GeometryCollection(geometryCollection) {
        crs(geometryCollection);
        bbox(geometryCollection);
        if (!requiredProperty(geometryCollection, 'geometries', 'array')) {
            if (!everyIs(geometryCollection.geometries, 'object')) {
                errors.push({
                    message: 'The geometries array in a GeometryCollection must contain only geometry objects',
                    line: geometryCollection.__line__
                });
            }
            if (geometryCollection.geometries.length === 1) {
                errors.push({
                    message: 'GeometryCollection with a single geometry should be avoided in favor of single part or a single object of multi-part type',
                    line: geometryCollection.geometries.__line__
                });
            }
            geometryCollection.geometries.forEach(function(geometry) {
                if (geometry) {
                    if (geometry.type === 'GeometryCollection') {
                        errors.push({
                            message: 'GeometryCollection should avoid nested geometry collections',
                            line: geometryCollection.geometries.__line__
                        });
                    }
                    root(geometry);
                }
            });
        }
    }

    // https://tools.ietf.org/html/rfc7946#section-3.2
    function Feature(feature) {
        crs(feature);
        bbox(feature);
        // https://github.com/geojson/draft-geojson/blob/master/middle.mkd#feature-object
        if (feature.id !== undefined &&
            typeof feature.id !== 'string' &&
            typeof feature.id !== 'number') {
            errors.push({
                message: 'Feature "id" member must have a string or number value',
                line: feature.__line__
            });
        }
        if (feature.features !== undefined) {
            errors.push({
                message: 'Feature object cannot contain a "features" member',
                line: feature.__line__
            });
        }
        if (feature.coordinates !== undefined) {
            errors.push({
                message: 'Feature object cannot contain a "coordinates" member',
                line: feature.__line__
            });
        }
        if (feature.type !== 'Feature') {
            errors.push({
                message: 'GeoJSON features must have a type=feature member',
                line: feature.__line__
            });
        }
        requiredProperty(feature, 'properties', 'object');
        if (!requiredProperty(feature, 'geometry', 'object')) {
            // https://tools.ietf.org/html/rfc7946#section-3.2
            // tolerate null geometry
            if (feature.geometry) root(feature.geometry);
        }
    }

    var types = {
        Point: Point,
        Feature: Feature,
        MultiPoint: MultiPoint,
        LineString: LineString,
        MultiLineString: MultiLineString,
        FeatureCollection: FeatureCollection,
        GeometryCollection: GeometryCollection,
        Polygon: Polygon,
        MultiPolygon: MultiPolygon
    };

    var typesLower = Object.keys(types).reduce(function(prev, curr) {
        prev[curr.toLowerCase()] = curr;
        return prev;
    }, {});

    if (typeof gj !== 'object' ||
        gj === null ||
        gj === undefined) {
        errors.push({
            message: 'The root of a GeoJSON object must be an object.',
            line: 0
        });
        return errors;
    }

    root(gj);

    errors.forEach(function(err) {
        if ({}.hasOwnProperty.call(err, 'line') && err.line === undefined) {
            delete err.line;
        }
    });

    return errors;
}

module.exports.hint = hint;

},{"./rhr":10}],10:[function(require,module,exports){
function rad(x) {
    return x * Math.PI / 180;
}

function isRingClockwise (coords) {
    var area = 0;
    if (coords.length > 2) {
        var p1, p2;
        for (var i = 0; i < coords.length - 1; i++) {
            p1 = coords[i];
            p2 = coords[i + 1];
            area += rad(p2[0] - p1[0]) * (2 + Math.sin(rad(p1[1])) + Math.sin(rad(p2[1])));
        }
    }

    return area >= 0;
}

function isPolyRHR (coords) {
    if (coords && coords.length > 0) {
        if (isRingClockwise(coords[0]))
            return false;
        var interiorCoords = coords.slice(1, coords.length);
        if (!interiorCoords.every(isRingClockwise))
            return false;
    }
    return true;
}

function rightHandRule (geometry) {
    if (geometry.type === 'Polygon') {
        return isPolyRHR(geometry.coordinates);
    } else if (geometry.type === 'MultiPolygon') {
        return geometry.coordinates.every(isPolyRHR);
    }
}

module.exports = function validateRightHandRule(geometry, errors) {
    if (!rightHandRule(geometry)) {
        errors.push({
            message: 'Polygons and MultiPolygons should follow the right-hand rule',
            level: 'message',
            line: geometry.__line__
        });
    }
};

},{}],11:[function(require,module,exports){
'use strict';

module.exports = Point;

/**
 * A standalone point geometry with useful accessor, comparison, and
 * modification methods.
 *
 * @class Point
 * @param {Number} x the x-coordinate. this could be longitude or screen
 * pixels, or any other sort of unit.
 * @param {Number} y the y-coordinate. this could be latitude or screen
 * pixels, or any other sort of unit.
 * @example
 * var point = new Point(-77, 38);
 */
function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype = {

    /**
     * Clone this point, returning a new point that can be modified
     * without affecting the old one.
     * @return {Point} the clone
     */
    clone: function() { return new Point(this.x, this.y); },

    /**
     * Add this point's x & y coordinates to another point,
     * yielding a new point.
     * @param {Point} p the other point
     * @return {Point} output point
     */
    add:     function(p) { return this.clone()._add(p); },

    /**
     * Subtract this point's x & y coordinates to from point,
     * yielding a new point.
     * @param {Point} p the other point
     * @return {Point} output point
     */
    sub:     function(p) { return this.clone()._sub(p); },

    /**
     * Multiply this point's x & y coordinates by point,
     * yielding a new point.
     * @param {Point} p the other point
     * @return {Point} output point
     */
    multByPoint:    function(p) { return this.clone()._multByPoint(p); },

    /**
     * Divide this point's x & y coordinates by point,
     * yielding a new point.
     * @param {Point} p the other point
     * @return {Point} output point
     */
    divByPoint:     function(p) { return this.clone()._divByPoint(p); },

    /**
     * Multiply this point's x & y coordinates by a factor,
     * yielding a new point.
     * @param {Point} k factor
     * @return {Point} output point
     */
    mult:    function(k) { return this.clone()._mult(k); },

    /**
     * Divide this point's x & y coordinates by a factor,
     * yielding a new point.
     * @param {Point} k factor
     * @return {Point} output point
     */
    div:     function(k) { return this.clone()._div(k); },

    /**
     * Rotate this point around the 0, 0 origin by an angle a,
     * given in radians
     * @param {Number} a angle to rotate around, in radians
     * @return {Point} output point
     */
    rotate:  function(a) { return this.clone()._rotate(a); },

    /**
     * Rotate this point around p point by an angle a,
     * given in radians
     * @param {Number} a angle to rotate around, in radians
     * @param {Point} p Point to rotate around
     * @return {Point} output point
     */
    rotateAround:  function(a,p) { return this.clone()._rotateAround(a,p); },

    /**
     * Multiply this point by a 4x1 transformation matrix
     * @param {Array<Number>} m transformation matrix
     * @return {Point} output point
     */
    matMult: function(m) { return this.clone()._matMult(m); },

    /**
     * Calculate this point but as a unit vector from 0, 0, meaning
     * that the distance from the resulting point to the 0, 0
     * coordinate will be equal to 1 and the angle from the resulting
     * point to the 0, 0 coordinate will be the same as before.
     * @return {Point} unit vector point
     */
    unit:    function() { return this.clone()._unit(); },

    /**
     * Compute a perpendicular point, where the new y coordinate
     * is the old x coordinate and the new x coordinate is the old y
     * coordinate multiplied by -1
     * @return {Point} perpendicular point
     */
    perp:    function() { return this.clone()._perp(); },

    /**
     * Return a version of this point with the x & y coordinates
     * rounded to integers.
     * @return {Point} rounded point
     */
    round:   function() { return this.clone()._round(); },

    /**
     * Return the magitude of this point: this is the Euclidean
     * distance from the 0, 0 coordinate to this point's x and y
     * coordinates.
     * @return {Number} magnitude
     */
    mag: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    /**
     * Judge whether this point is equal to another point, returning
     * true or false.
     * @param {Point} other the other point
     * @return {boolean} whether the points are equal
     */
    equals: function(other) {
        return this.x === other.x &&
               this.y === other.y;
    },

    /**
     * Calculate the distance from this point to another point
     * @param {Point} p the other point
     * @return {Number} distance
     */
    dist: function(p) {
        return Math.sqrt(this.distSqr(p));
    },

    /**
     * Calculate the distance from this point to another point,
     * without the square root step. Useful if you're comparing
     * relative distances.
     * @param {Point} p the other point
     * @return {Number} distance
     */
    distSqr: function(p) {
        var dx = p.x - this.x,
            dy = p.y - this.y;
        return dx * dx + dy * dy;
    },

    /**
     * Get the angle from the 0, 0 coordinate to this point, in radians
     * coordinates.
     * @return {Number} angle
     */
    angle: function() {
        return Math.atan2(this.y, this.x);
    },

    /**
     * Get the angle from this point to another point, in radians
     * @param {Point} b the other point
     * @return {Number} angle
     */
    angleTo: function(b) {
        return Math.atan2(this.y - b.y, this.x - b.x);
    },

    /**
     * Get the angle between this point and another point, in radians
     * @param {Point} b the other point
     * @return {Number} angle
     */
    angleWith: function(b) {
        return this.angleWithSep(b.x, b.y);
    },

    /*
     * Find the angle of the two vectors, solving the formula for
     * the cross product a x b = |a||b|sin(θ) for θ.
     * @param {Number} x the x-coordinate
     * @param {Number} y the y-coordinate
     * @return {Number} the angle in radians
     */
    angleWithSep: function(x, y) {
        return Math.atan2(
            this.x * y - this.y * x,
            this.x * x + this.y * y);
    },

    _matMult: function(m) {
        var x = m[0] * this.x + m[1] * this.y,
            y = m[2] * this.x + m[3] * this.y;
        this.x = x;
        this.y = y;
        return this;
    },

    _add: function(p) {
        this.x += p.x;
        this.y += p.y;
        return this;
    },

    _sub: function(p) {
        this.x -= p.x;
        this.y -= p.y;
        return this;
    },

    _mult: function(k) {
        this.x *= k;
        this.y *= k;
        return this;
    },

    _div: function(k) {
        this.x /= k;
        this.y /= k;
        return this;
    },

    _multByPoint: function(p) {
        this.x *= p.x;
        this.y *= p.y;
        return this;
    },

    _divByPoint: function(p) {
        this.x /= p.x;
        this.y /= p.y;
        return this;
    },

    _unit: function() {
        this._div(this.mag());
        return this;
    },

    _perp: function() {
        var y = this.y;
        this.y = this.x;
        this.x = -y;
        return this;
    },

    _rotate: function(angle) {
        var cos = Math.cos(angle),
            sin = Math.sin(angle),
            x = cos * this.x - sin * this.y,
            y = sin * this.x + cos * this.y;
        this.x = x;
        this.y = y;
        return this;
    },

    _rotateAround: function(angle, p) {
        var cos = Math.cos(angle),
            sin = Math.sin(angle),
            x = p.x + cos * (this.x - p.x) - sin * (this.y - p.y),
            y = p.y + sin * (this.x - p.x) + cos * (this.y - p.y);
        this.x = x;
        this.y = y;
        return this;
    },

    _round: function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }
};

/**
 * Construct a point from an array if necessary, otherwise if the input
 * is already a Point, or an unknown type, return it unchanged
 * @param {Array<Number>|Point|*} a any kind of input value
 * @return {Point} constructed point, or passed-through value.
 * @example
 * // this
 * var point = Point.convert([0, 1]);
 * // is equivalent to
 * var point = new Point(0, 1);
 */
Point.convert = function (a) {
    if (a instanceof Point) {
        return a;
    }
    if (Array.isArray(a)) {
        return new Point(a[0], a[1]);
    }
    return a;
};

},{}],12:[function(require,module,exports){

},{}],13:[function(require,module,exports){
function flatten(gj) {
    switch ((gj && gj.type) || null) {
        case 'FeatureCollection':
            gj.features = gj.features.reduce(function(mem, feature) {
                return mem.concat(flatten(feature));
            }, []);
            return gj;
        case 'Feature':
            if (!gj.geometry) return gj;
            return flatten(gj.geometry).map(function(geom) {
                return {
                    type: 'Feature',
                    properties: JSON.parse(JSON.stringify(gj.properties)),
                    geometry: geom
                };
            });
        case 'MultiPoint':
            return gj.coordinates.map(function(_) {
                return { type: 'Point', coordinates: _ };
            });
        case 'MultiPolygon':
            return gj.coordinates.map(function(_) {
                return { type: 'Polygon', coordinates: _ };
            });
        case 'MultiLineString':
            return gj.coordinates.map(function(_) {
                return { type: 'LineString', coordinates: _ };
            });
        case 'GeometryCollection':
            return gj.geometries.map(flatten).reduce(function(memo, geoms) {
                return memo.concat(geoms);
            }, []);
        case 'Point':
        case 'Polygon':
        case 'LineString':
            return [gj];
    }
}

module.exports = flatten;

},{}],14:[function(require,module,exports){
var hat = module.exports = function (bits, base) {
    if (!base) base = 16;
    if (bits === undefined) bits = 128;
    if (bits <= 0) return '0';
    
    var digits = Math.log(Math.pow(2, bits)) / Math.log(base);
    for (var i = 2; digits === Infinity; i *= 2) {
        digits = Math.log(Math.pow(2, bits / i)) / Math.log(base) * i;
    }
    
    var rem = digits - Math.floor(digits);
    
    var res = '';
    
    for (var i = 0; i < Math.floor(digits); i++) {
        var x = Math.floor(Math.random() * base).toString(base);
        res = x + res;
    }
    
    if (rem) {
        var b = Math.pow(base, rem);
        var x = Math.floor(Math.random() * b).toString(base);
        res = x + res;
    }
    
    var parsed = parseInt(res, base);
    if (parsed !== Infinity && parsed >= Math.pow(2, bits)) {
        return hat(bits, base)
    }
    else return res;
};

hat.rack = function (bits, base, expandBy) {
    var fn = function (data) {
        var iters = 0;
        do {
            if (iters ++ > 10) {
                if (expandBy) bits += expandBy;
                else throw new Error('too many ID collisions, use more bits')
            }
            
            var id = hat(bits, base);
        } while (Object.hasOwnProperty.call(hats, id));
        
        hats[id] = data;
        return id;
    };
    var hats = fn.hats = {};
    
    fn.get = function (id) {
        return fn.hats[id];
    };
    
    fn.set = function (id, value) {
        fn.hats[id] = value;
        return fn;
    };
    
    fn.bits = bits || 128;
    fn.base = base || 16;
    return fn;
};

},{}],15:[function(require,module,exports){
(function (process){
/* parser generated by jison 0.4.17 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var jsonlint = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,12],$V1=[1,13],$V2=[1,9],$V3=[1,10],$V4=[1,11],$V5=[1,14],$V6=[1,15],$V7=[14,18,22,24],$V8=[18,22],$V9=[22,24];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"JSONString":3,"STRING":4,"JSONNumber":5,"NUMBER":6,"JSONNullLiteral":7,"NULL":8,"JSONBooleanLiteral":9,"TRUE":10,"FALSE":11,"JSONText":12,"JSONValue":13,"EOF":14,"JSONObject":15,"JSONArray":16,"{":17,"}":18,"JSONMemberList":19,"JSONMember":20,":":21,",":22,"[":23,"]":24,"JSONElementList":25,"$accept":0,"$end":1},
terminals_: {2:"error",4:"STRING",6:"NUMBER",8:"NULL",10:"TRUE",11:"FALSE",14:"EOF",17:"{",18:"}",21:":",22:",",23:"[",24:"]"},
productions_: [0,[3,1],[5,1],[7,1],[9,1],[9,1],[12,2],[13,1],[13,1],[13,1],[13,1],[13,1],[13,1],[15,2],[15,3],[20,3],[19,1],[19,3],[16,2],[16,3],[25,1],[25,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 // replace escaped characters with actual character
          this.$ = yytext.replace(/\\(\\|")/g, "$"+"1")
                     .replace(/\\n/g,'\n')
                     .replace(/\\r/g,'\r')
                     .replace(/\\t/g,'\t')
                     .replace(/\\v/g,'\v')
                     .replace(/\\f/g,'\f')
                     .replace(/\\b/g,'\b');
        
break;
case 2:
this.$ = Number(yytext);
break;
case 3:
this.$ = null;
break;
case 4:
this.$ = true;
break;
case 5:
this.$ = false;
break;
case 6:
return this.$ = $$[$0-1];
break;
case 13:
this.$ = {}; Object.defineProperty(this.$, '__line__', {
            value: this._$.first_line,
            enumerable: false
        })
break;
case 14: case 19:
this.$ = $$[$0-1]; Object.defineProperty(this.$, '__line__', {
            value: this._$.first_line,
            enumerable: false
        })
break;
case 15:
this.$ = [$$[$0-2], $$[$0]];
break;
case 16:
this.$ = {}; this.$[$$[$0][0]] = $$[$0][1];
break;
case 17:

            this.$ = $$[$0-2];
            if ($$[$0-2][$$[$0][0]] !== undefined) {
                if (!this.$.__duplicateProperties__) {
                    Object.defineProperty(this.$, '__duplicateProperties__', {
                        value: [],
                        enumerable: false
                    });
                }
                this.$.__duplicateProperties__.push($$[$0][0]);
            }
            $$[$0-2][$$[$0][0]] = $$[$0][1];
        
break;
case 18:
this.$ = []; Object.defineProperty(this.$, '__line__', {
            value: this._$.first_line,
            enumerable: false
        })
break;
case 20:
this.$ = [$$[$0]];
break;
case 21:
this.$ = $$[$0-2]; $$[$0-2].push($$[$0]);
break;
}
},
table: [{3:5,4:$V0,5:6,6:$V1,7:3,8:$V2,9:4,10:$V3,11:$V4,12:1,13:2,15:7,16:8,17:$V5,23:$V6},{1:[3]},{14:[1,16]},o($V7,[2,7]),o($V7,[2,8]),o($V7,[2,9]),o($V7,[2,10]),o($V7,[2,11]),o($V7,[2,12]),o($V7,[2,3]),o($V7,[2,4]),o($V7,[2,5]),o([14,18,21,22,24],[2,1]),o($V7,[2,2]),{3:20,4:$V0,18:[1,17],19:18,20:19},{3:5,4:$V0,5:6,6:$V1,7:3,8:$V2,9:4,10:$V3,11:$V4,13:23,15:7,16:8,17:$V5,23:$V6,24:[1,21],25:22},{1:[2,6]},o($V7,[2,13]),{18:[1,24],22:[1,25]},o($V8,[2,16]),{21:[1,26]},o($V7,[2,18]),{22:[1,28],24:[1,27]},o($V9,[2,20]),o($V7,[2,14]),{3:20,4:$V0,20:29},{3:5,4:$V0,5:6,6:$V1,7:3,8:$V2,9:4,10:$V3,11:$V4,13:30,15:7,16:8,17:$V5,23:$V6},o($V7,[2,19]),{3:5,4:$V0,5:6,6:$V1,7:3,8:$V2,9:4,10:$V3,11:$V4,13:31,15:7,16:8,17:$V5,23:$V6},o($V8,[2,17]),o($V8,[2,15]),o($V9,[2,21])],
defaultActions: {16:[2,6]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        function _parseError (msg, hash) {
            this.message = msg;
            this.hash = hash;
        }
        _parseError.prototype = Error;

        throw new _parseError(str, hash);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:return 6
break;
case 2:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 4
break;
case 3:return 17
break;
case 4:return 18
break;
case 5:return 23
break;
case 6:return 24
break;
case 7:return 22
break;
case 8:return 21
break;
case 9:return 10
break;
case 10:return 11
break;
case 11:return 8
break;
case 12:return 14
break;
case 13:return 'INVALID'
break;
}
},
rules: [/^(?:\s+)/,/^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)?([eE][-+]?[0-9]+)?\b)/,/^(?:"(?:\\[\\"bfnrt\/]|\\u[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*")/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:,)/,/^(?::)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:null\b)/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = jsonlint;
exports.Parser = jsonlint.Parser;
exports.parse = function () { return jsonlint.parse.apply(jsonlint, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}
}).call(this,require('_process'))
},{"_process":18,"fs":12,"path":17}],16:[function(require,module,exports){
(function (global){
/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = isEqual;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],17:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":18}],18:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],19:[function(require,module,exports){
var traverse = module.exports = function (obj) {
    return new Traverse(obj);
};

function Traverse (obj) {
    this.value = obj;
}

Traverse.prototype.get = function (ps) {
    var node = this.value;
    for (var i = 0; i < ps.length; i ++) {
        var key = ps[i];
        if (!node || !hasOwnProperty.call(node, key)) {
            node = undefined;
            break;
        }
        node = node[key];
    }
    return node;
};

Traverse.prototype.has = function (ps) {
    var node = this.value;
    for (var i = 0; i < ps.length; i ++) {
        var key = ps[i];
        if (!node || !hasOwnProperty.call(node, key)) {
            return false;
        }
        node = node[key];
    }
    return true;
};

Traverse.prototype.set = function (ps, value) {
    var node = this.value;
    for (var i = 0; i < ps.length - 1; i ++) {
        var key = ps[i];
        if (!hasOwnProperty.call(node, key)) node[key] = {};
        node = node[key];
    }
    node[ps[i]] = value;
    return value;
};

Traverse.prototype.map = function (cb) {
    return walk(this.value, cb, true);
};

Traverse.prototype.forEach = function (cb) {
    this.value = walk(this.value, cb, false);
    return this.value;
};

Traverse.prototype.reduce = function (cb, init) {
    var skip = arguments.length === 1;
    var acc = skip ? this.value : init;
    this.forEach(function (x) {
        if (!this.isRoot || !skip) {
            acc = cb.call(this, acc, x);
        }
    });
    return acc;
};

Traverse.prototype.paths = function () {
    var acc = [];
    this.forEach(function (x) {
        acc.push(this.path); 
    });
    return acc;
};

Traverse.prototype.nodes = function () {
    var acc = [];
    this.forEach(function (x) {
        acc.push(this.node);
    });
    return acc;
};

Traverse.prototype.clone = function () {
    var parents = [], nodes = [];
    
    return (function clone (src) {
        for (var i = 0; i < parents.length; i++) {
            if (parents[i] === src) {
                return nodes[i];
            }
        }
        
        if (typeof src === 'object' && src !== null) {
            var dst = copy(src);
            
            parents.push(src);
            nodes.push(dst);
            
            forEach(objectKeys(src), function (key) {
                dst[key] = clone(src[key]);
            });
            
            parents.pop();
            nodes.pop();
            return dst;
        }
        else {
            return src;
        }
    })(this.value);
};

function walk (root, cb, immutable) {
    var path = [];
    var parents = [];
    var alive = true;
    
    return (function walker (node_) {
        var node = immutable ? copy(node_) : node_;
        var modifiers = {};
        
        var keepGoing = true;
        
        var state = {
            node : node,
            node_ : node_,
            path : [].concat(path),
            parent : parents[parents.length - 1],
            parents : parents,
            key : path.slice(-1)[0],
            isRoot : path.length === 0,
            level : path.length,
            circular : null,
            update : function (x, stopHere) {
                if (!state.isRoot) {
                    state.parent.node[state.key] = x;
                }
                state.node = x;
                if (stopHere) keepGoing = false;
            },
            'delete' : function (stopHere) {
                delete state.parent.node[state.key];
                if (stopHere) keepGoing = false;
            },
            remove : function (stopHere) {
                if (isArray(state.parent.node)) {
                    state.parent.node.splice(state.key, 1);
                }
                else {
                    delete state.parent.node[state.key];
                }
                if (stopHere) keepGoing = false;
            },
            keys : null,
            before : function (f) { modifiers.before = f },
            after : function (f) { modifiers.after = f },
            pre : function (f) { modifiers.pre = f },
            post : function (f) { modifiers.post = f },
            stop : function () { alive = false },
            block : function () { keepGoing = false }
        };
        
        if (!alive) return state;
        
        function updateState() {
            if (typeof state.node === 'object' && state.node !== null) {
                if (!state.keys || state.node_ !== state.node) {
                    state.keys = objectKeys(state.node)
                }
                
                state.isLeaf = state.keys.length == 0;
                
                for (var i = 0; i < parents.length; i++) {
                    if (parents[i].node_ === node_) {
                        state.circular = parents[i];
                        break;
                    }
                }
            }
            else {
                state.isLeaf = true;
                state.keys = null;
            }
            
            state.notLeaf = !state.isLeaf;
            state.notRoot = !state.isRoot;
        }
        
        updateState();
        
        // use return values to update if defined
        var ret = cb.call(state, state.node);
        if (ret !== undefined && state.update) state.update(ret);
        
        if (modifiers.before) modifiers.before.call(state, state.node);
        
        if (!keepGoing) return state;
        
        if (typeof state.node == 'object'
        && state.node !== null && !state.circular) {
            parents.push(state);
            
            updateState();
            
            forEach(state.keys, function (key, i) {
                path.push(key);
                
                if (modifiers.pre) modifiers.pre.call(state, state.node[key], key);
                
                var child = walker(state.node[key]);
                if (immutable && hasOwnProperty.call(state.node, key)) {
                    state.node[key] = child.node;
                }
                
                child.isLast = i == state.keys.length - 1;
                child.isFirst = i == 0;
                
                if (modifiers.post) modifiers.post.call(state, child);
                
                path.pop();
            });
            parents.pop();
        }
        
        if (modifiers.after) modifiers.after.call(state, state.node);
        
        return state;
    })(root).node;
}

function copy (src) {
    if (typeof src === 'object' && src !== null) {
        var dst;
        
        if (isArray(src)) {
            dst = [];
        }
        else if (isDate(src)) {
            dst = new Date(src.getTime ? src.getTime() : src);
        }
        else if (isRegExp(src)) {
            dst = new RegExp(src);
        }
        else if (isError(src)) {
            dst = { message: src.message };
        }
        else if (isBoolean(src)) {
            dst = new Boolean(src);
        }
        else if (isNumber(src)) {
            dst = new Number(src);
        }
        else if (isString(src)) {
            dst = new String(src);
        }
        else if (Object.create && Object.getPrototypeOf) {
            dst = Object.create(Object.getPrototypeOf(src));
        }
        else if (src.constructor === Object) {
            dst = {};
        }
        else {
            var proto =
                (src.constructor && src.constructor.prototype)
                || src.__proto__
                || {}
            ;
            var T = function () {};
            T.prototype = proto;
            dst = new T;
        }
        
        forEach(objectKeys(src), function (key) {
            dst[key] = src[key];
        });
        return dst;
    }
    else return src;
}

var objectKeys = Object.keys || function keys (obj) {
    var res = [];
    for (var key in obj) res.push(key)
    return res;
};

function toS (obj) { return Object.prototype.toString.call(obj) }
function isDate (obj) { return toS(obj) === '[object Date]' }
function isRegExp (obj) { return toS(obj) === '[object RegExp]' }
function isError (obj) { return toS(obj) === '[object Error]' }
function isBoolean (obj) { return toS(obj) === '[object Boolean]' }
function isNumber (obj) { return toS(obj) === '[object Number]' }
function isString (obj) { return toS(obj) === '[object String]' }

var isArray = Array.isArray || function isArray (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};

var forEach = function (xs, fn) {
    if (xs.forEach) return xs.forEach(fn)
    else for (var i = 0; i < xs.length; i++) {
        fn(xs[i], i, xs);
    }
};

forEach(objectKeys(Traverse.prototype), function (key) {
    traverse[key] = function (obj) {
        var args = [].slice.call(arguments, 1);
        var t = new Traverse(obj);
        return t[key].apply(t, args);
    };
});

var hasOwnProperty = Object.hasOwnProperty || function (obj, key) {
    return key in obj;
};

},{}],20:[function(require,module,exports){
module.exports.RADIUS = 6378137;
module.exports.FLATTENING = 1/298.257223563;
module.exports.POLAR_RADIUS = 6356752.3142;

},{}],21:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],22:[function(require,module,exports){
"use strict";

var isEqual = require('lodash.isequal');

var normalize = require('@mapbox/geojson-normalize');

var hat = require('hat');

var featuresAt = require('./lib/features_at');

var stringSetsAreEqual = require('./lib/string_sets_are_equal');

var geojsonhint = require('@mapbox/geojsonhint');

var Constants = require('./constants');

var StringSet = require('./lib/string_set');

var featureTypes = {
  Polygon: require('./feature_types/polygon'),
  LineString: require('./feature_types/line_string'),
  Point: require('./feature_types/point'),
  MultiPolygon: require('./feature_types/multi_feature'),
  MultiLineString: require('./feature_types/multi_feature'),
  MultiPoint: require('./feature_types/multi_feature')
};

module.exports = function (ctx, api) {
  api.modes = Constants.modes;

  api.getFeatureIdsAt = function (point) {
    var features = featuresAt.click({
      point: point
    }, null, ctx);
    return features.map(function (feature) {
      return feature.properties.id;
    });
  };

  api.getSelectedIds = function () {
    return ctx.store.getSelectedIds();
  };

  api.getSelected = function () {
    return {
      type: Constants.geojsonTypes.FEATURE_COLLECTION,
      features: ctx.store.getSelectedIds().map(function (id) {
        return ctx.store.get(id);
      }).map(function (feature) {
        return feature.toGeoJSON();
      })
    };
  };

  api.getSelectedPoints = function () {
    return {
      type: Constants.geojsonTypes.FEATURE_COLLECTION,
      features: ctx.store.getSelectedCoordinates().map(function (coordinate) {
        return {
          type: Constants.geojsonTypes.FEATURE,
          properties: {},
          geometry: {
            type: Constants.geojsonTypes.POINT,
            coordinates: coordinate.coordinates
          }
        };
      })
    };
  };

  api.set = function (featureCollection) {
    if (featureCollection.type === undefined || featureCollection.type !== Constants.geojsonTypes.FEATURE_COLLECTION || !Array.isArray(featureCollection.features)) {
      throw new Error('Invalid FeatureCollection');
    }

    var renderBatch = ctx.store.createRenderBatch();
    var toDelete = ctx.store.getAllIds().slice();
    var newIds = api.add(featureCollection);
    var newIdsLookup = new StringSet(newIds);
    toDelete = toDelete.filter(function (id) {
      return !newIdsLookup.has(id);
    });

    if (toDelete.length) {
      api.delete(toDelete);
    }

    renderBatch();
    return newIds;
  };

  api.add = function (geojson) {
    var errors = geojsonhint.hint(geojson, {
      precisionWarning: false
    }).filter(function (e) {
      return e.level !== 'message';
    });

    if (errors.length) {
      throw new Error(errors[0].message);
    }

    var featureCollection = JSON.parse(JSON.stringify(normalize(geojson)));
    var ids = featureCollection.features.map(function (feature) {
      feature.id = feature.id || hat();

      if (feature.geometry === null) {
        throw new Error('Invalid geometry: null');
      }

      if (ctx.store.get(feature.id) === undefined || ctx.store.get(feature.id).type !== feature.geometry.type) {
        // If the feature has not yet been created ...
        var Model = featureTypes[feature.geometry.type];

        if (Model === undefined) {
          throw new Error("Invalid geometry type: ".concat(feature.geometry.type, "."));
        }

        var internalFeature = new Model(ctx, feature);
        ctx.store.add(internalFeature);
      } else {
        // If a feature of that id has already been created, and we are swapping it out ...
        var _internalFeature = ctx.store.get(feature.id);

        _internalFeature.properties = feature.properties;

        if (!isEqual(_internalFeature.getCoordinates(), feature.geometry.coordinates)) {
          _internalFeature.incomingCoords(feature.geometry.coordinates);
        }
      }

      return feature.id;
    });
    ctx.store.render();
    return ids;
  };

  api.get = function (id) {
    var feature = ctx.store.get(id);

    if (feature) {
      return feature.toGeoJSON();
    }
  };

  api.getAll = function () {
    return {
      type: Constants.geojsonTypes.FEATURE_COLLECTION,
      features: ctx.store.getAll().map(function (feature) {
        return feature.toGeoJSON();
      })
    };
  };

  api.delete = function (featureIds) {
    ctx.store.delete(featureIds, {
      silent: true
    }); // If we were in direct select mode and our selected feature no longer exists
    // (because it was deleted), we need to get out of that mode.

    if (api.getMode() === Constants.modes.DIRECT_SELECT && !ctx.store.getSelectedIds().length) {
      ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, undefined, {
        silent: true
      });
    } else {
      ctx.store.render();
    }

    return api;
  };

  api.deleteAll = function () {
    ctx.store.delete(ctx.store.getAllIds(), {
      silent: true
    }); // If we were in direct select mode, now our selected feature no longer exists,
    // so escape that mode.

    if (api.getMode() === Constants.modes.DIRECT_SELECT) {
      ctx.events.changeMode(Constants.modes.SIMPLE_SELECT, undefined, {
        silent: true
      });
    } else {
      ctx.store.render();
    }

    return api;
  };

  api.changeMode = function (mode) {
    var modeOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // Avoid changing modes just to re-select what's already selected
    if (mode === Constants.modes.SIMPLE_SELECT && api.getMode() === Constants.modes.SIMPLE_SELECT) {
      if (stringSetsAreEqual(modeOptions.featureIds || [], ctx.store.getSelectedIds())) return api; // And if we are changing the selection within simple_select mode, just change the selection,
      // instead of stopping and re-starting the mode

      ctx.store.setSelected(modeOptions.featureIds, {
        silent: true
      });
      ctx.store.render();
      return api;
    }

    if (mode === Constants.modes.DIRECT_SELECT && api.getMode() === Constants.modes.DIRECT_SELECT && modeOptions.featureId === ctx.store.getSelectedIds()[0]) {
      return api;
    }

    ctx.events.changeMode(mode, modeOptions, {
      silent: true
    });
    return api;
  };

  api.getMode = function () {
    return ctx.events.getMode();
  };

  api.trash = function () {
    ctx.events.trash({
      silent: true
    });
    return api;
  };

  api.combineFeatures = function () {
    ctx.events.combineFeatures({
      silent: true
    });
    return api;
  };

  api.uncombineFeatures = function () {
    ctx.events.uncombineFeatures({
      silent: true
    });
    return api;
  };

  api.setFeatureProperty = function (featureId, property, value) {
    ctx.store.setFeatureProperty(featureId, property, value);
    return api;
  };

  return api;
};

},{"./constants":23,"./feature_types/line_string":26,"./feature_types/multi_feature":27,"./feature_types/point":28,"./feature_types/polygon":29,"./lib/features_at":37,"./lib/string_set":47,"./lib/string_sets_are_equal":48,"@mapbox/geojson-normalize":7,"@mapbox/geojsonhint":8,"hat":14,"lodash.isequal":16}],23:[function(require,module,exports){
"use strict";

module.exports = {
  classes: {
    CONTROL_BASE: 'mapboxgl-ctrl',
    CONTROL_PREFIX: 'mapboxgl-ctrl-',
    CONTROL_BUTTON: 'mapbox-gl-draw_ctrl-draw-btn',
    CONTROL_BUTTON_LINE: 'mapbox-gl-draw_line',
    CONTROL_BUTTON_POLYGON: 'mapbox-gl-draw_polygon',
    CONTROL_BUTTON_POINT: 'mapbox-gl-draw_point',
    CONTROL_BUTTON_TRASH: 'mapbox-gl-draw_trash',
    CONTROL_BUTTON_COMBINE_FEATURES: 'mapbox-gl-draw_combine',
    CONTROL_BUTTON_UNCOMBINE_FEATURES: 'mapbox-gl-draw_uncombine',
    CONTROL_GROUP: 'mapboxgl-ctrl-group',
    ATTRIBUTION: 'mapboxgl-ctrl-attrib',
    ACTIVE_BUTTON: 'active',
    BOX_SELECT: 'mapbox-gl-draw_boxselect'
  },
  sources: {
    HOT: 'mapbox-gl-draw-hot',
    COLD: 'mapbox-gl-draw-cold'
  },
  cursors: {
    ADD: 'add',
    MOVE: 'move',
    DRAG: 'drag',
    POINTER: 'pointer',
    NONE: 'none'
  },
  types: {
    POLYGON: 'polygon',
    LINE: 'line_string',
    POINT: 'point'
  },
  geojsonTypes: {
    FEATURE: 'Feature',
    POLYGON: 'Polygon',
    LINE_STRING: 'LineString',
    POINT: 'Point',
    FEATURE_COLLECTION: 'FeatureCollection',
    MULTI_PREFIX: 'Multi',
    MULTI_POINT: 'MultiPoint',
    MULTI_LINE_STRING: 'MultiLineString',
    MULTI_POLYGON: 'MultiPolygon'
  },
  modes: {
    DRAW_LINE_STRING: 'draw_line_string',
    DRAW_POLYGON: 'draw_polygon',
    DRAW_POINT: 'draw_point',
    SIMPLE_SELECT: 'simple_select',
    DIRECT_SELECT: 'direct_select',
    STATIC: 'static'
  },
  events: {
    CREATE: 'draw.create',
    DELETE: 'draw.delete',
    UPDATE: 'draw.update',
    SELECTION_CHANGE: 'draw.selectionchange',
    MODE_CHANGE: 'draw.modechange',
    ACTIONABLE: 'draw.actionable',
    RENDER: 'draw.render',
    COMBINE_FEATURES: 'draw.combine',
    UNCOMBINE_FEATURES: 'draw.uncombine'
  },
  updateActions: {
    MOVE: 'move',
    CHANGE_COORDINATES: 'change_coordinates'
  },
  meta: {
    FEATURE: 'feature',
    MIDPOINT: 'midpoint',
    VERTEX: 'vertex'
  },
  activeStates: {
    ACTIVE: 'true',
    INACTIVE: 'false'
  },
  interactions: ['scrollZoom', 'boxZoom', 'dragRotate', 'dragPan', 'keyboard', 'doubleClickZoom', 'touchZoomRotate'],
  LAT_MIN: -90,
  LAT_RENDERED_MIN: -85,
  LAT_MAX: 90,
  LAT_RENDERED_MAX: 85,
  LNG_MIN: -270,
  LNG_MAX: 270
};

},{}],24:[function(require,module,exports){
"use strict";

var setupModeHandler = require('./lib/mode_handler');

var getFeaturesAndSetCursor = require('./lib/get_features_and_set_cursor');

var featuresAt = require('./lib/features_at');

var isClick = require('./lib/is_click');

var isTap = require('./lib/is_tap');

var Constants = require('./constants');

var objectToMode = require('./modes/object_to_mode');

module.exports = function (ctx) {
  var modes = Object.keys(ctx.options.modes).reduce(function (m, k) {
    m[k] = objectToMode(ctx.options.modes[k]);
    return m;
  }, {});
  var mouseDownInfo = {};
  var touchStartInfo = {};
  var events = {};
  var _currentModeName = null;
  var currentMode = null;

  events.drag = function (event, isDrag) {
    if (isDrag({
      point: event.point,
      time: new Date().getTime()
    })) {
      ctx.ui.queueMapClasses({
        mouse: Constants.cursors.DRAG
      });
      currentMode.drag(event);
    } else {
      event.originalEvent.stopPropagation();
    }
  };

  events.mousedrag = function (event) {
    events.drag(event, function (endInfo) {
      return !isClick(mouseDownInfo, endInfo);
    });
  };

  events.touchdrag = function (event) {
    events.drag(event, function (endInfo) {
      return !isTap(touchStartInfo, endInfo);
    });
  };

  events.mousemove = function (event) {
    var button = event.originalEvent.buttons !== undefined ? event.originalEvent.buttons : event.originalEvent.which;

    if (button === 1) {
      return events.mousedrag(event);
    }

    var target = getFeaturesAndSetCursor(event, ctx);
    event.featureTarget = target;
    currentMode.mousemove(event);
  };

  events.mousedown = function (event) {
    mouseDownInfo = {
      time: new Date().getTime(),
      point: event.point
    };
    var target = getFeaturesAndSetCursor(event, ctx);
    event.featureTarget = target;
    currentMode.mousedown(event);
  };

  events.mouseup = function (event) {
    var target = getFeaturesAndSetCursor(event, ctx);
    event.featureTarget = target;

    if (isClick(mouseDownInfo, {
      point: event.point,
      time: new Date().getTime()
    })) {
      currentMode.click(event);
    } else {
      currentMode.mouseup(event);
    }
  };

  events.mouseout = function (event) {
    currentMode.mouseout(event);
  };

  events.touchstart = function (event) {
    // Prevent emulated mouse events because we will fully handle the touch here.
    // This does not stop the touch events from propogating to mapbox though.
    event.originalEvent.preventDefault();

    if (!ctx.options.touchEnabled) {
      return;
    }

    touchStartInfo = {
      time: new Date().getTime(),
      point: event.point
    };
    var target = featuresAt.touch(event, null, ctx)[0];
    event.featureTarget = target;
    currentMode.touchstart(event);
  };

  events.touchmove = function (event) {
    event.originalEvent.preventDefault();

    if (!ctx.options.touchEnabled) {
      return;
    }

    currentMode.touchmove(event);
    return events.touchdrag(event);
  };

  events.touchend = function (event) {
    event.originalEvent.preventDefault();

    if (!ctx.options.touchEnabled) {
      return;
    }

    var target = featuresAt.touch(event, null, ctx)[0];
    event.featureTarget = target;

    if (isTap(touchStartInfo, {
      time: new Date().getTime(),
      point: event.point
    })) {
      currentMode.tap(event);
    } else {
      currentMode.touchend(event);
    }
  }; // 8 - Backspace
  // 46 - Delete


  var isKeyModeValid = function isKeyModeValid(code) {
    return !(code === 8 || code === 46 || code >= 48 && code <= 57);
  };

  events.keydown = function (event) {
    if ((event.srcElement || event.target).classList[0] !== 'mapboxgl-canvas') return; // we only handle events on the map

    if ((event.keyCode === 8 || event.keyCode === 46) && ctx.options.controls.trash) {
      event.preventDefault();
      currentMode.trash();
    } else if (isKeyModeValid(event.keyCode)) {
      currentMode.keydown(event);
    } else if (event.keyCode === 49 && ctx.options.controls.point) {
      changeMode(Constants.modes.DRAW_POINT);
    } else if (event.keyCode === 50 && ctx.options.controls.line_string) {
      changeMode(Constants.modes.DRAW_LINE_STRING);
    } else if (event.keyCode === 51 && ctx.options.controls.polygon) {
      changeMode(Constants.modes.DRAW_POLYGON);
    }
  };

  events.keyup = function (event) {
    if (isKeyModeValid(event.keyCode)) {
      currentMode.keyup(event);
    }
  };

  events.zoomend = function () {
    ctx.store.changeZoom();
  };

  events.data = function (event) {
    if (event.dataType === 'style') {
      var setup = ctx.setup,
          map = ctx.map,
          options = ctx.options,
          store = ctx.store;
      var hasLayers = options.styles.some(function (style) {
        return map.getLayer(style.id);
      });

      if (!hasLayers) {
        setup.addLayers();
        store.setDirty();
        store.render();
      }
    }
  };

  function changeMode(modename, nextModeOptions) {
    var eventOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    currentMode.stop();
    var modebuilder = modes[modename];

    if (modebuilder === undefined) {
      throw new Error("".concat(modename, " is not valid"));
    }

    _currentModeName = modename;
    var mode = modebuilder(ctx, nextModeOptions);
    currentMode = setupModeHandler(mode, ctx);

    if (!eventOptions.silent) {
      ctx.map.fire(Constants.events.MODE_CHANGE, {
        mode: modename
      });
    }

    ctx.store.setDirty();
    ctx.store.render();
  }

  var actionState = {
    trash: false,
    combineFeatures: false,
    uncombineFeatures: false
  };

  function actionable(actions) {
    var changed = false;
    Object.keys(actions).forEach(function (action) {
      if (actionState[action] === undefined) throw new Error('Invalid action type');
      if (actionState[action] !== actions[action]) changed = true;
      actionState[action] = actions[action];
    });
    if (changed) ctx.map.fire(Constants.events.ACTIONABLE, {
      actions: actionState
    });
  }

  var api = {
    start: function start() {
      _currentModeName = ctx.options.defaultMode;
      currentMode = setupModeHandler(modes[_currentModeName](ctx), ctx);
    },
    changeMode: changeMode,
    actionable: actionable,
    currentModeName: function currentModeName() {
      return _currentModeName;
    },
    currentModeRender: function currentModeRender(geojson, push) {
      return currentMode.render(geojson, push);
    },
    fire: function fire(name, event) {
      if (events[name]) {
        events[name](event);
      }
    },
    addEventListeners: function addEventListeners() {
      ctx.map.on('mousemove', events.mousemove);
      ctx.map.on('mousedown', events.mousedown);
      ctx.map.on('mouseup', events.mouseup);
      ctx.map.on('data', events.data);
      ctx.map.on('touchmove', events.touchmove);
      ctx.map.on('touchstart', events.touchstart);
      ctx.map.on('touchend', events.touchend);
      ctx.container.addEventListener('mouseout', events.mouseout);

      if (ctx.options.keybindings) {
        ctx.container.addEventListener('keydown', events.keydown);
        ctx.container.addEventListener('keyup', events.keyup);
      }
    },
    removeEventListeners: function removeEventListeners() {
      ctx.map.off('mousemove', events.mousemove);
      ctx.map.off('mousedown', events.mousedown);
      ctx.map.off('mouseup', events.mouseup);
      ctx.map.off('data', events.data);
      ctx.map.off('touchmove', events.touchmove);
      ctx.map.off('touchstart', events.touchstart);
      ctx.map.off('touchend', events.touchend);
      ctx.container.removeEventListener('mouseout', events.mouseout);

      if (ctx.options.keybindings) {
        ctx.container.removeEventListener('keydown', events.keydown);
        ctx.container.removeEventListener('keyup', events.keyup);
      }
    },
    trash: function trash(options) {
      currentMode.trash(options);
    },
    combineFeatures: function combineFeatures() {
      currentMode.combineFeatures();
    },
    uncombineFeatures: function uncombineFeatures() {
      currentMode.uncombineFeatures();
    },
    getMode: function getMode() {
      return _currentModeName;
    }
  };
  return api;
};

},{"./constants":23,"./lib/features_at":37,"./lib/get_features_and_set_cursor":38,"./lib/is_click":39,"./lib/is_tap":41,"./lib/mode_handler":43,"./modes/object_to_mode":59}],25:[function(require,module,exports){
"use strict";

var hat = require('hat');

var Constants = require('../constants');

var Feature = function Feature(ctx, geojson) {
  this.ctx = ctx;
  this.properties = geojson.properties || {};
  this.coordinates = geojson.geometry.coordinates;
  this.id = geojson.id || hat();
  this.type = geojson.geometry.type;
};

Feature.prototype.changed = function () {
  this.ctx.store.featureChanged(this.id);
};

Feature.prototype.incomingCoords = function (coords) {
  this.setCoordinates(coords);
};

Feature.prototype.setCoordinates = function (coords) {
  this.coordinates = coords;
  this.changed();
};

Feature.prototype.getCoordinates = function () {
  return JSON.parse(JSON.stringify(this.coordinates));
};

Feature.prototype.setProperty = function (property, value) {
  this.properties[property] = value;
};

Feature.prototype.toGeoJSON = function () {
  return JSON.parse(JSON.stringify({
    id: this.id,
    type: Constants.geojsonTypes.FEATURE,
    properties: this.properties,
    geometry: {
      coordinates: this.getCoordinates(),
      type: this.type
    }
  }));
};

Feature.prototype.internal = function (mode) {
  var properties = {
    id: this.id,
    meta: Constants.meta.FEATURE,
    'meta:type': this.type,
    active: Constants.activeStates.INACTIVE,
    mode: mode
  };

  if (this.ctx.options.userProperties) {
    for (var name in this.properties) {
      properties["user_".concat(name)] = this.properties[name];
    }
  }

  return {
    type: Constants.geojsonTypes.FEATURE,
    properties: properties,
    geometry: {
      coordinates: this.getCoordinates(),
      type: this.type
    }
  };
};

module.exports = Feature;

},{"../constants":23,"hat":14}],26:[function(require,module,exports){
"use strict";

var Feature = require('./feature');

var LineString = function LineString(ctx, geojson) {
  Feature.call(this, ctx, geojson);
};

LineString.prototype = Object.create(Feature.prototype);

LineString.prototype.isValid = function () {
  return this.coordinates.length > 1;
};

LineString.prototype.addCoordinate = function (path, lng, lat) {
  this.changed();
  var id = parseInt(path, 10);
  this.coordinates.splice(id, 0, [lng, lat]);
};

LineString.prototype.getCoordinate = function (path) {
  var id = parseInt(path, 10);
  return JSON.parse(JSON.stringify(this.coordinates[id]));
};

LineString.prototype.removeCoordinate = function (path) {
  this.changed();
  this.coordinates.splice(parseInt(path, 10), 1);
};

LineString.prototype.updateCoordinate = function (path, lng, lat) {
  var id = parseInt(path, 10);
  this.coordinates[id] = [lng, lat];
  this.changed();
};

module.exports = LineString;

},{"./feature":25}],27:[function(require,module,exports){
"use strict";

var Feature = require('./feature');

var Constants = require('../constants');

var hat = require('hat');

var models = {
  MultiPoint: require('./point'),
  MultiLineString: require('./line_string'),
  MultiPolygon: require('./polygon')
};

var takeAction = function takeAction(features, action, path, lng, lat) {
  var parts = path.split('.');
  var idx = parseInt(parts[0], 10);
  var tail = !parts[1] ? null : parts.slice(1).join('.');
  return features[idx][action](tail, lng, lat);
};

var MultiFeature = function MultiFeature(ctx, geojson) {
  Feature.call(this, ctx, geojson);
  delete this.coordinates;
  this.model = models[geojson.geometry.type];
  if (this.model === undefined) throw new TypeError("".concat(geojson.geometry.type, " is not a valid type"));
  this.features = this._coordinatesToFeatures(geojson.geometry.coordinates);
};

MultiFeature.prototype = Object.create(Feature.prototype);

MultiFeature.prototype._coordinatesToFeatures = function (coordinates) {
  var _this = this;

  var Model = this.model.bind(this);
  return coordinates.map(function (coords) {
    return new Model(_this.ctx, {
      id: hat(),
      type: Constants.geojsonTypes.FEATURE,
      properties: {},
      geometry: {
        coordinates: coords,
        type: _this.type.replace('Multi', '')
      }
    });
  });
};

MultiFeature.prototype.isValid = function () {
  return this.features.every(function (f) {
    return f.isValid();
  });
};

MultiFeature.prototype.setCoordinates = function (coords) {
  this.features = this._coordinatesToFeatures(coords);
  this.changed();
};

MultiFeature.prototype.getCoordinate = function (path) {
  return takeAction(this.features, 'getCoordinate', path);
};

MultiFeature.prototype.getCoordinates = function () {
  return JSON.parse(JSON.stringify(this.features.map(function (f) {
    if (f.type === Constants.geojsonTypes.POLYGON) return f.getCoordinates();
    return f.coordinates;
  })));
};

MultiFeature.prototype.updateCoordinate = function (path, lng, lat) {
  takeAction(this.features, 'updateCoordinate', path, lng, lat);
  this.changed();
};

MultiFeature.prototype.addCoordinate = function (path, lng, lat) {
  takeAction(this.features, 'addCoordinate', path, lng, lat);
  this.changed();
};

MultiFeature.prototype.removeCoordinate = function (path) {
  takeAction(this.features, 'removeCoordinate', path);
  this.changed();
};

MultiFeature.prototype.getFeatures = function () {
  return this.features;
};

module.exports = MultiFeature;

},{"../constants":23,"./feature":25,"./line_string":26,"./point":28,"./polygon":29,"hat":14}],28:[function(require,module,exports){
"use strict";

var Feature = require('./feature');

var Point = function Point(ctx, geojson) {
  Feature.call(this, ctx, geojson);
};

Point.prototype = Object.create(Feature.prototype);

Point.prototype.isValid = function () {
  return typeof this.coordinates[0] === 'number' && typeof this.coordinates[1] === 'number';
};

Point.prototype.updateCoordinate = function (pathOrLng, lngOrLat, lat) {
  if (arguments.length === 3) {
    this.coordinates = [lngOrLat, lat];
  } else {
    this.coordinates = [pathOrLng, lngOrLat];
  }

  this.changed();
};

Point.prototype.getCoordinate = function () {
  return this.getCoordinates();
};

module.exports = Point;

},{"./feature":25}],29:[function(require,module,exports){
"use strict";

var Feature = require('./feature');

var Polygon = function Polygon(ctx, geojson) {
  Feature.call(this, ctx, geojson);
  this.coordinates = this.coordinates.map(function (ring) {
    return ring.slice(0, -1);
  });
};

Polygon.prototype = Object.create(Feature.prototype);

Polygon.prototype.isValid = function () {
  if (this.coordinates.length === 0) return false;
  return this.coordinates.every(function (ring) {
    return ring.length > 2;
  });
}; // Expects valid geoJSON polygon geometry: first and last positions must be equivalent.


Polygon.prototype.incomingCoords = function (coords) {
  this.coordinates = coords.map(function (ring) {
    return ring.slice(0, -1);
  });
  this.changed();
}; // Does NOT expect valid geoJSON polygon geometry: first and last positions should not be equivalent.


Polygon.prototype.setCoordinates = function (coords) {
  this.coordinates = coords;
  this.changed();
};

Polygon.prototype.addCoordinate = function (path, lng, lat) {
  this.changed();
  var ids = path.split('.').map(function (x) {
    return parseInt(x, 10);
  });
  var ring = this.coordinates[ids[0]];
  ring.splice(ids[1], 0, [lng, lat]);
};

Polygon.prototype.removeCoordinate = function (path) {
  this.changed();
  var ids = path.split('.').map(function (x) {
    return parseInt(x, 10);
  });
  var ring = this.coordinates[ids[0]];

  if (ring) {
    ring.splice(ids[1], 1);

    if (ring.length < 3) {
      this.coordinates.splice(ids[0], 1);
    }
  }
};

Polygon.prototype.getCoordinate = function (path) {
  var ids = path.split('.').map(function (x) {
    return parseInt(x, 10);
  });
  var ring = this.coordinates[ids[0]];
  return JSON.parse(JSON.stringify(ring[ids[1]]));
};

Polygon.prototype.getCoordinates = function () {
  return this.coordinates.map(function (coords) {
    return coords.concat([coords[0]]);
  });
};

Polygon.prototype.updateCoordinate = function (path, lng, lat) {
  this.changed();
  var parts = path.split('.');
  var ringId = parseInt(parts[0], 10);
  var coordId = parseInt(parts[1], 10);

  if (this.coordinates[ringId] === undefined) {
    this.coordinates[ringId] = [];
  }

  this.coordinates[ringId][coordId] = [lng, lat];
};

module.exports = Polygon;

},{"./feature":25}],30:[function(require,module,exports){
"use strict";

var Constants = require('../constants');

module.exports = {
  isOfMetaType: function isOfMetaType(type) {
    return function (e) {
      var featureTarget = e.featureTarget;
      if (!featureTarget) return false;
      if (!featureTarget.properties) return false;
      return featureTarget.properties.meta === type;
    };
  },
  isShiftMousedown: function isShiftMousedown(e) {
    if (!e.originalEvent) return false;
    if (!e.originalEvent.shiftKey) return false;
    return e.originalEvent.button === 0;
  },
  isActiveFeature: function isActiveFeature(e) {
    if (!e.featureTarget) return false;
    if (!e.featureTarget.properties) return false;
    return e.featureTarget.properties.active === Constants.activeStates.ACTIVE && e.featureTarget.properties.meta === Constants.meta.FEATURE;
  },
  isInactiveFeature: function isInactiveFeature(e) {
    if (!e.featureTarget) return false;
    if (!e.featureTarget.properties) return false;
    return e.featureTarget.properties.active === Constants.activeStates.INACTIVE && e.featureTarget.properties.meta === Constants.meta.FEATURE;
  },
  noTarget: function noTarget(e) {
    return e.featureTarget === undefined;
  },
  isFeature: function isFeature(e) {
    if (!e.featureTarget) return false;
    if (!e.featureTarget.properties) return false;
    return e.featureTarget.properties.meta === Constants.meta.FEATURE;
  },
  isVertex: function isVertex(e) {
    var featureTarget = e.featureTarget;
    if (!featureTarget) return false;
    if (!featureTarget.properties) return false;
    return featureTarget.properties.meta === Constants.meta.VERTEX;
  },
  isShiftDown: function isShiftDown(e) {
    if (!e.originalEvent) return false;
    return e.originalEvent.shiftKey === true;
  },
  isEscapeKey: function isEscapeKey(e) {
    return e.keyCode === 27;
  },
  isEnterKey: function isEnterKey(e) {
    return e.keyCode === 13;
  },
  true: function _true() {
    return true;
  }
};

},{"../constants":23}],31:[function(require,module,exports){
"use strict";

var extent = require('@mapbox/geojson-extent');

var Constants = require('../constants');

var LAT_MIN = Constants.LAT_MIN,
    LAT_MAX = Constants.LAT_MAX,
    LAT_RENDERED_MIN = Constants.LAT_RENDERED_MIN,
    LAT_RENDERED_MAX = Constants.LAT_RENDERED_MAX,
    LNG_MIN = Constants.LNG_MIN,
    LNG_MAX = Constants.LNG_MAX; // Ensure that we do not drag north-south far enough for
// - any part of any feature to exceed the poles
// - any feature to be completely lost in the space between the projection's
//   edge and the poles, such that it couldn't be re-selected and moved back

module.exports = function (geojsonFeatures, delta) {
  // "inner edge" = a feature's latitude closest to the equator
  var northInnerEdge = LAT_MIN;
  var southInnerEdge = LAT_MAX; // "outer edge" = a feature's latitude furthest from the equator

  var northOuterEdge = LAT_MIN;
  var southOuterEdge = LAT_MAX;
  var westEdge = LNG_MAX;
  var eastEdge = LNG_MIN;
  geojsonFeatures.forEach(function (feature) {
    var bounds = extent(feature);
    var featureSouthEdge = bounds[1];
    var featureNorthEdge = bounds[3];
    var featureWestEdge = bounds[0];
    var featureEastEdge = bounds[2];
    if (featureSouthEdge > northInnerEdge) northInnerEdge = featureSouthEdge;
    if (featureNorthEdge < southInnerEdge) southInnerEdge = featureNorthEdge;
    if (featureNorthEdge > northOuterEdge) northOuterEdge = featureNorthEdge;
    if (featureSouthEdge < southOuterEdge) southOuterEdge = featureSouthEdge;
    if (featureWestEdge < westEdge) westEdge = featureWestEdge;
    if (featureEastEdge > eastEdge) eastEdge = featureEastEdge;
  }); // These changes are not mutually exclusive: we might hit the inner
  // edge but also have hit the outer edge and therefore need
  // another readjustment

  var constrainedDelta = delta;

  if (northInnerEdge + constrainedDelta.lat > LAT_RENDERED_MAX) {
    constrainedDelta.lat = LAT_RENDERED_MAX - northInnerEdge;
  }

  if (northOuterEdge + constrainedDelta.lat > LAT_MAX) {
    constrainedDelta.lat = LAT_MAX - northOuterEdge;
  }

  if (southInnerEdge + constrainedDelta.lat < LAT_RENDERED_MIN) {
    constrainedDelta.lat = LAT_RENDERED_MIN - southInnerEdge;
  }

  if (southOuterEdge + constrainedDelta.lat < LAT_MIN) {
    constrainedDelta.lat = LAT_MIN - southOuterEdge;
  }

  if (westEdge + constrainedDelta.lng <= LNG_MIN) {
    constrainedDelta.lng += Math.ceil(Math.abs(constrainedDelta.lng) / 360) * 360;
  }

  if (eastEdge + constrainedDelta.lng >= LNG_MAX) {
    constrainedDelta.lng -= Math.ceil(Math.abs(constrainedDelta.lng) / 360) * 360;
  }

  return constrainedDelta;
};

},{"../constants":23,"@mapbox/geojson-extent":6}],32:[function(require,module,exports){
"use strict";

var Constants = require('../constants');

module.exports = function (parent, startVertex, endVertex, map) {
  var startCoord = startVertex.geometry.coordinates;
  var endCoord = endVertex.geometry.coordinates; // If a coordinate exceeds the projection, we can't calculate a midpoint,
  // so run away

  if (startCoord[1] > Constants.LAT_RENDERED_MAX || startCoord[1] < Constants.LAT_RENDERED_MIN || endCoord[1] > Constants.LAT_RENDERED_MAX || endCoord[1] < Constants.LAT_RENDERED_MIN) {
    return null;
  }

  var ptA = map.project([startCoord[0], startCoord[1]]);
  var ptB = map.project([endCoord[0], endCoord[1]]);
  var mid = map.unproject([(ptA.x + ptB.x) / 2, (ptA.y + ptB.y) / 2]);
  return {
    type: Constants.geojsonTypes.FEATURE,
    properties: {
      meta: Constants.meta.MIDPOINT,
      parent: parent,
      lng: mid.lng,
      lat: mid.lat,
      coord_path: endVertex.properties.coord_path
    },
    geometry: {
      type: Constants.geojsonTypes.POINT,
      coordinates: [mid.lng, mid.lat]
    }
  };
};

},{"../constants":23}],33:[function(require,module,exports){
"use strict";

var createVertex = require('./create_vertex');

var createMidpoint = require('./create_midpoint');

var Constants = require('../constants');

function createSupplementaryPoints(geojson) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var basePath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var _geojson$geometry = geojson.geometry,
      type = _geojson$geometry.type,
      coordinates = _geojson$geometry.coordinates;
  var featureId = geojson.properties && geojson.properties.id;
  var supplementaryPoints = [];

  if (type === Constants.geojsonTypes.POINT) {
    // For points, just create a vertex
    supplementaryPoints.push(createVertex(featureId, coordinates, basePath, isSelectedPath(basePath)));
  } else if (type === Constants.geojsonTypes.POLYGON) {
    // Cycle through a Polygon's rings and
    // process each line
    coordinates.forEach(function (line, lineIndex) {
      processLine(line, basePath !== null ? "".concat(basePath, ".").concat(lineIndex) : String(lineIndex));
    });
  } else if (type === Constants.geojsonTypes.LINE_STRING) {
    processLine(coordinates, basePath);
  } else if (type.indexOf(Constants.geojsonTypes.MULTI_PREFIX) === 0) {
    processMultiGeometry();
  }

  function processLine(line, lineBasePath) {
    var firstPointString = '';
    var lastVertex = null;
    line.forEach(function (point, pointIndex) {
      var pointPath = lineBasePath !== undefined && lineBasePath !== null ? "".concat(lineBasePath, ".").concat(pointIndex) : String(pointIndex);
      var vertex = createVertex(featureId, point, pointPath, isSelectedPath(pointPath)); // If we're creating midpoints, check if there was a
      // vertex before this one. If so, add a midpoint
      // between that vertex and this one.

      if (options.midpoints && lastVertex) {
        var midpoint = createMidpoint(featureId, lastVertex, vertex, options.map);

        if (midpoint) {
          supplementaryPoints.push(midpoint);
        }
      }

      lastVertex = vertex; // A Polygon line's last point is the same as the first point. If we're on the last
      // point, we want to draw a midpoint before it but not another vertex on it
      // (since we already a vertex there, from the first point).

      var stringifiedPoint = JSON.stringify(point);

      if (firstPointString !== stringifiedPoint) {
        supplementaryPoints.push(vertex);
      }

      if (pointIndex === 0) {
        firstPointString = stringifiedPoint;
      }
    });
  }

  function isSelectedPath(path) {
    if (!options.selectedPaths) return false;
    return options.selectedPaths.indexOf(path) !== -1;
  } // Split a multi-geometry into constituent
  // geometries, and accumulate the supplementary points
  // for each of those constituents


  function processMultiGeometry() {
    var subType = type.replace(Constants.geojsonTypes.MULTI_PREFIX, '');
    coordinates.forEach(function (subCoordinates, index) {
      var subFeature = {
        type: Constants.geojsonTypes.FEATURE,
        properties: geojson.properties,
        geometry: {
          type: subType,
          coordinates: subCoordinates
        }
      };
      supplementaryPoints = supplementaryPoints.concat(createSupplementaryPoints(subFeature, options, index));
    });
  }

  return supplementaryPoints;
}

module.exports = createSupplementaryPoints;

},{"../constants":23,"./create_midpoint":32,"./create_vertex":34}],34:[function(require,module,exports){
"use strict";

var Constants = require('../constants');
/**
 * Returns GeoJSON for a Point representing the
 * vertex of another feature.
 *
 * @param {string} parentId
 * @param {Array<number>} coordinates
 * @param {string} path - Dot-separated numbers indicating exactly
 *   where the point exists within its parent feature's coordinates.
 * @param {boolean} selected
 * @return {GeoJSON} Point
 */


module.exports = function (parentId, coordinates, path, selected) {
  return {
    type: Constants.geojsonTypes.FEATURE,
    properties: {
      meta: Constants.meta.VERTEX,
      parent: parentId,
      coord_path: path,
      active: selected ? Constants.activeStates.ACTIVE : Constants.activeStates.INACTIVE
    },
    geometry: {
      type: Constants.geojsonTypes.POINT,
      coordinates: coordinates
    }
  };
};

},{"../constants":23}],35:[function(require,module,exports){
"use strict";

module.exports = {
  enable: function enable(ctx) {
    setTimeout(function () {
      // First check we've got a map and some context.
      if (!ctx.map || !ctx.map.doubleClickZoom || !ctx._ctx || !ctx._ctx.store || !ctx._ctx.store.getInitialConfigValue) return; // Now check initial state wasn't false (we leave it disabled if so)

      if (!ctx._ctx.store.getInitialConfigValue('doubleClickZoom')) return;
      ctx.map.doubleClickZoom.enable();
    }, 0);
  },
  disable: function disable(ctx) {
    setTimeout(function () {
      if (!ctx.map || !ctx.map.doubleClickZoom) return; // Always disable here, as it's necessary in some cases.

      ctx.map.doubleClickZoom.disable();
    }, 0);
  }
};

},{}],36:[function(require,module,exports){
"use strict";

module.exports = function (a, b) {
  var x = a.x - b.x;
  var y = a.y - b.y;
  return Math.sqrt(x * x + y * y);
};

},{}],37:[function(require,module,exports){
"use strict";

var sortFeatures = require('./sort_features');

var mapEventToBoundingBox = require('./map_event_to_bounding_box');

var Constants = require('../constants');

var StringSet = require('./string_set');

var META_TYPES = [Constants.meta.FEATURE, Constants.meta.MIDPOINT, Constants.meta.VERTEX]; // Requires either event or bbox

module.exports = {
  click: featuresAtClick,
  touch: featuresAtTouch
};

function featuresAtClick(event, bbox, ctx) {
  return featuresAt(event, bbox, ctx, ctx.options.clickBuffer);
}

function featuresAtTouch(event, bbox, ctx) {
  return featuresAt(event, bbox, ctx, ctx.options.touchBuffer);
}

function featuresAt(event, bbox, ctx, buffer) {
  if (ctx.map === null) return [];
  var box = event ? mapEventToBoundingBox(event, buffer) : bbox;
  var queryParams = {};
  if (ctx.options.styles) queryParams.layers = ctx.options.styles.map(function (s) {
    return s.id;
  });
  var features = ctx.map.queryRenderedFeatures(box, queryParams).filter(function (feature) {
    return META_TYPES.indexOf(feature.properties.meta) !== -1;
  });
  var featureIds = new StringSet();
  var uniqueFeatures = [];
  features.forEach(function (feature) {
    var featureId = feature.properties.id;
    if (featureIds.has(featureId)) return;
    featureIds.add(featureId);
    uniqueFeatures.push(feature);
  });
  return sortFeatures(uniqueFeatures);
}

},{"../constants":23,"./map_event_to_bounding_box":42,"./sort_features":46,"./string_set":47}],38:[function(require,module,exports){
"use strict";

var featuresAt = require('./features_at');

var Constants = require('../constants');

module.exports = function getFeatureAtAndSetCursors(event, ctx) {
  var features = featuresAt.click(event, null, ctx);
  var classes = {
    mouse: Constants.cursors.NONE
  };

  if (features[0]) {
    classes.mouse = features[0].properties.active === Constants.activeStates.ACTIVE ? Constants.cursors.MOVE : Constants.cursors.POINTER;
    classes.feature = features[0].properties.meta;
  }

  if (ctx.events.currentModeName().indexOf('draw') !== -1) {
    classes.mouse = Constants.cursors.ADD;
  }

  ctx.ui.queueMapClasses(classes);
  ctx.ui.updateMapClasses();
  return features[0];
};

},{"../constants":23,"./features_at":37}],39:[function(require,module,exports){
"use strict";

var euclideanDistance = require('./euclidean_distance');

var FINE_TOLERANCE = 4;
var GROSS_TOLERANCE = 12;
var INTERVAL = 500;

module.exports = function isClick(start, end) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var fineTolerance = options.fineTolerance != null ? options.fineTolerance : FINE_TOLERANCE;
  var grossTolerance = options.grossTolerance != null ? options.grossTolerance : GROSS_TOLERANCE;
  var interval = options.interval != null ? options.interval : INTERVAL;
  start.point = start.point || end.point;
  start.time = start.time || end.time;
  var moveDistance = euclideanDistance(start.point, end.point);
  return moveDistance < fineTolerance || moveDistance < grossTolerance && end.time - start.time < interval;
};

},{"./euclidean_distance":36}],40:[function(require,module,exports){
"use strict";

function isEventAtCoordinates(event, coordinates) {
  if (!event.lngLat) return false;
  return event.lngLat.lng === coordinates[0] && event.lngLat.lat === coordinates[1];
}

module.exports = isEventAtCoordinates;

},{}],41:[function(require,module,exports){
"use strict";

var euclideanDistance = require('./euclidean_distance');

var TOLERANCE = 25;
var INTERVAL = 250;

module.exports = function isTap(start, end) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var tolerance = options.tolerance != null ? options.tolerance : TOLERANCE;
  var interval = options.interval != null ? options.interval : INTERVAL;
  start.point = start.point || end.point;
  start.time = start.time || end.time;
  var moveDistance = euclideanDistance(start.point, end.point);
  return moveDistance < tolerance && end.time - start.time < interval;
};

},{"./euclidean_distance":36}],42:[function(require,module,exports){
"use strict";

/**
 * Returns a bounding box representing the event's location.
 *
 * @param {Event} mapEvent - Mapbox GL JS map event, with a point properties.
 * @return {Array<Array<number>>} Bounding box.
 */
function mapEventToBoundingBox(mapEvent) {
  var buffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return [[mapEvent.point.x - buffer, mapEvent.point.y - buffer], [mapEvent.point.x + buffer, mapEvent.point.y + buffer]];
}

module.exports = mapEventToBoundingBox;

},{}],43:[function(require,module,exports){
"use strict";

var ModeHandler = function ModeHandler(mode, DrawContext) {
  var handlers = {
    drag: [],
    click: [],
    mousemove: [],
    mousedown: [],
    mouseup: [],
    mouseout: [],
    keydown: [],
    keyup: [],
    touchstart: [],
    touchmove: [],
    touchend: [],
    tap: []
  };
  var ctx = {
    on: function on(event, selector, fn) {
      if (handlers[event] === undefined) {
        throw new Error("Invalid event type: ".concat(event));
      }

      handlers[event].push({
        selector: selector,
        fn: fn
      });
    },
    render: function render(id) {
      DrawContext.store.featureChanged(id);
    }
  };

  var delegate = function delegate(eventName, event) {
    var handles = handlers[eventName];
    var iHandle = handles.length;

    while (iHandle--) {
      var handle = handles[iHandle];

      if (handle.selector(event)) {
        handle.fn.call(ctx, event);
        DrawContext.store.render();
        DrawContext.ui.updateMapClasses(); // ensure an event is only handled once
        // we do this to let modes have multiple overlapping selectors
        // and relay on order of oppertations to filter

        break;
      }
    }
  };

  mode.start.call(ctx);
  return {
    render: mode.render,
    stop: function stop() {
      if (mode.stop) mode.stop();
    },
    trash: function trash() {
      if (mode.trash) {
        mode.trash();
        DrawContext.store.render();
      }
    },
    combineFeatures: function combineFeatures() {
      if (mode.combineFeatures) {
        mode.combineFeatures();
      }
    },
    uncombineFeatures: function uncombineFeatures() {
      if (mode.uncombineFeatures) {
        mode.uncombineFeatures();
      }
    },
    drag: function drag(event) {
      delegate('drag', event);
    },
    click: function click(event) {
      delegate('click', event);
    },
    mousemove: function mousemove(event) {
      delegate('mousemove', event);
    },
    mousedown: function mousedown(event) {
      delegate('mousedown', event);
    },
    mouseup: function mouseup(event) {
      delegate('mouseup', event);
    },
    mouseout: function mouseout(event) {
      delegate('mouseout', event);
    },
    keydown: function keydown(event) {
      delegate('keydown', event);
    },
    keyup: function keyup(event) {
      delegate('keyup', event);
    },
    touchstart: function touchstart(event) {
      delegate('touchstart', event);
    },
    touchmove: function touchmove(event) {
      delegate('touchmove', event);
    },
    touchend: function touchend(event) {
      delegate('touchend', event);
    },
    tap: function tap(event) {
      delegate('tap', event);
    }
  };
};

module.exports = ModeHandler;

},{}],44:[function(require,module,exports){
"use strict";

var Point = require('@mapbox/point-geometry');
/**
 * Returns a Point representing a mouse event's position
 * relative to a containing element.
 *
 * @param {MouseEvent} mouseEvent
 * @param {Node} container
 * @returns {Point}
 */


function mouseEventPoint(mouseEvent, container) {
  var rect = container.getBoundingClientRect();
  return new Point(mouseEvent.clientX - rect.left - (container.clientLeft || 0), mouseEvent.clientY - rect.top - (container.clientTop || 0));
}

module.exports = mouseEventPoint;

},{"@mapbox/point-geometry":11}],45:[function(require,module,exports){
"use strict";

var constrainFeatureMovement = require('./constrain_feature_movement');

var Constants = require('../constants');

module.exports = function (features, delta) {
  var constrainedDelta = constrainFeatureMovement(features.map(function (feature) {
    return feature.toGeoJSON();
  }), delta);
  features.forEach(function (feature) {
    var currentCoordinates = feature.getCoordinates();

    var moveCoordinate = function moveCoordinate(coord) {
      var point = {
        lng: coord[0] + constrainedDelta.lng,
        lat: coord[1] + constrainedDelta.lat
      };
      return [point.lng, point.lat];
    };

    var moveRing = function moveRing(ring) {
      return ring.map(function (coord) {
        return moveCoordinate(coord);
      });
    };

    var moveMultiPolygon = function moveMultiPolygon(multi) {
      return multi.map(function (ring) {
        return moveRing(ring);
      });
    };

    var nextCoordinates;

    if (feature.type === Constants.geojsonTypes.POINT) {
      nextCoordinates = moveCoordinate(currentCoordinates);
    } else if (feature.type === Constants.geojsonTypes.LINE_STRING || feature.type === Constants.geojsonTypes.MULTI_POINT) {
      nextCoordinates = currentCoordinates.map(moveCoordinate);
    } else if (feature.type === Constants.geojsonTypes.POLYGON || feature.type === Constants.geojsonTypes.MULTI_LINE_STRING) {
      nextCoordinates = currentCoordinates.map(moveRing);
    } else if (feature.type === Constants.geojsonTypes.MULTI_POLYGON) {
      nextCoordinates = currentCoordinates.map(moveMultiPolygon);
    }

    feature.incomingCoords(nextCoordinates);
  });
};

},{"../constants":23,"./constrain_feature_movement":31}],46:[function(require,module,exports){
"use strict";

var area = require('@mapbox/geojson-area');

var Constants = require('../constants');

var FEATURE_SORT_RANKS = {
  Point: 0,
  LineString: 1,
  Polygon: 2
};

function comparator(a, b) {
  var score = FEATURE_SORT_RANKS[a.geometry.type] - FEATURE_SORT_RANKS[b.geometry.type];

  if (score === 0 && a.geometry.type === Constants.geojsonTypes.POLYGON) {
    return a.area - b.area;
  }

  return score;
} // Sort in the order above, then sort polygons by area ascending.


function sortFeatures(features) {
  return features.map(function (feature) {
    if (feature.geometry.type === Constants.geojsonTypes.POLYGON) {
      feature.area = area.geometry({
        type: Constants.geojsonTypes.FEATURE,
        property: {},
        geometry: feature.geometry
      });
    }

    return feature;
  }).sort(comparator).map(function (feature) {
    delete feature.area;
    return feature;
  });
}

module.exports = sortFeatures;

},{"../constants":23,"@mapbox/geojson-area":3}],47:[function(require,module,exports){
"use strict";

function StringSet(items) {
  this._items = {};
  this._nums = {};
  this._length = items ? items.length : 0;
  if (!items) return;

  for (var i = 0, l = items.length; i < l; i++) {
    this.add(items[i]);
    if (items[i] === undefined) continue;
    if (typeof items[i] === 'string') this._items[items[i]] = i;else this._nums[items[i]] = i;
  }
}

StringSet.prototype.add = function (x) {
  if (this.has(x)) return this;
  this._length++;
  if (typeof x === 'string') this._items[x] = this._length;else this._nums[x] = this._length;
  return this;
};

StringSet.prototype.delete = function (x) {
  if (this.has(x) === false) return this;
  this._length--;
  delete this._items[x];
  delete this._nums[x];
  return this;
};

StringSet.prototype.has = function (x) {
  if (typeof x !== 'string' && typeof x !== 'number') return false;
  return this._items[x] !== undefined || this._nums[x] !== undefined;
};

StringSet.prototype.values = function () {
  var _this = this;

  var values = [];
  Object.keys(this._items).forEach(function (k) {
    values.push({
      k: k,
      v: _this._items[k]
    });
  });
  Object.keys(this._nums).forEach(function (k) {
    values.push({
      k: JSON.parse(k),
      v: _this._nums[k]
    });
  });
  return values.sort(function (a, b) {
    return a.v - b.v;
  }).map(function (a) {
    return a.k;
  });
};

StringSet.prototype.clear = function () {
  this._length = 0;
  this._items = {};
  this._nums = {};
  return this;
};

module.exports = StringSet;

},{}],48:[function(require,module,exports){
"use strict";

module.exports = function (a, b) {
  if (a.length !== b.length) return false;
  return JSON.stringify(a.map(function (id) {
    return id;
  }).sort()) === JSON.stringify(b.map(function (id) {
    return id;
  }).sort());
};

},{}],49:[function(require,module,exports){
"use strict";

module.exports = [{
  'id': 'gl-draw-polygon-fill-inactive',
  'type': 'fill',
  'filter': ['all', ['==', 'active', 'false'], ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
  'paint': {
    'fill-color': '#3bb2d0',
    'fill-outline-color': '#3bb2d0',
    'fill-opacity': 0.1
  }
}, {
  'id': 'gl-draw-polygon-fill-active',
  'type': 'fill',
  'filter': ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
  'paint': {
    'fill-color': '#fbb03b',
    'fill-outline-color': '#fbb03b',
    'fill-opacity': 0.1
  }
}, {
  'id': 'gl-draw-polygon-midpoint',
  'type': 'circle',
  'filter': ['all', ['==', '$type', 'Point'], ['==', 'meta', 'midpoint']],
  'paint': {
    'circle-radius': 3,
    'circle-color': '#fbb03b'
  }
}, {
  'id': 'gl-draw-polygon-stroke-inactive',
  'type': 'line',
  'filter': ['all', ['==', 'active', 'false'], ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
  'layout': {
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': '#3bb2d0',
    'line-width': 2
  }
}, {
  'id': 'gl-draw-polygon-stroke-active',
  'type': 'line',
  'filter': ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
  'layout': {
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': '#fbb03b',
    'line-dasharray': [0.2, 2],
    'line-width': 2
  }
}, {
  'id': 'gl-draw-line-inactive',
  'type': 'line',
  'filter': ['all', ['==', 'active', 'false'], ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
  'layout': {
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': '#3bb2d0',
    'line-width': 2
  }
}, {
  'id': 'gl-draw-line-active',
  'type': 'line',
  'filter': ['all', ['==', '$type', 'LineString'], ['==', 'active', 'true']],
  'layout': {
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': '#fbb03b',
    'line-dasharray': [0.2, 2],
    'line-width': 2
  }
}, {
  'id': 'gl-draw-polygon-and-line-vertex-stroke-inactive',
  'type': 'circle',
  'filter': ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
  'paint': {
    'circle-radius': 5,
    'circle-color': '#fff'
  }
}, {
  'id': 'gl-draw-polygon-and-line-vertex-inactive',
  'type': 'circle',
  'filter': ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
  'paint': {
    'circle-radius': 3,
    'circle-color': '#fbb03b'
  }
}, {
  'id': 'gl-draw-point-point-stroke-inactive',
  'type': 'circle',
  'filter': ['all', ['==', 'active', 'false'], ['==', '$type', 'Point'], ['==', 'meta', 'feature'], ['!=', 'mode', 'static']],
  'paint': {
    'circle-radius': 5,
    'circle-opacity': 1,
    'circle-color': '#fff'
  }
}, {
  'id': 'gl-draw-point-inactive',
  'type': 'circle',
  'filter': ['all', ['==', 'active', 'false'], ['==', '$type', 'Point'], ['==', 'meta', 'feature'], ['!=', 'mode', 'static']],
  'paint': {
    'circle-radius': 3,
    'circle-color': '#3bb2d0'
  }
}, {
  'id': 'gl-draw-point-stroke-active',
  'type': 'circle',
  'filter': ['all', ['==', '$type', 'Point'], ['==', 'active', 'true'], ['!=', 'meta', 'midpoint']],
  'paint': {
    'circle-radius': 7,
    'circle-color': '#fff'
  }
}, {
  'id': 'gl-draw-point-active',
  'type': 'circle',
  'filter': ['all', ['==', '$type', 'Point'], ['!=', 'meta', 'midpoint'], ['==', 'active', 'true']],
  'paint': {
    'circle-radius': 5,
    'circle-color': '#fbb03b'
  }
}, {
  'id': 'gl-draw-polygon-fill-static',
  'type': 'fill',
  'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
  'paint': {
    'fill-color': '#404040',
    'fill-outline-color': '#404040',
    'fill-opacity': 0.1
  }
}, {
  'id': 'gl-draw-polygon-stroke-static',
  'type': 'line',
  'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
  'layout': {
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': '#404040',
    'line-width': 2
  }
}, {
  'id': 'gl-draw-line-static',
  'type': 'line',
  'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'LineString']],
  'layout': {
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': '#404040',
    'line-width': 2
  }
}, {
  'id': 'gl-draw-point-static',
  'type': 'circle',
  'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'Point']],
  'paint': {
    'circle-radius': 5,
    'circle-color': '#404040'
  }
}];

},{}],50:[function(require,module,exports){
"use strict";

function throttle(fn, time, context) {
  var lock, args;

  function later() {
    // reset lock and call if queued
    lock = false;

    if (args) {
      wrapperFn.apply(context, args);
      args = false;
    }
  }

  function wrapperFn() {
    if (lock) {
      // called too soon, queue to call later
      args = arguments;
    } else {
      // lock until later then call
      lock = true;
      fn.apply(context, arguments);
      setTimeout(later, time);
    }
  }

  return wrapperFn;
}

module.exports = throttle;

},{}],51:[function(require,module,exports){
"use strict";

/**
 * Derive a dense array (no `undefined`s) from a single value or array.
 *
 * @param {any} x
 * @return {Array<any>}
 */
function toDenseArray(x) {
  return [].concat(x).filter(function (y) {
    return y !== undefined;
  });
}

module.exports = toDenseArray;

},{}],52:[function(require,module,exports){
"use strict";

var _require = require('../lib/common_selectors'),
    noTarget = _require.noTarget,
    isOfMetaType = _require.isOfMetaType,
    isInactiveFeature = _require.isInactiveFeature,
    isShiftDown = _require.isShiftDown;

var createSupplementaryPoints = require('../lib/create_supplementary_points');

var constrainFeatureMovement = require('../lib/constrain_feature_movement');

var doubleClickZoom = require('../lib/double_click_zoom');

var Constants = require('../constants');

var CommonSelectors = require('../lib/common_selectors');

var moveFeatures = require('../lib/move_features');

var isVertex = isOfMetaType(Constants.meta.VERTEX);
var isMidpoint = isOfMetaType(Constants.meta.MIDPOINT);
var DirectSelect = {}; // INTERNAL FUCNTIONS

DirectSelect.fireUpdate = function () {
  this.map.fire(Constants.events.UPDATE, {
    action: Constants.updateActions.CHANGE_COORDINATES,
    features: this.getSelected().map(function (f) {
      return f.toGeoJSON();
    })
  });
};

DirectSelect.fireActionable = function (state) {
  this.setActionableState({
    combineFeatures: false,
    uncombineFeatures: false,
    trash: state.selectedCoordPaths.length > 0
  });
};

DirectSelect.startDragging = function (state, e) {
  this.map.dragPan.disable();
  state.canDragMove = true;
  state.dragMoveLocation = e.lngLat;
};

DirectSelect.stopDragging = function (state) {
  this.map.dragPan.enable();
  state.dragMoving = false;
  state.canDragMove = false;
  state.dragMoveLocation = null;
};

DirectSelect.onVertex = function (state, e) {
  this.startDragging(state, e);
  var about = e.featureTarget.properties;
  var selectedIndex = state.selectedCoordPaths.indexOf(about.coord_path);

  if (!isShiftDown(e) && selectedIndex === -1) {
    state.selectedCoordPaths = [about.coord_path];
  } else if (isShiftDown(e) && selectedIndex === -1) {
    state.selectedCoordPaths.push(about.coord_path);
  }

  var selectedCoordinates = this.pathsToCoordinates(state.featureId, state.selectedCoordPaths);
  this.setSelectedCoordinates(selectedCoordinates);
};

DirectSelect.onMidpoint = function (state, e) {
  this.startDragging(state, e);
  var about = e.featureTarget.properties;
  state.feature.addCoordinate(about.coord_path, about.lng, about.lat);
  this.fireUpdate();
  state.selectedCoordPaths = [about.coord_path];
};

DirectSelect.pathsToCoordinates = function (featureId, paths) {
  return paths.map(function (coord_path) {
    return {
      feature_id: featureId,
      coord_path: coord_path
    };
  });
};

DirectSelect.onFeature = function (state, e) {
  if (state.selectedCoordPaths.length === 0) this.startDragging(state, e);else this.stopDragging(state);
};

DirectSelect.dragFeature = function (state, e, delta) {
  moveFeatures(this.getSelected(), delta);
  state.dragMoveLocation = e.lngLat;
};

DirectSelect.dragVertex = function (state, e, delta) {
  var selectedCoords = state.selectedCoordPaths.map(function (coord_path) {
    return state.feature.getCoordinate(coord_path);
  });
  var selectedCoordPoints = selectedCoords.map(function (coords) {
    return {
      type: Constants.geojsonTypes.FEATURE,
      properties: {},
      geometry: {
        type: Constants.geojsonTypes.POINT,
        coordinates: coords
      }
    };
  });
  var constrainedDelta = constrainFeatureMovement(selectedCoordPoints, delta);

  for (var i = 0; i < selectedCoords.length; i++) {
    var coord = selectedCoords[i];
    state.feature.updateCoordinate(state.selectedCoordPaths[i], coord[0] + constrainedDelta.lng, coord[1] + constrainedDelta.lat);
  }
};

DirectSelect.clickNoTarget = function () {
  this.changeMode(Constants.modes.SIMPLE_SELECT);
};

DirectSelect.clickInactive = function () {
  this.changeMode(Constants.modes.SIMPLE_SELECT);
};

DirectSelect.clickActiveFeature = function (state) {
  state.selectedCoordPaths = [];
  this.clearSelectedCoordinates();
  state.feature.changed();
}; // EXTERNAL FUNCTIONS


DirectSelect.onSetup = function (opts) {
  var featureId = opts.featureId;
  var feature = this.getFeature(featureId);

  if (!feature) {
    throw new Error('You must provide a featureId to enter direct_select mode');
  }

  if (feature.type === Constants.geojsonTypes.POINT) {
    throw new TypeError('direct_select mode doesn\'t handle point features');
  }

  var state = {
    featureId: featureId,
    feature: feature,
    dragMoveLocation: opts.startPos || null,
    dragMoving: false,
    canDragMove: false,
    selectedCoordPaths: opts.coordPath ? [opts.coordPath] : []
  };
  this.setSelectedCoordinates(this.pathsToCoordinates(featureId, state.selectedCoordPaths));
  this.setSelected(featureId);
  doubleClickZoom.disable(this);
  this.setActionableState({
    trash: true
  });
  return state;
};

DirectSelect.onStop = function () {
  doubleClickZoom.enable(this);
  this.clearSelectedCoordinates();
};

DirectSelect.toDisplayFeatures = function (state, geojson, push) {
  if (state.featureId === geojson.properties.id) {
    geojson.properties.active = Constants.activeStates.ACTIVE;
    push(geojson);
    createSupplementaryPoints(geojson, {
      map: this.map,
      midpoints: true,
      selectedPaths: state.selectedCoordPaths
    }).forEach(push);
  } else {
    geojson.properties.active = Constants.activeStates.INACTIVE;
    push(geojson);
  }

  this.fireActionable(state);
};

DirectSelect.onTrash = function (state) {
  state.selectedCoordPaths.sort().reverse().forEach(function (id) {
    return state.feature.removeCoordinate(id);
  });
  this.fireUpdate();
  state.selectedCoordPaths = [];
  this.clearSelectedCoordinates();
  this.fireActionable(state);

  if (state.feature.isValid() === false) {
    this.deleteFeature([state.featureId]);
    this.changeMode(Constants.modes.SIMPLE_SELECT, {});
  }
};

DirectSelect.onMouseMove = function (state, e) {
  // On mousemove that is not a drag, stop vertex movement.
  var isFeature = CommonSelectors.isActiveFeature(e);
  var onVertex = isVertex(e);
  var noCoords = state.selectedCoordPaths.length === 0;
  if (isFeature && noCoords) this.updateUIClasses({
    mouse: Constants.cursors.MOVE
  });else if (onVertex && !noCoords) this.updateUIClasses({
    mouse: Constants.cursors.MOVE
  });else this.updateUIClasses({
    mouse: Constants.cursors.NONE
  });
  this.stopDragging(state);
};

DirectSelect.onMouseOut = function (state) {
  // As soon as you mouse leaves the canvas, update the feature
  if (state.dragMoving) this.fireUpdate();
};

DirectSelect.onTouchStart = DirectSelect.onMouseDown = function (state, e) {
  if (isVertex(e)) return this.onVertex(state, e);
  if (CommonSelectors.isActiveFeature(e)) return this.onFeature(state, e);
  if (isMidpoint(e)) return this.onMidpoint(state, e);
};

DirectSelect.onDrag = function (state, e) {
  if (state.canDragMove !== true) return;
  state.dragMoving = true;
  e.originalEvent.stopPropagation();
  var delta = {
    lng: e.lngLat.lng - state.dragMoveLocation.lng,
    lat: e.lngLat.lat - state.dragMoveLocation.lat
  };
  if (state.selectedCoordPaths.length > 0) this.dragVertex(state, e, delta);else this.dragFeature(state, e, delta);
  state.dragMoveLocation = e.lngLat;
};

DirectSelect.onClick = function (state, e) {
  if (noTarget(e)) return this.clickNoTarget(state, e);
  if (CommonSelectors.isActiveFeature(e)) return this.clickActiveFeature(state, e);
  if (isInactiveFeature(e)) return this.clickInactive(state, e);
  this.stopDragging(state);
};

DirectSelect.onTap = function (state, e) {
  if (noTarget(e)) return this.clickNoTarget(state, e);
  if (CommonSelectors.isActiveFeature(e)) return this.clickActiveFeature(state, e);
  if (isInactiveFeature(e)) return this.clickInactive(state, e);
};

DirectSelect.onTouchEnd = DirectSelect.onMouseUp = function (state) {
  if (state.dragMoving) {
    this.fireUpdate();
  }

  this.stopDragging(state);
};

module.exports = DirectSelect;

},{"../constants":23,"../lib/common_selectors":30,"../lib/constrain_feature_movement":31,"../lib/create_supplementary_points":33,"../lib/double_click_zoom":35,"../lib/move_features":45}],53:[function(require,module,exports){
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var CommonSelectors = require('../lib/common_selectors');

var isEventAtCoordinates = require('../lib/is_event_at_coordinates');

var doubleClickZoom = require('../lib/double_click_zoom');

var Constants = require('../constants');

var createVertex = require('../lib/create_vertex');

var DrawLineString = {};

DrawLineString.onSetup = function (opts) {
  opts = opts || {};
  var featureId = opts.featureId;
  var line, currentVertexPosition;
  var direction = 'forward';

  if (featureId) {
    line = this.getFeature(featureId);

    if (!line) {
      throw new Error('Could not find a feature with the provided featureId');
    }

    var from = opts.from;

    if (from && from.type === 'Feature' && from.geometry && from.geometry.type === 'Point') {
      from = from.geometry;
    }

    if (from && from.type === 'Point' && from.coordinates && from.coordinates.length === 2) {
      from = from.coordinates;
    }

    if (!from || !Array.isArray(from)) {
      throw new Error('Please use the `from` property to indicate which point to continue the line from');
    }

    var lastCoord = line.coordinates.length - 1;

    if (line.coordinates[lastCoord][0] === from[0] && line.coordinates[lastCoord][1] === from[1]) {
      var _line;

      currentVertexPosition = lastCoord + 1; // add one new coordinate to continue from

      (_line = line).addCoordinate.apply(_line, [currentVertexPosition].concat(_toConsumableArray(line.coordinates[lastCoord])));
    } else if (line.coordinates[0][0] === from[0] && line.coordinates[0][1] === from[1]) {
      var _line2;

      direction = 'backwards';
      currentVertexPosition = 0; // add one new coordinate to continue from

      (_line2 = line).addCoordinate.apply(_line2, [currentVertexPosition].concat(_toConsumableArray(line.coordinates[0])));
    } else {
      throw new Error('`from` should match the point at either the start or the end of the provided LineString');
    }
  } else {
    line = this.newFeature({
      type: Constants.geojsonTypes.FEATURE,
      properties: {},
      geometry: {
        type: Constants.geojsonTypes.LINE_STRING,
        coordinates: []
      }
    });
    currentVertexPosition = 0;
    this.addFeature(line);
  }

  this.clearSelectedFeatures();
  doubleClickZoom.disable(this);
  this.updateUIClasses({
    mouse: Constants.cursors.ADD
  });
  this.activateUIButton(Constants.types.LINE);
  this.setActionableState({
    trash: true
  });
  return {
    line: line,
    currentVertexPosition: currentVertexPosition,
    direction: direction
  };
};

DrawLineString.clickAnywhere = function (state, e) {
  if (state.currentVertexPosition > 0 && isEventAtCoordinates(e, state.line.coordinates[state.currentVertexPosition - 1]) || state.direction === 'backwards' && isEventAtCoordinates(e, state.line.coordinates[state.currentVertexPosition + 1])) {
    return this.changeMode(Constants.modes.SIMPLE_SELECT, {
      featureIds: [state.line.id]
    });
  }

  this.updateUIClasses({
    mouse: Constants.cursors.ADD
  });
  state.line.updateCoordinate(state.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);

  if (state.direction === 'forward') {
    state.currentVertexPosition++;
    state.line.updateCoordinate(state.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
  } else {
    state.line.addCoordinate(0, e.lngLat.lng, e.lngLat.lat);
  }
};

DrawLineString.clickOnVertex = function (state) {
  return this.changeMode(Constants.modes.SIMPLE_SELECT, {
    featureIds: [state.line.id]
  });
};

DrawLineString.onMouseMove = function (state, e) {
  state.line.updateCoordinate(state.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);

  if (CommonSelectors.isVertex(e)) {
    this.updateUIClasses({
      mouse: Constants.cursors.POINTER
    });
  }
};

DrawLineString.onTap = DrawLineString.onClick = function (state, e) {
  if (CommonSelectors.isVertex(e)) return this.clickOnVertex(state, e);
  this.clickAnywhere(state, e);
};

DrawLineString.onKeyUp = function (state, e) {
  if (CommonSelectors.isEnterKey(e)) {
    this.changeMode(Constants.modes.SIMPLE_SELECT, {
      featureIds: [state.line.id]
    });
  } else if (CommonSelectors.isEscapeKey(e)) {
    this.deleteFeature([state.line.id], {
      silent: true
    });
    this.changeMode(Constants.modes.SIMPLE_SELECT);
  }
};

DrawLineString.onStop = function (state) {
  doubleClickZoom.enable(this);
  this.activateUIButton(); // check to see if we've deleted this feature

  if (this.getFeature(state.line.id) === undefined) return; //remove last added coordinate

  state.line.removeCoordinate("".concat(state.currentVertexPosition));

  if (state.line.isValid()) {
    this.map.fire(Constants.events.CREATE, {
      features: [state.line.toGeoJSON()]
    });
  } else {
    this.deleteFeature([state.line.id], {
      silent: true
    });
    this.changeMode(Constants.modes.SIMPLE_SELECT, {}, {
      silent: true
    });
  }
};

DrawLineString.onTrash = function (state) {
  this.deleteFeature([state.line.id], {
    silent: true
  });
  this.changeMode(Constants.modes.SIMPLE_SELECT);
};

DrawLineString.toDisplayFeatures = function (state, geojson, display) {
  var isActiveLine = geojson.properties.id === state.line.id;
  geojson.properties.active = isActiveLine ? Constants.activeStates.ACTIVE : Constants.activeStates.INACTIVE;
  if (!isActiveLine) return display(geojson); // Only render the line if it has at least one real coordinate

  if (geojson.geometry.coordinates.length < 2) return;
  geojson.properties.meta = Constants.meta.FEATURE;
  display(createVertex(state.line.id, geojson.geometry.coordinates[state.direction === 'forward' ? geojson.geometry.coordinates.length - 2 : 1], "".concat(state.direction === 'forward' ? geojson.geometry.coordinates.length - 2 : 1), false));
  display(geojson);
};

module.exports = DrawLineString;

},{"../constants":23,"../lib/common_selectors":30,"../lib/create_vertex":34,"../lib/double_click_zoom":35,"../lib/is_event_at_coordinates":40}],54:[function(require,module,exports){
"use strict";

var CommonSelectors = require('../lib/common_selectors');

var Constants = require('../constants');

var DrawPoint = {};

DrawPoint.onSetup = function () {
  var point = this.newFeature({
    type: Constants.geojsonTypes.FEATURE,
    properties: {},
    geometry: {
      type: Constants.geojsonTypes.POINT,
      coordinates: []
    }
  });
  this.addFeature(point);
  this.clearSelectedFeatures();
  this.updateUIClasses({
    mouse: Constants.cursors.ADD
  });
  this.activateUIButton(Constants.types.POINT);
  this.setActionableState({
    trash: true
  });
  return {
    point: point
  };
};

DrawPoint.stopDrawingAndRemove = function (state) {
  this.deleteFeature([state.point.id], {
    silent: true
  });
  this.changeMode(Constants.modes.SIMPLE_SELECT);
};

DrawPoint.onTap = DrawPoint.onClick = function (state, e) {
  this.updateUIClasses({
    mouse: Constants.cursors.MOVE
  });
  state.point.updateCoordinate('', e.lngLat.lng, e.lngLat.lat);
  this.map.fire(Constants.events.CREATE, {
    features: [state.point.toGeoJSON()]
  });
  this.changeMode(Constants.modes.SIMPLE_SELECT, {
    featureIds: [state.point.id]
  });
};

DrawPoint.onStop = function (state) {
  this.activateUIButton();

  if (!state.point.getCoordinate().length) {
    this.deleteFeature([state.point.id], {
      silent: true
    });
  }
};

DrawPoint.toDisplayFeatures = function (state, geojson, display) {
  // Never render the point we're drawing
  var isActivePoint = geojson.properties.id === state.point.id;
  geojson.properties.active = isActivePoint ? Constants.activeStates.ACTIVE : Constants.activeStates.INACTIVE;
  if (!isActivePoint) return display(geojson);
};

DrawPoint.onTrash = DrawPoint.stopDrawingAndRemove;

DrawPoint.onKeyUp = function (state, e) {
  if (CommonSelectors.isEscapeKey(e) || CommonSelectors.isEnterKey(e)) {
    return this.stopDrawingAndRemove(state, e);
  }
};

module.exports = DrawPoint;

},{"../constants":23,"../lib/common_selectors":30}],55:[function(require,module,exports){
"use strict";

var CommonSelectors = require('../lib/common_selectors');

var doubleClickZoom = require('../lib/double_click_zoom');

var Constants = require('../constants');

var isEventAtCoordinates = require('../lib/is_event_at_coordinates');

var createVertex = require('../lib/create_vertex');

var DrawPolygon = {};

DrawPolygon.onSetup = function () {
  var polygon = this.newFeature({
    type: Constants.geojsonTypes.FEATURE,
    properties: {},
    geometry: {
      type: Constants.geojsonTypes.POLYGON,
      coordinates: [[]]
    }
  });
  this.addFeature(polygon);
  this.clearSelectedFeatures();
  doubleClickZoom.disable(this);
  this.updateUIClasses({
    mouse: Constants.cursors.ADD
  });
  this.activateUIButton(Constants.types.POLYGON);
  this.setActionableState({
    trash: true
  });
  return {
    polygon: polygon,
    currentVertexPosition: 0
  };
};

DrawPolygon.clickAnywhere = function (state, e) {
  if (state.currentVertexPosition > 0 && isEventAtCoordinates(e, state.polygon.coordinates[0][state.currentVertexPosition - 1])) {
    return this.changeMode(Constants.modes.SIMPLE_SELECT, {
      featureIds: [state.polygon.id]
    });
  }

  this.updateUIClasses({
    mouse: Constants.cursors.ADD
  });
  state.polygon.updateCoordinate("0.".concat(state.currentVertexPosition), e.lngLat.lng, e.lngLat.lat);
  state.currentVertexPosition++;
  state.polygon.updateCoordinate("0.".concat(state.currentVertexPosition), e.lngLat.lng, e.lngLat.lat);
};

DrawPolygon.clickOnVertex = function (state) {
  return this.changeMode(Constants.modes.SIMPLE_SELECT, {
    featureIds: [state.polygon.id]
  });
};

DrawPolygon.onMouseMove = function (state, e) {
  state.polygon.updateCoordinate("0.".concat(state.currentVertexPosition), e.lngLat.lng, e.lngLat.lat);

  if (CommonSelectors.isVertex(e)) {
    this.updateUIClasses({
      mouse: Constants.cursors.POINTER
    });
  }
};

DrawPolygon.onTap = DrawPolygon.onClick = function (state, e) {
  if (CommonSelectors.isVertex(e)) return this.clickOnVertex(state, e);
  return this.clickAnywhere(state, e);
};

DrawPolygon.onKeyUp = function (state, e) {
  if (CommonSelectors.isEscapeKey(e)) {
    this.deleteFeature([state.polygon.id], {
      silent: true
    });
    this.changeMode(Constants.modes.SIMPLE_SELECT);
  } else if (CommonSelectors.isEnterKey(e)) {
    this.changeMode(Constants.modes.SIMPLE_SELECT, {
      featureIds: [state.polygon.id]
    });
  }
};

DrawPolygon.onStop = function (state) {
  this.updateUIClasses({
    mouse: Constants.cursors.NONE
  });
  doubleClickZoom.enable(this);
  this.activateUIButton(); // check to see if we've deleted this feature

  if (this.getFeature(state.polygon.id) === undefined) return; //remove last added coordinate

  state.polygon.removeCoordinate("0.".concat(state.currentVertexPosition));

  if (state.polygon.isValid()) {
    this.map.fire(Constants.events.CREATE, {
      features: [state.polygon.toGeoJSON()]
    });
  } else {
    this.deleteFeature([state.polygon.id], {
      silent: true
    });
    this.changeMode(Constants.modes.SIMPLE_SELECT, {}, {
      silent: true
    });
  }
};

DrawPolygon.toDisplayFeatures = function (state, geojson, display) {
  var isActivePolygon = geojson.properties.id === state.polygon.id;
  geojson.properties.active = isActivePolygon ? Constants.activeStates.ACTIVE : Constants.activeStates.INACTIVE;
  if (!isActivePolygon) return display(geojson); // Don't render a polygon until it has two positions
  // (and a 3rd which is just the first repeated)

  if (geojson.geometry.coordinates.length === 0) return;
  var coordinateCount = geojson.geometry.coordinates[0].length; // 2 coordinates after selecting a draw type
  // 3 after creating the first point

  if (coordinateCount < 3) {
    return;
  }

  geojson.properties.meta = Constants.meta.FEATURE;
  display(createVertex(state.polygon.id, geojson.geometry.coordinates[0][0], '0.0', false));

  if (coordinateCount > 3) {
    // Add a start position marker to the map, clicking on this will finish the feature
    // This should only be shown when we're in a valid spot
    var endPos = geojson.geometry.coordinates[0].length - 3;
    display(createVertex(state.polygon.id, geojson.geometry.coordinates[0][endPos], "0.".concat(endPos), false));
  }

  if (coordinateCount <= 4) {
    // If we've only drawn two positions (plus the closer),
    // make a LineString instead of a Polygon
    var lineCoordinates = [[geojson.geometry.coordinates[0][0][0], geojson.geometry.coordinates[0][0][1]], [geojson.geometry.coordinates[0][1][0], geojson.geometry.coordinates[0][1][1]]]; // create an initial vertex so that we can track the first point on mobile devices

    display({
      type: Constants.geojsonTypes.FEATURE,
      properties: geojson.properties,
      geometry: {
        coordinates: lineCoordinates,
        type: Constants.geojsonTypes.LINE_STRING
      }
    });

    if (coordinateCount === 3) {
      return;
    }
  } // render the Polygon


  return display(geojson);
};

DrawPolygon.onTrash = function (state) {
  this.deleteFeature([state.polygon.id], {
    silent: true
  });
  this.changeMode(Constants.modes.SIMPLE_SELECT);
};

module.exports = DrawPolygon;

},{"../constants":23,"../lib/common_selectors":30,"../lib/create_vertex":34,"../lib/double_click_zoom":35,"../lib/is_event_at_coordinates":40}],56:[function(require,module,exports){
"use strict";

module.exports = {
  simple_select: require('./simple_select'),
  direct_select: require('./direct_select'),
  draw_point: require('./draw_point'),
  draw_polygon: require('./draw_polygon'),
  draw_line_string: require('./draw_line_string')
};

},{"./direct_select":52,"./draw_line_string":53,"./draw_point":54,"./draw_polygon":55,"./simple_select":60}],57:[function(require,module,exports){
"use strict";

var ModeInterface = module.exports = require('./mode_interface_accessors');
/**
 * Triggered while a mode is being transitioned into.
 * @param opts {Object} - this is the object passed via `draw.changeMode('mode', opts)`;
 * @name MODE.onSetup
 * @returns {Object} - this object will be passed to all other life cycle functions
 */


ModeInterface.prototype.onSetup = function () {};
/**
 * Triggered when a drag event is detected on the map
 * @name MODE.onDrag
 * @param state {Object} - a mutible state object created by onSetup
 * @param e {Object} - the captured event that is triggering this life cycle event
 */


ModeInterface.prototype.onDrag = function () {};
/**
 * Triggered when the mouse is clicked
 * @name MODE.onClick
 * @param state {Object} - a mutible state object created by onSetup
 * @param e {Object} - the captured event that is triggering this life cycle event
 */


ModeInterface.prototype.onClick = function () {};
/**
 * Triggered with the mouse is moved
 * @name MODE.onMouseMove
 * @param state {Object} - a mutible state object created by onSetup
 * @param e {Object} - the captured event that is triggering this life cycle event
 */


ModeInterface.prototype.onMouseMove = function () {};
/**
 * Triggered when the mouse button is pressed down
 * @name MODE.onMouseDown
 * @param state {Object} - a mutible state object created by onSetup
 * @param e {Object} - the captured event that is triggering this life cycle event
 */


ModeInterface.prototype.onMouseDown = function () {};
/**
 * Triggered when the mouse button is released
 * @name MODE.onMouseUp
 * @param state {Object} - a mutible state object created by onSetup
 * @param e {Object} - the captured event that is triggering this life cycle event
 */


ModeInterface.prototype.onMouseUp = function () {};
/**
 * Triggered when the mouse leaves the map's container
 * @name MODE.onMouseOut
 * @param state {Object} - a mutible state object created by onSetup
 * @param e {Object} - the captured event that is triggering this life cycle event
 */


ModeInterface.prototype.onMouseOut = function () {};
/**
 * Triggered when a key up event is detected
 * @name MODE.onKeyUp
 * @param state {Object} - a mutible state object created by onSetup
 * @param e {Object} - the captured event that is triggering this life cycle event
 */


ModeInterface.prototype.onKeyUp = function () {};
/**
 * Triggered when a key down event is detected
 * @name MODE.onKeyDown
 * @param state {Object} - a mutible state object created by onSetup
 * @param e {Object} - the captured event that is triggering this life cycle event
 */


ModeInterface.prototype.onKeyDown = function () {};
/**
 * Triggered when a touch event is started
 * @name MODE.onTouchStart
 * @param state {Object} - a mutible state object created by onSetup
 * @param e {Object} - the captured event that is triggering this life cycle event
 */


ModeInterface.prototype.onTouchStart = function () {};
/**
 * Triggered when one drags thier finger on a mobile device
 * @name MODE.onTouchMove
 * @param state {Object} - a mutible state object created by onSetup
 * @param e {Object} - the captured event that is triggering this life cycle event
 */


ModeInterface.prototype.onTouchMove = function () {};
/**
 * Triggered when one removes their finger from the map
 * @name MODE.onTouchEnd
 * @param state {Object} - a mutible state object created by onSetup
 * @param e {Object} - the captured event that is triggering this life cycle event
 */


ModeInterface.prototype.onTouchEnd = function () {};
/**
 * Triggered when one quicly taps the map
 * @name MODE.onTap
 * @param state {Object} - a mutible state object created by onSetup
 * @param e {Object} - the captured event that is triggering this life cycle event
 */


ModeInterface.prototype.onTap = function () {};
/**
 * Triggered when the mode is being exited, to be used for cleaning up artifacts such as invalid features
 * @name MODE.onStop
 * @param state {Object} - a mutible state object created by onSetup
 */


ModeInterface.prototype.onStop = function () {};
/**
 * Triggered when [draw.trash()](https://github.com/mapbox/mapbox-gl-draw/blob/master/API.md#trash-draw) is called.
 * @name MODE.onTrash
 * @param state {Object} - a mutible state object created by onSetup
 */


ModeInterface.prototype.onTrash = function () {};
/**
 * Triggered when [draw.combineFeatures()](https://github.com/mapbox/mapbox-gl-draw/blob/master/API.md#combinefeatures-draw) is called.
 * @name MODE.onCombineFeature
 * @param state {Object} - a mutible state object created by onSetup
 */


ModeInterface.prototype.onCombineFeature = function () {};
/**
 * Triggered when [draw.uncombineFeatures()](https://github.com/mapbox/mapbox-gl-draw/blob/master/API.md#uncombinefeatures-draw) is called.
 * @name MODE.onUncombineFeature
 * @param state {Object} - a mutible state object created by onSetup
 */


ModeInterface.prototype.onUncombineFeature = function () {};
/**
 * Triggered per feature on render to convert raw features into set of features for display on the map
 * See [styling draw](https://github.com/mapbox/mapbox-gl-draw/blob/master/API.md#styling-draw) for information about what geojson properties Draw uses as part of rendering.
 * @name MODE.toDisplayFeatures
 * @param state {Object} - a mutible state object created by onSetup
 * @param geojson {Object} - a geojson being evaulated. To render, pass to `display`.
 * @param display {Function} - all geojson objects passed to this be rendered onto the map
 */


ModeInterface.prototype.toDisplayFeatures = function () {
  throw new Error('You must overwrite toDisplayFeatures');
};

},{"./mode_interface_accessors":58}],58:[function(require,module,exports){
"use strict";

var Constants = require('../constants');

var featuresAt = require('../lib/features_at');

var Point = require('../feature_types/point');

var LineString = require('../feature_types/line_string');

var Polygon = require('../feature_types/polygon');

var MultiFeature = require('../feature_types/multi_feature');

var ModeInterface = module.exports = function (ctx) {
  this.map = ctx.map;
  this.drawConfig = JSON.parse(JSON.stringify(ctx.options || {}));
  this._ctx = ctx;
};
/**
 * Sets Draw's interal selected state
 * @name this.setSelected
 * @param {DrawFeature[]} - whats selected as a [DrawFeature](https://github.com/mapbox/mapbox-gl-draw/blob/master/src/feature_types/feature.js)
 */


ModeInterface.prototype.setSelected = function (features) {
  return this._ctx.store.setSelected(features);
};
/**
 * Sets Draw's internal selected coordinate state
 * @name this.setSelectedCoordinates
 * @param {Object[]} coords - a array of {coord_path: 'string', featureId: 'string'}
 */


ModeInterface.prototype.setSelectedCoordinates = function (coords) {
  var _this = this;

  this._ctx.store.setSelectedCoordinates(coords);

  coords.reduce(function (m, c) {
    if (m[c.feature_id] === undefined) {
      m[c.feature_id] = true;

      _this._ctx.store.get(c.feature_id).changed();
    }

    return m;
  }, {});
};
/**
 * Get all selected features as a [DrawFeature](https://github.com/mapbox/mapbox-gl-draw/blob/master/src/feature_types/feature.js)
 * @name this.getSelected
 * @returns {DrawFeature[]}
 */


ModeInterface.prototype.getSelected = function () {
  return this._ctx.store.getSelected();
};
/**
 * Get the ids of all currently selected features
 * @name this.getSelectedIds
 * @returns {String[]}
 */


ModeInterface.prototype.getSelectedIds = function () {
  return this._ctx.store.getSelectedIds();
};
/**
 * Check if a feature is selected
 * @name this.isSelected
 * @param {String} id - a feature id
 * @returns {Boolean}
 */


ModeInterface.prototype.isSelected = function (id) {
  return this._ctx.store.isSelected(id);
};
/**
 * Get a [DrawFeature](https://github.com/mapbox/mapbox-gl-draw/blob/master/src/feature_types/feature.js) by its id
 * @name this.getFeature
 * @param {String} id - a feature id
 * @returns {DrawFeature}
 */


ModeInterface.prototype.getFeature = function (id) {
  return this._ctx.store.get(id);
};
/**
 * Add a feature to draw's internal selected state
 * @name this.select
 * @param {String} id
 */


ModeInterface.prototype.select = function (id) {
  return this._ctx.store.select(id);
};
/**
 * Remove a feature from draw's internal selected state
 * @name this.delete
 * @param {String} id
 */


ModeInterface.prototype.deselect = function (id) {
  return this._ctx.store.deselect(id);
};
/**
 * Delete a feature from draw
 * @name this.deleteFeature
 * @param {String} id - a feature id
 */


ModeInterface.prototype.deleteFeature = function (id) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return this._ctx.store.delete(id, opts);
};
/**
 * Add a [DrawFeature](https://github.com/mapbox/mapbox-gl-draw/blob/master/src/feature_types/feature.js) to draw.
 * See `this.newFeature` for converting geojson into a DrawFeature
 * @name this.addFeature
 * @param {DrawFeature} feature - the feature to add
 */


ModeInterface.prototype.addFeature = function (feature) {
  return this._ctx.store.add(feature);
};
/**
 * Clear all selected features
 */


ModeInterface.prototype.clearSelectedFeatures = function () {
  return this._ctx.store.clearSelected();
};
/**
 * Clear all selected coordinates
 */


ModeInterface.prototype.clearSelectedCoordinates = function () {
  return this._ctx.store.clearSelectedCoordinates();
};
/**
 * Indicate if the different action are currently possible with your mode
 * See [draw.actionalbe](https://github.com/mapbox/mapbox-gl-draw/blob/master/API.md#drawactionable) for a list of possible actions. All undefined actions are set to **false** by default
 * @name this.setActionableState
 * @param {Object} actions
 */


ModeInterface.prototype.setActionableState = function () {
  var actions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var newSet = {
    trash: actions.trash || false,
    combineFeatures: actions.combineFeatures || false,
    uncombineFeatures: actions.uncombineFeatures || false
  };
  return this._ctx.events.actionable(newSet);
};
/**
 * Trigger a mode change
 * @name this.changeMode
 * @param {String} mode - the mode to transition into
 * @param {Object} opts - the options object to pass to the new mode
 * @param {Object} eventOpts - used to control what kind of events are emitted.
 */


ModeInterface.prototype.changeMode = function (mode) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var eventOpts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return this._ctx.events.changeMode(mode, opts, eventOpts);
};
/**
 * Update the state of draw map classes
 * @name this.updateUIClasses
 * @param {Object} opts
 */


ModeInterface.prototype.updateUIClasses = function (opts) {
  return this._ctx.ui.queueMapClasses(opts);
};
/**
 * If a name is provided it makes that button active, else if makes all buttons inactive
 * @name this.activateUIButton
 * @param {String?} name - name of the button to make active, leave as undefined to set buttons to be inactive
 */


ModeInterface.prototype.activateUIButton = function (name) {
  return this._ctx.ui.setActiveButton(name);
};
/**
 * Get the features at the location of an event object or in a bbox
 * @name this.featuresAt
 * @param {Event||NULL} event - a mapbox-gl event object
 * @param {BBOX||NULL} bbox - the area to get features from
 * @param {String} bufferType - is this `click` or `tap` event, defaults to click
 */


ModeInterface.prototype.featuresAt = function (event, bbox) {
  var bufferType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'click';
  if (bufferType !== 'click' && bufferType !== 'touch') throw new Error('invalid buffer type');
  return featuresAt[bufferType](event, bbox, this._ctx);
};
/**
 * Create a new [DrawFeature](https://github.com/mapbox/mapbox-gl-draw/blob/master/src/feature_types/feature.js) from geojson
 * @name this.newFeature
 * @param {GeoJSONFeature} geojson
 * @returns {DrawFeature}
 */


ModeInterface.prototype.newFeature = function (geojson) {
  var type = geojson.geometry.type;
  if (type === Constants.geojsonTypes.POINT) return new Point(this._ctx, geojson);
  if (type === Constants.geojsonTypes.LINE_STRING) return new LineString(this._ctx, geojson);
  if (type === Constants.geojsonTypes.POLYGON) return new Polygon(this._ctx, geojson);
  return new MultiFeature(this._ctx, geojson);
};
/**
 * Check is an object is an instance of a [DrawFeature](https://github.com/mapbox/mapbox-gl-draw/blob/master/src/feature_types/feature.js)
 * @name this.isInstanceOf
 * @param {String} type - `Point`, `LineString`, `Polygon`, `MultiFeature`
 * @param {Object} feature - the object that needs to be checked
 * @returns {Boolean}
 */


ModeInterface.prototype.isInstanceOf = function (type, feature) {
  if (type === Constants.geojsonTypes.POINT) return feature instanceof Point;
  if (type === Constants.geojsonTypes.LINE_STRING) return feature instanceof LineString;
  if (type === Constants.geojsonTypes.POLYGON) return feature instanceof Polygon;
  if (type === 'MultiFeature') return feature instanceof MultiFeature;
  throw new Error("Unknown feature class: ".concat(type));
};
/**
 * Force draw to rerender the feature of the provided id
 * @name this.doRender
 * @param {String} id - a feature id
 */


ModeInterface.prototype.doRender = function (id) {
  return this._ctx.store.featureChanged(id);
};

},{"../constants":23,"../feature_types/line_string":26,"../feature_types/multi_feature":27,"../feature_types/point":28,"../feature_types/polygon":29,"../lib/features_at":37}],59:[function(require,module,exports){
"use strict";

var ModeInterface = require('./mode_interface');

var eventMapper = {
  drag: 'onDrag',
  click: 'onClick',
  mousemove: 'onMouseMove',
  mousedown: 'onMouseDown',
  mouseup: 'onMouseUp',
  mouseout: 'onMouseOut',
  keyup: 'onKeyUp',
  keydown: 'onKeyDown',
  touchstart: 'onTouchStart',
  touchmove: 'onTouchMove',
  touchend: 'onTouchEnd',
  tap: 'onTap'
};
var eventKeys = Object.keys(eventMapper);

module.exports = function (modeObject) {
  var modeObjectKeys = Object.keys(modeObject);
  return function (ctx) {
    var startOpts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var state = {};
    var mode = modeObjectKeys.reduce(function (m, k) {
      m[k] = modeObject[k];
      return m;
    }, new ModeInterface(ctx));

    function wrapper(eh) {
      return function (e) {
        mode[eh](state, e);
      };
    }

    return {
      start: function start() {
        var _this = this;

        state = mode.onSetup(startOpts); // this should set ui buttons
        // Adds event handlers for all event options
        // add sets the selector to false for all
        // handlers that are not present in the mode
        // to reduce on render calls for functions that
        // have no logic

        eventKeys.forEach(function (key) {
          var modeHandler = eventMapper[key];

          var selector = function selector() {
            return false;
          };

          if (modeObject[modeHandler]) {
            selector = function selector() {
              return true;
            };
          }

          _this.on(key, selector, wrapper(modeHandler));
        });
      },
      stop: function stop() {
        mode.onStop(state);
      },
      trash: function trash() {
        mode.onTrash(state);
      },
      combineFeatures: function combineFeatures() {
        mode.onCombineFeatures(state);
      },
      uncombineFeatures: function uncombineFeatures() {
        mode.onUncombineFeatures(state);
      },
      render: function render(geojson, push) {
        mode.toDisplayFeatures(state, geojson, push);
      }
    };
  };
};

},{"./mode_interface":57}],60:[function(require,module,exports){
"use strict";

var CommonSelectors = require('../lib/common_selectors');

var mouseEventPoint = require('../lib/mouse_event_point');

var createSupplementaryPoints = require('../lib/create_supplementary_points');

var StringSet = require('../lib/string_set');

var doubleClickZoom = require('../lib/double_click_zoom');

var moveFeatures = require('../lib/move_features');

var Constants = require('../constants');

var SimpleSelect = {};

SimpleSelect.onSetup = function (opts) {
  var _this = this;

  // turn the opts into state.
  var state = {
    dragMoveLocation: null,
    boxSelectStartLocation: null,
    boxSelectElement: undefined,
    boxSelecting: false,
    canBoxSelect: false,
    dragMoveing: false,
    canDragMove: false,
    initiallySelectedFeatureIds: opts.featureIds || []
  };
  this.setSelected(state.initiallySelectedFeatureIds.filter(function (id) {
    return _this.getFeature(id) !== undefined;
  }));
  this.fireActionable();
  this.setActionableState({
    combineFeatures: true,
    uncombineFeatures: true,
    trash: true
  });
  return state;
};

SimpleSelect.fireUpdate = function () {
  this.map.fire(Constants.events.UPDATE, {
    action: Constants.updateActions.MOVE,
    features: this.getSelected().map(function (f) {
      return f.toGeoJSON();
    })
  });
};

SimpleSelect.fireActionable = function () {
  var _this2 = this;

  var selectedFeatures = this.getSelected();
  var multiFeatures = selectedFeatures.filter(function (feature) {
    return _this2.isInstanceOf('MultiFeature', feature);
  });
  var combineFeatures = false;

  if (selectedFeatures.length > 1) {
    combineFeatures = true;
    var featureType = selectedFeatures[0].type.replace('Multi', '');
    selectedFeatures.forEach(function (feature) {
      if (feature.type.replace('Multi', '') !== featureType) {
        combineFeatures = false;
      }
    });
  }

  var uncombineFeatures = multiFeatures.length > 0;
  var trash = selectedFeatures.length > 0;
  this.setActionableState({
    combineFeatures: combineFeatures,
    uncombineFeatures: uncombineFeatures,
    trash: trash
  });
};

SimpleSelect.getUniqueIds = function (allFeatures) {
  if (!allFeatures.length) return [];
  var ids = allFeatures.map(function (s) {
    return s.properties.id;
  }).filter(function (id) {
    return id !== undefined;
  }).reduce(function (memo, id) {
    memo.add(id);
    return memo;
  }, new StringSet());
  return ids.values();
};

SimpleSelect.stopExtendedInteractions = function (state) {
  if (state.boxSelectElement) {
    if (state.boxSelectElement.parentNode) state.boxSelectElement.parentNode.removeChild(state.boxSelectElement);
    state.boxSelectElement = null;
  }

  this.map.dragPan.enable();
  state.boxSelecting = false;
  state.canBoxSelect = false;
  state.dragMoving = false;
  state.canDragMove = false;
};

SimpleSelect.onStop = function () {
  doubleClickZoom.enable(this);
};

SimpleSelect.onMouseMove = function (state) {
  // On mousemove that is not a drag, stop extended interactions.
  // This is useful if you drag off the canvas, release the button,
  // then move the mouse back over the canvas --- we don't allow the
  // interaction to continue then, but we do let it continue if you held
  // the mouse button that whole time
  return this.stopExtendedInteractions(state);
};

SimpleSelect.onMouseOut = function (state) {
  // As soon as you mouse leaves the canvas, update the feature
  if (state.dragMoving) return this.fireUpdate();
};

SimpleSelect.onTap = SimpleSelect.onClick = function (state, e) {
  // Click (with or without shift) on no feature
  if (CommonSelectors.noTarget(e)) return this.clickAnywhere(state, e); // also tap

  if (CommonSelectors.isOfMetaType(Constants.meta.VERTEX)(e)) return this.clickOnVertex(state, e); //tap

  if (CommonSelectors.isFeature(e)) return this.clickOnFeature(state, e);
};

SimpleSelect.clickAnywhere = function (state) {
  var _this3 = this;

  // Clear the re-render selection
  var wasSelected = this.getSelectedIds();

  if (wasSelected.length) {
    this.clearSelectedFeatures();
    wasSelected.forEach(function (id) {
      return _this3.doRender(id);
    });
  }

  doubleClickZoom.enable(this);
  this.stopExtendedInteractions(state);
};

SimpleSelect.clickOnVertex = function (state, e) {
  // Enter direct select mode
  this.changeMode(Constants.modes.DIRECT_SELECT, {
    featureId: e.featureTarget.properties.parent,
    coordPath: e.featureTarget.properties.coord_path,
    startPos: e.lngLat
  });
  this.updateUIClasses({
    mouse: Constants.cursors.MOVE
  });
};

SimpleSelect.startOnActiveFeature = function (state, e) {
  // Stop any already-underway extended interactions
  this.stopExtendedInteractions(state); // Disable map.dragPan immediately so it can't start

  this.map.dragPan.disable(); // Re-render it and enable drag move

  this.doRender(e.featureTarget.properties.id); // Set up the state for drag moving

  state.canDragMove = true;
  state.dragMoveLocation = e.lngLat;
};

SimpleSelect.clickOnFeature = function (state, e) {
  var _this4 = this;

  // Stop everything
  doubleClickZoom.disable(this);
  this.stopExtendedInteractions(state);
  var isShiftClick = CommonSelectors.isShiftDown(e);
  var selectedFeatureIds = this.getSelectedIds();
  var featureId = e.featureTarget.properties.id;
  var isFeatureSelected = this.isSelected(featureId); // Click (without shift) on any selected feature but a point

  if (!isShiftClick && isFeatureSelected && this.getFeature(featureId).type !== Constants.geojsonTypes.POINT) {
    // Enter direct select mode
    return this.changeMode(Constants.modes.DIRECT_SELECT, {
      featureId: featureId
    });
  } // Shift-click on a selected feature


  if (isFeatureSelected && isShiftClick) {
    // Deselect it
    this.deselect(featureId);
    this.updateUIClasses({
      mouse: Constants.cursors.POINTER
    });

    if (selectedFeatureIds.length === 1) {
      doubleClickZoom.enable(this);
    } // Shift-click on an unselected feature

  } else if (!isFeatureSelected && isShiftClick) {
    // Add it to the selection
    this.select(featureId);
    this.updateUIClasses({
      mouse: Constants.cursors.MOVE
    }); // Click (without shift) on an unselected feature
  } else if (!isFeatureSelected && !isShiftClick) {
    // Make it the only selected feature
    selectedFeatureIds.forEach(function (id) {
      return _this4.doRender(id);
    });
    this.setSelected(featureId);
    this.updateUIClasses({
      mouse: Constants.cursors.MOVE
    });
  } // No matter what, re-render the clicked feature


  this.doRender(featureId);
};

SimpleSelect.onMouseDown = function (state, e) {
  if (CommonSelectors.isActiveFeature(e)) return this.startOnActiveFeature(state, e);
  if (this.drawConfig.boxSelect && CommonSelectors.isShiftMousedown(e)) return this.startBoxSelect(state, e);
};

SimpleSelect.startBoxSelect = function (state, e) {
  this.stopExtendedInteractions(state);
  this.map.dragPan.disable(); // Enable box select

  state.boxSelectStartLocation = mouseEventPoint(e.originalEvent, this.map.getContainer());
  state.canBoxSelect = true;
};

SimpleSelect.onTouchStart = function (state, e) {
  if (CommonSelectors.isActiveFeature(e)) return this.startOnActiveFeature(state, e);
};

SimpleSelect.onDrag = function (state, e) {
  if (state.canDragMove) return this.dragMove(state, e);
  if (this.drawConfig.boxSelect && state.canBoxSelect) return this.whileBoxSelect(state, e);
};

SimpleSelect.whileBoxSelect = function (state, e) {
  state.boxSelecting = true;
  this.updateUIClasses({
    mouse: Constants.cursors.ADD
  }); // Create the box node if it doesn't exist

  if (!state.boxSelectElement) {
    state.boxSelectElement = document.createElement('div');
    state.boxSelectElement.classList.add(Constants.classes.BOX_SELECT);
    this.map.getContainer().appendChild(state.boxSelectElement);
  } // Adjust the box node's width and xy position


  var current = mouseEventPoint(e.originalEvent, this.map.getContainer());
  var minX = Math.min(state.boxSelectStartLocation.x, current.x);
  var maxX = Math.max(state.boxSelectStartLocation.x, current.x);
  var minY = Math.min(state.boxSelectStartLocation.y, current.y);
  var maxY = Math.max(state.boxSelectStartLocation.y, current.y);
  var translateValue = "translate(".concat(minX, "px, ").concat(minY, "px)");
  state.boxSelectElement.style.transform = translateValue;
  state.boxSelectElement.style.WebkitTransform = translateValue;
  state.boxSelectElement.style.width = "".concat(maxX - minX, "px");
  state.boxSelectElement.style.height = "".concat(maxY - minY, "px");
};

SimpleSelect.dragMove = function (state, e) {
  // Dragging when drag move is enabled
  state.dragMoving = true;
  e.originalEvent.stopPropagation();
  var delta = {
    lng: e.lngLat.lng - state.dragMoveLocation.lng,
    lat: e.lngLat.lat - state.dragMoveLocation.lat
  };
  moveFeatures(this.getSelected(), delta);
  state.dragMoveLocation = e.lngLat;
};

SimpleSelect.onMouseUp = function (state, e) {
  var _this5 = this;

  // End any extended interactions
  if (state.dragMoving) {
    this.fireUpdate();
  } else if (state.boxSelecting) {
    var bbox = [state.boxSelectStartLocation, mouseEventPoint(e.originalEvent, this.map.getContainer())];
    var featuresInBox = this.featuresAt(null, bbox, 'click');
    var idsToSelect = this.getUniqueIds(featuresInBox).filter(function (id) {
      return !_this5.isSelected(id);
    });

    if (idsToSelect.length) {
      this.select(idsToSelect);
      idsToSelect.forEach(function (id) {
        return _this5.doRender(id);
      });
      this.updateUIClasses({
        mouse: Constants.cursors.MOVE
      });
    }
  }

  this.stopExtendedInteractions(state);
};

SimpleSelect.toDisplayFeatures = function (state, geojson, display) {
  geojson.properties.active = this.isSelected(geojson.properties.id) ? Constants.activeStates.ACTIVE : Constants.activeStates.INACTIVE;
  display(geojson);
  this.fireActionable();
  if (geojson.properties.active !== Constants.activeStates.ACTIVE || geojson.geometry.type === Constants.geojsonTypes.POINT) return;
  createSupplementaryPoints(geojson).forEach(display);
};

SimpleSelect.onTrash = function () {
  this.deleteFeature(this.getSelectedIds());
  this.fireActionable();
};

SimpleSelect.onCombineFeatures = function () {
  var selectedFeatures = this.getSelected();
  if (selectedFeatures.length === 0 || selectedFeatures.length < 2) return;
  var coordinates = [],
      featuresCombined = [];
  var featureType = selectedFeatures[0].type.replace('Multi', '');

  for (var i = 0; i < selectedFeatures.length; i++) {
    var feature = selectedFeatures[i];

    if (feature.type.replace('Multi', '') !== featureType) {
      return;
    }

    if (feature.type.includes('Multi')) {
      feature.getCoordinates().forEach(function (subcoords) {
        coordinates.push(subcoords);
      });
    } else {
      coordinates.push(feature.getCoordinates());
    }

    featuresCombined.push(feature.toGeoJSON());
  }

  if (featuresCombined.length > 1) {
    var multiFeature = this.newFeature({
      type: Constants.geojsonTypes.FEATURE,
      properties: featuresCombined[0].properties,
      geometry: {
        type: "Multi".concat(featureType),
        coordinates: coordinates
      }
    });
    this.addFeature(multiFeature);
    this.deleteFeature(this.getSelectedIds(), {
      silent: true
    });
    this.setSelected([multiFeature.id]);
    this.map.fire(Constants.events.COMBINE_FEATURES, {
      createdFeatures: [multiFeature.toGeoJSON()],
      deletedFeatures: featuresCombined
    });
  }

  this.fireActionable();
};

SimpleSelect.onUncombineFeatures = function () {
  var _this6 = this;

  var selectedFeatures = this.getSelected();
  if (selectedFeatures.length === 0) return;
  var createdFeatures = [];
  var featuresUncombined = [];

  var _loop = function _loop(i) {
    var feature = selectedFeatures[i];

    if (_this6.isInstanceOf('MultiFeature', feature)) {
      feature.getFeatures().forEach(function (subFeature) {
        _this6.addFeature(subFeature);

        subFeature.properties = feature.properties;
        createdFeatures.push(subFeature.toGeoJSON());

        _this6.select([subFeature.id]);
      });

      _this6.deleteFeature(feature.id, {
        silent: true
      });

      featuresUncombined.push(feature.toGeoJSON());
    }
  };

  for (var i = 0; i < selectedFeatures.length; i++) {
    _loop(i);
  }

  if (createdFeatures.length > 1) {
    this.map.fire(Constants.events.UNCOMBINE_FEATURES, {
      createdFeatures: createdFeatures,
      deletedFeatures: featuresUncombined
    });
  }

  this.fireActionable();
};

module.exports = SimpleSelect;

},{"../constants":23,"../lib/common_selectors":30,"../lib/create_supplementary_points":33,"../lib/double_click_zoom":35,"../lib/mouse_event_point":44,"../lib/move_features":45,"../lib/string_set":47}],61:[function(require,module,exports){
"use strict";

var xtend = require('xtend');

var Constants = require('./constants');

var defaultOptions = {
  defaultMode: Constants.modes.SIMPLE_SELECT,
  keybindings: true,
  touchEnabled: true,
  clickBuffer: 2,
  touchBuffer: 25,
  boxSelect: true,
  displayControlsDefault: true,
  styles: require('./lib/theme'),
  modes: require('./modes'),
  controls: {},
  userProperties: false
};
var showControls = {
  point: true,
  line_string: true,
  polygon: true,
  trash: true,
  combine_features: true,
  uncombine_features: true
};
var hideControls = {
  point: false,
  line_string: false,
  polygon: false,
  trash: false,
  combine_features: false,
  uncombine_features: false
};

function addSources(styles, sourceBucket) {
  return styles.map(function (style) {
    if (style.source) return style;
    return xtend(style, {
      id: "".concat(style.id, ".").concat(sourceBucket),
      source: sourceBucket === 'hot' ? Constants.sources.HOT : Constants.sources.COLD
    });
  });
}

module.exports = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var withDefaults = xtend(options);

  if (!options.controls) {
    withDefaults.controls = {};
  }

  if (options.displayControlsDefault === false) {
    withDefaults.controls = xtend(hideControls, options.controls);
  } else {
    withDefaults.controls = xtend(showControls, options.controls);
  }

  withDefaults = xtend(defaultOptions, withDefaults); // Layers with a shared source should be adjacent for performance reasons

  withDefaults.styles = addSources(withDefaults.styles, 'cold').concat(addSources(withDefaults.styles, 'hot'));
  return withDefaults;
};

},{"./constants":23,"./lib/theme":49,"./modes":56,"xtend":21}],62:[function(require,module,exports){
"use strict";

var Constants = require('./constants');

module.exports = function render() {
  var store = this;
  var mapExists = store.ctx.map && store.ctx.map.getSource(Constants.sources.HOT) !== undefined;
  if (!mapExists) return cleanup();
  var mode = store.ctx.events.currentModeName();
  store.ctx.ui.queueMapClasses({
    mode: mode
  });
  var newHotIds = [];
  var newColdIds = [];

  if (store.isDirty) {
    newColdIds = store.getAllIds();
  } else {
    newHotIds = store.getChangedIds().filter(function (id) {
      return store.get(id) !== undefined;
    });
    newColdIds = store.sources.hot.filter(function (geojson) {
      return geojson.properties.id && newHotIds.indexOf(geojson.properties.id) === -1 && store.get(geojson.properties.id) !== undefined;
    }).map(function (geojson) {
      return geojson.properties.id;
    });
  }

  store.sources.hot = [];
  var lastColdCount = store.sources.cold.length;
  store.sources.cold = store.isDirty ? [] : store.sources.cold.filter(function (geojson) {
    var id = geojson.properties.id || geojson.properties.parent;
    return newHotIds.indexOf(id) === -1;
  });
  var coldChanged = lastColdCount !== store.sources.cold.length || newColdIds.length > 0;
  newHotIds.forEach(function (id) {
    return renderFeature(id, 'hot');
  });
  newColdIds.forEach(function (id) {
    return renderFeature(id, 'cold');
  });

  function renderFeature(id, source) {
    var feature = store.get(id);
    var featureInternal = feature.internal(mode);
    store.ctx.events.currentModeRender(featureInternal, function (geojson) {
      store.sources[source].push(geojson);
    });
  }

  if (coldChanged) {
    store.ctx.map.getSource(Constants.sources.COLD).setData({
      type: Constants.geojsonTypes.FEATURE_COLLECTION,
      features: store.sources.cold
    });
  }

  store.ctx.map.getSource(Constants.sources.HOT).setData({
    type: Constants.geojsonTypes.FEATURE_COLLECTION,
    features: store.sources.hot
  });

  if (store._emitSelectionChange) {
    store.ctx.map.fire(Constants.events.SELECTION_CHANGE, {
      features: store.getSelected().map(function (feature) {
        return feature.toGeoJSON();
      }),
      points: store.getSelectedCoordinates().map(function (coordinate) {
        return {
          type: Constants.geojsonTypes.FEATURE,
          properties: {},
          geometry: {
            type: Constants.geojsonTypes.POINT,
            coordinates: coordinate.coordinates
          }
        };
      })
    });
    store._emitSelectionChange = false;
  }

  if (store._deletedFeaturesToEmit.length) {
    var geojsonToEmit = store._deletedFeaturesToEmit.map(function (feature) {
      return feature.toGeoJSON();
    });

    store._deletedFeaturesToEmit = [];
    store.ctx.map.fire(Constants.events.DELETE, {
      features: geojsonToEmit
    });
  }

  cleanup();
  store.ctx.map.fire(Constants.events.RENDER, {});

  function cleanup() {
    store.isDirty = false;
    store.clearChangedIds();
  }
};

},{"./constants":23}],63:[function(require,module,exports){
"use strict";

var events = require('./events');

var Store = require('./store');

var ui = require('./ui');

var Constants = require('./constants');

var xtend = require('xtend');

module.exports = function (ctx) {
  var controlContainer = null;
  var mapLoadedInterval = null;
  var setup = {
    onRemove: function onRemove() {
      // Stop connect attempt in the event that control is removed before map is loaded
      ctx.map.off('load', setup.connect);
      clearInterval(mapLoadedInterval);
      setup.removeLayers();
      ctx.store.restoreMapConfig();
      ctx.ui.removeButtons();
      ctx.events.removeEventListeners();
      ctx.ui.clearMapClasses();
      ctx.map = null;
      ctx.container = null;
      ctx.store = null;
      if (controlContainer && controlContainer.parentNode) controlContainer.parentNode.removeChild(controlContainer);
      controlContainer = null;
      return this;
    },
    connect: function connect() {
      ctx.map.off('load', setup.connect);
      clearInterval(mapLoadedInterval);
      setup.addLayers();
      ctx.store.storeMapConfig();
      ctx.events.addEventListeners();
    },
    onAdd: function onAdd(map) {
      if ("production" !== 'test') {
        // Monkey patch to resolve breaking change to `fire` introduced by
        // mapbox-gl-js. See mapbox/mapbox-gl-draw/issues/766.
        var _fire = map.fire;

        map.fire = function (type, event) {
          var args = arguments;

          if (_fire.length === 1 && arguments.length !== 1) {
            args = [xtend({}, {
              type: type
            }, event)];
          }

          return _fire.apply(map, args);
        };
      }

      ctx.map = map;
      ctx.events = events(ctx);
      ctx.ui = ui(ctx);
      ctx.container = map.getContainer();
      ctx.store = new Store(ctx);
      controlContainer = ctx.ui.addButtons();

      if (ctx.options.boxSelect) {
        map.boxZoom.disable(); // Need to toggle dragPan on and off or else first
        // dragPan disable attempt in simple_select doesn't work

        map.dragPan.disable();
        map.dragPan.enable();
      }

      if (map.loaded()) {
        setup.connect();
      } else {
        map.on('load', setup.connect);
        mapLoadedInterval = setInterval(function () {
          if (map.loaded()) setup.connect();
        }, 16);
      }

      ctx.events.start();
      return controlContainer;
    },
    addLayers: function addLayers() {
      // drawn features style
      ctx.map.addSource(Constants.sources.COLD, {
        data: {
          type: Constants.geojsonTypes.FEATURE_COLLECTION,
          features: []
        },
        type: 'geojson'
      }); // hot features style

      ctx.map.addSource(Constants.sources.HOT, {
        data: {
          type: Constants.geojsonTypes.FEATURE_COLLECTION,
          features: []
        },
        type: 'geojson'
      });
      ctx.options.styles.forEach(function (style) {
        ctx.map.addLayer(style);
      });
      ctx.store.setDirty(true);
      ctx.store.render();
    },
    // Check for layers and sources before attempting to remove
    // If user adds draw control and removes it before the map is loaded, layers and sources will be missing
    removeLayers: function removeLayers() {
      ctx.options.styles.forEach(function (style) {
        if (ctx.map.getLayer(style.id)) {
          ctx.map.removeLayer(style.id);
        }
      });

      if (ctx.map.getSource(Constants.sources.COLD)) {
        ctx.map.removeSource(Constants.sources.COLD);
      }

      if (ctx.map.getSource(Constants.sources.HOT)) {
        ctx.map.removeSource(Constants.sources.HOT);
      }
    }
  };
  ctx.setup = setup;
  return setup;
};

},{"./constants":23,"./events":24,"./store":64,"./ui":65,"xtend":21}],64:[function(require,module,exports){
"use strict";

var throttle = require('./lib/throttle');

var toDenseArray = require('./lib/to_dense_array');

var StringSet = require('./lib/string_set');

var render = require('./render');

var interactions = require('./constants').interactions;

var Store = module.exports = function (ctx) {
  this._features = {};
  this._featureIds = new StringSet();
  this._selectedFeatureIds = new StringSet();
  this._selectedCoordinates = [];
  this._changedFeatureIds = new StringSet();
  this._deletedFeaturesToEmit = [];
  this._emitSelectionChange = false;
  this._mapInitialConfig = {};
  this.ctx = ctx;
  this.sources = {
    hot: [],
    cold: []
  };
  this.render = throttle(render, 16, this);
  this.isDirty = false;
};
/**
 * Delays all rendering until the returned function is invoked
 * @return {Function} renderBatch
 */


Store.prototype.createRenderBatch = function () {
  var _this = this;

  var holdRender = this.render;
  var numRenders = 0;

  this.render = function () {
    numRenders++;
  };

  return function () {
    _this.render = holdRender;

    if (numRenders > 0) {
      _this.render();
    }
  };
};
/**
 * Sets the store's state to dirty.
 * @return {Store} this
 */


Store.prototype.setDirty = function () {
  this.isDirty = true;
  return this;
};
/**
 * Sets a feature's state to changed.
 * @param {string} featureId
 * @return {Store} this
 */


Store.prototype.featureChanged = function (featureId) {
  this._changedFeatureIds.add(featureId);

  return this;
};
/**
 * Gets the ids of all features currently in changed state.
 * @return {Store} this
 */


Store.prototype.getChangedIds = function () {
  return this._changedFeatureIds.values();
};
/**
 * Sets all features to unchanged state.
 * @return {Store} this
 */


Store.prototype.clearChangedIds = function () {
  this._changedFeatureIds.clear();

  return this;
};
/**
 * Gets the ids of all features in the store.
 * @return {Store} this
 */


Store.prototype.getAllIds = function () {
  return this._featureIds.values();
};
/**
 * Adds a feature to the store.
 * @param {Object} feature
 *
 * @return {Store} this
 */


Store.prototype.add = function (feature) {
  this.featureChanged(feature.id);
  this._features[feature.id] = feature;

  this._featureIds.add(feature.id);

  return this;
};
/**
 * Deletes a feature or array of features from the store.
 * Cleans up after the deletion by deselecting the features.
 * If changes were made, sets the state to the dirty
 * and fires an event.
 * @param {string | Array<string>} featureIds
 * @param {Object} [options]
 * @param {Object} [options.silent] - If `true`, this invocation will not fire an event.
 * @return {Store} this
 */


Store.prototype.delete = function (featureIds) {
  var _this2 = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  toDenseArray(featureIds).forEach(function (id) {
    if (!_this2._featureIds.has(id)) return;

    _this2._featureIds.delete(id);

    _this2._selectedFeatureIds.delete(id);

    if (!options.silent) {
      if (_this2._deletedFeaturesToEmit.indexOf(_this2._features[id]) === -1) {
        _this2._deletedFeaturesToEmit.push(_this2._features[id]);
      }
    }

    delete _this2._features[id];
    _this2.isDirty = true;
  });
  refreshSelectedCoordinates.call(this, options);
  return this;
};
/**
 * Returns a feature in the store matching the specified value.
 * @return {Object | undefined} feature
 */


Store.prototype.get = function (id) {
  return this._features[id];
};
/**
 * Returns all features in the store.
 * @return {Array<Object>}
 */


Store.prototype.getAll = function () {
  var _this3 = this;

  return Object.keys(this._features).map(function (id) {
    return _this3._features[id];
  });
};
/**
 * Adds features to the current selection.
 * @param {string | Array<string>} featureIds
 * @param {Object} [options]
 * @param {Object} [options.silent] - If `true`, this invocation will not fire an event.
 * @return {Store} this
 */


Store.prototype.select = function (featureIds) {
  var _this4 = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  toDenseArray(featureIds).forEach(function (id) {
    if (_this4._selectedFeatureIds.has(id)) return;

    _this4._selectedFeatureIds.add(id);

    _this4._changedFeatureIds.add(id);

    if (!options.silent) {
      _this4._emitSelectionChange = true;
    }
  });
  return this;
};
/**
 * Deletes features from the current selection.
 * @param {string | Array<string>} featureIds
 * @param {Object} [options]
 * @param {Object} [options.silent] - If `true`, this invocation will not fire an event.
 * @return {Store} this
 */


Store.prototype.deselect = function (featureIds) {
  var _this5 = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  toDenseArray(featureIds).forEach(function (id) {
    if (!_this5._selectedFeatureIds.has(id)) return;

    _this5._selectedFeatureIds.delete(id);

    _this5._changedFeatureIds.add(id);

    if (!options.silent) {
      _this5._emitSelectionChange = true;
    }
  });
  refreshSelectedCoordinates.call(this, options);
  return this;
};
/**
 * Clears the current selection.
 * @param {Object} [options]
 * @param {Object} [options.silent] - If `true`, this invocation will not fire an event.
 * @return {Store} this
 */


Store.prototype.clearSelected = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  this.deselect(this._selectedFeatureIds.values(), {
    silent: options.silent
  });
  return this;
};
/**
 * Sets the store's selection, clearing any prior values.
 * If no feature ids are passed, the store is just cleared.
 * @param {string | Array<string> | undefined} featureIds
 * @param {Object} [options]
 * @param {Object} [options.silent] - If `true`, this invocation will not fire an event.
 * @return {Store} this
 */


Store.prototype.setSelected = function (featureIds) {
  var _this6 = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  featureIds = toDenseArray(featureIds); // Deselect any features not in the new selection

  this.deselect(this._selectedFeatureIds.values().filter(function (id) {
    return featureIds.indexOf(id) === -1;
  }), {
    silent: options.silent
  }); // Select any features in the new selection that were not already selected

  this.select(featureIds.filter(function (id) {
    return !_this6._selectedFeatureIds.has(id);
  }), {
    silent: options.silent
  });
  return this;
};
/**
 * Sets the store's coordinates selection, clearing any prior values.
 * @param {Array<Array<string>>} coordinates
 * @return {Store} this
 */


Store.prototype.setSelectedCoordinates = function (coordinates) {
  this._selectedCoordinates = coordinates;
  this._emitSelectionChange = true;
  return this;
};
/**
 * Clears the current coordinates selection.
 * @param {Object} [options]
 * @return {Store} this
 */


Store.prototype.clearSelectedCoordinates = function () {
  this._selectedCoordinates = [];
  this._emitSelectionChange = true;
  return this;
};
/**
 * Returns the ids of features in the current selection.
 * @return {Array<string>} Selected feature ids.
 */


Store.prototype.getSelectedIds = function () {
  return this._selectedFeatureIds.values();
};
/**
 * Returns features in the current selection.
 * @return {Array<Object>} Selected features.
 */


Store.prototype.getSelected = function () {
  var _this7 = this;

  return this._selectedFeatureIds.values().map(function (id) {
    return _this7.get(id);
  });
};
/**
 * Returns selected coordinates in the currently selected feature.
 * @return {Array<Object>} Selected coordinates.
 */


Store.prototype.getSelectedCoordinates = function () {
  var _this8 = this;

  var selected = this._selectedCoordinates.map(function (coordinate) {
    var feature = _this8.get(coordinate.feature_id);

    return {
      coordinates: feature.getCoordinate(coordinate.coord_path)
    };
  });

  return selected;
};
/**
 * Indicates whether a feature is selected.
 * @param {string} featureId
 * @return {boolean} `true` if the feature is selected, `false` if not.
 */


Store.prototype.isSelected = function (featureId) {
  return this._selectedFeatureIds.has(featureId);
};
/**
 * Sets a property on the given feature
 * @param {string} featureId
 * @param {string} property property
 * @param {string} property value
*/


Store.prototype.setFeatureProperty = function (featureId, property, value) {
  this.get(featureId).setProperty(property, value);
  this.featureChanged(featureId);
};

function refreshSelectedCoordinates(options) {
  var _this9 = this;

  var newSelectedCoordinates = this._selectedCoordinates.filter(function (point) {
    return _this9._selectedFeatureIds.has(point.feature_id);
  });

  if (this._selectedCoordinates.length !== newSelectedCoordinates.length && !options.silent) {
    this._emitSelectionChange = true;
  }

  this._selectedCoordinates = newSelectedCoordinates;
}
/**
 * Stores the initial config for a map, so that we can set it again after we're done.
*/


Store.prototype.storeMapConfig = function () {
  var _this10 = this;

  interactions.forEach(function (interaction) {
    var interactionSet = _this10.ctx.map[interaction];

    if (interactionSet) {
      _this10._mapInitialConfig[interaction] = _this10.ctx.map[interaction].isEnabled();
    }
  });
};
/**
 * Restores the initial config for a map, ensuring all is well.
*/


Store.prototype.restoreMapConfig = function () {
  var _this11 = this;

  Object.keys(this._mapInitialConfig).forEach(function (key) {
    var value = _this11._mapInitialConfig[key];

    if (value) {
      _this11.ctx.map[key].enable();
    } else {
      _this11.ctx.map[key].disable();
    }
  });
};
/**
 * Returns the initial state of an interaction setting.
 * @param {string} interaction
 * @return {boolean} `true` if the interaction is enabled, `false` if not.
 * Defaults to `true`. (Todo: include defaults.)
*/


Store.prototype.getInitialConfigValue = function (interaction) {
  if (this._mapInitialConfig[interaction] !== undefined) {
    return this._mapInitialConfig[interaction];
  } else {
    // This needs to be set to whatever the default is for that interaction
    // It seems to be true for all cases currently, so let's send back `true`.
    return true;
  }
};

},{"./constants":23,"./lib/string_set":47,"./lib/throttle":50,"./lib/to_dense_array":51,"./render":62}],65:[function(require,module,exports){
"use strict";

var xtend = require('xtend');

var Constants = require('./constants');

var classTypes = ['mode', 'feature', 'mouse'];

module.exports = function (ctx) {
  var buttonElements = {};
  var activeButton = null;
  var currentMapClasses = {
    mode: null,
    // e.g. mode-direct_select
    feature: null,
    // e.g. feature-vertex
    mouse: null // e.g. mouse-move

  };
  var nextMapClasses = {
    mode: null,
    feature: null,
    mouse: null
  };

  function clearMapClasses() {
    queueMapClasses({
      mode: null,
      feature: null,
      mouse: null
    });
    updateMapClasses();
  }

  function queueMapClasses(options) {
    nextMapClasses = xtend(nextMapClasses, options);
  }

  function updateMapClasses() {
    if (!ctx.container) return;
    var classesToRemove = [];
    var classesToAdd = [];
    classTypes.forEach(function (type) {
      if (nextMapClasses[type] === currentMapClasses[type]) return;
      classesToRemove.push("".concat(type, "-").concat(currentMapClasses[type]));

      if (nextMapClasses[type] !== null) {
        classesToAdd.push("".concat(type, "-").concat(nextMapClasses[type]));
      }
    });

    if (classesToRemove.length > 0) {
      ctx.container.classList.remove.apply(ctx.container.classList, classesToRemove);
    }

    if (classesToAdd.length > 0) {
      ctx.container.classList.add.apply(ctx.container.classList, classesToAdd);
    }

    currentMapClasses = xtend(currentMapClasses, nextMapClasses);
  }

  function createControlButton(id) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var button = document.createElement('button');
    button.className = "".concat(Constants.classes.CONTROL_BUTTON, " ").concat(options.className);
    button.setAttribute('title', options.title);
    options.container.appendChild(button);
    button.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var clickedButton = e.target;

      if (clickedButton === activeButton) {
        deactivateButtons();
        return;
      }

      setActiveButton(id);
      options.onActivate();
    }, true);
    return button;
  }

  function deactivateButtons() {
    if (!activeButton) return;
    activeButton.classList.remove(Constants.classes.ACTIVE_BUTTON);
    activeButton = null;
  }

  function setActiveButton(id) {
    deactivateButtons();
    var button = buttonElements[id];
    if (!button) return;

    if (button && id !== 'trash') {
      button.classList.add(Constants.classes.ACTIVE_BUTTON);
      activeButton = button;
    }
  }

  function addButtons() {
    var controls = ctx.options.controls;
    var controlGroup = document.createElement('div');
    controlGroup.className = "".concat(Constants.classes.CONTROL_GROUP, " ").concat(Constants.classes.CONTROL_BASE);
    if (!controls) return controlGroup;

    if (controls[Constants.types.LINE]) {
      buttonElements[Constants.types.LINE] = createControlButton(Constants.types.LINE, {
        container: controlGroup,
        className: Constants.classes.CONTROL_BUTTON_LINE,
        title: "LineString tool ".concat(ctx.options.keybindings ? '(l)' : ''),
        onActivate: function onActivate() {
          return ctx.events.changeMode(Constants.modes.DRAW_LINE_STRING);
        }
      });
    }

    if (controls[Constants.types.POLYGON]) {
      buttonElements[Constants.types.POLYGON] = createControlButton(Constants.types.POLYGON, {
        container: controlGroup,
        className: Constants.classes.CONTROL_BUTTON_POLYGON,
        title: "Polygon tool ".concat(ctx.options.keybindings ? '(p)' : ''),
        onActivate: function onActivate() {
          return ctx.events.changeMode(Constants.modes.DRAW_POLYGON);
        }
      });
    }

    if (controls[Constants.types.POINT]) {
      buttonElements[Constants.types.POINT] = createControlButton(Constants.types.POINT, {
        container: controlGroup,
        className: Constants.classes.CONTROL_BUTTON_POINT,
        title: "Marker tool ".concat(ctx.options.keybindings ? '(m)' : ''),
        onActivate: function onActivate() {
          return ctx.events.changeMode(Constants.modes.DRAW_POINT);
        }
      });
    }

    if (controls.trash) {
      buttonElements.trash = createControlButton('trash', {
        container: controlGroup,
        className: Constants.classes.CONTROL_BUTTON_TRASH,
        title: 'Delete',
        onActivate: function onActivate() {
          ctx.events.trash();
        }
      });
    }

    if (controls.combine_features) {
      buttonElements.combine_features = createControlButton('combineFeatures', {
        container: controlGroup,
        className: Constants.classes.CONTROL_BUTTON_COMBINE_FEATURES,
        title: 'Combine',
        onActivate: function onActivate() {
          ctx.events.combineFeatures();
        }
      });
    }

    if (controls.uncombine_features) {
      buttonElements.uncombine_features = createControlButton('uncombineFeatures', {
        container: controlGroup,
        className: Constants.classes.CONTROL_BUTTON_UNCOMBINE_FEATURES,
        title: 'Uncombine',
        onActivate: function onActivate() {
          ctx.events.uncombineFeatures();
        }
      });
    }

    return controlGroup;
  }

  function removeButtons() {
    Object.keys(buttonElements).forEach(function (buttonId) {
      var button = buttonElements[buttonId];

      if (button.parentNode) {
        button.parentNode.removeChild(button);
      }

      delete buttonElements[buttonId];
    });
  }

  return {
    setActiveButton: setActiveButton,
    queueMapClasses: queueMapClasses,
    updateMapClasses: updateMapClasses,
    clearMapClasses: clearMapClasses,
    addButtons: addButtons,
    removeButtons: removeButtons
  };
};

},{"./constants":23,"xtend":21}]},{},[1])(1)
});