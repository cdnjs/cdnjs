YUI.add('base-base', function(Y) {

/**
 * Provides the base Widget class along with an augmentable PluginHost interface
 *
 * @module widget
 */

/**
 * An augmentable class, which when added to a "Base" based class, allows 
 * the class to support Plugins, providing plug and unplug methods and performing
 * instantiation and cleanup during the init and destroy lifecycle phases respectively.
 *
 * @class PluginHost
 */

var L = Y.Lang;

function PluginHost(config) {
    this._plugins = {};

    this.after("init", function(e) {this._initPlugins(e.cfg);});
    this.after("destroy", this._destroyPlugins);
}

PluginHost.prototype = {

    /**
     * Register and instantiate a plugin with the Widget.
     * 
     * @method plug
     * @chainable
     * @param p {String | Object |Array} Accepts the registered 
     * namespace for the Plugin or an object literal with an "fn" property
     * specifying the Plugin class and a "cfg" property specifying
     * the configuration for the Plugin.
     * <p>
     * Additionally an Array can also be passed in, with either the above String or 
     * Object literal values, allowing for multiple plugin registration in 
     * a single call.
     * </p>
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
     * Unregister and destroy a plugin already instantiated with the Widget.
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
     * Initializes static plugins registered on the host (the
     * "PLUGINS" static property) and any plugins passed in 
     * for the instance through the "plugins" configuration property.
     *
     * @method _initPlugins
     * @param {Config} the user configuration object for the host.
     * @private
     */
    _initPlugins: function(config) {

        // Class Configuration
        var classes = this._getClasses(), constructor, i;
        for (i = classes.length - 1; i >= 0; i--) {
            constructor = classes[i];
            if (constructor.PLUGINS) {
                this.plug(constructor.PLUGINS);
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

            // TODO: Look at why this needs to be done after publish.
            Y.Plugin.Host.call(this);

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
            var attr, attrs, cfg, val, path, i,
                aggAttrs = {};

            if (allAttrs) {
                for (i = allAttrs.length-1; i >= 0; --i) {
                    attrs = allAttrs[i];
                    for (attr in attrs) {
                        if (attrs.hasOwnProperty(attr)) {

                            // Protect
                            cfg = Y.merge(attrs[attr]);

                            val = cfg.value;
                            if (val && !cfg.useRef && (OBJECT_CONSTRUCTOR === val.constructor || L.isArray(val))) {
                                cfg.value = Y.clone(val);
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
         * initialize attributes on demand during initialization
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
    Y.mix(Base, Y.Plugin.Host, false, null, 1);

    // Fix constructor
    Base.prototype.constructor = Base;

    Y.Base = Base;



}, '@VERSION@' ,{requires:['attribute']});
