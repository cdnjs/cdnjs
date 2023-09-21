export default GeoJSON;
export type GeoJSONObject = import("geojson").GeoJSON;
export type GeoJSONFeature = import("geojson").Feature;
export type GeoJSONFeatureCollection = import("geojson").FeatureCollection;
export type GeoJSONGeometry = import("geojson").Geometry;
export type GeoJSONPoint = import("geojson").Point;
export type GeoJSONLineString = import("geojson").LineString;
export type GeoJSONPolygon = import("geojson").Polygon;
export type GeoJSONMultiPoint = import("geojson").MultiPoint;
export type GeoJSONMultiLineString = import("geojson").MultiLineString;
export type GeoJSONMultiPolygon = import("geojson").MultiPolygon;
export type GeoJSONGeometryCollection = import("geojson").GeometryCollection;
export type Options = {
    /**
     * Default data projection.
     */
    dataProjection?: import("../proj.js").ProjectionLike;
    /**
     * Projection for features read or
     * written by the format.  Options passed to read or write methods will take precedence.
     */
    featureProjection?: import("../proj.js").ProjectionLike;
    /**
     * Geometry name to use when creating features.
     */
    geometryName?: string | undefined;
    /**
     * Certain GeoJSON providers include
     * the geometry_name field in the feature GeoJSON. If set to `true` the GeoJSON reader
     * will look for that field to set the geometry name. If both this field is set to `true`
     * and a `geometryName` is provided, the `geometryName` will take precedence.
     */
    extractGeometryName?: boolean | undefined;
    /**
     * Feature class
     * to be used when reading features. The default is {@link module :ol/Feature~Feature}. If performance is
     * the primary concern, and features are not going to be modified or round-tripped through the format,
     * consider using {@link module :ol/render/Feature~RenderFeature}
     */
    featureClass?: import("../Feature.js").FeatureClass | undefined;
};
/**
 * @typedef {import("geojson").GeoJSON} GeoJSONObject
 * @typedef {import("geojson").Feature} GeoJSONFeature
 * @typedef {import("geojson").FeatureCollection} GeoJSONFeatureCollection
 * @typedef {import("geojson").Geometry} GeoJSONGeometry
 * @typedef {import("geojson").Point} GeoJSONPoint
 * @typedef {import("geojson").LineString} GeoJSONLineString
 * @typedef {import("geojson").Polygon} GeoJSONPolygon
 * @typedef {import("geojson").MultiPoint} GeoJSONMultiPoint
 * @typedef {import("geojson").MultiLineString} GeoJSONMultiLineString
 * @typedef {import("geojson").MultiPolygon} GeoJSONMultiPolygon
 * @typedef {import("geojson").GeometryCollection} GeoJSONGeometryCollection
 */
/**
 * @typedef {Object} Options
 * @property {import("../proj.js").ProjectionLike} [dataProjection='EPSG:4326'] Default data projection.
 * @property {import("../proj.js").ProjectionLike} [featureProjection] Projection for features read or
 * written by the format.  Options passed to read or write methods will take precedence.
 * @property {string} [geometryName] Geometry name to use when creating features.
 * @property {boolean} [extractGeometryName=false] Certain GeoJSON providers include
 * the geometry_name field in the feature GeoJSON. If set to `true` the GeoJSON reader
 * will look for that field to set the geometry name. If both this field is set to `true`
 * and a `geometryName` is provided, the `geometryName` will take precedence.
 * @property {import("../Feature.js").FeatureClass} [featureClass] Feature class
 * to be used when reading features. The default is {@link module:ol/Feature~Feature}. If performance is
 * the primary concern, and features are not going to be modified or round-tripped through the format,
 * consider using {@link module:ol/render/Feature~RenderFeature}
 */
/**
 * @classdesc
 * Feature format for reading and writing data in the GeoJSON format.
 *
 * @api
 */
declare class GeoJSON extends JSONFeature {
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
     * Look for the geometry name in the feature GeoJSON
     * @type {boolean|undefined}
     * @private
     */
    private extractGeometryName_;
    /**
     * @param {GeoJSONGeometry} object Object.
     * @param {import("./Feature.js").ReadOptions} [options] Read options.
     * @protected
     * @return {import("../geom/Geometry.js").default} Geometry.
     */
    protected readGeometryFromObject(object: GeoJSONGeometry, options?: import("./Feature.js").ReadOptions | undefined): import("../geom/Geometry.js").default;
    /**
     * Encode a feature as a GeoJSON Feature object.
     *
     * @param {import("../Feature.js").default} feature Feature.
     * @param {import("./Feature.js").WriteOptions} [options] Write options.
     * @return {GeoJSONFeature} Object.
     * @api
     */
    writeFeatureObject(feature: import("../Feature.js").default, options?: import("./Feature.js").WriteOptions | undefined): GeoJSONFeature;
    /**
     * Encode an array of features as a GeoJSON object.
     *
     * @param {Array<import("../Feature.js").default>} features Features.
     * @param {import("./Feature.js").WriteOptions} [options] Write options.
     * @return {GeoJSONFeatureCollection} GeoJSON Object.
     * @api
     */
    writeFeaturesObject(features: Array<import("../Feature.js").default>, options?: import("./Feature.js").WriteOptions | undefined): GeoJSONFeatureCollection;
    /**
     * Encode a geometry as a GeoJSON object.
     *
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {import("./Feature.js").WriteOptions} [options] Write options.
     * @return {GeoJSONGeometry|GeoJSONGeometryCollection} Object.
     * @api
     */
    writeGeometryObject(geometry: import("../geom/Geometry.js").default, options?: import("./Feature.js").WriteOptions | undefined): GeoJSONGeometry | GeoJSONGeometryCollection;
}
import JSONFeature from './JSONFeature.js';
//# sourceMappingURL=GeoJSON.d.ts.map