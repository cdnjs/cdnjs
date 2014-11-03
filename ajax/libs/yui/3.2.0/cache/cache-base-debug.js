YUI.add('cache-base', function(Y) {

/**
 * The Cache utility provides a common configurable interface for components to
 * cache and retrieve data from a local JavaScript struct.
 *
 * @module cache
 */
var LANG = Y.Lang,
    isDate = Y.Lang.isDate,

/**
 * Base class for the YUI Cache utility.
 * @class Cache
 * @extends Base
 * @constructor
 */
Cache = function() {
    Cache.superclass.constructor.apply(this, arguments);
};

    /////////////////////////////////////////////////////////////////////////////
    //
    // Cache static properties
    //
    /////////////////////////////////////////////////////////////////////////////
Y.mix(Cache, {
    /**
     * Class name.
     *
     * @property NAME
     * @type String
     * @static
     * @final
     * @value "cache"
     */
    NAME: "cache",


    ATTRS: {
        /////////////////////////////////////////////////////////////////////////////
        //
        // Cache Attributes
        //
        /////////////////////////////////////////////////////////////////////////////

        /**
        * @attribute max
        * @description Maximum number of entries the Cache can hold.
        * Set to 0 to turn off caching.
        * @type Number
        * @default 0
        */
        max: {
            value: 0,
            setter: "_setMax"
        },

        /**
        * @attribute size
        * @description Number of entries currently cached.
        * @type Number
        */
        size: {
            readOnly: true,
            getter: "_getSize"
        },

        /**
        * @attribute uniqueKeys
        * @description Validate uniqueness of stored keys. Default is false and
        * is more performant.
        * @type Boolean
        */
        uniqueKeys: {
            value: false
        },

        /**
        * @attribute expires
        * @description Absolute Date when data expires or
        * relative number of milliseconds. Zero disables expiration.
        * @type Date | Number
        * @default 0
        */
        expires: {
            value: 0,
            validator: function(v) {
                return Y.Lang.isDate(v) || (Y.Lang.isNumber(v) && v >= 0);
            }
        },

        /**
         * @attribute entries
         * @description Cached entries.
         * @type Array
         */
        entries: {
            readOnly: true,
            getter: "_getEntries"
        }
    }
});

Y.extend(Cache, Y.Base, {
    /////////////////////////////////////////////////////////////////////////////
    //
    // Cache private properties
    //
    /////////////////////////////////////////////////////////////////////////////

    /**
     * Array of request/response objects indexed chronologically.
     *
     * @property _entries
     * @type Object[]
     * @private
     */
    _entries: null,

    /////////////////////////////////////////////////////////////////////////////
    //
    // Cache private methods
    //
    /////////////////////////////////////////////////////////////////////////////

    /**
    * @method initializer
    * @description Internal init() handler.
    * @param config {Object} Config object.
    * @private
    */
    initializer: function(config) {

        /**
        * @event add
        * @description Fired when an entry is added.
        * @param e {Event.Facade} Event Facade with the following properties:
         * <dl>
         * <dt>entry (Object)</dt> <dd>The cached entry.</dd>
         * </dl>
        * @preventable _defAddFn
        */
        this.publish("add", {defaultFn: this._defAddFn});

        /**
        * @event flush
        * @description Fired when the cache is flushed.
        * @param e {Event.Facade} Event Facade object.
        * @preventable _defFlushFn
        */
        this.publish("flush", {defaultFn: this._defFlushFn});

        /**
        * @event request
        * @description Fired when an entry is requested from the cache.
        * @param e {Event.Facade} Event Facade with the following properties:
        * <dl>
        * <dt>request (Object)</dt> <dd>The request object.</dd>
        * </dl>
        */

        /**
        * @event retrieve
        * @description Fired when an entry is retrieved from the cache.
        * @param e {Event.Facade} Event Facade with the following properties:
        * <dl>
        * <dt>entry (Object)</dt> <dd>The retrieved entry.</dd>
        * </dl>
        */

        // Initialize internal values
        this._entries = [];
        Y.log("Cache initialized", "info", "cache");
    },

    /**
    * @method destructor
    * @description Internal destroy() handler.
    * @private
    */
    destructor: function() {
        this._entries = [];
        Y.log("Cache destroyed", "info", "cache");
    },

    /////////////////////////////////////////////////////////////////////////////
    //
    // Cache protected methods
    //
    /////////////////////////////////////////////////////////////////////////////

    /**
     * Sets max.
     *
     * @method _setMax
     * @protected
     */
    _setMax: function(value) {
        // If the cache is full, make room by removing stalest element (index=0)
        var entries = this._entries;
        if(value > 0) {
            if(entries) {
                while(entries.length > value) {
                    entries.shift();
                }
            }
        }
        else {
            value = 0;
            this._entries = [];
        }
        return value;
    },

    /**
     * Gets size.
     *
     * @method _getSize
     * @protected
     */
    _getSize: function() {
        return this._entries.length;
    },

    /**
     * Gets all entries.
     *
     * @method _getEntries
     * @protected
     */
    _getEntries: function() {
        return this._entries;
    },


    /**
     * Adds entry to cache.
     *
     * @method _defAddFn
     * @param e {Event.Facade} Event Facade with the following properties:
     * <dl>
     * <dt>entry (Object)</dt> <dd>The cached entry.</dd>
     * </dl>
     * @protected
     */
    _defAddFn: function(e) {
        var entries = this._entries,
            max = this.get("max"),
            entry = e.entry;

        if(this.get("uniqueKeys") && (this.retrieve(e.entry.request))) {
            entries.shift();
        }


        // If the cache at or over capacity, make room by removing stalest element (index=0)
        while(max && entries.length>=max) {
            entries.shift();
        }

        // Add entry to cache in the newest position, at the end of the array
        entries[entries.length] = entry;
        Y.log("Cached entry: " + Y.dump(entry), "info", "cache");
    },

    /**
     * Flushes cache.
     *
     * @method _defFlushFn
     * @param e {Event.Facade} Event Facade object.
     * @protected
     */
    _defFlushFn: function(e) {
        this._entries = [];
        Y.log("Cache flushed", "info", "cache");
    },

    /**
     * Default overridable method compares current request with given cache entry.
     * Returns true if current request matches the cached request, otherwise
     * false. Implementers should override this method to customize the
     * cache-matching algorithm.
     *
     * @method _isMatch
     * @param request {Object} Request object.
     * @param entry {Object} Cached entry.
     * @return {Boolean} True if current request matches given cached request, false otherwise.
     * @protected
     */
    _isMatch: function(request, entry) {
        if(!entry.expires || new Date() < entry.expires) {
            return (request === entry.request);
        }
        return false;
    },

    /////////////////////////////////////////////////////////////////////////////
    //
    // Cache public methods
    //
    /////////////////////////////////////////////////////////////////////////////

    /**
     * Adds a new entry to the cache of the format
     * {request:request, response:response, cached:cached, expires:expires}.
     * If cache is full, evicts the stalest entry before adding the new one.
     *
     * @method add
     * @param request {Object} Request value.
     * @param response {Object} Response value.
     */
    add: function(request, response) {
        var expires = this.get("expires");
        if(this.get("initialized") && ((this.get("max") === null) || this.get("max") > 0) &&
                (LANG.isValue(request) || LANG.isNull(request) || LANG.isUndefined(request))) {
            this.fire("add", {entry: {
                request:request,
                response:response,
                cached: new Date(),
                expires: isDate(expires) ? expires :
            (expires ? new Date(new Date().getTime() + this.get("expires")) : null)
            }});
        }
        else {
            Y.log("Could not add " + Y.dump(response) + " to cache for " + Y.dump(request), "info", "cache");
        }
    },

    /**
     * Flushes cache.
     *
     * @method flush
     */
    flush: function() {
        this.fire("flush");
    },

    /**
     * Retrieves cached object for given request, if available, and refreshes
     * entry in the cache. Returns null if there is no cache match.
     *
     * @method retrieve
     * @param request {Object} Request object.
     * @return {Object} Cached object with the properties request and response, or null.
     */
    retrieve: function(request) {
        // If cache is enabled...
        var entries = this._entries,
            length = entries.length,
            entry = null,
            i = length-1;

        if((length > 0) && ((this.get("max") === null) || (this.get("max") > 0))) {
            this.fire("request", {request: request});

            // Loop through each cached entry starting from the newest
            for(; i >= 0; i--) {
                entry = entries[i];

                // Execute matching function
                if(this._isMatch(request, entry)) {
                    this.fire("retrieve", {entry: entry});

                    // Refresh the position of the cache hit
                    if(i < length-1) {
                        // Remove element from its original location
                        entries.splice(i,1);
                        // Add as newest
                        entries[entries.length] = entry;
                        Y.log("Refreshed cache entry: " + Y.dump(entry) +
                                " for request: " +  Y.dump(request), "info", "cache");
                    }

                    Y.log("Retrieved cached response: " + Y.dump(entry) +
                            " for request: " + Y.dump(request), "info", "cache");
                    return entry;
                }
            }
        }
        return null;
    }
});

Y.Cache = Cache;



}, '@VERSION@' ,{requires:['base']});
