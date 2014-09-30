YUI.add('base-core', function (Y, NAME) {

    /**
     * The base module provides the Base class, which objects requiring attribute and custom event support can extend.
     * The module also provides two ways to reuse code - It augments Base with the Plugin.Host interface which provides
     * plugin support and also provides the BaseCore.build method which provides a way to build custom classes using extensions.
     *
     * @module base
     */

    /**
     * <p>The base-core module provides the BaseCore class, the lightest version of Base,
     * which provides Base's basic lifecycle management and ATTRS construction support,
     * but doesn't fire init/destroy or attribute change events.</p>
     *
     * <p>It mixes in AttributeCore, which is the lightest version of Attribute</p>
     *
     * @module base
     * @submodule base-core
     */
    var O = Y.Object,
        L = Y.Lang,
        DOT = ".",
        INITIALIZED = "initialized",
        DESTROYED = "destroyed",
        INITIALIZER = "initializer",
        VALUE = "value",
        OBJECT_CONSTRUCTOR = Object.prototype.constructor,
        DEEP = "deep",
        SHALLOW = "shallow",
        DESTRUCTOR = "destructor",

        AttributeCore = Y.AttributeCore,

        _wlmix = function(r, s, wlhash) {
            var p;
            for (p in s) {
                if(wlhash[p]) {
                    r[p] = s[p];
                }
            }
            return r;
        };

    /**
     * The BaseCore class, is the lightest version of Base, and provides Base's
     * basic lifecycle management and ATTRS construction support, but doesn't
     * fire init/destroy or attribute change events.
     *
     * BaseCore also handles the chaining of initializer and destructor methods across
     * the hierarchy as part of object construction and destruction. Additionally, attributes
     * configured through the static <a href="#property_BaseCore.ATTRS">ATTRS</a>
     * property for each class in the hierarchy will be initialized by BaseCore.
     *
     * Classes which require attribute support, but don't intend to use/expose attribute
     * change events can extend BaseCore instead of Base for optimal kweight and
     * runtime performance.
     *
     * **3.11.0 BACK COMPAT NOTE FOR COMPONENT DEVELOPERS**
     *
     * Prior to version 3.11.0, ATTRS would get added a class at a time. That is:
     *
     * <pre>
     *    for each (class in the hierarchy) {
     *       Call the class Extension constructors.
     *
     *       Add the class ATTRS.
     *
     *       Call the class initializer
     *       Call the class Extension initializers.
     *    }
     * </pre>
     *
     * As of 3.11.0, ATTRS from all classes in the hierarchy are added in one `addAttrs` call
     * before **any** initializers are called. That is, the flow becomes:
     *
     * <pre>
     *    for each (class in the hierarchy) {
     *       Call the class Extension constructors.
     *    }
     *
     *    Add ATTRS for all classes
     *
     *    for each (class in the hierarchy) {
     *       Call the class initializer.
     *       Call the class Extension initializers.
     *    }
     * </pre>
     *
     * Adding all ATTRS at once fixes subtle edge-case issues with subclass ATTRS overriding
     * superclass `setter`, `getter` or `valueFn` definitions and being unable to get/set attributes
     * defined by the subclass. It also leaves us with a cleaner order of operation flow moving
     * forward.
     *
     * However, it may require component developers to upgrade their components, for the following
     * scenarios:
     *
     * 1. It impacts components which may have `setter`, `getter` or `valueFn` code which
     * expects a superclass' initializer to have run.
     *
     * This is expected to be rare, but to support it, Base now supports a `_preAddAttrs()`, method
     * hook (same signature as `addAttrs`). Components can implement this method on their prototype
     * for edge cases which do require finer control over the order in which attributes are added
     * (see widget-htmlparser for example).
     *
     * 2. Extension developers may need to move code from Extension constructors to `initializer`s
     *
     * Older extensions, which were written before `initializer` support was added, had a lot of
     * initialization code in their constructors. For example, code which acccessed superclass
     * attributes. With the new flow this code would not be able to see attributes. The recommendation
     * is to move this initialization code to an `initializer` on the Extension, which was the
     * recommendation for anything created after `initializer` support for Extensions was added.
     *
     * @class BaseCore
     * @constructor
     * @uses AttributeCore
     * @param {Object} cfg Object with configuration property name/value pairs.
     * The object can be used to provide initial values for the objects published
     * attributes.
     */
    function BaseCore(cfg) {
        if (!this._BaseInvoked) {
            this._BaseInvoked = true;

            Y.log('constructor called', 'life', 'base');
            this._initBase(cfg);
        }
        else { Y.log('Based constructor called more than once. Ignoring duplicate calls', 'life', 'base'); }
    }

    /**
     * The list of properties which can be configured for each attribute
     * (e.g. setter, getter, writeOnce, readOnly etc.)
     *
     * @property _ATTR_CFG
     * @type Array
     * @static
     * @private
     */
    BaseCore._ATTR_CFG = AttributeCore._ATTR_CFG.concat("cloneDefaultValue");

    /**
     * The array of non-attribute configuration properties supported by this class.
     *
     * For example `BaseCore` defines a "plugins" configuration property which
     * should not be set up as an attribute. This property is primarily required so
     * that when <a href="#property__allowAdHocAttrs">`_allowAdHocAttrs`</a> is enabled by a class,
     * non-attribute configuration properties don't get added as ad-hoc attributes.
     *
     * @property _NON_ATTRS_CFG
     * @type Array
     * @static
     * @private
     */
    BaseCore._NON_ATTRS_CFG = ["plugins"];

    /**
     * This property controls whether or not instances of this class should
     * allow users to add ad-hoc attributes through the constructor configuration
     * hash.
     *
     * AdHoc attributes are attributes which are not defined by the class, and are
     * not handled by the MyClass._NON_ATTRS_CFG
     *
     * @property _allowAdHocAttrs
     * @type boolean
     * @default undefined (false)
     * @protected
     */

    /**
     * The string to be used to identify instances of this class.
     *
     * Classes extending BaseCore, should define their own
     * static NAME property, which should be camelCase by
     * convention (e.g. MyClass.NAME = "myClass";).
     *
     * @property NAME
     * @type String
     * @static
     */
    BaseCore.NAME = "baseCore";

    /**
     * The default set of attributes which will be available for instances of this class, and
     * their configuration. In addition to the configuration properties listed by
     * AttributeCore's <a href="AttributeCore.html#method_addAttr">addAttr</a> method,
     * the attribute can also be configured with a "cloneDefaultValue" property, which
     * defines how the statically defined value field should be protected
     * ("shallow", "deep" and false are supported values).
     *
     * By default if the value is an object literal or an array it will be "shallow"
     * cloned, to protect the default value.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    BaseCore.ATTRS = {
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

    /**
    Provides a way to safely modify a `Y.BaseCore` subclass' static `ATTRS`
    after the class has been defined or created.

    BaseCore-based classes cache information about the class hierarchy in order
    to efficiently create instances. This cache includes includes the aggregated
    `ATTRS` configs. If the static `ATTRS` configs need to be modified after the
    class has been defined or create, then use this method which will make sure
    to clear any cached data before making any modifications.

    @method modifyAttrs
    @param {Function} [ctor] The constructor function whose `ATTRS` should be
        modified. If a `ctor` function is not specified, then `this` is assumed
        to be the constructor which hosts the `ATTRS`.
    @param {Object} configs The collection of `ATTRS` configs to mix with the
        existing attribute configurations.
    @static
    @since 3.10.0
    **/
    BaseCore.modifyAttrs = function (ctor, configs) {
        // When called without a constructor, assume `this` is the constructor.
        if (typeof ctor !== 'function') {
            configs = ctor;
            ctor    = this;
        }

        var attrs, attr, name;

        // Eagerly create the `ATTRS` object if it doesn't already exist.
        attrs = ctor.ATTRS || (ctor.ATTRS = {});

        if (configs) {
            // Clear cache because it has ATTRS aggregation data which is about
            // to be modified.
            ctor._CACHED_CLASS_DATA = null;

            for (name in configs) {
                if (configs.hasOwnProperty(name)) {
                    attr = attrs[name] || (attrs[name] = {});
                    Y.mix(attr, configs[name], true);
                }
            }
        }
    };

    BaseCore.prototype = {

        /**
         * Internal construction logic for BaseCore.
         *
         * @method _initBase
         * @param {Object} config The constructor configuration object
         * @private
         */
        _initBase : function(config) {
            Y.log('init called', 'life', 'base');

            Y.stamp(this);

            this._initAttribute(config);

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

            this.init.apply(this, arguments);
        },

        /**
         * Initializes AttributeCore
         *
         * @method _initAttribute
         * @private
         */
        _initAttribute: function() {
            AttributeCore.call(this);
        },

        /**
         * Init lifecycle method, invoked during construction. Sets up attributes
         * and invokes initializers for the class hierarchy.
         *
         * @method init
         * @chainable
         * @param {Object} cfg Object with configuration property name/value pairs
         * @return {BaseCore} A reference to this object
         */
        init: function(cfg) {
            Y.log('init called', 'life', 'base');

            this._baseInit(cfg);

            return this;
        },

        /**
         * Internal initialization implementation for BaseCore
         *
         * @method _baseInit
         * @private
         */
        _baseInit: function(cfg) {
            this._initHierarchy(cfg);

            if (this._initPlugins) {
                // Need to initPlugins manually, to handle constructor parsing, static Plug parsing
                this._initPlugins(cfg);
            }
            this._set(INITIALIZED, true);
        },

        /**
         * Destroy lifecycle method. Invokes destructors for the class hierarchy.
         *
         * @method destroy
         * @return {BaseCore} A reference to this object
         * @chainable
         */
        destroy: function() {
            this._baseDestroy();
            return this;
        },

        /**
         * Internal destroy implementation for BaseCore
         *
         * @method _baseDestroy
         * @private
         */
        _baseDestroy : function() {
            if (this._destroyPlugins) {
                this._destroyPlugins();
            }
            this._destroyHierarchy();
            this._set(DESTROYED, true);
        },

        /**
         * Returns the class hierarchy for this object, with BaseCore being the last class in the array.
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
         * Returns an aggregated set of attribute configurations, by traversing
         * the class hierarchy.
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
         * A helper method used to isolate the attrs config for this instance to pass to `addAttrs`,
         * from the static cached ATTRS for the class.
         *
         * @method _getInstanceAttrCfgs
         * @private
         *
         * @param {Object} allCfgs The set of all attribute configurations for this instance.
         * Attributes will be removed from this set, if they belong to the filtered class, so
         * that by the time all classes are processed, allCfgs will be empty.
         *
         * @return {Object} The set of attributes to be added for this instance, suitable
         * for passing through to `addAttrs`.
         */
        _getInstanceAttrCfgs : function(allCfgs) {

            var cfgs = {},
                cfg,
                val,
                subAttr,
                subAttrs,
                subAttrPath,
                attr,
                attrCfg,
                allSubAttrs = allCfgs._subAttrs,
                attrCfgProperties = this._attrCfgHash();

            for (attr in allCfgs) {

                if (allCfgs.hasOwnProperty(attr) && attr !== "_subAttrs") {

                    attrCfg = allCfgs[attr];

                    // Need to isolate from allCfgs, because we're going to set values etc.
                    cfg = cfgs[attr] = _wlmix({}, attrCfg, attrCfgProperties);

                    val = cfg.value;

                    if (val && (typeof val === "object")) {
                        this._cloneDefaultValue(attr, cfg);
                    }

                    if (allSubAttrs && allSubAttrs.hasOwnProperty(attr)) {
                        subAttrs = allCfgs._subAttrs[attr];

                        for (subAttrPath in subAttrs) {
                            subAttr = subAttrs[subAttrPath];

                            if (subAttr.path) {
                                O.setValue(cfg.value, subAttr.path, subAttr.value);
                            }
                        }
                    }
                }
            }

            return cfgs;
        },

        /**
         * @method _filterAdHocAttrs
         * @private
         *
         * @param {Object} allAttrs The set of all attribute configurations for this instance.
         * Attributes will be removed from this set, if they belong to the filtered class, so
         * that by the time all classes are processed, allCfgs will be empty.
         * @param {Object} userVals The config object passed in by the user, from which adhoc attrs are to be filtered.
         * @return {Object} The set of adhoc attributes passed in, in the form
         * of an object with attribute name/configuration pairs.
         */
        _filterAdHocAttrs : function(allAttrs, userVals) {
            var adHocs,
                nonAttrs = this._nonAttrs,
                attr;

            if (userVals) {
                adHocs = {};
                for (attr in userVals) {
                    if (!allAttrs[attr] && !nonAttrs[attr] && userVals.hasOwnProperty(attr)) {
                        adHocs[attr] = {
                            value:userVals[attr]
                        };
                    }
                }
            }

            return adHocs;
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

            var ctor = this.constructor,
                cachedClassData = ctor._CACHED_CLASS_DATA,
                c,
                i,
                l,
                attrCfg,
                attrCfgHash,
                needsAttrCfgHash = !ctor._ATTR_CFG_HASH,
                nonAttrsCfg,
                nonAttrs = {},
                classes = [],
                attrs = [];

            // Start with `this` instance's constructor.
            c = ctor;

            if (!cachedClassData) {

                while (c) {
                    // Add to classes
                    classes[classes.length] = c;

                    // Add to attributes
                    if (c.ATTRS) {
                        attrs[attrs.length] = c.ATTRS;
                    }

                    // Aggregate ATTR cfg whitelist.
                    if (needsAttrCfgHash) {
                        attrCfg     = c._ATTR_CFG;
                        attrCfgHash = attrCfgHash || {};

                        if (attrCfg) {
                            for (i = 0, l = attrCfg.length; i < l; i += 1) {
                                attrCfgHash[attrCfg[i]] = true;
                            }
                        }
                    }

                    // Commenting out the if. We always aggregate, since we don't
                    // know if we'll be needing this on the instance or not.
                    // if (this._allowAdHocAttrs) {
                        nonAttrsCfg = c._NON_ATTRS_CFG;
                        if (nonAttrsCfg) {
                            for (i = 0, l = nonAttrsCfg.length; i < l; i++) {
                                nonAttrs[nonAttrsCfg[i]] = true;
                            }
                        }
                    //}

                    c = c.superclass ? c.superclass.constructor : null;
                }

                // Cache computed `_ATTR_CFG_HASH` on the constructor.
                if (needsAttrCfgHash) {
                    ctor._ATTR_CFG_HASH = attrCfgHash;
                }

                cachedClassData = ctor._CACHED_CLASS_DATA = {
                    classes : classes,
                    nonAttrs : nonAttrs,
                    attrs : this._aggregateAttrs(attrs)
                };

            }

            this._classes = cachedClassData.classes;
            this._attrs = cachedClassData.attrs;
            this._nonAttrs = cachedClassData.nonAttrs;
        },

        /**
         * Utility method to define the attribute hash used to filter/whitelist property mixes for
         * this class for iteration performance reasons.
         *
         * @method _attrCfgHash
         * @private
         */
        _attrCfgHash: function() {
            return this.constructor._ATTR_CFG_HASH;
        },

        /**
         * This method assumes that the value has already been checked to be an object.
         * Since it's on a critical path, we don't want to re-do the check.
         *
         * @method _cloneDefaultValue
         * @param {Object} cfg
         * @private
         */
        _cloneDefaultValue : function(attr, cfg) {

            var val = cfg.value,
                clone = cfg.cloneDefaultValue;

            if (clone === DEEP || clone === true) {
                Y.log('Cloning default value for attribute:' + attr, 'info', 'base');
                cfg.value = Y.clone(val);
            } else if (clone === SHALLOW) {
                Y.log('Merging default value for attribute:' + attr, 'info', 'base');
                cfg.value = Y.merge(val);
            } else if ((clone === undefined && (OBJECT_CONSTRUCTOR === val.constructor || L.isArray(val)))) {
                cfg.value = Y.clone(val);
            }
            // else if (clone === false), don't clone the static default value.
            // It's intended to be used by reference.
        },

        /**
         * A helper method, used by _initHierarchyData to aggregate
         * attribute configuration across the instances class hierarchy.
         *
         * The method will protect the attribute configuration value to protect the statically defined
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
                subAttrsHash,
                cfg,
                path,
                i,
                cfgPropsHash = this._attrCfgHash(),
                aggAttr,
                aggAttrs = {};

            if (allAttrs) {
                for (i = allAttrs.length-1; i >= 0; --i) {

                    attrs = allAttrs[i];

                    for (attr in attrs) {
                        if (attrs.hasOwnProperty(attr)) {

                            // PERF TODO: Do we need to merge here, since we're merging later in getInstanceAttrCfgs
                            // Should we move this down to only merge if we hit the path or valueFn ifs below?
                            cfg = _wlmix({}, attrs[attr], cfgPropsHash);

                            path = null;
                            if (attr.indexOf(DOT) !== -1) {
                                path = attr.split(DOT);
                                attr = path.shift();
                            }

                            aggAttr = aggAttrs[attr];

                            if (path && aggAttr && aggAttr.value) {

                                subAttrsHash = aggAttrs._subAttrs;

                                if (!subAttrsHash) {
                                    subAttrsHash = aggAttrs._subAttrs = {};
                                }

                                if (!subAttrsHash[attr]) {
                                    subAttrsHash[attr] = {};
                                }

                                subAttrsHash[attr][path.join(DOT)] = {
                                    value: cfg.value,
                                    path : path
                                };

                            } else if (!path) {

                                if (!aggAttr) {
                                    aggAttrs[attr] = cfg;
                                } else {
                                    if (aggAttr.valueFn && VALUE in cfg) {
                                        aggAttr.valueFn = null;
                                    }

                                    // Mix into existing config.
                                    _wlmix(aggAttr, cfg, cfgPropsHash);
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
         * static <a href="#property_BaseCore.ATTRS">ATTRS</a> property and
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
                i,
                l,
                ci,
                ei,
                el,
                ext,
                extProto,
                exts,
                instanceAttrs,
                initializers = [],
                classes = this._getClasses(),
                attrCfgs = this._getAttrCfgs(),
                cl = classes.length - 1;

            // Constructors
            for (ci = cl; ci >= 0; ci--) {

                constr = classes[ci];
                constrProto = constr.prototype;
                exts = constr._yuibuild && constr._yuibuild.exts;

                // Using INITIALIZER in hasOwnProperty check, for performance reasons (helps IE6 avoid GC thresholds when
                // referencing string literals). Not using it in apply, again, for performance "." is faster.

                if (constrProto.hasOwnProperty(INITIALIZER)) {
                    // Store initializer while we're here and looping
                    initializers[initializers.length] = constrProto.initializer;
                }

                if (exts) {
                    for (ei = 0, el = exts.length; ei < el; ei++) {

                        ext = exts[ei];

                        // Ext Constructor
                        ext.apply(this, arguments);

                        extProto = ext.prototype;
                        if (extProto.hasOwnProperty(INITIALIZER)) {
                            // Store initializer while we're here and looping
                            initializers[initializers.length] = extProto.initializer;
                        }
                    }
                }
            }

            // ATTRS
            instanceAttrs = this._getInstanceAttrCfgs(attrCfgs);

            if (this._preAddAttrs) {
                this._preAddAttrs(instanceAttrs, userVals, lazy);
            }

            if (this._allowAdHocAttrs) {
                this.addAttrs(this._filterAdHocAttrs(attrCfgs, userVals), userVals, lazy);
            }

            this.addAttrs(instanceAttrs, userVals, lazy);

            // Initializers
            for (i = 0, l = initializers.length; i < l; i++) {
                initializers[i].apply(this, arguments);
            }
        },

        /**
         * Destroys the class hierarchy for this instance by invoking
         * the destructor method on the prototype of each class in the hierarchy.
         *
         * @method _destroyHierarchy
         * @private
         */
        _destroyHierarchy : function() {
            var constr,
                constrProto,
                ci, cl, ei, el, exts, extProto,
                classes = this._getClasses();

            for (ci = 0, cl = classes.length; ci < cl; ci++) {
                constr = classes[ci];
                constrProto = constr.prototype;
                exts = constr._yuibuild && constr._yuibuild.exts;

                if (exts) {
                    for (ei = 0, el = exts.length; ei < el; ei++) {
                        extProto = exts[ei].prototype;
                        if (extProto.hasOwnProperty(DESTRUCTOR)) {
                            extProto.destructor.apply(this, arguments);
                        }
                    }
                }

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
    Y.mix(BaseCore, AttributeCore, false, null, 1);

    // Fix constructor
    BaseCore.prototype.constructor = BaseCore;

    Y.BaseCore = BaseCore;


}, '3.18.0', {"requires": ["attribute-core"]});
