// @define Ext.Factory
/**
 * @class Ext.Factory
 * Manages factories for families of classes (classes with a common `alias` prefix). The
 * factory for a class family is a function stored as a `static` on `Ext.Factory`. These
 * are created either by directly calling `Ext.Factory.define` or by using the
 * `Ext.mixin.Factoryable` interface.
 *
 * To illustrate, consider the layout system's use of aliases. The `hbox` layout maps to
 * the `"layout.hbox"` alias that one typically provides via the `layout` config on a
 * Container.
 *
 * Under the covers this maps to a call like this:
 *
 *      Ext.Factory.layout('hbox');
 *
 * Or possibly:
 *
 *      Ext.Factory.layout({
 *          type: 'hbox'
 *      });
 *
 * The value of the `layout` config is passed to the `Ext.Factory.layout` function. The
 * exact signature of a factory method matches `{@link Ext.Factory#create}`.
 *
 * To define this factory directly, one could call `Ext.Factory.define` like so:
 *
 *      Ext.Factory.define('layout', 'auto');  // "layout.auto" is the default type
 *
 * @since 5.0.0
 */
Ext.Factory = function (type) {
    var me = this;

    me.aliasPrefix = type + '.';
    me.cache = {};
    me.name = type.replace(me.fixNameRe, me.fixNameFn);
    me.type = type;
};

Ext.Factory.prototype = {
    /**
     * @cfg {String} [aliasPrefix]
     * The prefix to apply to `type` values to form a complete alias. This defaults to the
     * proper value in most all cases and should not need to be specified.
     *
     * @since 5.0.0
     */

    /**
     * @cfg {String} [defaultProperty="type"]
     * The config property to set when the factory is given a config that is a string.
     *
     * @since 5.0.0
     */
    defaultProperty: 'type',

    /**
     * @cfg {String} [defaultType=null]
     * An optional type to use if none is given to the factory at invocation. This is a
     * suffix added to the `aliasPrefix`. For example, if `aliasPrefix="layout."` and
     * `defaultType="hbox"` the default alias is `"layout.hbox"`. This is an alternative
     * to `xclass` so only one should be provided.
     *
     * @since 5.0.0
     */

    /**
     * @cfg {String} [instanceProp="isInstance"]
     * The property that identifies an object as instance vs a config.
     *
     * @since 5.0.0
     */
    instanceProp: 'isInstance',

    /**
     * @cfg {String} [xclass=null]
     * The full classname of the type of instance to create when none is provided to the
     * factory. This is an alternative to `defaultType` so only one should be specified.
     *
     * @since 5.0.0
     */

    /**
     * @property {Ext.Class} [defaultClass=null]
     * The Class reference of the type of instance to create when none is provided to the
     * factory. This property is set from `xclass` when the factory instance is created.
     * @private
     * @readonly
     *
     * @since 5.0.0
     */

    /**
     * Creates an instance of this class family given configuration options.
     *
     * @param {Object/String} [config] The configuration or instance (if an Object) or
     * just the type (if a String) describing the instance to create.
     * @param {String} [config.xclass] The full class name of the class to create.
     * @param {String} [config.type] The type string to add to the alias prefix for this
     * factory.
     * @param {String} [defaultType] The type to create if no type is contained in the
     * `config`.
     * @return {Object} The newly created instance.
     *
     * @since 5.0.0
     */
    create: function (config, defaultType) {
        var me = this,
            Manager = Ext.ClassManager,
            cache = me.cache,
            alias, className, klass, suffix;

        if (config) {
            if (config[me.instanceProp]) {
                return config;
            }

            if (typeof config === 'string') {
                suffix = config;
                config = {};
                config[me.defaultProperty] = suffix;
            }

            className = config.xclass;
            suffix = config.type;
        }

        if (className) {
            if (!(klass = Manager.get(className))) {
                return Manager.instantiate(className, config);
            }
        } else {
            if (!(suffix = suffix || defaultType || me.defaultType)) {
                klass = me.defaultClass;
            }
            //<debug>
            if (!suffix && !klass) {
                Ext.Error.raise('No type specified for ' + me.type + '.create');
            }
            //</debug>

            if (!klass && !(klass = cache[suffix])) {
                alias = me.aliasPrefix + suffix;
                className = Manager.getNameByAlias(alias);

                // this is needed to support demand loading of the class
                if (!(klass = className && Manager.get(className))) {
                    return Manager.instantiateByAlias(alias, config);
                }
                cache[suffix] = klass;
            }
        }

        return new klass(config);
    },

    fixNameRe: /\.[a-z]/ig,
    fixNameFn: function (match) {
        return match.substring(1).toUpperCase();
    },
    
    clearCache: function() {
        this.cache = {};
    }
};

