/**
 * @module ol/interaction/DragBox
 */
// FIXME draw drag box
import Event from '../events/Event.js';
import {always, mouseOnly, mouseActionButton} from '../events/condition.js';
import {VOID} from '../functions.js';
import PointerInteraction from '../interaction/Pointer.js';
import RenderBox from '../render/Box.js';


/**
 * A function that takes a {@link module:ol/MapBrowserEvent} and two
 * {@link module:ol/pixel~Pixel}s and returns a `{boolean}`. If the condition is met,
 * true should be returned.
 * @typedef {function(this: ?, module:ol/MapBrowserEvent, module:ol/pixel~Pixel, module:ol/pixel~Pixel):boolean} EndCondition
 */


/**
 * @typedef {Object} Options
 * @property {string} [className='ol-dragbox'] CSS class name for styling the box.
 * @property {module:ol/events/condition~Condition} [condition] A function that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a boolean
 * to indicate whether that event should be handled.
 * Default is {@link ol/events/condition~always}.
 * @property {number} [minArea=64] The minimum area of the box in pixel, this value is used by the default
 * `boxEndCondition` function.
 * @property {module:ol/interaction/DragBox~EndCondition} [boxEndCondition] A function that takes a {@link module:ol/MapBrowserEvent~MapBrowserEvent} and two
 * {@link module:ol/pixel~Pixel}s to indicate whether a `boxend` event should be fired.
 * Default is `true` if the area of the box is bigger than the `minArea` option.
 * @property {function(this:module:ol/interaction/DragBox, module:ol/MapBrowserEvent)} onBoxEnd Code to execute just
 * before `boxend` is fired.
 */


/**
 * @enum {string}
 */
var DragBoxEventType = {
  /**
   * Triggered upon drag box start.
   * @event module:ol/interaction/DragBox~DragBoxEvent#boxstart
   * @api
   */
  BOXSTART: 'boxstart',

  /**
   * Triggered on drag when box is active.
   * @event module:ol/interaction/DragBox~DragBoxEvent#boxdrag
   * @api
   */
  BOXDRAG: 'boxdrag',

  /**
   * Triggered upon drag box end.
   * @event module:ol/interaction/DragBox~DragBoxEvent#boxend
   * @api
   */
  BOXEND: 'boxend'
};


/**
 * @classdesc
 * Events emitted by {@link module:ol/interaction/DragBox~DragBox} instances are instances of
 * this type.
 */
var DragBoxEvent = (function (Event) {
  function DragBoxEvent(type, coordinate, mapBrowserEvent) {
    Event.call(this, type);

    /**
     * The coordinate of the drag event.
     * @const
     * @type {module:ol/coordinate~Coordinate}
     * @api
     */
    this.coordinate = coordinate;

    /**
     * @const
     * @type {module:ol/MapBrowserEvent}
     * @api
     */
    this.mapBrowserEvent = mapBrowserEvent;

  }

  if ( Event ) DragBoxEvent.__proto__ = Event;
  DragBoxEvent.prototype = Object.create( Event && Event.prototype );
  DragBoxEvent.prototype.constructor = DragBoxEvent;

  return DragBoxEvent;
}(Event));


/**
 * @classdesc
 * Allows the user to draw a vector box by clicking and dragging on the map,
 * normally combined with an {@link module:ol/events/condition} that limits
 * it to when the shift or other key is held down. This is used, for example,
 * for zooming to a specific area of the map
 * (see {@link module:ol/interaction/DragZoom~DragZoom} and
 * {@link module:ol/interaction/DragRotateAndZoom}).
 *
 * This interaction is only supported for mouse devices.
 *
 * @fires module:ol/interaction/DragBox~DragBoxEvent
 * @api
 */
