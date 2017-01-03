Ext.define('KitchenSink.data.Init', {
    requires: [
        'Ext.ux.ajax.JsonSimlet',
        'Ext.ux.ajax.SimManager'
    ],

    singleton: true,

    constructor: function() {
        Ext.ux.ajax.SimManager.init({
            defaultSimlet: null
        });
    }
});
