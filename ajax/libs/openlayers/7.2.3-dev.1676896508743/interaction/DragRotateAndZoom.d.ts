export default DragRotateAndZoom;
export type Options = {
    /**
     * A function that
     * takes an {@link module :ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event should be handled.
     * Default is {@link module :ol/events/condition.shiftKeyOnly}.
     */
    condition?: import("../events/condition.js").Condition | undefined;
    /**
     * Animation duration in milliseconds.
     */
    duration?: number | undefined;
};
/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled.
 * Default is {@link module:ol/events/condition.shiftKeyOnly}.
 * @property {number} [duration=400] Animation duration in milliseconds.
 */
/**
 * @classdesc
 * Allows the user to zoom and rotate the map by clicking and dragging
 * on the map.  By default, this interaction is limited to when the shift
 * key is held down.
 *
 * This interaction is only supported for mouse devices.
 *
 * And this interaction is not included in the default interactions.
 * @api
 */
declare class DragRotateAndZoom extends PointerInteraction {
    /**
     * @param {Options} [options] Options.
     */
    constructor(options?: Options | undefined);
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    private condition_;
    /**
     * @private
     * @type {number|undefined}
     */
    private lastAngle_;
    /**
     * @private
     * @type {number|undefined}
     */
    private lastMagnitude_;
    /**
     * @private
     * @type {number}
     */
    private lastScaleDelta_;
    /**
     * @private
     * @type {number}
     */
    private duration_;
}
import PointerInteraction from "./Pointer.js";
//# sourceMappingURL=DragRotateAndZoom.d.ts.map