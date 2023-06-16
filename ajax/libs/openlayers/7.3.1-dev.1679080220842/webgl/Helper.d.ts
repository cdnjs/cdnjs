/**
 * Compute a stride in bytes based on a list of attributes
 * @param {Array<AttributeDescription>} attributes Ordered list of attributes
 * @return {number} Stride, ie amount of values for each vertex in the vertex buffer
 */
export function computeAttributesStride(attributes: Array<AttributeDescription>): number;
/**
 * Shader types, either `FRAGMENT_SHADER` or `VERTEX_SHADER`.
 */
export type ShaderType = number;
export namespace ShaderType {
    const FRAGMENT_SHADER: number;
    const VERTEX_SHADER: number;
}
/**
 * Names of uniforms made available to all shaders.
 * Please note: changing these *will* break custom shaders!
 */
export type DefaultUniform = string;
export namespace DefaultUniform {
    const PROJECTION_MATRIX: string;
    const OFFSET_SCALE_MATRIX: string;
    const OFFSET_ROTATION_MATRIX: string;
    const TIME: string;
    const ZOOM: string;
    const RESOLUTION: string;
    const SIZE_PX: string;
    const PIXEL_RATIO: string;
}
/**
 * Attribute types, either `UNSIGNED_BYTE`, `UNSIGNED_SHORT`, `UNSIGNED_INT` or `FLOAT`
 * Note: an attribute stored in a `Float32Array` should be of type `FLOAT`.
 */
export type AttributeType = number;
export namespace AttributeType {
    export { UNSIGNED_BYTE };
    export { UNSIGNED_SHORT };
    export { UNSIGNED_INT };
    export { FLOAT };
}
export default WebGLHelper;
export type BufferCacheEntry = {
    /**
     * Buffer.
     */
    buffer: import("./Buffer.js").default;
    /**
     * WebGlBuffer.
     */
    webGlBuffer: WebGLBuffer;
};
/**
 * Description of an attribute in a buffer
 */
export type AttributeDescription = {
    /**
     * Attribute name to use in shaders
     */
    name: string;
    /**
     * Number of components per attributes
     */
    size: number;
    /**
     * Attribute type, i.e. number of bytes used to store the value. This is
     * determined by the class of typed array which the buffer uses (eg. `Float32Array` for a `FLOAT` attribute).
     * Default is `FLOAT`.
     */
    type?: number | undefined;
};
export type UniformLiteralValue = number | Array<number> | HTMLCanvasElement | HTMLImageElement | ImageData | import("../transform").Transform;
/**
 * Uniform value can be a number, array of numbers (2 to 4), canvas element or a callback returning
 * one of the previous types.
 */
