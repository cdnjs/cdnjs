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
 * @module ol/format/GML2
 */
import GMLBase, { GMLNS } from './GMLBase.js';
import { OBJECT_PROPERTY_NODE_FACTORY, createElementNS, getAllTextContent, makeArrayPusher, makeChildAppender, makeReplacer, makeSimpleNodeFactory, pushParseAndPop, pushSerializeAndPop, } from '../xml.js';
import { assign } from '../obj.js';
import { createOrUpdate } from '../extent.js';
import { get as getProjection } from '../proj.js';
import { transformExtentWithOptions, transformGeometryWithOptions, } from './Feature.js';
import { writeStringTextNode } from './xsd.js';
/**
 * @const
 * @type {string}
 */
var schemaLocation = GMLNS + ' http://schemas.opengis.net/gml/2.1.2/feature.xsd';
/**
 * @const
 * @type {Object<string, string>}
 */
var MULTIGEOMETRY_TO_MEMBER_NODENAME = {
    'MultiLineString': 'lineStringMember',
    'MultiCurve': 'curveMember',
    'MultiPolygon': 'polygonMember',
    'MultiSurface': 'surfaceMember',
};
/**
 * @classdesc
 * Feature format for reading and writing data in the GML format,
 * version 2.1.2.
 *
 * @api
 */
