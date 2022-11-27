export default TopoJSON;
export type TopoJSONTopology = import("topojson-specification").Topology<import("topojson-specification").Objects<import("geojson").GeoJsonProperties>>;
export type TopoJSONGeometryCollection = import("topojson-specification").GeometryCollection<any>;
export type TopoJSONGeometry = import("topojson-specification").NullObject | import("topojson-specification").Point<{}> | import("topojson-specification").MultiPoint<{}> | import("topojson-specification").LineString<{}> | import("topojson-specification").MultiLineString<{}> | import("topojson-specification").Polygon<{}> | import("topojson-specification").MultiPolygon<{}> | import("topojson-specification").GeometryCollection<{}>;
export type TopoJSONPoint = import("topojson-specification").Point<any>;
export type TopoJSONMultiPoint = import("topojson-specification").MultiPoint<any>;
export type TopoJSONLineString = import("topojson-specification").LineString<any>;
export type TopoJSONMultiLineString = import("topojson-specification").MultiLineString<any>;
export type TopoJSONPolygon = import("topojson-specification").Polygon<any>;
export type TopoJSONMultiPolygon = import("topojson-specification").MultiPolygon<any>;
export type Options = {
    /**
     * Default data projection.
     */
    dataProjection?: string | import("../proj/Projection.js").default | undefined;
    /**
     * Set the name of the TopoJSON topology
     * `objects`'s children as feature property with the specified name. This means
     * that when set to `'layer'`, a topology like
     * ```
     * {
     * "type": "Topology",
     * "objects": {
     * "example": {
     * "type": "GeometryCollection",
     * "geometries": []
     * }
     * }
     * }
     * ```
     * will result in features that have a property `'layer'` set to `'example'`.
     * When not set, no property will be added to features.
     */
    layerName?: string;
    /**
     * Names of the TopoJSON topology's
     * `objects`'s children to read features from.  If not provided, features will
     * be read from all children.
     */
    layers?: string[];
};
/**
 * @typedef {import("topojson-specification").Topology} TopoJSONTopology
 * @typedef {import("topojson-specification").GeometryCollection} TopoJSONGeometryCollection
 * @typedef {import("topojson-specification").GeometryObject} TopoJSONGeometry
 * @typedef {import("topojson-specification").Point} TopoJSONPoint
 * @typedef {import("topojson-specification").MultiPoint} TopoJSONMultiPoint
 * @typedef {import("topojson-specification").LineString} TopoJSONLineString
 * @typedef {import("topojson-specification").MultiLineString} TopoJSONMultiLineString
 * @typedef {import("topojson-specification").Polygon} TopoJSONPolygon
 * @typedef {import("topojson-specification").MultiPolygon} TopoJSONMultiPolygon
 */
/**
 * @typedef {Object} Options
 * @property {import("../proj.js").ProjectionLike} [dataProjection='EPSG:4326'] Default data projection.
 * @property {string} [layerName] Set the name of the TopoJSON topology
 * `objects`'s children as feature property with the specified name. This means
 * that when set to `'layer'`, a topology like
 * ```
 * {
 *   "type": "Topology",
 *   "objects": {
 *     "example": {
 *       "type": "GeometryCollection",
 *       "geometries": []
 *     }
 *   }
 * }
 * ```
 * will result in features that have a property `'layer'` set to `'example'`.
 * When not set, no property will be added to features.
 * @property {Array<string>} [layers] Names of the TopoJSON topology's
 * `objects`'s children to read features from.  If not provided, features will
 * be read from all children.
 */
/**
 * @classdesc
 * Feature format for reading data in the TopoJSON format.
 *
 * @api
 */
declare class TopoJSON extends JSONFeature {
    /**
     * @param {Options} [opt_options] Options.
     */
    constructor(opt_options?: Options | undefined);
    /**
     * @private
     * @type {string|undefined}
     */
    private layerName_;
    /**
     * @private
     * @type {?Array<string>}
     */
    private layers_;
}
import JSONFeature from "./JSONFeature.js";
//# sourceMappingURL=TopoJSON.d.ts.map