Ext.define('Ext.aria.menu.CheckItem', {
    override: 'Ext.menu.CheckItem',
    
    ariaGetRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent();
        
        attrs['aria-checked'] = me.menu ? 'mixed' : !!me.checked;
        
        return attrs;
    }
});
