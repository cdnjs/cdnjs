export default DragRotate;
export type Options = {
    /**
     * A function that takes an
     * {@link module :ol/MapBrowserEvent~MapBrowserEvent} and returns a boolean
     * to indicate whether that event should be handled.
     * Default is {@link module :ol/events/condition.altShiftKeysOnly}.
     */
    condition?: import("../events/condition.js").Condition | undefined;
    /**
     * Animation duration in milliseconds.
     */
    duration?: number | undefined;
};
/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that takes an
 * {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a boolean
 * to indicate whether that event should be handled.
 * Default is {@link module:ol/events/condition.altShiftKeysOnly}.
 * @property {number} [duration=250] Animation duration in milliseconds.
 */
/**
 * @classdesc
 * Allows the user to rotate the map by clicking and dragging on the map,
 * normally combined with an {@link module:ol/events/condition} that limits
 * it to when the alt and shift keys are held down.
 *
 * This interaction is only supported for mouse devices.
 * @api
 */
declare class DragRotate extends PointerInteraction {
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
     * @type {number}
     */
    private duration_;
}
import PointerInteraction from './Pointer.js';
//# sourceMappingURL=DragRotate.d.ts.map