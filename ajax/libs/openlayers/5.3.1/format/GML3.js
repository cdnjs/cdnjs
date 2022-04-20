/**
 * @module ol/format/GML3
 */
import {extend} from '../array.js';
import {createOrUpdate} from '../extent.js';
import {transformWithOptions} from './Feature.js';
import GMLBase, {GMLNS} from './GMLBase.js';
import {readNonNegativeIntegerString, writeStringTextNode} from './xsd.js';
import GeometryLayout from '../geom/GeometryLayout.js';
import LineString from '../geom/LineString.js';
import MultiLineString from '../geom/MultiLineString.js';
import MultiPolygon from '../geom/MultiPolygon.js';
import Polygon from '../geom/Polygon.js';
import {assign} from '../obj.js';
import {get as getProjection, transformExtent} from '../proj.js';
import {createElementNS, getAllTextContent, makeArrayPusher, makeChildAppender,
  makeReplacer, makeSimpleNodeFactory, OBJECT_PROPERTY_NODE_FACTORY, parseNode,
  pushParseAndPop, pushSerializeAndPop, XML_SCHEMA_INSTANCE_URI} from '../xml.js';


/**
 * @const
 * @type {string}
 * @private
 */
var schemaLocation = GMLNS +
    ' http://schemas.opengis.net/gml/3.1.1/profiles/gmlsfProfile/' +
    '1.0.0/gmlsf.xsd';


/**
 * @const
 * @type {Object<string, string>}
 */
var MULTIGEOMETRY_TO_MEMBER_NODENAME = {
  'MultiLineString': 'lineStringMember',
  'MultiCurve': 'curveMember',
  'MultiPolygon': 'polygonMember',
  'MultiSurface': 'surfaceMember'
};


/**
 * @classdesc
 * Feature format for reading and writing data in the GML format
 * version 3.1.1.
 * Currently only supports GML 3.1.1 Simple Features profile.
 *
 * @api
 */
