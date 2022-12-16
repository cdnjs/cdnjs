export default IconImageCache;
/**
 * The {@link module:ol/style/IconImageCache~IconImageCache} for
 * {@link module:ol/style/Icon~Icon} images.
 * @api
 */
export const shared: IconImageCache;
/**
 * @classdesc
 * Singleton class. Available through {@link module:ol/style/IconImageCache~shared}.
 */
declare class IconImageCache {
    /**
     * @type {!Object<string, import("./IconImage.js").default>}
     * @private
     */
    private cache_;
    /**
     * @type {number}
     * @private
     */
    private cacheSize_;
    /**
     * @type {number}
     * @private
     */
    private maxCacheSize_;
    /**
     * FIXME empty description for jsdoc
     */
    clear(): void;
    /**
     * @return {boolean} Can expire cache.
     */
    canExpireCache(): boolean;
    /**
     * FIXME empty description for jsdoc
     */
    expire(): void;
    /**
     * @param {string} src Src.
     * @param {?string} crossOrigin Cross origin.
     * @param {import("../color.js").Color} color Color.
     * @return {import("./IconImage.js").default} Icon image.
     */
    get(src: string, crossOrigin: string | null, color: number[]): import("./IconImage.js").default;
    /**
     * @param {string} src Src.
     * @param {?string} crossOrigin Cross origin.
     * @param {import("../color.js").Color} color Color.
     * @param {import("./IconImage.js").default} iconImage Icon image.
     */
    set(src: string, crossOrigin: string | null, color: number[], iconImage: import("./IconImage.js").default): void;
    /**
     * Set the cache size of the icon cache. Default is `32`. Change this value when
     * your map uses more than 32 different icon images and you are not caching icon
     * styles on the application level.
     * @param {number} maxCacheSize Cache max size.
     * @api
     */
    setSize(maxCacheSize: number): void;
}
//# sourceMappingURL=IconImageCache.d.ts.map