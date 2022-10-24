var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/format/WKT
 */
import Feature from '../Feature.js';
import GeometryCollection from '../geom/GeometryCollection.js';
import GeometryLayout from '../geom/GeometryLayout.js';
import GeometryType from '../geom/GeometryType.js';
import LineString from '../geom/LineString.js';
import MultiLineString from '../geom/MultiLineString.js';
import MultiPoint from '../geom/MultiPoint.js';
import MultiPolygon from '../geom/MultiPolygon.js';
import Point from '../geom/Point.js';
import Polygon from '../geom/Polygon.js';
import TextFeature from './TextFeature.js';
import { transformGeometryWithOptions } from './Feature.js';
/**
 * Geometry constructors
 * @enum {function (new:import("../geom/Geometry.js").default, Array, import("../geom/GeometryLayout.js").default)}
 */
var GeometryConstructor = {
    'POINT': Point,
    'LINESTRING': LineString,
    'POLYGON': Polygon,
    'MULTIPOINT': MultiPoint,
    'MULTILINESTRING': MultiLineString,
    'MULTIPOLYGON': MultiPolygon,
};
/**
 * @typedef {Object} Options
 * @property {boolean} [splitCollection=false] Whether to split GeometryCollections into
 * multiple features on reading.
 */
/**
 * @typedef {Object} Token
 * @property {number} type Type.
 * @property {number|string} [value] Value.
 * @property {number} position Position.
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
    START: 0,
    TEXT: 1,
    LEFT_PAREN: 2,
    RIGHT_PAREN: 3,
    NUMBER: 4,
    COMMA: 5,
    EOF: 6,
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
var Lexer = /** @class */ (function () {
    /**
     * @param {string} wkt WKT string.
     */
    function Lexer(wkt) {
        /**
         * @type {string}
         */
        this.wkt = wkt;
        /**
         * @type {number}
         * @private
         */
        this.index_ = -1;
    }
    /**
     * @param {string} c Character.
     * @return {boolean} Whether the character is alphabetic.
     * @private
     */
    Lexer.prototype.isAlpha_ = function (c) {
        return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
    };
    /**
     * @param {string} c Character.
     * @param {boolean} [opt_decimal] Whether the string number
     *     contains a dot, i.e. is a decimal number.
     * @return {boolean} Whether the character is numeric.
     * @private
     */
    Lexer.prototype.isNumeric_ = function (c, opt_decimal) {
        var decimal = opt_decimal !== undefined ? opt_decimal : false;
        return (c >= '0' && c <= '9') || (c == '.' && !decimal);
    };
    /**
     * @param {string} c Character.
     * @return {boolean} Whether the character is whitespace.
     * @private
     */
    Lexer.prototype.isWhiteSpace_ = function (c) {
        return c == ' ' || c == '\t' || c == '\r' || c == '\n';
    };
    /**
     * @return {string} Next string character.
     * @private
     */
    Lexer.prototype.nextChar_ = function () {
        return this.wkt.charAt(++this.index_);
    };
    /**
     * Fetch and return the next token.
     * @return {Token} Next string token.
     */
    Lexer.prototype.nextToken = function () {
        var c = this.nextChar_();
        var position = this.index_;
        /** @type {number|string} */
        var value = c;
        var type;
        if (c == '(') {
            type = TokenType.LEFT_PAREN;
        }
        else if (c == ',') {
            type = TokenType.COMMA;
        }
        else if (c == ')') {
            type = TokenType.RIGHT_PAREN;
        }
        else if (this.isNumeric_(c) || c == '-') {
            type = TokenType.NUMBER;
            value = this.readNumber_();
        }
        else if (this.isAlpha_(c)) {
            type = TokenType.TEXT;
            value = this.readText_();
        }
        else if (this.isWhiteSpace_(c)) {
            return this.nextToken();
        }
        else if (c === '') {
            type = TokenType.EOF;
        }
        else {
            throw new Error('Unexpected character: ' + c);
        }
        return { position: position, value: value, type: type };
    };
    /**
     * @return {number} Numeric token value.
     * @private
     */
    Lexer.prototype.readNumber_ = function () {
        var c;
        var index = this.index_;
        var decimal = false;
        var scientificNotation = false;
        do {
            if (c == '.') {
                decimal = true;
            }
            else if (c == 'e' || c == 'E') {
                scientificNotation = true;
            }
            c = this.nextChar_();
        } while (this.isNumeric_(c, decimal) ||
            // if we haven't detected a scientific number before, 'e' or 'E'
            // hint that we should continue to read
            (!scientificNotation && (c == 'e' || c == 'E')) ||
            // once we know that we have a scientific number, both '-' and '+'
            // are allowed
            (scientificNotation && (c == '-' || c == '+')));
        return parseFloat(this.wkt.substring(index, this.index_--));
    };
    /**
     * @return {string} String token value.
     * @private
     */
    Lexer.prototype.readText_ = function () {
        var c;
        var index = this.index_;
        do {
            c = this.nextChar_();
        } while (this.isAlpha_(c));
        return this.wkt.substring(index, this.index_--).toUpperCase();
    };
    return Lexer;
}());
/**
 * Class to parse the tokens from the WKT string.
 */
