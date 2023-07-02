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
     * @param {Array<import("../render/webgl/VectorStyleRenderer.js").default>} styleRenderers Array of vector style renderers
     */
    constructor(options: import("./BaseTileRepresentation.js").TileRepresentationOptions<TileType>, styleRenderers: Array<import("../render/webgl/VectorStyleRenderer.js").default>);
    /**
     * @private
     */
    private batch_;
    /**
     * @private
     */
    private styleRenderers_;
    /**
     * @type {Array<import("../render/webgl/VectorStyleRenderer.js").WebGLBuffers>}
     */
    buffers: Array<import("../render/webgl/VectorStyleRenderer.js").WebGLBuffers>;
}
import BaseTileRepresentation from './BaseTileRepresentation.js';
//# sourceMappingURL=TileGeometry.d.ts.map