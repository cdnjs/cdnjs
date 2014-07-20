Ext.define('Ext.aria.toolbar.Toolbar', {
    override: 'Ext.toolbar.Toolbar',
    
    requires: [
        'Ext.aria.container.Container'
    ],

    onBeforeAdd: function(component) {
        var me = this;
        
        if (component.is('field') || (component.is('button') && me.ui !== 'footer')) {
            component.isGroupedBy = me;
        }
        
        me.callParent(arguments);
    },

    ariaGetFocusItems: function() {
        var me = this,
            items, item, i, len;

        if (me.ui === 'footer') {
            return me.callParent(arguments);
        }
        
        if (me.lastFocus && me.lastFocus.isFocusable()) {
            return [me.lastFocus];
        }
        
        items = me.getRefItems();
        
        for (i = 0, len = items.length; i < len; i++) {
            item = items[i];
            
            if (item.isFocusable()) {
                return [item];
            }
        }
        
        return [];
    }
});
