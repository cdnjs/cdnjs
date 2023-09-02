export default MixedGeometryBatch;
export type RenderFeature = import("../../render/Feature").default;
export type Feature = import("../../Feature").default;
export type GeometryType = import("../../geom/Geometry.js").Type;
/**
 * Object that holds a reference to a feature as well as the raw coordinates of its various geometries
 */
export type GeometryBatchItem = {
    /**
     * Feature
     */
    feature: Feature | RenderFeature;
    /**
     * Array of flat coordinates arrays, one for each geometry related to the feature
     */
    flatCoordss: Array<Array<number>>;
    /**
     * Only defined for linestring and polygon batches
     */
    verticesCount?: number | undefined;
    /**
     * Only defined for polygon batches
     */
    ringsCount?: number | undefined;
    /**
     * Array of vertices counts in each ring for each geometry; only defined for polygons batches
     */
    ringsVerticesCounts?: number[][] | undefined;
};
export type GeometryBatch = PointGeometryBatch | LineStringGeometryBatch | PolygonGeometryBatch;
/**
 * A geometry batch specific to polygons
 */
export type PolygonGeometryBatch = {
    /**
     * Dictionary of all entries in the batch with associated computed values.
     * One entry corresponds to one feature. Key is feature uid.
     */
    entries: {
        [x: string]: GeometryBatchItem;
    };
    /**
     * Amount of geometries in the batch.
     */
    geometriesCount: number;
    /**
     * Amount of vertices from geometries in the batch.
     */
    verticesCount: number;
    /**
     * How many outer and inner rings in this batch.
     */
    ringsCount: number;
};
/**
 * A geometry batch specific to lines
 */
export type LineStringGeometryBatch = {
    /**
     * Dictionary of all entries in the batch with associated computed values.
     * One entry corresponds to one feature. Key is feature uid.
     */
    entries: {
        [x: string]: GeometryBatchItem;
    };
    /**
     * Amount of geometries in the batch.
     */
    geometriesCount: number;
    /**
     * Amount of vertices from geometries in the batch.
     */
    verticesCount: number;
};
/**
 * A geometry batch specific to points
 */
export type PointGeometryBatch = {
    /**
     * Dictionary of all entries in the batch with associated computed values.
     * One entry corresponds to one feature. Key is feature uid.
     */
    entries: {
        [x: string]: GeometryBatchItem;
    };
    /**
     * Amount of geometries in the batch.
     */
    geometriesCount: number;
};
/**
 * @typedef {import("../../render/Feature").default} RenderFeature
 */
/**
 * @typedef {import("../../Feature").default} Feature
 */
/**
 * @typedef {import("../../geom/Geometry.js").Type} GeometryType
 */
/**
 * @typedef {Object} GeometryBatchItem Object that holds a reference to a feature as well as the raw coordinates of its various geometries
 * @property {Feature|RenderFeature} feature Feature
 * @property {Array<Array<number>>} flatCoordss Array of flat coordinates arrays, one for each geometry related to the feature
 * @property {number} [verticesCount] Only defined for linestring and polygon batches
 * @property {number} [ringsCount] Only defined for polygon batches
 * @property {Array<Array<number>>} [ringsVerticesCounts] Array of vertices counts in each ring for each geometry; only defined for polygons batches
 */
/**
 * @typedef {PointGeometryBatch|LineStringGeometryBatch|PolygonGeometryBatch} GeometryBatch
 */
/**
 * @typedef {Object} PolygonGeometryBatch A geometry batch specific to polygons
 * @property {Object<string, GeometryBatchItem>} entries Dictionary of all entries in the batch with associated computed values.
 * One entry corresponds to one feature. Key is feature uid.
 * @property {number} geometriesCount Amount of geometries in the batch.
 * @property {number} verticesCount Amount of vertices from geometries in the batch.
 * @property {number} ringsCount How many outer and inner rings in this batch.
 */