var GML3 = /*@__PURE__*/(function (GMLBase) {
  function GML3(opt_options) {
    var options = /** @type {import("./GMLBase.js").Options} */
        (opt_options ? opt_options : {});

    GMLBase.call(this, options);

    /**
     * @private
     * @type {boolean}
     */
    this.surface_ = options.surface !== undefined ? options.surface : false;

    /**
     * @private
     * @type {boolean}
     */
    this.curve_ = options.curve !== undefined ? options.curve : false;

    /**
     * @private
     * @type {boolean}
     */
    this.multiCurve_ = options.multiCurve !== undefined ?
      options.multiCurve : true;

    /**
     * @private
     * @type {boolean}
     */
    this.multiSurface_ = options.multiSurface !== undefined ?
      options.multiSurface : true;

    /**
     * @inheritDoc
     */
    this.schemaLocation = options.schemaLocation ?
      options.schemaLocation : schemaLocation;

    /**
     * @private
     * @type {boolean}
     */
    this.hasZ = options.hasZ !== undefined ?
      options.hasZ : false;

  }

  if ( GMLBase ) GML3.__proto__ = GMLBase;
  GML3.prototype = Object.create( GMLBase && GMLBase.prototype );
  GML3.prototype.constructor = GML3;

  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @private
   * @return {MultiLineString|undefined} MultiLineString.
   */
  GML3.prototype.readMultiCurve_ = function readMultiCurve_ (node, objectStack) {
    /** @type {Array<LineString>} */
    var lineStrings = pushParseAndPop([],
      this.MULTICURVE_PARSERS_, node, objectStack, this);
    if (lineStrings) {
      var multiLineString = new MultiLineString(lineStrings);
      return multiLineString;
    } else {
      return undefined;
    }
  };

  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @private
   * @return {MultiPolygon|undefined} MultiPolygon.
   */
  GML3.prototype.readMultiSurface_ = function readMultiSurface_ (node, objectStack) {
    /** @type {Array<Polygon>} */
    var polygons = pushParseAndPop([],
      this.MULTISURFACE_PARSERS_, node, objectStack, this);
    if (polygons) {
      return new MultiPolygon(polygons);
    }
  };

  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @private
   */
  GML3.prototype.curveMemberParser_ = function curveMemberParser_ (node, objectStack) {
    parseNode(this.CURVEMEMBER_PARSERS_, node, objectStack, this);
  };

  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @private
   */
  GML3.prototype.surfaceMemberParser_ = function surfaceMemberParser_ (node, objectStack) {
    parseNode(this.SURFACEMEMBER_PARSERS_,
      node, objectStack, this);
  };

  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @private
   * @return {Array<(Array<number>)>|undefined} flat coordinates.
   */
  GML3.prototype.readPatch_ = function readPatch_ (node, objectStack) {
    return pushParseAndPop([null],
      this.PATCHES_PARSERS_, node, objectStack, this);
  };

  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @private
   * @return {Array<number>|undefined} flat coordinates.
   */
  GML3.prototype.readSegment_ = function readSegment_ (node, objectStack) {
    return pushParseAndPop([null],
      this.SEGMENTS_PARSERS_, node, objectStack, this);
  };

  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @private
   * @return {Array<(Array<number>)>|undefined} flat coordinates.
   */
  GML3.prototype.readPolygonPatch_ = function readPolygonPatch_ (node, objectStack) {
    return pushParseAndPop([null],
      this.FLAT_LINEAR_RINGS_PARSERS, node, objectStack, this);
  };

  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @private
   * @return {Array<number>|undefined} flat coordinates.
   */
  GML3.prototype.readLineStringSegment_ = function readLineStringSegment_ (node, objectStack) {
    return pushParseAndPop([null],
      this.GEOMETRY_FLAT_COORDINATES_PARSERS,
      node, objectStack, this);
  };

  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @private
   */
  GML3.prototype.interiorParser_ = function interiorParser_ (node, objectStack) {
    /** @type {Array<number>|undefined} */
    var flatLinearRing = pushParseAndPop(undefined,
      this.RING_PARSERS, node, objectStack, this);
    if (flatLinearRing) {
      var flatLinearRings = /** @type {Array<Array<number>>} */
          (objectStack[objectStack.length - 1]);
      flatLinearRings.push(flatLinearRing);
    }
  };

  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @private
   */
  GML3.prototype.exteriorParser_ = function exteriorParser_ (node, objectStack) {
    /** @type {Array<number>|undefined} */
    var flatLinearRing = pushParseAndPop(undefined,
      this.RING_PARSERS, node, objectStack, this);
    if (flatLinearRing) {
      var flatLinearRings = /** @type {Array<Array<number>>} */
          (objectStack[objectStack.length - 1]);
      flatLinearRings[0] = flatLinearRing;
    }
  };

  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @private
   * @return {Polygon|undefined} Polygon.
   */
  GML3.prototype.readSurface_ = function readSurface_ (node, objectStack) {
    /** @type {Array<Array<number>>} */
    var flatLinearRings = pushParseAndPop([null],
      this.SURFACE_PARSERS_, node, objectStack, this);
    if (flatLinearRings && flatLinearRings[0]) {
      var flatCoordinates = flatLinearRings[0];
      var ends = [flatCoordinates.length];
      var i, ii;
      for (i = 1, ii = flatLinearRings.length; i < ii; ++i) {
        extend(flatCoordinates, flatLinearRings[i]);
        ends.push(flatCoordinates.length);
      }
      return new Polygon(flatCoordinates, GeometryLayout.XYZ, ends);
    } else {
      return undefined;
    }
  };

  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @private
   * @return {LineString|undefined} LineString.
   */
  GML3.prototype.readCurve_ = function readCurve_ (node, objectStack) {
    /** @type {Array<number>} */
    var flatCoordinates = pushParseAndPop([null],
      this.CURVE_PARSERS_, node, objectStack, this);
    if (flatCoordinates) {
      var lineString = new LineString(flatCoordinates, GeometryLayout.XYZ);
      return lineString;
    } else {
      return undefined;
    }
  };

  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @private
   * @return {import("../extent.js").Extent|undefined} Envelope.
   */
  GML3.prototype.readEnvelope_ = function readEnvelope_ (node, objectStack) {
    /** @type {Array<number>} */
    var flatCoordinates = pushParseAndPop([null],
      this.ENVELOPE_PARSERS_, node, objectStack, this);
    return createOrUpdate(flatCoordinates[1][0],
      flatCoordinates[1][1], flatCoordinates[2][0],
      flatCoordinates[2][1]);
  };

  /**
   * @param {Node} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @private
   * @return {Array<number>|undefined} Flat coordinates.
   */
  GML3.prototype.readFlatPos_ = function readFlatPos_ (node, objectStack) {
    var s = getAllTextContent(node, false);
    var re = /^\s*([+\-]?\d*\.?\d+(?:[eE][+\-]?\d+)?)\s*/;
    /** @type {Array<number>} */
    var flatCoordinates = [];
    var m;
    while ((m = re.exec(s))) {
      flatCoordinates.push(parseFloat(m[1]));
      s = s.substr(m[0].length);
    }
    if (s !== '') {
      return undefined;
    }
    var context = objectStack[0];
    var containerSrs = context['srsName'];
    var axisOrientation = 'enu';
    if (containerSrs) {
      var proj = getProjection(containerSrs);
      axisOrientation = proj.getAxisOrientation();
    }
    if (axisOrientation === 'neu') {
      var i, ii;
      for (i = 0, ii = flatCoordinates.length; i < ii; i += 3) {
        var y = flatCoordinates[i];
        var x = flatCoordinates[i + 1];
        flatCoordinates[i] = x;
        flatCoordinates[i + 1] = y;
      }
    }
    var len = flatCoordinates.length;
    if (len == 2) {
      flatCoordinates.push(0);
    }
    if (len === 0) {
      return undefined;
    }
    return flatCoordinates;
  };

  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @private
   * @return {Array<number>|undefined} Flat coordinates.
   */
  GML3.prototype.readFlatPosList_ = function readFlatPosList_ (node, objectStack) {
    var s = getAllTextContent(node, false).replace(/^\s*|\s*$/g, '');
    var context = objectStack[0];
    var containerSrs = context['srsName'];
    var contextDimension = context['srsDimension'];
    var axisOrientation = 'enu';
    if (containerSrs) {
      var proj = getProjection(containerSrs);
      axisOrientation = proj.getAxisOrientation();
    }
    var coords = s.split(/\s+/);
    // The "dimension" attribute is from the GML 3.0.1 spec.
    var dim = 2;
    if (node.getAttribute('srsDimension')) {
      dim = readNonNegativeIntegerString(
        node.getAttribute('srsDimension'));
    } else if (node.getAttribute('dimension')) {
      dim = readNonNegativeIntegerString(
        node.getAttribute('dimension'));
    } else if (/** @type {Element} */ (node.parentNode).getAttribute('srsDimension')) {
      dim = readNonNegativeIntegerString(
        /** @type {Element} */ (node.parentNode).getAttribute('srsDimension'));
    } else if (contextDimension) {
      dim = readNonNegativeIntegerString(contextDimension);
    }
    var x, y, z;
    var flatCoordinates = [];
    for (var i = 0, ii = coords.length; i < ii; i += dim) {
      x = parseFloat(coords[i]);
      y = parseFloat(coords[i + 1]);
      z = (dim === 3) ? parseFloat(coords[i + 2]) : 0;
      if (axisOrientation.substr(0, 2) === 'en') {
        flatCoordinates.push(x, y, z);
      } else {
        flatCoordinates.push(y, x, z);
      }
    }
    return flatCoordinates;
  };

  /**
   * @param {Element} node Node.
   * @param {import("../geom/Point.js").default} value Point geometry.
   * @param {Array<*>} objectStack Node stack.
   * @private
   */
  GML3.prototype.writePos_ = function writePos_ (node, value, objectStack) {
    var context = objectStack[objectStack.length - 1];
    var hasZ = context['hasZ'];
    var srsDimension = hasZ ? '3' : '2';
    node.setAttribute('srsDimension', srsDimension);
    var srsName = context['srsName'];
    var axisOrientation = 'enu';
    if (srsName) {
      axisOrientation = getProjection(srsName).getAxisOrientation();
    }
    var point = value.getCoordinates();
    var coords;
    // only 2d for simple features profile
    if (axisOrientation.substr(0, 2) === 'en') {
      coords = (point[0] + ' ' + point[1]);
    } else {
      coords = (point[1] + ' ' + point[0]);
    }
    if (hasZ) {
      // For newly created points, Z can be undefined.
      var z = point[2] || 0;
      coords += ' ' + z;
    }
    writeStringTextNode(node, coords);
  };

  /**
   * @param {Array<number>} point Point geometry.
   * @param {string=} opt_srsName Optional srsName
   * @param {boolean=} opt_hasZ whether the geometry has a Z coordinate (is 3D) or not.
   * @return {string} The coords string.
   * @private
   */
  GML3.prototype.getCoords_ = function getCoords_ (point, opt_srsName, opt_hasZ) {
    var axisOrientation = 'enu';
    if (opt_srsName) {
      axisOrientation = getProjection(opt_srsName).getAxisOrientation();
    }
    var coords = ((axisOrientation.substr(0, 2) === 'en') ?
      point[0] + ' ' + point[1] :
      point[1] + ' ' + point[0]);
    if (opt_hasZ) {
      // For newly created points, Z can be undefined.
      var z = point[2] || 0;
      coords += ' ' + z;
    }

    return coords;
  };

  /**
   * @param {Element} node Node.
   * @param {LineString|import("../geom/LinearRing.js").default} value Geometry.
   * @param {Array<*>} objectStack Node stack.
   * @private
   */
  GML3.prototype.writePosList_ = function writePosList_ (node, value, objectStack) {
    var context = objectStack[objectStack.length - 1];
    var hasZ = context['hasZ'];
    var srsDimension = hasZ ? '3' : '2';
    node.setAttribute('srsDimension', srsDimension);
    var srsName = context['srsName'];
    // only 2d for simple features profile
    var points = value.getCoordinates();
    var len = points.length;
    var parts = new Array(len);
    var point;
    for (var i = 0; i < len; ++i) {
      point = points[i];
      parts[i] = this.getCoords_(point, srsName, hasZ);
    }
    writeStringTextNode(node, parts.join(' '));
  };

  /**
   * @param {Element} node Node.
   * @param {import("../geom/Point.js").default} geometry Point geometry.
   * @param {Array<*>} objectStack Node stack.
   * @private
   */
  GML3.prototype.writePoint_ = function writePoint_ (node, geometry, objectStack) {
    var context = objectStack[objectStack.length - 1];
    var srsName = context['srsName'];
    if (srsName) {
      node.setAttribute('srsName', srsName);
    }
    var pos = createElementNS(node.namespaceURI, 'pos');
    node.appendChild(pos);
    this.writePos_(pos, geometry, objectStack);
  };

  /**
   * @param {Element} node Node.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {Array<*>} objectStack Node stack.
   */
  GML3.prototype.writeEnvelope = function writeEnvelope (node, extent, objectStack) {
    var context = objectStack[objectStack.length - 1];
    var srsName = context['srsName'];
    if (srsName) {
      node.setAttribute('srsName', srsName);
    }
    var keys = ['lowerCorner', 'upperCorner'];
    var values = [extent[0] + ' ' + extent[1], extent[2] + ' ' + extent[3]];
    pushSerializeAndPop(/** @type {import("../xml.js").NodeStackItem} */
      ({node: node}), this.ENVELOPE_SERIALIZERS_,
      OBJECT_PROPERTY_NODE_FACTORY,
      values,
      objectStack, keys, this);
  };

  /**
   * @param {Element} node Node.
   * @param {import("../geom/LinearRing.js").default} geometry LinearRing geometry.
   * @param {Array<*>} objectStack Node stack.
   * @private
   */
  GML3.prototype.writeLinearRing_ = function writeLinearRing_ (node, geometry, objectStack) {
    var context = objectStack[objectStack.length - 1];
    var srsName = context['srsName'];
    if (srsName) {
      node.setAttribute('srsName', srsName);
    }
    var posList = createElementNS(node.namespaceURI, 'posList');
    node.appendChild(posList);
    this.writePosList_(posList, geometry, objectStack);
  };

  /**
   * @param {*} value Value.
   * @param {Array<*>} objectStack Object stack.
   * @param {string=} opt_nodeName Node name.
   * @return {Node} Node.
   * @private
   */
  GML3.prototype.RING_NODE_FACTORY_ = function RING_NODE_FACTORY_ (value, objectStack, opt_nodeName) {
    var context = objectStack[objectStack.length - 1];
    var parentNode = context.node;
    var exteriorWritten = context['exteriorWritten'];
    if (exteriorWritten === undefined) {
      context['exteriorWritten'] = true;
    }
    return createElementNS(parentNode.namespaceURI,
      exteriorWritten !== undefined ? 'interior' : 'exterior');
  };

  /**
   * @param {Element} node Node.
   * @param {Polygon} geometry Polygon geometry.
   * @param {Array<*>} objectStack Node stack.
   * @private
   */
  GML3.prototype.writeSurfaceOrPolygon_ = function writeSurfaceOrPolygon_ (node, geometry, objectStack) {
    var context = objectStack[objectStack.length - 1];
    var hasZ = context['hasZ'];
    var srsName = context['srsName'];
    if (node.nodeName !== 'PolygonPatch' && srsName) {
      node.setAttribute('srsName', srsName);
    }
    if (node.nodeName === 'Polygon' || node.nodeName === 'PolygonPatch') {
      var rings = geometry.getLinearRings();
      pushSerializeAndPop(
        {node: node, hasZ: hasZ, srsName: srsName},
        this.RING_SERIALIZERS_,
        this.RING_NODE_FACTORY_,
        rings, objectStack, undefined, this);
    } else if (node.nodeName === 'Surface') {
      var patches = createElementNS(node.namespaceURI, 'patches');
      node.appendChild(patches);
      this.writeSurfacePatches_(
        patches, geometry, objectStack);
    }
  };

  /**
   * @param {Element} node Node.
   * @param {LineString} geometry LineString geometry.
   * @param {Array<*>} objectStack Node stack.
   * @private
   */
  GML3.prototype.writeCurveOrLineString_ = function writeCurveOrLineString_ (node, geometry, objectStack) {
    var context = objectStack[objectStack.length - 1];
    var srsName = context['srsName'];
    if (node.nodeName !== 'LineStringSegment' && srsName) {
      node.setAttribute('srsName', srsName);
    }
    if (node.nodeName === 'LineString' ||
        node.nodeName === 'LineStringSegment') {
      var posList = createElementNS(node.namespaceURI, 'posList');
      node.appendChild(posList);
      this.writePosList_(posList, geometry, objectStack);
    } else if (node.nodeName === 'Curve') {
      var segments = createElementNS(node.namespaceURI, 'segments');
      node.appendChild(segments);
      this.writeCurveSegments_(segments,
        geometry, objectStack);
    }
  };

  /**
   * @param {Element} node Node.
   * @param {MultiPolygon} geometry MultiPolygon geometry.
   * @param {Array<*>} objectStack Node stack.
   * @private
   */
  GML3.prototype.writeMultiSurfaceOrPolygon_ = function writeMultiSurfaceOrPolygon_ (node, geometry, objectStack) {
    var context = objectStack[objectStack.length - 1];
    var hasZ = context['hasZ'];
    var srsName = context['srsName'];
    var surface = context['surface'];
    if (srsName) {
      node.setAttribute('srsName', srsName);
    }
    var polygons = geometry.getPolygons();
    pushSerializeAndPop({node: node, hasZ: hasZ, srsName: srsName, surface: surface},
      this.SURFACEORPOLYGONMEMBER_SERIALIZERS_,
      this.MULTIGEOMETRY_MEMBER_NODE_FACTORY_, polygons,
      objectStack, undefined, this);
  };

  /**
   * @param {Element} node Node.
   * @param {import("../geom/MultiPoint.js").default} geometry MultiPoint geometry.
   * @param {Array<*>} objectStack Node stack.
   * @private
   */
  GML3.prototype.writeMultiPoint_ = function writeMultiPoint_ (node, geometry, objectStack) {
    var context = objectStack[objectStack.length - 1];
    var srsName = context['srsName'];
    var hasZ = context['hasZ'];
    if (srsName) {
      node.setAttribute('srsName', srsName);
    }
    var points = geometry.getPoints();
    pushSerializeAndPop({node: node, hasZ: hasZ, srsName: srsName},
      this.POINTMEMBER_SERIALIZERS_,
      makeSimpleNodeFactory('pointMember'), points,
      objectStack, undefined, this);
  };

  /**
   * @param {Element} node Node.
   * @param {MultiLineString} geometry MultiLineString geometry.
   * @param {Array<*>} objectStack Node stack.
   * @private
   */
  GML3.prototype.writeMultiCurveOrLineString_ = function writeMultiCurveOrLineString_ (node, geometry, objectStack) {
    var context = objectStack[objectStack.length - 1];
    var hasZ = context['hasZ'];
    var srsName = context['srsName'];
    var curve = context['curve'];
    if (srsName) {
      node.setAttribute('srsName', srsName);
    }
    var lines = geometry.getLineStrings();
    pushSerializeAndPop({node: node, hasZ: hasZ, srsName: srsName, curve: curve},
      this.LINESTRINGORCURVEMEMBER_SERIALIZERS_,
      this.MULTIGEOMETRY_MEMBER_NODE_FACTORY_, lines,
      objectStack, undefined, this);
  };

  /**
   * @param {Node} node Node.
   * @param {import("../geom/LinearRing.js").default} ring LinearRing geometry.
   * @param {Array<*>} objectStack Node stack.
   * @private
   */
  GML3.prototype.writeRing_ = function writeRing_ (node, ring, objectStack) {
    var linearRing = createElementNS(node.namespaceURI, 'LinearRing');
    node.appendChild(linearRing);
    this.writeLinearRing_(linearRing, ring, objectStack);
  };

  /**
   * @param {Node} node Node.
   * @param {Polygon} polygon Polygon geometry.
   * @param {Array<*>} objectStack Node stack.
   * @private
   */
  GML3.prototype.writeSurfaceOrPolygonMember_ = function writeSurfaceOrPolygonMember_ (node, polygon, objectStack) {
    var child = this.GEOMETRY_NODE_FACTORY_(
      polygon, objectStack);
    if (child) {
      node.appendChild(child);
      this.writeSurfaceOrPolygon_(child, polygon, objectStack);
    }
  };

  /**
   * @param {Node} node Node.
   * @param {import("../geom/Point.js").default} point Point geometry.
   * @param {Array<*>} objectStack Node stack.
   * @private
   */
  GML3.prototype.writePointMember_ = function writePointMember_ (node, point, objectStack) {
    var child = createElementNS(node.namespaceURI, 'Point');
    node.appendChild(child);
    this.writePoint_(child, point, objectStack);
  };

  /**
   * @param {Node} node Node.
   * @param {LineString} line LineString geometry.
   * @param {Array<*>} objectStack Node stack.
   * @private
   */
  GML3.prototype.writeLineStringOrCurveMember_ = function writeLineStringOrCurveMember_ (node, line, objectStack) {
    var child = this.GEOMETRY_NODE_FACTORY_(line, objectStack);
    if (child) {
      node.appendChild(child);
      this.writeCurveOrLineString_(child, line, objectStack);
    }
  };

  /**
   * @param {Node} node Node.
   * @param {Polygon} polygon Polygon geometry.
   * @param {Array<*>} objectStack Node stack.
   * @private
   */
  GML3.prototype.writeSurfacePatches_ = function writeSurfacePatches_ (node, polygon, objectStack) {
    var child = createElementNS(node.namespaceURI, 'PolygonPatch');
    node.appendChild(child);
    this.writeSurfaceOrPolygon_(child, polygon, objectStack);
  };

  /**
   * @param {Node} node Node.
   * @param {LineString} line LineString geometry.
   * @param {Array<*>} objectStack Node stack.
   * @private
   */
  GML3.prototype.writeCurveSegments_ = function writeCurveSegments_ (node, line, objectStack) {
    var child = createElementNS(node.namespaceURI,
      'LineStringSegment');
    node.appendChild(child);
    this.writeCurveOrLineString_(child, line, objectStack);
  };

  /**
   * @param {Node} node Node.
   * @param {import("../geom/Geometry.js").default|import("../extent.js").Extent} geometry Geometry.
   * @param {Array<*>} objectStack Node stack.
   */
  GML3.prototype.writeGeometryElement = function writeGeometryElement (node, geometry, objectStack) {
    var context = /** @type {import("./Feature.js").WriteOptions} */ (objectStack[objectStack.length - 1]);
    var item = assign({}, context);
    item['node'] = node;
    var value;
    if (Array.isArray(geometry)) {
      if (context.dataProjection) {
        value = transformExtent(
          geometry, context.featureProjection, context.dataProjection);
      } else {
        value = geometry;
      }
    } else {
      value = transformWithOptions(/** @type {import("../geom/Geometry.js").default} */ (geometry), true, context);
    }
    pushSerializeAndPop(/** @type {import("../xml.js").NodeStackItem} */
      (item), this.GEOMETRY_SERIALIZERS_,
      this.GEOMETRY_NODE_FACTORY_, [value],
      objectStack, undefined, this);
  };

  /**
   * @param {Element} node Node.
   * @param {import("../Feature.js").default} feature Feature.
   * @param {Array<*>} objectStack Node stack.
   */
  GML3.prototype.writeFeatureElement = function writeFeatureElement (node, feature, objectStack) {
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
    var properties = feature.getProperties();
    var keys = [];
    var values = [];
    for (var key in properties) {
      var value = properties[key];
      if (value !== null) {
        keys.push(key);
        values.push(value);
        if (key == geometryName || typeof /** @type {?} */ (value).getSimplifiedGeometry === 'function') {
          if (!(key in context.serializers[featureNS])) {
            context.serializers[featureNS][key] = makeChildAppender(
              this.writeGeometryElement, this);
          }
        } else {
          if (!(key in context.serializers[featureNS])) {
            context.serializers[featureNS][key] = makeChildAppender(writeStringTextNode);
          }
        }
      }
    }
    var item = assign({}, context);
    item.node = node;
    pushSerializeAndPop(/** @type {import("../xml.js").NodeStackItem} */
      (item), context.serializers,
      makeSimpleNodeFactory(undefined, featureNS),
      values,
      objectStack, keys);
  };

  /**
   * @param {Node} node Node.
   * @param {Array<import("../Feature.js").default>} features Features.
   * @param {Array<*>} objectStack Node stack.
   * @private
   */
  GML3.prototype.writeFeatureMembers_ = function writeFeatureMembers_ (node, features, objectStack) {
    var context = /** @type {Object} */ (objectStack[objectStack.length - 1]);
    var featureType = context['featureType'];
    var featureNS = context['featureNS'];
    /** @type {Object<string, Object<string, import("../xml.js").Serializer>>} */
    var serializers = {};
    serializers[featureNS] = {};
    serializers[featureNS][featureType] = makeChildAppender(
      this.writeFeatureElement, this);
    var item = assign({}, context);
    item.node = node;
    pushSerializeAndPop(/** @type {import("../xml.js").NodeStackItem} */
      (item),
      serializers,
      makeSimpleNodeFactory(featureType, featureNS), features,
      objectStack);
  };

  /**
   * @const
   * @param {*} value Value.
   * @param {Array<*>} objectStack Object stack.
   * @param {string=} opt_nodeName Node name.
   * @return {Node|undefined} Node.
   * @private
   */
  GML3.prototype.MULTIGEOMETRY_MEMBER_NODE_FACTORY_ = function MULTIGEOMETRY_MEMBER_NODE_FACTORY_ (value, objectStack, opt_nodeName) {
    var parentNode = objectStack[objectStack.length - 1].node;
    return createElementNS(this.namespace,
      MULTIGEOMETRY_TO_MEMBER_NODENAME[parentNode.nodeName]);
  };

  /**
   * @const
   * @param {*} value Value.
   * @param {Array<*>} objectStack Object stack.
   * @param {string=} opt_nodeName Node name.
   * @return {Element|undefined} Node.
   * @private
   */
  GML3.prototype.GEOMETRY_NODE_FACTORY_ = function GEOMETRY_NODE_FACTORY_ (value, objectStack, opt_nodeName) {
    var context = objectStack[objectStack.length - 1];
    var multiSurface = context['multiSurface'];
    var surface = context['surface'];
    var curve = context['curve'];
    var multiCurve = context['multiCurve'];
    var nodeName;
    if (!Array.isArray(value)) {
      nodeName = /** @type {import("../geom/Geometry.js").default} */ (value).getType();
      if (nodeName === 'MultiPolygon' && multiSurface === true) {
        nodeName = 'MultiSurface';
      } else if (nodeName === 'Polygon' && surface === true) {
        nodeName = 'Surface';
      } else if (nodeName === 'LineString' && curve === true) {
        nodeName = 'Curve';
      } else if (nodeName === 'MultiLineString' && multiCurve === true) {
        nodeName = 'MultiCurve';
      }
    } else {
      nodeName = 'Envelope';
    }
    return createElementNS(this.namespace,
      nodeName);
  };

  /**
   * Encode a geometry in GML 3.1.1 Simple Features.
   *
   * @param {import("../geom/Geometry.js").default} geometry Geometry.
   * @param {import("./Feature.js").WriteOptions=} opt_options Options.
   * @return {Node} Node.
   * @override
   * @api
   */
  GML3.prototype.writeGeometryNode = function writeGeometryNode (geometry, opt_options) {
    opt_options = this.adaptOptions(opt_options);
    var geom = createElementNS(this.namespace, 'geom');
    var context = {node: geom, hasZ: this.hasZ, srsName: this.srsName,
      curve: this.curve_, surface: this.surface_,
      multiSurface: this.multiSurface_, multiCurve: this.multiCurve_};
    if (opt_options) {
      assign(context, opt_options);
    }
    this.writeGeometryElement(geom, geometry, [context]);
    return geom;
  };

  /**
   * Encode an array of features in the GML 3.1.1 format as an XML node.
   *
   * @param {Array<import("../Feature.js").default>} features Features.
   * @param {import("./Feature.js").WriteOptions=} opt_options Options.
   * @return {Element} Node.
   * @override
   * @api
   */
  GML3.prototype.writeFeaturesNode = function writeFeaturesNode (features, opt_options) {
    opt_options = this.adaptOptions(opt_options);
    var node = createElementNS(this.namespace, 'featureMembers');
    node.setAttributeNS(XML_SCHEMA_INSTANCE_URI, 'xsi:schemaLocation', this.schemaLocation);
    var context = {
      srsName: this.srsName,
      hasZ: this.hasZ,
      curve: this.curve_,
      surface: this.surface_,
      multiSurface: this.multiSurface_,
      multiCurve: this.multiCurve_,
      featureNS: this.featureNS,
      featureType: this.featureType
    };
    if (opt_options) {
      assign(context, opt_options);
    }
    this.writeFeatureMembers_(node, features, [context]);
    return node;
  };

  return GML3;
}(GMLBase));

