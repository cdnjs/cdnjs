/**
 * @module ol/interaction/DragAndDrop
 */
// FIXME should handle all geo-referenced data, not just vector data

import {TRUE} from '../functions.js';
import {listen, unlistenByKey} from '../events.js';
import Event from '../events/Event.js';
import EventType from '../events/EventType.js';
import Interaction from './Interaction.js';
import {get as getProjection} from '../proj.js';


/**
 * @typedef {Object} Options
 * @property {Array<typeof import("../format/Feature.js").default>} [formatConstructors] Format constructors.
 * @property {import("../source/Vector.js").default} [source] Optional vector source where features will be added.  If a source is provided
 * all existing features will be removed and new features will be added when
 * they are dropped on the target.  If you want to add features to a vector
 * source without removing the existing features (append only), instead of
 * providing the source option listen for the "addfeatures" event.
 * @property {import("../proj.js").ProjectionLike} [projection] Target projection. By default, the map's view's projection is used.
 * @property {HTMLElement} [target] The element that is used as the drop target, default is the viewport element.
 */


/**
 * @enum {string}
 */
var DragAndDropEventType = {
  /**
   * Triggered when features are added
   * @event DragAndDropEvent#addfeatures
   * @api
   */
  ADD_FEATURES: 'addfeatures'
};


/**
 * @classdesc
 * Events emitted by {@link module:ol/interaction/DragAndDrop~DragAndDrop} instances are instances
 * of this type.
 */
var DragAndDropEvent = /*@__PURE__*/(function (Event) {
  function DragAndDropEvent(type, file, opt_features, opt_projection) {

    Event.call(this, type);

    /**
     * The features parsed from dropped data.
     * @type {Array<import("../Feature.js").FeatureLike>|undefined}
     * @api
     */
    this.features = opt_features;

    /**
     * The dropped file.
     * @type {File}
     * @api
     */
    this.file = file;

    /**
     * The feature projection.
     * @type {import("../proj/Projection.js").default|undefined}
     * @api
     */
    this.projection = opt_projection;

  }

  if ( Event ) DragAndDropEvent.__proto__ = Event;
  DragAndDropEvent.prototype = Object.create( Event && Event.prototype );
  DragAndDropEvent.prototype.constructor = DragAndDropEvent;

  return DragAndDropEvent;
}(Event));


/**
 * @classdesc
 * Handles input of vector data by drag and drop.
 * @api
 *
 * @fires DragAndDropEvent
 */
var DragAndDrop = /*@__PURE__*/(function (Interaction) {
  function DragAndDrop(opt_options) {

    var options = opt_options ? opt_options : {};

    Interaction.call(this, {
      handleEvent: TRUE
    });

    /**
     * @private
     * @type {Array<typeof import("../format/Feature.js").default>}
     */
    this.formatConstructors_ = options.formatConstructors ?
      options.formatConstructors : [];

    /**
     * @private
     * @type {import("../proj/Projection.js").default}
     */
    this.projection_ = options.projection ?
      getProjection(options.projection) : null;

    /**
     * @private
     * @type {Array<import("../events.js").EventsKey>}
     */
    this.dropListenKeys_ = null;

    /**
     * @private
     * @type {import("../source/Vector.js").default}
     */
    this.source_ = options.source || null;

    /**
     * @private
     * @type {HTMLElement}
     */
    this.target = options.target ? options.target : null;

  }

  if ( Interaction ) DragAndDrop.__proto__ = Interaction;
  DragAndDrop.prototype = Object.create( Interaction && Interaction.prototype );
  DragAndDrop.prototype.constructor = DragAndDrop;

  /**
   * @param {File} file File.
   * @param {Event} event Load event.
   * @private
   */
  DragAndDrop.prototype.handleResult_ = function handleResult_ (file, event) {
    var result = event.target.result;
    var map = this.getMap();
    var projection = this.projection_;
    if (!projection) {
      var view = map.getView();
      projection = view.getProjection();
    }

    var formatConstructors = this.formatConstructors_;
    var features = [];
    for (var i = 0, ii = formatConstructors.length; i < ii; ++i) {
      var format = new formatConstructors[i]();
      features = this.tryReadFeatures_(format, result, {
        featureProjection: projection
      });
      if (features && features.length > 0) {
        break;
      }
    }
    if (this.source_) {
      this.source_.clear();
      this.source_.addFeatures(features);
    }
    this.dispatchEvent(
      new DragAndDropEvent(
        DragAndDropEventType.ADD_FEATURES, file,
        features, projection));
  };

  /**
   * @private
   */
  DragAndDrop.prototype.registerListeners_ = function registerListeners_ () {
    var map = this.getMap();
    if (map) {
      var dropArea = this.target ? this.target : map.getViewport();
      this.dropListenKeys_ = [
        listen(dropArea, EventType.DROP, handleDrop, this),
        listen(dropArea, EventType.DRAGENTER, handleStop, this),
        listen(dropArea, EventType.DRAGOVER, handleStop, this),
        listen(dropArea, EventType.DROP, handleStop, this)
      ];
    }
  };

  /**
   * @inheritDoc
   */
  DragAndDrop.prototype.setActive = function setActive (active) {
    Interaction.prototype.setActive.call(this, active);
    if (active) {
      this.registerListeners_();
    } else {
      this.unregisterListeners_();
    }
  };

  /**
   * @inheritDoc
   */
  DragAndDrop.prototype.setMap = function setMap (map) {
    this.unregisterListeners_();
    Interaction.prototype.setMap.call(this, map);
    if (this.getActive()) {
      this.registerListeners_();
    }
  };

  /**
   * @param {import("../format/Feature.js").default} format Format.
   * @param {string} text Text.
   * @param {import("../format/Feature.js").ReadOptions} options Read options.
   * @private
   * @return {Array<import("../Feature.js").FeatureLike>} Features.
   */
  DragAndDrop.prototype.tryReadFeatures_ = function tryReadFeatures_ (format, text, options) {
    try {
      return format.readFeatures(text, options);
    } catch (e) {
      return null;
    }
  };

  /**
   * @private
   */
  DragAndDrop.prototype.unregisterListeners_ = function unregisterListeners_ () {
    if (this.dropListenKeys_) {
      this.dropListenKeys_.forEach(unlistenByKey);
      this.dropListenKeys_ = null;
    }
  };

  return DragAndDrop;
}(Interaction));


/**
 * @param {DragEvent} event Event.
 * @this {DragAndDrop}
 */
function handleDrop(event) {
  var files = event.dataTransfer.files;
  for (var i = 0, ii = files.length; i < ii; ++i) {
    var file = files.item(i);
    var reader = new FileReader();
    reader.addEventListener(EventType.LOAD, this.handleResult_.bind(this, file));
    reader.readAsText(file);
  }
}


/**
 * @param {DragEvent} event Event.
 */
function handleStop(event) {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
}


export default DragAndDrop;

//# sourceMappingURL=DragAndDrop.js.map