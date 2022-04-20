/**
 * @module ol/format/WKT
 */
import Feature from '../Feature.js';
import {transformWithOptions} from '../format/Feature.js';
import TextFeature from '../format/TextFeature.js';
import GeometryCollection from '../geom/GeometryCollection.js';
import GeometryType from '../geom/GeometryType.js';
import GeometryLayout from '../geom/GeometryLayout.js';
import LineString from '../geom/LineString.js';
import MultiLineString from '../geom/MultiLineString.js';
import MultiPoint from '../geom/MultiPoint.js';
import MultiPolygon from '../geom/MultiPolygon.js';
import Point from '../geom/Point.js';
import Polygon from '../geom/Polygon.js';
import SimpleGeometry from '../geom/SimpleGeometry.js';


/**
 * @enum {function (new:module:ol/geom/Geometry, Array, module:ol/geom/GeometryLayout)}
 */
var GeometryConstructor = {
  'POINT': Point,
  'LINESTRING': LineString,
  'POLYGON': Polygon,
  'MULTIPOINT': MultiPoint,
  'MULTILINESTRING': MultiLineString,
  'MULTIPOLYGON': MultiPolygon
};


/**
 * @typedef {Object} Options
 * @property {boolean} [splitCollection=false] Whether to split GeometryCollections into
 * multiple features on reading.
 */

/**
 * @typedef {Object} Token
 * @property {number} type
 * @property {number|string} [value]
 * @property {number} position
 */

/**
 * @const
 * @type {string}
 */
var EMPTY = 'EMPTY';


/**
 * @const
 * @type {string}
 */
var Z = 'Z';


/**
 * @const
 * @type {string}
 */
var M = 'M';


/**
 * @const
 * @type {string}
 */
var ZM = 'ZM';


/**
 * @const
 * @enum {number}
 */
var TokenType = {
  TEXT: 1,
  LEFT_PAREN: 2,
  RIGHT_PAREN: 3,
  NUMBER: 4,
  COMMA: 5,
  EOF: 6
};

/**
 * @const
 * @type {Object<string, string>}
 */
var WKTGeometryType = {};
for (var type in GeometryType) {
  WKTGeometryType[type] = GeometryType[type].toUpperCase();
}


/**
 * Class to tokenize a WKT string.
 */
var Lexer = function Lexer(wkt) {

  /**
   * @type {string}
   */
  this.wkt = wkt;

  /**
   * @type {number}
   * @private
   */
  this.index_ = -1;
};

/**
 * @param {string} c Character.
 * @return {boolean} Whether the character is alphabetic.
 * @private
 */
Lexer.prototype.isAlpha_ = function isAlpha_ (c) {
  return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';
};

/**
 * @param {string} c Character.
 * @param {boolean=} opt_decimal Whether the string number
 *   contains a dot, i.e. is a decimal number.
 * @return {boolean} Whether the character is numeric.
 * @private
 */
Lexer.prototype.isNumeric_ = function isNumeric_ (c, opt_decimal) {
  var decimal = opt_decimal !== undefined ? opt_decimal : false;
  return c >= '0' && c <= '9' || c == '.' && !decimal;
};

/**
 * @param {string} c Character.
 * @return {boolean} Whether the character is whitespace.
 * @private
 */
Lexer.prototype.isWhiteSpace_ = function isWhiteSpace_ (c) {
  return c == ' ' || c == '\t' || c == '\r' || c == '\n';
};

/**
 * @return {string} Next string character.
 * @private
 */
Lexer.prototype.nextChar_ = function nextChar_ () {
  return this.wkt.charAt(++this.index_);
};

/**
 * Fetch and return the next token.
 * @return {!module:ol/format/WKT~Token} Next string token.
 */