/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 * @protected
 */
GML3.prototype.GEOMETRY_FLAT_COORDINATES_PARSERS = {
  'http://www.opengis.net/gml': {
    'pos': makeReplacer(GML3.prototype.readFlatPos_),
    'posList': makeReplacer(GML3.prototype.readFlatPosList_)
  }
};


/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 * @protected
 */
GML3.prototype.FLAT_LINEAR_RINGS_PARSERS = {
  'http://www.opengis.net/gml': {
    'interior': GML3.prototype.interiorParser_,
    'exterior': GML3.prototype.exteriorParser_
  }
};


/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 * @protected
 */
GML3.prototype.GEOMETRY_PARSERS = {
  'http://www.opengis.net/gml': {
    'Point': makeReplacer(GMLBase.prototype.readPoint),
    'MultiPoint': makeReplacer(
      GMLBase.prototype.readMultiPoint),
    'LineString': makeReplacer(
      GMLBase.prototype.readLineString),
    'MultiLineString': makeReplacer(
      GMLBase.prototype.readMultiLineString),
    'LinearRing': makeReplacer(
      GMLBase.prototype.readLinearRing),
    'Polygon': makeReplacer(GMLBase.prototype.readPolygon),
    'MultiPolygon': makeReplacer(
      GMLBase.prototype.readMultiPolygon),
    'Surface': makeReplacer(GML3.prototype.readSurface_),
    'MultiSurface': makeReplacer(
      GML3.prototype.readMultiSurface_),
    'Curve': makeReplacer(GML3.prototype.readCurve_),
    'MultiCurve': makeReplacer(
      GML3.prototype.readMultiCurve_),
    'Envelope': makeReplacer(GML3.prototype.readEnvelope_)
  }
};


