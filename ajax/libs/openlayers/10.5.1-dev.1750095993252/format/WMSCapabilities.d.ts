export default WMSCapabilities;
export type RootObject = {
    /**
     * Version
     */
    version: string;
    /**
     * Whether version is 1.3 or higher
     */
    v13: boolean;
};
/**
 * @typedef {Object} RootObject
 * @property {string} version Version
 * @property {boolean} v13 Whether version is 1.3 or higher
 */
/**
 * @classdesc
 * Format for reading WMS capabilities data
 *
 * @api
 */
declare class WMSCapabilities extends XML {
    /**
     * @type {string|undefined}
     */
    version: string | undefined;
}
import XML from './XML.js';
//# sourceMappingURL=WMSCapabilities.d.ts.map