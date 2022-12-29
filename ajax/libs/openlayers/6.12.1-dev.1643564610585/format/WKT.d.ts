export default WKT;
export type Options = {
    /**
     * Whether to split GeometryCollections into
     * multiple features on reading.
     */
    splitCollection?: boolean | undefined;
};
export type Token = {
    /**
     * Type.
     */
    type: number;
    /**
     * Value.
     */
    value?: string | number | undefined;
    /**
     * Position.
     */
    position: number;
};
/**
 * @classdesc
 * Geometry format for reading and writing data in the `WellKnownText` (WKT)
 * format.
 *
 * @api
 */
declare class WKT extends TextFeature {
    /**
     * @param {Options} [opt_options] Options.
     */
    constructor(opt_options?: Options | undefined);
    /**
     * Split GeometryCollection into multiple features.
     * @type {boolean}
     * @private
     */
    private splitCollection_;
    /**
     * Parse a WKT string.
     * @param {string} wkt WKT string.
     * @return {import("../geom/Geometry.js").default}
     *     The geometry created.
     * @private
     */
    private parse_;
}
import TextFeature from "./TextFeature.js";
//# sourceMappingURL=WKT.d.ts.map