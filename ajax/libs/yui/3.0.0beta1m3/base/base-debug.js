YUI.add('base-base', function(Y) {

/**
* Base class support for objects requiring managed attributes and acting as event targets. 
*
* The base module also provides an augmentable PluginHost interface.
*
* @module base
*/

/**
 * An augmentable class, which when added to a "Base" based class, allows 
 * the class to support Plugins, providing plug and unplug methods.
 * 
 * The PlugHost's _initPlugins and _destroyPlugins should be invoked by the 
 * host class at the appropriate point in the classes lifecyle. This is done
 * by default for Base class.
 *
 * @class PluginHost
 */

var L = Y.Lang;

function PluginHost(config) {
    this._plugins = {};
}

PluginHost.prototype = {

    /**
     * Register and instantiate a plugin with the Widget.
     *
     * @method plug
     * @chainable
     * @param p {Function | Object |Array} Accepts the plugin class, or an 
     * object literal with a "fn" property specifying the Plugin class and 
     * a "cfg" property specifying the configuration for the Plugin.
     * <p>
     * Additionally an Array can also be passed in, with the above function or 
     * Object literal values, allowing for multiple plugin registration in a single call.
     * </p>
     * @param config Optional. If the first argument is the plugin class, the second argument
     * can be the configuration for the plugin.
     */
    plug: function(p, config) {
        if (p) {
            if (L.isFunction(p)) {
                this._plug(p, config);
            } else if (L.isArray(p)) {
                for (var i = 0, ln = p.length; i < ln; i++) {
                    this.plug(p[i]);
                }
            } else {
                this._plug(p.fn, p.cfg);
            }
        }
        return this;
    },

    /**
     * Unregister and destroy a plugin already instantiated on the host.
     * 
     * @method unplug
     * @param {String | Function} plugin The namespace of the Plugin, or the Plugin class with the static NS namespace property defined. If not provided,
     * all registered plugins are unplugged.
     * @chainable
     */
    unplug: function(plugin) {
        if (plugin) {
            this._unplug(plugin);
        } else {
            var ns;
            for (ns in this._plugins) {
                if (this._plugins.hasOwnProperty(ns)) {
                    this._unplug(ns);
                }
            }
        }
        return this;
    },

    /**
     * Determines if a plugin has been registered and instantiated 
     * for this widget.
     * 
     * @method hasPlugin
     * @public
     * @return {Boolean} returns true, if the plugin has been applied
     * to this widget.
     */
    hasPlugin : function(ns) {
        return (this._plugins[ns] && this[ns]);
    },

    /**
     * Initializes static plugins registered on the host (using the
     * Base.plug static method) and any plugins passed in for the 
     * instance through the "plugins" configuration property.
     *
     * @method _initPlugins
     * @param {Config} the user configuration object for the host.
     * @private
     */
    _initPlugins: function(config) {

        // Class Configuration
        var classes = this._getClasses(),
            plug = [],
            unplug = {},
            constructor, i, classPlug, classUnplug, pluginClassName;

        //TODO: Room for optimization. Can we apply statically/unplug in same pass?
        for (i = classes.length - 1; i >= 0; i--) {
            constructor = classes[i];

            classUnplug = constructor._UNPLUG;
            if (classUnplug) {
                // subclasses over-write
                Y.mix(unplug, classUnplug, true);
            }

            classPlug = constructor._PLUG;
            if (classPlug) {
                // subclasses over-write
                Y.mix(plug, classPlug, true);
            }
        }

        for (pluginClassName in plug) {
            if (plug.hasOwnProperty(pluginClassName)) {
                if (!unplug[pluginClassName]) {
                    this.plug(plug[pluginClassName]);
                }
            }
        }

        // User Configuration
        if (config && config.plugins) {
            this.plug(config.plugins);
        }
    },

    /**
     * Private method used to unplug and destroy all plugins on the host
     * @method _destroyPlugins
     * @private
     */
    _destroyPlugins: function() {
        this._unplug();
    },

    /**
     * Private method used to instantiate and attach plugins to the host
     * @method _plug
     * @param {Function} PluginClass The plugin class to instantiate
     * @param {Object} config The configuration object for the plugin
     * @private
     */
    _plug: function(PluginClass, config) {
        if (PluginClass && PluginClass.NS) {
            var ns = PluginClass.NS;

            config = config || {};
            config.host = this;

            if (this.hasPlugin(ns)) {
                // Update config
                this[ns].setAttrs(config);
            } else {
                // Create new instance
                this[ns] = new PluginClass(config);
                this._plugins[ns] = PluginClass;
            }
        }
    },

    /**
     * Private method used to unregister and destroy a plugin already instantiated with the host.
     *
     * @method _unplug
     * @private
     * @param {String | Function} plugin The namespace for the Plugin, or a Plugin class, with the static NS property defined.
     */
    _unplug : function(plugin) {
        var ns = plugin, 
            plugins = this._plugins;

        if (L.isFunction(plugin)) {
            ns = plugin.NS;
            if (ns && (!plugins[ns] || plugins[ns] !== plugin)) {
                ns = null;
            }
        }

        if (ns) {
            if (this[ns]) {
                this[ns].destroy();
                delete this[ns];
            }
            if (plugins[ns]) {
                delete plugins[ns];
            }
        }
    }
};

/**
 * Registers plugins to be instantiated at the class level (plugins 
 * which should be plugged into every instance of the class by default).
 * 
 * @method PluginHost.plug
 * @static
 *
 * @param {Function} hostClass The host class on which to register the plugins
 * @param {Function | Array} plugin Either the plugin class, or an array of plugin classes/plugin fn, cfg object literals 
 * @param {Object} config If plugin is the plugin class, the configuration for the plugin can be passed
 * as the configuration for the plugin
 */
PluginHost.plug = function(hostClass, plugin, config) {
    // Cannot plug into Base, since Plugins derive from Base [ will cause infinite recurrsion ]
    var p, i, l, name;

    if (hostClass !== Y.Base) {
        hostClass._PLUG = hostClass._PLUG || {};

        if (!L.isArray(plugin)) {
            if (config) {
                plugin = {fn:plugin, cfg:config};
            }
            plugin = [plugin];
        }

        for (i = 0, l = plugin.length; i < l;i++) {
            p = plugin[i];
            name = p.NAME || p.fn.NAME;
            hostClass._PLUG[name] = p;
        }
    }
};

/**
 * Unregisters plugins which have been registered by the host class, or any
 * other class in the hierarchy.
 *
 * @method PluginHost.unplug
 * @static
 *
 * @param {Function} hostClass The host class from which to unregister the plugins
 * @param {Function | Array} plugin The plugin class, or an array of plugin classes
 */
PluginHost.unplug = function(hostClass, plugin) {
    var p, i, l, name;

    if (hostClass !== Y.Base) {
        hostClass._UNPLUG = hostClass._UNPLUG || {};

        if (!L.isArray(plugin)) {
            plugin = [plugin];
        }

        for (i = 0, l = plugin.length; i < l; i++) {
            p = plugin[i];
            name = p.NAME;
            if (!hostClass._PLUG[name]) {
                hostClass._UNPLUG[name] = p;
            } else {
                delete hostClass._PLUG[name];
            }
        }
    }
};

Y.namespace("Plugin").Host = PluginHost;

    /**
     * Base class support for objects requiring managed attributes and acting as event targets. 
     *
     * The base module also provides an augmentable PluginHost interface.
     *
     * @module base
     */

    /**
     * The base-base sub-module provides the Base class, without Base.build functionality
     *
     * @module base
     * @sub-module base-base
     */
    var O = Y.Object,
        DOT = ".",
        DESTROY = "destroy",
        INIT = "init",
        INITIALIZED = "initialized",
        DESTROYED = "destroyed",
        INITIALIZER = "initializer",
        OBJECT_CONSTRUCTOR = Object.prototype.constructor,
        DEEP = "deep",
        SHALLOW = "shallow",
        DESTRUCTOR = "destructor";

    /**
     * <p>
     * Provides a base class for managed attribute based
     * objects, which handles the chaining of initializer and destructor methods
     * across the hierarchy during init and destroy lifecycle methods and 
     * handles automatic configuration of registered Attributes, through 
     * the static <a href="#property_ATTRS">ATTRS</a> property.
     * </p>
     *
     * <p>The Base class also handles prefixing of event types with the static <a href="#property_NAME">NAME</a> 
     * property for all events fired from instances of classes derived from Base.</p>
     *
     * @constructor
     * @class Base
     * @uses Attribute, Plugin.Host
     *
     * @param {Object} config Object literal of configuration property name/value pairs
     */
    function Base() {
        Y.log('constructor called', 'life', 'base');

        Y.Attribute.call(this);
        Y.Plugin.Host.call(this);

        this.init.apply(this, arguments);
    }

    /**
     * <p>
     * Name string to be used to identify instances of 
     * this class, for example in prefixing events.
     * </p>
     * <p>
     * Classes extending Base, should define their own
     * static NAME property.
     * </p>
     * @property NAME
     * @type String
     * @static
     */
    Base.NAME = 'base';

    /**
     * Object literal defining the set of attributes which
     * will be available for instances of this class, and 
     * how they are configured. See Attributes addAtt method
     * for a description of configuration options available 
     * for each attribute.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    Base.ATTRS = {
        /**
         * Flag indicating whether or not this object
         * has been through the init lifecycle phase.
         *
         * @attribute initialized
         * @readOnly
         * @default false
         * @type boolean
         */
        initialized: {
            readOnly:true,
            value:false
        },

        /**
         * Flag indicating whether or not this object
         * has been through the destroy lifecycle phase.
         *
         * @attribute destroyed
         * @readOnly
         * @default false
         * @type boolean
         */
        destroyed: {
            readOnly:true,
            value:false
        }
    };

    Base.prototype = {

        /**
         * Init lifecycle method, invoked during construction.
         * Fires the init event prior to invoking initializers on
         * the class hierarchy.
         * 
         * @method init
         * @final
         * @chainable
         * @param {Object} config Object literal of configuration property name/value pairs
         * @return {Base} A reference to this object
         */
        init: function(config) {
            Y.log('init called', 'life', 'base');

            /**
             * The name string to be used to identify 
             * this instance of object. 
             * @property name
             * @type String
             */
            this._yuievt.config.prefix = this.name = this.constructor.NAME;

            /**
             * <p>
             * Lifecycle event for the init phase, fired prior to initialization. 
             * Invoking the preventDefault method on the event object provided 
             * to subscribers will prevent initialization from occuring.
             * </p>
             * <p>
             * Subscribers to the "after" momemt of this event, will be notified
             * after initialization of the object is complete (and therefore
             * cannot prevent initialization).
             * </p>
             *
             * @event init
             * @preventable _defInitFn
             * @param {Event.Facade} e Event object
             * @param config Object literal of configuration name/value pairs
             */
            this.publish(INIT, {
                queuable:false,
                defaultFn:this._defInitFn
            });

            if (config) {
                if (config.on) {
                    this.on(config.on);
                }
                if (config.after) {
                    this.after(config.after);
                }
            }
            this.fire(INIT, {cfg: config});
            return this;
        },

        /**
         * <p>
         * Destroy lifecycle method. Fires the destroy
         * event, prior to invoking destructors for the
         * class hierarchy.
         * </p>
         * <p>
         * Subscribers to the destroy
         * event can invoke preventDefault on the event object, to prevent destruction
         * from proceeding.
         * </p>
         * @method destroy
         * @return {Base} A reference to this object
         * @final
         * @chainable
         */
        destroy: function() {
            Y.log('destroy called', 'life', 'base');

            /**
             * <p>
             * Lifecycle event for the destroy phase, 
             * fired prior to destruction. Invoking the preventDefault 
             * method on the event object provided to subscribers will 
             * prevent destruction from proceeding.
             * </p>
             * <p>
             * Subscribers to the "after" moment of this event, will be notified
             * after destruction is complete (and as a result cannot prevent
             * destruction).
             * </p>
             * @event destroy
             * @preventable _defDestroyFn
             * @param {Event.Facade} e Event object
             */
            this.publish(DESTROY, {
                queuable:false,
                defaultFn: this._defDestroyFn
            });
            this.fire(DESTROY);
            return this;
        },

        /**
         * Default init event handler
         *
         * @method _defInitFn
         * @param {Event.Facade} e Event object
         * @protected
         */
        _defInitFn : function(e) {
            this._initHierarchy(e.cfg);
            this._initPlugins(e.cfg);
            this._set(INITIALIZED, true);
        },

        /**
         * Default destroy event handler
         *
         * @method _defDestroyFn
         * @param {Event.Facade} e Event object
         * @protected
         */
        _defDestroyFn : function(e) {
            this._destroyHierarchy();
            this._destroyPlugins();
            this._set(DESTROYED, true);
        },

        /**
         * Returns the class hierarchy for this object, with Base being the last class in the array.
         * 
         * @method _getClasses
         * @protected
         * @return {Function[]} An Array of classes (constructor functions), making up the class hierarchy for this object
         */
        _getClasses : function() {
            if (!this._classes) {
                this._initHierarchyData();
            }
            return this._classes;
        },

        /**
         * Returns an aggregated set of attribute configurations, by traversing the class hierarchy.
         *
         * @method _getAttrCfgs
         * @protected
         * @return {Object} The hash of attribute configurations, aggregated across classes in the hierarchy
         */
        _getAttrCfgs : function() {
            if (!this._attrs) {
                this._initHierarchyData();
            }
            return this._attrs;
        },

        /**
         * @method _filterAttrCfs
         * @private
         * @param {Function} clazz
         * @param {Objects} allCfgs
         */
        _filterAttrCfgs : function(clazz, allCfgs) {
            var cfgs = {};

            if (clazz.ATTRS) {
                Y.each(clazz.ATTRS, function(v, k) {
                    if (allCfgs[k]) {
                        cfgs[k] = allCfgs[k];
                        delete allCfgs[k];
                    }
                });
            }

            return cfgs;
        },

        /**
         * @method _initHierarchyData
         * @private
         */
        _initHierarchyData : function() {
            var c = this.constructor, 
                classes = [],
                attrs = [];

            while (c && c.prototype) {
                // Add to classes
                classes[classes.length] = c;

                // Add to attributes
                if (c.ATTRS) {
                    attrs[attrs.length] = c.ATTRS;
                }
                c = c.superclass ? c.superclass.constructor : null;
            }

            this._classes = classes;
            this._attrs = this._aggregateAttrs(attrs);
        },

        /**
         * @method _aggregateAttrs
         * @private
         * @param {Object} allAttrs
         */
        _aggregateAttrs : function(allAttrs) {
            var attr, attrs, cfg, val, path, i, clone,
                aggAttrs = {};

            if (allAttrs) {
                for (i = allAttrs.length-1; i >= 0; --i) {
                    attrs = allAttrs[i];
                    for (attr in attrs) {
                        if (attrs.hasOwnProperty(attr)) {

                            // Protect
                            cfg = Y.merge(attrs[attr]);

                            val = cfg.value;
                            clone = cfg.cloneDefaultValue;

                            if (val) {
                                if ( (clone === undefined && (OBJECT_CONSTRUCTOR === val.constructor || L.isArray(val))) || clone === DEEP || clone === true) {
                                    Y.log('Cloning default value for attribute:' + attr, 'info', 'base');
                                    cfg.value = Y.clone(val);
                                } else if (clone === SHALLOW) {
                                    Y.log('Merging default value for attribute:' + attr, 'info', 'base');
                                    cfg.value = Y.merge(val);
                                }
                                // else if (clone === false), don't clone the static default value. 
                                // It's intended to be used by reference.
                            }

                            path = null;
                            if (attr.indexOf(DOT) !== -1) {
                                path = attr.split(DOT);
                                attr = path.shift();
                            }

                            if (path && aggAttrs[attr] && aggAttrs[attr].value) {
                                O.setValue(aggAttrs[attr].value, path, val);
                            } else if (!path){
                                if (!aggAttrs[attr]) {
                                    aggAttrs[attr] = cfg;
                                } else {
                                    aggAttrs[attr] = Y.mix(aggAttrs[attr], cfg, true);
                                }
                            }
                        }
                    }
                }
            }

            return aggAttrs;
        },

        /**
         * Initializes the class hierarchy rooted at this base class,
         * which includes initializing attributes for each class defined 
         * in the class's static <a href="#property_ATTRS">ATTRS</a> property and invoking the initializer 
         * method on the prototype of each class in the hierarchy.
         *
         * @method _initHierarchy
         * @param {Object} userConf Object literal containing attribute name/value pairs
         * @private
         */
        _initHierarchy : function(userConf) {
            var constr,
                constrProto,
                ci,
                ei,
                el,
                classes = this._getClasses(),
                mergedCfgs = this._getAttrCfgs();
                this._userCfgs = userConf;

            for (ci = classes.length-1; ci >= 0; ci--) {
                constr = classes[ci];
                constrProto = constr.prototype;

                if (constr._yuibuild && constr._yuibuild.exts && !constr._yuibuild.dynamic) {
                    for (ei = 0, el = constr._yuibuild.exts.length; ei < el; ei++) {
                        constr._yuibuild.exts[ei].apply(this, arguments);
                    }
                }

                this._classCfgs = this._filterAttrCfgs(constr, mergedCfgs);
                this.addAttrs(this._classCfgs, userConf);
                this._classCfgs = null;

                if (constrProto.hasOwnProperty(INITIALIZER)) {
                    constrProto[INITIALIZER].apply(this, arguments);
                }
            }
        },

        /**
         * Destroys the class hierarchy rooted at this base class by invoking
         * the descructor method on the prototype of each class in the hierarchy.
         *
         * @method _destroyHierarchy
         * @private
         */
        _destroyHierarchy : function() {
            var constr,
                constrProto,
                ci, cl,
                classes = this._getClasses();

            for (ci = 0, cl = classes.length; ci < cl; ci++) {
                constr = classes[ci];
                constrProto = constr.prototype;
                if (constrProto.hasOwnProperty(DESTRUCTOR)) {
                    constrProto[DESTRUCTOR].apply(this, arguments);
                }
            }
        },

        /**
         * Wrapper for Attribute.get. Adds the ability to 
         * initialize attributes on-demand during initialization
         * of the ATTRS definitions at each class level.
         *
         * @method get
         *
         * @param {String} name The attribute whose value will be returned. If 
         * the attribute is not currently configured, but is part of the ATTRS 
         * configuration for the class currently being configured, it will be
         *
         * @return {Any} The current value of the attribute
         */
        get: function(name) {

            if (this._classCfgs) {
                var attrName = name,
                    iDot = name.indexOf(DOT);

                if (iDot !== -1) {
                    attrName = name.slice(0, iDot);
                }

                if (this._classCfgs[attrName] && !this.attrAdded(attrName)) {
                    var classCfg = this._classCfgs[attrName],
                        userCfg = this._userCfgs,
                        attrCfg;

                    if (classCfg) {
                        attrCfg = {};
                        attrCfg[attrName] = classCfg;
                        this.addAttrs(attrCfg, userCfg);
                    }
                }
            }

            return Y.Attribute.prototype.get.call(this, name);
        },

        /**
         * Default toString implementation. Provides the constructor NAME
         * and the instance ID.
         * 
         * @method toString
         * @return {String} String representation for this object
         */
        toString: function() {
            return this.constructor.NAME + "[" + Y.stamp(this) + "]";
        }
    };

    // Straightup augment, no wrapper functions
    Y.mix(Base, Y.Attribute, false, null, 1);
    Y.mix(Base, PluginHost, false, null, 1);

    Base.plug = PluginHost.plug;
    Base.unplug = PluginHost.unplug;

    // Fix constructor
    Base.prototype.constructor = Base;

    Y.Base = Base;



}, '@VERSION@' ,{requires:['attribute']});

