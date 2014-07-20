Ext.define('Ext.aria.form.FieldContainer', {
    override: 'Ext.form.FieldContainer',
    
    requires: [
        'Ext.aria.container.Container'
    ],
    
    onAdd: function(field) {
        field.isGroupedBy = this;
    },

    ariaGetEl: function() {
        return this.getTargetEl();
    },

    ariaGetAfterRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent(arguments);

        if (me.fieldLabel && me.labelEl) {
            attrs['aria-labelledby'] = me.labelEl.id;
        }

        return attrs;
    }
});
