/**
 * @module ol/interaction/DoubleClickZoom
 */
import MapBrowserEventType from '../MapBrowserEventType.js';
import Interaction, {zoomByDelta} from './Interaction.js';


/**
 * @typedef {Object} Options
 * @property {number} [duration=250] Animation duration in milliseconds.
 * @property {number} [delta=1] The zoom delta applied on each double click.
 */


/**
 * @classdesc
 * Allows the user to zoom by double-clicking on the map.
 * @api
 */
var DoubleClickZoom = /*@__PURE__*/(function (Interaction) {
  function DoubleClickZoom(opt_options) {
    Interaction.call(this, {
      handleEvent: handleEvent
    });

    var options = opt_options ? opt_options : {};

    /**
     * @private
     * @type {number}
     */
    this.delta_ = options.delta ? options.delta : 1;

    /**
     * @private
     * @type {number}
     */
    this.duration_ = options.duration !== undefined ? options.duration : 250;

  }

  if ( Interaction ) DoubleClickZoom.__proto__ = Interaction;
  DoubleClickZoom.prototype = Object.create( Interaction && Interaction.prototype );
  DoubleClickZoom.prototype.constructor = DoubleClickZoom;

  return DoubleClickZoom;
}(Interaction));


/**
 * Handles the {@link module:ol/MapBrowserEvent map browser event} (if it was a
 * doubleclick) and eventually zooms the map.
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} `false` to stop event propagation.
 * @this {DoubleClickZoom}
 */
function handleEvent(mapBrowserEvent) {
  var stopEvent = false;
  if (mapBrowserEvent.type == MapBrowserEventType.DBLCLICK) {
    var browserEvent = /** @type {MouseEvent} */ (mapBrowserEvent.originalEvent);
    var map = mapBrowserEvent.map;
    var anchor = mapBrowserEvent.coordinate;
    var delta = browserEvent.shiftKey ? -this.delta_ : this.delta_;
    var view = map.getView();
    zoomByDelta(view, delta, anchor, this.duration_);
    mapBrowserEvent.preventDefault();
    stopEvent = true;
  }
  return !stopEvent;
}

export default DoubleClickZoom;

//# sourceMappingURL=DoubleClickZoom.js.map