var GML2 = /** @class */ (function (_super) {
    __extends(GML2, _super);
    /**
     * @param {import("./GMLBase.js").Options=} opt_options Optional configuration object.
     */
    function GML2(opt_options) {
        var _this = this;
        var options = 
        /** @type {import("./GMLBase.js").Options} */
        (opt_options ? opt_options : {});
        _this = _super.call(this, options) || this;
        _this.FEATURE_COLLECTION_PARSERS[GMLNS]['featureMember'] = makeArrayPusher(_this.readFeaturesInternal);
        /**
         * @type {string}
         */
        _this.schemaLocation = options.schemaLocation
            ? options.schemaLocation
            : schemaLocation;
        return _this;
    }
    /**
     * @param {Node} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {Array<number>|undefined} Flat coordinates.
     */
    GML2.prototype.readFlatCoordinates = function (node, objectStack) {
        var s = getAllTextContent(node, false).replace(/^\s*|\s*$/g, '');
        var context = /** @type {import("../xml.js").NodeStackItem} */ (objectStack[0]);
        var containerSrs = context['srsName'];
        var axisOrientation = 'enu';
        if (containerSrs) {
            var proj = getProjection(containerSrs);
            if (proj) {
                axisOrientation = proj.getAxisOrientation();
            }
        }
        var coordsGroups = s.trim().split(/\s+/);
        var flatCoordinates = [];
        for (var i = 0, ii = coordsGroups.length; i < ii; i++) {
            var coords = coordsGroups[i].split(/,+/);
            var x = parseFloat(coords[0]);
            var y = parseFloat(coords[1]);
            var z = coords.length === 3 ? parseFloat(coords[2]) : 0;
            if (axisOrientation.substr(0, 2) === 'en') {
                flatCoordinates.push(x, y, z);
            }
            else {
                flatCoordinates.push(y, x, z);
            }
        }
        return flatCoordinates;
    };
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {import("../extent.js").Extent|undefined} Envelope.
     */
    GML2.prototype.readBox = function (node, objectStack) {
        /** @type {Array<number>} */
        var flatCoordinates = pushParseAndPop([null], this.BOX_PARSERS_, node, objectStack, this);
        return createOrUpdate(flatCoordinates[1][0], flatCoordinates[1][1], flatCoordinates[1][3], flatCoordinates[1][4]);
    };
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     */
    GML2.prototype.innerBoundaryIsParser = function (node, objectStack) {
        /** @type {Array<number>|undefined} */
        var flatLinearRing = pushParseAndPop(undefined, this.RING_PARSERS, node, objectStack, this);
        if (flatLinearRing) {
            var flatLinearRings = 
            /** @type {Array<Array<number>>} */
            (objectStack[objectStack.length - 1]);
            flatLinearRings.push(flatLinearRing);
        }
    };
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     */
    GML2.prototype.outerBoundaryIsParser = function (node, objectStack) {
        /** @type {Array<number>|undefined} */
        var flatLinearRing = pushParseAndPop(undefined, this.RING_PARSERS, node, objectStack, this);
        if (flatLinearRing) {
            var flatLinearRings = 
            /** @type {Array<Array<number>>} */
            (objectStack[objectStack.length - 1]);
            flatLinearRings[0] = flatLinearRing;
        }
    };
    /**
     * @const
     * @param {*} value Value.
     * @param {Array<*>} objectStack Object stack.
     * @param {string=} opt_nodeName Node name.
     * @return {Element|undefined} Node.
     * @private
     */
    GML2.prototype.GEOMETRY_NODE_FACTORY_ = function (value, objectStack, opt_nodeName) {
        var context = objectStack[objectStack.length - 1];
        var multiSurface = context['multiSurface'];
        var surface = context['surface'];
        var multiCurve = context['multiCurve'];
        var nodeName;
        if (!Array.isArray(value)) {
            nodeName = /** @type {import("../geom/Geometry.js").default} */ (value).getType();
            if (nodeName === 'MultiPolygon' && multiSurface === true) {
                nodeName = 'MultiSurface';
            }
            else if (nodeName === 'Polygon' && surface === true) {
                nodeName = 'Surface';
            }
            else if (nodeName === 'MultiLineString' && multiCurve === true) {
                nodeName = 'MultiCurve';
            }
        }
        else {
            nodeName = 'Envelope';
        }
        return createElementNS('http://www.opengis.net/gml', nodeName);
    };
    /**
     * @param {Element} node Node.
     * @param {import("../Feature.js").default} feature Feature.
     * @param {Array<*>} objectStack Node stack.
     */
    GML2.prototype.writeFeatureElement = function (node, feature, objectStack) {
        var fid = feature.getId();
        if (fid) {
            node.setAttribute('fid', /** @type {string} */ (fid));
        }
        var context = /** @type {Object} */ (objectStack[objectStack.length - 1]);
        var featureNS = context['featureNS'];
        var geometryName = feature.getGeometryName();
        if (!context.serializers) {
            context.serializers = {};
            context.serializers[featureNS] = {};
        }
        var keys = [];
        var values = [];
        if (feature.hasProperties()) {
            var properties = feature.getProperties();
            for (var key in properties) {
                var value = properties[key];
                if (value !== null) {
                    keys.push(key);
                    values.push(value);
                    if (key == geometryName ||
                        typeof ( /** @type {?} */(value).getSimplifiedGeometry) ===
                            'function') {
                        if (!(key in context.serializers[featureNS])) {
                            context.serializers[featureNS][key] = makeChildAppender(this.writeGeometryElement, this);
                        }
                    }
                    else {
                        if (!(key in context.serializers[featureNS])) {
                            context.serializers[featureNS][key] = makeChildAppender(writeStringTextNode);
                        }
                    }
                }
            }
        }
        var item = assign({}, context);
        item.node = node;
        pushSerializeAndPop(
        /** @type {import("../xml.js").NodeStackItem} */
        (item), context.serializers, makeSimpleNodeFactory(undefined, featureNS), values, objectStack, keys);
    };
    /**
     * @param {Element} node Node.
     * @param {import("../geom/LineString.js").default} geometry LineString geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    GML2.prototype.writeCurveOrLineString = function (node, geometry, objectStack) {
        var context = objectStack[objectStack.length - 1];
        var srsName = context['srsName'];
        if (node.nodeName !== 'LineStringSegment' && srsName) {
            node.setAttribute('srsName', srsName);
        }
        if (node.nodeName === 'LineString' ||
            node.nodeName === 'LineStringSegment') {
            var coordinates = this.createCoordinatesNode_(node.namespaceURI);
            node.appendChild(coordinates);
            this.writeCoordinates_(coordinates, geometry, objectStack);
        }
        else if (node.nodeName === 'Curve') {
            var segments = createElementNS(node.namespaceURI, 'segments');
            node.appendChild(segments);
            this.writeCurveSegments_(segments, geometry, objectStack);
        }
    };
    /**
     * @param {Element} node Node.
     * @param {import("../geom/LineString.js").default} line LineString geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    GML2.prototype.writeLineStringOrCurveMember = function (node, line, objectStack) {
        var child = this.GEOMETRY_NODE_FACTORY_(line, objectStack);
        if (child) {
            node.appendChild(child);
            this.writeCurveOrLineString(child, line, objectStack);
        }
    };
    /**
     * @param {Element} node Node.
     * @param {import("../geom/MultiLineString.js").default} geometry MultiLineString geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    GML2.prototype.writeMultiCurveOrLineString = function (node, geometry, objectStack) {
        var context = objectStack[objectStack.length - 1];
        var hasZ = context['hasZ'];
        var srsName = context['srsName'];
        var curve = context['curve'];
        if (srsName) {
            node.setAttribute('srsName', srsName);
        }
        var lines = geometry.getLineStrings();
        pushSerializeAndPop({ node: node, hasZ: hasZ, srsName: srsName, curve: curve }, this.LINESTRINGORCURVEMEMBER_SERIALIZERS, this.MULTIGEOMETRY_MEMBER_NODE_FACTORY_, lines, objectStack, undefined, this);
    };
    /**
     * @param {Node} node Node.
     * @param {import("../geom/Geometry.js").default|import("../extent.js").Extent} geometry Geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    GML2.prototype.writeGeometryElement = function (node, geometry, objectStack) {
        var context = /** @type {import("./Feature.js").WriteOptions} */ (objectStack[objectStack.length - 1]);
        var item = assign({}, context);
        item['node'] = node;
        var value;
        if (Array.isArray(geometry)) {
            value = transformExtentWithOptions(
            /** @type {import("../extent.js").Extent} */ (geometry), context);
        }
        else {
            value = transformGeometryWithOptions(
            /** @type {import("../geom/Geometry.js").default} */ (geometry), true, context);
        }
        pushSerializeAndPop(
        /** @type {import("../xml.js").NodeStackItem} */
        (item), this.GEOMETRY_SERIALIZERS, this.GEOMETRY_NODE_FACTORY_, [value], objectStack, undefined, this);
    };
    /**
     * @param {string} namespaceURI XML namespace.
     * @returns {Element} coordinates node.
     * @private
     */
    GML2.prototype.createCoordinatesNode_ = function (namespaceURI) {
        var coordinates = createElementNS(namespaceURI, 'coordinates');
        coordinates.setAttribute('decimal', '.');
        coordinates.setAttribute('cs', ',');
        coordinates.setAttribute('ts', ' ');
        return coordinates;
    };
    /**
     * @param {Node} node Node.
     * @param {import("../geom/LineString.js").default|import("../geom/LinearRing.js").default} value Geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    GML2.prototype.writeCoordinates_ = function (node, value, objectStack) {
        var context = objectStack[objectStack.length - 1];
        var hasZ = context['hasZ'];
        var srsName = context['srsName'];
        // only 2d for simple features profile
        var points = value.getCoordinates();
        var len = points.length;
        var parts = new Array(len);
        for (var i = 0; i < len; ++i) {
            var point = points[i];
            parts[i] = this.getCoords_(point, srsName, hasZ);
        }
        writeStringTextNode(node, parts.join(' '));
    };
    /**
     * @param {Node} node Node.
     * @param {import("../geom/LineString.js").default} line LineString geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    GML2.prototype.writeCurveSegments_ = function (node, line, objectStack) {
        var child = createElementNS(node.namespaceURI, 'LineStringSegment');
        node.appendChild(child);
        this.writeCurveOrLineString(child, line, objectStack);
    };
    /**
     * @param {Element} node Node.
     * @param {import("../geom/Polygon.js").default} geometry Polygon geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    GML2.prototype.writeSurfaceOrPolygon = function (node, geometry, objectStack) {
        var context = objectStack[objectStack.length - 1];
        var hasZ = context['hasZ'];
        var srsName = context['srsName'];
        if (node.nodeName !== 'PolygonPatch' && srsName) {
            node.setAttribute('srsName', srsName);
        }
        if (node.nodeName === 'Polygon' || node.nodeName === 'PolygonPatch') {
            var rings = geometry.getLinearRings();
            pushSerializeAndPop({ node: node, hasZ: hasZ, srsName: srsName }, this.RING_SERIALIZERS, this.RING_NODE_FACTORY_, rings, objectStack, undefined, this);
        }
        else if (node.nodeName === 'Surface') {
            var patches = createElementNS(node.namespaceURI, 'patches');
            node.appendChild(patches);
            this.writeSurfacePatches_(patches, geometry, objectStack);
        }
    };
    /**
     * @param {*} value Value.
     * @param {Array<*>} objectStack Object stack.
     * @param {string=} opt_nodeName Node name.
     * @return {Node} Node.
     * @private
     */
    GML2.prototype.RING_NODE_FACTORY_ = function (value, objectStack, opt_nodeName) {
        var context = objectStack[objectStack.length - 1];
        var parentNode = context.node;
        var exteriorWritten = context['exteriorWritten'];
        if (exteriorWritten === undefined) {
            context['exteriorWritten'] = true;
        }
        return createElementNS(parentNode.namespaceURI, exteriorWritten !== undefined ? 'innerBoundaryIs' : 'outerBoundaryIs');
    };
    /**
     * @param {Node} node Node.
     * @param {import("../geom/Polygon.js").default} polygon Polygon geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    GML2.prototype.writeSurfacePatches_ = function (node, polygon, objectStack) {
        var child = createElementNS(node.namespaceURI, 'PolygonPatch');
        node.appendChild(child);
        this.writeSurfaceOrPolygon(child, polygon, objectStack);
    };
    /**
     * @param {Node} node Node.
     * @param {import("../geom/LinearRing.js").default} ring LinearRing geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    GML2.prototype.writeRing = function (node, ring, objectStack) {
        var linearRing = createElementNS(node.namespaceURI, 'LinearRing');
        node.appendChild(linearRing);
        this.writeLinearRing(linearRing, ring, objectStack);
    };
    /**
     * @param {Array<number>} point Point geometry.
     * @param {string=} opt_srsName Optional srsName
     * @param {boolean=} opt_hasZ whether the geometry has a Z coordinate (is 3D) or not.
     * @return {string} The coords string.
     * @private
     */
    GML2.prototype.getCoords_ = function (point, opt_srsName, opt_hasZ) {
        var axisOrientation = 'enu';
        if (opt_srsName) {
            axisOrientation = getProjection(opt_srsName).getAxisOrientation();
        }
        var coords = axisOrientation.substr(0, 2) === 'en'
            ? point[0] + ',' + point[1]
            : point[1] + ',' + point[0];
        if (opt_hasZ) {
            // For newly created points, Z can be undefined.
            var z = point[2] || 0;
            coords += ',' + z;
        }
        return coords;
    };
    /**
     * @param {Element} node Node.
     * @param {import("../geom/Point.js").default} geometry Point geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    GML2.prototype.writePoint = function (node, geometry, objectStack) {
        var context = objectStack[objectStack.length - 1];
        var hasZ = context['hasZ'];
        var srsName = context['srsName'];
        if (srsName) {
            node.setAttribute('srsName', srsName);
        }
        var coordinates = this.createCoordinatesNode_(node.namespaceURI);
        node.appendChild(coordinates);
        var point = geometry.getCoordinates();
        var coord = this.getCoords_(point, srsName, hasZ);
        writeStringTextNode(coordinates, coord);
    };
    /**
     * @param {Element} node Node.
     * @param {import("../geom/MultiPoint.js").default} geometry MultiPoint geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    GML2.prototype.writeMultiPoint = function (node, geometry, objectStack) {
        var context = objectStack[objectStack.length - 1];
        var hasZ = context['hasZ'];
        var srsName = context['srsName'];
        if (srsName) {
            node.setAttribute('srsName', srsName);
        }
        var points = geometry.getPoints();
        pushSerializeAndPop({ node: node, hasZ: hasZ, srsName: srsName }, this.POINTMEMBER_SERIALIZERS, makeSimpleNodeFactory('pointMember'), points, objectStack, undefined, this);
    };
    /**
     * @param {Node} node Node.
     * @param {import("../geom/Point.js").default} point Point geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    GML2.prototype.writePointMember = function (node, point, objectStack) {
        var child = createElementNS(node.namespaceURI, 'Point');
        node.appendChild(child);
        this.writePoint(child, point, objectStack);
    };
    /**
     * @param {Element} node Node.
     * @param {import("../geom/LinearRing.js").default} geometry LinearRing geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    GML2.prototype.writeLinearRing = function (node, geometry, objectStack) {
        var context = objectStack[objectStack.length - 1];
        var srsName = context['srsName'];
        if (srsName) {
            node.setAttribute('srsName', srsName);
        }
        var coordinates = this.createCoordinatesNode_(node.namespaceURI);
        node.appendChild(coordinates);
        this.writeCoordinates_(coordinates, geometry, objectStack);
    };
    /**
     * @param {Element} node Node.
     * @param {import("../geom/MultiPolygon.js").default} geometry MultiPolygon geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    GML2.prototype.writeMultiSurfaceOrPolygon = function (node, geometry, objectStack) {
        var context = objectStack[objectStack.length - 1];
        var hasZ = context['hasZ'];
        var srsName = context['srsName'];
        var surface = context['surface'];
        if (srsName) {
            node.setAttribute('srsName', srsName);
        }
        var polygons = geometry.getPolygons();
        pushSerializeAndPop({ node: node, hasZ: hasZ, srsName: srsName, surface: surface }, this.SURFACEORPOLYGONMEMBER_SERIALIZERS, this.MULTIGEOMETRY_MEMBER_NODE_FACTORY_, polygons, objectStack, undefined, this);
    };
    /**
     * @param {Node} node Node.
     * @param {import("../geom/Polygon.js").default} polygon Polygon geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    GML2.prototype.writeSurfaceOrPolygonMember = function (node, polygon, objectStack) {
        var child = this.GEOMETRY_NODE_FACTORY_(polygon, objectStack);
        if (child) {
            node.appendChild(child);
            this.writeSurfaceOrPolygon(child, polygon, objectStack);
        }
    };
    /**
     * @param {Element} node Node.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {Array<*>} objectStack Node stack.
     */
    GML2.prototype.writeEnvelope = function (node, extent, objectStack) {
        var context = objectStack[objectStack.length - 1];
        var srsName = context['srsName'];
        if (srsName) {
            node.setAttribute('srsName', srsName);
        }
        var keys = ['lowerCorner', 'upperCorner'];
        var values = [extent[0] + ' ' + extent[1], extent[2] + ' ' + extent[3]];
        pushSerializeAndPop(
        /** @type {import("../xml.js").NodeStackItem} */
        ({ node: node }), this.ENVELOPE_SERIALIZERS, OBJECT_PROPERTY_NODE_FACTORY, values, objectStack, keys, this);
    };
    /**
     * @const
     * @param {*} value Value.
     * @param {Array<*>} objectStack Object stack.
     * @param {string=} opt_nodeName Node name.
     * @return {Node|undefined} Node.
     * @private
     */
    GML2.prototype.MULTIGEOMETRY_MEMBER_NODE_FACTORY_ = function (value, objectStack, opt_nodeName) {
        var parentNode = objectStack[objectStack.length - 1].node;
        return createElementNS('http://www.opengis.net/gml', MULTIGEOMETRY_TO_MEMBER_NODENAME[parentNode.nodeName]);
    };
    return GML2;
}(GMLBase));
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
GML2.prototype.GEOMETRY_FLAT_COORDINATES_PARSERS = {
    'http://www.opengis.net/gml': {
        'coordinates': makeReplacer(GML2.prototype.readFlatCoordinates),
    },
};
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
GML2.prototype.FLAT_LINEAR_RINGS_PARSERS = {
    'http://www.opengis.net/gml': {
        'innerBoundaryIs': GML2.prototype.innerBoundaryIsParser,
        'outerBoundaryIs': GML2.prototype.outerBoundaryIsParser,
    },
};
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
GML2.prototype.BOX_PARSERS_ = {
    'http://www.opengis.net/gml': {
        'coordinates': makeArrayPusher(GML2.prototype.readFlatCoordinates),
    },
};
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
GML2.prototype.GEOMETRY_PARSERS = {
    'http://www.opengis.net/gml': {
        'Point': makeReplacer(GMLBase.prototype.readPoint),
        'MultiPoint': makeReplacer(GMLBase.prototype.readMultiPoint),
        'LineString': makeReplacer(GMLBase.prototype.readLineString),
        'MultiLineString': makeReplacer(GMLBase.prototype.readMultiLineString),
        'LinearRing': makeReplacer(GMLBase.prototype.readLinearRing),
        'Polygon': makeReplacer(GMLBase.prototype.readPolygon),
        'MultiPolygon': makeReplacer(GMLBase.prototype.readMultiPolygon),
        'Box': makeReplacer(GML2.prototype.readBox),
    },
};
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
 */
