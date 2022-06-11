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
 * @module ol/format/TextFeature
 */
import { abstract } from '../util.js';
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
var TextFeature = /** @class */ (function (_super) {
    __extends(TextFeature, _super);
    function TextFeature() {
        return _super.call(this) || this;
    }
    /**
     * @inheritDoc
     */
    TextFeature.prototype.getType = function () {
        return FormatType.TEXT;
    };
    /**
     * Read the feature from the source.
     *
     * @param {Document|Node|Object|string} source Source.
     * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
     * @return {import("../Feature.js").default} Feature.
     * @api
     */
    TextFeature.prototype.readFeature = function (source, opt_options) {
        return this.readFeatureFromText(getText(source), this.adaptOptions(opt_options));
    };
    /**
     * @abstract
     * @param {string} text Text.
     * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
     * @protected
     * @return {import("../Feature.js").default} Feature.
     */
    TextFeature.prototype.readFeatureFromText = function (text, opt_options) {
        return abstract();
    };
    /**
     * Read the features from the source.
     *
     * @param {Document|Node|Object|string} source Source.
     * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
     * @return {Array<import("../Feature.js").default>} Features.
     * @api
     */
    TextFeature.prototype.readFeatures = function (source, opt_options) {
        return this.readFeaturesFromText(getText(source), this.adaptOptions(opt_options));
    };
    /**
     * @abstract
     * @param {string} text Text.
     * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
     * @protected
     * @return {Array<import("../Feature.js").default>} Features.
     */
    TextFeature.prototype.readFeaturesFromText = function (text, opt_options) {
        return abstract();
    };
    /**
     * Read the geometry from the source.
     *
     * @param {Document|Node|Object|string} source Source.
     * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
     * @return {import("../geom/Geometry.js").default} Geometry.
     * @api
     */
    TextFeature.prototype.readGeometry = function (source, opt_options) {
        return this.readGeometryFromText(getText(source), this.adaptOptions(opt_options));
    };
    /**
     * @abstract
     * @param {string} text Text.
     * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
     * @protected
     * @return {import("../geom/Geometry.js").default} Geometry.
     */
    TextFeature.prototype.readGeometryFromText = function (text, opt_options) {
        return abstract();
    };
    /**
     * Read the projection from the source.
     *
     * @param {Document|Node|Object|string} source Source.
     * @return {import("../proj/Projection.js").default} Projection.
     * @api
     */
    TextFeature.prototype.readProjection = function (source) {
        return this.readProjectionFromText(getText(source));
    };
    /**
     * @param {string} text Text.
     * @protected
     * @return {import("../proj/Projection.js").default} Projection.
     */
    TextFeature.prototype.readProjectionFromText = function (text) {
        return this.dataProjection;
    };
    /**
     * Encode a feature as a string.
     *
     * @param {import("../Feature.js").default} feature Feature.
     * @param {import("./Feature.js").WriteOptions=} opt_options Write options.
     * @return {string} Encoded feature.
     * @api
     */
    TextFeature.prototype.writeFeature = function (feature, opt_options) {
        return this.writeFeatureText(feature, this.adaptOptions(opt_options));
    };
    /**
     * @abstract
     * @param {import("../Feature.js").default} feature Features.
     * @param {import("./Feature.js").WriteOptions=} opt_options Write options.
     * @protected
     * @return {string} Text.
     */
    TextFeature.prototype.writeFeatureText = function (feature, opt_options) {
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
    TextFeature.prototype.writeFeatures = function (features, opt_options) {
        return this.writeFeaturesText(features, this.adaptOptions(opt_options));
    };
    /**
     * @abstract
     * @param {Array<import("../Feature.js").default>} features Features.
     * @param {import("./Feature.js").WriteOptions=} opt_options Write options.
     * @protected
     * @return {string} Text.
     */
    TextFeature.prototype.writeFeaturesText = function (features, opt_options) {
        return abstract();
    };
    /**
     * Write a single geometry.
     *
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {import("./Feature.js").WriteOptions=} opt_options Write options.
     * @return {string} Geometry.
     * @api
     */
    TextFeature.prototype.writeGeometry = function (geometry, opt_options) {
        return this.writeGeometryText(geometry, this.adaptOptions(opt_options));
    };
    /**
     * @abstract
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {import("./Feature.js").WriteOptions=} opt_options Write options.
     * @protected
     * @return {string} Text.
     */
    TextFeature.prototype.writeGeometryText = function (geometry, opt_options) {
        return abstract();
    };
    return TextFeature;
}(FeatureFormat));
/**
 * @param {Document|Node|Object|string} source Source.
 * @return {string} Text.
 */
function getText(source) {
    if (typeof source === 'string') {
        return source;
    }
    else {
        return '';
    }
}
export default TextFeature;
//# sourceMappingURL=TextFeature.js.map