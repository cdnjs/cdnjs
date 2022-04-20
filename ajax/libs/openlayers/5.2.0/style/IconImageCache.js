/**
 * @module ol/style/IconImageCache
 */
import {asString} from '../color.js';

/**
 * @classdesc
 * Singleton class. Available through {@link module:ol/style/IconImageCache~shared}.
 */
var IconImageCache = function IconImageCache() {

  /**
  * @type {!Object<string, module:ol/style/IconImage>}
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
};

/**
* FIXME empty description for jsdoc
*/
IconImageCache.prototype.clear = function clear () {
  this.cache_ = {};
  this.cacheSize_ = 0;
};

/**
* FIXME empty description for jsdoc
*/
IconImageCache.prototype.expire = function expire () {
    var this$1 = this;

  if (this.cacheSize_ > this.maxCacheSize_) {
    var i = 0;
    for (var key in this$1.cache_) {
      var iconImage = this$1.cache_[key];
      if ((i++ & 3) === 0 && !iconImage.hasListener()) {
        delete this$1.cache_[key];
        --this$1.cacheSize_;
      }
    }
  }
};

/**
* @param {string} src Src.
* @param {?string} crossOrigin Cross origin.
* @param {module:ol/color~Color} color Color.
* @return {module:ol/style/IconImage} Icon image.
*/
IconImageCache.prototype.get = function get (src, crossOrigin, color) {
  var key = getKey(src, crossOrigin, color);
  return key in this.cache_ ? this.cache_[key] : null;
};

/**
* @param {string} src Src.
* @param {?string} crossOrigin Cross origin.
* @param {module:ol/color~Color} color Color.
* @param {module:ol/style/IconImage} iconImage Icon image.
*/
IconImageCache.prototype.set = function set (src, crossOrigin, color, iconImage) {
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
IconImageCache.prototype.setSize = function setSize (maxCacheSize) {
  this.maxCacheSize_ = maxCacheSize;
  this.expire();
};


/**
 * @param {string} src Src.
 * @param {?string} crossOrigin Cross origin.
 * @param {module:ol/color~Color} color Color.
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