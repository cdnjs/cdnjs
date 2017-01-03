Ext.define('Ext.aria.view.BoundList', {
    override: 'Ext.view.BoundList',
    
    requires: [
        'Ext.aria.view.View'
    ],

    // TODO: Move this to selection model which shuld then separate
    // selected from active. Active === focused
    highlightItem: function(item) {
        var me = this;
        
        item.setAttribute('aria-selected', true);
        
        me.ariaUpdate({
            'aria-activedescendant': item.id
        });
        
        me.ariaAddFocus(item);
        
        me.callParent(arguments);
    },

    clearHighlight: function() {
        var me = this,
            highlightedItem = me.highlightedItem;
        
        if (highlightedItem) {
            highlightedItem.setAttribute('aria-selected', false);
            
            me.ariaUpdate({
                'aria-activedescendant': undefined
            });
            
            me.ariaRemoveFocus();
        }
        
        me.callParent(arguments);
    }
});
