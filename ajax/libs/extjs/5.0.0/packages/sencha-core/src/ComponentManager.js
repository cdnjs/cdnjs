/**
 * Provides a registry of all Components (instances of {@link Ext.Component} or any subclass
 * thereof) on a page so that they can be easily accessed by {@link Ext.Component component}
 * {@link Ext.Component#id id} (see {@link #get}, or the convenience method
 * {@link Ext#getCmp Ext.getCmp}).
 *
 * This object also provides a registry of available Component *classes* indexed by a
 * mnemonic code known as the Component's {@link Ext.Component#xtype xtype}. The `xtype`
 * provides a way to avoid instantiating child Components when creating a full, nested
 * config object for a complete Ext page.
 *
 * A child Component may be specified simply as a *config object* as long as the correct
 * `{@link Ext.Component#xtype xtype}` is specified so that if and when the Component
 * needs rendering, the correct type can be looked up for lazy instantiation.
 *
 * For a list of all available `{@link Ext.Component#xtype xtypes}`, see
 * {@link Ext.Component}.
 * @singleton
 */
Ext.define('Ext.ComponentManager', {
    alternateClassName: 'Ext.ComponentMgr',
    
    singleton: true,

    count: 0,
    
    typeName: 'xtype',

    constructor: function(config) {
        Ext.apply(this, config || {});
        this.all = {};
        this.references = {};
        this.onAvailableCallbacks = {};
    },
    
    /**
     * Creates a new Component from the specified config object using the config object's
     * `xtype` to determine the class to instantiate.
     *
     * @param {Object} config A configuration object for the Component you wish to create.
     * @param {String} [defaultType] The `xtype` to use if the config object does not
     * contain a `xtype`. (Optional if the config contains a `xtype`).
     * @return {Ext.Component} The newly instantiated Component.
     */
    create: function (config, defaultType) {
        if (typeof config == 'string') {
            return Ext.widget(config);
        }
        if (config.isComponent) {
            return config;
        }
        
        if ('xclass' in config) {
            return Ext.create(config.xclass, config);
        }

        return Ext.widget(config.xtype || defaultType, config);
    },

    /**
     * Returns an item by id.
     * @param {String} id The id of the item
     * @return {Object} The item, undefined if not found.
     */
    get: function(id) {
        return this.all[id];
    },

    register: function(component) {
        var all = this.all,
            key = component.getId();

        //<debug>
        if (key === undefined) {
            Ext.Error.raise('Key is undefined. Please ensure the item has a key before registering the item.');
        }
        if (key in all) {
            Ext.Error.raise('Registering duplicate id "' + key + '" with this manager');
        }
        //</debug>

        all[key] = component;

        if (component.reference) {
            this.references[key] = component;
        }

        this.count++;

        if ((this.onAvailableCallbacks[key] || []).length) {
            this.notifyAvailable(component);
        }
    },

    unregister: function(component) {
        var id = component.getId();

        if (component.reference) {
            delete this.references[id];
        }
        delete this.all[id];

        this.count--;
    },
    
    markReferencesDirty: function() {
        this.referencesDirty = true;
    },
    
    fixReferences: function() {
        var me = this,
            references = me.references,
            key;
            
        if (me.referencesDirty) {
            for (key in references) {
                if (references.hasOwnProperty(key)) {
                    references[key].fixReference();        
                }
            }
            me.referencesDirty = false;
        }
    },

    /**
     * Registers a function that will be called (a single time) when an item with the specified id is added to the manager.
     * This will happen on instantiation.
     * @param {String} id The item id
     * @param {Function} fn The callback function. Called with a single parameter, the item.
     * @param {Object} scope The scope ('this' reference) in which the callback is executed.
     * Defaults to the item.
     */
    onAvailable : function(id, fn, scope){
        var me = this,
            callbacks = me.onAvailableCallbacks,
            all = me.all,
            item;

        if (id in all) {    //if already an instance, callback immediately
            item = all[id];
            fn.call(scope || item, item);

        } else if (id) {    // otherwise, queue for dispatch

            if (!Ext.isArray(callbacks[id])) {
                callbacks[id] = [ ];
            }
            callbacks[id].push( function(item) { fn.call(scope || item, item);} );
        }
    },

    // @private
    notifyAvailable : function(item) {
        var callbacks = this.onAvailableCallbacks[item && item.getId()] || [];
        while (callbacks.length) {
            (callbacks.shift())(item);
        }
    },

    /**
     * Executes the specified function once for each item in the collection.
     * @param {Function} fn The function to execute.
     * @param {String} fn.key The key of the item
     * @param {Number} fn.value The value of the item
     * @param {Number} fn.length The total number of items in the collection ** Removed
     * in 5.0 **
     * @param {Boolean} fn.return False to cease iteration.
     * @param {Object} scope The scope to execute in. Defaults to `this`.
     */
    each: function(fn, scope){
        return Ext.Object.each(this.all, fn, scope);
    },

    /**
     * Gets the number of items in the collection.
     * @return {Number} The number of items in the collection.
     */
    getCount: function() {
        return this.count;
    },

    /**
     * Returns an array of all components
     * @return {Array}
     */
    getAll: function() {
        return Ext.Object.getValues(this.all);
    },

    deprecated: {
        5: {
            methods: {
                /**
                 * Checks if an item is registered.
                 * @param {String} component The mnemonic string by which the class may be looked up.
                 * @return {Boolean} Whether the type is registered.
                 * @deprecated 5.0
                 */
                isRegistered: null,

                /**
                 * Registers a new item constructor, keyed by a type key.
                 * @param {String} type The mnemonic string by which the class may be looked up.
                 * @param {Function} cls The new instance class.
                 * @deprecated 5.0
                 */
                registerType: null
            }
        }
    }
},
function () {
    /**
     * This is shorthand reference to {@link Ext.ComponentManager#get}.
     * Looks up an existing {@link Ext.Component Component} by {@link Ext.Component#id id}
     *
     * @param {String} id The component {@link Ext.Component#id id}
     * @return Ext.Component The Component, `undefined` if not found, or `null` if a
     * Class was found.
     * @member Ext
    */
    Ext.getCmp = function(id) {
        return Ext.ComponentManager.get(id);
    };
});
