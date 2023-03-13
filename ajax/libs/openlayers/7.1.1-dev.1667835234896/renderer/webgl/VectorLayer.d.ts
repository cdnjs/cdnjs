export default WebGLVectorLayerRenderer;
/**
 * A callback computing
 * the value of a custom attribute (different for each feature) to be passed on to the GPU.
 * Properties are available as 2nd arg for quicker access.
 */
export type CustomAttributeCallback = (arg0: import("../../Feature").default, arg1: {
    [x: string]: any;
}) => number;
/**
 * An object containing both shaders (vertex and fragment) as well as the required attributes
 */
export type ShaderProgram = {
    /**
     * Vertex shader source (using the default one if unspecified).
     */
    vertexShader?: string | undefined;
    /**
     * Fragment shader source (using the default one if unspecified).
     */
    fragmentShader?: string | undefined;
    /**
     * Custom attributes made available in the vertex shader.
     * Keys are the names of the attributes which are then accessible in the vertex shader using the `a_` prefix, e.g.: `a_opacity`.
     * Default shaders rely on the attributes in {@link module :ol/render/webgl/shaders~DefaultAttributes}.
     */
    attributes: any;
};
export type Options = {
    /**
     * A CSS class name to set to the canvas element.
     */
    className?: string | undefined;
    /**
     * Attributes and shaders for filling polygons.
     */
    fill?: ShaderProgram | undefined;
    /**
     * Attributes and shaders for line strings and polygon strokes.
     */
    stroke?: ShaderProgram | undefined;
    /**
     * Attributes and shaders for points.
     */
    point?: ShaderProgram | undefined;
    /**
     * Uniform definitions.
     */
    uniforms?: {
        [x: string]: import("../../webgl/Helper.js").UniformValue;
    } | undefined;
    /**
     * Post-processes definitions
     */
    postProcesses?: import("./Layer.js").PostProcessesOptions[] | undefined;
};
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
    fillVertexShader_: string;
    fillFragmentShader_: string;
    fillAttributes_: import("../../render/webgl/BatchRenderer").CustomAttribute[];
    strokeVertexShader_: string;
    strokeFragmentShader_: string;
    strokeAttributes_: import("../../render/webgl/BatchRenderer").CustomAttribute[];
    pointVertexShader_: string;
    pointFragmentShader_: string;
    pointAttributes_: import("../../render/webgl/BatchRenderer").CustomAttribute[];
    /**
     * @private
     */
    private worker_;
    /**
     * @private
     */
    private batch_;
    sourceListenKeys_: import("../../events.js").EventsKey[];
    polygonRenderer_: PolygonBatchRenderer | undefined;
    pointRenderer_: PointBatchRenderer | undefined;
    lineStringRenderer_: LineStringBatchRenderer | undefined;
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
     * Render the layer.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @return {HTMLElement} The rendered element.
     */
    renderFrame(frameState: import("../../Map.js").FrameState): HTMLElement;
}
import WebGLLayerRenderer from "./Layer.js";
import PolygonBatchRenderer from "../../render/webgl/PolygonBatchRenderer.js";
import PointBatchRenderer from "../../render/webgl/PointBatchRenderer.js";
import LineStringBatchRenderer from "../../render/webgl/LineStringBatchRenderer.js";
//# sourceMappingURL=VectorLayer.d.ts.map