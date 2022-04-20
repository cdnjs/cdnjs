/**
 * @module ol/format/JSONFeature
 */
import FeatureFormat from '../format/Feature.js';
import FormatType from '../format/FormatType.js';

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for JSON feature formats.
 *
 * @abstract
 */
var JSONFeature = (function (FeatureFormat) {
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
   * @param {module:ol/format/Feature~ReadOptions=} opt_options Read options.
   * @return {module:ol/Feature} Feature.
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
   * @param {module:ol/format/Feature~ReadOptions=} opt_options Read options.
   * @return {Array<module:ol/Feature>} Features.
   * @api
   */
  JSONFeature.prototype.readFeatures = function readFeatures (source, opt_options) {
    return this.readFeaturesFromObject(
      getObject(source), this.getReadOptions(source, opt_options));
  };

  /**
   * @abstract
   * @param {Object} object Object.
   * @param {module:ol/format/Feature~ReadOptions=} opt_options Read options.
   * @protected
   * @return {module:ol/Feature} Feature.
   */
  JSONFeature.prototype.readFeatureFromObject = function readFeatureFromObject (object, opt_options) {};

  /**
   * @abstract
   * @param {Object} object Object.
   * @param {module:ol/format/Feature~ReadOptions=} opt_options Read options.
   * @protected
   * @return {Array<module:ol/Feature>} Features.
   */
  JSONFeature.prototype.readFeaturesFromObject = function readFeaturesFromObject (object, opt_options) {};

  /**
   * Read a geometry.
   *
   * @param {ArrayBuffer|Document|Node|Object|string} source Source.
   * @param {module:ol/format/Feature~ReadOptions=} opt_options Read options.
   * @return {module:ol/geom/Geometry} Geometry.
   * @api
   */
  JSONFeature.prototype.readGeometry = function readGeometry (source, opt_options) {
    return this.readGeometryFromObject(
      getObject(source), this.getReadOptions(source, opt_options));
  };

  /**
   * @abstract
   * @param {Object} object Object.
   * @param {module:ol/format/Feature~ReadOptions=} opt_options Read options.
   * @protected
   * @return {module:ol/geom/Geometry} Geometry.
   */
  JSONFeature.prototype.readGeometryFromObject = function readGeometryFromObject (object, opt_options) {};

  /**
   * Read the projection.
   *
   * @param {ArrayBuffer|Document|Node|Object|string} source Source.
   * @return {module:ol/proj/Projection} Projection.
   * @api
   */
  JSONFeature.prototype.readProjection = function readProjection (source) {
    return this.readProjectionFromObject(getObject(source));
  };

  /**
   * @abstract
   * @param {Object} object Object.
   * @protected
   * @return {module:ol/proj/Projection} Projection.
   */
  JSONFeature.prototype.readProjectionFromObject = function readProjectionFromObject (object) {};

  /**
   * Encode a feature as string.
   *
   * @param {module:ol/Feature} feature Feature.
   * @param {module:ol/format/Feature~WriteOptions=} opt_options Write options.
   * @return {string} Encoded feature.
   * @api
   */
  JSONFeature.prototype.writeFeature = function writeFeature (feature, opt_options) {
    return JSON.stringify(this.writeFeatureObject(feature, opt_options));
  };

  /**
   * @abstract
   * @param {module:ol/Feature} feature Feature.
   * @param {module:ol/format/Feature~WriteOptions=} opt_options Write options.
   * @return {Object} Object.
   */
  JSONFeature.prototype.writeFeatureObject = function writeFeatureObject (feature, opt_options) {};

  /**
   * Encode an array of features as string.
   *
   * @param {Array<module:ol/Feature>} features Features.
   * @param {module:ol/format/Feature~WriteOptions=} opt_options Write options.
   * @return {string} Encoded features.
   * @api
   */
  JSONFeature.prototype.writeFeatures = function writeFeatures (features, opt_options) {
    return JSON.stringify(this.writeFeaturesObject(features, opt_options));
  };

  /**
   * @abstract
   * @param {Array<module:ol/Feature>} features Features.
   * @param {module:ol/format/Feature~WriteOptions=} opt_options Write options.
   * @return {Object} Object.
   */
  JSONFeature.prototype.writeFeaturesObject = function writeFeaturesObject (features, opt_options) {};

  /**
   * Encode a geometry as string.
   *
   * @param {module:ol/geom/Geometry} geometry Geometry.
   * @param {module:ol/format/Feature~WriteOptions=} opt_options Write options.
   * @return {string} Encoded geometry.
   * @api
   */
  JSONFeature.prototype.writeGeometry = function writeGeometry (geometry, opt_options) {
    return JSON.stringify(this.writeGeometryObject(geometry, opt_options));
  };

  /**
   * @abstract
   * @param {module:ol/geom/Geometry} geometry Geometry.
   * @param {module:ol/format/Feature~WriteOptions=} opt_options Write options.
   * @return {Object} Object.
   */
  JSONFeature.prototype.writeGeometryObject = function writeGeometryObject (geometry, opt_options) {};

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