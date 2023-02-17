export default EsriJSON;
export type EsriJSONFeature = import("arcgis-rest-api").Feature;
export type EsriJSONFeatureSet = import("arcgis-rest-api").FeatureSet;
export type EsriJSONGeometry = import("arcgis-rest-api").Geometry;
export type EsriJSONPoint = import("arcgis-rest-api").Point;
export type EsriJSONPolyline = import("arcgis-rest-api").Polyline;
export type EsriJSONPolygon = import("arcgis-rest-api").Polygon;
export type EsriJSONMultipoint = import("arcgis-rest-api").Multipoint;
export type EsriJSONHasZM = import("arcgis-rest-api").HasZM;
export type EsriJSONPosition = import("arcgis-rest-api").Position;
export type EsriJSONSpatialReferenceWkid = import("arcgis-rest-api").SpatialReferenceWkid;
export type EsriJSONMultiPolygon = {
    /**
     * Rings for the MultiPolygon.
     */
    rings: Array<Array<Array<Array<number>>>>;
    /**
     * If the polygon coordinates have an M value.
     */
    hasM?: boolean | undefined;
    /**
     * If the polygon coordinates have a Z value.
     */
    hasZ?: boolean | undefined;
    /**
     * The coordinate reference system.
     */
    spatialReference?: import("arcgis-rest-api").SpatialReferenceWkid | undefined;
};
export type Options = {
    /**
     * Geometry name to use when creating features.
     */
    geometryName?: string | undefined;
};
/**
 * @typedef {Object} Options
 * @property {string} [geometryName] Geometry name to use when creating features.
 */
/**
 * @classdesc
 * Feature format for reading and writing data in the EsriJSON format.
 *
 * @api
 */
declare class EsriJSON extends JSONFeature {
    /**
     * @param {Options} [options] Options.
     */
    constructor(options?: Options | undefined);
    /**
     * Name of the geometry attribute for features.
     * @type {string|undefined}
     * @private
     */
    private geometryName_;
    /**
     * @param {Object} object Object.
     * @param {import("./Feature.js").ReadOptions} [options] Read options.
     * @param {string} [idField] Name of the field where to get the id from.
     * @protected
     * @return {import("../Feature.js").default} Feature.
     */
    protected readFeatureFromObject(object: any, options?: import("./Feature.js").ReadOptions | undefined, idField?: string | undefined): import("../Feature.js").default;
    /**
     * @param {EsriJSONGeometry} object Object.
     * @param {import("./Feature.js").ReadOptions} [options] Read options.
     * @protected
     * @return {import("../geom/Geometry.js").default} Geometry.
     */
    protected readGeometryFromObject(object: EsriJSONGeometry, options?: import("./Feature.js").ReadOptions | undefined): import("../geom/Geometry.js").default;
    /**
     * Encode a geometry as a EsriJSON object.
     *
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {import("./Feature.js").WriteOptions} [options] Write options.
     * @return {EsriJSONGeometry} Object.
     * @api
     */
    writeGeometryObject(geometry: import("../geom/Geometry.js").default, options?: import("./Feature.js").WriteOptions | undefined): EsriJSONGeometry;
    /**
     * Encode an array of features as a EsriJSON object.
     *
     * @param {Array<import("../Feature.js").default>} features Features.
     * @param {import("./Feature.js").WriteOptions} [options] Write options.
     * @return {EsriJSONFeatureSet} EsriJSON Object.
     * @api
     */
    writeFeaturesObject(features: Array<import("../Feature.js").default>, options?: import("./Feature.js").WriteOptions | undefined): EsriJSONFeatureSet;
}
import JSONFeature from "./JSONFeature.js";
//# sourceMappingURL=EsriJSON.d.ts.map