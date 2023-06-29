export default TileGeometry;
export type TileType = import("../VectorRenderTile").default;
/**
 * @typedef {import("../VectorRenderTile").default} TileType
 */
/**
 * @extends {BaseTileRepresentation<TileType>}
 */
declare class TileGeometry extends BaseTileRepresentation<import("../VectorRenderTile").default> {
    /**
     * @param {import("./BaseTileRepresentation.js").TileRepresentationOptions<TileType>} options The tile texture options.
     * @param {import("../render/webgl/PolygonBatchRenderer.js").default} polygonRenderer Polygon renderer
     * @param {import("../render/webgl/LineStringBatchRenderer.js").default} lineStringRenderer Linestring renderer
     * @param {import("../render/webgl/PointBatchRenderer.js").default} pointRenderer Point renderer
     */
    constructor(options: import("./BaseTileRepresentation.js").TileRepresentationOptions<TileType>, polygonRenderer: import("../render/webgl/PolygonBatchRenderer.js").default, lineStringRenderer: import("../render/webgl/LineStringBatchRenderer.js").default, pointRenderer: import("../render/webgl/PointBatchRenderer.js").default);
    batch: MixedGeometryBatch;
    /**
     * @private
     */
    private polygonRenderer_;
    /**
     * @private
     */
    private lineStringRenderer_;
    /**
     * @private
     */
    private pointRenderer_;
    /**
     * @private
     */
    private renderInstructionsTransform_;
}
import BaseTileRepresentation from './BaseTileRepresentation.js';
import MixedGeometryBatch from '../render/webgl/MixedGeometryBatch.js';
//# sourceMappingURL=TileGeometry.d.ts.map