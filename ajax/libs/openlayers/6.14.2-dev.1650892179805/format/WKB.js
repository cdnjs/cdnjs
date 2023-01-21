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
 * @module ol/format/WKB
 */
import Feature from '../Feature.js';
import FeatureFormat, { transformGeometryWithOptions } from './Feature.js';
import FormatType from './FormatType.js';
import GeometryCollection from '../geom/GeometryCollection.js';
import GeometryLayout from '../geom/GeometryLayout.js';
import GeometryType from '../geom/GeometryType.js';
import LineString from '../geom/LineString.js';
import MultiLineString from '../geom/MultiLineString.js';
import MultiPoint from '../geom/MultiPoint.js';
import MultiPolygon from '../geom/MultiPolygon.js';
import Point from '../geom/Point.js';
import Polygon from '../geom/Polygon.js';
import { get as getProjection } from '../proj.js';
import SimpleGeometry from '../geom/SimpleGeometry.js';
import { assign } from '../obj.js';
// WKB spec: https://www.ogc.org/standards/sfa
// EWKB spec: https://raw.githubusercontent.com/postgis/postgis/2.1.0/doc/ZMSgeoms.txt
/**
 * @const
 * @enum {number}
 */
var WKBGeometryType = {
    POINT: 1,
    LINE_STRING: 2,
    POLYGON: 3,
    MULTI_POINT: 4,
    MULTI_LINE_STRING: 5,
    MULTI_POLYGON: 6,
    GEOMETRY_COLLECTION: 7,
    /*
    CIRCULAR_STRING: 8,
    COMPOUND_CURVE: 9,
    CURVE_POLYGON: 10,
  
    MULTI_CURVE: 11,
    MULTI_SURFACE: 12,
    CURVE: 13,
    SURFACE: 14,
    */
    POLYHEDRAL_SURFACE: 15,
    TIN: 16,
    TRIANGLE: 17,
};
var WkbReader = /** @class */ (function () {
    /**
     * @param {DataView} view source to read
     */
    function WkbReader(view) {
        this.view_ = view;
        this.pos_ = 0;
        this.initialized_ = false;
        this.isLittleEndian_ = false;
        this.hasZ_ = false;
        this.hasM_ = false;
        /** @type {number|null} */
        this.srid_ = null;
        this.layout_ = GeometryLayout.XY;
    }
    /**
     * @return {number} value
     */
    WkbReader.prototype.readUint8 = function () {
        return this.view_.getUint8(this.pos_++);
    };
    /**
     * @param {boolean} [isLittleEndian] Whether read value as little endian
     * @return {number} value
     */
    WkbReader.prototype.readUint32 = function (isLittleEndian) {
        return this.view_.getUint32((this.pos_ += 4) - 4, isLittleEndian !== undefined ? isLittleEndian : this.isLittleEndian_);
    };
    /**
     * @param {boolean} [isLittleEndian] Whether read value as little endian
     * @return {number} value
     */
    WkbReader.prototype.readDouble = function (isLittleEndian) {
        return this.view_.getFloat64((this.pos_ += 8) - 8, isLittleEndian !== undefined ? isLittleEndian : this.isLittleEndian_);
    };
    /**
     * @return {import('../coordinate.js').Coordinate} coords for Point
     */
    WkbReader.prototype.readPoint = function () {
        /** @type import('../coordinate.js').Coordinate */
        var coords = [];
        coords.push(this.readDouble());
        coords.push(this.readDouble());
        if (this.hasZ_) {
            coords.push(this.readDouble());
        }
        if (this.hasM_) {
            coords.push(this.readDouble());
        }
        return coords;
    };
    /**
     * @return {Array<import('../coordinate.js').Coordinate>} coords for LineString / LinearRing
     */
    WkbReader.prototype.readLineString = function () {
        var numPoints = this.readUint32();
        /** @type Array<import('../coordinate.js').Coordinate> */
        var coords = [];
        for (var i = 0; i < numPoints; i++) {
            coords.push(this.readPoint());
        }
        return coords;
    };
    /**
     * @return {Array<Array<import('../coordinate.js').Coordinate>>} coords for Polygon like
     */
    WkbReader.prototype.readPolygon = function () {
        var numRings = this.readUint32();
        /** @type Array<Array<import('../coordinate.js').Coordinate>> */
        var rings = [];
        for (var i = 0; i < numRings; i++) {
            rings.push(this.readLineString()); // as a LinearRing
        }
        return rings;
    };
    /**
     * @param {number} [expectedTypeId] Expected WKB Type ID
     * @return {number} WKB Type ID
     */
    WkbReader.prototype.readWkbHeader = function (expectedTypeId) {
        var byteOrder = this.readUint8();
        var isLittleEndian = byteOrder > 0;
        var wkbType = this.readUint32(isLittleEndian);
        var wkbTypeThousandth = Math.floor((wkbType & 0x0fffffff) / 1000);
        var hasZ = Boolean(wkbType & 0x80000000) ||
            wkbTypeThousandth === 1 ||
            wkbTypeThousandth === 3;
        var hasM = Boolean(wkbType & 0x40000000) ||
            wkbTypeThousandth === 2 ||
            wkbTypeThousandth === 3;
        var hasSRID = Boolean(wkbType & 0x20000000);
        var typeId = (wkbType & 0x0fffffff) % 1000; // Assume 1000 is an upper limit for type ID
        var layout = ['XY', hasZ ? 'Z' : '', hasM ? 'M' : ''].join('');
        var srid = hasSRID ? this.readUint32(isLittleEndian) : null;
        if (expectedTypeId !== undefined && expectedTypeId !== typeId) {
            throw new Error('Unexpected WKB geometry type ' + typeId);
        }
        if (this.initialized_) {
            // sanity checks
            if (this.isLittleEndian_ !== isLittleEndian) {
                throw new Error('Inconsistent endian');
            }
            if (this.layout_ !== layout) {
                throw new Error('Inconsistent geometry layout');
            }
            if (srid && this.srid_ !== srid) {
                throw new Error('Inconsistent coordinate system (SRID)');
            }
        }
        else {
            this.isLittleEndian_ = isLittleEndian;
            this.hasZ_ = hasZ;
            this.hasM_ = hasM;
            this.layout_ = layout;
            this.srid_ = srid;
            this.initialized_ = true;
        }
        return typeId;
    };
    /**
     * @param {number} typeId WKB Type ID
     * @return {any} values read
     */
    WkbReader.prototype.readWkbPayload = function (typeId) {
        switch (typeId) {
            case WKBGeometryType.POINT:
                return this.readPoint();
            case WKBGeometryType.LINE_STRING:
                return this.readLineString();
            case WKBGeometryType.POLYGON:
            case WKBGeometryType.TRIANGLE:
                return this.readPolygon();
            case WKBGeometryType.MULTI_POINT:
                return this.readMultiPoint();
            case WKBGeometryType.MULTI_LINE_STRING:
                return this.readMultiLineString();
            case WKBGeometryType.MULTI_POLYGON:
            case WKBGeometryType.POLYHEDRAL_SURFACE:
            case WKBGeometryType.TIN:
                return this.readMultiPolygon();
            case WKBGeometryType.GEOMETRY_COLLECTION:
                return this.readGeometryCollection();
            default:
                throw new Error('Unsupported WKB geometry type ' + typeId + ' is found');
        }
    };
    /**
     * @param {number} expectedTypeId Expected WKB Type ID
     * @return {any} values read
     */
    WkbReader.prototype.readWkbBlock = function (expectedTypeId) {
        return this.readWkbPayload(this.readWkbHeader(expectedTypeId));
    };
    /**
     * @param {Function} reader reader function for each item
     * @param {number} [expectedTypeId] Expected WKB Type ID
     * @return {any} values read
     */
    WkbReader.prototype.readWkbCollection = function (reader, expectedTypeId) {
        var num = this.readUint32();
        var items = [];
        for (var i = 0; i < num; i++) {
            var result = reader.call(this, expectedTypeId);
            if (result) {
                items.push(result);
            }
        }
        return items;
    };
    /**
     * @return {Array<import('../coordinate.js').Coordinate>} coords for MultiPoint
     */
    WkbReader.prototype.readMultiPoint = function () {
        return this.readWkbCollection(this.readWkbBlock, WKBGeometryType.POINT);
    };
    /**
     * @return {Array<Array<import('../coordinate.js').Coordinate>>} coords for MultiLineString like
     */
    WkbReader.prototype.readMultiLineString = function () {
        return this.readWkbCollection(this.readWkbBlock, WKBGeometryType.LINE_STRING);
    };
    /**
     * @return {Array<Array<Array<import('../coordinate.js').Coordinate>>>} coords for MultiPolygon like
     */
    WkbReader.prototype.readMultiPolygon = function () {
        return this.readWkbCollection(this.readWkbBlock, WKBGeometryType.POLYGON);
    };
    /**
     * @return {Array<import('../geom/Geometry.js').default>} array of geometries
     */
    WkbReader.prototype.readGeometryCollection = function () {
        return this.readWkbCollection(this.readGeometry);
    };
    /**
     * @return {import('../geom/Geometry.js').default} geometry
     */
    WkbReader.prototype.readGeometry = function () {
        var typeId = this.readWkbHeader();
        var result = this.readWkbPayload(typeId);
        switch (typeId) {
            case WKBGeometryType.POINT:
                return new Point(
                /** @type {import('../coordinate.js').Coordinate} */ (result), this.layout_);
            case WKBGeometryType.LINE_STRING:
                return new LineString(
                /** @type {Array<import('../coordinate.js').Coordinate>} */ (result), this.layout_);
            case WKBGeometryType.POLYGON:
            case WKBGeometryType.TRIANGLE:
                return new Polygon(
                /** @type {Array<Array<import('../coordinate.js').Coordinate>>} */ (result), this.layout_);
            case WKBGeometryType.MULTI_POINT:
                return new MultiPoint(
                /** @type {Array<import('../coordinate.js').Coordinate>} */ (result), this.layout_);
            case WKBGeometryType.MULTI_LINE_STRING:
                return new MultiLineString(
                /** @type {Array<Array<import('../coordinate.js').Coordinate>>} */ (result), this.layout_);
            case WKBGeometryType.MULTI_POLYGON:
            case WKBGeometryType.POLYHEDRAL_SURFACE:
            case WKBGeometryType.TIN:
                return new MultiPolygon(
                /** @type {Array<Array<Array<import('../coordinate.js').Coordinate>>>} */ (result), this.layout_);
            case WKBGeometryType.GEOMETRY_COLLECTION:
                return new GeometryCollection(
                /** @type {Array<import('../geom/Geometry.js').default>} */ (result));
            default:
                return null;
        }
    };
    /**
     * @return {number|null} SRID in the EWKB. `null` if not defined.
     */
    WkbReader.prototype.getSrid = function () {
        return this.srid_;
    };
    return WkbReader;
}());
var WkbWriter = /** @class */ (function () {
    /**
     * @type {object}
     * @property {string} [layout] geometryLayout
     * @property {boolean} [littleEndian=true] littleEndian
     * @property {boolean} [ewkb=true] Whether writes in EWKB format
     * @property {object} [nodata] NoData value for each axes
     * @param {object} opts options
     */
    function WkbWriter(opts) {
        opts = opts || {};
        /** @type {string} */
        this.layout_ = opts.layout;
        this.isLittleEndian_ = opts.littleEndian !== false;
        this.isEWKB_ = opts.ewkb !== false;
        /** @type {Array<Array<number>>} */
        this.writeQueue_ = [];
        /**
         * @type {object}
         * @property {number} X NoData value for X
         * @property {number} Y NoData value for Y
         * @property {number} Z NoData value for Z
         * @property {number} M NoData value for M
         */
        this.nodata_ = assign({ X: 0, Y: 0, Z: 0, M: 0 }, opts.nodata);
    }
    /**
     * @param {number} value value
     */
    WkbWriter.prototype.writeUint8 = function (value) {
        this.writeQueue_.push([1, value]);
    };
    /**
     * @param {number} value value
     */
    WkbWriter.prototype.writeUint32 = function (value) {
        this.writeQueue_.push([4, value]);
    };
    /**
     * @param {number} value value
     */
    WkbWriter.prototype.writeDouble = function (value) {
        this.writeQueue_.push([8, value]);
    };
    /**
     * @param {import('../coordinate.js').Coordinate} coords coords
     * @param {import("../geom/GeometryLayout").default} layout layout
     */
    WkbWriter.prototype.writePoint = function (coords, layout) {
        /**
         * @type {object}
         * @property {number} X NoData value for X
         * @property {number} Y NoData value for Y
         * @property {number} [Z] NoData value for Z
         * @property {number} [M] NoData value for M
         */
        var coordsObj = assign.apply(null, layout.split('').map(function (axis, idx) {
            var _a;
            return (_a = {}, _a[axis] = coords[idx], _a);
        }));
        for (var _i = 0, _a = this.layout_; _i < _a.length; _i++) {
            var axis = _a[_i];
            this.writeDouble(axis in coordsObj ? coordsObj[axis] : this.nodata_[axis]);
        }
    };
    /**
     * @param {Array<import('../coordinate.js').Coordinate>} coords coords
     * @param {import("../geom/GeometryLayout").default} layout layout
     */
    WkbWriter.prototype.writeLineString = function (coords, layout) {
        this.writeUint32(coords.length); // numPoints
        for (var i = 0; i < coords.length; i++) {
            this.writePoint(coords[i], layout);
        }
    };
    /**
     * @param {Array<Array<import('../coordinate.js').Coordinate>>} rings rings
     * @param {import("../geom/GeometryLayout").default} layout layout
     */
    WkbWriter.prototype.writePolygon = function (rings, layout) {
        this.writeUint32(rings.length); // numRings
        for (var i = 0; i < rings.length; i++) {
            this.writeLineString(rings[i], layout); // as a LinearRing
        }
    };
    /**
     * @param {number} wkbType WKB Type ID
     * @param {number} [srid] SRID
     */
    WkbWriter.prototype.writeWkbHeader = function (wkbType, srid) {
        wkbType %= 1000; // Assume 1000 is an upper limit for type ID
        if (this.layout_.indexOf('Z') >= 0) {
            wkbType += this.isEWKB_ ? 0x80000000 : 1000;
        }
        if (this.layout_.indexOf('M') >= 0) {
            wkbType += this.isEWKB_ ? 0x40000000 : 2000;
        }
        if (this.isEWKB_ && Number.isInteger(srid)) {
            wkbType |= 0x20000000;
        }
        this.writeUint8(this.isLittleEndian_ ? 1 : 0);
        this.writeUint32(wkbType);
        if (this.isEWKB_ && Number.isInteger(srid)) {
            this.writeUint32(srid);
        }
    };
    /**
     * @param {Array<import('../coordinate.js').Coordinate>} coords coords
     * @param {string} layout layout
     */
    WkbWriter.prototype.writeMultiPoint = function (coords, layout) {
        this.writeUint32(coords.length); // numItems
        for (var i = 0; i < coords.length; i++) {
            this.writeWkbHeader(1);
            this.writePoint(coords[i], layout);
        }
    };
    /**
     * @param {Array<Array<import('../coordinate.js').Coordinate>>} coords coords
     * @param {string} layout layout
     */
    WkbWriter.prototype.writeMultiLineString = function (coords, layout) {
        this.writeUint32(coords.length); // numItems
        for (var i = 0; i < coords.length; i++) {
            this.writeWkbHeader(2);
            this.writeLineString(coords[i], layout);
        }
    };
    /**
     * @param {Array<Array<Array<import('../coordinate.js').Coordinate>>>} coords coords
     * @param {string} layout layout
     */
    WkbWriter.prototype.writeMultiPolygon = function (coords, layout) {
        this.writeUint32(coords.length); // numItems
        for (var i = 0; i < coords.length; i++) {
            this.writeWkbHeader(3);
            this.writePolygon(coords[i], layout);
        }
    };
    /**
     * @param {Array<import('../geom/Geometry.js').default>} geometries geometries
     */
    WkbWriter.prototype.writeGeometryCollection = function (geometries) {
        this.writeUint32(geometries.length); // numItems
        for (var i = 0; i < geometries.length; i++) {
            this.writeGeometry(geometries[i]);
        }
    };
    /**
     * @param {import("../geom/Geometry.js").default} geom geometry
     * @param {import("../geom/GeometryLayout.js").default} [layout] layout
     * @return {import("../geom/GeometryLayout.js").default} minumum layout made by common axes
     */
    WkbWriter.prototype.findMinimumLayout = function (geom, layout) {
        if (layout === void 0) { layout = GeometryLayout.XYZM; }
        /**
         * @param {import("../geom/GeometryLayout.js").default} a A
         * @param {import("../geom/GeometryLayout.js").default} b B
         * @return {import("../geom/GeometryLayout.js").default} minumum layout made by common axes
         */
        var GeometryLayout_min = function (a, b) {
            if (a === b) {
                return a;
            }
            if (a === GeometryLayout.XYZM) {
                // anything `b` is minimum
                return b;
            }
            if (b === GeometryLayout.XYZM) {
                // anything `a` is minimum
                return a;
            }
            // otherwise, incompatible
            return GeometryLayout.XY;
        };
        if (geom instanceof SimpleGeometry) {
            return GeometryLayout_min(geom.getLayout(), layout);
        }
        if (geom instanceof GeometryCollection) {
            var geoms = geom.getGeometriesArray();
            for (var i = 0; i < geoms.length && layout !== GeometryLayout.XY; i++) {
                layout = this.findMinimumLayout(geoms[i], layout);
            }
        }
        return layout;
    };
    /**
     * @param {import("../geom/Geometry.js").default} geom geometry
     * @param {number} [srid] SRID
     */
    WkbWriter.prototype.writeGeometry = function (geom, srid) {
        var _a, _b;
        var wkblut = (_a = {},
            _a[GeometryType.POINT] = WKBGeometryType.POINT,
            _a[GeometryType.LINE_STRING] = WKBGeometryType.LINE_STRING,
            _a[GeometryType.POLYGON] = WKBGeometryType.POLYGON,
            _a[GeometryType.MULTI_POINT] = WKBGeometryType.MULTI_POINT,
            _a[GeometryType.MULTI_LINE_STRING] = WKBGeometryType.MULTI_LINE_STRING,
            _a[GeometryType.MULTI_POLYGON] = WKBGeometryType.MULTI_POLYGON,
            _a[GeometryType.GEOMETRY_COLLECTION] = WKBGeometryType.GEOMETRY_COLLECTION,
            _a);
        var geomType = geom.getType();
        var typeId = wkblut[geomType];
        if (!typeId) {
            throw new Error('GeometryType ' + geomType + ' is not supported');
        }
        // first call of writeGeometry() traverse whole geometries to determine its output layout if not specified on constructor.
        if (!this.layout_) {
            this.layout_ = this.findMinimumLayout(geom);
        }
        this.writeWkbHeader(typeId, srid);
        if (geom instanceof SimpleGeometry) {
            var writerLUT = (_b = {},
                _b[GeometryType.POINT] = this.writePoint,
                _b[GeometryType.LINE_STRING] = this.writeLineString,
                _b[GeometryType.POLYGON] = this.writePolygon,
                _b[GeometryType.MULTI_POINT] = this.writeMultiPoint,
                _b[GeometryType.MULTI_LINE_STRING] = this.writeMultiLineString,
                _b[GeometryType.MULTI_POLYGON] = this.writeMultiPolygon,
                _b);
            writerLUT[geomType].call(this, geom.getCoordinates(), geom.getLayout());
        }
        else if (geom instanceof GeometryCollection) {
            this.writeGeometryCollection(geom.getGeometriesArray());
        }
    };
    WkbWriter.prototype.getBuffer = function () {
        var _this = this;
        var byteLength = this.writeQueue_.reduce(function (acc, item) { return acc + item[0]; }, 0);
        var buffer = new ArrayBuffer(byteLength);
        var view = new DataView(buffer);
        var pos = 0;
        this.writeQueue_.forEach(function (item) {
            switch (item[0]) {
                case 1:
                    view.setUint8(pos, item[1]);
                    break;
                case 4:
                    view.setUint32(pos, item[1], _this.isLittleEndian_);
                    break;
                case 8:
                    view.setFloat64(pos, item[1], _this.isLittleEndian_);
                    break;
                default:
                    break;
            }
            pos += item[0];
        });
        return buffer;
    };
    return WkbWriter;
}());
/**
 * @typedef {Object} Options
 * @property {boolean} [splitCollection=false] Whether to split GeometryCollections into multiple features on reading.
 * @property {boolean} [hex=true] Returns hex string instead of ArrayBuffer for output. This also is used as a hint internally whether it should load contents as text or ArrayBuffer on reading.
 * @property {boolean} [littleEndian=true] Use littleEndian for output.
 * @property {boolean} [ewkb=true] Use EWKB format for output.
 * @property {import("../geom/GeometryLayout").default} [geometryLayout=null] Use specific coordinate layout for output features (null: auto detect)
 * @property {number} [nodataZ=0] If the `geometryLayout` doesn't match with geometry to be output, this value is used to fill missing coordinate value of Z.
 * @property {number} [nodataM=0] If the `geometryLayout` doesn't match with geometry to be output, this value is used to fill missing coordinate value of M.
 * @property {number|boolean} [srid=true] SRID for output. Specify integer value to enforce the value as a SRID. Specify `true` to extract from `dataProjection`. `false` to suppress the output. This option only takes effect when `ewkb` is `true`.
 */
