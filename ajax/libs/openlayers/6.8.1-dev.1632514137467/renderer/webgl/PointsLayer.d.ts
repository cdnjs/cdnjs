export default WebGLPointsLayerRenderer;
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
     * attribute for a given feature (properties are available as 2nd arg for quicker access).
     */
    callback: (arg0: import("../../Feature.js").default<any>, arg1: {
        [x: string]: any;
    }) => number;
};
/**
 * Object that holds a reference to a feature, its geometry and properties. Used to optimize
 * rebuildBuffers by accessing these objects quicker.
 */
export type FeatureCacheItem = {
    /**
     * Feature
     */
    feature: import("../../Feature.js").default<any>;
    /**
     * Feature properties
     */
    properties: {
        [x: string]: any;
    };
    /**
     * Feature geometry
     */
    geometry: import("../../geom/Geometry.js").default;
};
export type Options = {
    /**
     * A CSS class name to set to the canvas element.
     */
    className?: string;
    /**
     * These attributes will be read from the features in the source and then
     * passed to the GPU. The `name` property of each attribute will serve as its identifier:
     * * In the vertex shader as an `attribute` by prefixing it with `a_`
     * * In the fragment shader as a `varying` by prefixing it with `v_`
     * Please note that these can only be numerical values.
     */
    attributes?: CustomAttribute[];
    /**
     * Vertex shader source, mandatory.
     */
    vertexShader: string;
    /**
     * Fragment shader source, mandatory.
     */
    fragmentShader: string;
    /**
     * Vertex shader source for hit detection rendering.
     */
    hitVertexShader?: string;
    /**
     * Fragment shader source for hit detection rendering.
     */
    hitFragmentShader?: string;
    /**
     * Uniform definitions for the post process steps
     * Please note that `u_texture` is reserved for the main texture slot.
     */
    uniforms?: {
        [x: string]: number | number[] | HTMLCanvasElement | HTMLImageElement | ImageData | ((arg0: import("../../PluggableMap.js").FrameState) => number | number[] | HTMLCanvasElement | HTMLImageElement | ImageData);
    };
    /**
     * Post-processes definitions
     */
    postProcesses?: import("./Layer.js").PostProcessesOptions[];
};
/**
 * @typedef {Object} CustomAttribute A description of a custom attribute to be passed on to the GPU, with a value different
 * for each feature.
 * @property {string} name Attribute name.
 * @property {function(import("../../Feature").default, Object<string, *>):number} callback This callback computes the numerical value of the
 * attribute for a given feature (properties are available as 2nd arg for quicker access).
 */
/**
 * @typedef {Object} FeatureCacheItem Object that holds a reference to a feature, its geometry and properties. Used to optimize
 * rebuildBuffers by accessing these objects quicker.
 * @property {import("../../Feature").default} feature Feature
 * @property {Object<string, *>} properties Feature properties
 * @property {import("../../geom").Geometry} geometry Feature geometry
 */
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the canvas element.
 * @property {Array<CustomAttribute>} [attributes] These attributes will be read from the features in the source and then
 * passed to the GPU. The `name` property of each attribute will serve as its identifier:
 *  * In the vertex shader as an `attribute` by prefixing it with `a_`
 *  * In the fragment shader as a `varying` by prefixing it with `v_`
 * Please note that these can only be numerical values.
 * @property {string} vertexShader Vertex shader source, mandatory.
 * @property {string} fragmentShader Fragment shader source, mandatory.
 * @property {string} [hitVertexShader] Vertex shader source for hit detection rendering.
 * @property {string} [hitFragmentShader] Fragment shader source for hit detection rendering.
 * @property {Object<string,import("../../webgl/Helper").UniformValue>} [uniforms] Uniform definitions for the post process steps
 * Please note that `u_texture` is reserved for the main texture slot.
 * @property {Array<import("./Layer").PostProcessesOptions>} [postProcesses] Post-processes definitions
 */
