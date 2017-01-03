/**
 * This class implements the Ext.Direct event domain. All classes extending from
 * {@link Ext.direct.Provider} are included in this domain. The selectors are simply provider
 * id's or the wildcard "*" to match any provider.
 *
 * @private
 */

Ext.define('Ext.app.domain.Direct', {
    extend: 'Ext.app.EventDomain',
    singleton: true,
    
    requires: [
        'Ext.direct.Provider'
    ],
    
    type: 'direct',
    idProperty: 'id',
    
    constructor: function() {
        var me = this;
        
        me.callParent();
        me.monitor(Ext.direct.Provider);
    }
});
