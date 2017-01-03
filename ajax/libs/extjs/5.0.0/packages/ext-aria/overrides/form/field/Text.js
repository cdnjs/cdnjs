Ext.define('Ext.aria.form.field.Text', {
    override: 'Ext.form.field.Text',
    
    requires: [
        'Ext.aria.form.field.Base'
    ],
    
    ariaGetRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent();
        
        if (me.allowBlank !== undefined) {
            attrs['aria-required'] = !me.allowBlank;
        }
        
        return attrs;
    }
});
