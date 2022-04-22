/**
 * @module ol/format/WMTSCapabilities
 */
import {boundingExtent} from '../extent.js';
import OWS from './OWS.js';
import {readHref} from './XLink.js';
import XML from './XML.js';
import {readString, readNonNegativeInteger, readDecimal} from './xsd.js';
import {pushParseAndPop, makeStructureNS,
  makeObjectPropertySetter, makeObjectPropertyPusher, makeArrayPusher} from '../xml.js';


/**
 * @const
 * @type {Array<null|string>}
 */
var NAMESPACE_URIS = [
  null,
  'http://www.opengis.net/wmts/1.0'
];


/**
 * @const
 * @type {Array<null|string>}
 */
var OWS_NAMESPACE_URIS = [
  null,
  'http://www.opengis.net/ows/1.1'
];


/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
var PARSERS = makeStructureNS(
  NAMESPACE_URIS, {
    'Contents': makeObjectPropertySetter(readContents)
  });


/**
 * @classdesc
 * Format for reading WMTS capabilities data.
 *
 * @api
 */
var WMTSCapabilities = /*@__PURE__*/(function (XML) {
  function WMTSCapabilities() {
    XML.call(this);

    /**
     * @type {OWS}
     * @private
     */
    this.owsParser_ = new OWS();
  }

  if ( XML ) WMTSCapabilities.__proto__ = XML;
  WMTSCapabilities.prototype = Object.create( XML && XML.prototype );
  WMTSCapabilities.prototype.constructor = WMTSCapabilities;

  /**
   * @inheritDoc
   */
  WMTSCapabilities.prototype.readFromDocument = function readFromDocument (doc) {
    for (var n = doc.firstChild; n; n = n.nextSibling) {
      if (n.nodeType == Node.ELEMENT_NODE) {
        return this.readFromNode(n);
      }
    }
    return null;
  };

  /**
   * @inheritDoc
   */
  WMTSCapabilities.prototype.readFromNode = function readFromNode (node) {
    var version = node.getAttribute('version').trim();
    var WMTSCapabilityObject = this.owsParser_.readFromNode(node);
    if (!WMTSCapabilityObject) {
      return null;
    }
    WMTSCapabilityObject['version'] = version;
    WMTSCapabilityObject = pushParseAndPop(WMTSCapabilityObject, PARSERS, node, []);
    return WMTSCapabilityObject ? WMTSCapabilityObject : null;
  };

  return WMTSCapabilities;
}(XML));


/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
var CONTENTS_PARSERS = makeStructureNS(
  NAMESPACE_URIS, {
    'Layer': makeObjectPropertyPusher(readLayer),
    'TileMatrixSet': makeObjectPropertyPusher(readTileMatrixSet)
  });


/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
var LAYER_PARSERS = makeStructureNS(
  NAMESPACE_URIS, {
    'Style': makeObjectPropertyPusher(readStyle),
    'Format': makeObjectPropertyPusher(readString),
    'TileMatrixSetLink': makeObjectPropertyPusher(readTileMatrixSetLink),
    'Dimension': makeObjectPropertyPusher(readDimensions),
    'ResourceURL': makeObjectPropertyPusher(readResourceUrl)
  }, makeStructureNS(OWS_NAMESPACE_URIS, {
    'Title': makeObjectPropertySetter(readString),
    'Abstract': makeObjectPropertySetter(readString),
    'WGS84BoundingBox': makeObjectPropertySetter(readWgs84BoundingBox),
    'Identifier': makeObjectPropertySetter(readString)
  }));


/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
var STYLE_PARSERS = makeStructureNS(
  NAMESPACE_URIS, {
    'LegendURL': makeObjectPropertyPusher(readLegendUrl)
  }, makeStructureNS(OWS_NAMESPACE_URIS, {
    'Title': makeObjectPropertySetter(readString),
    'Identifier': makeObjectPropertySetter(readString)
  }));


/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
var TMS_LINKS_PARSERS = makeStructureNS(
  NAMESPACE_URIS, {
    'TileMatrixSet': makeObjectPropertySetter(readString),
    'TileMatrixSetLimits': makeObjectPropertySetter(readTileMatrixLimitsList)
  });

/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
var TMS_LIMITS_LIST_PARSERS = makeStructureNS(
  NAMESPACE_URIS, {
    'TileMatrixLimits': makeArrayPusher(readTileMatrixLimits)
  });


/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
var TMS_LIMITS_PARSERS = makeStructureNS(
  NAMESPACE_URIS, {
    'TileMatrix': makeObjectPropertySetter(readString),
    'MinTileRow': makeObjectPropertySetter(readNonNegativeInteger),
    'MaxTileRow': makeObjectPropertySetter(readNonNegativeInteger),
    'MinTileCol': makeObjectPropertySetter(readNonNegativeInteger),
    'MaxTileCol': makeObjectPropertySetter(readNonNegativeInteger)
  });


