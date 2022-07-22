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
 * @module ol/format/JSONFeature
 */
import FeatureFormat from './Feature.js';
import FormatType from './FormatType.js';
import { abstract } from '../util.js';
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for JSON feature formats.
 *
 * @abstract
 */
var JSONFeature = /** @class */ (function (_super) {
    __extends(JSONFeature, _super);
    function JSONFeature() {
        return _super.call(this) || this;
    }
    /**
     * @return {import("./FormatType.js").default} Format.
     */
    JSONFeature.prototype.getType = function () {
        return FormatType.JSON;
    };
    /**
     * Read a feature.  Only works for a single feature. Use `readFeatures` to
     * read a feature collection.
     *
     * @param {ArrayBuffer|Document|Element|Object|string} source Source.
     * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
     * @return {import("../Feature.js").default} Feature.
     * @api
     */
    JSONFeature.prototype.readFeature = function (source, opt_options) {
        return this.readFeatureFromObject(getObject(source), this.getReadOptions(source, opt_options));
    };
    /**
     * Read all features.  Works with both a single feature and a feature
     * collection.
     *
     * @param {ArrayBuffer|Document|Element|Object|string} source Source.
     * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
     * @return {Array<import("../Feature.js").default>} Features.
     * @api
     */
    JSONFeature.prototype.readFeatures = function (source, opt_options) {
        return this.readFeaturesFromObject(getObject(source), this.getReadOptions(source, opt_options));
    };
    /**
     * @abstract
     * @param {Object} object Object.
     * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
     * @protected
     * @return {import("../Feature.js").default} Feature.
     */
    JSONFeature.prototype.readFeatureFromObject = function (object, opt_options) {
        return abstract();
    };
    /**
     * @abstract
     * @param {Object} object Object.
     * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
     * @protected
     * @return {Array<import("../Feature.js").default>} Features.
     */
    JSONFeature.prototype.readFeaturesFromObject = function (object, opt_options) {
        return abstract();
    };
    /**
     * Read a geometry.
     *
     * @param {ArrayBuffer|Document|Element|Object|string} source Source.
     * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
     * @return {import("../geom/Geometry.js").default} Geometry.
     * @api
     */
    JSONFeature.prototype.readGeometry = function (source, opt_options) {
        return this.readGeometryFromObject(getObject(source), this.getReadOptions(source, opt_options));
    };
    /**
     * @abstract
     * @param {Object} object Object.
     * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
     * @protected
     * @return {import("../geom/Geometry.js").default} Geometry.
     */
    JSONFeature.prototype.readGeometryFromObject = function (object, opt_options) {
        return abstract();
    };
    /**
     * Read the projection.
     *
     * @param {ArrayBuffer|Document|Element|Object|string} source Source.
     * @return {import("../proj/Projection.js").default} Projection.
     * @api
     */
    JSONFeature.prototype.readProjection = function (source) {
        return this.readProjectionFromObject(getObject(source));
    };
    /**
     * @abstract
     * @param {Object} object Object.
     * @protected
     * @return {import("../proj/Projection.js").default} Projection.
     */
    JSONFeature.prototype.readProjectionFromObject = function (object) {
        return abstract();
    };
    /**
     * Encode a feature as string.
     *
     * @param {import("../Feature.js").default} feature Feature.
     * @param {import("./Feature.js").WriteOptions=} opt_options Write options.
     * @return {string} Encoded feature.
     * @api
     */
    JSONFeature.prototype.writeFeature = function (feature, opt_options) {
        return JSON.stringify(this.writeFeatureObject(feature, opt_options));
    };
    /**
     * @abstract
     * @param {import("../Feature.js").default} feature Feature.
     * @param {import("./Feature.js").WriteOptions=} opt_options Write options.
     * @return {Object} Object.
     */
    JSONFeature.prototype.writeFeatureObject = function (feature, opt_options) {
        return abstract();
    };
    /**
     * Encode an array of features as string.
     *
     * @param {Array<import("../Feature.js").default>} features Features.
     * @param {import("./Feature.js").WriteOptions=} opt_options Write options.
     * @return {string} Encoded features.
     * @api
     */
    JSONFeature.prototype.writeFeatures = function (features, opt_options) {
        return JSON.stringify(this.writeFeaturesObject(features, opt_options));
    };
    /**
     * @abstract
     * @param {Array<import("../Feature.js").default>} features Features.
     * @param {import("./Feature.js").WriteOptions=} opt_options Write options.
     * @return {Object} Object.
     */
    JSONFeature.prototype.writeFeaturesObject = function (features, opt_options) {
        return abstract();
    };
    /**
     * Encode a geometry as string.
     *
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {import("./Feature.js").WriteOptions=} opt_options Write options.
     * @return {string} Encoded geometry.
     * @api
     */
    JSONFeature.prototype.writeGeometry = function (geometry, opt_options) {
        return JSON.stringify(this.writeGeometryObject(geometry, opt_options));
    };
    /**
     * @abstract
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {import("./Feature.js").WriteOptions=} opt_options Write options.
     * @return {Object} Object.
     */
    JSONFeature.prototype.writeGeometryObject = function (geometry, opt_options) {
        return abstract();
    };
    return JSONFeature;
}(FeatureFormat));
/**
 * @param {Document|Element|Object|string} source Source.
 * @return {Object} Object.
 */
function getObject(source) {
    if (typeof source === 'string') {
        var object = JSON.parse(source);
        return object ? /** @type {Object} */ (object) : null;
    }
    else if (source !== null) {
        return source;
    }
    else {
        return null;
    }
}
export default JSONFeature;
//# sourceMappingURL=JSONFeature.js.map