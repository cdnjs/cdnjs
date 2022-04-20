/**
 * @module ol/MapBrowserEvent
 */
import MapEvent from './MapEvent.js';

/**
 * @classdesc
 * Events emitted as map browser events are instances of this type.
 * See {@link module:ol/PluggableMap~PluggableMap} for which events trigger a map browser event.
 */
var MapBrowserEvent = /*@__PURE__*/(function (MapEvent) {
  function MapBrowserEvent(type, map, browserEvent, opt_dragging, opt_frameState) {

    MapEvent.call(this, type, map, opt_frameState);

    /**
     * The original browser event.
     * @const
     * @type {Event}
     * @api
     */
    this.originalEvent = browserEvent;

    /**
     * The map pixel relative to the viewport corresponding to the original browser event.
     * @type {import("./pixel.js").Pixel}
     * @api
     */
    this.pixel = map.getEventPixel(browserEvent);

    /**
     * The coordinate in view projection corresponding to the original browser event.
     * @type {import("./coordinate.js").Coordinate}
     * @api
     */
    this.coordinate = map.getCoordinateFromPixel(this.pixel);

    /**
     * Indicates if the map is currently being dragged. Only set for
     * `POINTERDRAG` and `POINTERMOVE` events. Default is `false`.
     *
     * @type {boolean}
     * @api
     */
    this.dragging = opt_dragging !== undefined ? opt_dragging : false;

  }

  if ( MapEvent ) MapBrowserEvent.__proto__ = MapEvent;
  MapBrowserEvent.prototype = Object.create( MapEvent && MapEvent.prototype );
  MapBrowserEvent.prototype.constructor = MapBrowserEvent;

  /**
   * Prevents the default browser action.
   * See https://developer.mozilla.org/en-US/docs/Web/API/event.preventDefault.
   * @override
   * @api
   */
  MapBrowserEvent.prototype.preventDefault = function preventDefault () {
    MapEvent.prototype.preventDefault.call(this);
    this.originalEvent.preventDefault();
  };

  /**
   * Prevents further propagation of the current event.
   * See https://developer.mozilla.org/en-US/docs/Web/API/event.stopPropagation.
   * @override
   * @api
   */
  MapBrowserEvent.prototype.stopPropagation = function stopPropagation () {
    MapEvent.prototype.stopPropagation.call(this);
    this.originalEvent.stopPropagation();
  };

  return MapBrowserEvent;
}(MapEvent));


export default MapBrowserEvent;

//# sourceMappingURL=MapBrowserEvent.js.map