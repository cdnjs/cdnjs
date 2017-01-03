Ext.define('Ext.aria.form.CheckboxGroup', {
    override: 'Ext.form.CheckboxGroup',
    
    requires: [
        'Ext.aria.form.FieldContainer',
        'Ext.aria.form.field.Base'
    ],
    
    msgTarget: 'side',
    
    ariaGetEl: function() {
        return this.el;
    },
    
    ariaGetFocusItems: function(backwards) {
        var me = this,
            lastFocus = me.lastFocus,
            boxes, box, i, len;
        
        boxes = me.getRefItems();
        len   = boxes.length;
        
        // When a checkbox group gets focus it should pass it to
        // the checkbox that *is* focused, or the one that was focused before,
        // or the first one if we're tabbing forward, or the last one
        // if we're shift-tabbing
        for (i = 0; i < len; i++) {
            box = boxes[i];
            
            if (box.hasFocus) {
                return [box];
            }
        }
        
        if (lastFocus && lastFocus.isFocusable()) {
            return [lastFocus];
        }
        
        if (boxes.length > 0) {
            box = backwards ? boxes[boxes.length - 1] : boxes[0];
            
            return [box];
        }
    },
    
    setReadOnly: function(readOnly) {
        var me = this;
        
        me.callParent(arguments);
        
        me.ariaUpdate({ 'aria-readonly': !!readOnly });
    },
    
    markInvalid: function(f, isValid) {
        var me = this;
        
        me.callParent(arguments);
        
        me.ariaUpdate({ 'aria-invalid': !!isValid });
    },
    
    clearInvalid: function() {
        var me = this;
        
        me.callParent(arguments);
        
        me.ariaUpdate({ 'aria-invalid': false });
    }
});
