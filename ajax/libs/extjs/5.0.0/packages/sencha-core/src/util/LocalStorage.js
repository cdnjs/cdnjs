/**
 * This class provides a common API to LocalStorage with backwards compatibility for IE.
 * 
 * The primary aspects of this API match the HTML5 standard API except that this class
 * provides a scoping mechanism to isolate property values by instance. This scope is
 * determined from the `id` property. Further, this class does not expose the number of
 * keys in the store as a `length` property as this cannot be maintained reliably without
 * undue cost. Instead there is a `getKeys` method that returns the cached array of keys
 * which is lazily populated on first call.
 * 
 * For example:
 * 
 *      var store = new Ext.util.LocalStorage({
 *              id: 'foo'
 *          });
 * 
 *      store.setItem('bar', 'stuff');
 *      
 *      // Equivalent to:
 *      window.localStorage.setItem('foo-bar', 'stuff');
 * 
 * In all cases, the `id` property is only used by the underlying storage and should not
 * be needed in item access calls or appear when enumerating keys.
 * 
 * To continue with the previous example:
 * 
 *      var keys = store.getKeys();
 *      console.log(keys.length);   // logs 1
 *      console.log(store.key(0));  // logs "bar"
 *
 * ## Sharing Instances
 * 
 * The management of the underlying storage can be broken if multiple instances of this
 * class are created with the same `id` simultaneously. To avoid creating multiple instances
 * with the same `id`, use the `get` method and it will lazily create and share a single
 * instance. When you are done with the shared instance, call `release`.
 * 
 *      var storage = Ext.util.LocalStorage.get('id');
 *      
 *      ...
 *      
 *      storage.release(); // do not call `destroy` as others may be using this object
 *
 * **IMPORTANT:** Do not mix direction instantiation and `get` with the same `id`.
 * 
 * ## Legacy IE
 * 
 * Older IE browsers (specifically IE7 and below) do not support `localStorage` so this
 * class provides equivalent support using the IE proprietary persistence mechanism: the
 * [`userData` behavior](http://msdn.microsoft.com/en-us/library/ms531424(VS.85).aspx). In
 * this mode, the `id` serves as name passed to the `load` and `save` methods and as the
 * suffix on the DOM element added to the `head`.
 * 
 * In this mode, writes to the underlying storage are buffered and delayed for performance
 * reasons. This can be managed using the `flushDelay` config or by directly calling the
 * `save` method.
 *
 * @since 4.2.2
 */
