var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/format/EsriJSON
 */
import Feature from '../Feature.js';
import GeometryLayout from '../geom/GeometryLayout.js';
import GeometryType from '../geom/GeometryType.js';
import JSONFeature from './JSONFeature.js';
import LineString from '../geom/LineString.js';
import LinearRing from '../geom/LinearRing.js';
import MultiLineString from '../geom/MultiLineString.js';
import MultiPoint from '../geom/MultiPoint.js';
import MultiPolygon from '../geom/MultiPolygon.js';
import Point from '../geom/Point.js';
import Polygon from '../geom/Polygon.js';
import { assert } from '../asserts.js';
import { assign, isEmpty } from '../obj.js';
import { containsExtent } from '../extent.js';
import { deflateCoordinates } from '../geom/flat/deflate.js';
import { get as getProjection } from '../proj.js';
import { linearRingIsClockwise } from '../geom/flat/orient.js';
import { transformGeometryWithOptions } from './Feature.js';
/**
 * @typedef {import("arcgis-rest-api").Feature} EsriJSONFeature
 * @typedef {import("arcgis-rest-api").FeatureSet} EsriJSONFeatureSet
 * @typedef {import("arcgis-rest-api").Geometry} EsriJSONGeometry
 * @typedef {import("arcgis-rest-api").Point} EsriJSONPoint
 * @typedef {import("arcgis-rest-api").Polyline} EsriJSONPolyline
 * @typedef {import("arcgis-rest-api").Polygon} EsriJSONPolygon
 * @typedef {import("arcgis-rest-api").Multipoint} EsriJSONMultipoint
 * @typedef {import("arcgis-rest-api").HasZM} EsriJSONHasZM
 * @typedef {import("arcgis-rest-api").Position} EsriJSONPosition
 * @typedef {import("arcgis-rest-api").SpatialReferenceWkid} EsriJSONSpatialReferenceWkid
 */
/**
 * @typedef {Object} EsriJSONMultiPolygon
 * @property {Array<Array<Array<Array<number>>>>} rings Rings for the MultiPolygon.
 * @property {boolean} [hasM] If the polygon coordinates have an M value.
 * @property {boolean} [hasZ] If the polygon coordinates have a Z value.
 * @property {EsriJSONSpatialReferenceWkid} [spatialReference] The coordinate reference system.
 */
/**
 * @const
 * @type {Object<import("../geom/GeometryType.js").default, function(EsriJSONGeometry): import("../geom/Geometry.js").default>}
 */
var GEOMETRY_READERS = {};
GEOMETRY_READERS[GeometryType.POINT] = readPointGeometry;
GEOMETRY_READERS[GeometryType.LINE_STRING] = readLineStringGeometry;
GEOMETRY_READERS[GeometryType.POLYGON] = readPolygonGeometry;
GEOMETRY_READERS[GeometryType.MULTI_POINT] = readMultiPointGeometry;
GEOMETRY_READERS[GeometryType.MULTI_LINE_STRING] = readMultiLineStringGeometry;
GEOMETRY_READERS[GeometryType.MULTI_POLYGON] = readMultiPolygonGeometry;
/**
 * @const
 * @type {Object<string, function(import("../geom/Geometry.js").default, import("./Feature.js").WriteOptions=): (EsriJSONGeometry)>}
 */
var GEOMETRY_WRITERS = {};
GEOMETRY_WRITERS[GeometryType.POINT] = writePointGeometry;
GEOMETRY_WRITERS[GeometryType.LINE_STRING] = writeLineStringGeometry;
GEOMETRY_WRITERS[GeometryType.POLYGON] = writePolygonGeometry;
GEOMETRY_WRITERS[GeometryType.MULTI_POINT] = writeMultiPointGeometry;
GEOMETRY_WRITERS[GeometryType.MULTI_LINE_STRING] = writeMultiLineStringGeometry;
GEOMETRY_WRITERS[GeometryType.MULTI_POLYGON] = writeMultiPolygonGeometry;
/**
 * @typedef {Object} Options
 * @property {string} [geometryName] Geometry name to use when creating features.
 */
