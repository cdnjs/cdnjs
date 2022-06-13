export type Mode = string;
export namespace Mode {
    export const TRACKPAD: string;
    export const WHEEL: string;
}
export default MouseWheelZoom;
export type Options = {
    /**
     * A function that
     * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event should be handled. Default is
     * {@link module:ol/events/condition~always}.
     * In addition, if there is a `tabindex` attribute on the map element,
     * {@link module:ol/events/condition~focus} will also be applied.
     */
    condition?: (this: any, arg1: import("../MapBrowserEvent.js").default) => boolean;
    /**
     * Maximum mouse wheel delta.
     */
    maxDelta?: number;
    /**
     * Animation duration in milliseconds.
     */
    duration?: number;
    /**
     * Mouse wheel timeout duration in milliseconds.
     */
    timeout?: number;
    /**
     * Enable zooming using the mouse's
     * location as the anchor. When set to `false`, zooming in and out will zoom to
     * the center of the screen instead of zooming on the mouse's location.
     */
    useAnchor?: boolean;
};
/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled. Default is
 * {@link module:ol/events/condition~always}.
 * In addition, if there is a `tabindex` attribute on the map element,
 * {@link module:ol/events/condition~focus} will also be applied.
 * @property {number} [maxDelta=1] Maximum mouse wheel delta.
 * @property {number} [duration=250] Animation duration in milliseconds.
 * @property {number} [timeout=80] Mouse wheel timeout duration in milliseconds.
 * @property {boolean} [useAnchor=true] Enable zooming using the mouse's
 * location as the anchor. When set to `false`, zooming in and out will zoom to
 * the center of the screen instead of zooming on the mouse's location.
 */
/**
 * @classdesc
 * Allows the user to zoom the map by scrolling the mouse wheel.
 * @api
 */
declare class MouseWheelZoom extends Interaction {
    /**
     * @param {Options=} opt_options Options.
     */
    constructor(opt_options?: Options);
    /**
     * @private
     * @type {number}
     */
    private totalDelta_;
    /**
     * @private
     * @type {number}
     */
    private lastDelta_;
    /**
     * @private
     * @type {number}
     */
    private maxDelta_;
    /**
     * @private
     * @type {number}
     */
    private duration_;
    /**
     * @private
     * @type {number}
     */
    private timeout_;
    /**
     * @private
     * @type {boolean}
     */
    private useAnchor_;
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    private condition_;
    /**
     * @private
     * @type {?import("../coordinate.js").Coordinate}
     */
    private lastAnchor_;
    /**
     * @private
     * @type {number|undefined}
     */
    private startTime_;
    /**
     * @private
     * @type {?}
     */
    private timeoutId_;
    /**
     * @private
     * @type {Mode|undefined}
     */
    private mode_;
    /**
     * Trackpad events separated by this delay will be considered separate
     * interactions.
     * @type {number}
     */
    trackpadEventGap_: number;
    /**
     * @type {?}
     */
    trackpadTimeoutId_: unknown;
    /**
     * The number of delta values per zoom level
     * @private
     * @type {number}
     */
    private deltaPerZoom_;
    /**
     * @private
     * @param {import("../MapBrowserEvent").default} mapBrowserEvent Event.
     * @return {boolean} Condition passes.
     */
    private conditionInternal_;
    /**
     * @private
     */
    private endInteraction_;
    /**
     * Handles the {@link module:ol/MapBrowserEvent map browser event} (if it was a mousewheel-event) and eventually
     * zooms the map.
     * @override
     */
    handleEvent(mapBrowserEvent: any): boolean;
    /**
     * @private
     * @param {import("../PluggableMap.js").default} map Map.
     */
    private handleWheelZoom_;
    /**
     * Enable or disable using the mouse's location as an anchor when zooming
     * @param {boolean} useAnchor true to zoom to the mouse's location, false
     * to zoom to the center of the map
     * @api
     */
    setMouseAnchor(useAnchor: boolean): void;
}
import Interaction from "./Interaction.js";
//# sourceMappingURL=MouseWheelZoom.d.ts.map