export default Kinetic;
/**
 * @module ol/Kinetic
 */
/**
 * @classdesc
 * Implementation of inertial deceleration for map movement.
 *
 * @api
 */
declare class Kinetic {
    /**
     * @param {number} decay Rate of decay (must be negative).
     * @param {number} minVelocity Minimum velocity (pixels/millisecond).
     * @param {number} delay Delay to consider to calculate the kinetic
     *     initial values (milliseconds).
     */
    constructor(decay: number, minVelocity: number, delay: number);
    /**
     * @private
     * @type {number}
     */
    private decay_;
    /**
     * @private
     * @type {number}
     */
    private minVelocity_;
    /**
     * @private
     * @type {number}
     */
    private delay_;
    /**
     * @private
     * @type {Array<number>}
     */
    private points_;
    /**
     * @private
     * @type {number}
     */
    private angle_;
    /**
     * @private
     * @type {number}
     */
    private initialVelocity_;
    /**
     * FIXME empty description for jsdoc
     */
    begin(): void;
    /**
     * @param {number} x X.
     * @param {number} y Y.
     */
    update(x: number, y: number): void;
    /**
     * @return {boolean} Whether we should do kinetic animation.
     */
    end(): boolean;
    /**
     * @return {number} Total distance travelled (pixels).
     */
    getDistance(): number;
    /**
     * @return {number} Angle of the kinetic panning animation (radians).
     */
    getAngle(): number;
}
//# sourceMappingURL=Kinetic.d.ts.map