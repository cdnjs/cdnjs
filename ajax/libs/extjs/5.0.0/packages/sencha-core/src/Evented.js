/**
 * @private
 */
Ext.define('Ext.Evented', {

    alternateClassName: 'Ext.EventedBase',

    mixins: [
        'Ext.mixin.Observable'
    ],

    statics: {
        generateSetter: function (cfg) {
            var names = cfg.names,
                name = cfg.name,
                prefixedName = names.internal,
                applyName = names.apply,
                changeEventName = names.changeEvent,
                doSetName = names.doSet;

            return function(value) {
                var me = this,
                    internalName = me.$configPrefixed ? prefixedName : name,
                    initialized = me.initialized,
                    oldValue,
                    applier = me[applyName];

                if (applier) {
                    value = applier.call(me, value, me[internalName]);
                    if (value === undefined) {
                        return me;
                    }
                }

                // The old value might have been changed at this point
                // (after the apply call chain) so it should be read here
                oldValue = me[internalName];

                if (value !== oldValue) {
                    if (initialized) {
                        me.fireAction(changeEventName, [me, value, oldValue], me.doSet, me, {
                            nameMap: names
                        });
                    }
                    else {
                        me[internalName] = value;
                        if (me[doSetName]) {
                            me[doSetName](value, oldValue);
                        }
                    }
                }

                return this;
            };
        }
    },

    initialized: false,

    constructor: function(config) {
        this.mixins.observable.constructor.call(this, config);
        this.initialized = true;
    },

    doSet: function(me, value, oldValue, options) {
        var nameMap = options.nameMap;

        me[nameMap.internal] = value;
        if (me[nameMap.doSet]) {
            me[nameMap.doSet].call(this, value, oldValue);
        }
    },

    onClassExtended: function(cls, data) {
        if (!data.hasOwnProperty('eventedConfig')) {
            return;
        }

        var config = data.config,
            eventedConfig = data.eventedConfig,
            cacheName = 'eventedSetter',
            name, cfg;

        if (config) {
            Ext.applyIf(config, eventedConfig);
        } else {
            cls.addConfig(eventedConfig);
        }

        /*
         * These are generated setters for eventedConfig
         *
         * If the component is initialized, it invokes fireAction to fire the event as well,
         * which indicate something has changed. Otherwise, it just executes the action
         * (happens during initialization)
         *
         * This is helpful when we only want the event to be fired for subsequent changes.
         * Also it's a major performance improvement for instantiation when fired events
         * are mostly useless since there's no listeners
         */
        for (name in eventedConfig) {
            if (eventedConfig.hasOwnProperty(name)) {
                cfg = Ext.Config.get(name);
                data[cfg.names.set] = cfg[cacheName] ||
                                     (cfg[cacheName] = this.generateSetter(cfg));
            }
        }
    }
});
