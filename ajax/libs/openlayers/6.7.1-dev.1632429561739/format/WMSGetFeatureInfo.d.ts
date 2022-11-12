export default WMSGetFeatureInfo;
export type Options = {
    /**
     * If set, only features of the given layers will be returned by the format when read.
     */
    layers?: string[];
};
/**
 * @classdesc
 * Format for reading WMSGetFeatureInfo format. It uses
 * {@link module:ol/format/GML2~GML2} to read features.
 *
 * @api
 */
declare class WMSGetFeatureInfo extends XMLFeature {
    /**
     * @param {Options} [opt_options] Options.
     */
    constructor(opt_options?: Options | undefined);
    /**
     * @private
     * @type {string}
     */
    private featureNS_;
    /**
     * @private
     * @type {GML2}
     */
    private gmlFormat_;
    /**
     * @private
     * @type {Array<string>}
     */
    private layers_;
    /**
     * @return {Array<string>} layers
     */
    getLayers(): string[];
    /**
     * @param {Array<string>} layers Layers to parse.
     */
    setLayers(layers: string[]): void;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {Array<import("../Feature.js").default>} Features.
     * @private
     */
    private readFeatures_;
}
import XMLFeature from "./XMLFeature.js";
//# sourceMappingURL=WMSGetFeatureInfo.d.ts.map