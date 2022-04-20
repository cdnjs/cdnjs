/**
 * @module ol/MapBrowserPointerEvent
 */
import MapBrowserEvent from './MapBrowserEvent.js';

var MapBrowserPointerEvent = /*@__PURE__*/(function (MapBrowserEvent) {
  function MapBrowserPointerEvent(type, map, pointerEvent, opt_dragging, opt_frameState) {

    MapBrowserEvent.call(this, type, map, pointerEvent.originalEvent, opt_dragging, opt_frameState);

    /**
     * @const
     * @type {import("./pointer/PointerEvent.js").default}
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