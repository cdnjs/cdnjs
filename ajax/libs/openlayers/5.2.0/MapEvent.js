/**
 * @module ol/MapEvent
 */
import Event from './events/Event.js';

/**
 * @classdesc
 * Events emitted as map events are instances of this type.
 * See {@link module:ol/PluggableMap~PluggableMap} for which events trigger a map event.
 */
var MapEvent = (function (Event) {
  function MapEvent(type, map, opt_frameState) {

    Event.call(this, type);

    /**
     * The map where the event occurred.
     * @type {module:ol/PluggableMap}
     * @api
     */
    this.map = map;

    /**
     * The frame state at the time of the event.
     * @type {?module:ol/PluggableMap~FrameState}
     * @api
     */
    this.frameState = opt_frameState !== undefined ? opt_frameState : null;

  }

  if ( Event ) MapEvent.__proto__ = Event;
  MapEvent.prototype = Object.create( Event && Event.prototype );
  MapEvent.prototype.constructor = MapEvent;

  return MapEvent;
}(Event));

export default MapEvent;

//# sourceMappingURL=MapEvent.js.map