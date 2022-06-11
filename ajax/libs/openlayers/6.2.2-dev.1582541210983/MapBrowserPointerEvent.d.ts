export default MapBrowserPointerEvent;
declare class MapBrowserPointerEvent extends MapBrowserEvent {
    /**
     * @param {string} type Event type.
     * @param {import("./PluggableMap.js").default} map Map.
     * @param {PointerEvent} pointerEvent Pointer event.
     * @param {boolean=} opt_dragging Is the map currently being dragged?
     * @param {?import("./PluggableMap.js").FrameState=} opt_frameState Frame state.
     */
    constructor(type: string, map: import("./PluggableMap.js").default, pointerEvent: PointerEvent, opt_dragging?: boolean, opt_frameState?: import("./PluggableMap.js").FrameState);
    /**
     * @const
     * @type {PointerEvent}
     */
    pointerEvent: PointerEvent;
}
import MapBrowserEvent from "./MapBrowserEvent.js";
//# sourceMappingURL=MapBrowserPointerEvent.d.ts.map