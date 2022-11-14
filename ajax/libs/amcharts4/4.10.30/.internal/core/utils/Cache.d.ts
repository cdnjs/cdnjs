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
export declare class Cache<A> {
    /**
     * Storage for cache items.
     */
    private _storage;
    /**
     * Default TTL in milliseconds.
     */
    ttl: number;
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
    set(owner: string, key: string, value: A, ttl?: number): void;
    /**
     * Rerturns cached item, respecting TTL.
     *
     * @param owner  An id of the object that owns this cache
     * @param key    Index key
     * @param value  Value to return if cache not available
     * @return Value, or `undefined` if not set
     */
    get(owner: string, key: string, value?: any): $type.Optional<A>;
    /**
     * Clears cache for specific owner or everything.
     *
     * @param owner Owner to clear cache for
     */
    clear(owner?: string): void;
}
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
export declare let cache: Cache<any>;
