/**
 * An object holding positions both in an index and a vertex buffer.
 * @typedef {Object} BufferPositions
 * @property {number} vertexPosition Position in the vertex buffer
 * @property {number} indexPosition Position in the index buffer
 */
/**
 * Pushes a quad (two triangles) based on a point geometry
 * @param {Float32Array} instructions Array of render instructions for points.
 * @param {number} elementIndex Index from which render instructions will be read.
 * @param {Float32Array} vertexBuffer Buffer in the form of a typed array.
 * @param {Uint32Array} indexBuffer Buffer in the form of a typed array.
 * @param {number} customAttributesCount Amount of custom attributes for each element.
 * @param {BufferPositions} [bufferPositions] Buffer write positions; if not specified, positions will be set at 0.
 * @return {BufferPositions} New buffer positions where to write next
 * @property {number} vertexPosition New position in the vertex buffer where future writes should start.
 * @property {number} indexPosition New position in the index buffer where future writes should start.
 * @private
 */
export function writePointFeatureToBuffers(instructions: Float32Array, elementIndex: number, vertexBuffer: Float32Array, indexBuffer: Uint32Array, customAttributesCount: number, bufferPositions?: BufferPositions | undefined): BufferPositions;
/**
 * Returns a texture of 1x1 pixel, white
 * @private
 * @return {ImageData} Image data.
 */
export function getBlankImageData(): ImageData;
/**
 * Generates a color array based on a numerical id
 * Note: the range for each component is 0 to 1 with 256 steps
 * @param {number} id Id
 * @param {Array<number>} [opt_array] Reusable array
 * @return {Array<number>} Color array containing the encoded id
 */
export function colorEncodeId(id: number, opt_array?: number[] | undefined): number[];
/**
 * Reads an id from a color-encoded array
 * Note: the expected range for each component is 0 to 1 with 256 steps.
 * @param {Array<number>} color Color array containing the encoded id
 * @return {number} Decoded id
 */
export function colorDecodeId(color: number[]): number;
export type WebGLWorkerMessageType = string;
export namespace WebGLWorkerMessageType {
    export const GENERATE_BUFFERS: string;
}
export default WebGLLayerRenderer;
/**
 * An object holding positions both in an index and a vertex buffer.
 */
export type BufferPositions = {
    /**
     * Position in the vertex buffer
     */
    vertexPosition: number;
    /**
     * Position in the index buffer
     */
    indexPosition: number;
};
/**
 * This message will trigger the generation of a vertex and an index buffer based on the given render instructions.
 * When the buffers are generated, the worked will send a message of the same type to the main thread, with
 * the generated buffers in it.
 * Note that any addition properties present in the message *will* be sent back to the main thread.
 */
export type WebGLWorkerGenerateBuffersMessage = {
    /**
     * Message type
     */
    type: string;
    /**
     * Render instructions raw binary buffer.
     */
    renderInstructions: ArrayBuffer;
    /**
     * Vertices array raw binary buffer (sent by the worker).
     */
    vertexBuffer?: ArrayBuffer;
    /**
     * Indices array raw binary buffer (sent by the worker).
     */
    indexBuffer?: ArrayBuffer;
    /**
     * Amount of custom attributes count in the render instructions.
     */
    customAttributesCount?: number;
};
export type PostProcessesOptions = {
    /**
     * Scale ratio; if < 1, the post process will render to a texture smaller than
     * the main canvas that will then be sampled up (useful for saving resource on blur steps).
     */
    scaleRatio?: number;
    /**
     * Vertex shader source
     */
    vertexShader?: string;
    /**
     * Fragment shader source
     */
    fragmentShader?: string;
    /**
     * Uniform definitions for the post process step
     */
    uniforms?: {
        [x: string]: number | number[] | HTMLCanvasElement | HTMLImageElement | ImageData | ((arg0: import("../../PluggableMap.js").FrameState) => number | number[] | HTMLCanvasElement | HTMLImageElement | ImageData);
    };
};
export type Options = {
    /**
     * A CSS class name to set to the canvas element.
     */
    className?: string;
    /**
     * Uniform definitions for the post process steps
     */
    uniforms?: {
        [x: string]: number | number[] | HTMLCanvasElement | HTMLImageElement | ImageData | ((arg0: import("../../PluggableMap.js").FrameState) => number | number[] | HTMLCanvasElement | HTMLImageElement | ImageData);
    };
    /**
     * Post-processes definitions
     */
    postProcesses?: PostProcessesOptions[];
};
/**
 * @typedef {Object} WebGLWorkerGenerateBuffersMessage
 * This message will trigger the generation of a vertex and an index buffer based on the given render instructions.
 * When the buffers are generated, the worked will send a message of the same type to the main thread, with
 * the generated buffers in it.
 * Note that any addition properties present in the message *will* be sent back to the main thread.
 * @property {WebGLWorkerMessageType} type Message type
 * @property {ArrayBuffer} renderInstructions Render instructions raw binary buffer.
 * @property {ArrayBuffer} [vertexBuffer] Vertices array raw binary buffer (sent by the worker).
 * @property {ArrayBuffer} [indexBuffer] Indices array raw binary buffer (sent by the worker).
 * @property {number} [customAttributesCount] Amount of custom attributes count in the render instructions.
 */
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
 * @property {string} [className='ol-layer'] A CSS class name to set to the canvas element.
 * @property {Object<string,import("../../webgl/Helper").UniformValue>} [uniforms] Uniform definitions for the post process steps
 * @property {Array<PostProcessesOptions>} [postProcesses] Post-processes definitions
 */
/**
 * @classdesc
 * Base WebGL renderer class.
 * Holds all logic related to data manipulation & some common rendering logic
 * @template {import("../../layer/Layer.js").default} LayerType
 */
declare class WebGLLayerRenderer<LayerType extends import("../../layer/Layer.js").default<any>> extends LayerRenderer<any> {
    /**
     * @param {LayerType} layer Layer.
     * @param {Options} [opt_options] Options.
     */
    constructor(layer: LayerType, opt_options?: Options | undefined);
    /**
     * @type {WebGLHelper}
     * @protected
     */
    protected helper: WebGLHelper;
    /**
     * @param {import("../../render/EventType.js").default} type Event type.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @private
     */
    private dispatchRenderEvent_;
    /**
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @protected
     */
    protected preRender(frameState: import("../../PluggableMap.js").FrameState): void;
    /**
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @protected
     */
    protected postRender(frameState: import("../../PluggableMap.js").FrameState): void;
}
import LayerRenderer from "../Layer.js";
import WebGLHelper from "../../webgl/Helper.js";
//# sourceMappingURL=Layer.d.ts.map