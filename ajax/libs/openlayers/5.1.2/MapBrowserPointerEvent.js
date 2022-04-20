/**
 * @module ol/MapBrowserPointerEvent
 */
import MapBrowserEvent from './MapBrowserEvent.js';

var MapBrowserPointerEvent = (function (MapBrowserEvent) {
  function MapBrowserPointerEvent(type, map, pointerEvent, opt_dragging, opt_frameState) {

    MapBrowserEvent.call(this, type, map, pointerEvent.originalEvent, opt_dragging, opt_frameState);

    /**
     * @const
     * @type {module:ol/pointer/PointerEvent}
     */
    this.pointerEvent = pointerEvent;

  }

  if ( MapBrowserEvent ) MapBrowserPointerEvent.__proto__ = MapBrowserEvent;
  MapBrowserPointerEvent.prototype = Object.create( MapBrowserEvent && MapBrowserEvent.prototype );
  MapBrowserPointerEvent.prototype.constructor = MapBrowserPointerEvent;

  return MapBrowserPointerEvent;
}(MapBrowserEvent));

export default MapBrowserPointerEvent;

//# sourceMappingURL=MapBrowserPointerEvent.js.map