export type UniformValue = UniformLiteralValue | ((arg0: import("../Map.js").FrameState) => UniformLiteralValue);
export type PostProcessesOptions = {
    /**
     * Scale ratio; if < 1, the post process will render to a texture smaller than
     * the main canvas which will then be sampled up (useful for saving resource on blur steps).
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
        [x: string]: UniformValue;
    } | undefined;
};
export type Options = {
    /**
     * Uniform definitions; property names must match the uniform
     * names in the provided or default shaders.
     */
    uniforms?: {
        [x: string]: UniformValue;
    } | undefined;
    /**
     * Post-processes definitions
     */
    postProcesses?: PostProcessesOptions[] | undefined;
    /**
     * The cache key for the canvas.
     */
    canvasCacheKey?: string | undefined;
};
export type UniformInternalDescription = {
    /**
     * Name
     */
    name: string;
    /**
     * Value
     */
    value?: UniformValue | undefined;
    /**
     * The previous value.
     */
    prevValue?: UniformValue | undefined;
    /**
     * Texture
     */
    texture?: WebGLTexture | undefined;
};
export type CanvasCacheItem = {
    /**
     * Canvas element.
     */
    canvas: HTMLCanvasElement;
    /**
     * The count of users of this canvas.
     */
    users: number;
};
import { UNSIGNED_BYTE } from "../webgl.js";
import { UNSIGNED_SHORT } from "../webgl.js";
import { UNSIGNED_INT } from "../webgl.js";
import { FLOAT } from "../webgl.js";
/**
 * @classdesc
 * This class is intended to provide low-level functions related to WebGL rendering, so that accessing
 * directly the WebGL API should not be required anymore.
 *
 * Several operations are handled by the `WebGLHelper` class:
 *
 * ### Define custom shaders and uniforms
 *
 *   *Shaders* are low-level programs executed on the GPU and written in GLSL. There are two types of shaders:
 *
 *   Vertex shaders are used to manipulate the position and attribute of *vertices* of rendered primitives (ie. corners of a square).
 *   Outputs are:
 *
 *   * `gl_Position`: position of the vertex in screen space
 *
 *   * Varyings usually prefixed with `v_` are passed on to the fragment shader
 *
 *   Fragment shaders are used to control the actual color of the pixels drawn on screen. Their only output is `gl_FragColor`.
 *
 *   Both shaders can take *uniforms* or *attributes* as input. Attributes are explained later. Uniforms are common, read-only values that
 *   can be changed at every frame and can be of type float, arrays of float or images.
 *
 *   Shaders must be compiled and assembled into a program like so:
 *   ```js
 *   // here we simply create two shaders and assemble them in a program which is then used
 *   // for subsequent rendering calls; note how a frameState is required to set up a program,
 *   // as several default uniforms are computed from it (projection matrix, zoom level, etc.)
 *   const vertexShader = new WebGLVertex(VERTEX_SHADER);
 *   const fragmentShader = new WebGLFragment(FRAGMENT_SHADER);
 *   const program = this.context.getProgram(fragmentShader, vertexShader);
 *   helper.useProgram(this.program, frameState);
 *   ```
 *
 *   Uniforms are defined using the `uniforms` option and can either be explicit values or callbacks taking the frame state as argument.
 *   You can also change their value along the way like so:
 *   ```js
 *   helper.setUniformFloatValue('u_value', valueAsNumber);
 *   ```
 *
 * ### Defining post processing passes
 *
 *   *Post processing* describes the act of rendering primitives to a texture, and then rendering this texture to the final canvas
 *   while applying special effects in screen space.
 *   Typical uses are: blurring, color manipulation, depth of field, filtering...
 *
 *   The `WebGLHelper` class offers the possibility to define post processes at creation time using the `postProcesses` option.
 *   A post process step accepts the following options:
 *
 *   * `fragmentShader` and `vertexShader`: text literals in GLSL language that will be compiled and used in the post processing step.
 *   * `uniforms`: uniforms can be defined for the post processing steps just like for the main render.
 *   * `scaleRatio`: allows using an intermediate texture smaller or higher than the final canvas in the post processing step.
 *     This is typically used in blur steps to reduce the performance overhead by using an already downsampled texture as input.
 *
 *   The {@link module:ol/webgl/PostProcessingPass~WebGLPostProcessingPass} class is used internally, refer to its documentation for more info.
 *
 * ### Binding WebGL buffers and flushing data into them
 *
 *   Data that must be passed to the GPU has to be transferred using {@link module:ol/webgl/Buffer~WebGLArrayBuffer} objects.
 *   A buffer has to be created only once, but must be bound every time the buffer content will be used for rendering.
 *   This is done using {@link bindBuffer}.
 *   When the buffer's array content has changed, the new data has to be flushed to the GPU memory; this is done using
 *   {@link flushBufferData}. Note: this operation is expensive and should be done as infrequently as possible.
 *
 *   When binding an array buffer, a `target` parameter must be given: it should be either {@link module:ol/webgl.ARRAY_BUFFER}
 *   (if the buffer contains vertices data) or {@link module:ol/webgl.ELEMENT_ARRAY_BUFFER} (if the buffer contains indices data).
 *
 *   Examples below:
 *   ```js
 *   // at initialization phase
 *   const verticesBuffer = new WebGLArrayBuffer([], DYNAMIC_DRAW);
 *   const indicesBuffer = new WebGLArrayBuffer([], DYNAMIC_DRAW);
 *
 *   // when array values have changed
 *   helper.flushBufferData(ARRAY_BUFFER, this.verticesBuffer);
 *   helper.flushBufferData(ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
 *
 *   // at rendering phase
 *   helper.bindBuffer(ARRAY_BUFFER, this.verticesBuffer);
 *   helper.bindBuffer(ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
 *   ```
 *
 * ### Specifying attributes
 *
 *   The GPU only receives the data as arrays of numbers. These numbers must be handled differently depending on what it describes (position, texture coordinate...).
 *   Attributes are used to specify these uses. Specify the attribute names with
 *   {@link module:ol/webgl/Helper~WebGLHelper#enableAttributes} (see code snippet below).
 *
 *   Please note that you will have to specify the type and offset of the attributes in the data array. You can refer to the documentation of [WebGLRenderingContext.vertexAttribPointer](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer) for more explanation.
 *   ```js
 *   // here we indicate that the data array has the following structure:
 *   // [posX, posY, offsetX, offsetY, texCoordU, texCoordV, posX, posY, ...]
 *   helper.enableAttributes([
 *     {
 *        name: 'a_position',
 *        size: 2
 *     },
 *     {
 *       name: 'a_offset',
 *       size: 2
 *     },
 *     {
 *       name: 'a_texCoord',
 *       size: 2
 *     }
 *   ])
 *   ```
 *
 * ### Rendering primitives
 *
 *   Once all the steps above have been achieved, rendering primitives to the screen is done using {@link prepareDraw}, {@link drawElements} and {@link finalizeDraw}.
 *   ```js
 *   // frame preparation step
 *   helper.prepareDraw(frameState);
 *
 *   // call this for every data array that has to be rendered on screen
 *   helper.drawElements(0, this.indicesBuffer.getArray().length);
 *
 *   // finalize the rendering by applying post processes
 *   helper.finalizeDraw(frameState);
 *   ```
 *
 * For an example usage of this class, refer to {@link module:ol/renderer/webgl/PointsLayer~WebGLPointsLayerRenderer}.
 */
