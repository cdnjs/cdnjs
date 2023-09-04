export default MapEvent;
/**
 * @classdesc
 * Events emitted as map events are instances of this type.
 * See {@link module:ol/Map~Map} for which events trigger a map event.
 */
declare class MapEvent extends Event {
    /**
     * @param {string} type Event type.
     * @param {import("./Map.js").default} map Map.
     * @param {?import("./Map.js").FrameState} [frameState] Frame state.
     */
    constructor(type: string, map: import("./Map.js").default, frameState?: import("./Map.js").FrameState | null | undefined);
    /**
     * The map where the event occurred.
     * @type {import("./Map.js").default}
     * @api
     */
    map: import("./Map.js").default;
    /**
     * The frame state at the time of the event.
     * @type {?import("./Map.js").FrameState}
     * @api
     */
    frameState: import("./Map.js").FrameState | null;
}
import Event from './events/Event.js';
//# sourceMappingURL=MapEvent.d.ts.map