/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 * @private
 */
GML3.prototype.MULTICURVE_PARSERS_ = {
  'http://www.opengis.net/gml': {
    'curveMember': makeArrayPusher(
      GML3.prototype.curveMemberParser_),
    'curveMembers': makeArrayPusher(
      GML3.prototype.curveMemberParser_)
  }
};


/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 * @private
 */
GML3.prototype.MULTISURFACE_PARSERS_ = {
  'http://www.opengis.net/gml': {
    'surfaceMember': makeArrayPusher(
      GML3.prototype.surfaceMemberParser_),
    'surfaceMembers': makeArrayPusher(
      GML3.prototype.surfaceMemberParser_)
  }
};


/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 * @private
 */
GML3.prototype.CURVEMEMBER_PARSERS_ = {
  'http://www.opengis.net/gml': {
    'LineString': makeArrayPusher(
      GMLBase.prototype.readLineString),
    'Curve': makeArrayPusher(GML3.prototype.readCurve_)
  }
};


/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 * @private
 */
GML3.prototype.SURFACEMEMBER_PARSERS_ = {
  'http://www.opengis.net/gml': {
    'Polygon': makeArrayPusher(GMLBase.prototype.readPolygon),
    'Surface': makeArrayPusher(GML3.prototype.readSurface_)
  }
};


