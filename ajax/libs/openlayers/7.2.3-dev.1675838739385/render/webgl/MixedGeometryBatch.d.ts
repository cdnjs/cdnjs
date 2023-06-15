export default MixedGeometryBatch;
/**
 * Object that holds a reference to a feature as well as the raw coordinates of its various geometries
 */
export type GeometryBatchItem = {
    /**
     * Feature
     */
    feature: import("../../Feature").default;
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
     * Render instructions for polygons are structured like so:
     * [ numberOfRings, numberOfVerticesInRing0, ..., numberOfVerticesInRingN, x0, y0, customAttr0, ..., xN, yN, customAttrN, numberOfRings,... ]
     */
    renderInstructions: Float32Array;
    /**
     * Vertices WebGL buffer
     */
    verticesBuffer: WebGLArrayBuffer;
    /**
     * Indices WebGL buffer
     */
    indicesBuffer: WebGLArrayBuffer;
    /**
     * Converts world space coordinates to screen space; applies to the rendering instructions
     */
    renderInstructionsTransform: import("../../transform.js").Transform;
    /**
     * Converts world space coordinates to screen space; applies to the webgl vertices buffer
     */
    verticesBufferTransform: import("../../transform.js").Transform;
    /**
     * Screen space to world space; applies to the webgl vertices buffer
     */
    invertVerticesBufferTransform: import("../../transform.js").Transform;
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
     * Render instructions for polygons are structured like so:
     * [ numberOfRings, numberOfVerticesInRing0, ..., numberOfVerticesInRingN, x0, y0, customAttr0, ..., xN, yN, customAttrN, numberOfRings,... ]
     */
    renderInstructions: Float32Array;
    /**
     * Vertices WebGL buffer
     */
    verticesBuffer: WebGLArrayBuffer;
    /**
     * Indices WebGL buffer
     */
    indicesBuffer: WebGLArrayBuffer;
    /**
     * Converts world space coordinates to screen space; applies to the rendering instructions
     */
    renderInstructionsTransform: import("../../transform.js").Transform;
    /**
     * Converts world space coordinates to screen space; applies to the webgl vertices buffer
     */
    verticesBufferTransform: import("../../transform.js").Transform;
    /**
     * Screen space to world space; applies to the webgl vertices buffer
     */
    invertVerticesBufferTransform: import("../../transform.js").Transform;
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
    /**
     * Render instructions for polygons are structured like so:
     * [ numberOfRings, numberOfVerticesInRing0, ..., numberOfVerticesInRingN, x0, y0, customAttr0, ..., xN, yN, customAttrN, numberOfRings,... ]
     */
    renderInstructions: Float32Array;
    /**
     * Vertices WebGL buffer
     */
    verticesBuffer: WebGLArrayBuffer;
    /**
     * Indices WebGL buffer
     */
    indicesBuffer: WebGLArrayBuffer;
    /**
     * Converts world space coordinates to screen space; applies to the rendering instructions
     */
    renderInstructionsTransform: import("../../transform.js").Transform;
    /**
     * Converts world space coordinates to screen space; applies to the webgl vertices buffer
     */
    verticesBufferTransform: import("../../transform.js").Transform;
    /**
     * Screen space to world space; applies to the webgl vertices buffer
     */
    invertVerticesBufferTransform: import("../../transform.js").Transform;
};
/**
 * @typedef {Object} GeometryBatchItem Object that holds a reference to a feature as well as the raw coordinates of its various geometries
 * @property {import("../../Feature").default} feature Feature
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
 * @property {Float32Array} renderInstructions Render instructions for polygons are structured like so:
 * [ numberOfRings, numberOfVerticesInRing0, ..., numberOfVerticesInRingN, x0, y0, customAttr0, ..., xN, yN, customAttrN, numberOfRings,... ]
 * @property {WebGLArrayBuffer} verticesBuffer Vertices WebGL buffer
 * @property {WebGLArrayBuffer} indicesBuffer Indices WebGL buffer
 * @property {import("../../transform.js").Transform} renderInstructionsTransform Converts world space coordinates to screen space; applies to the rendering instructions
 * @property {import("../../transform.js").Transform} verticesBufferTransform Converts world space coordinates to screen space; applies to the webgl vertices buffer
 * @property {import("../../transform.js").Transform} invertVerticesBufferTransform Screen space to world space; applies to the webgl vertices buffer
 * @property {number} verticesCount Amount of vertices from geometries in the batch.
 * @property {number} ringsCount How many outer and inner rings in this batch.
 */
