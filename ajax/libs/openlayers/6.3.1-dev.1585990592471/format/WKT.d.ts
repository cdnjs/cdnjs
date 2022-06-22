export default WKT;
/**
 * Geometry constructors
 */
export type GeometryConstructor = new (arg1: Array, arg2: GeometryLayout) => import("../geom/Geometry.js").default;
export type Options = {
    /**
     * Whether to split GeometryCollections into
     * multiple features on reading.
     */
    splitCollection?: boolean;
};
export type Token = {
    type: number;
    value?: number | string;
    position: number;
};
export type TokenType = number;
/**
 * @classdesc
 * Geometry format for reading and writing data in the `WellKnownText` (WKT)
 * format.
 *
 * @api
 */
declare class WKT extends TextFeature {
    /**
     * @param {Options=} opt_options Options.
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
     * @return {import("../geom/Geometry.js").default|undefined}
     *     The geometry created.
     * @private
     */
    private parse_;
    /**
     * @inheritDoc
     */
    readFeatureFromText(text: any, opt_options: any): Feature<import("../geom/Geometry.js").default>;
    /**
     * @inheritDoc
     */
    readFeaturesFromText(text: any, opt_options: any): Feature<import("../geom/Geometry.js").default>[];
    /**
     * @inheritDoc
     */
    readGeometryFromText(text: any, opt_options: any): import("../geom/Geometry.js").default;
    /**
     * @inheritDoc
     */
    writeFeatureText(feature: any, opt_options: any): string;
    /**
     * @inheritDoc
     */
    writeFeaturesText(features: any, opt_options: any): string;
    /**
     * @inheritDoc
     */
    writeGeometryText(geometry: any, opt_options: any): string;
}
import GeometryLayout from "../geom/GeometryLayout.js";
import TextFeature from "./TextFeature.js";
import Feature from "../Feature.js";
//# sourceMappingURL=WKT.d.ts.map