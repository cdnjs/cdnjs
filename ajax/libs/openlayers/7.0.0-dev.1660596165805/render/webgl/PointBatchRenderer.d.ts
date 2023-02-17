/**
 * Names of attributes made available to the vertex shader.
 * Please note: changing these *will* break custom shaders!
 */
export type Attributes = string;
export namespace Attributes {
    const POSITION: string;
    const INDEX: string;
}
export default PointBatchRenderer;
declare class PointBatchRenderer extends AbstractBatchRenderer {
    attributes: {
        name: string;
        size: number;
        type: number;
    }[];
    /**
     * Render instructions for lines are structured like so:
     * [ x0, y0, customAttr0, ... , xN, yN, customAttrN ]
     * @param {import("./MixedGeometryBatch.js").PointGeometryBatch} batch Point geometry batch
     * @override
     */
    override generateRenderInstructions(batch: import("./MixedGeometryBatch.js").PointGeometryBatch): void;
}
import AbstractBatchRenderer from "./BatchRenderer.js";
//# sourceMappingURL=PointBatchRenderer.d.ts.map