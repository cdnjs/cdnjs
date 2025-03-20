export default WebGLRenderTarget;
/**
 * @classdesc
 * This class is a wrapper around the association of both a `WebGLTexture` and a `WebGLFramebuffer` instances,
 * simplifying initialization and binding for rendering.
 */
declare class WebGLRenderTarget {
    /**
     * @param {import("./Helper.js").default} helper WebGL helper; mandatory.
     * @param {Array<number>} [size] Expected size of the render target texture; note: this can be changed later on.
     */
    constructor(helper: import("./Helper.js").default, size?: number[] | undefined);
    /**
     * @private
     * @type {import("./Helper.js").default}
     */
    private helper_;
    /**
     * @private
     * @type {WebGLTexture}
     */
    private texture_;
    /**
     * @private
     * @type {WebGLFramebuffer}
     */
    private framebuffer_;
    /**
     * @private
     * @type {WebGLRenderbuffer}
     */
    private depthbuffer_;
    /**
     * @type {Array<number>}
     * @private
     */
    private size_;
    /**
     * @type {Uint8Array}
     * @private
     */
    private data_;
    /**
     * @type {boolean}
     * @private
     */
    private dataCacheDirty_;
    /**
     * Changes the size of the render target texture. Note: will do nothing if the size
     * is already the same.
     * @param {Array<number>} size Expected size of the render target texture
     */
    setSize(size: Array<number>): void;
    /**
     * Returns the size of the render target texture
     * @return {Array<number>} Size of the render target texture
     */
    getSize(): Array<number>;
    /**
     * This will cause following calls to `#readAll` or `#readPixel` to download the content of the
     * render target into memory, which is an expensive operation.
     * This content will be kept in cache but should be cleared after each new render.
     */
    clearCachedData(): void;
    /**
     * Returns the full content of the frame buffer as a series of r, g, b, a components
     * in the 0-255 range (unsigned byte).
     * @return {Uint8Array} Integer array of color values
     */
    readAll(): Uint8Array;
    /**
     * Reads one pixel of the frame buffer as an array of r, g, b, a components
     * in the 0-255 range (unsigned byte).
     * If x and/or y are outside of existing data, an array filled with 0 is returned.
     * @param {number} x Pixel coordinate
     * @param {number} y Pixel coordinate
     * @return {Uint8Array} Integer array with one color value (4 components)
     */
    readPixel(x: number, y: number): Uint8Array;
    /**
     * @return {WebGLTexture} Texture to render to
     */
    getTexture(): WebGLTexture;
    /**
     * @return {WebGLFramebuffer} Frame buffer of the render target
     */
    getFramebuffer(): WebGLFramebuffer;
    /**
     * @return {WebGLRenderbuffer} Depth buffer of the render target
     */
    getDepthbuffer(): WebGLRenderbuffer;
    /**
     * @private
     */
    private updateSize_;
}
//# sourceMappingURL=RenderTarget.d.ts.map