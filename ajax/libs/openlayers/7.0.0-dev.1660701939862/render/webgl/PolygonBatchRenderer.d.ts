/**
 * Names of attributes made available to the vertex shader.
 * Please note: changing these *will* break custom shaders!
 */
export type Attributes = string;
export namespace Attributes {
    const POSITION: string;
}
export default PolygonBatchRenderer;
declare class PolygonBatchRenderer extends AbstractBatchRenderer {
    attributes: {
        name: string;
        size: number;
        type: number;
    }[];
    /**
     * Render instructions for polygons are structured like so:
     * [ customAttr0, ..., customAttrN, numberOfRings, numberOfVerticesInRing0, ..., numberOfVerticesInRingN, x0, y0, ..., xN, yN, numberOfRings,... ]
     * @param {import("./MixedGeometryBatch.js").PolygonGeometryBatch} batch Polygon geometry batch
     * @override
     */
    override generateRenderInstructions(batch: import("./MixedGeometryBatch.js").PolygonGeometryBatch): void;
}
import AbstractBatchRenderer from "./BatchRenderer.js";
//# sourceMappingURL=PolygonBatchRenderer.d.ts.map