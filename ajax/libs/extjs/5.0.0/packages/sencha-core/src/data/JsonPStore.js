/**
 * @class Ext.data.JsonPStore
 * @extends Ext.data.Store
 * <p>Small helper class to make creating {@link Ext.data.Store}s from different domain JSON data easier.
 * A JsonPStore will be automatically configured with a {@link Ext.data.reader.Json} and a {@link Ext.data.proxy.JsonP JsonPProxy}.</p>
 * <p>A store configuration would be something like:<pre><code>
var store = new Ext.data.JsonPStore({
    // store configs
    storeId: 'myStore',

    // proxy configs
    url: 'get-images.php',

    // reader configs
    root: 'images',
    fields: ['name', 'url', {name:'size', type: 'float'}, {name:'lastmod', type:'date'}]
});
 * </code></pre></p>
 * <p>This store is configured to consume a returned object of the form:<pre><code>
stcCallback({
    images: [
        {name: 'Image one', url:'/GetImage.php?id=1', size:46.5, lastmod: new Date(2007, 10, 29)},
        {name: 'Image Two', url:'/GetImage.php?id=2', size:43.2, lastmod: new Date(2007, 10, 30)}
    ]
})
 * </code></pre>
 * <p>Where stcCallback is the callback name passed in the request to the remote domain. See {@link Ext.data.proxy.JsonP JsonPProxy}
 * for details of how this works.</p>
 * An object literal of this form could also be used as the {@link #cfg-data} config option.</p>
 * @xtype jsonpstore
 */
Ext.define('Ext.data.JsonPStore', {
    extend: 'Ext.data.Store',
    alias : 'store.jsonp',
    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json'
    ],

    constructor: function(config) {
        config = Ext.apply({
            proxy: {
                type: 'jsonp',
                reader: 'json'
            }
        }, config);
        this.callParent([config]);
    }
});