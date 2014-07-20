/**
 * Limited cache is a size limited cache container that stores limited number of objects.
 * 
 * When {@link #get} is called, the container will try to find the object in the list.
 * If failed it will call the {@link #feeder} to create that object. If there are too many
 * objects in the container, the old ones are removed.
 * 
 * __Note:__ This is not using a Least Recently Used policy due to simplicity and performance consideration.
 */
Ext.define("Ext.draw.LimitedCache", {
    config: {
        /**
         * @cfg {Number}
         * The amount limit of the cache.
         */
        limit: 40,

        /**
         * @cfg {Function}
         * Function that generates the object when look-up failed.
         * @return {Number}
         */
        feeder: function () {
            return 0;
        },

        /**
         * @cfg {Object}
         * The scope for {@link #feeder}
         */
        scope: null
    },
    cache: null,

    constructor: function (config) {
        this.cache = {};
        this.cache.list = [];
        this.cache.tail = 0;
        this.initConfig(config);
    },

    /**
     * Get a cached object.
     * @param {String} id
     * @param {Mixed...} args Arguments appended to feeder.
     * @return {Object}
     */
    get: function (id) {
        // TODO: Implement cache hit optimization
        var cache = this.cache,
            limit = this.getLimit(),
            feeder = this.getFeeder(),
            scope = this.getScope() || this;

        if (cache[id]) {
            return cache[id].value;
        }
        if (cache.list[cache.tail]) {
            delete cache[cache.list[cache.tail].cacheId];
        }
        cache[id] = cache.list[cache.tail] = {
            value: feeder.apply(scope, Array.prototype.slice.call(arguments, 1)),
            cacheId: id
        };
        cache.tail++;
        if (cache.tail === limit) {
            cache.tail = 0;
        }
        return cache[id].value;
    },

    /**
     * Clear all the objects.
     */
    clear: function () {
        this.cache = {};
        this.cache.list = [];
        this.cache.tail = 0;
    }
});