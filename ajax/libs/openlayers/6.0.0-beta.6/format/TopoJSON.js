var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/format/TopoJSON
 */
import Feature from '../Feature.js';
import { transformGeometryWithOptions } from './Feature.js';
import JSONFeature from './JSONFeature.js';
import LineString from '../geom/LineString.js';
import MultiLineString from '../geom/MultiLineString.js';
import MultiPoint from '../geom/MultiPoint.js';
import MultiPolygon from '../geom/MultiPolygon.js';
import Point from '../geom/Point.js';
import Polygon from '../geom/Polygon.js';
import { get as getProjection } from '../proj.js';
/**
 * @typedef {import("topojson-specification").Topology} TopoJSONTopology
 * @typedef {import("topojson-specification").GeometryCollection} TopoJSONGeometryCollection
 * @typedef {import("topojson-specification").GeometryObject} TopoJSONGeometry
 * @typedef {import("topojson-specification").Point} TopoJSONPoint
 * @typedef {import("topojson-specification").MultiPoint} TopoJSONMultiPoint
 * @typedef {import("topojson-specification").LineString} TopoJSONLineString
 * @typedef {import("topojson-specification").MultiLineString} TopoJSONMultiLineString
 * @typedef {import("topojson-specification").Polygon} TopoJSONPolygon
 * @typedef {import("topojson-specification").MultiPolygon} TopoJSONMultiPolygon
 */
/**
 * @typedef {Object} Options
 * @property {import("../proj.js").ProjectionLike} [dataProjection='EPSG:4326'] Default data projection.
 * @property {string} [layerName] Set the name of the TopoJSON topology
 * `objects`'s children as feature property with the specified name. This means
 * that when set to `'layer'`, a topology like
 * ```
 * {
 *   "type": "Topology",
 *   "objects": {
 *     "example": {
 *       "type": "GeometryCollection",
 *       "geometries": []
 *     }
 *   }
 * }
 * ```
 * will result in features that have a property `'layer'` set to `'example'`.
 * When not set, no property will be added to features.
 * @property {Array<string>} [layers] Names of the TopoJSON topology's
 * `objects`'s children to read features from.  If not provided, features will
 * be read from all children.
 */
/**
 * @classdesc
 * Feature format for reading data in the TopoJSON format.
 *
 * @api
 */
