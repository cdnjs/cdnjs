Ext.define('Ext.aria.form.field.Date', {
    override: 'Ext.form.field.Date',
    
    requires: [
        'Ext.aria.form.field.Picker',
        'Ext.aria.picker.Date'
    ],
    
    formatText: 'Expected date format {0}',
    
    /**
     * @private
     * Override because we do not want to focus the field if the collapse
     * was because of a tab key. Tab should move the focus to the next field.
     * Before collapsing the field will set doCancelFieldFocus based on the pressed key
     */
    onCollapse: function() {
        var me = this;
        
        if (!me.doCancelFieldFocus) {
            me.focus(false, 60);
        }
    }
});