var DragBox = (function (PointerInteraction) {
  function DragBox(opt_options) {

    PointerInteraction.call(this, {
      handleDownEvent: handleDownEvent,
      handleDragEvent: handleDragEvent,
      handleUpEvent: handleUpEvent
    });

    var options = opt_options ? opt_options : {};

    /**
    * @type {module:ol/render/Box}
    * @private
    */
    this.box_ = new RenderBox(options.className || 'ol-dragbox');

    /**
    * @type {number}
    * @private
    */
    this.minArea_ = options.minArea !== undefined ? options.minArea : 64;

    /**
     * Function to execute just before `onboxend` is fired
     * @type {function(this:module:ol/interaction/DragBox, module:ol/MapBrowserEvent)}
     * @private
     */
    this.onBoxEnd_ = options.onBoxEnd ? options.onBoxEnd : VOID;

    /**
    * @type {module:ol/pixel~Pixel}
    * @private
    */
    this.startPixel_ = null;

    /**
    * @private
    * @type {module:ol/events/condition~Condition}
    */
    this.condition_ = options.condition ? options.condition : always;

    /**
    * @private
    * @type {module:ol/interaction/DragBox~EndCondition}
    */
    this.boxEndCondition_ = options.boxEndCondition ?
      options.boxEndCondition : defaultBoxEndCondition;
  }

  if ( PointerInteraction ) DragBox.__proto__ = PointerInteraction;
  DragBox.prototype = Object.create( PointerInteraction && PointerInteraction.prototype );
  DragBox.prototype.constructor = DragBox;

  /**
  * Returns geometry of last drawn box.
  * @return {module:ol/geom/Polygon} Geometry.
  * @api
  */
  DragBox.prototype.getGeometry = function getGeometry () {
    return this.box_.getGeometry();
  };

  return DragBox;
}(PointerInteraction));


/**
 * The default condition for determining whether the boxend event
 * should fire.
 * @param {module:ol/MapBrowserEvent} mapBrowserEvent The originating MapBrowserEvent
 *     leading to the box end.
 * @param {module:ol/pixel~Pixel} startPixel The starting pixel of the box.
 * @param {module:ol/pixel~Pixel} endPixel The end pixel of the box.
 * @return {boolean} Whether or not the boxend condition should be fired.
 * @this {module:ol/interaction/DragBox}
 */
function defaultBoxEndCondition(mapBrowserEvent, startPixel, endPixel) {
  var width = endPixel[0] - startPixel[0];
  var height = endPixel[1] - startPixel[1];
  return width * width + height * height >= this.minArea_;
}


/**
 * @param {module:ol/MapBrowserPointerEvent} mapBrowserEvent Event.
 * @this {module:ol/interaction/DragBox}
 */
function handleDragEvent(mapBrowserEvent) {
  if (!mouseOnly(mapBrowserEvent)) {
    return;
  }

  this.box_.setPixels(this.startPixel_, mapBrowserEvent.pixel);

  this.dispatchEvent(new DragBoxEvent(DragBoxEventType.BOXDRAG,
    mapBrowserEvent.coordinate, mapBrowserEvent));
}


/**
 * @param {module:ol/MapBrowserPointerEvent} mapBrowserEvent Event.
 * @return {boolean} Stop drag sequence?
 * @this {module:ol/interaction/DragBox}
 */
function handleUpEvent(mapBrowserEvent) {
  if (!mouseOnly(mapBrowserEvent)) {
    return true;
  }

  this.box_.setMap(null);

  if (this.boxEndCondition_(mapBrowserEvent, this.startPixel_, mapBrowserEvent.pixel)) {
    this.onBoxEnd_(mapBrowserEvent);
    this.dispatchEvent(new DragBoxEvent(DragBoxEventType.BOXEND,
      mapBrowserEvent.coordinate, mapBrowserEvent));
  }
  return false;
}


/**
 * @param {module:ol/MapBrowserPointerEvent} mapBrowserEvent Event.
 * @return {boolean} Start drag sequence?
 * @this {module:ol/interaction/DragBox}
 */
function handleDownEvent(mapBrowserEvent) {
  if (!mouseOnly(mapBrowserEvent)) {
    return false;
  }

  if (mouseActionButton(mapBrowserEvent) &&
      this.condition_(mapBrowserEvent)) {
    this.startPixel_ = mapBrowserEvent.pixel;
    this.box_.setMap(mapBrowserEvent.map);
    this.box_.setPixels(this.startPixel_, this.startPixel_);
    this.dispatchEvent(new DragBoxEvent(DragBoxEventType.BOXSTART,
      mapBrowserEvent.coordinate, mapBrowserEvent));
    return true;
  } else {
    return false;
  }
}


export default DragBox;

//# sourceMappingURL=DragBox.js.map