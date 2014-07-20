/**
 * @class Ext.Config
 * This class manages a config property. Instances of this type are created and cached as
 * classes declare their config properties. One instance of this class is created per
 * config property name.
 *
 *      Ext.define('MyClass', {
 *          config: {
 *              foo: 42
 *          }
 *      });
 *
 * This uses the cached `Ext.Config` instance for the "foo" property.
 *
 * When config properties apply options to config properties a prototype chained object is
 * created from the cached instance. For example:
 *
 *      Ext.define('MyClass', {
 *          config: {
 *              foo: {
 *                  $value: 42,
 *                  lazy: true
 *              }
 *          }
 *      });
 *
 * This creates a prototype chain to the cached "foo" instance of `Ext.Config` and applies
 * the `lazy` option to that new instance. This chained instance is then kept by the
 * `Ext.Configurator` for that class.
 * @private
 */
Ext.Config = function (name) {
// @define Ext.class.Config
// @define Ext.Config

    var me = this,
        capitalizedName = name.charAt(0).toUpperCase() + name.substr(1);

    /**
     * @property {String} name
     * The name of this config property.
     * @readonly
     * @private
     * @since 5.0.0
     */
    me.name = name;

    /**
     * @property {Object} names
     * This object holds the cached names used to lookup properties or methods for this
     * config property. The properties of this object are explained in the context of an
     * example property named "foo".
     *
     * @property {String} names.internal The default backing property ("_foo").
     *
     * @property {String} names.initializing The property that is `true` when the config
     * is being initialized ("isFooInitializing").
     *
     * @property {String} names.apply The name of the applier method ("applyFoo").
     *
     * @property {String} names.update  The name of the updater method ("updateFoo").
     *
     * @property {String} names.get The name of the getter method ("getFoo").
     *
     * @property {String} names.set The name of the setter method ("setFoo").
     *
     * @property {String} names.initGet The name of the initializing getter ("initGetFoo").
     *
     * @property {String} names.doSet The name of the evented setter ("doSetFoo").
     *
     * @property {String} names.changeEvent The name of the change event ("foochange").
     *
     * @readonly
     * @private
     * @since 5.0.0
     */
    me.names = {
        internal: '_' + name,
        initializing: 'is' + capitalizedName + 'Initializing',
        apply: 'apply' + capitalizedName,
        update: 'update' + capitalizedName,
        get: 'get' + capitalizedName,
        set: 'set' + capitalizedName,
        initGet: 'initGet' + capitalizedName,
        doSet : 'doSet' + capitalizedName,
        changeEvent: name.toLowerCase() + 'change'
    };

    // This allows folks to prototype chain on top of these objects and yet still cache
    // generated methods at the bottom of the chain.
    me.root = me;
};

Ext.Config.map = {};

Ext.Config.get = function (name) {
    var map = Ext.Config.map,
        ret = map[name] || (map[name] = new Ext.Config(name));

    return ret;
};

Ext.Config.prototype = {
    self: Ext.Config,

    isConfig: true,

    /**
     * @cfg {Boolean} [cached=false]
     * When set as `true` the config property will be stored on the class prototype once
     * the first instance has had a chance to process the default value.
     * @private
     * @since 5.0.0
     */

    /**
     * @cfg {Boolean} [lazy=false]
     * When set as `true` the config property will not be immediately initialized during
     * the `initConfig` call.
     * @private
     * @since 5.0.0
     */

    /**
     * @cfg {Function} [merge]
     * This function if supplied will be called as classes or instances provide values
     * that need to be combined with inherited values. The function should return the
     * value that will be the config value. Further calls may receive such returned
     * values as `oldValue`.
     *
     * @cfg {Mixed} merge.newValue The new value to merge with the old.
     *
     * @cfg {Mixed} merge.oldValue The current value prior to `newValue` being merged.
     *
     * @cfg {Mixed} merge.target The class or instance to which the merged config value
     * will be applied.
     *
     * @cfg {Ext.Class} merge.mixinClass The mixin providing the `newValue` or `null` if
     * the `newValue` is not being provided by a mixin.
     */

    getGetter: function () {
        return this.getter || (this.root.getter = this.makeGetter());
    },
    
    getInitGetter: function () {
        return this.initGetter || (this.root.initGetter = this.makeInitGetter());
    },

    getSetter: function () {
        return this.setter || (this.root.setter = this.makeSetter());
    },

    /**
     * Returns the name of the property that stores this config on the given instance or
     * class prototype.
     * @param {Object} target
     * @return {String}
     */
    getInternalName: function (target) {
        return target.$configPrefixed ? this.names.internal : this.name;
    },

    /**
     * Merges the `newValue` and the `oldValue` assuming that these are basically objects
     * the represent sets. For example something like:
     *
     *      {
     *          foo: true,
     *          bar: true
     *      }
     *
     * The merge process converts arrays like the following into the above:
     *
     *      [ 'foo', 'bar' ]
     *
     * @param {String/String[]/Object} newValue
     * @param {Object} oldValue
     * @param {Boolean} [preserveExisting=false]
     * @return {Object}
     * @private
     * @since 5.0.0
     */
    mergeSets: function (newValue, oldValue, preserveExisting) {
        var ret = oldValue ? Ext.Object.chain(oldValue) : {},
            i, val;

        if (newValue instanceof Array) {
            for (i = newValue.length; i--; ) {
                val = newValue[i];
                if (!preserveExisting || !(val in ret)) {
                    ret[val] = true;
                }
            }
        } else if (newValue) {
            if (newValue.constructor === Object) {
                for (i in newValue) {
                    val = newValue[i];
                    if (!preserveExisting || !(i in ret)) {
                        ret[i] = val;
                    }
                }
            } else if (!preserveExisting || !(newValue in ret)) {
                ret[newValue] = true;
            }
        }

        return ret;
    },

    //--------------------------------------------------
    // Factories

    makeGetter: function () {
        var name = this.name,
            prefixedName = this.names.internal;

        return function () {
            var internalName = this.$configPrefixed ? prefixedName : name;
            return this[internalName];
        };
    },

    makeInitGetter: function () {
        var name = this.name,
            names = this.names,
            setName = names.set,
            getName = names.get,
            initializingName = names.initializing;

        return function () {
            var me = this;

            me[initializingName] = true;
            // Remove the initGetter from the instance now that the value has been set.
            delete me[getName];

            me[setName](me.config[name]);
            delete me[initializingName];

            return me[getName].apply(me, arguments);
        };
    },

    makeSetter: function () {
        var name = this.name,
            names = this.names,
            prefixedName = names.internal,
            getName = names.get,
            applyName = names.apply,
            updateName = names.update,
            setter;

        // http://jsperf.com/method-call-apply-or-direct
        // http://jsperf.com/method-detect-invoke
        setter = function (value) {
            var me = this,
                internalName = me.$configPrefixed ? prefixedName : name,
                oldValue = me[internalName];

            // Remove the initGetter from the instance now that the value has been set.
            delete me[getName];

            if (!me[applyName] || (value = me[applyName](value, oldValue)) !== undefined) {
                // The old value might have been changed at this point
                // (after the apply call chain) so it should be read again
                if (value !== (oldValue = me[internalName])) {
                    me[internalName] = value;

                    if (me[updateName]) {
                        me[updateName](value, oldValue);
                    }
                }
            }

            return me;
        };

        setter.$isDefault = true;

        return setter;
    }
};
