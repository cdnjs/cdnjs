export default DoubleClickZoom;
export type Options = {
    /**
     * Animation duration in milliseconds.
     */
    duration?: number;
    /**
     * The zoom delta applied on each double click.
     */
    delta?: number;
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
     * @param {Options} [opt_options] Options.
     */
    constructor(opt_options?: Options | undefined);
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