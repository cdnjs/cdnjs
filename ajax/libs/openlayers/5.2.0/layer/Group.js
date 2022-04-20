/**
 * @module ol/layer/Group
 */
import {getUid} from '../util.js';
import Collection from '../Collection.js';
import CollectionEventType from '../CollectionEventType.js';
import {getChangeEventType} from '../Object.js';
import ObjectEventType from '../ObjectEventType.js';
import {assert} from '../asserts.js';
import {listen, unlistenByKey} from '../events.js';
import EventType from '../events/EventType.js';
import {getIntersection} from '../extent.js';
import BaseLayer from '../layer/Base.js';
import {assign, clear} from '../obj.js';
import SourceState from '../source/State.js';


/**
 * @typedef {Object} Options
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {module:ol/extent~Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex=0] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {Array<module:ol/layer/Base>|module:ol/Collection<module:ol/layer/Base>} [layers] Child layers.
 */


/**
 * @enum {string}
 * @private
 */
var Property = {
  LAYERS: 'layers'
};


/**
 * @classdesc
 * A {@link module:ol/Collection~Collection} of layers that are handled together.
 *
 * A generic `change` event is triggered when the group/Collection changes.
 *
 * @api
 */
var LayerGroup = (function (BaseLayer) {
  function LayerGroup(opt_options) {

    var options = opt_options || {};
    var baseOptions = /** @type {module:ol/layer/Group~Options} */ (assign({}, options));
    delete baseOptions.layers;

    var layers = options.layers;

    BaseLayer.call(this, baseOptions);

    /**
     * @private
     * @type {Array<module:ol/events~EventsKey>}
     */
    this.layersListenerKeys_ = [];

    /**
     * @private
     * @type {Object<string, Array<module:ol/events~EventsKey>>}
     */
    this.listenerKeys_ = {};

    listen(this,
      getChangeEventType(Property.LAYERS),
      this.handleLayersChanged_, this);

    if (layers) {
      if (Array.isArray(layers)) {
        layers = new Collection(layers.slice(), {unique: true});
      } else {
        assert(layers instanceof Collection,
          43); // Expected `layers` to be an array or a `Collection`
        layers = layers;
      }
    } else {
      layers = new Collection(undefined, {unique: true});
    }

    this.setLayers(layers);

  }

  if ( BaseLayer ) LayerGroup.__proto__ = BaseLayer;
  LayerGroup.prototype = Object.create( BaseLayer && BaseLayer.prototype );
  LayerGroup.prototype.constructor = LayerGroup;

  /**
   * @private
   */
  LayerGroup.prototype.handleLayerChange_ = function handleLayerChange_ () {
    this.changed();
  };

  /**
   * @param {module:ol/events/Event} event Event.
   * @private
   */
  LayerGroup.prototype.handleLayersChanged_ = function handleLayersChanged_ () {
    var this$1 = this;

    this.layersListenerKeys_.forEach(unlistenByKey);
    this.layersListenerKeys_.length = 0;

    var layers = this.getLayers();
    this.layersListenerKeys_.push(
      listen(layers, CollectionEventType.ADD, this.handleLayersAdd_, this),
      listen(layers, CollectionEventType.REMOVE, this.handleLayersRemove_, this)
    );

    for (var id in this$1.listenerKeys_) {
      this$1.listenerKeys_[id].forEach(unlistenByKey);
    }
    clear(this.listenerKeys_);

    var layersArray = layers.getArray();
    for (var i = 0, ii = layersArray.length; i < ii; i++) {
      var layer = layersArray[i];
      this$1.listenerKeys_[getUid(layer).toString()] = [
        listen(layer, ObjectEventType.PROPERTYCHANGE, this$1.handleLayerChange_, this$1),
        listen(layer, EventType.CHANGE, this$1.handleLayerChange_, this$1)
      ];
    }

    this.changed();
  };

  /**
   * @param {module:ol/Collection~CollectionEvent} collectionEvent CollectionEvent.
   * @private
   */
  LayerGroup.prototype.handleLayersAdd_ = function handleLayersAdd_ (collectionEvent) {
    var layer = /** @type {module:ol/layer/Base} */ (collectionEvent.element);
    var key = getUid(layer).toString();
    this.listenerKeys_[key] = [
      listen(layer, ObjectEventType.PROPERTYCHANGE, this.handleLayerChange_, this),
      listen(layer, EventType.CHANGE, this.handleLayerChange_, this)
    ];
    this.changed();
  };

  /**
   * @param {module:ol/Collection~CollectionEvent} collectionEvent CollectionEvent.
   * @private
   */
  LayerGroup.prototype.handleLayersRemove_ = function handleLayersRemove_ (collectionEvent) {
    var layer = /** @type {module:ol/layer/Base} */ (collectionEvent.element);
    var key = getUid(layer).toString();
    this.listenerKeys_[key].forEach(unlistenByKey);
    delete this.listenerKeys_[key];
    this.changed();
  };

  /**
   * Returns the {@link module:ol/Collection collection} of {@link module:ol/layer/Layer~Layer layers}
   * in this group.
   * @return {!module:ol/Collection<module:ol/layer/Base>} Collection of
   *   {@link module:ol/layer/Base layers} that are part of this group.
   * @observable
   * @api
   */
  LayerGroup.prototype.getLayers = function getLayers () {
    return (
      /** @type {!module:ol/Collection<module:ol/layer/Base>} */ (this.get(Property.LAYERS))
    );
  };

  /**
   * Set the {@link module:ol/Collection collection} of {@link module:ol/layer/Layer~Layer layers}
   * in this group.
   * @param {!module:ol/Collection<module:ol/layer/Base>} layers Collection of
   *   {@link module:ol/layer/Base layers} that are part of this group.
   * @observable
   * @api
   */
  LayerGroup.prototype.setLayers = function setLayers (layers) {
    this.set(Property.LAYERS, layers);
  };

  /**
   * @inheritDoc
   */
  LayerGroup.prototype.getLayersArray = function getLayersArray (opt_array) {
    var array = opt_array !== undefined ? opt_array : [];
    this.getLayers().forEach(function(layer) {
      layer.getLayersArray(array);
    });
    return array;
  };

  /**
   * @inheritDoc
   */
  LayerGroup.prototype.getLayerStatesArray = function getLayerStatesArray (opt_states) {
    var states = opt_states !== undefined ? opt_states : [];

    var pos = states.length;

    this.getLayers().forEach(function(layer) {
      layer.getLayerStatesArray(states);
    });

    var ownLayerState = this.getLayerState();
    for (var i = pos, ii = states.length; i < ii; i++) {
      var layerState = states[i];
      layerState.opacity *= ownLayerState.opacity;
      layerState.visible = layerState.visible && ownLayerState.visible;
      layerState.maxResolution = Math.min(
        layerState.maxResolution, ownLayerState.maxResolution);
      layerState.minResolution = Math.max(
        layerState.minResolution, ownLayerState.minResolution);
      if (ownLayerState.extent !== undefined) {
        if (layerState.extent !== undefined) {
          layerState.extent = getIntersection(layerState.extent, ownLayerState.extent);
        } else {
          layerState.extent = ownLayerState.extent;
        }
      }
    }

    return states;
  };

  /**
   * @inheritDoc
   */
  LayerGroup.prototype.getSourceState = function getSourceState () {
    return SourceState.READY;
  };

  return LayerGroup;
}(BaseLayer));


export default LayerGroup;

//# sourceMappingURL=Group.js.map