/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
var DIMENSION_PARSERS = makeStructureNS(
  NAMESPACE_URIS, {
    'Default': makeObjectPropertySetter(readString),
    'Value': makeObjectPropertyPusher(readString)
  }, makeStructureNS(OWS_NAMESPACE_URIS, {
    'Identifier': makeObjectPropertySetter(readString)
  }));


/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
var WGS84_BBOX_READERS = makeStructureNS(
  OWS_NAMESPACE_URIS, {
    'LowerCorner': makeArrayPusher(readCoordinates),
    'UpperCorner': makeArrayPusher(readCoordinates)
  });


/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
var TMS_PARSERS = makeStructureNS(
  NAMESPACE_URIS, {
    'WellKnownScaleSet': makeObjectPropertySetter(readString),
    'TileMatrix': makeObjectPropertyPusher(readTileMatrix)
  }, makeStructureNS(OWS_NAMESPACE_URIS, {
    'SupportedCRS': makeObjectPropertySetter(readString),
    'Identifier': makeObjectPropertySetter(readString)
  }));


/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */
var TM_PARSERS = makeStructureNS(
  NAMESPACE_URIS, {
    'TopLeftCorner': makeObjectPropertySetter(readCoordinates),
    'ScaleDenominator': makeObjectPropertySetter(readDecimal),
    'TileWidth': makeObjectPropertySetter(readNonNegativeInteger),
    'TileHeight': makeObjectPropertySetter(readNonNegativeInteger),
    'MatrixWidth': makeObjectPropertySetter(readNonNegativeInteger),
    'MatrixHeight': makeObjectPropertySetter(readNonNegativeInteger)
  }, makeStructureNS(OWS_NAMESPACE_URIS, {
    'Identifier': makeObjectPropertySetter(readString)
  }));


/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} Attribution object.
 */
function readContents(node, objectStack) {
  return pushParseAndPop({}, CONTENTS_PARSERS, node, objectStack);
}


/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} Layers object.
 */
function readLayer(node, objectStack) {
  return pushParseAndPop({}, LAYER_PARSERS, node, objectStack);
}


/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} Tile Matrix Set object.
 */
function readTileMatrixSet(node, objectStack) {
  return pushParseAndPop({}, TMS_PARSERS, node, objectStack);
}


/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} Style object.
 */
function readStyle(node, objectStack) {
  var style = pushParseAndPop({}, STYLE_PARSERS, node, objectStack);
  if (!style) {
    return undefined;
  }
  var isDefault = node.getAttribute('isDefault') === 'true';
  style['isDefault'] = isDefault;
  return style;

}


/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} Tile Matrix Set Link object.
 */
function readTileMatrixSetLink(node, objectStack) {
  return pushParseAndPop({}, TMS_LINKS_PARSERS, node, objectStack);
}


/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} Dimension object.
 */
function readDimensions(node, objectStack) {
  return pushParseAndPop({}, DIMENSION_PARSERS, node, objectStack);
}


/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} Resource URL object.
 */
function readResourceUrl(node, objectStack) {
  var format = node.getAttribute('format');
  var template = node.getAttribute('template');
  var resourceType = node.getAttribute('resourceType');
  var resource = {};
  if (format) {
    resource['format'] = format;
  }
  if (template) {
    resource['template'] = template;
  }
  if (resourceType) {
    resource['resourceType'] = resourceType;
  }
  return resource;
}


/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} WGS84 BBox object.
 */
function readWgs84BoundingBox(node, objectStack) {
  var coordinates = pushParseAndPop([], WGS84_BBOX_READERS, node, objectStack);
  if (coordinates.length != 2) {
    return undefined;
  }
  return boundingExtent(coordinates);
}


/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} Legend object.
 */
function readLegendUrl(node, objectStack) {
  var legend = {};
  legend['format'] = node.getAttribute('format');
  legend['href'] = readHref(node);
  return legend;
}


/**
 * @param {Node} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} Coordinates object.
 */
function readCoordinates(node, objectStack) {
  var coordinates = readString(node).split(/\s+/);
  if (!coordinates || coordinates.length != 2) {
    return undefined;
  }
  var x = +coordinates[0];
  var y = +coordinates[1];
  if (isNaN(x) || isNaN(y)) {
    return undefined;
  }
  return [x, y];
}


/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} TileMatrix object.
 */
function readTileMatrix(node, objectStack) {
  return pushParseAndPop({}, TM_PARSERS, node, objectStack);
}


/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} TileMatrixSetLimits Object.
 */
function readTileMatrixLimitsList(node, objectStack) {
  return pushParseAndPop([], TMS_LIMITS_LIST_PARSERS, node, objectStack);
}


/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object|undefined} TileMatrixLimits Array.
 */
function readTileMatrixLimits(node, objectStack) {
  return pushParseAndPop({}, TMS_LIMITS_PARSERS, node, objectStack);
}


export default WMTSCapabilities;

//# sourceMappingURL=WMTSCapabilities.js.map