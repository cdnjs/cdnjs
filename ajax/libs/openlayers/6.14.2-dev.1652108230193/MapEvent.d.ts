export default MapEvent;
/**
 * @classdesc
 * Events emitted as map events are instances of this type.
 * See {@link module:ol/PluggableMap~PluggableMap} for which events trigger a map event.
 */
declare class MapEvent extends Event {
    /**
     * @param {string} type Event type.
     * @param {import("./PluggableMap.js").default} map Map.
     * @param {?import("./PluggableMap.js").FrameState} [opt_frameState] Frame state.
     */
    constructor(type: string, map: import("./PluggableMap.js").default, opt_frameState?: import("./PluggableMap.js").FrameState | null | undefined);
    /**
     * The map where the event occurred.
     * @type {import("./PluggableMap.js").default}
     * @api
     */
    map: import("./PluggableMap.js").default;
    /**
     * The frame state at the time of the event.
     * @type {?import("./PluggableMap.js").FrameState}
     * @api
     */
    frameState: import("./PluggableMap.js").FrameState | null;
}
import Event from "./events/Event.js";
//# sourceMappingURL=MapEvent.d.ts.map