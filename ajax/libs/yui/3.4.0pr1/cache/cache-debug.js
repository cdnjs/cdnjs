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

YUI.add('cache-offline', function(Y) {

/**
 * Extends Cache utility with offline functionality.
 * @class CacheOffline
 * @extends Cache
 * @constructor
 */
function CacheOffline() {
    CacheOffline.superclass.constructor.apply(this, arguments);
}

var localStorage = null,
    JSON = Y.JSON;

// Bug 2529572
try {
    localStorage = Y.config.win.localStorage;
}
catch(e) {
    Y.log("Could not access localStorage.", "warn", "cache");
}

/////////////////////////////////////////////////////////////////////////////
//
// CacheOffline events
//
/////////////////////////////////////////////////////////////////////////////

/**
* @event error
* @description Fired when an entry could not be added, most likely due to
* exceeded browser quota.
* <dl>
* <dt>error (Object)</dt> <dd>The error object.</dd>
* </dl>
*/

/////////////////////////////////////////////////////////////////////////////
//
// CacheOffline static
//
/////////////////////////////////////////////////////////////////////////////
Y.mix(CacheOffline, {
    /**
     * Class name.
     *
     * @property NAME
     * @type String
     * @static
     * @final
     * @value "cacheOffline"
     */
    NAME: "cacheOffline",

    ATTRS: {
        /////////////////////////////////////////////////////////////////////////////
        //
        // CacheOffline Attributes
        //
        /////////////////////////////////////////////////////////////////////////////

        /**
        * @attribute sandbox
        * @description A string that must be passed in via the constructor.
        * This identifier is used to sandbox one cache instance's entries
        * from another. Calling the cache instance's flush and length methods
        * or get("entries") will apply to only these sandboxed entries.
        * @type String
        * @default "default"
        * @initOnly
        */
        sandbox: {
            value: "default",
            writeOnce: "initOnly"
        },

        /**
        * @attribute expires
        * @description Absolute Date when data expires or
        * relative number of milliseconds. Zero disables expiration.
        * @type Date | Number
        * @default 86400000 (one day)
        */
        expires: {
            value: 86400000
        },

        /**
        * @attribute max
        * @description Disabled.
        * @readOnly
        * @default null
        */
        max: {
            value: null,
            readOnly: true
        },

        /**
        * @attribute uniqueKeys
        * @description Always true for CacheOffline.
        * @readOnly
        * @default true
        */
        uniqueKeys: {
            value: true,
            readOnly: true,
            setter: function() {
                return true;
            }
        }
    },

    /**
     * Removes all items from all sandboxes. Useful if localStorage has
     * exceeded quota. Only supported on browsers that implement HTML 5
     * localStorage.
     *
     * @method flushAll
     * @static
     */
    flushAll: function() {
        var store = localStorage, key;
        if(store) {
            if(store.clear) {
                store.clear();
            }
            // FF2.x and FF3.0.x
            else {
                for (key in store) {
                    if (store.hasOwnProperty(key)) {
                        store.removeItem(key);
                        delete store[key];
                    }
                }
            }
            Y.log("All sandboxes of OfflineCache flushed", "info", "cache");
        }
        else {
            Y.log("Could not flush all OfflineCache sandboxes.", "warn", "cache");
        }
    }
});

Y.extend(CacheOffline, Y.Cache, localStorage ? {
/////////////////////////////////////////////////////////////////////////////
//
// Offline is supported
//
/////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////
    //
    // CacheOffline protected methods
    //
    /////////////////////////////////////////////////////////////////////////////
    /**
     * Always return null.
     *
     * @method _setMax
     * @protected
     */
    _setMax: function(value) {
        return null;
    },

    /**
     * Gets size.
     *
     * @method _getSize
     * @protected
     */
    _getSize: function() {
        var count = 0,
            i=0,
            l=localStorage.length;
        for(; i<l; ++i) {
            // Match sandbox id
            if(localStorage.key(i).indexOf(this.get("sandbox")) === 0) {
                count++;
            }
        }
        return count;
    },

    /**
     * Gets all entries.
     *
     * @method _getEntries
     * @protected
     */
    _getEntries: function() {
        var entries = [],
            i=0,
            l=localStorage.length,
            sandbox = this.get("sandbox");
        for(; i<l; ++i) {
            // Match sandbox id
            if(localStorage.key(i).indexOf(sandbox) === 0) {
                entries[i] = JSON.parse(localStorage.key(i).substring(sandbox.length));
            }
        }
        return entries;
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
        var entry = e.entry,
            request = entry.request,
            cached = entry.cached,
            expires = entry.expires;

        // Convert Dates to msecs on the way into localStorage
        entry.cached = cached.getTime();
        entry.expires = expires ? expires.getTime() : expires;

        try {
            localStorage.setItem(this.get("sandbox")+JSON.stringify({"request":request}), JSON.stringify(entry));
            Y.log("Cached offline entry: " + Y.dump(entry), "info", "cache");
        }
        catch(error) {
            this.fire("error", {error:error});
            Y.log("Could not cache offline entry: " + Y.dump(entry) +
            " due to error: " + Y.dump(error), "warn", "cache");
        }
    },

    /**
     * Flushes cache.
     *
     * @method _defFlushFn
     * @param e {Event.Facade} Event Facade object.
     * @protected
     */
    _defFlushFn: function(e) {
        var key,
            i=localStorage.length-1;
        for(; i>-1; --i) {
            // Match sandbox id
            key = localStorage.key(i);
            if(key.indexOf(this.get("sandbox")) === 0) {
                localStorage.removeItem(key);
            }
        }
    },

    /////////////////////////////////////////////////////////////////////////////
    //
    // CacheOffline public methods
    //
    /////////////////////////////////////////////////////////////////////////////
    /**
     * Adds a new entry to the cache of the format
     * {request:request, response:response, cached:cached, expires: expires}.
     *
     * @method add
     * @param request {Object} Request value must be a String or JSON.
     * @param response {Object} Response value must be a String or JSON.
     */

    /**
     * Retrieves cached object for given request, if available.
     * Returns null if there is no cache match.
     *
     * @method retrieve
     * @param request {Object} Request object.
     * @return {Object} Cached object with the properties request, response,
     * and expires, or null.
     */
    retrieve: function(request) {
        this.fire("request", {request: request});

        var entry, expires, sandboxedrequest;

        try {
            sandboxedrequest = this.get("sandbox")+JSON.stringify({"request":request});
            try {
                entry = JSON.parse(localStorage.getItem(sandboxedrequest));
            }
            catch(e) {
            }
        }
        catch(e2) {
        }

        if(entry) {
            // Convert msecs to Dates on the way out of localStorage
            entry.cached = new Date(entry.cached);
            expires = entry.expires;
            expires = !expires ? null : new Date(expires);
            entry.expires = expires;

            if(this._isMatch(request, entry)) {
                this.fire("retrieve", {entry: entry});
                Y.log("Retrieved offlinecached response: " + Y.dump(entry) +
                        " for request: " + Y.dump(request), "info", "cache");
                return entry;
            }
        }
        return null;
    }
} :
/////////////////////////////////////////////////////////////////////////////
//
// Offline is not supported
//
/////////////////////////////////////////////////////////////////////////////
{
    /**
     * Always return null.
     *
     * @method _setMax
     * @protected
     */
    _setMax: function(value) {
        return null;
    }
});


Y.CacheOffline = CacheOffline;



}, '@VERSION@' ,{requires:['cache-base', 'json']});

YUI.add('cache-plugin', function(Y) {

/**
 * Plugin.Cache adds pluginizability to Cache.
 * @class Plugin.Cache
 * @extends Cache
 * @uses Plugin.Base
 */
function CachePlugin(config) {
    var cache = config && config.cache ? config.cache : Y.Cache,
        tmpclass = Y.Base.create("dataSourceCache", cache, [Y.Plugin.Base]),
        tmpinstance = new tmpclass(config);
    tmpclass.NS = "tmpClass";
    return tmpinstance;
}

Y.mix(CachePlugin, {
    /**
     * The namespace for the plugin. This will be the property on the host which
     * references the plugin instance.
     *
     * @property NS
     * @type String
     * @static
     * @final
     * @value "cache"
     */
    NS: "cache",

    /**
     * Class name.
     *
     * @property NAME
     * @type String
     * @static
     * @final
     * @value "dataSourceCache"
     */
    NAME: "cachePlugin"
});


Y.namespace("Plugin").Cache = CachePlugin;



}, '@VERSION@' ,{requires:['plugin','cache-base']});



YUI.add('cache', function(Y){}, '@VERSION@' ,{use:['cache-base','cache-offline','cache-plugin']});

