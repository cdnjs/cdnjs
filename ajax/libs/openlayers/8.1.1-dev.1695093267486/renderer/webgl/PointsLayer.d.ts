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
    callback: (arg0: import("../../Feature").default, arg1: {
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
    feature: import("../../Feature").default;
    /**
     * Feature properties
     */
    properties: {
        [x: string]: any;
    };
    /**
     * Feature geometry
     */
    geometry: import("../../geom").Geometry;
};
export type Options = {
    /**
     * A CSS class name to set to the canvas element.
     */
    className?: string | undefined;
    /**
     * These attributes will be read from the features in the source and then
     * passed to the GPU. The `name` property of each attribute will serve as its identifier:
     * * In the vertex shader as an `attribute` by prefixing it with `a_`
     * * In the fragment shader as a `varying` by prefixing it with `v_`
     * Please note that these can only be numerical values.
     */
    attributes?: CustomAttribute[] | undefined;
    /**
     * Vertex shader source, mandatory.
     */
    vertexShader: string;
    /**
     * Fragment shader source, mandatory.
     */
    fragmentShader: string;
    /**
     * Whether shader is hit detection aware.
     */
    hitDetectionEnabled?: boolean | undefined;
    /**
     * Uniform definitions for the post process steps
     * Please note that `u_texture` is reserved for the main texture slot and `u_opacity` is reserved for the layer opacity.
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
 * @property {boolean} [hitDetectionEnabled] Whether shader is hit detection aware.
 * @property {Object<string,import("../../webgl/Helper").UniformValue>} [uniforms] Uniform definitions for the post process steps
 * Please note that `u_texture` is reserved for the main texture slot and `u_opacity` is reserved for the layer opacity.
 * @property {Array<import("./Layer").PostProcessesOptions>} [postProcesses] Post-processes definitions
 */
/**
 * @classdesc
 * WebGL vector renderer optimized for points.
 * All features will be rendered as quads (two triangles forming a square). New data will be flushed to the GPU
 * every time the vector source changes.
 *
 * You need to provide vertex and fragment shaders for rendering. This can be done using
 * {@link module:ol/webgl/ShaderBuilder~ShaderBuilder} utilities. These shaders shall expect a `a_position` attribute
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
 * The following uniform is used for the layer opacity: `u_opacity`.
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
    constructor(layer: import("../../layer/Layer.js").default, options: Options);
    sourceRevision_: number;
    verticesBuffer_: WebGLArrayBuffer;
    indicesBuffer_: WebGLArrayBuffer;
    /**
     * @private
     */
    private vertexShader_;
    /**
     * @private
     */
    private fragmentShader_;
    /**
     * @type {WebGLProgram}
     * @private
     */
    private program_;
    /**
     * @type {boolean}
     * @private
     */
    private hitDetectionEnabled_;
    /**
     * A list of attributes used by the renderer. By default only the position and
     * index of the vertex (0 to 3) are required.
     * @type {Array<import('../../webgl/Helper.js').AttributeDescription>}
     */
    attributes: Array<import('../../webgl/Helper.js').AttributeDescription>;
    customAttributes: CustomAttribute[];
    previousExtent_: import("../../extent.js").Extent;
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
     * @type {WebGLRenderTarget}
     * @private
     */
    private hitRenderTarget_;
    /**
     * Keep track of latest message sent to worker
     * @type {number}
     * @private
     */
    private lastSentId;
    /**
     * @private
     */
    private worker_;
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
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @return {HTMLElement} The rendered element.
     */
    renderFrame(frameState: import("../../Map.js").FrameState): HTMLElement;
    /**
     * Rebuild internal webgl buffers based on current view extent; costly, should not be called too much
     * @param {import("../../Map").FrameState} frameState Frame state.
     * @private
     */
    private rebuildBuffers_;
    /**
     * Render the world, either to the main framebuffer or to the hit framebuffer
     * @param {import("../../Map.js").FrameState} frameState current frame state
     * @param {boolean} forHitDetection whether the rendering is for hit detection
     * @param {number} startWorld the world to render in the first iteration
     * @param {number} endWorld the last world to render
     * @param {number} worldWidth the width of the worlds being rendered
     */
    renderWorlds(frameState: import("../../Map.js").FrameState, forHitDetection: boolean, startWorld: number, endWorld: number, worldWidth: number): void;
}
import WebGLLayerRenderer from './Layer.js';
import WebGLArrayBuffer from '../../webgl/Buffer.js';
//# sourceMappingURL=PointsLayer.d.ts.map