GML2.prototype.GEOMETRY_SERIALIZERS = {
    'http://www.opengis.net/gml': {
        'Curve': makeChildAppender(GML2.prototype.writeCurveOrLineString),
        'MultiCurve': makeChildAppender(GML2.prototype.writeMultiCurveOrLineString),
        'Point': makeChildAppender(GML2.prototype.writePoint),
        'MultiPoint': makeChildAppender(GML2.prototype.writeMultiPoint),
        'LineString': makeChildAppender(GML2.prototype.writeCurveOrLineString),
        'MultiLineString': makeChildAppender(GML2.prototype.writeMultiCurveOrLineString),
        'LinearRing': makeChildAppender(GML2.prototype.writeLinearRing),
        'Polygon': makeChildAppender(GML2.prototype.writeSurfaceOrPolygon),
        'MultiPolygon': makeChildAppender(GML2.prototype.writeMultiSurfaceOrPolygon),
        'Surface': makeChildAppender(GML2.prototype.writeSurfaceOrPolygon),
        'MultiSurface': makeChildAppender(GML2.prototype.writeMultiSurfaceOrPolygon),
        'Envelope': makeChildAppender(GML2.prototype.writeEnvelope),
    },
};
/**
 * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
 */
GML2.prototype.LINESTRINGORCURVEMEMBER_SERIALIZERS = {
    'http://www.opengis.net/gml': {
        'lineStringMember': makeChildAppender(GML2.prototype.writeLineStringOrCurveMember),
        'curveMember': makeChildAppender(GML2.prototype.writeLineStringOrCurveMember),
    },
};
/**
 * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
 */
GML2.prototype.RING_SERIALIZERS = {
    'http://www.opengis.net/gml': {
        'outerBoundaryIs': makeChildAppender(GML2.prototype.writeRing),
        'innerBoundaryIs': makeChildAppender(GML2.prototype.writeRing),
    },
};
/**
 * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
 */
GML2.prototype.POINTMEMBER_SERIALIZERS = {
    'http://www.opengis.net/gml': {
        'pointMember': makeChildAppender(GML2.prototype.writePointMember),
    },
};
/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
 */
GML2.prototype.SURFACEORPOLYGONMEMBER_SERIALIZERS = {
    'http://www.opengis.net/gml': {
        'surfaceMember': makeChildAppender(GML2.prototype.writeSurfaceOrPolygonMember),
        'polygonMember': makeChildAppender(GML2.prototype.writeSurfaceOrPolygonMember),
    },
};
/**
 * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
 */
GML2.prototype.ENVELOPE_SERIALIZERS = {
    'http://www.opengis.net/gml': {
        'lowerCorner': makeChildAppender(writeStringTextNode),
        'upperCorner': makeChildAppender(writeStringTextNode),
    },
};
export default GML2;
//# sourceMappingURL=GML2.js.map