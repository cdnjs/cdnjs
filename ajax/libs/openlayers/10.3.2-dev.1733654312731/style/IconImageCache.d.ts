/**
 * @param {string} src Src.
 * @param {?string} crossOrigin Cross origin.
 * @param {import("../color.js").Color|string|null} color Color.
 * @return {string} Cache key.
 */
export function getCacheKey(src: string, crossOrigin: string | null, color: import("../color.js").Color | string | null): string;
export default IconImageCache;
/**
 * The {@link module:ol/style/IconImageCache~IconImageCache} for
 * {@link module:ol/style/Icon~Icon} images.
 * @api
 */
export const shared: IconImageCache;
/**
 * @classdesc
 * Singleton class. Available through {@link module:ol/style/IconImageCache.shared}.
 */
declare class IconImageCache {
    /**
     * @type {!Object<string, import("./IconImage.js").default>}
     * @private
     */
    private cache_;
    /**
     * @type {!Object<string, CanvasPattern>}
     * @private
     */
    private patternCache_;
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
     * @param {import("../color.js").Color|string|null} color Color.
     * @return {import("./IconImage.js").default} Icon image.
     */
    get(src: string, crossOrigin: string | null, color: import("../color.js").Color | string | null): import("./IconImage.js").default;
    /**
     * @param {string} src Src.
     * @param {?string} crossOrigin Cross origin.
     * @param {import("../color.js").Color|string|null} color Color.
     * @return {CanvasPattern} Icon image.
     */
    getPattern(src: string, crossOrigin: string | null, color: import("../color.js").Color | string | null): CanvasPattern;
    /**
     * @param {string} src Src.
     * @param {?string} crossOrigin Cross origin.
     * @param {import("../color.js").Color|string|null} color Color.
     * @param {import("./IconImage.js").default|null} iconImage Icon image.
     * @param {boolean} [pattern] Also cache a `'repeat'` pattern with this `iconImage`.
     */
    set(src: string, crossOrigin: string | null, color: import("../color.js").Color | string | null, iconImage: import("./IconImage.js").default | null, pattern?: boolean): void;
    /**
     * Set the cache size of the icon cache. Default is `1024`. Change this value when
     * your map uses more than 1024 different icon images and you are not caching icon
     * styles on the application level.
     * @param {number} maxCacheSize Cache max size.
     * @api
     */
    setSize(maxCacheSize: number): void;
}
//# sourceMappingURL=IconImageCache.d.ts.map