/**
 * @classdesc
 * Geometry format for reading and writing data in the `Well-Known Binary` (WKB) format.
 * Also supports `Extended Well-Known Binary` (EWKB) format, used in PostGIS for example.
 *
 * @api
 */
var WKB = /** @class */ (function (_super) {
    __extends(WKB, _super);
    /**
     * @param {Options} [opt_options] Optional configuration object.
     */
    function WKB(opt_options) {
        var _this = _super.call(this) || this;
        var options = opt_options ? opt_options : {};
        _this.splitCollection = Boolean(options.splitCollection);
        _this.viewCache_ = null;
        _this.hex_ = options.hex !== false;
        _this.littleEndian_ = options.littleEndian !== false;
        _this.ewkb_ = options.ewkb !== false;
        _this.layout_ = options.geometryLayout; // null for auto detect
        _this.nodataZ_ = options.nodataZ || 0;
        _this.nodataM_ = options.nodataM || 0;
        _this.srid_ = options.srid;
        return _this;
    }
    /**
     * @return {import("./FormatType.js").default} Format.
     */
    WKB.prototype.getType = function () {
        return this.hex_ ? FormatType.TEXT : FormatType.ARRAY_BUFFER;
    };
    /**
     * Read a single feature from a source.
     *
     * @param {string|ArrayBuffer|ArrayBufferView} source Source.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
     * @return {import("../Feature.js").FeatureLike} Feature.
     * @api
     */
    WKB.prototype.readFeature = function (source, opt_options) {
        return new Feature({
            geometry: this.readGeometry(source, opt_options),
        });
    };
    /**
     * Read all features from a source.
     *
     * @param {string|ArrayBuffer|ArrayBufferView} source Source.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
     * @return {Array<import("../Feature.js").FeatureLike>} Features.
     * @api
     */
    WKB.prototype.readFeatures = function (source, opt_options) {
        var geometries = [];
        var geometry = this.readGeometry(source, opt_options);
        if (this.splitCollection && geometry instanceof GeometryCollection) {
            geometries = geometry.getGeometriesArray();
        }
        else {
            geometries = [geometry];
        }
        return geometries.map(function (geometry) { return new Feature({ geometry: geometry }); });
    };
    /**
     * Read a single geometry from a source.
     *
     * @param {string|ArrayBuffer|ArrayBufferView} source Source.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
     * @return {import("../geom/Geometry.js").default} Geometry.
     * @api
     */
    WKB.prototype.readGeometry = function (source, opt_options) {
        var view = getDataView(source);
        if (!view) {
            return null;
        }
        var reader = new WkbReader(view);
        var geometry = reader.readGeometry();
        this.viewCache_ = view; // cache for internal subsequent call of readProjection()
        var options = this.getReadOptions(source, opt_options);
        this.viewCache_ = null; // release
        return transformGeometryWithOptions(geometry, false, options);
    };
    /**
     * Read the projection from a source.
     *
     * @param {string|ArrayBuffer|ArrayBufferView} source Source.
     * @return {import("../proj/Projection.js").default|undefined} Projection.
     * @api
     */
    WKB.prototype.readProjection = function (source) {
        var view = this.viewCache_ || getDataView(source);
        if (!view) {
            return undefined;
        }
        var reader = new WkbReader(view);
        reader.readWkbHeader();
        return ((reader.getSrid() && getProjection('EPSG:' + reader.getSrid())) ||
            undefined);
    };
    /**
     * Encode a feature in this format.
     *
     * @param {import("../Feature.js").default} feature Feature.
     * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
     * @return {string|ArrayBuffer} Result.
     * @api
     */
    WKB.prototype.writeFeature = function (feature, opt_options) {
        return this.writeGeometry(feature.getGeometry(), opt_options);
    };
    /**
     * Encode an array of features in this format.
     *
     * @param {Array<import("../Feature.js").default>} features Features.
     * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
     * @return {string|ArrayBuffer} Result.
     * @api
     */
    WKB.prototype.writeFeatures = function (features, opt_options) {
        return this.writeGeometry(new GeometryCollection(features.map(function (f) { return f.getGeometry(); })), opt_options);
    };
    /**
     * Write a single geometry in this format.
     *
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
     * @return {string|ArrayBuffer} Result.
     * @api
     */
    WKB.prototype.writeGeometry = function (geometry, opt_options) {
        var options = this.adaptOptions(opt_options);
        var writer = new WkbWriter({
            layout: this.layout_,
            littleEndian: this.littleEndian_,
            ewkb: this.ewkb_,
            nodata: {
                Z: this.nodataZ_,
                M: this.nodataM_,
            },
        });
        // extract SRID from `dataProjection`
        var srid = Number.isInteger(this.srid_) ? Number(this.srid_) : null;
        if (this.srid_ !== false && !Number.isInteger(this.srid_)) {
            var dataProjection = options.dataProjection && getProjection(options.dataProjection);
            if (dataProjection) {
                var code = dataProjection.getCode();
                if (code.indexOf('EPSG:') === 0) {
                    srid = Number(code.substring(5));
                }
            }
        }
        writer.writeGeometry(transformGeometryWithOptions(geometry, true, options), srid);
        var buffer = writer.getBuffer();
        return this.hex_ ? encodeHexString(buffer) : buffer;
    };
    return WKB;
}(FeatureFormat));
/**
 * @param {ArrayBuffer} buffer source buffer
 * @return {string} encoded hex string
 */
function encodeHexString(buffer) {
    var view = new Uint8Array(buffer);
    return Array.from(view.values())
        .map(function (x) { return (x < 16 ? '0' : '') + Number(x).toString(16).toUpperCase(); })
        .join('');
}
/**
 * @param {string} text source text
 * @return {DataView} decoded binary buffer
 */
function decodeHexString(text) {
    var buffer = new Uint8Array(text.length / 2);
    for (var i = 0; i < text.length / 2; i++) {
        buffer[i] = parseInt(text.substr(i * 2, 2), 16);
    }
    return new DataView(buffer.buffer);
}
/**
 * @param {string | ArrayBuffer | ArrayBufferView} source source
 * @return {DataView} data view
 */
function getDataView(source) {
    if (typeof source === 'string') {
        return decodeHexString(source);
    }
    else if (ArrayBuffer.isView(source)) {
        if (source instanceof DataView) {
            return source;
        }
        return new DataView(source.buffer, source.byteOffset, source.byteLength);
    }
    else if (source instanceof ArrayBuffer) {
        return new DataView(source);
    }
    else {
        return null;
    }
}
export default WKB;
//# sourceMappingURL=WKB.js.map