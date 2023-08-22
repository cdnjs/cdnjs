export default WebGLLayerRenderer;
export type PostProcessesOptions = {
    /**
     * Scale ratio; if < 1, the post process will render to a texture smaller than
     * the main canvas that will then be sampled up (useful for saving resource on blur steps).
     */
    scaleRatio?: number | undefined;
    /**
     * Vertex shader source
     */
    vertexShader?: string | undefined;
    /**
     * Fragment shader source
     */
    fragmentShader?: string | undefined;
    /**
     * Uniform definitions for the post process step
     */
    uniforms?: {
        [x: string]: import("../../webgl/Helper.js").UniformValue;
    } | undefined;
};
export type Options = {
    /**
     * Uniform definitions for the post process steps
     */
    uniforms?: {
        [x: string]: import("../../webgl/Helper.js").UniformValue;
    } | undefined;
    /**
     * Post-processes definitions
     */
    postProcesses?: PostProcessesOptions[] | undefined;
};
/**
 * @typedef {Object} PostProcessesOptions
 * @property {number} [scaleRatio] Scale ratio; if < 1, the post process will render to a texture smaller than
 * the main canvas that will then be sampled up (useful for saving resource on blur steps).
 * @property {string} [vertexShader] Vertex shader source
 * @property {string} [fragmentShader] Fragment shader source
 * @property {Object<string,import("../../webgl/Helper").UniformValue>} [uniforms] Uniform definitions for the post process step
 */
/**
 * @typedef {Object} Options
 * @property {Object<string,import("../../webgl/Helper").UniformValue>} [uniforms] Uniform definitions for the post process steps
 * @property {Array<PostProcessesOptions>} [postProcesses] Post-processes definitions
 */
/**
 * @classdesc
 * Base WebGL renderer class.
 * Holds all logic related to data manipulation & some common rendering logic
 * @template {import("../../layer/Layer.js").default} LayerType
 * @extends {LayerRenderer<LayerType>}
 */
declare class WebGLLayerRenderer<LayerType extends import("../../layer/Layer.js").default<import("../../source/Source.js").default, LayerRenderer<any>>> extends LayerRenderer<LayerType> {
    /**
     * @param {LayerType} layer Layer.
     * @param {Options} [options] Options.
     */
    constructor(layer: LayerType, options?: Options | undefined);
    /**
     * The transform for viewport CSS pixels to rendered pixels.  This transform is only
     * set before dispatching rendering events.
     * @private
     * @type {import("../../transform.js").Transform}
     */
    private inversePixelTransform_;
    /**
     * @private
     * @type {CanvasRenderingContext2D}
     */
    private pixelContext_;
    /**
     * @private
     */
    private postProcesses_;
    /**
     * @private
     */
    private uniforms_;
    /**
     * @type {WebGLHelper}
     * @protected
     */
    protected helper: WebGLHelper;
    /**
     * @param {WebGLRenderingContext} context The WebGL rendering context.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @protected
     */
    protected dispatchPreComposeEvent(context: WebGLRenderingContext, frameState: import("../../Map.js").FrameState): void;
    /**
     * @param {WebGLRenderingContext} context The WebGL rendering context.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @protected
     */
    protected dispatchPostComposeEvent(context: WebGLRenderingContext, frameState: import("../../Map.js").FrameState): void;
    /**
     * Reset options (only handles uniforms).
     * @param {Options} options Options.
     */
    reset(options: Options): void;
    /**
     * @protected
     */
    protected removeHelper(): void;
    /**
     * @protected
     */
    protected afterHelperCreated(): void;
    /**
     * Determine whether renderFrame should be called.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @return {boolean} Layer is ready to be rendered.
     * @protected
     */
    protected prepareFrameInternal(frameState: import("../../Map.js").FrameState): boolean;
    /**
     * @param {import("../../render/EventType.js").default} type Event type.
     * @param {WebGLRenderingContext} context The rendering context.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @private
     */
    private dispatchRenderEvent_;
    /**
     * @param {WebGLRenderingContext} context The rendering context.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @protected
     */
    protected preRender(context: WebGLRenderingContext, frameState: import("../../Map.js").FrameState): void;
    /**
     * @param {WebGLRenderingContext} context The rendering context.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @protected
     */
    protected postRender(context: WebGLRenderingContext, frameState: import("../../Map.js").FrameState): void;
}
import LayerRenderer from '../Layer.js';
import WebGLHelper from '../../webgl/Helper.js';
//# sourceMappingURL=Layer.d.ts.map