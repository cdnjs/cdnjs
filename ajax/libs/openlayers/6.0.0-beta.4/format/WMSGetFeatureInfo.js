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
 * @module ol/format/WMSGetFeatureInfo
 */
import { extend, includes } from '../array.js';
import GML2 from './GML2.js';
import XMLFeature from './XMLFeature.js';
import { assign } from '../obj.js';
import { makeArrayPusher, makeStructureNS, pushParseAndPop } from '../xml.js';
/**
 * @typedef {Object} Options
 * @property {Array<string>} [layers] If set, only features of the given layers will be returned by the format when read.
 */
/**
 * @const
 * @type {string}
 */
var featureIdentifier = '_feature';
/**
 * @const
 * @type {string}
 */
var layerIdentifier = '_layer';
/**
 * @classdesc
 * Format for reading WMSGetFeatureInfo format. It uses
 * {@link module:ol/format/GML2~GML2} to read features.
 *
 * @api
 */
var WMSGetFeatureInfo = /** @class */ (function (_super) {
    __extends(WMSGetFeatureInfo, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function WMSGetFeatureInfo(opt_options) {
        var _this = _super.call(this) || this;
        var options = opt_options ? opt_options : {};
        /**
         * @private
         * @type {string}
         */
        _this.featureNS_ = 'http://mapserver.gis.umn.edu/mapserver';
        /**
         * @private
         * @type {GML2}
         */
        _this.gmlFormat_ = new GML2();
        /**
         * @private
         * @type {Array<string>}
         */
        _this.layers_ = options.layers ? options.layers : null;
        return _this;
    }
    /**
     * @return {Array<string>} layers
     */
    WMSGetFeatureInfo.prototype.getLayers = function () {
        return this.layers_;
    };
    /**
     * @param {Array<string>} layers Layers to parse.
     */
    WMSGetFeatureInfo.prototype.setLayers = function (layers) {
        this.layers_ = layers;
    };
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {Array<import("../Feature.js").default>} Features.
     * @private
     */
    WMSGetFeatureInfo.prototype.readFeatures_ = function (node, objectStack) {
        node.setAttribute('namespaceURI', this.featureNS_);
        var localName = node.localName;
        /** @type {Array<import("../Feature.js").default>} */
        var features = [];
        if (node.childNodes.length === 0) {
            return features;
        }
        if (localName == 'msGMLOutput') {
            for (var i = 0, ii = node.childNodes.length; i < ii; i++) {
                var layer = node.childNodes[i];
                if (layer.nodeType !== Node.ELEMENT_NODE) {
                    continue;
                }
                var layerElement = /** @type {Element} */ (layer);
                var context = objectStack[0];
                var toRemove = layerIdentifier;
                var layerName = layerElement.localName.replace(toRemove, '');
                if (this.layers_ && !includes(this.layers_, layerName)) {
                    continue;
                }
                var featureType = layerName +
                    featureIdentifier;
                context['featureType'] = featureType;
                context['featureNS'] = this.featureNS_;
                /** @type {Object<string, import("../xml.js").Parser>} */
                var parsers = {};
                parsers[featureType] = makeArrayPusher(this.gmlFormat_.readFeatureElement, this.gmlFormat_);
                var parsersNS = makeStructureNS([context['featureNS'], null], parsers);
                layerElement.setAttribute('namespaceURI', this.featureNS_);
                var layerFeatures = pushParseAndPop([], parsersNS, layerElement, objectStack, this.gmlFormat_);
                if (layerFeatures) {
                    extend(features, layerFeatures);
                }
            }
        }
        if (localName == 'FeatureCollection') {
            var gmlFeatures = pushParseAndPop([], this.gmlFormat_.FEATURE_COLLECTION_PARSERS, node, [{}], this.gmlFormat_);
            if (gmlFeatures) {
                features = gmlFeatures;
            }
        }
        return features;
    };
    /**
     * @inheritDoc
     */
    WMSGetFeatureInfo.prototype.readFeaturesFromNode = function (node, opt_options) {
        var options = {};
        if (opt_options) {
            assign(options, this.getReadOptions(node, opt_options));
        }
        return this.readFeatures_(node, [options]);
    };
    return WMSGetFeatureInfo;
}(XMLFeature));
export default WMSGetFeatureInfo;
//# sourceMappingURL=WMSGetFeatureInfo.js.map