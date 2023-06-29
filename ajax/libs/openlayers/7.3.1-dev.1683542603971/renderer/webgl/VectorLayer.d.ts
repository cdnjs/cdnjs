export const Uniforms: {
    RENDER_EXTENT: string;
    GLOBAL_ALPHA: string;
    PROJECTION_MATRIX: string;
    OFFSET_SCALE_MATRIX: string;
    OFFSET_ROTATION_MATRIX: string;
    TIME: string;
    ZOOM: string;
    RESOLUTION: string;
    VIEWPORT_SIZE_PX: string;
    PIXEL_RATIO: string;
};
export default WebGLVectorLayerRenderer;
/**
 * A callback computing
 * the value of a custom attribute (different for each feature) to be passed on to the GPU.
 * Properties are available as 2nd arg for quicker access.
 */
export type AttributeCallback = (arg0: import("../../Feature").default) => number | Array<number>;
/**
 * An object containing custom shaders (vertex and fragment); uses attributes and uniforms
 * provided to the renderer
 */
export type CustomShaderProgram = {
    /**
     * Vertex shader source.
     */
    vertexShader: string;
    /**
     * Fragment shader source.
     */
    fragmentShader: string;
};
/**
 * An object containing attribute callbacks for the default shaders
 */
export type DefaultShaderProgram = {
    /**
     * Color value, encoded in a [number, number] array (use the {@link module :ol/webgl/styleparser~packColor} function)
     */
    color?: AttributeCallback | undefined;
    /**
     * Stroke width value
     */
    width?: AttributeCallback | undefined;
};
export type Options = {
    /**
     * A CSS class name to set to the canvas element.
     */
    className?: string | undefined;
    /**
     * Shaders for filling polygons.
     */
    fill?: CustomShaderProgram | DefaultShaderProgram | undefined;
    /**
     * Shaders for line strings and polygon strokes.
     */
    stroke?: CustomShaderProgram | DefaultShaderProgram | undefined;
    /**
     * Shaders for points.
     */
    point?: CustomShaderProgram | DefaultShaderProgram | undefined;
    /**
     * Uniform definitions.
     */
    uniforms?: {
        [x: string]: import("../../webgl/Helper.js").UniformValue;
    } | undefined;
    /**
     * Attribute definitions.
     */
    attributes?: import("../../render/webgl/BatchRenderer.js").CustomAttribute[] | undefined;
    /**
     * Post-processes definitions
     */
    postProcesses?: import("./Layer.js").PostProcessesOptions[] | undefined;
};
/**
 * @typedef {function(import("../../Feature").default):number|Array<number>} AttributeCallback A callback computing
 * the value of a custom attribute (different for each feature) to be passed on to the GPU.
 * Properties are available as 2nd arg for quicker access.
 */
/**
 * @typedef {Object} CustomShaderProgram An object containing custom shaders (vertex and fragment); uses attributes and uniforms
 * provided to the renderer
 * @property {string} vertexShader Vertex shader source.
 * @property {string} fragmentShader Fragment shader source.
 */
/**
 * @typedef {Object} DefaultShaderProgram An object containing attribute callbacks for the default shaders
 * @property {AttributeCallback} [color] Color value, encoded in a [number, number] array (use the {@link module:ol/webgl/styleparser~packColor} function)
 * @property {AttributeCallback} [width] Stroke width value
 */
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the canvas element.
 * @property {CustomShaderProgram|DefaultShaderProgram} [fill] Shaders for filling polygons.
 * @property {CustomShaderProgram|DefaultShaderProgram} [stroke] Shaders for line strings and polygon strokes.
 * @property {CustomShaderProgram|DefaultShaderProgram} [point] Shaders for points.
 * @property {Object<string,import("../../webgl/Helper").UniformValue>} [uniforms] Uniform definitions.
 * @property {Array<import("../../render/webgl/BatchRenderer.js").CustomAttribute>} [attributes] Attribute definitions.
 * @property {Array<import("./Layer").PostProcessesOptions>} [postProcesses] Post-processes definitions
 */
