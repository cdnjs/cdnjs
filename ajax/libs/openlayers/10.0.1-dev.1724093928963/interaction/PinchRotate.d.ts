export default PinchRotate;
export type Options = {
    /**
     * The duration of the animation in
     * milliseconds.
     */
    duration?: number | undefined;
    /**
     * Minimal angle in radians to start a rotation.
     */
    threshold?: number | undefined;
};
/**
 * @typedef {Object} Options
 * @property {number} [duration=250] The duration of the animation in
 * milliseconds.
 * @property {number} [threshold=0.3] Minimal angle in radians to start a rotation.
 */
/**
 * @classdesc
 * Allows the user to rotate the map by twisting with two fingers
 * on a touch screen.
 * @api
 */
declare class PinchRotate extends PointerInteraction {
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
     * @type {number|undefined}
     */
    private lastAngle_;
    /**
     * @private
     * @type {boolean}
     */
    private rotating_;
    /**
     * @private
     * @type {number}
     */
    private rotationDelta_;
    /**
     * @private
     * @type {number}
     */
    private threshold_;
    /**
     * @private
     * @type {number}
     */
    private duration_;
}
import PointerInteraction from './Pointer.js';
//# sourceMappingURL=PinchRotate.d.ts.map