/**
 * @classdesc
 * WebGL vector renderer optimized for points.
 * All features will be rendered as quads (two triangles forming a square). New data will be flushed to the GPU
 * every time the vector source changes.
 *
 * You need to provide vertex and fragment shaders for rendering. This can be done using
 * {@link module:ol/webgl/ShaderBuilder} utilities. These shaders shall expect a `a_position` attribute
 * containing the screen-space projected center of the quad, as well as a `a_index` attribute
 * whose value (0, 1, 2 or 3) indicates which quad vertex is currently getting processed (see structure below).
 *
 * To include variable attributes in the shaders, you need to declare them using the `attributes` property of
 * the options object like so:
 * ```js
 * new WebGLPointsLayerRenderer(layer, {
 *   attributes: [
 *     {
 *       name: 'size',
 *       callback: function(feature) {
 *         // compute something with the feature
 *       }
 *     },
 *     {
 *       name: 'weight',
 *       callback: function(feature) {
 *         // compute something with the feature
 *       }
 *     },
 *   ],
 *   vertexShader:
 *     // shader using attribute a_weight and a_size
 *   fragmentShader:
 *     // shader using varying v_weight and v_size
 * ```
 *
 * To enable hit detection, you must as well provide dedicated shaders using the `hitVertexShader`
 * and `hitFragmentShader` properties. These shall expect the `a_hitColor` attribute to contain
 * the final color that will have to be output for hit detection to work.
 *
 * The following uniform is used for the main texture: `u_texture`.
 *
 * Please note that the main shader output should have premultiplied alpha, otherwise visual anomalies may occur.
 *
 * Points are rendered as quads with the following structure:
 *
 * ```
 *   (u0, v1)      (u1, v1)
 *  [3]----------[2]
 *   |`           |
 *   |  `         |
 *   |    `       |
 *   |      `     |
 *   |        `   |
 *   |          ` |
 *  [0]----------[1]
 *   (u0, v0)      (u1, v0)
 *  ```
 *
 * This uses {@link module:ol/webgl/Helper~WebGLHelper} internally.
 *
 * @api
 */
declare class WebGLPointsLayerRenderer extends WebGLLayerRenderer<any> {
    /**
     * @param {import("../../layer/Layer.js").default} layer Layer.
     * @param {Options} options Options.
     */
    constructor(layer: import("../../layer/Layer.js").default<any>, options: Options);
    sourceRevision_: number;
    verticesBuffer_: WebGLArrayBuffer;
    hitVerticesBuffer_: WebGLArrayBuffer;
    indicesBuffer_: WebGLArrayBuffer;
    program_: WebGLProgram;
    /**
     * @type {boolean}
     * @private
     */
    private hitDetectionEnabled_;
    hitProgram_: false | WebGLProgram;
    /**
     * A list of attributes used by the renderer. By default only the position and
     * index of the vertex (0 to 3) are required.
     * @type {Array<import('../../webgl/Helper.js').AttributeDescription>}
     */
    attributes: Array<import('../../webgl/Helper.js').AttributeDescription>;
    /**
     * A list of attributes used for hit detection.
     * @type {Array<import('../../webgl/Helper.js').AttributeDescription>}
     */
    hitDetectionAttributes: Array<import('../../webgl/Helper.js').AttributeDescription>;
    customAttributes: CustomAttribute[];
    previousExtent_: number[];
    /**
     * This transform is updated on every frame and is the composition of:
     * - invert of the world->screen transform that was used when rebuilding buffers (see `this.renderTransform_`)
     * - current world->screen transform
     * @type {import("../../transform.js").Transform}
     * @private
     */
    private currentTransform_;
    /**
     * This transform is updated when buffers are rebuilt and converts world space coordinates to screen space
     * @type {import("../../transform.js").Transform}
     * @private
     */
    private renderTransform_;
    /**
     * @type {import("../../transform.js").Transform}
     * @private
     */
    private invertRenderTransform_;
    /**
     * @type {Float32Array}
     * @private
     */
    private renderInstructions_;
    /**
     * These instructions are used for hit detection
     * @type {Float32Array}
     * @private
     */
    private hitRenderInstructions_;
    /**
     * @type {WebGLRenderTarget}
     * @private
     */
    private hitRenderTarget_;
    worker_: Worker;
    /**
     * This object will be updated when the source changes. Key is uid.
     * @type {Object<string, FeatureCacheItem>}
     * @private
     */
    private featureCache_;
    /**
     * Amount of features in the cache.
     * @type {number}
     * @private
     */
    private featureCount_;
    sourceListenKeys_: import("../../events.js").EventsKey[];
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
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @return {HTMLElement} The rendered element.
     */
    renderFrame(frameState: import("../../PluggableMap.js").FrameState): HTMLElement;
    /**
     * Rebuild internal webgl buffers based on current view extent; costly, should not be called too much
     * @param {import("../../PluggableMap").FrameState} frameState Frame state.
     * @private
     */
    private rebuildBuffers_;
    /**
     * Render the hit detection data to the corresponding render target
     * @param {import("../../PluggableMap.js").FrameState} frameState current frame state
     */
    renderHitDetection(frameState: import("../../PluggableMap.js").FrameState): void;
}
import WebGLLayerRenderer from "./Layer.js";
import WebGLArrayBuffer from "../../webgl/Buffer.js";
//# sourceMappingURL=PointsLayer.d.ts.map