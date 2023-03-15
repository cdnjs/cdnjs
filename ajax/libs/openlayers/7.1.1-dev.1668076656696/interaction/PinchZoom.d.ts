export default PinchZoom;
export type Options = {
    /**
     * Animation duration in milliseconds.
     */
    duration?: number | undefined;
};
/**
 * @typedef {Object} Options
 * @property {number} [duration=400] Animation duration in milliseconds.
 */
/**
 * @classdesc
 * Allows the user to zoom the map by pinching with two fingers
 * on a touch screen.
 * @api
 */
declare class PinchZoom extends PointerInteraction {
    /**
     * @param {Options} [options] Options.
     */
    constructor(options?: Options | undefined);
    /**
     * @private
     * @type {import("../coordinate.js").Coordinate}
     */
    private anchor_;
    /**
     * @private
     * @type {number}
     */
    private duration_;
    /**
     * @private
     * @type {number|undefined}
     */
    private lastDistance_;
    /**
     * @private
     * @type {number}
     */
    private lastScaleDelta_;
}
import PointerInteraction from "./Pointer.js";
//# sourceMappingURL=PinchZoom.d.ts.map