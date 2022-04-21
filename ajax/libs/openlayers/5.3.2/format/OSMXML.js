/**
 * @module ol/format/OSMXML
 */
// FIXME add typedef for stack state objects
import {extend} from '../array.js';
import Feature from '../Feature.js';
import {transformWithOptions} from './Feature.js';
import XMLFeature from './XMLFeature.js';
import GeometryLayout from '../geom/GeometryLayout.js';
import LineString from '../geom/LineString.js';
import Point from '../geom/Point.js';
import Polygon from '../geom/Polygon.js';
import {isEmpty} from '../obj.js';
import {get as getProjection} from '../proj.js';
import {pushParseAndPop, makeStructureNS} from '../xml.js';


/**
 * @const
 * @type {Array<null>}
 */
var NAMESPACE_URIS = [null];


/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
var WAY_PARSERS = makeStructureNS(
  NAMESPACE_URIS, {
    'nd': readNd,
    'tag': readTag
  });


/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
var PARSERS = makeStructureNS(
  NAMESPACE_URIS, {
    'node': readNode,
    'way': readWay
  });


/**
 * @classdesc
 * Feature format for reading data in the
 * [OSMXML format](http://wiki.openstreetmap.org/wiki/OSM_XML).
 *
 * @api
 */
var OSMXML = /*@__PURE__*/(function (XMLFeature) {
  function OSMXML() {
    XMLFeature.call(this);

    /**
     * @inheritDoc
     */
    this.dataProjection = getProjection('EPSG:4326');
  }

  if ( XMLFeature ) OSMXML.__proto__ = XMLFeature;
  OSMXML.prototype = Object.create( XMLFeature && XMLFeature.prototype );
  OSMXML.prototype.constructor = OSMXML;

  /**
   * @inheritDoc
   */
  OSMXML.prototype.readFeaturesFromNode = function readFeaturesFromNode (node, opt_options) {
    var options = this.getReadOptions(node, opt_options);
    if (node.localName == 'osm') {
      var state = pushParseAndPop({
        nodes: {},
        ways: [],
        features: []
      }, PARSERS, node, [options]);
      // parse nodes in ways
      for (var j = 0; j < state.ways.length; j++) {
        var values = /** @type {Object} */ (state.ways[j]);
        /** @type {Array<number>} */
        var flatCoordinates = [];
        for (var i = 0, ii = values.ndrefs.length; i < ii; i++) {
          var point = state.nodes[values.ndrefs[i]];
          extend(flatCoordinates, point);
        }
        var geometry = (void 0);
        if (values.ndrefs[0] == values.ndrefs[values.ndrefs.length - 1]) {
          // closed way
          geometry = new Polygon(flatCoordinates, GeometryLayout.XY, [flatCoordinates.length]);
        } else {
          geometry = new LineString(flatCoordinates, GeometryLayout.XY);
        }
        transformWithOptions(geometry, false, options);
        var feature = new Feature(geometry);
        feature.setId(values.id);
        feature.setProperties(values.tags);
        state.features.push(feature);
      }
      if (state.features) {
        return state.features;
      }
    }
    return [];
  };

  return OSMXML;
}(XMLFeature));


/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
var NODE_PARSERS = makeStructureNS(
  NAMESPACE_URIS, {
    'tag': readTag
  });


/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 */
function readNode(node, objectStack) {
  var options = /** @type {import("./Feature.js").ReadOptions} */ (objectStack[0]);
  var state = /** @type {Object} */ (objectStack[objectStack.length - 1]);
  var id = node.getAttribute('id');
  /** @type {import("../coordinate.js").Coordinate} */
  var coordinates = [
    parseFloat(node.getAttribute('lon')),
    parseFloat(node.getAttribute('lat'))
  ];
  state.nodes[id] = coordinates;

  var values = pushParseAndPop({
    tags: {}
  }, NODE_PARSERS, node, objectStack);
  if (!isEmpty(values.tags)) {
    var geometry = new Point(coordinates);
    transformWithOptions(geometry, false, options);
    var feature = new Feature(geometry);
    feature.setId(id);
    feature.setProperties(values.tags);
    state.features.push(feature);
  }
}


/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 */
function readWay(node, objectStack) {
  var id = node.getAttribute('id');
  var values = pushParseAndPop({
    id: id,
    ndrefs: [],
    tags: {}
  }, WAY_PARSERS, node, objectStack);
  var state = /** @type {Object} */ (objectStack[objectStack.length - 1]);
  state.ways.push(values);
}


/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 */
function readNd(node, objectStack) {
  var values = /** @type {Object} */ (objectStack[objectStack.length - 1]);
  values.ndrefs.push(node.getAttribute('ref'));
}


/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 */
function readTag(node, objectStack) {
  var values = /** @type {Object} */ (objectStack[objectStack.length - 1]);
  values.tags[node.getAttribute('k')] = node.getAttribute('v');
}


export default OSMXML;

//# sourceMappingURL=OSMXML.js.map