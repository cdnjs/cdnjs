/**
 * @module ol/format/JSONFeature
 */
import {abstract} from '../util.js';
import FeatureFormat from './Feature.js';
import FormatType from './FormatType.js';

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for JSON feature formats.
 *
 * @abstract
 */
var JSONFeature = /*@__PURE__*/(function (FeatureFormat) {
  function JSONFeature() {
    FeatureFormat.call(this);
  }

  if ( FeatureFormat ) JSONFeature.__proto__ = FeatureFormat;
  JSONFeature.prototype = Object.create( FeatureFormat && FeatureFormat.prototype );
  JSONFeature.prototype.constructor = JSONFeature;

  /**
   * @inheritDoc
   */
  JSONFeature.prototype.getType = function getType () {
    return FormatType.JSON;
  };

  /**
   * Read a feature.  Only works for a single feature. Use `readFeatures` to
   * read a feature collection.
   *
   * @param {ArrayBuffer|Document|Node|Object|string} source Source.
   * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
   * @return {import("../Feature.js").default} Feature.
   * @api
   */
  JSONFeature.prototype.readFeature = function readFeature (source, opt_options) {
    return this.readFeatureFromObject(
      getObject(source), this.getReadOptions(source, opt_options));
  };

  /**
   * Read all features.  Works with both a single feature and a feature
   * collection.
   *
   * @param {ArrayBuffer|Document|Node|Object|string} source Source.
   * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
   * @return {Array<import("../Feature.js").default>} Features.
   * @api
   */
  JSONFeature.prototype.readFeatures = function readFeatures (source, opt_options) {
    return this.readFeaturesFromObject(
      getObject(source), this.getReadOptions(source, opt_options));
  };

  /**
   * @abstract
   * @param {Object} object Object.
   * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
   * @protected
   * @return {import("../Feature.js").default} Feature.
   */
  JSONFeature.prototype.readFeatureFromObject = function readFeatureFromObject (object, opt_options) {
    return abstract();
  };

  /**
   * @abstract
   * @param {Object} object Object.
   * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
   * @protected
   * @return {Array<import("../Feature.js").default>} Features.
   */
  JSONFeature.prototype.readFeaturesFromObject = function readFeaturesFromObject (object, opt_options) {
    return abstract();
  };

  /**
   * Read a geometry.
   *
   * @param {ArrayBuffer|Document|Node|Object|string} source Source.
   * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
   * @return {import("../geom/Geometry.js").default} Geometry.
   * @api
   */
  JSONFeature.prototype.readGeometry = function readGeometry (source, opt_options) {
    return this.readGeometryFromObject(
      getObject(source), this.getReadOptions(source, opt_options));
  };

  /**
   * @abstract
   * @param {Object} object Object.
   * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
   * @protected
   * @return {import("../geom/Geometry.js").default} Geometry.
   */
  JSONFeature.prototype.readGeometryFromObject = function readGeometryFromObject (object, opt_options) {
    return abstract();
  };

  /**
   * Read the projection.
   *
   * @param {ArrayBuffer|Document|Node|Object|string} source Source.
   * @return {import("../proj/Projection.js").default} Projection.
   * @api
   */
  JSONFeature.prototype.readProjection = function readProjection (source) {
    return this.readProjectionFromObject(getObject(source));
  };

  /**
   * @abstract
   * @param {Object} object Object.
   * @protected
   * @return {import("../proj/Projection.js").default} Projection.
   */
  JSONFeature.prototype.readProjectionFromObject = function readProjectionFromObject (object) {
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
  JSONFeature.prototype.writeFeature = function writeFeature (feature, opt_options) {
    return JSON.stringify(this.writeFeatureObject(feature, opt_options));
  };

  /**
   * @abstract
   * @param {import("../Feature.js").default} feature Feature.
   * @param {import("./Feature.js").WriteOptions=} opt_options Write options.
   * @return {Object} Object.
   */
  JSONFeature.prototype.writeFeatureObject = function writeFeatureObject (feature, opt_options) {
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
  JSONFeature.prototype.writeFeatures = function writeFeatures (features, opt_options) {
    return JSON.stringify(this.writeFeaturesObject(features, opt_options));
  };

  /**
   * @abstract
   * @param {Array<import("../Feature.js").default>} features Features.
   * @param {import("./Feature.js").WriteOptions=} opt_options Write options.
   * @return {Object} Object.
   */
  JSONFeature.prototype.writeFeaturesObject = function writeFeaturesObject (features, opt_options) {
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
  JSONFeature.prototype.writeGeometry = function writeGeometry (geometry, opt_options) {
    return JSON.stringify(this.writeGeometryObject(geometry, opt_options));
  };

  /**
   * @abstract
   * @param {import("../geom/Geometry.js").default} geometry Geometry.
   * @param {import("./Feature.js").WriteOptions=} opt_options Write options.
   * @return {Object} Object.
   */
  JSONFeature.prototype.writeGeometryObject = function writeGeometryObject (geometry, opt_options) {
    return abstract();
  };

  return JSONFeature;
}(FeatureFormat));


/**
 * @param {Document|Node|Object|string} source Source.
 * @return {Object} Object.
 */
function getObject(source) {
  if (typeof source === 'string') {
    var object = JSON.parse(source);
    return object ? /** @type {Object} */ (object) : null;
  } else if (source !== null) {
    return source;
  } else {
    return null;
  }
}


export default JSONFeature;

//# sourceMappingURL=JSONFeature.js.map