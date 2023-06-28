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
     * Amount of numerical values composing the attribute, either 1, 2, 3 or 4; in case size is > 1, the return value
     * of the callback should be an array; if unspecified, assumed to be a single float value
     */
    size?: number | undefined;
    /**
     * This callback computes the numerical value of the
     * attribute for a given feature.
     */
    callback: (arg0: import("../../Feature").FeatureLike) => number | Array<number>;
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
     * Amount of numerical values taken by the custom attributes
     * @type {number}
     * @protected
     */
    protected customAttributesSize: number;
    /**
     * Rebuild rendering instructions and generate webgl buffers from them
     * @param {import("./MixedGeometryBatch.js").GeometryBatch} batch Geometry batch
     * @param {import("../../transform.js").Transform} currentTransform Transform
     * @param {import("../../geom/Geometry.js").Type} geometryType Geometry type
     * @param {function(): void} callback Function called once the render buffers are updated
     */
    rebuild(batch: import("./MixedGeometryBatch.js").GeometryBatch, currentTransform: import("../../transform.js").Transform, geometryType: import("../../geom/Geometry.js").Type, callback: () => void): void;
    /**
     * Render the geometries in the batch. This will also update the current transform used for rendering according to
     * the invert transform of the webgl buffers
     * @param {import("./MixedGeometryBatch.js").GeometryBatch} batch Geometry batch
     */
    render(batch: import("./MixedGeometryBatch.js").GeometryBatch): void;
    /**
     * Render the geometries in the batch. This will also update the current transform used for rendering according to
     * the invert transform of the webgl buffers
     * @param {import("./MixedGeometryBatch.js").GeometryBatch} batch Geometry batch
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     */
    preRender(batch: import("./MixedGeometryBatch.js").GeometryBatch, frameState: import("../../Map.js").FrameState): void;
    /**
     * Rebuild rendering instructions based on the provided frame state
     * This is specific to the geometry type and has to be implemented by subclasses.
     * @param {import("./MixedGeometryBatch.js").GeometryBatch} batch Geometry batch
     * @protected
     */
    protected generateRenderInstructions(batch: import("./MixedGeometryBatch.js").GeometryBatch): void;
    /**
     * Rebuild internal webgl buffers for rendering based on the current rendering instructions;
     * This is asynchronous: webgl buffers will _not_ be updated right away
     * @param {import("./MixedGeometryBatch.js").GeometryBatch} batch Geometry batch
     * @param {import("../../geom/Geometry.js").Type} geometryType Geometry type
     * @param {function(): void} callback Function called once the render buffers are updated
     * @private
     */
    private generateBuffers_;
    /**
     * @protected
     * @param {import("./MixedGeometryBatch.js").GeometryBatch} batch Geometry batch
     * @param {import("./MixedGeometryBatch.js").GeometryBatchItem} batchEntry Batch item
     * @param {number} currentIndex Current index
     * @return {number} The amount of values pushed
     */
    protected pushCustomAttributesInRenderInstructions(batch: import("./MixedGeometryBatch.js").GeometryBatch, batchEntry: import("./MixedGeometryBatch.js").GeometryBatchItem, currentIndex: number): number;
}
//# sourceMappingURL=BatchRenderer.d.ts.map