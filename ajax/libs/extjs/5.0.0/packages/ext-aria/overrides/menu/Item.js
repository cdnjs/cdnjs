Ext.define('Ext.aria.menu.Item', {
    override: 'Ext.menu.Item',
    
    ariaGetRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent();
        
        if (me.menu) {
            attrs['aria-haspopup'] = true;
        }
        
        return attrs;
    },
    
    ariaGetAfterRenderAttributes: function() {
        var me = this,
            menu = me.menu,
            attrs;
        
        attrs = me.callParent();
        
        if (menu && menu.rendered) {
            attrs['aria-controls'] = menu.ariaGetEl().id;
        }
        
        if (me.plain) {
            attrs['aria-label'] = me.text;
        }
        else {
            attrs['aria-labelledby'] = me.textEl.id;
        }
        
        return attrs;
    },
    
    doExpandMenu: function() {
        var me = this,
            menu = me.menu;
        
        me.callParent();
        
        if (menu && menu.rendered) {
            me.ariaUpdate({ 'aria-controls': menu.ariaGetEl().id });
        }
    }
});
