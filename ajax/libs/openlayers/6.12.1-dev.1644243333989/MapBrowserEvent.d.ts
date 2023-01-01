export default MapBrowserEvent;
/**
 * @classdesc
 * Events emitted as map browser events are instances of this type.
 * See {@link module:ol/PluggableMap~PluggableMap} for which events trigger a map browser event.
 * @template {UIEvent} EVENT
 */
declare class MapBrowserEvent<EVENT extends UIEvent> extends MapEvent {
    /**
     * @param {string} type Event type.
     * @param {import("./PluggableMap.js").default} map Map.
     * @param {EVENT} originalEvent Original event.
     * @param {boolean} [opt_dragging] Is the map currently being dragged?
     * @param {?import("./PluggableMap.js").FrameState} [opt_frameState] Frame state.
     */
    constructor(type: string, map: import("./PluggableMap.js").default, originalEvent: EVENT, opt_dragging?: boolean | undefined, opt_frameState?: import("./PluggableMap.js").FrameState | null | undefined);
    /**
     * The original browser event.
     * @const
     * @type {EVENT}
     * @api
     */
    originalEvent: EVENT;
    /**
     * The map pixel relative to the viewport corresponding to the original browser event.
     * @type {?import("./pixel.js").Pixel}
     */
    pixel_: import("./pixel.js").Pixel | null;
    /**
     * The coordinate in the user projection corresponding to the original browser event.
     * @type {?import("./coordinate.js").Coordinate}
     */
    coordinate_: import("./coordinate.js").Coordinate | null;
    /**
     * Indicates if the map is currently being dragged. Only set for
     * `POINTERDRAG` and `POINTERMOVE` events. Default is `false`.
     *
     * @type {boolean}
     * @api
     */
    dragging: boolean;
    set pixel(arg: import("./pixel.js").Pixel);
    /**
     * The map pixel relative to the viewport corresponding to the original event.
     * @type {import("./pixel.js").Pixel}
     * @api
     */
    get pixel(): import("./pixel.js").Pixel;
    set coordinate(arg: import("./coordinate.js").Coordinate);
    /**
     * The coordinate corresponding to the original browser event.  This will be in the user
     * projection if one is set.  Otherwise it will be in the view projection.
     * @type {import("./coordinate.js").Coordinate}
     * @api
     */
    get coordinate(): import("./coordinate.js").Coordinate;
}
import MapEvent from "./MapEvent.js";
//# sourceMappingURL=MapBrowserEvent.d.ts.map