/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 * @private
 */
GML3.prototype.SURFACE_PARSERS_ = {
  'http://www.opengis.net/gml': {
    'patches': makeReplacer(GML3.prototype.readPatch_)
  }
};


/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 * @private
 */
GML3.prototype.CURVE_PARSERS_ = {
  'http://www.opengis.net/gml': {
    'segments': makeReplacer(GML3.prototype.readSegment_)
  }
};


/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 * @private
 */
GML3.prototype.ENVELOPE_PARSERS_ = {
  'http://www.opengis.net/gml': {
    'lowerCorner': makeArrayPusher(
      GML3.prototype.readFlatPosList_),
    'upperCorner': makeArrayPusher(
      GML3.prototype.readFlatPosList_)
  }
};


/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 * @private
 */
GML3.prototype.PATCHES_PARSERS_ = {
  'http://www.opengis.net/gml': {
    'PolygonPatch': makeReplacer(
      GML3.prototype.readPolygonPatch_)
  }
};


/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 * @private
 */
GML3.prototype.SEGMENTS_PARSERS_ = {
  'http://www.opengis.net/gml': {
    'LineStringSegment': makeReplacer(
      GML3.prototype.readLineStringSegment_)
  }
};


/**
 * Encode an array of features in GML 3.1.1 Simple Features.
 *
 * @function
 * @param {Array<import("../Feature.js").default>} features Features.
 * @param {import("./Feature.js").WriteOptions=} opt_options Options.
 * @return {string} Result.
 * @api
 */
