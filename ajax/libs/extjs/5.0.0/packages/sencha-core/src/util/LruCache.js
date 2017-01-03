/**
 * @private
 * @class Ext.util.LruCache
 * @extend Ext.util.HashMap
 * A linked {@link Ext.util.HashMap HashMap} implementation which maintains most recently accessed
 * items at the end of the list, and purges the cache down to the most recently accessed {@link #maxSize} items
 * upon add.
 */
Ext.define('Ext.util.LruCache', {
    extend: 'Ext.util.HashMap',

    config: {
        /** 
        * @cfg {Number} maxSize The maximum size the cache is allowed to grow to before further additions cause
        * removal of the least recently used entry.
        */
       maxSize: null
   },

    /*
     * @inheritdoc
     */
    add: function(key, newValue) {
        var me = this,
            existingKey = me.findKey(newValue),
            entry;

        // "new" value is in the list.
        if (existingKey) {
            me.unlinkEntry(entry = me.map[existingKey]);
            entry.prev = me.last;
            entry.next = null;
        }
        // Genuinely new: create an entry for it.
        else {
            entry = {
                prev: me.last,
                next: null,
                key: key,
                value: newValue
            };
        }

        // If the list is not empty, update the last entry
        if (me.last) {
            me.last.next = entry;
        }
        // List is empty
        else {
            me.first = entry;
        }
        me.last = entry;
        me.callParent([key, entry]);
        me.prune();
        return newValue;
    },

    // @private
    insertBefore: function(key, newValue, sibling) {
        var me = this,
            existingKey,
            entry;

        // NOT an assignment.
        // If there is a following sibling
        if (sibling = this.map[this.findKey(sibling)]) {
            existingKey = me.findKey(newValue);

            // "new" value is in the list.
            if (existingKey) {
                me.unlinkEntry(entry = me.map[existingKey]);
            }
            // Genuinely new: create an entry for it.
            else {
                entry = {
                    prev: sibling.prev,
                    next: sibling,
                    key: key,
                    value: newValue
                };
            }

            if (sibling.prev) {
                entry.prev.next = entry;
            } else {
                me.first = entry;
            }
            entry.next = sibling;
            sibling.prev = entry;
            me.prune();
            return newValue;
        }
        // No following sibling, it's just an add.
        else {
            return me.add(key, newValue);
        }
    },

    /*
     * @inheritdoc
     */
    get: function(key) {
        var entry = this.map[key];
        if (entry) {

            // If it's not the end, move to end of list on get
            if (entry.next) {
                this.moveToEnd(entry);
            }
            return entry.value;
        }
    },

    /*
     * @private
     */
    removeAtKey: function(key) {
        this.unlinkEntry(this.map[key]);
        return this.callParent(arguments);
    },

    /*
     * @inheritdoc
     */
    clear: function(/* private */ initial) {
        this.first = this.last = null;
        return this.callParent(arguments);
    },

    // private. Only used by internal methods.
    unlinkEntry: function(entry) {
        // Stitch the list back up.
        if (entry) {
            if (entry.next) {
                entry.next.prev = entry.prev;
            } else {
                this.last = entry.prev;
            }
            if (entry.prev) {
                entry.prev.next = entry.next;
            } else {
                this.first = entry.next;
            }
            entry.prev = entry.next = null;
        }
    },

    // private. Only used by internal methods.
    moveToEnd: function(entry) {
        this.unlinkEntry(entry);

        // NOT an assignment.
        // If the list is not empty, update the last entry
        if (entry.prev = this.last) {
            this.last.next = entry;
        }
        // List is empty
        else {
            this.first = entry;
        }
        this.last = entry;
    },

    /*
     * @private
     */
    getArray: function(isKey) {
        var arr = [],
            entry = this.first;

        while (entry) {
            arr.push(isKey ? entry.key: entry.value);
            entry = entry.next;
        }
        return arr;
    },

    /**
     * Executes the specified function once for each item in the cache.
     * Returning false from the function will cease iteration.
     *
     * By default, iteration is from least recently used to most recent.
     *
     * The paramaters passed to the function are:
     * <div class="mdetail-params"><ul>
     * <li><b>key</b> : String<p class="sub-desc">The key of the item</p></li>
     * <li><b>value</b> : Number<p class="sub-desc">The value of the item</p></li>
     * <li><b>length</b> : Number<p class="sub-desc">The total number of items in the hash</p></li>
     * </ul></div>
     * @param {Function} fn The function to execute.
     * @param {Object} scope The scope (<code>this</code> reference) to execute in. Defaults to this LruCache.
     * @param {Boolean} [reverse=false] Pass <code>true</code> to iterate the list in reverse (most recent first) order.
     * @return {Ext.util.LruCache} this
     */
    each: function(fn, scope, reverse) {
        var me = this,
            entry = reverse ? me.last : me.first,
            length = me.length;

        scope = scope || me;
        while (entry) {
            if (fn.call(scope, entry.key, entry.value, length) === false) {
                break;
            }
            entry = reverse ? entry.prev : entry.next;
        }
        return me;
    },

    /**
     * @private
     */
    findKey: function(value) {
        var key,
            map = this.map;

        for (key in map) {
            // Attention. Differs from subclass in that this compares the value property
            // of the entry.
            if (map.hasOwnProperty(key) && map[key].value === value) {
                return key;
            }
        }
        return undefined;
    },

    /**
     * Performs a shallow copy on this haLruCachesh.
     * @return {Ext.util.HashMap} The new hash object.
     */
    clone: function() {
        var newCache = new this.self(this.initialConfig),
            map = this.map,
            key;

        newCache.suspendEvents();
        for (key in map) {
            if (map.hasOwnProperty(key)) {
                newCache.add(key, map[key].value);
            }
        }
        newCache.resumeEvents();
        return newCache;
    },

    /**
     * Purge the least recently used entries if the maxSize has been exceeded.
     */
    prune: function() {
        var me = this,
            max = me.getMaxSize(),
            purgeCount = max ? (me.length - max) : 0;

        if (purgeCount > 0) {
            for (; me.first && purgeCount; purgeCount--) {
                me.removeAtKey(me.first.key);
            }
        }
    }

  /**
   * @method containsKey
   * @private
   */
  /**
   * @method contains
   * @private
   */
  /**
   * @method getKeys
   * @private
   */
  /**
   * @method getValues
   * @private
   */
});