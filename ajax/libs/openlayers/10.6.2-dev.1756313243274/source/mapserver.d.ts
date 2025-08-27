/**
 * Creates a loader for MapServer images generated using the CGI interface,
 * which predates OGC services. It is **strongly** recommended to configure
 * MapServer to use WMS, and use the WMS createLoader.
 * @param {LoaderOptions} options LoaderOptions Options.
 * @return {import('../Image.js').ImageObjectPromiseLoader} MapServer image.
 * @api
 */
export function createLoader(options: LoaderOptions): import("../Image.js").ImageObjectPromiseLoader;
export type LoaderOptions = {
    /**
     * The MapServer url.
     */
    url: string;
    /**
     * The `crossOrigin` attribute for loaded images.  Note that
     * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
     * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
     * the image from the remote server.
     */
    crossOrigin?: string | null | undefined;
    /**
     * Ratio. `1` means image requests are the size of the map viewport, `2` means
     * twice the width and height of the map viewport, and so on. Must be `1` or higher.
     */
    ratio?: number | undefined;
    /**
     * Additional query parameters.
     */
    params?: any;
    /**
     * Function
     * to perform loading of the image. Receives the created `HTMLImageElement` and the desired `src` as argument and
     * returns a promise resolving to the loaded or decoded image. Default is {@link module :ol/Image.decode}.
     */
    load?: ((arg0: HTMLImageElement, arg1: string) => Promise<import("../DataTile.js").ImageLike>) | undefined;
};
//# sourceMappingURL=mapserver.d.ts.map