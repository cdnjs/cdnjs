/**
 * @module ol/style/IconImageCache
 */
import { asString } from '../color.js';
/**
 * @classdesc
 * Singleton class. Available through {@link module:ol/style/IconImageCache~shared}.
 */
var IconImageCache = /** @class */ (function () {
    function IconImageCache() {
        /**
         * @type {!Object<string, import("./IconImage.js").default>}
         * @private
         */
        this.cache_ = {};
        /**
         * @type {number}
         * @private
         */
        this.cacheSize_ = 0;
        /**
         * @type {number}
         * @private
         */
        this.maxCacheSize_ = 32;
    }
    /**
     * FIXME empty description for jsdoc
     */
    IconImageCache.prototype.clear = function () {
        this.cache_ = {};
        this.cacheSize_ = 0;
    };
    /**
     * @return {boolean} Can expire cache.
     */
    IconImageCache.prototype.canExpireCache = function () {
        return this.cacheSize_ > this.maxCacheSize_;
    };
    /**
     * FIXME empty description for jsdoc
     */
    IconImageCache.prototype.expire = function () {
        if (this.canExpireCache()) {
            var i = 0;
            for (var key in this.cache_) {
                var iconImage = this.cache_[key];
                if ((i++ & 3) === 0 && !iconImage.hasListener()) {
                    delete this.cache_[key];
                    --this.cacheSize_;
                }
            }
        }
    };
    /**
     * @param {string} src Src.
     * @param {?string} crossOrigin Cross origin.
     * @param {import("../color.js").Color} color Color.
     * @return {import("./IconImage.js").default} Icon image.
     */
    IconImageCache.prototype.get = function (src, crossOrigin, color) {
        var key = getKey(src, crossOrigin, color);
        return key in this.cache_ ? this.cache_[key] : null;
    };
    /**
     * @param {string} src Src.
     * @param {?string} crossOrigin Cross origin.
     * @param {import("../color.js").Color} color Color.
     * @param {import("./IconImage.js").default} iconImage Icon image.
     */
    IconImageCache.prototype.set = function (src, crossOrigin, color, iconImage) {
        var key = getKey(src, crossOrigin, color);
        this.cache_[key] = iconImage;
        ++this.cacheSize_;
    };
    /**
     * Set the cache size of the icon cache. Default is `32`. Change this value when
     * your map uses more than 32 different icon images and you are not caching icon
     * styles on the application level.
     * @param {number} maxCacheSize Cache max size.
     * @api
     */
    IconImageCache.prototype.setSize = function (maxCacheSize) {
        this.maxCacheSize_ = maxCacheSize;
        this.expire();
    };
    return IconImageCache;
}());
/**
 * @param {string} src Src.
 * @param {?string} crossOrigin Cross origin.
 * @param {import("../color.js").Color} color Color.
 * @return {string} Cache key.
 */
function getKey(src, crossOrigin, color) {
    var colorString = color ? asString(color) : 'null';
    return crossOrigin + ':' + src + ':' + colorString;
}
export default IconImageCache;
/**
 * The {@link module:ol/style/IconImageCache~IconImageCache} for
 * {@link module:ol/style/Icon~Icon} images.
 * @api
 */
export var shared = new IconImageCache();
//# sourceMappingURL=IconImageCache.js.map