declare class WebGLHelper extends Disposable {
    /**
     * @param {Options} [options] Options.
     */
    constructor(options?: Options | undefined);
    /** @private */
    private boundHandleWebGLContextLost_;
    /** @private */
    private boundHandleWebGLContextRestored_;
    /**
     * @private
     * @type {string}
     */
    private canvasCacheKey_;
    /**
     * @private
     * @type {HTMLCanvasElement}
     */
    private canvas_;
    /**
     * @private
     * @type {WebGLRenderingContext}
     */
    private gl_;
    /**
     * @private
     * @type {!Object<string, BufferCacheEntry>}
     */
    private bufferCache_;
    /**
     * @private
     * @type {Object<string, Object>}
     */
    private extensionCache_;
    /**
     * @private
     * @type {WebGLProgram}
     */
    private currentProgram_;
    /**
     * @private
     * @type {import("../transform.js").Transform}
     */
    private offsetRotateMatrix_;
    /**
     * @private
     * @type {import("../transform.js").Transform}
     */
    private offsetScaleMatrix_;
    /**
     * @private
     * @type {Array<number>}
     */
    private tmpMat4_;
    /**
     * @private
     * @type {Object<string, WebGLUniformLocation>}
     */
    private uniformLocations_;
    /**
     * @private
     * @type {Object<string, number>}
     */
    private attribLocations_;
    /**
     * Holds info about custom uniforms used in the post processing pass.
     * If the uniform is a texture, the WebGL Texture object will be stored here.
     * @type {Array<UniformInternalDescription>}
     * @private
     */
    private uniforms_;
    /**
     * An array of PostProcessingPass objects is kept in this variable, built from the steps provided in the
     * options. If no post process was given, a default one is used (so as not to have to make an exception to
     * the frame buffer logic).
     * @type {Array<WebGLPostProcessingPass>}
     * @private
     */
    private postProcessPasses_;
    /**
     * @type {string|null}
     * @private
     */
    private shaderCompileErrors_;
    /**
     * @type {number}
     * @private
     */
    private startTime_;
    /**
     * @param {Object<string, UniformValue>} uniforms Uniform definitions.
     */
    setUniforms(uniforms: {
        [x: string]: UniformValue;
    }): void;
    /**
     * @param {string} canvasCacheKey The canvas cache key.
     * @return {boolean} The provided key matches the one this helper was constructed with.
     */
    canvasCacheKeyMatches(canvasCacheKey: string): boolean;
    /**
     * Get a WebGL extension.  If the extension is not supported, null is returned.
     * Extensions are cached after they are enabled for the first time.
     * @param {string} name The extension name.
     * @return {Object|null} The extension or null if not supported.
     */
    getExtension(name: string): any | null;
    /**
     * Just bind the buffer if it's in the cache. Otherwise create
     * the WebGL buffer, bind it, populate it, and add an entry to
     * the cache.
     * @param {import("./Buffer").default} buffer Buffer.
     */
    bindBuffer(buffer: import("./Buffer").default): void;
    /**
     * Update the data contained in the buffer array; this is required for the
     * new data to be rendered
     * @param {import("./Buffer").default} buffer Buffer.
     */
    flushBufferData(buffer: import("./Buffer").default): void;
    /**
     * @param {import("./Buffer.js").default} buf Buffer.
     */
    deleteBuffer(buf: import("./Buffer.js").default): void;
    /**
     * Clear the buffer & set the viewport to draw.
     * Post process passes will be initialized here, the first one being bound as a render target for
     * subsequent draw calls.
     * @param {import("../Map.js").FrameState} frameState current frame state
     * @param {boolean} [disableAlphaBlend] If true, no alpha blending will happen.
     */
    prepareDraw(frameState: import("../Map.js").FrameState, disableAlphaBlend?: boolean | undefined): void;
    /**
     * Clear the render target & bind it for future draw operations.
     * This is similar to `prepareDraw`, only post processes will not be applied.
     * Note: the whole viewport will be drawn to the render target, regardless of its size.
     * @param {import("../Map.js").FrameState} frameState current frame state
     * @param {import("./RenderTarget.js").default} renderTarget Render target to draw to
     * @param {boolean} [disableAlphaBlend] If true, no alpha blending will happen.
     */
    prepareDrawToRenderTarget(frameState: import("../Map.js").FrameState, renderTarget: import("./RenderTarget.js").default, disableAlphaBlend?: boolean | undefined): void;
    /**
     * Execute a draw call based on the currently bound program, texture, buffers, attributes.
     * @param {number} start Start index.
     * @param {number} end End index.
     */
    drawElements(start: number, end: number): void;
    /**
     * Apply the successive post process passes which will eventually render to the actual canvas.
     * @param {import("../Map.js").FrameState} frameState current frame state
     * @param {function(WebGLRenderingContext, import("../Map.js").FrameState):void} [preCompose] Called before composing.
     * @param {function(WebGLRenderingContext, import("../Map.js").FrameState):void} [postCompose] Called before composing.
     */
    finalizeDraw(frameState: import("../Map.js").FrameState, preCompose?: ((arg0: WebGLRenderingContext, arg1: import("../Map.js").FrameState) => void) | undefined, postCompose?: ((arg0: WebGLRenderingContext, arg1: import("../Map.js").FrameState) => void) | undefined): void;
    /**
     * @return {HTMLCanvasElement} Canvas.
     */
    getCanvas(): HTMLCanvasElement;
    /**
     * Get the WebGL rendering context
     * @return {WebGLRenderingContext} The rendering context.
     */
    getGL(): WebGLRenderingContext;
    /**
     * Sets the default matrix uniforms for a given frame state. This is called internally in `prepareDraw`.
     * @param {import("../Map.js").FrameState} frameState Frame state.
     */
    applyFrameState(frameState: import("../Map.js").FrameState): void;
    /**
     * Sets the custom uniforms based on what was given in the constructor. This is called internally in `prepareDraw`.
     * @param {import("../Map.js").FrameState} frameState Frame state.
     */
    applyUniforms(frameState: import("../Map.js").FrameState): void;
    /**
     * Set up a program for use. The program will be set as the current one. Then, the uniforms used
     * in the program will be set based on the current frame state and the helper configuration.
     * @param {WebGLProgram} program Program.
     * @param {import("../Map.js").FrameState} frameState Frame state.
     */
    useProgram(program: WebGLProgram, frameState: import("../Map.js").FrameState): void;
    /**
     * Will attempt to compile a vertex or fragment shader based on source
     * On error, the shader will be returned but
     * `gl.getShaderParameter(shader, gl.COMPILE_STATUS)` will return `true`
     * Use `gl.getShaderInfoLog(shader)` to have details
     * @param {string} source Shader source
     * @param {ShaderType} type VERTEX_SHADER or FRAGMENT_SHADER
     * @return {WebGLShader} Shader object
     */
    compileShader(source: string, type: ShaderType): WebGLShader;
    /**
     * Create a program for a vertex and fragment shader.  Throws if shader compilation fails.
     * @param {string} fragmentShaderSource Fragment shader source.
     * @param {string} vertexShaderSource Vertex shader source.
     * @return {WebGLProgram} Program
     */
    getProgram(fragmentShaderSource: string, vertexShaderSource: string): WebGLProgram;
    /**
     * Will get the location from the shader or the cache
     * @param {string} name Uniform name
     * @return {WebGLUniformLocation} uniformLocation
     */
    getUniformLocation(name: string): WebGLUniformLocation;
    /**
     * Will get the location from the shader or the cache
     * @param {string} name Attribute name
     * @return {number} attribLocation
     */
    getAttributeLocation(name: string): number;
    /**
     * Modifies the given transform to apply the rotation/translation/scaling of the given frame state.
     * The resulting transform can be used to convert world space coordinates to view coordinates.
     * @param {import("../Map.js").FrameState} frameState Frame state.
     * @param {import("../transform").Transform} transform Transform to update.
     * @return {import("../transform").Transform} The updated transform object.
     */
    makeProjectionTransform(frameState: import("../Map.js").FrameState, transform: import("../transform").Transform): import("../transform").Transform;
    /**
     * Give a value for a standard float uniform
     * @param {string} uniform Uniform name
     * @param {number} value Value
     */
    setUniformFloatValue(uniform: string, value: number): void;
    /**
     * Give a value for a vec2 uniform
     * @param {string} uniform Uniform name
     * @param {Array<number>} value Array of length 4.
     */
    setUniformFloatVec2(uniform: string, value: Array<number>): void;
    /**
     * Give a value for a vec4 uniform
     * @param {string} uniform Uniform name
     * @param {Array<number>} value Array of length 4.
     */
    setUniformFloatVec4(uniform: string, value: Array<number>): void;
    /**
     * Give a value for a standard matrix4 uniform
     * @param {string} uniform Uniform name
     * @param {Array<number>} value Matrix value
     */
    setUniformMatrixValue(uniform: string, value: Array<number>): void;
    /**
     * Will set the currently bound buffer to an attribute of the shader program. Used by `#enableAttributes`
     * internally.
     * @param {string} attribName Attribute name
     * @param {number} size Number of components per attributes
     * @param {number} type UNSIGNED_INT, UNSIGNED_BYTE, UNSIGNED_SHORT or FLOAT
     * @param {number} stride Stride in bytes (0 means attribs are packed)
     * @param {number} offset Offset in bytes
     * @private
     */
    private enableAttributeArray_;
    /**
     * Will enable the following attributes to be read from the currently bound buffer,
     * i.e. tell the GPU where to read the different attributes in the buffer. An error in the
     * size/type/order of attributes will most likely break the rendering and throw a WebGL exception.
     * @param {Array<AttributeDescription>} attributes Ordered list of attributes to read from the buffer
     */
    enableAttributes(attributes: Array<AttributeDescription>): void;
    /**
     * WebGL context was lost
     * @private
     */
    private handleWebGLContextLost;
    /**
     * WebGL context was restored
     * @private
     */
    private handleWebGLContextRestored;
    /**
     * Will create or reuse a given webgl texture and apply the given size. If no image data
     * specified, the texture will be empty, otherwise image data will be used and the `size`
     * parameter will be ignored.
     * Note: wrap parameters are set to clamp to edge, min filter is set to linear.
     * @param {Array<number>} size Expected size of the texture
     * @param {ImageData|HTMLImageElement|HTMLCanvasElement} [data] Image data/object to bind to the texture
     * @param {WebGLTexture} [texture] Existing texture to reuse
     * @return {WebGLTexture} The generated texture
     */
    createTexture(size: Array<number>, data?: HTMLCanvasElement | HTMLImageElement | ImageData | undefined, texture?: WebGLTexture | undefined): WebGLTexture;
}
import Disposable from "../Disposable.js";
//# sourceMappingURL=Helper.d.ts.map