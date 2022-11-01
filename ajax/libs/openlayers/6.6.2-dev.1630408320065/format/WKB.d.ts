export default WKB;
export type WKBGeometryType = number;
export type Options = {
    /**
     * Whether to split GeometryCollections into multiple features on reading.
     */
    splitCollection?: boolean;
    /**
     * Returns hex string instead of ArrayBuffer for output. This also is used as a hint internally whether it should load contents as text or ArrayBuffer on reading.
     */
    hex?: boolean;
    /**
     * Use littleEndian for output.
     */
    littleEndian?: boolean;
    /**
     * Use EWKB format for output.
     */
    ewkb?: boolean;
    /**
     * Use specific coordinate layout for output features (null: auto detect)
     */
    geometryLayout?: any;
    /**
     * If the `geometryLayout` doesn't match with geometry to be output, this value is used to fill missing coordinate value of Z.
     */
    nodataZ?: number;
    /**
     * If the `geometryLayout` doesn't match with geometry to be output, this value is used to fill missing coordinate value of M.
     */
    nodataM?: number;
    /**
     * SRID for output. Specify integer value to enforce the value as a SRID. Specify `true` to extract from `dataProjection`. `false` to suppress the output. This option only takes effect when `ewkb` is `true`.
     */
    srid?: number | boolean;
};
/**
 * @typedef {Object} Options
 * @property {boolean} [splitCollection=false] Whether to split GeometryCollections into multiple features on reading.
 * @property {boolean} [hex=true] Returns hex string instead of ArrayBuffer for output. This also is used as a hint internally whether it should load contents as text or ArrayBuffer on reading.
 * @property {boolean} [littleEndian=true] Use littleEndian for output.
 * @property {boolean} [ewkb=true] Use EWKB format for output.
 * @property {import("../geom/GeometryLayout").default} [geometryLayout=null] Use specific coordinate layout for output features (null: auto detect)
 * @property {number} [nodataZ=0] If the `geometryLayout` doesn't match with geometry to be output, this value is used to fill missing coordinate value of Z.
 * @property {number} [nodataM=0] If the `geometryLayout` doesn't match with geometry to be output, this value is used to fill missing coordinate value of M.
 * @property {number|boolean} [srid=true] SRID for output. Specify integer value to enforce the value as a SRID. Specify `true` to extract from `dataProjection`. `false` to suppress the output. This option only takes effect when `ewkb` is `true`.
 */
/**
 * @classdesc
 * Geometry format for reading and writing data in the `Well-Known Binary` (WKB) format.
 * Also supports `Extended Well-Known Binary` (EWKB) format, used in PostGIS for example.
 *
 * @api
 */
declare class WKB extends FeatureFormat {
    /**
     * @param {Options} [opt_options] Optional configuration object.
     */
    constructor(opt_options?: Options | undefined);
    splitCollection: boolean;
    viewCache_: DataView | null;
    hex_: boolean;
    littleEndian_: boolean;
    ewkb_: boolean;
    layout_: any;
    nodataZ_: number;
    nodataM_: number;
    srid_: number | boolean;
    /**
     * Read a single feature from a source.
     *
     * @param {string|ArrayBuffer|ArrayBufferView} source Source.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
     * @return {import("../Feature.js").FeatureLike} Feature.
     * @api
     */
    readFeature(source: string | ArrayBuffer | ArrayBufferView, opt_options?: import("./Feature.js").ReadOptions | undefined): import("../render/Feature.js").default | Feature<import("../geom/Geometry.js").default>;
    /**
     * Read all features from a source.
     *
     * @param {string|ArrayBuffer|ArrayBufferView} source Source.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
     * @return {Array<import("../Feature.js").FeatureLike>} Features.
     * @api
     */
    readFeatures(source: string | ArrayBuffer | ArrayBufferView, opt_options?: import("./Feature.js").ReadOptions | undefined): (import("../render/Feature.js").default | Feature<import("../geom/Geometry.js").default>)[];
    /**
     * Read a single geometry from a source.
     *
     * @param {string|ArrayBuffer|ArrayBufferView} source Source.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
     * @return {import("../geom/Geometry.js").default} Geometry.
     * @api
     */
    readGeometry(source: string | ArrayBuffer | ArrayBufferView, opt_options?: import("./Feature.js").ReadOptions | undefined): import("../geom/Geometry.js").default;
    /**
     * Read the projection from a source.
     *
     * @param {string|ArrayBuffer|ArrayBufferView} source Source.
     * @return {import("../proj/Projection.js").default|undefined} Projection.
     * @api
     */
    readProjection(source: string | ArrayBuffer | ArrayBufferView): import("../proj/Projection.js").default | undefined;
}
import FeatureFormat from "./Feature.js";
import Feature from "../Feature.js";
//# sourceMappingURL=WKB.d.ts.map