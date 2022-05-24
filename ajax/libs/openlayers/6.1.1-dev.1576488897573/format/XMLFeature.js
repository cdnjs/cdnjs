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
 * @module ol/format/XMLFeature
 */
import { abstract } from '../util.js';
import { extend } from '../array.js';
import FeatureFormat from '../format/Feature.js';
import FormatType from '../format/FormatType.js';
import { isDocument, parse } from '../xml.js';
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for XML feature formats.
 *
 * @abstract
 */
var XMLFeature = /** @class */ (function (_super) {
    __extends(XMLFeature, _super);
    function XMLFeature() {
        var _this = _super.call(this) || this;
        /**
         * @type {XMLSerializer}
         * @private
         */
        _this.xmlSerializer_ = new XMLSerializer();
        return _this;
    }
    /**
     * @inheritDoc
     */
    XMLFeature.prototype.getType = function () {
        return FormatType.XML;
    };
    /**
     * Read a single feature.
     *
     * @param {Document|Node|Object|string} source Source.
     * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
     * @return {import("../Feature.js").default} Feature.
     * @api
     */
    XMLFeature.prototype.readFeature = function (source, opt_options) {
        if (!source) {
            return null;
        }
        else if (typeof source === 'string') {
            var doc = parse(source);
            return this.readFeatureFromDocument(doc, opt_options);
        }
        else if (isDocument(source)) {
            return this.readFeatureFromDocument(/** @type {Document} */ (source), opt_options);
        }
        else {
            return this.readFeatureFromNode(/** @type {Node} */ (source), opt_options);
        }
    };
    /**
     * @param {Document} doc Document.
     * @param {import("./Feature.js").ReadOptions=} opt_options Options.
     * @return {import("../Feature.js").default} Feature.
     */
    XMLFeature.prototype.readFeatureFromDocument = function (doc, opt_options) {
        var features = this.readFeaturesFromDocument(doc, opt_options);
        if (features.length > 0) {
            return features[0];
        }
        else {
            return null;
        }
    };
    /**
     * @param {Node} node Node.
     * @param {import("./Feature.js").ReadOptions=} opt_options Options.
     * @return {import("../Feature.js").default} Feature.
     */
    XMLFeature.prototype.readFeatureFromNode = function (node, opt_options) {
        return null; // not implemented
    };
    /**
     * Read all features from a feature collection.
     *
     * @param {Document|Node|Object|string} source Source.
     * @param {import("./Feature.js").ReadOptions=} opt_options Options.
     * @return {Array<import("../Feature.js").default>} Features.
     * @api
     */
    XMLFeature.prototype.readFeatures = function (source, opt_options) {
        if (!source) {
            return [];
        }
        else if (typeof source === 'string') {
            var doc = parse(source);
            return this.readFeaturesFromDocument(doc, opt_options);
        }
        else if (isDocument(source)) {
            return this.readFeaturesFromDocument(
            /** @type {Document} */ (source), opt_options);
        }
        else {
            return this.readFeaturesFromNode(/** @type {Node} */ (source), opt_options);
        }
    };
    /**
     * @param {Document} doc Document.
     * @param {import("./Feature.js").ReadOptions=} opt_options Options.
     * @protected
     * @return {Array<import("../Feature.js").default>} Features.
     */
    XMLFeature.prototype.readFeaturesFromDocument = function (doc, opt_options) {
        /** @type {Array<import("../Feature.js").default>} */
        var features = [];
        for (var n = /** @type {Node} */ (doc.firstChild); n; n = n.nextSibling) {
            if (n.nodeType == Node.ELEMENT_NODE) {
                extend(features, this.readFeaturesFromNode(n, opt_options));
            }
        }
        return features;
    };
    /**
     * @abstract
     * @param {Node} node Node.
     * @param {import("./Feature.js").ReadOptions=} opt_options Options.
     * @protected
     * @return {Array<import("../Feature.js").default>} Features.
     */
    XMLFeature.prototype.readFeaturesFromNode = function (node, opt_options) {
        return abstract();
    };
    /**
     * @inheritDoc
     */
    XMLFeature.prototype.readGeometry = function (source, opt_options) {
        if (!source) {
            return null;
        }
        else if (typeof source === 'string') {
            var doc = parse(source);
            return this.readGeometryFromDocument(doc, opt_options);
        }
        else if (isDocument(source)) {
            return this.readGeometryFromDocument(
            /** @type {Document} */ (source), opt_options);
        }
        else {
            return this.readGeometryFromNode(/** @type {Node} */ (source), opt_options);
        }
    };
    /**
     * @param {Document} doc Document.
     * @param {import("./Feature.js").ReadOptions=} opt_options Options.
     * @protected
     * @return {import("../geom/Geometry.js").default} Geometry.
     */
    XMLFeature.prototype.readGeometryFromDocument = function (doc, opt_options) {
        return null; // not implemented
    };
    /**
     * @param {Node} node Node.
     * @param {import("./Feature.js").ReadOptions=} opt_options Options.
     * @protected
     * @return {import("../geom/Geometry.js").default} Geometry.
     */
    XMLFeature.prototype.readGeometryFromNode = function (node, opt_options) {
        return null; // not implemented
    };
    /**
     * Read the projection from the source.
     *
     * @param {Document|Node|Object|string} source Source.
     * @return {import("../proj/Projection.js").default} Projection.
     * @api
     */
    XMLFeature.prototype.readProjection = function (source) {
        if (!source) {
            return null;
        }
        else if (typeof source === 'string') {
            var doc = parse(source);
            return this.readProjectionFromDocument(doc);
        }
        else if (isDocument(source)) {
            return this.readProjectionFromDocument(/** @type {Document} */ (source));
        }
        else {
            return this.readProjectionFromNode(/** @type {Node} */ (source));
        }
    };
    /**
     * @param {Document} doc Document.
     * @protected
     * @return {import("../proj/Projection.js").default} Projection.
     */
    XMLFeature.prototype.readProjectionFromDocument = function (doc) {
        return this.dataProjection;
    };
    /**
     * @param {Node} node Node.
     * @protected
     * @return {import("../proj/Projection.js").default} Projection.
     */
    XMLFeature.prototype.readProjectionFromNode = function (node) {
        return this.dataProjection;
    };
    /**
     * @inheritDoc
     */
    XMLFeature.prototype.writeFeature = function (feature, opt_options) {
        var node = this.writeFeatureNode(feature, opt_options);
        return this.xmlSerializer_.serializeToString(node);
    };
    /**
     * @param {import("../Feature.js").default} feature Feature.
     * @param {import("./Feature.js").WriteOptions=} opt_options Options.
     * @protected
     * @return {Node} Node.
     */
    XMLFeature.prototype.writeFeatureNode = function (feature, opt_options) {
        return null; // not implemented
    };
    /**
     * Encode an array of features as string.
     *
     * @param {Array<import("../Feature.js").default>} features Features.
     * @param {import("./Feature.js").WriteOptions=} opt_options Write options.
     * @return {string} Result.
     * @api
     */
    XMLFeature.prototype.writeFeatures = function (features, opt_options) {
        var node = this.writeFeaturesNode(features, opt_options);
        return this.xmlSerializer_.serializeToString(node);
    };
    /**
     * @param {Array<import("../Feature.js").default>} features Features.
     * @param {import("./Feature.js").WriteOptions=} opt_options Options.
     * @return {Node} Node.
     */
    XMLFeature.prototype.writeFeaturesNode = function (features, opt_options) {
        return null; // not implemented
    };
    /**
     * @inheritDoc
     */
    XMLFeature.prototype.writeGeometry = function (geometry, opt_options) {
        var node = this.writeGeometryNode(geometry, opt_options);
        return this.xmlSerializer_.serializeToString(node);
    };
    /**
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {import("./Feature.js").WriteOptions=} opt_options Options.
     * @return {Node} Node.
     */
    XMLFeature.prototype.writeGeometryNode = function (geometry, opt_options) {
        return null; // not implemented
    };
    return XMLFeature;
}(FeatureFormat));
export default XMLFeature;
//# sourceMappingURL=XMLFeature.js.map