YUI.add('base-base', function(Y) {

    /**
     * The base module provides the Base class, which objects requiring attribute and custom event support can extend. 
     * The module also provides two ways to reuse code - It augments Base with the Plugin.Host interface which provides 
     * plugin support and also provides the Base.build method which provides a way to build custom classes using extensions.
     *
     * @module base
     */

    /**
     * The base-base submodule provides the Base class without the Plugin support, provided by Plugin.Host, 
     * and without the extension support provided by Base.build.
     *
     * @module base
     * @submodule base-base
     */
    var O = Y.Object,
        L = Y.Lang,
        DOT = ".",
        DESTROY = "destroy",
        INIT = "init",
        INITIALIZED = "initialized",
        DESTROYED = "destroyed",
        INITIALIZER = "initializer",
        BUBBLETARGETS = "bubbleTargets",
        _BUBBLETARGETS = "_bubbleTargets",
        OBJECT_CONSTRUCTOR = Object.prototype.constructor,
        DEEP = "deep",
        SHALLOW = "shallow",
        DESTRUCTOR = "destructor",

        Attribute = Y.Attribute;

    /**
     * <p>
     * A base class which objects requiring attributes and custom event support can 
     * extend. Base also handles the chaining of initializer and destructor methods across 
     * the hierarchy as part of object construction and destruction. Additionally, attributes configured 
     * through the static <a href="#property_Base.ATTRS">ATTRS</a> property for each class 
     * in the hierarchy will be initialized by Base.
     * </p>
     *
     * <p>
     * The static <a href="#property_Base.NAME">NAME</a> property of each class extending 
     * from Base will be used as the identifier for the class, and is used by Base to prefix 
     * all events fired by instances of that class.
     * </p>
     *
     * @class Base
     * @constructor
     * @uses Attribute
     * @uses Plugin.Host
     *
     * @param {Object} config Object with configuration property name/value pairs. The object can be 
     * used to provide default values for the objects published attributes.
     *
     * <p>
     * The config object can also contain the following non-attribute properties, providing a convenient 
     * way to configure events listeners and plugins for the instance, as part of the constructor call:
     * </p>
     *
     * <dl>
     *     <dt>on</dt>
     *     <dd>An event name to listener function map, to register event listeners for the "on" moment of the event. A constructor convenience property for the <a href="Base.html#method_on">on</a> method.</dd>
     *     <dt>after</dt>
     *     <dd>An event name to listener function map, to register event listeners for the "after" moment of the event. A constructor convenience property for the <a href="Base.html#method_after">after</a> method.</dd>
     *     <dt>bubbleTargets</dt>
     *     <dd>An object, or array of objects, to register as bubble targets for bubbled events fired by this instance. A constructor convenience property for the <a href="EventTarget.html#method_addTarget">addTarget</a> method.</dd>
     *     <dt>plugins</dt>
     *     <dd>A plugin, or array of plugins to be plugged into the instance (see PluginHost's plug method for signature details). A constructor convenience property for the <a href="Plugin.Host.html#method_plug">plug</a> method.</dd>
     * </dl>
     */
    function Base() {

        // So the object can be used as a hash key (as DD does)
        Y.stamp(this);

        Attribute.call(this);

        // If Plugin.Host has been augmented [ through base-pluginhost ], setup it's
        // initial state, but don't initialize Plugins yet. That's done after initialization.
        var PluginHost = Y.Plugin && Y.Plugin.Host;  
        if (this._initPlugins && PluginHost) {
            PluginHost.call(this);
        }

        if (this._lazyAddAttrs !== false) { this._lazyAddAttrs = true; }

        /**
         * The string used to identify the class of this object.
         *
         * @deprecated Use this.constructor.NAME
         * @property name
         * @type String
         */
        this.name = this.constructor.NAME;
        this._eventPrefix = this.constructor.EVENT_PREFIX || this.constructor.NAME;

        this.init.apply(this, arguments);
    }

    /**
     * The list of properties which can be configured for 
     * each attribute (e.g. setter, getter, writeOnce, readOnly etc.)
     *
     * @property Base._ATTR_CFG
     * @type Array
     * @static
     * @private
     */
    Base._ATTR_CFG = Attribute._ATTR_CFG.concat("cloneDefaultValue");

    /**
     * <p>
     * The string to be used to identify instances of 
     * this class, for example in prefixing events.
     * </p>
     * <p>
     * Classes extending Base, should define their own
     * static NAME property, which should be camelCase by
     * convention (e.g. MyClass.NAME = "myClass";).
     * </p>
     * @property Base.NAME
     * @type String
     * @static
     */
    Base.NAME = "base";

    /**
     * The default set of attributes which will be available for instances of this class, and 
     * their configuration. In addition to the configuration properties listed by 
     * Attribute's <a href="Attribute.html#method_addAttr">addAttr</a> method, the attribute 
     * can also be configured with a "cloneDefaultValue" property, which defines how the statically
     * defined value field should be protected ("shallow", "deep" and false are supported values). 
     *
     * By default if the value is an object literal or an array it will be "shallow" cloned, to 
     * protect the default value.
     *
     * @property Base.ATTRS
     * @type Object
     * @static
     */
    Base.ATTRS = {
        /**
         * Flag indicating whether or not this object
         * has been through the init lifecycle phase.
         *
         * @attribute initialized
         * @readonly
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
         * @readonly
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
         * Fires the init event prior to setting up attributes and 
         * invoking initializers for the class hierarchy.
         *
         * @method init
         * @final
         * @chainable
         * @param {Object} config Object with configuration property name/value pairs
         * @return {Base} A reference to this object
         */
        init: function(config) {

            this._yuievt.config.prefix = this._eventPrefix;

            /**
             * <p>
             * Lifecycle event for the init phase, fired prior to initialization. 
             * Invoking the preventDefault() method on the event object provided 
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
             * @param {EventFacade} e Event object, with a cfg property which 
             * refers to the configuration object passed to the constructor.
             */
            this.publish(INIT, {
                queuable:false,
                fireOnce:true,
                defaultTargetOnly:true,
                defaultFn:this._defInitFn
            });

            this._preInitEventCfg(config);

            this.fire(INIT, {cfg: config});

            return this;
        },

        /**
         * Handles the special on, after and target properties which allow the user to
         * easily configure on and after listeners as well as bubble targets during 
         * construction, prior to init.
         *
         * @private
         * @method _preInitEventCfg
         * @param {Object} config The user configuration object
         */
        _preInitEventCfg : function(config) {
            if (config) {
                if (config.on) {
                    this.on(config.on);
                }
                if (config.after) {
                    this.after(config.after);
                }
            }

            var i, l, target,
                userTargets = (config && BUBBLETARGETS in config);

            if (userTargets || _BUBBLETARGETS in this) {
                target = userTargets ? (config && config.bubbleTargets) : this._bubbleTargets;
                if (L.isArray(target)) {
                    for (i = 0, l = target.length; i < l; i++) { 
                        this.addTarget(target[i]);
                    }
                } else if (target) {
                    this.addTarget(target);
                }
            }
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
             * @param {EventFacade} e Event object
             */
            this.publish(DESTROY, {
                queuable:false,
                fireOnce:true,
                defaultTargetOnly:true,
                defaultFn: this._defDestroyFn
            });
            this.fire(DESTROY);

            this.detachAll();
            return this;
        },

        /**
         * Default init event handler
         *
         * @method _defInitFn
         * @param {EventFacade} e Event object, with a cfg property which 
         * refers to the configuration object passed to the constructor.
         * @protected
         */
        _defInitFn : function(e) {
            this._initHierarchy(e.cfg);
            if (this._initPlugins) {
                // Need to initPlugins manually, to handle constructor parsing, static Plug parsing
                this._initPlugins(e.cfg);
            }
            this._set(INITIALIZED, true);
        },

        /**
         * Default destroy event handler
         *
         * @method _defDestroyFn
         * @param {EventFacade} e Event object
         * @protected
         */
        _defDestroyFn : function(e) {
            if (this._destroyPlugins) {
                this._destroyPlugins();
            }
            this._destroyHierarchy();
            this._set(DESTROYED, true);
        },

        /**
         * Returns the class hierarchy for this object, with Base being the last class in the array.
         *
         * @method _getClasses
         * @protected
         * @return {Function[]} An array of classes (constructor functions), making up the class hierarchy for this object.
         * This value is cached the first time the method, or _getAttrCfgs, is invoked. Subsequent invocations return the 
         * cached value.
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
         * This value is cached the first time the method, or _getClasses, is invoked. Subsequent invocations return
         * the cached value.
         */
        _getAttrCfgs : function() {
            if (!this._attrs) {
                this._initHierarchyData();
            }
            return this._attrs;
        },

        /**
         * A helper method used when processing ATTRS across the class hierarchy during 
         * initialization. Returns a disposable object with the attributes defined for 
         * the provided class, extracted from the set of all attributes passed in .
         *
         * @method _filterAttrCfs
         * @private
         *
         * @param {Function} clazz The class for which the desired attributes are required.
         * @param {Object} allCfgs The set of all attribute configurations for this instance. 
         * Attributes will be removed from this set, if they belong to the filtered class, so
         * that by the time all classes are processed, allCfgs will be empty.
         * 
         * @return {Object} The set of attributes belonging to the class passed in, in the form
         * of an object with attribute name/configuration pairs.
         */
        _filterAttrCfgs : function(clazz, allCfgs) {
            var cfgs = null, attr, attrs = clazz.ATTRS;

            if (attrs) {
                for (attr in attrs) {
                    if (attrs.hasOwnProperty(attr) && allCfgs[attr]) {
                        cfgs = cfgs || {};
                        cfgs[attr] = allCfgs[attr];
                        delete allCfgs[attr];
                    }
                }
            }

            return cfgs;
        },

        /**
         * A helper method used by _getClasses and _getAttrCfgs, which determines both
         * the array of classes and aggregate set of attribute configurations
         * across the class hierarchy for the instance.
         * 
         * @method _initHierarchyData
         * @private
         */
        _initHierarchyData : function() {
            var c = this.constructor, 
                classes = [],
                attrs = [];

            while (c) {
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
         * A helper method, used by _initHierarchyData to aggregate 
         * attribute configuration across the instances class hierarchy.
         *
         * The method will potect the attribute configuration value to protect the statically defined 
         * default value in ATTRS if required (if the value is an object literal, array or the 
         * attribute configuration has cloneDefaultValue set to shallow or deep).
         *
         * @method _aggregateAttrs
         * @private
         * @param {Array} allAttrs An array of ATTRS definitions across classes in the hierarchy 
         * (subclass first, Base last)
         * @return {Object} The aggregate set of ATTRS definitions for the instance
         */
        _aggregateAttrs : function(allAttrs) {
            var attr,
                attrs,
                cfg,
                val,
                path,
                i, 
                clone, 
                cfgProps = Base._ATTR_CFG,
                aggAttrs = {};

            if (allAttrs) {
                for (i = allAttrs.length-1; i >= 0; --i) {
                    attrs = allAttrs[i];

                    for (attr in attrs) {
                        if (attrs.hasOwnProperty(attr)) {

                            // Protect config passed in
                            cfg = Y.mix({}, attrs[attr], true, cfgProps);

                            val = cfg.value;
                            clone = cfg.cloneDefaultValue;

                            if (val) {
                                if ( (clone === undefined && (OBJECT_CONSTRUCTOR === val.constructor || L.isArray(val))) || clone === DEEP || clone === true) {
                                    cfg.value = Y.clone(val);
                                } else if (clone === SHALLOW) {
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
                                    Y.mix(aggAttrs[attr], cfg, true, cfgProps);
                                }
                            }
                        }
                    }
                }
            }

            return aggAttrs;
        },

        /**
         * Initializes the class hierarchy for the instance, which includes 
         * initializing attributes for each class defined in the class's 
         * static <a href="#property_Base.ATTRS">ATTRS</a> property and 
         * invoking the initializer method on the prototype of each class in the hierarchy.
         *
         * @method _initHierarchy
         * @param {Object} userVals Object with configuration property name/value pairs
         * @private
         */
        _initHierarchy : function(userVals) {
            var lazy = this._lazyAddAttrs,
                constr,
                constrProto,
                ci,
                ei,
                el,
                classes = this._getClasses(),
                attrCfgs = this._getAttrCfgs();

            for (ci = classes.length-1; ci >= 0; ci--) {

                constr = classes[ci];
                constrProto = constr.prototype;

                if (constr._yuibuild && constr._yuibuild.exts) {
                    for (ei = 0, el = constr._yuibuild.exts.length; ei < el; ei++) {
                        constr._yuibuild.exts[ei].apply(this, arguments);
                    }
                }

                this.addAttrs(this._filterAttrCfgs(constr, attrCfgs), userVals, lazy);

                // Using INITIALIZER in hasOwnProperty check, for performance reasons (helps IE6 avoid GC thresholds when
                // referencing string literals). Not using it in apply, again, for performance "." is faster. 
                if (constrProto.hasOwnProperty(INITIALIZER)) {
                    constrProto.initializer.apply(this, arguments);
                }
            }
        },

        /**
         * Destroys the class hierarchy for this instance by invoking
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
                    constrProto.destructor.apply(this, arguments);
                }
            }
        },

        /**
         * Default toString implementation. Provides the constructor NAME
         * and the instance guid, if set.
         *
         * @method toString
         * @return {String} String representation for this object
         */
        toString: function() {
            return this.name + "[" + Y.stamp(this, true) + "]";
        }

    };

    // Straightup augment, no wrapper functions
    Y.mix(Base, Attribute, false, null, 1);

    // Fix constructor
    Base.prototype.constructor = Base;

    Y.Base = Base;


}, '@VERSION@' ,{requires:['attribute-base']});
