Ext.define('Ext.aria.toolbar.Item', {
    override: 'Ext.toolbar.Item',
    
    requires: [
        'Ext.aria.Component'
    ],

    ariaNextNode: function() {
        return this.ownerCt.ariaNextNode();
    },

    ariaPreviousNode: function() {
        return this.ownerCt.ariaPreviousNode();
    }
});
