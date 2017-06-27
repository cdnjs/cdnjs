/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
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
    idProperty: 'name',
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