var TopoJSON = /** @class */ (function (_super) {
    __extends(TopoJSON, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function TopoJSON(opt_options) {
        var _this = _super.call(this) || this;
        var options = opt_options ? opt_options : {};
        /**
         * @private
         * @type {string|undefined}
         */
        _this.layerName_ = options.layerName;
        /**
         * @private
         * @type {Array<string>}
         */
        _this.layers_ = options.layers ? options.layers : null;
        /**
         * @inheritDoc
         */
        _this.dataProjection = getProjection(options.dataProjection ?
            options.dataProjection : 'EPSG:4326');
        return _this;
    }
    /**
     * @inheritDoc
     */
    TopoJSON.prototype.readFeaturesFromObject = function (object, opt_options) {
        if (object.type == 'Topology') {
            var topoJSONTopology = /** @type {TopoJSONTopology} */ (object);
            var transform = void 0, scale = null, translate = null;
            if (topoJSONTopology['transform']) {
                transform = topoJSONTopology['transform'];
                scale = transform['scale'];
                translate = transform['translate'];
            }
            var arcs = topoJSONTopology['arcs'];
            if (transform) {
                transformArcs(arcs, scale, translate);
            }
            /** @type {Array<Feature>} */
            var features = [];
            var topoJSONFeatures = topoJSONTopology['objects'];
            var property = this.layerName_;
            var feature = void 0;
            for (var objectName in topoJSONFeatures) {
                if (this.layers_ && this.layers_.indexOf(objectName) == -1) {
                    continue;
                }
                if (topoJSONFeatures[objectName].type === 'GeometryCollection') {
                    feature = /** @type {TopoJSONGeometryCollection} */ (topoJSONFeatures[objectName]);
                    features.push.apply(features, readFeaturesFromGeometryCollection(feature, arcs, scale, translate, property, objectName, opt_options));
                }
                else {
                    feature = /** @type {TopoJSONGeometry} */ (topoJSONFeatures[objectName]);
                    features.push(readFeatureFromGeometry(feature, arcs, scale, translate, property, objectName, opt_options));
                }
            }
            return features;
        }
        else {
            return [];
        }
    };
    /**
     * @inheritDoc
     */
    TopoJSON.prototype.readProjectionFromObject = function (object) {
        return this.dataProjection;
    };
    return TopoJSON;
}(JSONFeature));
/**
 * @const
 * @type {Object<string, function(TopoJSONGeometry, Array, ...Array=): import("../geom/Geometry.js").default>}
 */
var GEOMETRY_READERS = {
    'Point': readPointGeometry,
    'LineString': readLineStringGeometry,
    'Polygon': readPolygonGeometry,
    'MultiPoint': readMultiPointGeometry,
    'MultiLineString': readMultiLineStringGeometry,
    'MultiPolygon': readMultiPolygonGeometry
};
/**
 * Concatenate arcs into a coordinate array.
 * @param {Array<number>} indices Indices of arcs to concatenate.  Negative
 *     values indicate arcs need to be reversed.
 * @param {Array<Array<import("../coordinate.js").Coordinate>>} arcs Array of arcs (already
 *     transformed).
 * @return {Array<import("../coordinate.js").Coordinate>} Coordinates array.
 */
function concatenateArcs(indices, arcs) {
    /** @type {Array<import("../coordinate.js").Coordinate>} */
    var coordinates = [];
    var index, arc;
    for (var i = 0, ii = indices.length; i < ii; ++i) {
        index = indices[i];
        if (i > 0) {
            // splicing together arcs, discard last point
            coordinates.pop();
        }
        if (index >= 0) {
            // forward arc
            arc = arcs[index];
        }
        else {
            // reverse arc
            arc = arcs[~index].slice().reverse();
        }
        coordinates.push.apply(coordinates, arc);
    }
    // provide fresh copies of coordinate arrays
    for (var j = 0, jj = coordinates.length; j < jj; ++j) {
        coordinates[j] = coordinates[j].slice();
    }
    return coordinates;
}
/**
 * Create a point from a TopoJSON geometry object.
 *
 * @param {TopoJSONPoint} object TopoJSON object.
 * @param {Array<number>} scale Scale for each dimension.
 * @param {Array<number>} translate Translation for each dimension.
 * @return {Point} Geometry.
 */
function readPointGeometry(object, scale, translate) {
    var coordinates = object['coordinates'];
    if (scale && translate) {
        transformVertex(coordinates, scale, translate);
    }
    return new Point(coordinates);
}
/**
 * Create a multi-point from a TopoJSON geometry object.
 *
 * @param {TopoJSONMultiPoint} object TopoJSON object.
 * @param {Array<number>} scale Scale for each dimension.
 * @param {Array<number>} translate Translation for each dimension.
 * @return {MultiPoint} Geometry.
 */
function readMultiPointGeometry(object, scale, translate) {
    var coordinates = object['coordinates'];
    if (scale && translate) {
        for (var i = 0, ii = coordinates.length; i < ii; ++i) {
            transformVertex(coordinates[i], scale, translate);
        }
    }
    return new MultiPoint(coordinates);
}
/**
 * Create a linestring from a TopoJSON geometry object.
 *
 * @param {TopoJSONLineString} object TopoJSON object.
 * @param {Array<Array<import("../coordinate.js").Coordinate>>} arcs Array of arcs.
 * @return {LineString} Geometry.
 */
function readLineStringGeometry(object, arcs) {
    var coordinates = concatenateArcs(object['arcs'], arcs);
    return new LineString(coordinates);
}
/**
 * Create a multi-linestring from a TopoJSON geometry object.
 *
 * @param {TopoJSONMultiLineString} object TopoJSON object.
 * @param {Array<Array<import("../coordinate.js").Coordinate>>} arcs Array of arcs.
 * @return {MultiLineString} Geometry.
 */
function readMultiLineStringGeometry(object, arcs) {
    var coordinates = [];
    for (var i = 0, ii = object['arcs'].length; i < ii; ++i) {
        coordinates[i] = concatenateArcs(object['arcs'][i], arcs);
    }
    return new MultiLineString(coordinates);
}
/**
 * Create a polygon from a TopoJSON geometry object.
 *
 * @param {TopoJSONPolygon} object TopoJSON object.
 * @param {Array<Array<import("../coordinate.js").Coordinate>>} arcs Array of arcs.
 * @return {Polygon} Geometry.
 */
function readPolygonGeometry(object, arcs) {
    var coordinates = [];
    for (var i = 0, ii = object['arcs'].length; i < ii; ++i) {
        coordinates[i] = concatenateArcs(object['arcs'][i], arcs);
    }
    return new Polygon(coordinates);
}
/**
 * Create a multi-polygon from a TopoJSON geometry object.
 *
 * @param {TopoJSONMultiPolygon} object TopoJSON object.
 * @param {Array<Array<import("../coordinate.js").Coordinate>>} arcs Array of arcs.
 * @return {MultiPolygon} Geometry.
 */
function readMultiPolygonGeometry(object, arcs) {
    var coordinates = [];
    for (var i = 0, ii = object['arcs'].length; i < ii; ++i) {
        // for each polygon
        var polyArray = object['arcs'][i];
        var ringCoords = [];
        for (var j = 0, jj = polyArray.length; j < jj; ++j) {
            // for each ring
            ringCoords[j] = concatenateArcs(polyArray[j], arcs);
        }
        coordinates[i] = ringCoords;
    }
    return new MultiPolygon(coordinates);
}
/**
 * Create features from a TopoJSON GeometryCollection object.
 *
 * @param {TopoJSONGeometryCollection} collection TopoJSON Geometry
 *     object.
 * @param {Array<Array<import("../coordinate.js").Coordinate>>} arcs Array of arcs.
 * @param {Array<number>} scale Scale for each dimension.
 * @param {Array<number>} translate Translation for each dimension.
 * @param {string|undefined} property Property to set the `GeometryCollection`'s parent
 *     object to.
 * @param {string} name Name of the `Topology`'s child object.
 * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
 * @return {Array<Feature>} Array of features.
 */
function readFeaturesFromGeometryCollection(collection, arcs, scale, translate, property, name, opt_options) {
    var geometries = collection['geometries'];
    var features = [];
    for (var i = 0, ii = geometries.length; i < ii; ++i) {
        features[i] = readFeatureFromGeometry(geometries[i], arcs, scale, translate, property, name, opt_options);
    }
    return features;
}
/**
 * Create a feature from a TopoJSON geometry object.
 *
 * @param {TopoJSONGeometry} object TopoJSON geometry object.
 * @param {Array<Array<import("../coordinate.js").Coordinate>>} arcs Array of arcs.
 * @param {Array<number>} scale Scale for each dimension.
 * @param {Array<number>} translate Translation for each dimension.
 * @param {string|undefined} property Property to set the `GeometryCollection`'s parent
 *     object to.
 * @param {string} name Name of the `Topology`'s child object.
 * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
 * @return {Feature} Feature.
 */
function readFeatureFromGeometry(object, arcs, scale, translate, property, name, opt_options) {
    var geometry;
    var type = object.type;
    var geometryReader = GEOMETRY_READERS[type];
    if ((type === 'Point') || (type === 'MultiPoint')) {
        geometry = geometryReader(object, scale, translate);
    }
    else {
        geometry = geometryReader(object, arcs);
    }
    var feature = new Feature();
    feature.setGeometry(transformGeometryWithOptions(geometry, false, opt_options));
    if (object.id !== undefined) {
        feature.setId(object.id);
    }
    var properties = object.properties;
    if (property) {
        if (!properties) {
            properties = {};
        }
        properties[property] = name;
    }
    if (properties) {
        feature.setProperties(properties, true);
    }
    return feature;
}
/**
 * Apply a linear transform to array of arcs.  The provided array of arcs is
 * modified in place.
 *
 * @param {Array<Array<import("../coordinate.js").Coordinate>>} arcs Array of arcs.
 * @param {Array<number>} scale Scale for each dimension.
 * @param {Array<number>} translate Translation for each dimension.
 */
function transformArcs(arcs, scale, translate) {
    for (var i = 0, ii = arcs.length; i < ii; ++i) {
        transformArc(arcs[i], scale, translate);
    }
}
/**
 * Apply a linear transform to an arc.  The provided arc is modified in place.
 *
 * @param {Array<import("../coordinate.js").Coordinate>} arc Arc.
 * @param {Array<number>} scale Scale for each dimension.
 * @param {Array<number>} translate Translation for each dimension.
 */
function transformArc(arc, scale, translate) {
    var x = 0;
    var y = 0;
    for (var i = 0, ii = arc.length; i < ii; ++i) {
        var vertex = arc[i];
        x += vertex[0];
        y += vertex[1];
        vertex[0] = x;
        vertex[1] = y;
        transformVertex(vertex, scale, translate);
    }
}
/**
 * Apply a linear transform to a vertex.  The provided vertex is modified in
 * place.
 *
 * @param {import("../coordinate.js").Coordinate} vertex Vertex.
 * @param {Array<number>} scale Scale for each dimension.
 * @param {Array<number>} translate Translation for each dimension.
 */
function transformVertex(vertex, scale, translate) {
    vertex[0] = vertex[0] * scale[0] + translate[0];
    vertex[1] = vertex[1] * scale[1] + translate[1];
}
export default TopoJSON;
//# sourceMappingURL=TopoJSON.js.map