GML3.prototype.writeFeatures;


/**
 * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
 * @private
 */
GML3.prototype.RING_SERIALIZERS_ = {
  'http://www.opengis.net/gml': {
    'exterior': makeChildAppender(GML3.prototype.writeRing_),
    'interior': makeChildAppender(GML3.prototype.writeRing_)
  }
};


/**
 * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
 * @private
 */
GML3.prototype.ENVELOPE_SERIALIZERS_ = {
  'http://www.opengis.net/gml': {
    'lowerCorner': makeChildAppender(writeStringTextNode),
    'upperCorner': makeChildAppender(writeStringTextNode)
  }
};


/**
 * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
 * @private
 */
GML3.prototype.SURFACEORPOLYGONMEMBER_SERIALIZERS_ = {
  'http://www.opengis.net/gml': {
    'surfaceMember': makeChildAppender(
      GML3.prototype.writeSurfaceOrPolygonMember_),
    'polygonMember': makeChildAppender(
      GML3.prototype.writeSurfaceOrPolygonMember_)
  }
};


/**
 * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
 * @private
 */
GML3.prototype.POINTMEMBER_SERIALIZERS_ = {
  'http://www.opengis.net/gml': {
    'pointMember': makeChildAppender(
      GML3.prototype.writePointMember_)
  }
};