/**
 * @classdesc
 * Experimental WebGL vector renderer. Supports polygons, lines and points:
 *  * Polygons are broken down into triangles
 *  * Lines are rendered as strips of quads
 *  * Points are rendered as quads
 *
 * You need to provide vertex and fragment shaders as well as custom attributes for each type of geometry. All shaders
 * can access the uniforms in the {@link module:ol/webgl/Helper~DefaultUniform} enum.
 * The vertex shaders can access the following attributes depending on the geometry type:
 *  * For polygons: {@link module:ol/render/webgl/PolygonBatchRenderer~Attributes}
 *  * For line strings: {@link module:ol/render/webgl/LineStringBatchRenderer~Attributes}
 *  * For points: {@link module:ol/render/webgl/PointBatchRenderer~Attributes}
 *
 * Please note that the fragment shaders output should have premultiplied alpha, otherwise visual anomalies may occur.
 *
 * Note: this uses {@link module:ol/webgl/Helper~WebGLHelper} internally.
 */
declare class WebGLVectorLayerRenderer extends WebGLLayerRenderer<any> {
    /**
     * @param {import("../../layer/Layer.js").default} layer Layer.
     * @param {Options} options Options.
     */
    constructor(layer: import("../../layer/Layer.js").default, options: Options);
    sourceRevision_: number;
    previousExtent_: import("../../extent.js").Extent;
    /**
     * This transform is updated on every frame and is the composition of:
     * - invert of the world->screen transform that was used when rebuilding buffers (see `this.renderTransform_`)
     * - current world->screen transform
     * @type {import("../../transform.js").Transform}
     * @private
     */
    private currentTransform_;
    tmpTransform_: number[];
    tmpMat4_: number[];
    /**
     * @type {import("../../transform.js").Transform}
     * @private
     */
    private currentFrameStateTransform_;
    /**
     * @private
     */
    private worker_;
    /**
     * @type {PolygonBatchRenderer}
     * @private
     */
    private polygonRenderer_;
    /**
     * @type {PointBatchRenderer}
     * @private
     */
    private pointRenderer_;
    /**
     * @type {LineStringBatchRenderer}
     * @private
     */
    private lineStringRenderer_;
    /**
     * @type {string}
     * @private
     */
    private fillVertexShader_;
    /**
     * @type {string}
     * @private
     */
    private fillFragmentShader_;
    /**
     * @type {string}
     * @private
     */
    private strokeVertexShader_;
    /**
     * @type {string}
     * @private
     */
    private strokeFragmentShader_;
    /**
     * @type {string}
     * @private
     */
    private pointVertexShader_;
    /**
     * @type {string}
     * @private
     */
    private pointFragmentShader_;
    /**
     * @type {Array<import('../../render/webgl/BatchRenderer.js').CustomAttribute>}
     * @private
     */
    private fillAttributes_;
    /**
     * @type {Array<import('../../render/webgl/BatchRenderer.js').CustomAttribute>}
     * @private
     */
    private strokeAttributes_;
    /**
     * @type {Array<import('../../render/webgl/BatchRenderer.js').CustomAttribute>}
     * @private
     */
    private pointAttributes_;
    /**
     * @private
     */
    private batch_;
    sourceListenKeys_: import("../../events.js").EventsKey[];
    /**
     * @param {Options} options Options.
     * @private
     */
    private applyOptions_;
    /**
     * @private
     */
    private createRenderers_;
    reset(options: any): void;
    /**
     * @param {import("../../source/Vector.js").VectorSourceEvent} event Event.
     * @private
     */
    private handleSourceFeatureAdded_;
    /**
     * @param {import("../../source/Vector.js").VectorSourceEvent} event Event.
     * @private
     */
    private handleSourceFeatureChanged_;
    /**
     * @param {import("../../source/Vector.js").VectorSourceEvent} event Event.
     * @private
     */
    private handleSourceFeatureDelete_;
    /**
     * @private
     */
    private handleSourceFeatureClear_;
    /**
     * @param {import("../../transform.js").Transform} batchInvertTransform Inverse of the transformation in which geometries are expressed
     * @private
     */
    private applyUniforms_;
    /**
     * Render the layer.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @return {HTMLElement} The rendered element.
     */
    renderFrame(frameState: import("../../Map.js").FrameState): HTMLElement;
}
import WebGLLayerRenderer from './Layer.js';
//# sourceMappingURL=VectorLayer.d.ts.map