/**
 * @module ol/format/WMSGetFeatureInfo
 */
import {extend, includes} from '../array.js';
import GML2 from '../format/GML2.js';
import XMLFeature from '../format/XMLFeature.js';
import {assign} from '../obj.js';
import {makeArrayPusher, makeStructureNS, pushParseAndPop} from '../xml.js';


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
var WMSGetFeatureInfo = (function (XMLFeature) {
  function WMSGetFeatureInfo(opt_options) {
    XMLFeature.call(this);

    var options = opt_options ? opt_options : {};

    /**
     * @private
     * @type {string}
     */
    this.featureNS_ = 'http://mapserver.gis.umn.edu/mapserver';


    /**
     * @private
     * @type {module:ol/format/GML2}
     */
    this.gmlFormat_ = new GML2();


    /**
     * @private
     * @type {Array<string>}
     */
    this.layers_ = options.layers ? options.layers : null;
  }

  if ( XMLFeature ) WMSGetFeatureInfo.__proto__ = XMLFeature;
  WMSGetFeatureInfo.prototype = Object.create( XMLFeature && XMLFeature.prototype );
  WMSGetFeatureInfo.prototype.constructor = WMSGetFeatureInfo;

  /**
   * @return {Array<string>} layers
   */
  WMSGetFeatureInfo.prototype.getLayers = function getLayers () {
    return this.layers_;
  };

  /**
   * @param {Array<string>} layers Layers to parse.
   */
  WMSGetFeatureInfo.prototype.setLayers = function setLayers (layers) {
    this.layers_ = layers;
  };

  /**
   * @param {Node} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {Array<module:ol/Feature>} Features.
   * @private
   */
  WMSGetFeatureInfo.prototype.readFeatures_ = function readFeatures_ (node, objectStack) {
    var this$1 = this;

    node.setAttribute('namespaceURI', this.featureNS_);
    var localName = node.localName;
    /** @type {Array<module:ol/Feature>} */
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
        var context = objectStack[0];

        var toRemove = layerIdentifier;
        var layerName = layer.localName.replace(toRemove, '');

        if (this$1.layers_ && !includes(this$1.layers_, layerName)) {
          continue;
        }

        var featureType = layerName +
            featureIdentifier;

        context['featureType'] = featureType;
        context['featureNS'] = this$1.featureNS_;

        var parsers = {};
        parsers[featureType] = makeArrayPusher(
          this$1.gmlFormat_.readFeatureElement, this$1.gmlFormat_);
        var parsersNS = makeStructureNS(
          [context['featureNS'], null], parsers);
        layer.setAttribute('namespaceURI', this$1.featureNS_);
        var layerFeatures = pushParseAndPop(
          [], parsersNS, layer, objectStack, this$1.gmlFormat_);
        if (layerFeatures) {
          extend(features, layerFeatures);
        }
      }
    }
    if (localName == 'FeatureCollection') {
      var gmlFeatures = pushParseAndPop([],
        this.gmlFormat_.FEATURE_COLLECTION_PARSERS, node,
        [{}], this.gmlFormat_);
      if (gmlFeatures) {
        features = gmlFeatures;
      }
    }
    return features;
  };

  /**
   * @inheritDoc
   */
  WMSGetFeatureInfo.prototype.readFeaturesFromNode = function readFeaturesFromNode (node, opt_options) {
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