Lexer.prototype.nextToken = function nextToken () {
  var c = this.nextChar_();
  var token = {position: this.index_, value: c};

  if (c == '(') {
    token.type = TokenType.LEFT_PAREN;
  } else if (c == ',') {
    token.type = TokenType.COMMA;
  } else if (c == ')') {
    token.type = TokenType.RIGHT_PAREN;
  } else if (this.isNumeric_(c) || c == '-') {
    token.type = TokenType.NUMBER;
    token.value = this.readNumber_();
  } else if (this.isAlpha_(c)) {
    token.type = TokenType.TEXT;
    token.value = this.readText_();
  } else if (this.isWhiteSpace_(c)) {
    return this.nextToken();
  } else if (c === '') {
    token.type = TokenType.EOF;
  } else {
    throw new Error('Unexpected character: ' + c);
  }

  return token;
};

/**
 * @return {number} Numeric token value.
 * @private
 */
Lexer.prototype.readNumber_ = function readNumber_ () {
    var this$1 = this;

  var c;
  var index = this.index_;
  var decimal = false;
  var scientificNotation = false;
  do {
    if (c == '.') {
      decimal = true;
    } else if (c == 'e' || c == 'E') {
      scientificNotation = true;
    }
    c = this$1.nextChar_();
  } while (
    this.isNumeric_(c, decimal) ||
      // if we haven't detected a scientific number before, 'e' or 'E'
      // hint that we should continue to read
      !scientificNotation && (c == 'e' || c == 'E') ||
      // once we know that we have a scientific number, both '-' and '+'
      // are allowed
      scientificNotation && (c == '-' || c == '+')
  );
  return parseFloat(this.wkt.substring(index, this.index_--));
};

/**
 * @return {string} String token value.
 * @private
 */
Lexer.prototype.readText_ = function readText_ () {
    var this$1 = this;

  var c;
  var index = this.index_;
  do {
    c = this$1.nextChar_();
  } while (this.isAlpha_(c));
  return this.wkt.substring(index, this.index_--).toUpperCase();
};

/**
 * Class to parse the tokens from the WKT string.
 */
var Parser = function Parser(lexer) {

  /**
   * @type {module:ol/format/WKT~Lexer}
   * @private
   */
  this.lexer_ = lexer;

  /**
   * @type {module:ol/format/WKT~Token}
   * @private
   */
  this.token_;

  /**
   * @type {module:ol/geom/GeometryLayout}
   * @private
   */
  this.layout_ = GeometryLayout.XY;
};

/**
 * Fetch the next token form the lexer and replace the active token.
 * @private
 */
Parser.prototype.consume_ = function consume_ () {
  this.token_ = this.lexer_.nextToken();
};

/**
 * Tests if the given type matches the type of the current token.
 * @param {module:ol/format/WKT~TokenType} type Token type.
 * @return {boolean} Whether the token matches the given type.
 */
Parser.prototype.isTokenType = function isTokenType (type) {
  var isMatch = this.token_.type == type;
  return isMatch;
};

/**
 * If the given type matches the current token, consume it.
 * @param {module:ol/format/WKT~TokenType} type Token type.
 * @return {boolean} Whether the token matches the given type.
 */
Parser.prototype.match = function match (type) {
  var isMatch = this.isTokenType(type);
  if (isMatch) {
    this.consume_();
  }
  return isMatch;
};

/**
 * Try to parse the tokens provided by the lexer.
 * @return {module:ol/geom/Geometry} The geometry.
 */
Parser.prototype.parse = function parse () {
  this.consume_();
  var geometry = this.parseGeometry_();
  return geometry;
};

/**
 * Try to parse the dimensional info.
 * @return {module:ol/geom/GeometryLayout} The layout.
 * @private
 */
Parser.prototype.parseGeometryLayout_ = function parseGeometryLayout_ () {
  var layout = GeometryLayout.XY;
  var dimToken = this.token_;
  if (this.isTokenType(TokenType.TEXT)) {
    var dimInfo = dimToken.value;
    if (dimInfo === Z) {
      layout = GeometryLayout.XYZ;
    } else if (dimInfo === M) {
      layout = GeometryLayout.XYM;
    } else if (dimInfo === ZM) {
      layout = GeometryLayout.XYZM;
    }
    if (layout !== GeometryLayout.XY) {
      this.consume_();
    }
  }
  return layout;
};

/**
 * @return {!Array<module:ol/geom/Geometry>} A collection of geometries.
 * @private
 */