/**
 * For example, the layout alias family could be fined like this:
 *
 *      Ext.Factory.define('layout', {
 *          defaultType: 'auto'
 *      });
 *
 * To define multiple families at once:
 *
 *      Ext.Factory.define({
 *          layout: {
 *              defaultType: 'auto'
 *          }
 *      });
 *
 * @param {String} type The alias prefix for type (e.g., "layout.").
 * @param {Object/String} [config] An object specifying the config for the `Ext.Factory`
 * to be created. If a string is passed it is treated as the `defaultType`.
 * @return {Function}
 *
 * @since 5.0.0
 */
Ext.Factory.define = function (type, config) {
    var Factory = Ext.Factory,
        defaultClass, factory, fn;

    if (type.constructor === Object) {
        Ext.Object.each(type, Factory.define, Factory);
    } else {
        factory = new Ext.Factory(type);

        if (config) {
            if (config.constructor === Object) {
                Ext.apply(factory, config);

                if (typeof(defaultClass = factory.xclass) === 'string') {
                    factory.defaultClass = Ext.ClassManager.get(defaultClass);
                }
            } else {
                factory.defaultType = config;
            }
        }

        Factory[factory.name] = fn = factory.create.bind(factory);
        fn.instance = factory;
    }

    return fn;
};

/**
 * This mixin automates use of `Ext.Factory`. When mixed in to a class, the `alias` of the
 * class is retrieved and combined with an optional `factoryConfig` property on that class
 * to produce the configuration to pass to `Ext.Factory`.
 *
 * The factory method created by `Ext.Factory` is also added as a static method to the
 * target class.
 *
 * Given a class declared like so:
 *
 *      Ext.define('App.bar.Thing', {
 *          mixins: [
 *              'Ext.mixin.Factoryable'
 *          ],
 *
 *          alias: 'bar.thing',  // this is detected by Factoryable
 *
 *          factoryConfig: {
 *              defaultType: 'thing',  // this is the default deduced from the alias
 *              // other configs
 *          },
 *
 *          ...
 *      });
 *
 * The produced factory function can be used to create instances using the following
 * forms:
 *
 *      var obj;
 *
 *      obj = App.bar.Thing.create('thing'); // same as "new App.bar.Thing()"
 *
 *      obj = App.bar.Thing.create({
 *          type: 'thing'       // same as above
 *      });
 *
 *      obj = App.bar.Thing.create({
 *          xclass: 'App.bar.Thing'  // same as above
 *      });
 *
 *      var obj2 = App.bar.Thing.create(obj);
 *      // obj === obj2  (passing an instance returns the instance)
 *
 * Alternatively the produced factory is available as a static method of `Ext.Factory`.
 *
 * @since 5.0.0
 */
Ext.define('Ext.mixin.Factoryable', {
    mixinId: 'factoryable',

    onClassMixedIn: function (targetClass) {
        var proto = targetClass.prototype,
            factoryConfig = proto.factoryConfig,
            alias = proto.alias,
            config = {},
            dot;

        alias = alias && alias.length && alias[0];
        if (alias && (dot = alias.lastIndexOf('.')) > 0) {
            config.type = alias.substring(0, dot);
            config.defaultType = alias.substring(dot+1);
        }

        if (factoryConfig) {
            delete proto.factoryConfig;
            Ext.apply(config, factoryConfig);
        }

        targetClass.create = Ext.Factory.define(config.type, config);
    }

    /**
     * @property {Object} [factoryConfig]
     * If this property is specified by the target class of this mixin its properties are
     * used to configure the created `Ext.Factory`.
     */
});
