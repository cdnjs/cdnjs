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
     * @param {import("../render/webgl/VectorStyleRenderer.js").default} styleRenderer Vector style renderer
     */
    constructor(options: import("./BaseTileRepresentation.js").TileRepresentationOptions<TileType>, styleRenderer: import("../render/webgl/VectorStyleRenderer.js").default);
    /**
     * @private
     */
    private batch_;
    /**
     * @private
     */
    private styleRenderer_;
    /**
     * @type {import("../render/webgl/VectorStyleRenderer.js").WebGLBuffers}
     */
    buffers: import("../render/webgl/VectorStyleRenderer.js").WebGLBuffers;
    /**
     * Each geometry tile also has a mask which consisted of a quad (two triangles); this mask is intended to
     * be rendered to an offscreen buffer, and be used to correctly mask tiles according to their zoom level
     * during rendering
     */
    maskVertices: WebGLArrayBuffer;
    /**
     * @private
     */
    private generateMaskBuffer_;
}
import BaseTileRepresentation from './BaseTileRepresentation.js';
import WebGLArrayBuffer from './Buffer.js';
//# sourceMappingURL=TileGeometry.d.ts.map