Parser.prototype.parseGeometryCollectionText_ = function parseGeometryCollectionText_ () {
    var this$1 = this;

  if (this.match(TokenType.LEFT_PAREN)) {
    var geometries = [];
    do {
      geometries.push(this$1.parseGeometry_());
    } while (this.match(TokenType.COMMA));
    if (this.match(TokenType.RIGHT_PAREN)) {
      return geometries;
    }
  } else if (this.isEmptyGeometry_()) {
    return [];
  }
  throw new Error(this.formatErrorMessage_());
};

/**
 * @return {Array<number>} All values in a point.
 * @private
 */
Parser.prototype.parsePointText_ = function parsePointText_ () {
  if (this.match(TokenType.LEFT_PAREN)) {
    var coordinates = this.parsePoint_();
    if (this.match(TokenType.RIGHT_PAREN)) {
      return coordinates;
    }
  } else if (this.isEmptyGeometry_()) {
    return null;
  }
  throw new Error(this.formatErrorMessage_());
};

/**
 * @return {!Array<!Array<number>>} All points in a linestring.
 * @private
 */
Parser.prototype.parseLineStringText_ = function parseLineStringText_ () {
  if (this.match(TokenType.LEFT_PAREN)) {
    var coordinates = this.parsePointList_();
    if (this.match(TokenType.RIGHT_PAREN)) {
      return coordinates;
    }
  } else if (this.isEmptyGeometry_()) {
    return [];
  }
  throw new Error(this.formatErrorMessage_());
};

/**
 * @return {!Array<!Array<number>>} All points in a polygon.
 * @private
 */
Parser.prototype.parsePolygonText_ = function parsePolygonText_ () {
  if (this.match(TokenType.LEFT_PAREN)) {
    var coordinates = this.parseLineStringTextList_();
    if (this.match(TokenType.RIGHT_PAREN)) {
      return coordinates;
    }
  } else if (this.isEmptyGeometry_()) {
    return [];
  }
  throw new Error(this.formatErrorMessage_());
};

/**
 * @return {!Array<!Array<number>>} All points in a multipoint.
 * @private
 */
Parser.prototype.parseMultiPointText_ = function parseMultiPointText_ () {
  if (this.match(TokenType.LEFT_PAREN)) {
    var coordinates;
    if (this.token_.type == TokenType.LEFT_PAREN) {
      coordinates = this.parsePointTextList_();
    } else {
      coordinates = this.parsePointList_();
    }
    if (this.match(TokenType.RIGHT_PAREN)) {
      return coordinates;
    }
  } else if (this.isEmptyGeometry_()) {
    return [];
  }
  throw new Error(this.formatErrorMessage_());
};

/**
 * @return {!Array<!Array<number>>} All linestring points
 *                                      in a multilinestring.
 * @private
 */
Parser.prototype.parseMultiLineStringText_ = function parseMultiLineStringText_ () {
  if (this.match(TokenType.LEFT_PAREN)) {
    var coordinates = this.parseLineStringTextList_();
    if (this.match(TokenType.RIGHT_PAREN)) {
      return coordinates;
    }
  } else if (this.isEmptyGeometry_()) {
    return [];
  }
  throw new Error(this.formatErrorMessage_());
};

/**
 * @return {!Array<!Array<number>>} All polygon points in a multipolygon.
 * @private
 */
Parser.prototype.parseMultiPolygonText_ = function parseMultiPolygonText_ () {
  if (this.match(TokenType.LEFT_PAREN)) {
    var coordinates = this.parsePolygonTextList_();
    if (this.match(TokenType.RIGHT_PAREN)) {
      return coordinates;
    }
  } else if (this.isEmptyGeometry_()) {
    return [];
  }
  throw new Error(this.formatErrorMessage_());
};

/**
 * @return {!Array<number>} A point.
 * @private
 */
Parser.prototype.parsePoint_ = function parsePoint_ () {
    var this$1 = this;

  var coordinates = [];
  var dimensions = this.layout_.length;
  for (var i = 0; i < dimensions; ++i) {
    var token = this$1.token_;
    if (this$1.match(TokenType.NUMBER)) {
      coordinates.push(token.value);
    } else {
      break;
    }
  }
  if (coordinates.length == dimensions) {
    return coordinates;
  }
  throw new Error(this.formatErrorMessage_());
};

