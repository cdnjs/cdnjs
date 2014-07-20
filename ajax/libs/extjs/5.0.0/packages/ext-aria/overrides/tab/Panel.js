Ext.define('Ext.aria.tab.Panel', {
    override: 'Ext.tab.Panel',
    
    requires: [
        'Ext.layout.container.Card',
        'Ext.aria.tab.Bar'
    ],
    
    isTabPanel: true,

    onAdd: function(item, index) {
        item.ariaRole = 'tabpanel';
        
        this.callParent(arguments);
    },

    setActiveTab: function(card) {
        var me = this,
            items, item, isActive, i, len;

        me.callParent(arguments);
        
        items = me.getRefItems();
        
        for (i = 0, len = items.length; i < len; i++) {
            item = items[i];
            
            if (item.ariaRole === 'tabpanel') {
                isActive = item === card;
                
                item.ariaUpdate({
                    'aria-expanded': isActive,
                    'aria-hidden': !isActive
                });
            }
        }
    },
    
    ariaIsOwnTab: function(cmp) {
        return cmp.isTab && cmp.isGroupedBy.ownerCt === this;
    }
});
