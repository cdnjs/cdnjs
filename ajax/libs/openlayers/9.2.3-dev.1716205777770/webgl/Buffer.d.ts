/**
 * Returns a typed array constructor based on the given buffer type
 * @param {number} type Buffer type, either ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER.
 * @return {Float32ArrayConstructor|Uint32ArrayConstructor} The typed array class to use for this buffer.
 */
export function getArrayClassForType(type: number): Float32ArrayConstructor | Uint32ArrayConstructor;
/**
 * Used to describe the intended usage for the data: `STATIC_DRAW`, `STREAM_DRAW`
 * or `DYNAMIC_DRAW`.
 */
export type BufferUsage = number;
export namespace BufferUsage {
    export { STATIC_DRAW };
    export { STREAM_DRAW };
    export { DYNAMIC_DRAW };
}
export default WebGLArrayBuffer;
import { STATIC_DRAW } from '../webgl.js';
import { STREAM_DRAW } from '../webgl.js';
import { DYNAMIC_DRAW } from '../webgl.js';
/**
 * @classdesc
 * Object used to store an array of data as well as usage information for that data.
 * Stores typed arrays internally, either Float32Array or Uint16/32Array depending on
 * the buffer type (ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER) and available extensions.
 *
 * To populate the array, you can either use:
 * * A size using `#ofSize(buffer)`
 * * An `ArrayBuffer` object using `#fromArrayBuffer(buffer)`
 * * A plain array using `#fromArray(array)`
 *
 * Note:
 * See the documentation of [WebGLRenderingContext.bufferData](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData)
 * for more info on buffer usage.
 */
declare class WebGLArrayBuffer {
    /**
     * @param {number} type Buffer type, either ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER.
     * @param {number} [usage] Intended usage, either `STATIC_DRAW`, `STREAM_DRAW` or `DYNAMIC_DRAW`.
     * Default is `DYNAMIC_DRAW`.
     */
    constructor(type: number, usage?: number | undefined);
    /**
     * @private
     * @type {Float32Array|Uint32Array|null}
     */
    private array_;
    /**
     * @private
     * @type {number}
     */
    private type_;
    /**
     * @private
     * @type {number}
     */
    private usage_;
    /**
     * Populates the buffer with an array of the given size (all values will be zeroes).
     * @param {number} size Array size
     * @return {WebGLArrayBuffer} This
     */
    ofSize(size: number): WebGLArrayBuffer;
    /**
     * Populates the buffer with an array of the given size.
     * @param {Array<number>} array Numerical array
     * @return {WebGLArrayBuffer} This
     */
    fromArray(array: Array<number>): WebGLArrayBuffer;
    /**
     * Populates the buffer with a raw binary array buffer.
     * @param {ArrayBuffer} buffer Raw binary buffer to populate the array with. Note that this buffer must have been
     * initialized for the same typed array class.
     * @return {WebGLArrayBuffer} This
     */
    fromArrayBuffer(buffer: ArrayBuffer): WebGLArrayBuffer;
    /**
     * @return {number} Buffer type.
     */
    getType(): number;
    /**
     * Will return null if the buffer was not initialized
     * @return {Float32Array|Uint32Array|null} Array.
     */
    getArray(): Float32Array | Uint32Array | null;
    /**
     * @return {number} Usage.
     */
    getUsage(): number;
    /**
     * Will return 0 if the buffer is not initialized
     * @return {number} Array size
     */
    getSize(): number;
}
//# sourceMappingURL=Buffer.d.ts.map