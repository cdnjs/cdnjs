/**
 * @param {WebGLRenderingContext} gl Rendering Context.
 * @param {string} fragmentSource Fragment shader source.
 * @param {string} vertexSource Vertex shader source.
 * @return {WebGLProgram} [progam] The program.
 */
export function createProgram(gl: WebGLRenderingContext, fragmentSource: string, vertexSource: string): WebGLProgram;
/** @typedef {import("../transform.js").Transform} Matrix */
/**
 * Canvas-like operations implemented in webgl.
 */
export class Canvas {
    /**
     * @param {WebGLRenderingContext} gl Context to render in.
     */
    constructor(gl: WebGLRenderingContext);
    /**
     * @private
     * @type {WebGLRenderingContext}
     */
    private gl_;
    /**
     * @private
     * @type {WebGLProgram}
     */
    private program_;
    positionLocation: number;
    texcoordLocation: number;
    matrixLocation: WebGLUniformLocation | null;
    textureMatrixLocation: WebGLUniformLocation | null;
    textureLocation: WebGLUniformLocation | null;
    positionBuffer: WebGLBuffer;
    positions: number[];
    texcoordBuffer: WebGLBuffer;
    texcoords: number[];
    /**
     * 2dContext drawImage call implemented in webgl.
     * Unlike images, textures do not have a width and height associated
     * with them so we'll pass in the width and height of the texture.
     *
     * @param {WebGLTexture} tex Image to draw.
     * @param {number} texWidth Image width.
     * @param {number} texHeight Image height.
     * @param {number} srcX Top-left x-point to read src image.
     * @param {number} srcY Top-left y-point to read src image.
     * @param {number} [srcWidth] Width of source to read.
     * @param {number} [srcHeight] Height of source to read.
     * @param {number} [dstX] Top-left x-point of destination.
     * @param {number} [dstY] Top-left y-point of destination.
     * @param {number} [dstWidth] Width of written image in destination.
     * @param {number} [dstHeight] Height of written image in destination.
     * @param {number} [width] Width of canvas.
     * @param {number} [height] Height of canvas.
     */
    drawImage(tex: WebGLTexture, texWidth: number, texHeight: number, srcX: number, srcY: number, srcWidth?: number, srcHeight?: number, dstX?: number, dstY?: number, dstWidth?: number, dstHeight?: number, width?: number, height?: number): void;
}
export type Matrix = import("../transform.js").Transform;
//# sourceMappingURL=Canvas.d.ts.map