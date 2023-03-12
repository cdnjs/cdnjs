export default DoubleClickZoom;
export type Options = {
    /**
     * Animation duration in milliseconds.
     */
    duration?: number | undefined;
    /**
     * The zoom delta applied on each double click.
     */
    delta?: number | undefined;
};
/**
 * @typedef {Object} Options
 * @property {number} [duration=250] Animation duration in milliseconds.
 * @property {number} [delta=1] The zoom delta applied on each double click.
 */
/**
 * @classdesc
 * Allows the user to zoom by double-clicking on the map.
 * @api
 */
declare class DoubleClickZoom extends Interaction {
    /**
     * @param {Options} [options] Options.
     */
    constructor(options?: Options | undefined);
    /**
     * @private
     * @type {number}
     */
    private delta_;
    /**
     * @private
     * @type {number}
     */
    private duration_;
}
import Interaction from "./Interaction.js";
//# sourceMappingURL=DoubleClickZoom.d.ts.map