Ext.define('Ext.aria.form.field.Checkbox', {
    override: 'Ext.form.field.Checkbox',
    
    requires: [
        'Ext.aria.form.field.Base'
    ],
    
    /**
     * @cfg {Boolean} [required=false] Set to `true` to make screen readers announce this
     * checkbox as required. Note that no field validation is performed, and this option
     * only affects ARIA attributes set for this field.
     */
    
    isFieldLabelable: false,
    hideLabel: true,

    ariaGetEl: function() {
        return this.inputEl;
    },

    ariaGetRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent(arguments);
        
        attrs['aria-checked'] = me.getValue();
        
        if (me.required) {
            attrs['aria-required'] = true;
        }
        
        return attrs;
    },
    
    ariaGetAfterRenderAttributes: function() {
        var me = this,
            boxLabelEl = me.boxLabelEl,
            attrs;
        
        attrs = me.callParent();
        
        if (me.boxLabel && !me.fieldLabel && boxLabelEl) {
            attrs['aria-labelledby'] = boxLabelEl.id;
        }
        
        return attrs;
    },
    
    onChange: function() {
        var me = this;

        me.callParent(arguments);
        
        me.ariaUpdate({
            'aria-checked': me.getValue()
        });
    }
});
