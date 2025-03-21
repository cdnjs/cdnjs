/**
 * @typedef {Object} LoaderOptions
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {import("../extent.js").Extent} imageExtent Extent of the image in map coordinates.
 * This is the [left, bottom, right, top] map coordinates of your image. When using this loader with an
 * `ol/source/Image`, the same extent must be set as `extent` of the `ol/layer/Image`.
 * @property {string} url Image URL.
 * @property {function(HTMLImageElement, string): Promise<import('../DataTile.js').ImageLike>} [load] Function
 * to perform loading of the image. Receives the created `HTMLImageElement` and the desired `src` as argument and
 * returns a promise resolving to the loaded or decoded image. Default is {@link module:ol/Image.decode}.
 */
/**
 * Creates a loader for static images.
 * @param {LoaderOptions} options Loader options.
 * @return {import("../Image.js").ImageObjectPromiseLoader} Loader.
 * @api
 */
export function createLoader(options: LoaderOptions): import("../Image.js").ImageObjectPromiseLoader;
export type LoaderOptions = {
    /**
     * The `crossOrigin` attribute for loaded images.  Note that
     * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
     * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
     */
    crossOrigin?: string | null | undefined;
    /**
     * Extent of the image in map coordinates.
     * This is the [left, bottom, right, top] map coordinates of your image. When using this loader with an
     * `ol/source/Image`, the same extent must be set as `extent` of the `ol/layer/Image`.
     */
    imageExtent: import("../extent.js").Extent;
    /**
     * Image URL.
     */
    url: string;
    /**
     * Function
     * to perform loading of the image. Receives the created `HTMLImageElement` and the desired `src` as argument and
     * returns a promise resolving to the loaded or decoded image. Default is {@link module :ol/Image.decode}.
     */
    load?: ((arg0: HTMLImageElement, arg1: string) => Promise<import("../DataTile.js").ImageLike>) | undefined;
};
//# sourceMappingURL=static.d.ts.map