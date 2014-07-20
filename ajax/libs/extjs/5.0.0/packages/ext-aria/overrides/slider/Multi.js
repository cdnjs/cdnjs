// There is no clear way to support multi-thumb sliders
// in accessible applications, so we default to support
// only single-slider ones

Ext.define('Ext.aria.slider.Multi', {
    override: 'Ext.slider.Multi',
    
    /**
     * @cfg {Number} [tipHideTimeout=1000] Timeout in ms after which
     * the slider tip will be hidden.
     */
    tipHideTimeout: 1000,
    
    animate: false,
    tabIndex: 0,
    
    ariaGetRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent();
        
        attrs['aria-minvalue'] = me.minValue;
        attrs['aria-maxvalue'] = me.maxValue;
        attrs['aria-valuenow'] = me.getValue(0);
        
        return attrs;
    },
    
    ariaGetFocusCls: function() {
        return this.ariaFocusCls;
    },
    
    getSubTplData: function() {
        var me = this,
            fmt = Ext.util.Format.attributes,
            data, attrs;
        
        data  = me.callParent();
        attrs = me.ariaGetRenderAttributes();
        
        // Role is rendered separately
        delete attrs.role;
        
        data.inputAttrTpl = fmt(attrs);
        
        return data;
    },
    
    onKeyDown: function(e) {
        var me = this,
            key, value;
        
        if (me.disabled || me.thumbs.length !== 1) {
            e.preventDefault();
            
            return;
        }
        
        key = e.getKey();
        
        switch (key) {
            case e.HOME:
                e.stopEvent();
                me.setValue(0, me.minValue, undefined, true);
                return;
            
            case e.END:
                e.stopEvent();
                me.setValue(0, me.maxValue, undefined, true);
                return;
            
            case e.PAGE_UP:
                e.stopEvent();
                value = me.getValue(0) - me.keyIncrement * 10;
                me.setValue(0, value, undefined, true);
                return;
            
            case e.PAGE_DOWN:
                e.stopEvent();
                value = me.getValue(0) + me.keyIncrement * 10;
                me.setValue(0, value, undefined, true);
                return;
        }
        
        me.callParent(arguments);
    },
    
    setMinValue: function(value) {
        var me = this;
        
        me.callParent(arguments);
        me.ariaUpdate({
            'aria-minvalue': value
        });
    },
    
    setMaxValue: function(value) {
        var me = this;
        
        me.callParent(arguments);
        me.ariaUpdate({
            'aria-maxvalue': value
        });
    },
    
    setValue: function(index, value) {
        var me = this;
        
        me.callParent(arguments);
        
        if (index === 0) {
            me.ariaUpdate({
                'aria-valuenow': value
            });
        }
    }
});
