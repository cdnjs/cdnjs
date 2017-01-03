/**
 * This class has been deprecated. Use `Ext.data.schema.Schema` instead.
 */
Ext.define('Ext.data.ModelManager', {
    alternateClassName: 'Ext.ModelMgr',

    requires: [
        'Ext.data.schema.Schema'
    ],
    
    singleton: true,

    deprecated: {
        5: {
            methods: {
                clear: null,

                create: function (data, name, id) {
                    var T = name;

                    if (!T.isEntity) {
                        T = this.getModel(name || data.name);
                    }

                    return T.createWithId(id, data);
                },

                each: function(fn, scope) {
                    Ext.data.Model.schema.eachEntity(fn, scope);
                },

                get: function(name) {
                    return this.getModel(name);
                },

                getCount: function() {
                    return Ext.data.Model.schema.entityCount;
                },

                /**
                 * Returns the {@link Ext.data.Model} class for a given model name
                 * @param {String/Object} id The classname of the model or the model class itself.
                 * @return {Ext.data.Model} a model class.
                 * @deprecated Use {@link Ext.data.schema.Schema#lookupEntity} instead.
                 */
                getModel: function (id) {
                    return Ext.data.schema.Schema.lookupEntity(id);
                },

                isRegistered: function(name) {
                    return !!this.getModel(name);
                }
            }
        }
    }
});