/**
 * @classdesc
 * Feature format for reading and writing data in the EsriJSON format.
 *
 * @api
 */
var EsriJSON = /** @class */ (function (_super) {
    __extends(EsriJSON, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function EsriJSON(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        _this = _super.call(this) || this;
        /**
         * Name of the geometry attribute for features.
         * @type {string|undefined}
         * @private
         */
        _this.geometryName_ = options.geometryName;
        return _this;
    }
    /**
     * @param {Object} object Object.
     * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
     * @param {string=} opt_idField Name of the field where to get the id from.
     * @protected
     * @return {import("../Feature.js").default} Feature.
     */
    EsriJSON.prototype.readFeatureFromObject = function (object, opt_options, opt_idField) {
        var esriJSONFeature = /** @type {EsriJSONFeature} */ (object);
        var geometry = readGeometry(esriJSONFeature.geometry, opt_options);
        var feature = new Feature();
        if (this.geometryName_) {
            feature.setGeometryName(this.geometryName_);
        }
        feature.setGeometry(geometry);
        if (esriJSONFeature.attributes) {
            feature.setProperties(esriJSONFeature.attributes, true);
            var id = esriJSONFeature.attributes[opt_idField];
            if (id !== undefined) {
                feature.setId(/** @type {number} */ (id));
            }
        }
        return feature;
    };
    /**
     * @param {Object} object Object.
     * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
     * @protected
     * @return {Array<Feature>} Features.
     */
    EsriJSON.prototype.readFeaturesFromObject = function (object, opt_options) {
        var options = opt_options ? opt_options : {};
        if (object['features']) {
            var esriJSONFeatureSet = /** @type {EsriJSONFeatureSet} */ (object);
            /** @type {Array<import("../Feature.js").default>} */
            var features = [];
            var esriJSONFeatures = esriJSONFeatureSet.features;
            for (var i = 0, ii = esriJSONFeatures.length; i < ii; ++i) {
                features.push(this.readFeatureFromObject(esriJSONFeatures[i], options, object.objectIdFieldName));
            }
            return features;
        }
        else {
            return [this.readFeatureFromObject(object, options)];
        }
    };
    /**
     * @param {EsriJSONGeometry} object Object.
     * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
     * @protected
     * @return {import("../geom/Geometry.js").default} Geometry.
     */
    EsriJSON.prototype.readGeometryFromObject = function (object, opt_options) {
        return readGeometry(object, opt_options);
    };
    /**
     * @param {Object} object Object.
     * @protected
     * @return {import("../proj/Projection.js").default} Projection.
     */
    EsriJSON.prototype.readProjectionFromObject = function (object) {
        if (object['spatialReference'] &&
            object['spatialReference']['wkid'] !== undefined) {
            var spatialReference = /** @type {EsriJSONSpatialReferenceWkid} */ (object['spatialReference']);
            var crs = spatialReference.wkid;
            return getProjection('EPSG:' + crs);
        }
        else {
            return null;
        }
    };
    /**
     * Encode a geometry as a EsriJSON object.
     *
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {import("./Feature.js").WriteOptions=} opt_options Write options.
     * @return {EsriJSONGeometry} Object.
     * @api
     */
    EsriJSON.prototype.writeGeometryObject = function (geometry, opt_options) {
        return writeGeometry(geometry, this.adaptOptions(opt_options));
    };
    /**
     * Encode a feature as a esriJSON Feature object.
     *
     * @param {import("../Feature.js").default} feature Feature.
     * @param {import("./Feature.js").WriteOptions=} opt_options Write options.
     * @return {Object} Object.
     * @api
     */
    EsriJSON.prototype.writeFeatureObject = function (feature, opt_options) {
        opt_options = this.adaptOptions(opt_options);
        var object = {};
        if (!feature.hasProperties()) {
            object['attributes'] = {};
            return object;
        }
        var properties = feature.getProperties();
        var geometry = feature.getGeometry();
        if (geometry) {
            object['geometry'] = writeGeometry(geometry, opt_options);
            var projection = opt_options &&
                (opt_options.dataProjection || opt_options.featureProjection);
            if (projection) {
                object['geometry']['spatialReference'] = /** @type {EsriJSONSpatialReferenceWkid} */ ({
                    wkid: Number(getProjection(projection).getCode().split(':').pop()),
                });
            }
            delete properties[feature.getGeometryName()];
        }
        if (!isEmpty(properties)) {
            object['attributes'] = properties;
        }
        else {
            object['attributes'] = {};
        }
        return object;
    };
    /**
     * Encode an array of features as a EsriJSON object.
     *
     * @param {Array<import("../Feature.js").default>} features Features.
     * @param {import("./Feature.js").WriteOptions=} opt_options Write options.
     * @return {EsriJSONFeatureSet} EsriJSON Object.
     * @api
     */
    EsriJSON.prototype.writeFeaturesObject = function (features, opt_options) {
        opt_options = this.adaptOptions(opt_options);
        var objects = [];
        for (var i = 0, ii = features.length; i < ii; ++i) {
            objects.push(this.writeFeatureObject(features[i], opt_options));
        }
        return {
            'features': objects,
        };
    };
    return EsriJSON;
}(JSONFeature));
/**
 * @param {EsriJSONGeometry} object Object.
 * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
 * @return {import("../geom/Geometry.js").default} Geometry.
 */
function readGeometry(object, opt_options) {
    var _a, _b;
    if (!object) {
        return null;
    }
    /** @type {import("../geom/GeometryType.js").default} */
    var type;
    if (typeof object['x'] === 'number' && typeof object['y'] === 'number') {
        type = GeometryType.POINT;
    }
    else if (object['points']) {
        type = GeometryType.MULTI_POINT;
    }
    else if (object['paths']) {
        var esriJSONPolyline = /** @type {EsriJSONPolyline} */ (object);
        if (esriJSONPolyline.paths.length === 1) {
            type = GeometryType.LINE_STRING;
        }
        else {
            type = GeometryType.MULTI_LINE_STRING;
        }
    }
    else if (object['rings']) {
        var esriJSONPolygon = /** @type {EsriJSONPolygon} */ (object);
        var layout = getGeometryLayout(esriJSONPolygon);
        var rings = convertRings(esriJSONPolygon.rings, layout);
        if (rings.length === 1) {
            type = GeometryType.POLYGON;
            object = assign({}, object, (_a = {}, _a['rings'] = rings[0], _a));
        }
        else {
            type = GeometryType.MULTI_POLYGON;
            object = assign({}, object, (_b = {}, _b['rings'] = rings, _b));
        }
    }
    var geometryReader = GEOMETRY_READERS[type];
    return transformGeometryWithOptions(geometryReader(object), false, opt_options);
}
/**
 * Determines inner and outer rings.
 * Checks if any polygons in this array contain any other polygons in this
 * array. It is used for checking for holes.
 * Logic inspired by: https://github.com/Esri/terraformer-arcgis-parser
 * @param {Array<!Array<!Array<number>>>} rings Rings.
 * @param {import("../geom/GeometryLayout.js").default} layout Geometry layout.
 * @return {Array<!Array<!Array<!Array<number>>>>} Transformed rings.
 */
function convertRings(rings, layout) {
    var flatRing = [];
    var outerRings = [];
    var holes = [];
    var i, ii;
    for (i = 0, ii = rings.length; i < ii; ++i) {
        flatRing.length = 0;
        deflateCoordinates(flatRing, 0, rings[i], layout.length);
        // is this ring an outer ring? is it clockwise?
        var clockwise = linearRingIsClockwise(flatRing, 0, flatRing.length, layout.length);
        if (clockwise) {
            outerRings.push([rings[i]]);
        }
        else {
            holes.push(rings[i]);
        }
    }
    while (holes.length) {
        var hole = holes.shift();
        var matched = false;
        // loop over all outer rings and see if they contain our hole.
        for (i = outerRings.length - 1; i >= 0; i--) {
            var outerRing = outerRings[i][0];
            var containsHole = containsExtent(new LinearRing(outerRing).getExtent(), new LinearRing(hole).getExtent());
            if (containsHole) {
                // the hole is contained push it into our polygon
                outerRings[i].push(hole);
                matched = true;
                break;
            }
        }
        if (!matched) {
            // no outer rings contain this hole turn it into and outer
            // ring (reverse it)
            outerRings.push([hole.reverse()]);
        }
    }
    return outerRings;
}
/**
 * @param {EsriJSONPoint} object Object.
 * @return {import("../geom/Geometry.js").default} Point.
 */
function readPointGeometry(object) {
    var point;
    if (object.m !== undefined && object.z !== undefined) {
        point = new Point([object.x, object.y, object.z, object.m], GeometryLayout.XYZM);
    }
    else if (object.z !== undefined) {
        point = new Point([object.x, object.y, object.z], GeometryLayout.XYZ);
    }
    else if (object.m !== undefined) {
        point = new Point([object.x, object.y, object.m], GeometryLayout.XYM);
    }
    else {
        point = new Point([object.x, object.y]);
    }
    return point;
}
/**
 * @param {EsriJSONPolyline} object Object.
 * @return {import("../geom/Geometry.js").default} LineString.
 */
function readLineStringGeometry(object) {
    var layout = getGeometryLayout(object);
    return new LineString(object.paths[0], layout);
}
/**
 * @param {EsriJSONPolyline} object Object.
 * @return {import("../geom/Geometry.js").default} MultiLineString.
 */
function readMultiLineStringGeometry(object) {
    var layout = getGeometryLayout(object);
    return new MultiLineString(object.paths, layout);
}
/**
 * @param {EsriJSONHasZM} object Object.
 * @return {import("../geom/GeometryLayout.js").default} The geometry layout to use.
 */
function getGeometryLayout(object) {
    var layout = GeometryLayout.XY;
    if (object.hasZ === true && object.hasM === true) {
        layout = GeometryLayout.XYZM;
    }
    else if (object.hasZ === true) {
        layout = GeometryLayout.XYZ;
    }
    else if (object.hasM === true) {
        layout = GeometryLayout.XYM;
    }
    return layout;
}
/**
 * @param {EsriJSONMultipoint} object Object.
 * @return {import("../geom/Geometry.js").default} MultiPoint.
 */
function readMultiPointGeometry(object) {
    var layout = getGeometryLayout(object);
    return new MultiPoint(object.points, layout);
}
/**
 * @param {EsriJSONMultiPolygon} object Object.
 * @return {import("../geom/Geometry.js").default} MultiPolygon.
 */
function readMultiPolygonGeometry(object) {
    var layout = getGeometryLayout(object);
    return new MultiPolygon(object.rings, layout);
}
/**
 * @param {EsriJSONPolygon} object Object.
 * @return {import("../geom/Geometry.js").default} Polygon.
 */
function readPolygonGeometry(object) {
    var layout = getGeometryLayout(object);
    return new Polygon(object.rings, layout);
}
/**
 * @param {import("../geom/Point.js").default} geometry Geometry.
 * @param {import("./Feature.js").WriteOptions=} opt_options Write options.
 * @return {EsriJSONPoint} EsriJSON geometry.
 */
function writePointGeometry(geometry, opt_options) {
    var coordinates = geometry.getCoordinates();
    /** @type {EsriJSONPoint} */
    var esriJSON;
    var layout = geometry.getLayout();
    if (layout === GeometryLayout.XYZ) {
        esriJSON = {
            x: coordinates[0],
            y: coordinates[1],
            z: coordinates[2],
        };
    }
    else if (layout === GeometryLayout.XYM) {
        esriJSON = {
            x: coordinates[0],
            y: coordinates[1],
            m: coordinates[2],
        };
    }
    else if (layout === GeometryLayout.XYZM) {
        esriJSON = {
            x: coordinates[0],
            y: coordinates[1],
            z: coordinates[2],
            m: coordinates[3],
        };
    }
    else if (layout === GeometryLayout.XY) {
        esriJSON = {
            x: coordinates[0],
            y: coordinates[1],
        };
    }
    else {
        assert(false, 34); // Invalid geometry layout
    }
    return esriJSON;
}
/**
 * @param {import("../geom/SimpleGeometry.js").default} geometry Geometry.
 * @return {Object} Object with boolean hasZ and hasM keys.
 */
function getHasZM(geometry) {
    var layout = geometry.getLayout();
    return {
        hasZ: layout === GeometryLayout.XYZ || layout === GeometryLayout.XYZM,
        hasM: layout === GeometryLayout.XYM || layout === GeometryLayout.XYZM,
    };
}
/**
 * @param {import("../geom/LineString.js").default} lineString Geometry.
 * @param {import("./Feature.js").WriteOptions=} opt_options Write options.
 * @return {EsriJSONPolyline} EsriJSON geometry.
 */
function writeLineStringGeometry(lineString, opt_options) {
    var hasZM = getHasZM(lineString);
    return {
        hasZ: hasZM.hasZ,
        hasM: hasZM.hasM,
        paths: [
            /** @type {Array<EsriJSONPosition>} */ (lineString.getCoordinates()),
        ],
    };
}
/**
 * @param {import("../geom/Polygon.js").default} polygon Geometry.
 * @param {import("./Feature.js").WriteOptions=} opt_options Write options.
 * @return {EsriJSONPolygon} EsriJSON geometry.
 */
function writePolygonGeometry(polygon, opt_options) {
    // Esri geometries use the left-hand rule
    var hasZM = getHasZM(polygon);
    return {
        hasZ: hasZM.hasZ,
        hasM: hasZM.hasM,
        rings: /** @type {Array<Array<EsriJSONPosition>>} */ (polygon.getCoordinates(false)),
    };
}
/**
 * @param {import("../geom/MultiLineString.js").default} multiLineString Geometry.
 * @param {import("./Feature.js").WriteOptions=} opt_options Write options.
 * @return {EsriJSONPolyline} EsriJSON geometry.
 */
function writeMultiLineStringGeometry(multiLineString, opt_options) {
    var hasZM = getHasZM(multiLineString);
    return {
        hasZ: hasZM.hasZ,
        hasM: hasZM.hasM,
        paths: /** @type {Array<Array<EsriJSONPosition>>} */ (multiLineString.getCoordinates()),
    };
}
/**
 * @param {import("../geom/MultiPoint.js").default} multiPoint Geometry.
 * @param {import("./Feature.js").WriteOptions=} opt_options Write options.
 * @return {EsriJSONMultipoint} EsriJSON geometry.
 */
function writeMultiPointGeometry(multiPoint, opt_options) {
    var hasZM = getHasZM(multiPoint);
    return {
        hasZ: hasZM.hasZ,
        hasM: hasZM.hasM,
        points: /** @type {Array<EsriJSONPosition>} */ (multiPoint.getCoordinates()),
    };
}
/**
 * @param {import("../geom/MultiPolygon.js").default} geometry Geometry.
 * @param {import("./Feature.js").WriteOptions=} opt_options Write options.
 * @return {EsriJSONPolygon} EsriJSON geometry.
 */
function writeMultiPolygonGeometry(geometry, opt_options) {
    var hasZM = getHasZM(geometry);
    var coordinates = geometry.getCoordinates(false);
    var output = [];
    for (var i = 0; i < coordinates.length; i++) {
        for (var x = coordinates[i].length - 1; x >= 0; x--) {
            output.push(coordinates[i][x]);
        }
    }
    return {
        hasZ: hasZM.hasZ,
        hasM: hasZM.hasM,
        rings: /** @type {Array<Array<EsriJSONPosition>>} */ (output),
    };
}
/**
 * @param {import("../geom/Geometry.js").default} geometry Geometry.
 * @param {import("./Feature.js").WriteOptions=} opt_options Write options.
 * @return {EsriJSONGeometry} EsriJSON geometry.
 */
function writeGeometry(geometry, opt_options) {
    var geometryWriter = GEOMETRY_WRITERS[geometry.getType()];
    return geometryWriter(transformGeometryWithOptions(geometry, true, opt_options), opt_options);
}
export default EsriJSON;
//# sourceMappingURL=EsriJSON.js.map