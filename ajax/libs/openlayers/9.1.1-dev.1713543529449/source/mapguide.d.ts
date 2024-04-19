/**
 * Creates a loader for MapGuide images.
 * @param {LoaderOptions} options Image ArcGIS Rest Options.
 * @return {import('../Image.js').ImageObjectPromiseLoader} ArcGIS Rest image.
 * @api
 */
export function createLoader(options: LoaderOptions): import('../Image.js').ImageObjectPromiseLoader;
export type LoaderOptions = {
    /**
     * The mapagent url.
     */
    url?: string | undefined;
    /**
     * The `crossOrigin` attribute for loaded images.  Note that
     * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
     * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
     */
    crossOrigin?: string | null | undefined;
    /**
     * The display resolution.
     */
    displayDpi?: number | undefined;
    /**
     * The meters-per-unit value.
     */
    metersPerUnit?: number | undefined;
    /**
     * Use the `ol/Map#pixelRatio` value when requesting
     * the image from the remote server.
     */
    hidpi?: boolean | undefined;
    /**
     * If `true`, will use `GETDYNAMICMAPOVERLAYIMAGE`.
     */
    useOverlay?: boolean | undefined;
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
    load?: ((arg0: HTMLImageElement, arg1: string) => Promise<import('../DataTile.js').ImageLike>) | undefined;
};
//# sourceMappingURL=mapguide.d.ts.map