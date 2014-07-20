Ext.define('Ext.aria.form.field.Display', {
    override: 'Ext.form.field.Display',
    
    requires: [
        'Ext.aria.form.field.Base'
    ],
    
    msgTarget: 'none',
    
    ariaGetRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent();
        
        attrs['aria-readonly'] = true;
        
        return attrs;
    },
    
    ariaGetFocusCls: function() {
        return this.ariaFocusCls;
    }
});
