Ext.define('Ext.aria.form.field.Number', {
    override: 'Ext.form.field.Number',
    
    requires: [
        'Ext.aria.form.field.Spinner'
    ],

    ariaGetRenderAttributes: function() {
        var me = this,
            min = me.minValue,
            max = me.maxValue,
            attrs, v;
        
        attrs = me.callParent(arguments);
        v = me.getValue();
        
        // Skip the defaults
        if (min !== Number.NEGATIVE_INFINITY) {
            attrs['aria-valuemin'] = isFinite(min) ? min : 'NaN';
        }
        
        if (max !== Number.MAX_VALUE) {
            attrs['aria-valuemax'] = isFinite(max) ? max : 'NaN';
        }
        
        attrs['aria-valuenow'] = v !== null && isFinite(v) ? v : 'NaN';
        
        return attrs;
    },

    onChange: function (f) {
        var me = this,
            v;

        me.callParent(arguments);
        
        v = me.getValue();
        me.ariaUpdate({
            'aria-valuenow': v !== null && isFinite(v) ? v : 'NaN'
        });
    },

    setMinValue: function() {
        var me = this;
        
        me.callParent(arguments);
        me.ariaUpdate({
            'aria-valuemin': isFinite(me.minValue) ? me.minValue : 'NaN'
        });
    },

    setMaxValue: function() {
        var me = this;
        
        me.callParent(arguments);
        me.ariaUpdate({
            'aria-valuemax': isFinite(me.maxValue) ? me.maxValue : 'NaN'
        });
    }
});
