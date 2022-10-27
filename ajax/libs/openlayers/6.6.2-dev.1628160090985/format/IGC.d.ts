export default IGC;
/**
 * IGC altitude/z. One of 'barometric', 'gps', 'none'.
 */
export type IGCZ = string;
export type Options = {
    /**
     * Altitude mode. Possible
     * values are `'barometric'`, `'gps'`, and `'none'`.
     */
    altitudeMode?: string;
};
/**
 * @typedef {Object} Options
 * @property {IGCZ|string} [altitudeMode='none'] Altitude mode. Possible
 * values are `'barometric'`, `'gps'`, and `'none'`.
 */
/**
 * @classdesc
 * Feature format for `*.igc` flight recording files.
 *
 * As IGC sources contain a single feature,
 * {@link module:ol/format/IGC~IGC#readFeatures} will return the feature in an
 * array
 *
 * @api
 */
declare class IGC extends TextFeature {
    /**
     * @param {Options} [opt_options] Options.
     */
    constructor(opt_options?: Options | undefined);
    /**
     * @private
     * @type {IGCZ}
     */
    private altitudeMode_;
}
import TextFeature from "./TextFeature.js";
//# sourceMappingURL=IGC.d.ts.map