Ext.define('Ext.util.LocalStorage', {
    /**
     * The unique identifier for this store. This config is required to scope this storage
     * distinctly from others. Ultimately, this is used to set a prefix on all keys.
     * @cfg {String} id
     */
    id: null,

    /**
     * This property is set to `true` when the instance's `destroy` method is called.
     * @property {Boolean} destroyed
     * @readonly
     */
    destroyed: false,

    /**
     * Determines if the keys collection is continuously maintained by this object. By
     * default the keys array is lazily fetched from the underlying store and when keys
     * are removed, the array is discarded. This heuristic tends to be safer than doing
     * the linear removal and array rippling to remove keys from the array on each call
     * to `removeItem`. If the cost of scanning `localStorage` for keys is high enough
     * and if the keys are frequently needed, then this flag can be set to `false` to
     * instruct this class to maintain the keys array once it has been determined.
     * @cfg {Boolean} [lazyKeys=true]
     */
    lazyKeys: true,

    /**
     * The prefix to apply to all `localStorage` keys manages by this instance. This does
     * not apply to the legacy IE mechanism but only to the HTML5 `localStorage` keys. If
     * not provided, the `id` property initializes this value with `"id-"`.
     * @cfg {String} [prefix]
     */
    prefix: '',

    /**
     * Specify this as `true` to use `sessionStorage` instead of the default `localStoreage`.
     * This option is not supported in legacy IE browsers (IE 6 and 7) and is ignored.
     * @cfg {Boolean} [session=false]
     */
    session: false,

    /**
     * The array of all key names. This will be `null` if the keys need to be redetermined
     * by the `getKeys` method.
     * @property {String[]} _keys
     * @private
     * @readonly
     */
    _keys: null,

    /**
     * The Storage instance used to store items. This is based on the `session` config.
     * @property _store
     * @private
     * @readonly
     */
    _store: null,

    /**
     * The number of users that have requested this instance using the `get` method and
     * have not yet called `release`.
     * @property {Number} _users
     * @private
     * @readonly
     */
    _users: 0,

    statics: {
        cache: {},

        /**
         * Returns a shared instance of the desired local store given its `id`. When you
         * are finished with the returned object call the `release` method:
         * 
         *      var store = Ext.util.LocalStorage.get('foo');
         *      
         *      // .. use store
         *      
         *      store.release();
         * 
         * **NOTE:** Do not mix this call with direct instantiation of the same `id`.
         * @param {String/Object} id The `id` of the desired instance or a config object
         * with an `id` property at a minimum.
         * @return {Ext.util.LocalStorage} The desired instance, created if needed.
         */
        get: function (id) {
            var me = this,
                cache = me.cache,
                config = {
                    _users: 1 // allow constructor to recognize us as the caller
                },
                instance;

            if (Ext.isString(id)) {
                config.id = id;
            } else {
                Ext.apply(config, id);
            }

            if (!(instance = cache[config.id])) {
                instance = new me(config);
            } else {
                //<debug>
                if (instance === true) {
                    Ext.Error.raise('Creating a shared instance of private local store "' +
                        me.id + '".');
                }
                //</debug>

                ++instance._users;
            }

            return instance;
        },

        /**
         * This will be `true` if some form of local storage is supported or `false` if not.
         * @property {Boolean} supported
         * @readonly
         */
        supported: true
    },

    constructor: function (config) {
        var me = this;

        Ext.apply(me, config);

        //<debug>
        if (!me.hasOwnProperty('id')) {
            Ext.Error.raise("No id was provided to the local store.");
        }
        //</debug>

        if (me._users) {
            // When we are created by get() for shared use, the _users property is set to
            // 1... so this means we are being created for shared use: add this instance
            // to the cache.
            Ext.util.LocalStorage.cache[me.id] = me;
        }
        //<debug>
        else {
            // else we are being created directly so check that this id is not also in the
            // cache ... that would be "extraordinaly bad".

            if (Ext.util.LocalStorage.cache[me.id]) {
                Ext.Error.raise('Cannot create duplicate instance of local store "' +
                    me.id + '". Use Ext.util.LocalStorage.get() to share instances.');
            }

            // We put true in the cache to be detectable by get() for diagnostic reasons
            // but no "this" to avoid leaking the store:
            Ext.util.LocalStorage.cache[me.id] = true;
        }
        //</debug>

        me.init();
    },

    /**
     * Initializes this instance.
     * @private
     */
    init: function () {
        var me = this,
            id = me.id;

        if (!me.prefix && id) {
            me.prefix = id + '-';
        }
        me._store = (me.session ? window.sessionStorage : window.localStorage);
    },

    /**
     * Destroys this instance and for legacy IE, ensures data is flushed to persistent
     * storage. This method should not be called directly on instances returned by the
     * `get` method. Call `release` instead for such instances.
     * 
     * *NOTE:* For non-legacy IE browsers, there is no harm in failing to call this
     * method. In legacy IE, however, failing to call this method can result in memory
     * leaks.
     */
    destroy: function () {
        var me = this;

        //<debug>
        if (me._users) {
            Ext.log.warn('LocalStorage(id=' + me.id + ') destroyed while in use');
        }
        //</debug>

        delete Ext.util.LocalStorage.cache[me.id];
        me._store = me._keys = null;
        me.destroyed = true;
        me.destroy = Ext.emptyFn;
    },

    /**
     * Returns the keys for this storage.
     * @return {String[]} The keys for this storage. This array should be considered as
     * readonly.
     */
    getKeys: function () {
        var me = this,
            store = me._store,
            prefix = me.prefix,
            keys = me._keys,
            n = prefix.length,
            i, key;

        if (!keys) {
            me._keys = keys = [];

            for (i = store.length; i--; ) {
                key = store.key(i);
                if (key.length > n) {
                    if (prefix === key.substring(0, n)) {
                        keys.push(key.substring(n));
                    }
                }
            }
        }

        return keys;
    },

    /**
     * Call this method when finished with an instance returned by `get` instead of calling
     * `destroy`. When the last shared use of this instance calls `release`, the `destroy`
     * method is called automatically.
     * 
     * *NOTE:* Failing to call this method will result in memory leaks.
     */
    release: function () {
        if (! --this._users) {
            this.destroy();
        }
    },

    /**
     * @static
     * @private
     */
    save: Ext.emptyFn,

    /**
     * Removes all of the keys of this storage.
     * **NOTE:** This method conforms to the standard HTML5 Storage interface.
     */
    clear: function () {
        var me = this,
            store = me._store,
            prefix = me.prefix,
            keys = me._keys || me.getKeys(),
            i;

        for (i = keys.length; i--; ) {
            store.removeItem(prefix + keys[i]);
        }

        keys.length = 0;
    },

    /**
     * Returns the specified key given its `index`. These keys have the scoping prefix
     * removed so they match what was passed to `setItem`.
     * **NOTE:** This method conforms to the standard HTML5 Storage interface.
     * @param {Number} index The index of the desired key.
     * @return {String} The key.
     */
    key: function (index) {
        var keys = this._keys || this.getKeys();

        return (0 <= index && index < keys.length) ? keys[index] : null;
    },

    /**
     * Returns the value associated with the given `key`.
     * **NOTE:** This method conforms to the standard HTML5 Storage interface.
     * @param {String} key The key.
     * @return {String} The value associated with the given `key`.
     */
    getItem: function (key) {
        var k = this.prefix + key;

        return this._store.getItem(k);
    },

    /**
     * Removes the value associated with the given `key`.
     * **NOTE:** This method conforms to the standard HTML5 Storage interface.
     * @param {String} key The key.
     */
    removeItem: function (key) {
        var me = this,
            k = me.prefix + key,
            store = me._store,
            keys = me._keys,
            length = store.length;

        store.removeItem(k);

        if (keys && length !== store.length) {
            if (me.lazyKeys) {
                me._keys = null;
            } else {
                Ext.Array.remove(keys, key);
            }
        }
    },

    /**
     * Sets the value associated with the given `key`.
     * **NOTE:** This method conforms to the standard HTML5 Storage interface.
     * @param {String} key The key.
     * @param {String} value The new associated value for `key`.
     */
    setItem: function (key, value) {
        var me = this,
            k = me.prefix + key,
            store = me._store,
            length = store.length,
            keys = me._keys;

        store.setItem(k, value);

        if (keys && length !== store.length) {
            // Good news here - maintaining the keys collection is easy in this case.
            keys.push(key);
        }
    }
}, function () {
    var LocalStorage = this;

    if ('localStorage' in window) {
        return;
    }
    if (!Ext.isIE) {
        LocalStorage.supported = false;
        //<debug>
        LocalStorage.prototype.init = function () {
            Ext.Error.raise("Local storage is not supported on this browser");
        };
        //</debug>
        return;
    }

    // The legacy IE polyfill has to store values as attributes which have strict rules on
    // valid names. Rather than handle that per-key, we just JSON enocde an object and use
    // just the "xdata" attribute.
    //
    LocalStorage.override({
        /**
         * The parsed data object. This is JSON encoded and saved in storage as the `xdata`
         * attribute.
         * @property {Object} data
         * @private
         * @readonly
         */
        data: null,

        /**
         * The IE `userData` enabled element. This property is used to support legacy IE
         * mode.
         * @property {HTMLElement} el
         * @private
         * @readonly
         */

        /**
         * The number of milliseconds to delay writing changes to the underlying store.
         * This applies only to legacy IE mode and helps batch multiple writes into one
         * flush to storage.
         * @cfg {Number} [flushDelay=1]
         */
        flushDelay: 1,

        init: function () {
            var me = this,
                data = me.data,
                el;

            me.el = el = document.createElement('div');

            el.id = (me.id || (me.id = 'extjs-localstore'));
            el.addBehavior('#default#userdata');

            // Add to <head> to ensure the div is invisible
            Ext.getHead().dom.appendChild(el);

            el.load(me.id);
            data = el.getAttribute('xdata');

            me.data = data = (data ? Ext.decode(data) : {});

            me._flushFn = function () {
                me._timer = null;
                me.save(0);
            };
        },

        destroy: function () {
            var me = this,
                el = me.el;

            if (el) {
                // If we have a save pending, flush that now:
                if (me._timer) {
                    me.save();
                }

                el.parentNode.removeChild(el);
                me.data = me.el = null;

                me.callParent();
            }
        },

        getKeys: function () {
            var me = this,
                keys = me._keys;

            if (!keys) {
                me._keys = keys = Ext.Object.getKeys(me.data);
            }

            return keys;
        },

        /**
         * This method ensures the content of the store is saved to the underlying storage.
         * This applies only to legacy IE. This is not normally called by user code but can
         * be called to ensure storage is saved.
         * @param {Number} [delay=0]
         */
        save: function (delay) {
            var me = this;

            if (!delay) {
                if (me._timer) {
                    clearTimeout(me._timer);
                    me._timer = null;
                }

                me.el.setAttribute('xdata', Ext.encode(me.data));
                me.el.save(me.id);
            } else if (!me._timer) {
                me._timer = setTimeout(me._flushFn, delay);
            }
        },

        clear: function () {
            var me = this;

            me.data = {};
            me._keys = null;
            me.save(me.flushDelay);
        },

        getItem: function (key) {
            var data = this.data;

            return (key in data) ? data[key] : null;
        },

        removeItem: function (key) {
            var me = this,
                keys = me._keys,
                data = me.data;

            if (key in data) {
                delete data[key];

                if (keys) {
                    if (me.lazyKeys) {
                        me._keys = null;
                    } else {
                        Ext.Array.remove(keys, key);
                    }
                }

                me.save(me.flushDelay);
            }
        },

        setItem: function (key, value) {
            var me = this,
                data = me.data,
                keys = me._keys;

            if (keys && !(key in data)) {
                keys.push(key);
            }

            data[key] = value;
            me.save(me.flushDelay);
        }
    });
});