/**
 * @return {!Array<!Array<number>>} An array of points.
 * @private
 */
Parser.prototype.parsePointList_ = function parsePointList_ () {
    var this$1 = this;

  var coordinates = [this.parsePoint_()];
  while (this.match(TokenType.COMMA)) {
    coordinates.push(this$1.parsePoint_());
  }
  return coordinates;
};

/**
 * @return {!Array<!Array<number>>} An array of points.
 * @private
 */
Parser.prototype.parsePointTextList_ = function parsePointTextList_ () {
    var this$1 = this;

  var coordinates = [this.parsePointText_()];
  while (this.match(TokenType.COMMA)) {
    coordinates.push(this$1.parsePointText_());
  }
  return coordinates;
};

/**
 * @return {!Array<!Array<number>>} An array of points.
 * @private
 */
Parser.prototype.parseLineStringTextList_ = function parseLineStringTextList_ () {
    var this$1 = this;

  var coordinates = [this.parseLineStringText_()];
  while (this.match(TokenType.COMMA)) {
    coordinates.push(this$1.parseLineStringText_());
  }
  return coordinates;
};

/**
 * @return {!Array<!Array<number>>} An array of points.
 * @private
 */
Parser.prototype.parsePolygonTextList_ = function parsePolygonTextList_ () {
    var this$1 = this;

  var coordinates = [this.parsePolygonText_()];
  while (this.match(TokenType.COMMA)) {
    coordinates.push(this$1.parsePolygonText_());
  }
  return coordinates;
};

/**
 * @return {boolean} Whether the token implies an empty geometry.
 * @private
 */
Parser.prototype.isEmptyGeometry_ = function isEmptyGeometry_ () {
  var isEmpty = this.isTokenType(TokenType.TEXT) &&
      this.token_.value == EMPTY;
  if (isEmpty) {
    this.consume_();
  }
  return isEmpty;
};

/**
 * Create an error message for an unexpected token error.
 * @return {string} Error message.
 * @private
 */
Parser.prototype.formatErrorMessage_ = function formatErrorMessage_ () {
  return 'Unexpected `' + this.token_.value + '` at position ' +
      this.token_.position + ' in `' + this.lexer_.wkt + '`';
};

/**
 * @return {!module:ol/geom/Geometry} The geometry.
 * @private
 */
Parser.prototype.parseGeometry_ = function parseGeometry_ () {
  var token = this.token_;
  if (this.match(TokenType.TEXT)) {
    var geomType = token.value;
    this.layout_ = this.parseGeometryLayout_();
    if (geomType == 'GEOMETRYCOLLECTION') {
      var geometries = this.parseGeometryCollectionText_();
      return new GeometryCollection(geometries);
    } else {
      var ctor = GeometryConstructor[geomType];
      if (!ctor) {
        throw new Error('Invalid geometry type: ' + geomType);
      }

      var coordinates;
      switch (geomType) {
        case 'POINT': {
          coordinates = this.parsePointText_();
          break;
        }
        case 'LINESTRING': {
          coordinates = this.parseLineStringText_();
          break;
        }
        case 'POLYGON': {
          coordinates = this.parsePolygonText_();
          break;
        }
        case 'MULTIPOINT': {
          coordinates = this.parseMultiPointText_();
          break;
        }
        case 'MULTILINESTRING': {
          coordinates = this.parseMultiLineStringText_();
          break;
        }
        case 'MULTIPOLYGON': {
          coordinates = this.parseMultiPolygonText_();
          break;
        }
        default: {
          throw new Error('Invalid geometry type: ' + geomType);
        }
      }

      if (!coordinates) {
        if (ctor === GeometryConstructor['POINT']) {
          coordinates = [NaN, NaN];
        } else {
          coordinates = [];
        }
      }
      return new ctor(coordinates, this.layout_);
    }
  }
  throw new Error(this.formatErrorMessage_());
};