/**
 * @typedef {Object} LineStringGeometryBatch A geometry batch specific to lines
 * @property {Object<string, GeometryBatchItem>} entries Dictionary of all entries in the batch with associated computed values.
 * One entry corresponds to one feature. Key is feature uid.
 * @property {number} geometriesCount Amount of geometries in the batch.
 * @property {Float32Array} renderInstructions Render instructions for polygons are structured like so:
 * [ numberOfRings, numberOfVerticesInRing0, ..., numberOfVerticesInRingN, x0, y0, customAttr0, ..., xN, yN, customAttrN, numberOfRings,... ]
 * @property {WebGLArrayBuffer} verticesBuffer Vertices WebGL buffer
 * @property {WebGLArrayBuffer} indicesBuffer Indices WebGL buffer
 * @property {import("../../transform.js").Transform} renderInstructionsTransform Converts world space coordinates to screen space; applies to the rendering instructions
 * @property {import("../../transform.js").Transform} verticesBufferTransform Converts world space coordinates to screen space; applies to the webgl vertices buffer
 * @property {import("../../transform.js").Transform} invertVerticesBufferTransform Screen space to world space; applies to the webgl vertices buffer
 * @property {number} verticesCount Amount of vertices from geometries in the batch.
 */
/**
 * @typedef {Object} PointGeometryBatch A geometry batch specific to points
 * @property {Object<string, GeometryBatchItem>} entries Dictionary of all entries in the batch with associated computed values.
 * One entry corresponds to one feature. Key is feature uid.
 * @property {number} geometriesCount Amount of geometries in the batch.
 * @property {Float32Array} renderInstructions Render instructions for polygons are structured like so:
 * [ numberOfRings, numberOfVerticesInRing0, ..., numberOfVerticesInRingN, x0, y0, customAttr0, ..., xN, yN, customAttrN, numberOfRings,... ]
 * @property {WebGLArrayBuffer} verticesBuffer Vertices WebGL buffer
 * @property {WebGLArrayBuffer} indicesBuffer Indices WebGL buffer
 * @property {import("../../transform.js").Transform} renderInstructionsTransform Converts world space coordinates to screen space; applies to the rendering instructions
 * @property {import("../../transform.js").Transform} verticesBufferTransform Converts world space coordinates to screen space; applies to the webgl vertices buffer
 * @property {import("../../transform.js").Transform} invertVerticesBufferTransform Screen space to world space; applies to the webgl vertices buffer
 */
/**
 * @classdesc This class is used to group several geometries of various types together for faster rendering.
 * Three inner batches are maintained for polygons, lines and points. Each time a feature is added, changed or removed
 * from the batch, these inner batches are modified accordingly in order to keep them up-to-date.
 *
 * A feature can be present in several inner batches, for example a polygon geometry will be present in the polygon batch
 * and its linar rings will be present in the line batch. Multi geometries are also broken down into individual geometries
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
     * @param {Array<import("../../Feature").default>} features Array of features to add to the batch
     */
    addFeatures(features: Array<import("../../Feature").default>): void;
    /**
     * @param {import("../../Feature").default} feature Feature to add to the batch
     */
    addFeature(feature: import("../../Feature").default): void;
    /**
     * @param {import("../../Feature").default} feature Feature
     * @return {GeometryBatchItem} Batch item added (or existing one)
     * @private
     */
    private addFeatureEntryInPointBatch_;
    /**
     * @param {import("../../Feature").default} feature Feature
     * @return {GeometryBatchItem} Batch item added (or existing one)
     * @private
     */
    private addFeatureEntryInLineStringBatch_;
    /**
     * @param {import("../../Feature").default} feature Feature
     * @return {GeometryBatchItem} Batch item added (or existing one)
     * @private
     */
    private addFeatureEntryInPolygonBatch_;
    /**
     * @param {import("../../Feature").default} feature Feature
     * @private
     */
    private clearFeatureEntryInPointBatch_;
    /**
     * @param {import("../../Feature").default} feature Feature
     * @private
     */
    private clearFeatureEntryInLineStringBatch_;
    /**
     * @param {import("../../Feature").default} feature Feature
     * @private
     */
    private clearFeatureEntryInPolygonBatch_;
    /**
     * @param {import("../../geom").Geometry} geometry Geometry
     * @param {import("../../Feature").default} feature Feature
     * @private
     */
    private addGeometry_;
    /**
     * @param {import("../../Feature").default} feature Feature
     */
    changeFeature(feature: import("../../Feature").default): void;
    /**
     * @param {import("../../Feature").default} feature Feature
     */
    removeFeature(feature: import("../../Feature").default): void;
    clear(): void;
}
import WebGLArrayBuffer from "../../webgl/Buffer.js";
//# sourceMappingURL=MixedGeometryBatch.d.ts.map