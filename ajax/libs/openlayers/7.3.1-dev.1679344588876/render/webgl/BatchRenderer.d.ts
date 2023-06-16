export default AbstractBatchRenderer;
/**
 * A description of a custom attribute to be passed on to the GPU, with a value different
 * for each feature.
 */
export type CustomAttribute = {
    /**
     * Attribute name.
     */
    name: string;
    /**
     * This callback computes the numerical value of the
     * attribute for a given feature.
     */
    callback: (arg0: import("../../Feature").default) => number;
};
/**
 * @classdesc Abstract class for batch renderers.
 * Batch renderers are meant to render the geometries contained in a {@link module:ol/render/webgl/GeometryBatch}
 * instance. They are responsible for generating render instructions and transforming them into WebGL buffers.
 */
declare class AbstractBatchRenderer {
    /**
     * @param {import("../../webgl/Helper.js").default} helper WebGL helper instance
     * @param {Worker} worker WebGL worker instance
     * @param {string} vertexShader Vertex shader
     * @param {string} fragmentShader Fragment shader
     * @param {Array<CustomAttribute>} customAttributes List of custom attributes
     */
    constructor(helper: import("../../webgl/Helper.js").default, worker: Worker, vertexShader: string, fragmentShader: string, customAttributes: Array<CustomAttribute>);
    /**
     * @type {import("../../webgl/Helper.js").default}
     * @private
     */
    private helper_;
    /**
     * @type {Worker}
     * @private
     */
    private worker_;
    /**
     * @type {WebGLProgram}
     * @private
     */
    private program_;
    /**
     * A list of attributes used by the renderer.
     * @type {Array<import('../../webgl/Helper.js').AttributeDescription>}
     * @protected
     */
    protected attributes: Array<import('../../webgl/Helper.js').AttributeDescription>;
    /**
     * @type {Array<CustomAttribute>}
     * @protected
     */
    protected customAttributes: Array<CustomAttribute>;
    /**
     * Rebuild rendering instructions and webgl buffers based on the provided frame state
     * Note: this is a costly operation.
     * @param {import("./MixedGeometryBatch.js").GeometryBatch} batch Geometry batch
     * @param {import("../../Map").FrameState} frameState Frame state.
     * @param {import("../../geom/Geometry.js").Type} geometryType Geometry type
     * @param {function(): void} callback Function called once the render buffers are updated
     */
    rebuild(batch: import("./MixedGeometryBatch.js").GeometryBatch, frameState: import("../../Map").FrameState, geometryType: import("../../geom/Geometry.js").Type, callback: () => void): void;
    /**
     * Render the geometries in the batch. This will also update the current transform used for rendering according to
     * the invert transform of the webgl buffers
     * @param {import("./MixedGeometryBatch.js").GeometryBatch} batch Geometry batch
     * @param {import("../../transform.js").Transform} currentTransform Transform
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @param {number} offsetX X offset
     */
    render(batch: import("./MixedGeometryBatch.js").GeometryBatch, currentTransform: import("../../transform.js").Transform, frameState: import("../../Map.js").FrameState, offsetX: number): void;
    /**
     * Rebuild rendering instructions based on the provided frame state
     * This is specific to the geometry type and has to be implemented by subclasses.
     * @param {import("./MixedGeometryBatch.js").GeometryBatch} batch Geometry batch
     * @protected
     */
    protected generateRenderInstructions(batch: import("./MixedGeometryBatch.js").GeometryBatch): void;
    /**
     * Rebuild internal webgl buffers for rendering based on the current rendering instructions;
     * This is asynchronous: webgl buffers wil _not_ be updated right away
     * @param {import("./MixedGeometryBatch.js").GeometryBatch} batch Geometry batch
     * @param {import("../../geom/Geometry.js").Type} geometryType Geometry type
     * @param {function(): void} callback Function called once the render buffers are updated
     * @private
     */
    private generateBuffers_;
}
//# sourceMappingURL=BatchRenderer.d.ts.map