/**
 * @classdesc
 * Geometry format for reading and writing data in the `WellKnownText` (WKT)
 * format.
 *
 * @api
 */
var WKT = (function (TextFeature) {
  function WKT(opt_options) {
    TextFeature.call(this);

    var options = opt_options ? opt_options : {};


    /**
     * Split GeometryCollection into multiple features.
     * @type {boolean}
     * @private
     */
    this.splitCollection_ = options.splitCollection !== undefined ?
      options.splitCollection : false;

  }

  if ( TextFeature ) WKT.__proto__ = TextFeature;
  WKT.prototype = Object.create( TextFeature && TextFeature.prototype );
  WKT.prototype.constructor = WKT;

  /**
   * Parse a WKT string.
   * @param {string} wkt WKT string.
   * @return {module:ol/geom/Geometry|undefined}
   *     The geometry created.
   * @private
   */
  WKT.prototype.parse_ = function parse_ (wkt) {
    var lexer = new Lexer(wkt);
    var parser = new Parser(lexer);
    return parser.parse();
  };

  /**
   * @inheritDoc
   */
  WKT.prototype.readFeatureFromText = function readFeatureFromText (text, opt_options) {
    var geom = this.readGeometryFromText(text, opt_options);
    if (geom) {
      var feature = new Feature();
      feature.setGeometry(geom);
      return feature;
    }
    return null;
  };

  /**
   * @inheritDoc
   */
  WKT.prototype.readFeaturesFromText = function readFeaturesFromText (text, opt_options) {
    var geometries = [];
    var geometry = this.readGeometryFromText(text, opt_options);
    if (this.splitCollection_ &&
        geometry.getType() == GeometryType.GEOMETRY_COLLECTION) {
      geometries = (/** @type {module:ol/geom/GeometryCollection} */ (geometry))
        .getGeometriesArray();
    } else {
      geometries = [geometry];
    }
    var features = [];
    for (var i = 0, ii = geometries.length; i < ii; ++i) {
      var feature = new Feature();
      feature.setGeometry(geometries[i]);
      features.push(feature);
    }
    return features;
  };

  /**
   * @inheritDoc
   */
  WKT.prototype.readGeometryFromText = function readGeometryFromText (text, opt_options) {
    var geometry = this.parse_(text);
    if (geometry) {
      return (
        /** @type {module:ol/geom/Geometry} */ (transformWithOptions(geometry, false, opt_options))
      );
    } else {
      return null;
    }
  };

  /**
   * @inheritDoc
   */
  WKT.prototype.writeFeatureText = function writeFeatureText (feature, opt_options) {
    var geometry = feature.getGeometry();
    if (geometry) {
      return this.writeGeometryText(geometry, opt_options);
    }
    return '';
  };

  /**
   * @inheritDoc
   */
  WKT.prototype.writeFeaturesText = function writeFeaturesText (features, opt_options) {
    if (features.length == 1) {
      return this.writeFeatureText(features[0], opt_options);
    }
    var geometries = [];
    for (var i = 0, ii = features.length; i < ii; ++i) {
      geometries.push(features[i].getGeometry());
    }
    var collection = new GeometryCollection(geometries);
    return this.writeGeometryText(collection, opt_options);
  };

  /**
   * @inheritDoc
   */
  WKT.prototype.writeGeometryText = function writeGeometryText (geometry, opt_options) {
    return encode(/** @type {module:ol/geom/Geometry} */ (
      transformWithOptions(geometry, true, opt_options)));
  };

  return WKT;
}(TextFeature));


/**
 * @param {module:ol/geom/Point} geom Point geometry.
 * @return {string} Coordinates part of Point as WKT.
 */
function encodePointGeometry(geom) {
  var coordinates = geom.getCoordinates();
  if (coordinates.length === 0) {
    return '';
  }
  return coordinates.join(' ');
}


/**
 * @param {module:ol/geom/MultiPoint} geom MultiPoint geometry.
 * @return {string} Coordinates part of MultiPoint as WKT.
 */
function encodeMultiPointGeometry(geom) {
  var array = [];
  var components = geom.getPoints();
  for (var i = 0, ii = components.length; i < ii; ++i) {
    array.push('(' + encodePointGeometry(components[i]) + ')');
  }
  return array.join(',');
}


