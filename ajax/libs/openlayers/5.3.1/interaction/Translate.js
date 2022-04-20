/**
 * @module ol/interaction/Translate
 */
import Collection from '../Collection.js';
import {getChangeEventType} from '../Object.js';
import {listen} from '../events.js';
import Event from '../events/Event.js';
import {TRUE} from '../functions.js';
import {includes} from '../array.js';
import PointerInteraction from './Pointer.js';
import InteractionProperty from './Property.js';


/**
 * @enum {string}
 */
var TranslateEventType = {
  /**
   * Triggered upon feature translation start.
   * @event TranslateEvent#translatestart
   * @api
   */
  TRANSLATESTART: 'translatestart',
  /**
   * Triggered upon feature translation.
   * @event TranslateEvent#translating
   * @api
   */
  TRANSLATING: 'translating',
  /**
   * Triggered upon feature translation end.
   * @event TranslateEvent#translateend
   * @api
   */
  TRANSLATEEND: 'translateend'
};


/**
 * @typedef {Object} Options
 * @property {Collection<import("../Feature.js").default>} [features] Only features contained in this collection will be able to be translated. If
 * not specified, all features on the map will be able to be translated.
 * @property {Array<import("../layer/Layer.js").default>|function(import("../layer/Layer.js").default): boolean} [layers] A list of layers from which features should be
 * translated. Alternatively, a filter function can be provided. The
 * function will be called for each layer in the map and should return
 * `true` for layers that you want to be translatable. If the option is
 * absent, all visible layers will be considered translatable.
 * @property {number} [hitTolerance=0] Hit-detection tolerance. Pixels inside the radius around the given position
 * will be checked for features. This only works for the canvas renderer and
 * not for WebGL.
 */


/**
 * @classdesc
 * Events emitted by {@link module:ol/interaction/Translate~Translate} instances
 * are instances of this type.
 */
export var TranslateEvent = /*@__PURE__*/(function (Event) {
  function TranslateEvent(type, features, coordinate) {

    Event.call(this, type);

    /**
     * The features being translated.
     * @type {Collection<import("../Feature.js").default>}
     * @api
     */
    this.features = features;

    /**
     * The coordinate of the drag event.
     * @const
     * @type {import("../coordinate.js").Coordinate}
     * @api
     */
    this.coordinate = coordinate;

  }

  if ( Event ) TranslateEvent.__proto__ = Event;
  TranslateEvent.prototype = Object.create( Event && Event.prototype );
  TranslateEvent.prototype.constructor = TranslateEvent;

  return TranslateEvent;
}(Event));


/**
 * @classdesc
 * Interaction for translating (moving) features.
 *
 * @fires TranslateEvent
 * @api
 */