/**
 * @typedef {Object} LineStringGeometryBatch A geometry batch specific to lines
 * @property {Object<string, GeometryBatchItem>} entries Dictionary of all entries in the batch with associated computed values.
 * One entry corresponds to one feature. Key is feature uid.
 * @property {number} geometriesCount Amount of geometries in the batch.
 * @property {number} verticesCount Amount of vertices from geometries in the batch.
 */
/**
 * @typedef {Object} PointGeometryBatch A geometry batch specific to points
 * @property {Object<string, GeometryBatchItem>} entries Dictionary of all entries in the batch with associated computed values.
 * One entry corresponds to one feature. Key is feature uid.
 * @property {number} geometriesCount Amount of geometries in the batch.
 */
/**
 * @classdesc This class is used to group several geometries of various types together for faster rendering.
 * Three inner batches are maintained for polygons, lines and points. Each time a feature is added, changed or removed
 * from the batch, these inner batches are modified accordingly in order to keep them up-to-date.
 *
 * A feature can be present in several inner batches, for example a polygon geometry will be present in the polygon batch
 * and its linear rings will be present in the line batch. Multi geometries are also broken down into individual geometries
 * and added to the corresponding batches in a recursive manner.
 *
 * Corresponding {@link module:ol/render/webgl/BatchRenderer} instances are then used to generate the render instructions
 * and WebGL buffers (vertices and indices) for each inner batches; render instructions are stored on the inner batches,
 * alongside the transform used to convert world coords to screen coords at the time these instructions were generated.
 * The resulting WebGL buffers are stored on the batches as well.
 *
 * An important aspect of geometry batches is that there is no guarantee that render instructions and WebGL buffers
 * are synchronized, i.e. render instructions can describe a new state while WebGL buffers might not have been written yet.
 * This is why two world-to-screen transforms are stored on each batch: one for the render instructions and one for
 * the WebGL buffers.
 */
declare class MixedGeometryBatch {
    /**
     * @type {PolygonGeometryBatch}
     */
    polygonBatch: PolygonGeometryBatch;
    /**
     * @type {PointGeometryBatch}
     */
    pointBatch: PointGeometryBatch;
    /**
     * @type {LineStringGeometryBatch}
     */
    lineStringBatch: LineStringGeometryBatch;
    /**
     * @param {Array<Feature|RenderFeature>} features Array of features to add to the batch
     */
    addFeatures(features: Array<Feature | RenderFeature>): void;
    /**
     * @param {Feature|RenderFeature} feature Feature to add to the batch
     */
    addFeature(feature: Feature | RenderFeature): void;
    /**
     * @param {Feature|RenderFeature} feature Feature
     * @private
     */
    private clearFeatureEntryInPointBatch_;
    /**
     * @param {Feature|RenderFeature} feature Feature
     * @private
     */
    private clearFeatureEntryInLineStringBatch_;
    /**
     * @param {Feature|RenderFeature} feature Feature
     * @private
     */
    private clearFeatureEntryInPolygonBatch_;
    /**
     * @param {import("../../geom").Geometry|RenderFeature} geometry Geometry
     * @param {Feature|RenderFeature} feature Feature
     * @private
     */
    private addGeometry_;
    /**
     * @param {GeometryType} type Geometry type
     * @param {Array<number>} flatCoords Flat coordinates
     * @param {Array<number> | Array<Array<number>> | null} ends Coordinate ends
     * @param {Feature|RenderFeature} feature Feature
     * @param {string} featureUid Feature uid
     * @private
     */
    private addCoordinates_;
    /**
     * @param {Feature|RenderFeature} feature Feature
     */
    changeFeature(feature: Feature | RenderFeature): void;
    /**
     * @param {Feature|RenderFeature} feature Feature
     */
    removeFeature(feature: Feature | RenderFeature): void;
    clear(): void;
}
//# sourceMappingURL=MixedGeometryBatch.d.ts.map