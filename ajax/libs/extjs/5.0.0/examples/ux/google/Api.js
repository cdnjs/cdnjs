/**
 * This base class can be used by derived classes to dynamically require Google API's.
 */
Ext.define('Ext.ux.google.Api', {
    mixins: [
        'Ext.mixin.Mashup'
    ],

    requiredScripts: [
        'http://www.google.com/jsapi'
    ],

    statics: {
        loadedModules: {
            /*
             *  feeds: [ callback1, callback2, .... ]  transitions to -> feeds : true  (when complete)
             */
        }
    },

    onClassExtended: function(cls, data, hooks) {
        var onBeforeClassCreated = hooks.onBeforeCreated,
            Api = this; // the Ext.ux.google.Api class

        hooks.onBeforeCreated = function(cls, data) {
            var me = this,
                apis = [],
                requiresGoogle = Ext.Array.from(data.requiresGoogle),
                loadedModules = Api.loadedModules,
                remaining = 0,
                callback = function () {
                    if (! --remaining) {
                        onBeforeClassCreated.call(me, cls, data, hooks);
                    }
                    Ext.env.Ready.unblock();
                },
                api, i, length;

            /*
             *  requiresGoogle: [
             *      'feeds',
             *      { api: 'feeds', version: '1.x',
             *        callback : fn, nocss : true }  //optionals
             *  ]
             */
            length = requiresGoogle.length;

            for (i = 0; i < length; ++i) {
                if (Ext.isString(api = requiresGoogle[i])) {
                    apis.push({ api: api });
                } else if(Ext.isObject(api)) {
                    apis.push(Ext.apply({}, api));
                }
            }

            Ext.each(apis, function (api) {
                var name = api.api,
                    version = String(api.version || '1.x'),
                    module = loadedModules[name];

                if (!module) {
                    ++remaining;
                    Ext.env.Ready.block();
                    loadedModules[name] = module = [ callback ].concat(api.callback || []);

                    delete api.api;
                    delete api.version;

                    //TODO:  window.google assertion?

                    google.load(
                        name,
                        version,
                        Ext.applyIf({
                            callback    : function () {
                                loadedModules[name] = true;

                                for (var n = module.length; n-- > 0; ) {
                                    module[n]();    //iterate callbacks in reverse
                                }
                            }
                        }, api)
                    );

                } else if (module !== true) {
                    module.push(callback);
                }
            });

            if (!remaining) {
                onBeforeClassCreated.call(me, cls, data, hooks);
            }
        };
    }
});