var Translate = /*@__PURE__*/(function (PointerInteraction) {
  function Translate(opt_options) {
    var options = opt_options ? opt_options : {};

    PointerInteraction.call(/** @type {import("./Pointer.js").Options} */ this, (options));

    /**
     * The last position we translated to.
     * @type {import("../coordinate.js").Coordinate}
     * @private
     */
    this.lastCoordinate_ = null;


    /**
     * @type {Collection<import("../Feature.js").default>}
     * @private
     */
    this.features_ = options.features !== undefined ? options.features : null;

    /** @type {function(import("../layer/Layer.js").default): boolean} */
    var layerFilter;
    if (options.layers) {
      if (typeof options.layers === 'function') {
        layerFilter = options.layers;
      } else {
        var layers = options.layers;
        layerFilter = function(layer) {
          return includes(layers, layer);
        };
      }
    } else {
      layerFilter = TRUE;
    }

    /**
     * @private
     * @type {function(import("../layer/Layer.js").default): boolean}
     */
    this.layerFilter_ = layerFilter;

    /**
     * @private
     * @type {number}
     */
    this.hitTolerance_ = options.hitTolerance ? options.hitTolerance : 0;

    /**
     * @type {import("../Feature.js").default}
     * @private
     */
    this.lastFeature_ = null;

    listen(this,
      getChangeEventType(InteractionProperty.ACTIVE),
      this.handleActiveChanged_, this);

  }

  if ( PointerInteraction ) Translate.__proto__ = PointerInteraction;
  Translate.prototype = Object.create( PointerInteraction && PointerInteraction.prototype );
  Translate.prototype.constructor = Translate;

  /**
   * @inheritDoc
   */
  Translate.prototype.handleDownEvent = function handleDownEvent (event) {
    this.lastFeature_ = this.featuresAtPixel_(event.pixel, event.map);
    if (!this.lastCoordinate_ && this.lastFeature_) {
      this.lastCoordinate_ = event.coordinate;
      this.handleMoveEvent(event);

      var features = this.features_ || new Collection([this.lastFeature_]);

      this.dispatchEvent(
        new TranslateEvent(
          TranslateEventType.TRANSLATESTART, features,
          event.coordinate));
      return true;
    }
    return false;
  };

  /**
   * @inheritDoc
   */
  Translate.prototype.handleUpEvent = function handleUpEvent (event) {
    if (this.lastCoordinate_) {
      this.lastCoordinate_ = null;
      this.handleMoveEvent(event);

      var features = this.features_ || new Collection([this.lastFeature_]);

      this.dispatchEvent(
        new TranslateEvent(
          TranslateEventType.TRANSLATEEND, features,
          event.coordinate));
      return true;
    }
    return false;
  };

  /**
   * @inheritDoc
   */
  Translate.prototype.handleDragEvent = function handleDragEvent (event) {
    if (this.lastCoordinate_) {
      var newCoordinate = event.coordinate;
      var deltaX = newCoordinate[0] - this.lastCoordinate_[0];
      var deltaY = newCoordinate[1] - this.lastCoordinate_[1];

      var features = this.features_ || new Collection([this.lastFeature_]);

      features.forEach(function(feature) {
        var geom = feature.getGeometry();
        geom.translate(deltaX, deltaY);
        feature.setGeometry(geom);
      });

      this.lastCoordinate_ = newCoordinate;
      this.dispatchEvent(
        new TranslateEvent(
          TranslateEventType.TRANSLATING, features,
          newCoordinate));
    }
  };

  /**
   * @inheritDoc
   */
  Translate.prototype.handleMoveEvent = function handleMoveEvent (event) {
    var elem = event.map.getViewport();

    // Change the cursor to grab/grabbing if hovering any of the features managed
    // by the interaction
    if (this.featuresAtPixel_(event.pixel, event.map)) {
      elem.classList.remove(this.lastCoordinate_ ? 'ol-grab' : 'ol-grabbing');
      elem.classList.add(this.lastCoordinate_ ? 'ol-grabbing' : 'ol-grab');
    } else {
      elem.classList.remove('ol-grab', 'ol-grabbing');
    }
  };

  /**
   * Tests to see if the given coordinates intersects any of our selected
   * features.
   * @param {import("../pixel.js").Pixel} pixel Pixel coordinate to test for intersection.
   * @param {import("../PluggableMap.js").default} map Map to test the intersection on.
   * @return {import("../Feature.js").default} Returns the feature found at the specified pixel
   * coordinates.
   * @private
   */
  Translate.prototype.featuresAtPixel_ = function featuresAtPixel_ (pixel, map) {
    return map.forEachFeatureAtPixel(pixel,
      function(feature) {
        if (!this.features_ || includes(this.features_.getArray(), feature)) {
          return feature;
        }
      }.bind(this), {
        layerFilter: this.layerFilter_,
        hitTolerance: this.hitTolerance_
      });
  };

  /**
   * Returns the Hit-detection tolerance.
   * @returns {number} Hit tolerance in pixels.
   * @api
   */
  Translate.prototype.getHitTolerance = function getHitTolerance () {
    return this.hitTolerance_;
  };

  /**
   * Hit-detection tolerance. Pixels inside the radius around the given position
   * will be checked for features. This only works for the canvas renderer and
   * not for WebGL.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @api
   */
  Translate.prototype.setHitTolerance = function setHitTolerance (hitTolerance) {
    this.hitTolerance_ = hitTolerance;
  };

  /**
   * @inheritDoc
   */
  Translate.prototype.setMap = function setMap (map) {
    var oldMap = this.getMap();
    PointerInteraction.prototype.setMap.call(this, map);
    this.updateState_(oldMap);
  };

  /**
   * @private
   */
  Translate.prototype.handleActiveChanged_ = function handleActiveChanged_ () {
    this.updateState_(null);
  };

  /**
   * @param {import("../PluggableMap.js").default} oldMap Old map.
   * @private
   */
  Translate.prototype.updateState_ = function updateState_ (oldMap) {
    var map = this.getMap();
    var active = this.getActive();
    if (!map || !active) {
      map = map || oldMap;
      if (map) {
        var elem = map.getViewport();
        elem.classList.remove('ol-grab', 'ol-grabbing');
      }
    }
  };

  return Translate;
}(PointerInteraction));

export default Translate;

//# sourceMappingURL=Translate.js.map