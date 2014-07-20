/**
 * This class implements the data store event domain. All classes extending from 
 * {@link Ext.data.AbstractStore} are included in this domain. The selectors are simply
 * store id's or the wildcard "*" to match any store.
 *
 * @private
 */

Ext.define('Ext.app.domain.Store', {
    extend: 'Ext.app.EventDomain',
    singleton: true,
    
    requires: [
        'Ext.data.AbstractStore'
    ],
    
    type: 'store',
    idProperty: 'storeId',
    
    constructor: function() {
        var me = this;
        
        me.callParent();
        me.monitor(Ext.data.AbstractStore);
    }
});
