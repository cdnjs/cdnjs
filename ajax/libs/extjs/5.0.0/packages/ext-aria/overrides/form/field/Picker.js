Ext.define('Ext.aria.form.field.Picker', {
    override: 'Ext.form.field.Picker',
    
    requires: [
        'Ext.aria.form.field.Trigger'
    ],
    
    getAriaRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent();
        
        attrs['aria-haspopup'] = true;
        
        return attrs;
    },

    ariaGetAfterRenderAttributes: function() {
        var me = this,
            attrs, picker;
        
        attrs  = me.callParent();
        picker = me.getPicker();
        
        if (picker) {
            attrs['aria-owns'] = picker.id;
        }
        
        return attrs;
    }
});
