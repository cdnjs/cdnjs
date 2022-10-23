/**
 * @param {HTMLCanvasElement} canvas Canvas.
 * @param {Object} [opt_attributes] Attributes.
 * @return {WebGLRenderingContext} WebGL rendering context.
 */
export function getContext(canvas: HTMLCanvasElement, opt_attributes?: any): WebGLRenderingContext;
/**
 * @return {Array<string>} List of supported WebGL extensions.
 */
export function getSupportedExtensions(): string[];
/**
 * @module ol/webgl
 */
/**
 * Constants taken from goog.webgl
 */
/**
 * Used by {@link module:ol/webgl/Helper~WebGLHelper} for buffers containing vertices data, such as
 * position, color, texture coordinate, etc. These vertices are then referenced by an index buffer
 * to be drawn on screen (see {@link module:ol/webgl.ELEMENT_ARRAY_BUFFER}).
 * @const
 * @type {number}
 * @api
 */
export const ARRAY_BUFFER: number;
/**
 * Used by {@link module:ol/webgl/Helper~WebGLHelper} for buffers containing indices data.
 * Index buffers are essentially lists of references to vertices defined in a vertex buffer
 * (see {@link module:ol/webgl.ARRAY_BUFFER}), and define the primitives (triangles) to be drawn.
 * @const
 * @type {number}
 * @api
 */
export const ELEMENT_ARRAY_BUFFER: number;
/**
 * Used by {link module:ol/webgl/Buffer~WebGLArrayBuffer}.
 * @const
 * @type {number}
 * @api
 */
export const STREAM_DRAW: number;
/**
 * Used by {link module:ol/webgl/Buffer~WebGLArrayBuffer}.
 * @const
 * @type {number}
 * @api
 */
export const STATIC_DRAW: number;
/**
 * Used by {link module:ol/webgl/Buffer~WebGLArrayBuffer}.
 * @const
 * @type {number}
 * @api
 */
export const DYNAMIC_DRAW: number;
/**
 * @const
 * @type {number}
 */
export const UNSIGNED_BYTE: number;
/**
 * @const
 * @type {number}
 */
export const UNSIGNED_SHORT: number;
/**
 * @const
 * @type {number}
 */
export const UNSIGNED_INT: number;
/**
 * @const
 * @type {number}
 */
export const FLOAT: number;
//# sourceMappingURL=webgl.d.ts.map