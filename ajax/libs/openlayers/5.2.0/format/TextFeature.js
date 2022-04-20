/**
 * @module ol/format/TextFeature
 */
import FeatureFormat from '../format/Feature.js';
import FormatType from '../format/FormatType.js';

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for text feature formats.
 *
 * @abstract
 */
var TextFeature = (function (FeatureFormat) {
  function TextFeature() {
    FeatureFormat.call(this);
  }

  if ( FeatureFormat ) TextFeature.__proto__ = FeatureFormat;
  TextFeature.prototype = Object.create( FeatureFormat && FeatureFormat.prototype );
  TextFeature.prototype.constructor = TextFeature;

  /**
   * @inheritDoc
   */
  TextFeature.prototype.getType = function getType () {
    return FormatType.TEXT;
  };

  /**
   * Read the feature from the source.
   *
   * @param {Document|Node|Object|string} source Source.
   * @param {module:ol/format/Feature~ReadOptions=} opt_options Read options.
   * @return {module:ol/Feature} Feature.
   * @api
   */
  TextFeature.prototype.readFeature = function readFeature (source, opt_options) {
    return this.readFeatureFromText(getText(source), this.adaptOptions(opt_options));
  };

  /**
   * @abstract
   * @param {string} text Text.
   * @param {module:ol/format/Feature~ReadOptions=} opt_options Read options.
   * @protected
   * @return {module:ol/Feature} Feature.
   */
  TextFeature.prototype.readFeatureFromText = function readFeatureFromText (text, opt_options) {};

  /**
   * Read the features from the source.
   *
   * @param {Document|Node|Object|string} source Source.
   * @param {module:ol/format/Feature~ReadOptions=} opt_options Read options.
   * @return {Array<module:ol/Feature>} Features.
   * @api
   */
  TextFeature.prototype.readFeatures = function readFeatures (source, opt_options) {
    return this.readFeaturesFromText(getText(source), this.adaptOptions(opt_options));
  };

  /**
   * @abstract
   * @param {string} text Text.
   * @param {module:ol/format/Feature~ReadOptions=} opt_options Read options.
   * @protected
   * @return {Array<module:ol/Feature>} Features.
   */
  TextFeature.prototype.readFeaturesFromText = function readFeaturesFromText (text, opt_options) {};

  /**
   * Read the geometry from the source.
   *
   * @param {Document|Node|Object|string} source Source.
   * @param {module:ol/format/Feature~ReadOptions=} opt_options Read options.
   * @return {module:ol/geom/Geometry} Geometry.
   * @api
   */
  TextFeature.prototype.readGeometry = function readGeometry (source, opt_options) {
    return this.readGeometryFromText(getText(source), this.adaptOptions(opt_options));
  };

  /**
   * @abstract
   * @param {string} text Text.
   * @param {module:ol/format/Feature~ReadOptions=} opt_options Read options.
   * @protected
   * @return {module:ol/geom/Geometry} Geometry.
   */
  TextFeature.prototype.readGeometryFromText = function readGeometryFromText (text, opt_options) {};

  /**
   * Read the projection from the source.
   *
   * @function
   * @param {Document|Node|Object|string} source Source.
   * @return {module:ol/proj/Projection} Projection.
   * @api
   */
  TextFeature.prototype.readProjection = function readProjection (source) {
    return this.readProjectionFromText(getText(source));
  };

  /**
   * @param {string} text Text.
   * @protected
   * @return {module:ol/proj/Projection} Projection.
   */
  TextFeature.prototype.readProjectionFromText = function readProjectionFromText (text) {
    return this.dataProjection;
  };

  /**
   * Encode a feature as a string.
   *
   * @function
   * @param {module:ol/Feature} feature Feature.
   * @param {module:ol/format/Feature~WriteOptions=} opt_options Write options.
   * @return {string} Encoded feature.
   * @api
   */
  TextFeature.prototype.writeFeature = function writeFeature (feature, opt_options) {
    return this.writeFeatureText(feature, this.adaptOptions(opt_options));
  };

  /**
   * @abstract
   * @param {module:ol/Feature} feature Features.
   * @param {module:ol/format/Feature~WriteOptions=} opt_options Write options.
   * @protected
   * @return {string} Text.
   */
  TextFeature.prototype.writeFeatureText = function writeFeatureText (feature, opt_options) {};

  /**
   * Encode an array of features as string.
   *
   * @param {Array<module:ol/Feature>} features Features.
   * @param {module:ol/format/Feature~WriteOptions=} opt_options Write options.
   * @return {string} Encoded features.
   * @api
   */
  TextFeature.prototype.writeFeatures = function writeFeatures (features, opt_options) {
    return this.writeFeaturesText(features, this.adaptOptions(opt_options));
  };

  /**
   * @abstract
   * @param {Array<module:ol/Feature>} features Features.
   * @param {module:ol/format/Feature~WriteOptions=} opt_options Write options.
   * @protected
   * @return {string} Text.
   */
  TextFeature.prototype.writeFeaturesText = function writeFeaturesText (features, opt_options) {};

  /**
   * Write a single geometry.
   *
   * @function
   * @param {module:ol/geom/Geometry} geometry Geometry.
   * @param {module:ol/format/Feature~WriteOptions=} opt_options Write options.
   * @return {string} Geometry.
   * @api
   */
  TextFeature.prototype.writeGeometry = function writeGeometry (geometry, opt_options) {
    return this.writeGeometryText(geometry, this.adaptOptions(opt_options));
  };

  /**
   * @abstract
   * @param {module:ol/geom/Geometry} geometry Geometry.
   * @param {module:ol/format/Feature~WriteOptions=} opt_options Write options.
   * @protected
   * @return {string} Text.
   */
  TextFeature.prototype.writeGeometryText = function writeGeometryText (geometry, opt_options) {};

  return TextFeature;
}(FeatureFormat));


/**
 * @param {Document|Node|Object|string} source Source.
 * @return {string} Text.
 */
function getText(source) {
  if (typeof source === 'string') {
    return source;
  } else {
    return '';
  }
}


export default TextFeature;

//# sourceMappingURL=TextFeature.js.map