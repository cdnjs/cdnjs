export default IGC;
/**
 * IGC altitude/z. One of 'barometric', 'gps', 'none'.
 */
export type IGCZ = "barometric" | "gps" | "none";
export type Options = {
    /**
     * Altitude mode. Possible
     * values are `'barometric'`, `'gps'`, and `'none'`.
     */
    altitudeMode?: IGCZ | undefined;
};
/**
 * @typedef {Object} Options
 * @property {IGCZ} [altitudeMode='none'] Altitude mode. Possible
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
     * @param {Options} [options] Options.
     */
    constructor(options?: Options | undefined);
    /**
     * @private
     * @type {IGCZ}
     */
    private altitudeMode_;
    /**
     * @private
     * @type {boolean}
     */
    private lad_;
    /**
     * @private
     * @type {boolean}
     */
    private lod_;
    /**
     * @private
     * @type {number}
     */
    private ladStart_;
    /**
     * @private
     * @type {number}
     */
    private ladStop_;
    /**
     * @private
     * @type {number}
     */
    private lodStart_;
    /**
     * @private
     * @type {number}
     */
    private lodStop_;
}
import TextFeature from './TextFeature.js';
//# sourceMappingURL=IGC.d.ts.map