var Parser = /** @class */ (function () {
    /**
     * @param {Lexer} lexer The lexer.
     */
    function Parser(lexer) {
        /**
         * @type {Lexer}
         * @private
         */
        this.lexer_ = lexer;
        /**
         * @type {Token}
         * @private
         */
        this.token_ = {
            position: 0,
            type: TokenType.START,
        };
        /**
         * @type {import("../geom/GeometryLayout.js").default}
         * @private
         */
        this.layout_ = GeometryLayout.XY;
    }
    /**
     * Fetch the next token form the lexer and replace the active token.
     * @private
     */
    Parser.prototype.consume_ = function () {
        this.token_ = this.lexer_.nextToken();
    };
    /**
     * Tests if the given type matches the type of the current token.
     * @param {TokenType} type Token type.
     * @return {boolean} Whether the token matches the given type.
     */
    Parser.prototype.isTokenType = function (type) {
        return this.token_.type == type;
    };
    /**
     * If the given type matches the current token, consume it.
     * @param {TokenType} type Token type.
     * @return {boolean} Whether the token matches the given type.
     */
    Parser.prototype.match = function (type) {
        var isMatch = this.isTokenType(type);
        if (isMatch) {
            this.consume_();
        }
        return isMatch;
    };
    /**
     * Try to parse the tokens provided by the lexer.
     * @return {import("../geom/Geometry.js").default} The geometry.
     */
    Parser.prototype.parse = function () {
        this.consume_();
        return this.parseGeometry_();
    };
    /**
     * Try to parse the dimensional info.
     * @return {import("../geom/GeometryLayout.js").default} The layout.
     * @private
     */
    Parser.prototype.parseGeometryLayout_ = function () {
        var layout = GeometryLayout.XY;
        var dimToken = this.token_;
        if (this.isTokenType(TokenType.TEXT)) {
            var dimInfo = dimToken.value;
            if (dimInfo === Z) {
                layout = GeometryLayout.XYZ;
            }
            else if (dimInfo === M) {
                layout = GeometryLayout.XYM;
            }
            else if (dimInfo === ZM) {
                layout = GeometryLayout.XYZM;
            }
            if (layout !== GeometryLayout.XY) {
                this.consume_();
            }
        }
        return layout;
    };
    /**
     * @return {Array<import("../geom/Geometry.js").default>} A collection of geometries.
     * @private
     */
    Parser.prototype.parseGeometryCollectionText_ = function () {
        if (this.match(TokenType.LEFT_PAREN)) {
            var geometries = [];
            do {
                geometries.push(this.parseGeometry_());
            } while (this.match(TokenType.COMMA));
            if (this.match(TokenType.RIGHT_PAREN)) {
                return geometries;
            }
        }
        throw new Error(this.formatErrorMessage_());
    };
    /**
     * @return {Array<number>} All values in a point.
     * @private
     */
    Parser.prototype.parsePointText_ = function () {
        if (this.match(TokenType.LEFT_PAREN)) {
            var coordinates = this.parsePoint_();
            if (this.match(TokenType.RIGHT_PAREN)) {
                return coordinates;
            }
        }
        throw new Error(this.formatErrorMessage_());
    };
    /**
     * @return {Array<Array<number>>} All points in a linestring.
     * @private
     */
    Parser.prototype.parseLineStringText_ = function () {
        if (this.match(TokenType.LEFT_PAREN)) {
            var coordinates = this.parsePointList_();
            if (this.match(TokenType.RIGHT_PAREN)) {
                return coordinates;
            }
        }
        throw new Error(this.formatErrorMessage_());
    };
    /**
     * @return {Array<Array<Array<number>>>} All points in a polygon.
     * @private
     */
    Parser.prototype.parsePolygonText_ = function () {
        if (this.match(TokenType.LEFT_PAREN)) {
            var coordinates = this.parseLineStringTextList_();
            if (this.match(TokenType.RIGHT_PAREN)) {
                return coordinates;
            }
        }
        throw new Error(this.formatErrorMessage_());
    };
    /**
     * @return {Array<Array<number>>} All points in a multipoint.
     * @private
     */
    Parser.prototype.parseMultiPointText_ = function () {
        if (this.match(TokenType.LEFT_PAREN)) {
            var coordinates = void 0;
            if (this.token_.type == TokenType.LEFT_PAREN) {
                coordinates = this.parsePointTextList_();
            }
            else {
                coordinates = this.parsePointList_();
            }
            if (this.match(TokenType.RIGHT_PAREN)) {
                return coordinates;
            }
        }
        throw new Error(this.formatErrorMessage_());
    };
    /**
     * @return {Array<Array<Array<number>>>} All linestring points
     *                                          in a multilinestring.
     * @private
     */
    Parser.prototype.parseMultiLineStringText_ = function () {
        if (this.match(TokenType.LEFT_PAREN)) {
            var coordinates = this.parseLineStringTextList_();
            if (this.match(TokenType.RIGHT_PAREN)) {
                return coordinates;
            }
        }
        throw new Error(this.formatErrorMessage_());
    };
    /**
     * @return {Array<Array<Array<Array<number>>>>} All polygon points in a multipolygon.
     * @private
     */
    Parser.prototype.parseMultiPolygonText_ = function () {
        if (this.match(TokenType.LEFT_PAREN)) {
            var coordinates = this.parsePolygonTextList_();
            if (this.match(TokenType.RIGHT_PAREN)) {
                return coordinates;
            }
        }
        throw new Error(this.formatErrorMessage_());
    };
    /**
     * @return {Array<number>} A point.
     * @private
     */
    Parser.prototype.parsePoint_ = function () {
        var coordinates = [];
        var dimensions = this.layout_.length;
        for (var i = 0; i < dimensions; ++i) {
            var token = this.token_;
            if (this.match(TokenType.NUMBER)) {
                coordinates.push(/** @type {number} */ (token.value));
            }
            else {
                break;
            }
        }
        if (coordinates.length == dimensions) {
            return coordinates;
        }
        throw new Error(this.formatErrorMessage_());
    };
    /**
     * @return {Array<Array<number>>} An array of points.
     * @private
     */
    Parser.prototype.parsePointList_ = function () {
        var coordinates = [this.parsePoint_()];
        while (this.match(TokenType.COMMA)) {
            coordinates.push(this.parsePoint_());
        }
        return coordinates;
    };
    /**
     * @return {Array<Array<number>>} An array of points.
     * @private
     */
    Parser.prototype.parsePointTextList_ = function () {
        var coordinates = [this.parsePointText_()];
        while (this.match(TokenType.COMMA)) {
            coordinates.push(this.parsePointText_());
        }
        return coordinates;
    };
    /**
     * @return {Array<Array<Array<number>>>} An array of points.
     * @private
     */
    Parser.prototype.parseLineStringTextList_ = function () {
        var coordinates = [this.parseLineStringText_()];
        while (this.match(TokenType.COMMA)) {
            coordinates.push(this.parseLineStringText_());
        }
        return coordinates;
    };
    /**
     * @return {Array<Array<Array<Array<number>>>>} An array of points.
     * @private
     */
    Parser.prototype.parsePolygonTextList_ = function () {
        var coordinates = [this.parsePolygonText_()];
        while (this.match(TokenType.COMMA)) {
            coordinates.push(this.parsePolygonText_());
        }
        return coordinates;
    };
    /**
     * @return {boolean} Whether the token implies an empty geometry.
     * @private
     */
    Parser.prototype.isEmptyGeometry_ = function () {
        var isEmpty = this.isTokenType(TokenType.TEXT) && this.token_.value == EMPTY;
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
    Parser.prototype.formatErrorMessage_ = function () {
        return ('Unexpected `' +
            this.token_.value +
            '` at position ' +
            this.token_.position +
            ' in `' +
            this.lexer_.wkt +
            '`');
    };
    /**
     * @return {import("../geom/Geometry.js").default} The geometry.
     * @private
     */
    Parser.prototype.parseGeometry_ = function () {
        var token = this.token_;
        if (this.match(TokenType.TEXT)) {
            var geomType = /** @type {string} */ (token.value);
            this.layout_ = this.parseGeometryLayout_();
            var isEmpty = this.isEmptyGeometry_();
            if (geomType == 'GEOMETRYCOLLECTION') {
                if (isEmpty) {
                    return new GeometryCollection([]);
                }
                var geometries = this.parseGeometryCollectionText_();
                return new GeometryCollection(geometries);
            }
            else {
                var ctor = GeometryConstructor[geomType];
                if (!ctor) {
                    throw new Error('Invalid geometry type: ' + geomType);
                }
                var coordinates = void 0;
                if (isEmpty) {
                    if (geomType == 'POINT') {
                        coordinates = [NaN, NaN];
                    }
                    else {
                        coordinates = [];
                    }
                }
                else {
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
                        default:
                            break;
                    }
                }
                return new ctor(coordinates, this.layout_);
            }
        }
        throw new Error(this.formatErrorMessage_());
    };
    return Parser;
}());
/**
 * @classdesc
 * Geometry format for reading and writing data in the `WellKnownText` (WKT)
 * format.
 *
 * @api
 */
