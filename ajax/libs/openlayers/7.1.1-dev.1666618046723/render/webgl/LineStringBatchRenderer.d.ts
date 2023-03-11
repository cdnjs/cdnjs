/**
 * Names of attributes made available to the vertex shader.
 * Please note: changing these *will* break custom shaders!
 */
export type Attributes = string;
export namespace Attributes {
    const SEGMENT_START: string;
    const SEGMENT_END: string;
    const PARAMETERS: string;
}
export default LineStringBatchRenderer;
declare class LineStringBatchRenderer extends AbstractBatchRenderer {
    attributes: {
        name: string;
        size: number;
        type: number;
    }[];
    /**
     * Render instructions for lines are structured like so:
     * [ customAttr0, ... , customAttrN, numberOfVertices0, x0, y0, ... , xN, yN, numberOfVertices1, ... ]
     * @param {import("./MixedGeometryBatch.js").LineStringGeometryBatch} batch Linestring geometry batch
     * @override
     */
    override generateRenderInstructions(batch: import("./MixedGeometryBatch.js").LineStringGeometryBatch): void;
}
import AbstractBatchRenderer from "./BatchRenderer.js";
//# sourceMappingURL=LineStringBatchRenderer.d.ts.map