/**
 * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
 * @private
 */
GML3.prototype.LINESTRINGORCURVEMEMBER_SERIALIZERS_ = {
  'http://www.opengis.net/gml': {
    'lineStringMember': makeChildAppender(
      GML3.prototype.writeLineStringOrCurveMember_),
    'curveMember': makeChildAppender(
      GML3.prototype.writeLineStringOrCurveMember_)
  }
};


/**
 * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
 * @private
 */
GML3.prototype.GEOMETRY_SERIALIZERS_ = {
  'http://www.opengis.net/gml': {
    'Curve': makeChildAppender(
      GML3.prototype.writeCurveOrLineString_),
    'MultiCurve': makeChildAppender(
      GML3.prototype.writeMultiCurveOrLineString_),
    'Point': makeChildAppender(GML3.prototype.writePoint_),
    'MultiPoint': makeChildAppender(
      GML3.prototype.writeMultiPoint_),
    'LineString': makeChildAppender(
      GML3.prototype.writeCurveOrLineString_),
    'MultiLineString': makeChildAppender(
      GML3.prototype.writeMultiCurveOrLineString_),
    'LinearRing': makeChildAppender(
      GML3.prototype.writeLinearRing_),
    'Polygon': makeChildAppender(
      GML3.prototype.writeSurfaceOrPolygon_),
    'MultiPolygon': makeChildAppender(
      GML3.prototype.writeMultiSurfaceOrPolygon_),
    'Surface': makeChildAppender(
      GML3.prototype.writeSurfaceOrPolygon_),
    'MultiSurface': makeChildAppender(
      GML3.prototype.writeMultiSurfaceOrPolygon_),
    'Envelope': makeChildAppender(
      GML3.prototype.writeEnvelope)
  }
};

export default GML3;

//# sourceMappingURL=GML3.js.map