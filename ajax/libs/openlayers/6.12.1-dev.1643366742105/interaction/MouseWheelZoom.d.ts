export type Mode = string;
export namespace Mode {
    const TRACKPAD: string;
    const WHEEL: string;
}
export default MouseWheelZoom;
export type Options = {
    /**
     * A function that
     * takes an {@link module :ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event should be handled. Default is
     * {@link module :ol/events/condition.always}.
     */
    condition?: import("../events/condition.js").Condition | undefined;
    /**
     * When the map's target has a `tabindex` attribute set,
     * the interaction will only handle events when the map has the focus.
     */
    onFocusOnly?: boolean | undefined;
    /**
     * Maximum mouse wheel delta.
     */
    maxDelta?: number | undefined;
    /**
     * Animation duration in milliseconds.
     */
    duration?: number | undefined;
    /**
     * Mouse wheel timeout duration in milliseconds.
     */
    timeout?: number | undefined;
    /**
     * Enable zooming using the mouse's
     * location as the anchor. When set to `false`, zooming in and out will zoom to
     * the center of the screen instead of zooming on the mouse's location.
     */
    useAnchor?: boolean | undefined;
    /**
     * If true, the mouse wheel zoom
     * event will always animate to the closest zoom level after an interaction;
     * false means intermediary zoom levels are allowed.
     */
    constrainResolution?: boolean | undefined;
};
/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled. Default is
 * {@link module:ol/events/condition.always}.
 * @property {boolean} [onFocusOnly=false] When the map's target has a `tabindex` attribute set,
 * the interaction will only handle events when the map has the focus.
 * @property {number} [maxDelta=1] Maximum mouse wheel delta.
 * @property {number} [duration=250] Animation duration in milliseconds.
 * @property {number} [timeout=80] Mouse wheel timeout duration in milliseconds.
 * @property {boolean} [useAnchor=true] Enable zooming using the mouse's
 * location as the anchor. When set to `false`, zooming in and out will zoom to
 * the center of the screen instead of zooming on the mouse's location.
 * @property {boolean} [constrainResolution=false] If true, the mouse wheel zoom
 * event will always animate to the closest zoom level after an interaction;
 * false means intermediary zoom levels are allowed.
 */
/**
 * @classdesc
 * Allows the user to zoom the map by scrolling the mouse wheel.
 * @api
 */
declare class MouseWheelZoom extends Interaction {
    /**
     * @param {Options} [opt_options] Options.
     */
    constructor(opt_options?: Options | undefined);
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
     * @type {boolean}
     */
    private constrainResolution_;
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
     */
    private endInteraction_;
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