YUI.add('base-build', function(Y) {

    /**
     * The base-build sub-module provides the Base.build functionality
     *
     * @module base
     * @sub-module base-build
     */

    var Base = Y.Base,
        L = Y.Lang;


    /**
     * The build configuration for the Base class.
     * Defines the static fields which need to be aggregated,
     * when this class is used as the main class passed to 
     * the <a href="#method_build">Base.build</a> method.
     *
     * @property _buildCfg
     * @type Object
     * @static
     * @final
     * @private
     */
    Base._buildCfg = {
        aggregates : ["ATTRS", "_PLUG", "_UNPLUG"]
    };

    /**
     * <p>
     * Builds a constructor function (class) from the
     * main function, and array of extension functions (classes)
     * provided.
     * </p>
     * <p>
     * The cfg object literal supports the following properties
     * </p>
     * <dl>
     *    <dt>dynamic &#60;boolean&#62;</dt>
     *    <dd>
     *    <p>If true (default), a completely new class
     *    is created which extends the main class, and acts as the 
     *    host on which the extension classes are augmented.</p>
     *    <p>If false, the extensions classes are augmented directly to
     *    the main class, modifying the main classes prototype.</p>
     *    </dd>
     *    <dt>aggregates &#60;String[]&#62;</dt>
     *    <dd>An array of static property names, which will get aggregated
     *    on to the built class, in addition to the default properties build 
     *    will always aggregate as defined by the main class' _buildCfg
     *    property.
     *    </dd>
     * </dl>
     *
     * @method build
     * @static
     * @param {Function} main The name of the new class
     * @param {Function} main The main class on which to base the built class
     * @param {Function[]} extensions The set of extension classes which will be
     * augmented/aggregated to the built class.
     * @param {Object} cfg Optional. Configuration for the class.
     * @return {Function} A custom class, created from the provided main and extension classes
     */
    Base.build = function(name, main, extensions, cfg) {

        var build = Base.build,
            builtClass = build._getClass(main, cfg),
            aggregates = build._getAggregates(main, cfg),
            dynamic = builtClass._yuibuild.dynamic,
            i, l, val, extClass;

        // Shallow isolate aggregates
        if (dynamic) {
            if (aggregates) {
                for (i = 0, l = aggregates.length; i < l; ++i) {
                    val = aggregates[i];
                    if (main.hasOwnProperty(val)) {
                        builtClass[val] = L.isArray(main[val]) ? [] : {};
                    }
                }
                Y.aggregate(builtClass, main, true, aggregates);
            }
        }

        // Augment/Aggregate
        for (i = 0, l = extensions.length; i < l; i++) {
            extClass = extensions[i];

            if (aggregates) {
                Y.aggregate(builtClass, extClass, true, aggregates);
            }

            // Old augment
            Y.mix(builtClass, extClass, true, null, 1);

            builtClass._yuibuild.exts.push(extClass);
        }

        builtClass.prototype.hasImpl = build._hasImpl;

        if (dynamic) {
            builtClass.NAME = name;
            builtClass.prototype.constructor = builtClass;
        }

        return builtClass;
    };

    Y.mix(Base.build, {

        _template: function(main) {

            function BuiltClass() {

                BuiltClass.superclass.constructor.apply(this, arguments);

                var f = BuiltClass._yuibuild.exts, 
                    l = f.length,
                    i;

                for (i = 0; i < l; i++) {
                    f[i].apply(this, arguments);
                }

                return this;
            }
            Y.extend(BuiltClass, main);

            return BuiltClass;
        },

        _hasImpl : function(extClass) {
            if (this.constructor._yuibuild) {
                var f = this.constructor._yuibuild.exts,
                    l = f.length,
                    i;

                for (i = 0; i < l; i++) {
                    if (f[i] === extClass) {
                        return true;
                    }
                }
            }
            return false;
        },

        _getClass : function(main, cfg) {

           var dynamic = (cfg && false === cfg.dynamic) ? false : true,
                builtClass = (dynamic) ? Base.build._template(main) : main;

            builtClass._yuibuild = {
                id: null,
                exts : [],
                dynamic : dynamic
            };

            return builtClass;
        },

        _getAggregates : function(main, cfg) {
            var aggr = [],
                cfgAggr = (cfg && cfg.aggregates),
                c = main,
                classAggr;

            while (c && c.prototype) {
                classAggr = c._buildCfg && c._buildCfg.aggregates;
                if (classAggr) {
                    aggr = aggr.concat(classAggr);
                }
                c = c.superclass ? c.superclass.constructor : null;
            }

            if (cfgAggr) {
                aggr = aggr.concat(cfgAggr);
            }

            return aggr;
        }
    });



}, '@VERSION@' ,{requires:['base-base']});



YUI.add('base', function(Y){}, '@VERSION@' ,{use:['base-base', 'base-build']});

