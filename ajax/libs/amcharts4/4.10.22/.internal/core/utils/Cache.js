/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Dictionary } from "./Dictionary";
import * as $type from "./Type";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Represents object cache.
 *
 * @ignore Exclude from docs
 * @todo Better storage
 * @todo TTL logging
 * @todo Garbage collector
 */
var Cache = /** @class */ (function () {
    function Cache() {
        /**
         * Storage for cache items.
         */
        this._storage = new Dictionary();
        /**
         * Default TTL in milliseconds.
         */
        this.ttl = 1000;
    }
    /**
     * Caches or updates cached value, resets TTL.
     *
     * If `ttl` is set to zero, item will never expire.
     *
     * @param owner  An id of the object that owns this cache
     * @param key    Index key
     * @param value  Value
     * @param ttl    TTL of the cache to live in milliseconds
     */
    Cache.prototype.set = function (owner, key, value, ttl) {
        // Create if storage does not exist for this owner
        var ownerStorage = this._storage.insertKeyIfEmpty(owner, function () { return new Dictionary(); });
        // Create cache item
        var item = {
            "touched": new Date().getTime(),
            "ttl": $type.isNumber(ttl) ? ttl : this.ttl,
            "value": value
        };
        // Set
        ownerStorage.setKey(key, item);
    };
    /**
     * Rerturns cached item, respecting TTL.
     *
     * @param owner  An id of the object that owns this cache
     * @param key    Index key
     * @param value  Value to return if cache not available
     * @return Value, or `undefined` if not set
     */
    Cache.prototype.get = function (owner, key, value) {
        if (value === void 0) { value = undefined; }
        // 		 || ypeof this._storage[owner][key] === "undefined" || this._storage[owner][key].expired === true) {
        if (this._storage.hasKey(owner)) {
            var ownerStorage = this._storage.getKey(owner);
            if (ownerStorage.hasKey(key)) {
                var cacheItem = ownerStorage.getKey(key);
                if (cacheItem.ttl && ((cacheItem.touched + cacheItem.ttl) < new Date().getTime())) {
                    cacheItem.expired = true;
                }
                if (cacheItem.expired) {
                    ownerStorage.removeKey(key);
                    return value;
                }
                return cacheItem.value;
            }
            else {
                return value;
            }
        }
        else {
            return value;
        }
    };
    /**
     * Clears cache for specific owner or everything.
     *
     * @param owner Owner to clear cache for
     */
    Cache.prototype.clear = function (owner) {
        if (owner) {
            this._storage.removeKey(owner);
        }
        else {
            this._storage.clear();
        }
    };
    return Cache;
}());
export { Cache };
/**
 * ============================================================================
 * GLOBAL INSTANCE
 * ============================================================================
 * @hidden
 */
/**
 * A global instance of cache. Use this instance to cache any values.
 *
 * @ignore Exclude from docs
 */
export var cache = new Cache();
//# sourceMappingURL=Cache.js.map