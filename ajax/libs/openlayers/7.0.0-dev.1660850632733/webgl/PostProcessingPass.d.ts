export default WebGLPostProcessingPass;
export type Options = {
    /**
     * WebGL context; mandatory.
     */
    webGlContext: WebGLRenderingContext;
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
        [x: string]: import("./Helper").UniformValue;
    } | undefined;
};
export type UniformInternalDescription = {
    /**
     * Value
     */
    value: import("./Helper").UniformValue;
    /**
     * Location
     */
    location: number;
    /**
     * Texture
     */
    texture?: WebGLTexture | undefined;
};
/**
 * @typedef {Object} Options
 * @property {WebGLRenderingContext} webGlContext WebGL context; mandatory.
 * @property {number} [scaleRatio] Scale ratio; if < 1, the post process will render to a texture smaller than
 * the main canvas that will then be sampled up (useful for saving resource on blur steps).
 * @property {string} [vertexShader] Vertex shader source
 * @property {string} [fragmentShader] Fragment shader source
 * @property {Object<string,import("./Helper").UniformValue>} [uniforms] Uniform definitions for the post process step
 */
/**
 * @typedef {Object} UniformInternalDescription
 * @property {import("./Helper").UniformValue} value Value
 * @property {number} location Location
 * @property {WebGLTexture} [texture] Texture
 * @private
 */
/**
 * @classdesc
 * This class is used to define Post Processing passes with custom shaders and uniforms.
 * This is used internally by {@link module:ol/webgl/Helper~WebGLHelper}.
 *
 * Please note that the final output on the DOM canvas is expected to have premultiplied alpha, which means that
 * a pixel which is 100% red with an opacity of 50% must have a color of (r=0.5, g=0, b=0, a=0.5).
 * Failing to provide pixel colors with premultiplied alpha will result in render anomalies.
 *
 * The default post-processing pass does *not* multiply color values with alpha value, it expects color values to be
 * premultiplied.
 *
 * Default shaders are shown hereafter:
 *
 * * Vertex shader:
 *
 *   ```
 *   precision mediump float;
 *
 *   attribute vec2 a_position;
 *   varying vec2 v_texCoord;
 *   varying vec2 v_screenCoord;
 *
 *   uniform vec2 u_screenSize;
 *
 *   void main() {
 *     v_texCoord = a_position * 0.5 + 0.5;
 *     v_screenCoord = v_texCoord * u_screenSize;
 *     gl_Position = vec4(a_position, 0.0, 1.0);
 *   }
 *   ```
 *
 * * Fragment shader:
 *
 *   ```
 *   precision mediump float;
 *
 *   uniform sampler2D u_image;
 *   uniform float u_opacity;
 *
 *   varying vec2 v_texCoord;
 *
 *   void main() {
 *     gl_FragColor = texture2D(u_image, v_texCoord) * u_opacity;
 *   }
 *   ```
 *
 * @api
 */
declare class WebGLPostProcessingPass {
    /**
     * @param {Options} options Options.
     */
    constructor(options: Options);
    gl_: WebGLRenderingContext;
    scaleRatio_: number;
    renderTargetTexture_: WebGLTexture | null;
    renderTargetTextureSize_: number[] | null;
    frameBuffer_: WebGLFramebuffer | null;
    renderTargetProgram_: WebGLProgram | null;
    renderTargetVerticesBuffer_: WebGLBuffer | null;
    renderTargetAttribLocation_: number;
    renderTargetUniformLocation_: WebGLUniformLocation | null;
    renderTargetOpacityLocation_: WebGLUniformLocation | null;
    renderTargetTextureLocation_: WebGLUniformLocation | null;
    /**
     * Holds info about custom uniforms used in the post processing pass
     * @type {Array<UniformInternalDescription>}
     * @private
     */
    private uniforms_;
    /**
     * Get the WebGL rendering context
     * @return {WebGLRenderingContext} The rendering context.
     * @api
     */
    getGL(): WebGLRenderingContext;
    /**
     * Initialize the render target texture of the post process, make sure it is at the
     * right size and bind it as a render target for the next draw calls.
     * The last step to be initialized will be the one where the primitives are rendered.
     * @param {import("../Map.js").FrameState} frameState current frame state
     * @api
     */
    init(frameState: import("../Map.js").FrameState): void;
    /**
     * Render to the next postprocessing pass (or to the canvas if final pass).
     * @param {import("../Map.js").FrameState} frameState current frame state
     * @param {WebGLPostProcessingPass} [nextPass] Next pass, optional
     * @param {function(WebGLRenderingContext, import("../Map.js").FrameState):void} [preCompose] Called before composing.
     * @param {function(WebGLRenderingContext, import("../Map.js").FrameState):void} [postCompose] Called before composing.
     * @api
     */
    apply(frameState: import("../Map.js").FrameState, nextPass?: WebGLPostProcessingPass | undefined, preCompose?: ((arg0: WebGLRenderingContext, arg1: import("../Map.js").FrameState) => void) | undefined, postCompose?: ((arg0: WebGLRenderingContext, arg1: import("../Map.js").FrameState) => void) | undefined): void;
    /**
     * @return {WebGLFramebuffer} Frame buffer
     * @api
     */
    getFrameBuffer(): WebGLFramebuffer;
    /**
     * Sets the custom uniforms based on what was given in the constructor.
     * @param {import("../Map.js").FrameState} frameState Frame state.
     * @private
     */
    private applyUniforms;
}
//# sourceMappingURL=PostProcessingPass.d.ts.map