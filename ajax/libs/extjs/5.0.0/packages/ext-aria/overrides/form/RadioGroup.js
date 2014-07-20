Ext.define('Ext.aria.form.RadioGroup', {
    override: 'Ext.form.RadioGroup',
    
    requires: [
        'Ext.aria.form.CheckboxGroup'
    ],
    
    ariaGetRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent();
        
        if (me.allowBlank !== undefined) {
            attrs['aria-required'] = !me.allowBlank;
        }

        return attrs;
    },

    ariaGetAfterRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent();

        if (me.labelEl) {
            attrs['aria-labelledby'] = me.labelEl.id;
        }
        
        return attrs;
    },
    
    ariaGetFocusItems: function(backwards) {
        var me = this,
            lastFocus = me.lastFocus,
            radios, radio, i, len;
        
        radios = me.getRefItems();
        len    = radios.length;

        // When a radio group gets focus it should pass it to
        // the radio button *is* focused, or the one that was focused before,
        // or the checked one, or the first one if we're tabbing forward,
        // or the last one if we're shift-tabbing
        for (i = 0; i < len; i++) {
            radio = radios[i];
            
            if (radio.hasFocus) {
                return [radio];
            }
        }
        
        for (i = 0; i < len; i++) {
            radio = radios[i];
            
            if (radio.checked) {
                return [radio];
            }
        }
        
        if (lastFocus && lastFocus.isFocusable()) {
            return [lastFocus];
        }

        if (radios.length > 0) {
            radio = backwards ? radios[radios.length - 1] : radios[0];
            
            return [radio];
        }
    }
});
