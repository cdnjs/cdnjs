Ext.define('Ext.aria.form.field.Radio', {
    override: 'Ext.form.field.Radio',
    requires: 'Ext.aria.form.field.Checkbox',
    
    onFocus: function(e) {
        var me = this;

        if (!e.ctrlkey) {
            me.setValue(true);
        }
        
        return me.callParent(arguments);
    }
});
