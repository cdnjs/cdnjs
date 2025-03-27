/**
 * Create an html canvas element and returns its webgl context.
 * @param {number} [width] Canvas width.
 * @param {number} [height] Canvas height.
 * @param {Array<HTMLCanvasElement | OffscreenCanvas>} [canvasPool] Canvas pool to take existing canvas from.
 * @param {WebGLContextAttributes} [settings] CanvasRenderingContext2DSettings
 * @return {WebGLRenderingContext} The context.
 */
export function createCanvasContextWebGL(width?: number, height?: number, canvasPool?: Array<HTMLCanvasElement | OffscreenCanvas>, settings?: WebGLContextAttributes): WebGLRenderingContext;
/**
 * Releases canvas memory to avoid exceeding memory limits in Safari.
 * See https://pqina.nl/blog/total-canvas-memory-use-exceeds-the-maximum-limit/
 * @param {WebGLRenderingContext} gl Context.
 */
export function releaseGLCanvas(gl: WebGLRenderingContext): void;
/**
 * @typedef {Object} ImageExtent
 * @property {import("../extent.js").Extent} extent Extent.
 * @property {import("../extent.js").Extent} [clipExtent] Clip extent.
 * @property {WebGLTexture} texture Texture.
 * @property {number} width Width of texture.
 * @property {number} height Height of texture.
 */
/**
 * Renders the source data into new canvas based on the triangulation.
 *
 * @param {WebGLRenderingContext} gl the context to render in.
 * @param {number} width_ Width of the canvas.
 * @param {number} height_ Height of the canvas.
 * @param {number} pixelRatio Pixel ratio.
 * @param {number} sourceResolution Source resolution.
 * @param {number} targetResolution Target resolution.
 * @param {import("../extent.js").Extent} targetExtent Target extent (tile).
 * @param {import("../reproj/Triangulation.js").default} triangulation Calculated triangulation.
 * @param {Array<ImageExtent>} sources Array of sources.
 * @param {number} gutter Gutter of the sources.
 * @param {number} dataType What kind of data is the textures, must be gl.FLOAT or gl.UNSIGNED_BYTE
 * TODO: Allow setting renderEdges value in the data as this is done in "data-space".
 * @param {boolean | Array<number>} [renderEdges] Render reprojection edges.
 * @param {boolean} [interpolate] Use linear interpolation when resampling.
 * @param {boolean} [drawSingle] Draw single source images directly without stitchTexture.
 * @return {{framebuffer: WebGLFramebuffer, width: number, height: number, texture: WebGLTexture}} Canvas with reprojected data.
 */
export function render(gl: WebGLRenderingContext, width_: number, height_: number, pixelRatio: number, sourceResolution: number, targetResolution: number, targetExtent: import("../extent.js").Extent, triangulation: import("../reproj/Triangulation.js").default, sources: Array<ImageExtent>, gutter: number, dataType: number, renderEdges?: boolean | Array<number>, interpolate?: boolean, drawSingle?: boolean): {
    framebuffer: WebGLFramebuffer;
    width: number;
    height: number;
    texture: WebGLTexture;
};
/**
 * @type {Array<HTMLCanvasElement | OffscreenCanvas>}
 */
export const canvasGLPool: Array<HTMLCanvasElement | OffscreenCanvas>;
export type ImageExtent = {
    /**
     * Extent.
     */
    extent: import("../extent.js").Extent;
    /**
     * Clip extent.
     */
    clipExtent?: import("../extent.js").Extent | undefined;
    /**
     * Texture.
     */
    texture: WebGLTexture;
    /**
     * Width of texture.
     */
    width: number;
    /**
     * Height of texture.
     */
    height: number;
};
//# sourceMappingURL=glreproj.d.ts.map