/**
 * @param {module:ol/geom/GeometryCollection} geom GeometryCollection geometry.
 * @return {string} Coordinates part of GeometryCollection as WKT.
 */
function encodeGeometryCollectionGeometry(geom) {
  var array = [];
  var geoms = geom.getGeometries();
  for (var i = 0, ii = geoms.length; i < ii; ++i) {
    array.push(encode(geoms[i]));
  }
  return array.join(',');
}


/**
 * @param {module:ol/geom/LineString|module:ol/geom/LinearRing} geom LineString geometry.
 * @return {string} Coordinates part of LineString as WKT.
 */
function encodeLineStringGeometry(geom) {
  var coordinates = geom.getCoordinates();
  var array = [];
  for (var i = 0, ii = coordinates.length; i < ii; ++i) {
    array.push(coordinates[i].join(' '));
  }
  return array.join(',');
}


/**
 * @param {module:ol/geom/MultiLineString} geom MultiLineString geometry.
 * @return {string} Coordinates part of MultiLineString as WKT.
 */
function encodeMultiLineStringGeometry(geom) {
  var array = [];
  var components = geom.getLineStrings();
  for (var i = 0, ii = components.length; i < ii; ++i) {
    array.push('(' + encodeLineStringGeometry(components[i]) + ')');
  }
  return array.join(',');
}


/**
 * @param {module:ol/geom/Polygon} geom Polygon geometry.
 * @return {string} Coordinates part of Polygon as WKT.
 */
function encodePolygonGeometry(geom) {
  var array = [];
  var rings = geom.getLinearRings();
  for (var i = 0, ii = rings.length; i < ii; ++i) {
    array.push('(' + encodeLineStringGeometry(rings[i]) + ')');
  }
  return array.join(',');
}


/**
 * @param {module:ol/geom/MultiPolygon} geom MultiPolygon geometry.
 * @return {string} Coordinates part of MultiPolygon as WKT.
 */
function encodeMultiPolygonGeometry(geom) {
  var array = [];
  var components = geom.getPolygons();
  for (var i = 0, ii = components.length; i < ii; ++i) {
    array.push('(' + encodePolygonGeometry(components[i]) + ')');
  }
  return array.join(',');
}

/**
 * @param {module:ol/geom/SimpleGeometry} geom SimpleGeometry geometry.
 * @return {string} Potential dimensional information for WKT type.
 */
function encodeGeometryLayout(geom) {
  var layout = geom.getLayout();
  var dimInfo = '';
  if (layout === GeometryLayout.XYZ || layout === GeometryLayout.XYZM) {
    dimInfo += Z;
  }
  if (layout === GeometryLayout.XYM || layout === GeometryLayout.XYZM) {
    dimInfo += M;
  }
  return dimInfo;
}


/**
 * @const
 * @type {Object<string, function(module:ol/geom/Geometry): string>}
 */
var GeometryEncoder = {
  'Point': encodePointGeometry,
  'LineString': encodeLineStringGeometry,
  'Polygon': encodePolygonGeometry,
  'MultiPoint': encodeMultiPointGeometry,
  'MultiLineString': encodeMultiLineStringGeometry,
  'MultiPolygon': encodeMultiPolygonGeometry,
  'GeometryCollection': encodeGeometryCollectionGeometry
};


/**
 * Encode a geometry as WKT.
 * @param {module:ol/geom/Geometry} geom The geometry to encode.
 * @return {string} WKT string for the geometry.
 */
function encode(geom) {
  var type = geom.getType();
  var geometryEncoder = GeometryEncoder[type];
  var enc = geometryEncoder(geom);
  type = type.toUpperCase();
  if (geom instanceof SimpleGeometry) {
    var dimInfo = encodeGeometryLayout(geom);
    if (dimInfo.length > 0) {
      type += ' ' + dimInfo;
    }
  }
  if (enc.length === 0) {
    return type + ' ' + EMPTY;
  }
  return type + '(' + enc + ')';
}


export default WKT;

//# sourceMappingURL=WKT.js.map