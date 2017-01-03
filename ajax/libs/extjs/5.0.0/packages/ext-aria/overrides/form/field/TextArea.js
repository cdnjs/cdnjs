Ext.define('Ext.aria.form.field.TextArea', {
    override: 'Ext.form.field.TextArea',
    
    requires: [
        'Ext.aria.form.field.Text'
    ],

    ariaGetRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent();
        
        attrs['aria-multiline'] = true;
        
        return attrs;
    }
});
