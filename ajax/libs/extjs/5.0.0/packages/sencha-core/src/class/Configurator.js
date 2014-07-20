/**
 * @class Ext.Configurator
 * This class manages the config properties for a class.
 * @private
 */
(function () { // see end of file (and please don't indent the whole file)

var ExtConfig = Ext.Config,
    configPropMap = ExtConfig.map,
    ExtObject = Ext.Object;

Ext.Configurator = function (cls) {
// @define Ext.class.Configurator
// @define Ext.Configurator
// @require Ext.Config

    var me = this,
        prototype = cls.prototype,
        zuper = cls.superclass ? cls.superclass.self.$config : null;

    /**
     * @property {Ext.Class} cls The class to which this instance is associated.
     * @private
     * @readonly
     */
    me.cls = cls;
    
    if (zuper) {
        /**
         * This object holds an `Ext.Config` value for each config property keyed by name.
         * This object has as its prototype object the `configs` of its super class.
         * 
         * This map is maintained as each property is added via the `add` method.
         * 
         * @property {Object} configs
         * @private
         * @readonly
         */
        me.configs = ExtObject.chain(zuper.configs);
        
        /**
         * This object holds a bool value for each cachedConfig property keyed by name.
         * 
         * This map is maintained as each property is added via the `add` method.
         * 
         * @property {Object} cachedConfigs
         * @private
         * @readonly
         */
        me.cachedConfigs = ExtObject.chain(zuper.cachedConfigs);

        /**
         * This object holds a `Number` for each config property keyed by name. This object has
         * as its prototype object the `initMap` of its super class. The value of each property
         * has the following meaning:
         * 
         *   * `0` - initial value is `null` and requires no processing.
         *   * `1` - initial value must be set on each instance.
         *   * `2` - initial value can be cached on the prototype by the first instance.
         *
         * Any `null` values will either never be added to this map or (if added by a base
         * class and set to `null` by a derived class) will cause the entry to be 0.
         * 
         * This map is maintained as each property is added via the `add` method.
         * 
         * @property {Object} initMap
         * @private
         * @readonly
         */
        me.initMap = ExtObject.chain(zuper.initMap);

        /**
         * This object holds the default value for each config property keyed by name. This
         * object has as its prototype object the `values` of its super class.
         * 
         * This map is maintained as each property is added via the `add` method.
         * 
         * @property {Object} values
         * @private
         * @readonly
         */
        me.values = ExtObject.chain(zuper.values);
    } else {
        me.configs = {};
        me.cachedConfigs = {};
        me.initMap = {};
        me.values = {};
    }

    prototype.config = prototype.defaultConfig = me.values;
    cls.$config = me;
};

Ext.Configurator.prototype = {
    self: Ext.Configurator,

    /**
     * This array holds the properties that need to be set on new instances.
     * 
     * This array is populated when the first instance is passed to `configure` (basically
     * when the first instance is created). The entries in `initMap` are iterated to find
     * those configs needing per-instance processing.
     * 
     * @property {Ext.Config[]} initList
     * @private
     */
    initList: null,

    /**
     * This method adds new config properties. This is called for classes when they are
     * declared, then for any mixins that class may define and finally for any overrides
     * defined that target the class.
     * 
     * @param {Object} config The config object containing the new config properties.
     * @param {Class} [mixinClass] The mixin class if the configs are from a mixin.
     * @private
     */
    add: function (config, mixinClass) {
        var me = this,
            Cls = me.cls,
            configs = me.configs,
            cachedConfigs = me.cachedConfigs,
            initMap = me.initMap,
            prototype = Cls.prototype,
            mixinConfigs = mixinClass && mixinClass.$config.configs,
            values = me.values,
            isObject, meta, isCached, merge,
            cfg, currentValue, name, names, s, value;

        for (name in config) {
            value = config[name];
            isObject = value && value.constructor === Object;
            meta = isObject && '$value' in value ? value : null;
            if (meta) {
                isCached = !!meta.cached;
                value = meta.$value;
            }

            merge = meta && meta.merge;

            cfg = configs[name];
            if (cfg) {
                // Only proceed with a mixin if we have a custom merge.
                if (mixinClass) {
                    merge = cfg.merge;
                    if (!merge) {
                        continue;
                    }
                    // Don't want the mixin meta modifying our own
                    meta = null;
                } else {
                    merge = merge || cfg.merge;
                }

                //<debug>
                // This means that we've already declared this as a config in a superclass
                // Let's not allow us to change it here.
                if (!mixinClass && isCached && !cachedConfigs[name]) {
                    Ext.Error.raise('Redefining config as cached: ' + name + ' in class: ' + Cls.$className);
                }
                //</debug>

                // There is already a value for this config and we are not allowed to
                // modify it. So, if it is an object and the new value is also an object,
                // the result is a merge so we have to merge both on to a new object.
                currentValue = values[name];

                if (merge) {
                    value = merge.call(cfg, value, currentValue, Cls, mixinClass);
                } else if (isObject) {
                    if (currentValue && currentValue.constructor === Object) {
                        // We favor moving the cost of an "extra" copy here because this
                        // is likely to be a rare thing two object values for the same
                        // property. The alternative would be to clone the initial value
                        // to make it safely modifiable even though it is likely to never
                        // need to be modified.
                        value = ExtObject.merge({}, currentValue, value);
                    }
                    // else "currentValue" is a primitive so "value" can just replace it
                }
                // else "value" is a primitive and it can just replace currentValue
            } else {
                // This is a new property value, so add it to the various maps "as is".
                // In the majority of cases this value will not be overridden or need to
                // be forked.
                if (mixinConfigs) {
                    // Since this is a config from a mixin, we don't want to apply its
                    // meta-ness because it already has. Instead we want to use its cfg
                    // instance:
                    cfg = mixinConfigs[name];
                    meta = null;
                } else {
                    cfg = ExtConfig.get(name);
                }

                configs[name] = cfg;
                if (cfg.cached || isCached) {
                    cachedConfigs[name] = true;
                }

                // Ensure that the new config has a getter and setter. Because this method
                // is called during class creation as the "config" (or "cachedConfig") is
                // being processed, the user's methods will not be on the prototype yet.
                // 
                // This has the following trade-offs:
                // 
                // - Custom getters are rare so there is minimal waste generated by them.
                // 
                // - Custom setters are more common but, by putting the default setter on
                //   the prototype prior to addMembers, when the user methods are added
                //   callParent can be used to call the generated setter. This is almost
                //   certainly desirable as the setter has some very important semantics
                //   that a custom setter would probably want to preserve by just adding
                //   logic before and/or after the callParent.
                //   
                // - By not adding these to the class body we avoid all the "is function"
                //   tests that get applied to each class member thereby streamlining the
                //   downstream class creation process.
                //
                // We still check for getter and/or setter but primarily for reasons of
                // backwards compatibility and "just in case" someone relied on inherited
                // getter/setter even though the base did not have the property listed as
                // a "config" (obscure case certainly).
                //
                names = cfg.names;
                if (!prototype[s = names.get]) {
                    prototype[s] = cfg.getGetter();
                }
                if (!prototype[s = names.set]) {
                    prototype[s] = cfg.getSetter();
                }
            }

            if (meta) {
                if (cfg.owner !== Cls) {
                    configs[name] = cfg = Ext.Object.chain(cfg);
                    cfg.owner = Cls;
                }
                Ext.apply(cfg, meta);
                delete cfg.$value;
            }

            // If the value is non-null, we need to initialize it.
            if (value !== null) {
                initMap[name] = true;
            } else {
                if (prototype.$configPrefixed) {
                    prototype[configs[name].names.internal] = null;
                } else {
                    prototype[configs[name].name] = null;
                }
                if (name in initMap) {
                    // Only set this to false if we already have it in the map, otherwise, just leave it out!
                    initMap[name] = false;
                }
            }
            values[name] = value;
        }
    },

    /**
     * This method configures the given `instance` using the specified `instanceConfig`.
     * The given `instance` should have been created by this object's `cls`.
     * 
     * @param {Object} instance The instance to configure.
     * @param {Object} instanceConfig The configuration properties to apply to `instance`.
     * @private
     */
    configure: function (instance, instanceConfig) {
        var me = this,
            configs = me.configs,
            initMap = me.initMap,
            initListMap = me.initListMap,
            initList = me.initList,
            prototype = me.cls.prototype,
            // Make a copy of the config properties for this instance so we can apply the
            // instanceConfig to it safely later:
            values = ExtObject.fork(me.values),
            notStrict = !instance.$configStrict,
            remaining = 0,
            firstInstance = !initList,
            cachedInitList, cfg, getter, needsInit, i, internalName,
            ln, names, name, value, isCached, merge, valuesKey;

        if (firstInstance) {
            // When called to configure the first instance of the class to which we are
            // bound we take a bit to plan for instance 2+.
            me.initList = initList = [];
            me.initListMap = initListMap = {};
            instance.isFirstInstance = true;

            for (name in initMap) {
                needsInit = initMap[name];
                cfg = configs[name];
                isCached = cfg.cached;
                if (needsInit) {
                    names = cfg.names;
                    value = values[name];

                    if (!prototype[names.set].$isDefault
                                || prototype[names.apply] || prototype[names.update]
                                || typeof value === 'object') {
                        if (isCached) {
                            // This is a cachedConfig, so it needs to be initialized with
                            // the default value and placed on the prototype... but the
                            // instanceConfig may have a different value so the value may
                            // need resetting. We have to defer the call to the setter so
                            // that all of the initGetters are set up first.
                            (cachedInitList || (cachedInitList = [])).push(cfg);
                        } else {
                            // Remember this config so that all instances (including this
                            // one) can invoke the setter to properly initialize it.
                            initList.push(cfg);
                            initListMap[name] = true;
                        }

                        // Point all getters to the initGetters. By doing this here we
                        // avoid creating initGetters for configs that don't need them
                        // and we can easily pick up the cached fn to save the call.
                        instance[names.get] = cfg.initGetter || cfg.getInitGetter();
                    } else {
                        // Non-object configs w/o custom setter, applier or updater can
                        // be simply stored on the prototype.
                        prototype[cfg.getInternalName(prototype)] = value;
                    }
                } else if (isCached) {
                    prototype[cfg.getInternalName(prototype)] = undefined;
                }
            }
        }

        ln = cachedInitList && cachedInitList.length;
        if (ln) {
            // This is only ever done on the first instance we configure. Any config in
            // cachedInitList has to be set to the default value to allow any side-effects
            // or transformations to occur. The resulting values can then be elevated to
            // the prototype and this property need not be initialized on each instance.

            for (i = 0; i < ln; ++i) {
                internalName = cachedInitList[i].getInternalName(prototype);
                // Since these are cached configs the base class will potentially have put
                // its cached values on the prototype so we need to hide these while we
                // run the inits for our cached configs.
                instance[internalName] = null;
            }

            for (i = 0; i < ln; ++i) {
                names = (cfg = cachedInitList[i]).names;
                getter = names.get;

                if (instance.hasOwnProperty(getter)) {
                    instance[names.set](values[cfg.name]);
                    delete instance[getter];
                }
            }

            for (i = 0; i < ln; ++i) {
                internalName = cachedInitList[i].getInternalName(prototype);
                prototype[internalName] = instance[internalName];
                delete instance[internalName];
            }

            // The cachedConfigs have all been set to the default values including any of
            // those that may have been triggered by their getter.
        }

        if (firstInstance) {
            // Allow the class to do things once the cachedConfig has been processed.
            // We need to call this method always when the first instance is configured
            // whether or not it actually has cached configs
            if (instance.afterCachedConfig && !instance.afterCachedConfig.$nullFn) {
                instance.afterCachedConfig(instanceConfig);
            }
        }

        // Let apply/update methods know that the initConfig is currently running.
        instance.isConfiguring = true;

        // Now that the cachedConfigs have been processed we can apply the instanceConfig
        // and hide the "configs" on the prototype. This will serve as the source for any
        // configs that need to initialize from their initial getter call.
        instance.config = values;
        
        // There are 2 possibilities here:
        // 1) If it's the first time in this function, we may have had cachedConfigs running.
        //    these configs may have called the getters for any of the normal getters, which
        //    means the initial getters have been clobbered on the instance and won't be able
        //    to be called below when we iterate over the initList. As such, we need to
        //    reinitialize them here, even though we've done it up above.
        //
        // 2) If this the second time in this function, the cachedConfigs won't be processed,
        //    so we don't need to worry about them clobbering config values. However, since
        //    we've already done all our setup, we won't enter into the block that sets the
        //    initGetter, so we need to do it here anyway.
        //
        // Also note, that lazy configs will appear in the initList because we need
        // to spin up the initGetter.

        for (i = 0, ln = initList.length; i < ln; ++i) {
            cfg = initList[i];
            instance[cfg.names.get] = cfg.initGetter || cfg.getInitGetter();
        }

        // Give the class a chance to transform the configs.
        if (instance.transformInstanceConfig) {
            instanceConfig = instance.transformInstanceConfig(instanceConfig);
        }

        // Important: We are looping here twice on purpose. This first loop serves 2 purposes:
        //
        // 1) Ensure the values collection is fully populated before we call any setters. Since
        // a setter may have an updater/applier, it could potentially call another getter() to grab
        // the value for some other property, so this ensures they are all set on the config object.
        //
        // 2) Ensure that the initGetter is set as the getter for any config that doesn't appear in
        // the initList. We need to ensure that the initGetter is pushed on for everything that we will
        // be setting during init time.
        //
        // The merging in this loop cannot be completed by Ext.merge(), since we do NOT want to merge
        // non-strict values, they should always just be assigned across without modification.
        if (instanceConfig) {
            for (name in instanceConfig) {
                value = instanceConfig[name];
                cfg = configs[name];
                if (!cfg) {
                    // Not all "configs" use the config system so in this case simply put
                    // the value on the instance:
                    if (notStrict) {
                        instance[name] = value;
                    }
                } else {
                    // However we still need to create the initial value that needs
                    // to be used. We also need to spin up the initGetter.
                    if (!cfg.lazy) {
                        ++remaining;    
                    }
                    if (!initListMap[name]) {
                        instance[cfg.names.get] = cfg.initGetter || cfg.getInitGetter();
                    }

                    merge = cfg.merge;
                    if (merge) {
                        value = merge.call(cfg, value, values[name], instance);
                    } else if (value && value.constructor === Object) {
                        valuesKey = values[name];
                        if (valuesKey && valuesKey.constructor === Object) {
                            value = ExtObject.merge(values[name], value);
                        } else {
                            value = Ext.clone(value);
                        }
                    }
                }
                values[name] = value;
            }
        }

        // Give the class a chance to hook in prior to initializing the configs.
        if (instance.beforeInitConfig && !instance.beforeInitConfig.$nullFn) {
            if (instance.beforeInitConfig(instanceConfig) === false) {
                return;
            }
        }

        if (instanceConfig) {
            for (name in instanceConfig) {
                if (!remaining) {
                    // For classes that have few proper Config properties, this saves us
                    // from making the full 2 passes over the instanceConfig.
                    break;
                }

                cfg = configs[name];
                if (cfg && !cfg.lazy) {
                    --remaining;
                    // A proper "config" property so call the setter to set the value.
                    names = cfg.names;
                    getter = names.get;

                    // At this point the initGetter may have already been called and
                    // cleared if the getter was called from the applier or updater of a
                    // previously processed instance config. checking if the instance has
                    // its own getter ensures the setter does not get called twice.
                    if (instance.hasOwnProperty(getter)) {
                        instance[names.set](values[name]);

                        // The generated setter will remove the initGetter from the instance
                        // but the user may have provided their own setter so we have to do
                        // this here as well:
                        delete instance[names.get];
                    }
                }
            }
        }

        // Process configs declared on the class that need per-instance initialization.
        for (i = 0, ln = initList.length; i < ln; ++i) {
            cfg = initList[i];
            names = cfg.names;
            getter = names.get;

            if (!cfg.lazy && instance.hasOwnProperty(getter)) {
                // Since the instance still hasOwn the getter, that means we've set an initGetter
                // and it hasn't been cleared by calling any setter. Since we've never set the value
                // because it wasn't passed in the instance, we go and set it here, taking the value
                // from our definition config and passing it through finally clear off the getter.
                instance[names.set](values[cfg.name]);
                delete instance[getter];
            }
        }

        // Expose the value from the prototype chain (false):
        delete instance.isConfiguring;
    },

    getCurrentConfig: function (instance) {
        var defaultConfig = instance.defaultConfig,
            config = {},
            name;

        for (name in defaultConfig) {
            config[name] = instance[configPropMap[name].names.get]();
        }

        return config;
    },

    reconfigure: function (instance, instanceConfig, onlyIfNotSet) {
        var currentConfig = instance.config,
            initialConfig = instance.initialConfig,
            configList = [],
            strict = instance.$configStrict,
            cfg, getter, i, len, name, names, setter;

        for (name in instanceConfig) {
            if (onlyIfNotSet && (name in initialConfig)) {
                continue;
            }

            currentConfig[name] = instanceConfig[name];
            cfg = configPropMap[name];

            if (cfg) {
                instance[cfg.names.get] = cfg.initGetter || cfg.getInitGetter();
            } else if (strict) {
                //<debug>
                if (name !== 'type') {
                    Ext.log.error('No such config "' + name + '" for class ' +
                                  instance.$className);
                }
                //</debug>
                continue;
            }

            configList.push(name);
        }

        for (i = 0, len = configList.length; i < len; i++) {
            name = configList[i];
            cfg = configPropMap[name];

            if (cfg) {
                names = cfg.names;
                getter = names.get;

                if (instance.hasOwnProperty(getter)) {
                    // Since the instance still hasOwn the getter, that means we've set an initGetter
                    // and it hasn't been cleared by calling any setter. Since we've never set the value
                    // because it wasn't passed in the instance, we go and set it here, taking the value
                    // from our definition config and passing it through finally clear off the getter.
                    instance[names.set](instanceConfig[name]);
                    delete instance[getter];
                }
            } else if (!strict) {
                cfg = Ext.Config.get(name);
                names = cfg.names;

                if (instance[names.set]) {
                    instance[names.set](instanceConfig[name]);
                }
                //<debug>
                else if (name !== 'type') {
                    Ext.Error.raise('Config "' + name + '" has no setter on class ' +
                                    instance.$className);
                }
                //</debug>
            }
        }
    }
};

}()); // closure on whole file
