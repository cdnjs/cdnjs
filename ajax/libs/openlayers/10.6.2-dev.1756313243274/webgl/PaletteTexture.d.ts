export default PaletteTexture;
/**
 * @module ol/webgl/PaletteTexture
 */
declare class PaletteTexture {
    /**
     * @param {string} name The name of the texture.
     * @param {Uint8Array} data The texture data.
     */
    constructor(name: string, data: Uint8Array);
    name: string;
    data: Uint8Array<ArrayBufferLike>;
    /**
     * @type {WebGLTexture|null}
     * @private
     */
    private texture_;
    /**
     * @param {WebGLRenderingContext} gl Rendering context.
     * @return {WebGLTexture} The texture.
     */
    getTexture(gl: WebGLRenderingContext): WebGLTexture;
    /**
     * @param {WebGLRenderingContext} gl Rendering context.
     */
    delete(gl: WebGLRenderingContext): void;
}
//# sourceMappingURL=PaletteTexture.d.ts.map