var WKT = /** @class */ (function (_super) {
    __extends(WKT, _super);
    /**
     * @param {Options} [opt_options] Options.
     */
    function WKT(opt_options) {
        var _this = _super.call(this) || this;
        var options = opt_options ? opt_options : {};
        /**
         * Split GeometryCollection into multiple features.
         * @type {boolean}
         * @private
         */
        _this.splitCollection_ =
            options.splitCollection !== undefined ? options.splitCollection : false;
        return _this;
    }
    /**
     * Parse a WKT string.
     * @param {string} wkt WKT string.
     * @return {import("../geom/Geometry.js").default}
     *     The geometry created.
     * @private
     */
    WKT.prototype.parse_ = function (wkt) {
        var lexer = new Lexer(wkt);
        var parser = new Parser(lexer);
        return parser.parse();
    };
    /**
     * @protected
     * @param {string} text Text.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
     * @return {import("../Feature.js").default} Feature.
     */
    WKT.prototype.readFeatureFromText = function (text, opt_options) {
        var geom = this.readGeometryFromText(text, opt_options);
        var feature = new Feature();
        feature.setGeometry(geom);
        return feature;
    };
    /**
     * @param {string} text Text.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
     * @protected
     * @return {Array<Feature>} Features.
     */
    WKT.prototype.readFeaturesFromText = function (text, opt_options) {
        var geometries = [];
        var geometry = this.readGeometryFromText(text, opt_options);
        if (this.splitCollection_ &&
            geometry.getType() == GeometryType.GEOMETRY_COLLECTION) {
            geometries = /** @type {GeometryCollection} */ (geometry).getGeometriesArray();
        }
        else {
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
     * @param {string} text Text.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
     * @protected
     * @return {import("../geom/Geometry.js").default} Geometry.
     */
    WKT.prototype.readGeometryFromText = function (text, opt_options) {
        var geometry = this.parse_(text);
        return transformGeometryWithOptions(geometry, false, opt_options);
    };
    /**
     * @param {import("../Feature.js").default} feature Features.
     * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
     * @protected
     * @return {string} Text.
     */
    WKT.prototype.writeFeatureText = function (feature, opt_options) {
        var geometry = feature.getGeometry();
        if (geometry) {
            return this.writeGeometryText(geometry, opt_options);
        }
        return '';
    };
    /**
     * @param {Array<import("../Feature.js").default>} features Features.
     * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
     * @protected
     * @return {string} Text.
     */
    WKT.prototype.writeFeaturesText = function (features, opt_options) {
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
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
     * @protected
     * @return {string} Text.
     */
    WKT.prototype.writeGeometryText = function (geometry, opt_options) {
        return encode(transformGeometryWithOptions(geometry, true, opt_options));
    };
    return WKT;
}(TextFeature));
/**
 * @param {Point} geom Point geometry.
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
 * @param {MultiPoint} geom MultiPoint geometry.
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
 * @param {GeometryCollection} geom GeometryCollection geometry.
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
 * @param {LineString|import("../geom/LinearRing.js").default} geom LineString geometry.
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
 * @param {MultiLineString} geom MultiLineString geometry.
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
 * @param {Polygon} geom Polygon geometry.
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
 * @param {MultiPolygon} geom MultiPolygon geometry.
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
 * @param {import("../geom/SimpleGeometry.js").default} geom SimpleGeometry geometry.
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
 * @type {Object<string, function(import("../geom/Geometry.js").default): string>}
 */
var GeometryEncoder = {
    'Point': encodePointGeometry,
    'LineString': encodeLineStringGeometry,
    'Polygon': encodePolygonGeometry,
    'MultiPoint': encodeMultiPointGeometry,
    'MultiLineString': encodeMultiLineStringGeometry,
    'MultiPolygon': encodeMultiPolygonGeometry,
    'GeometryCollection': encodeGeometryCollectionGeometry,
};
/**
 * Encode a geometry as WKT.
 * @param {import("../geom/Geometry.js").default} geom The geometry to encode.
 * @return {string} WKT string for the geometry.
 */
function encode(geom) {
    var type = geom.getType();
    var geometryEncoder = GeometryEncoder[type];
    var enc = geometryEncoder(geom);
    type = type.toUpperCase();
    if (typeof ( /** @type {?} */(geom).getFlatCoordinates) === 'function') {
        var dimInfo = encodeGeometryLayout(
        /** @type {import("../geom/SimpleGeometry.js").default} */ (geom));
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