Ext.define('Ext.aria.panel.Tool', {
    override: 'Ext.panel.Tool',
    
    requires: [
        'Ext.aria.Component',
        'Ext.util.KeyMap'
    ],
    
    destroy: function() {
        if (this.keyMap) {
            this.keyMap.destroy();
        }
        
        this.callParent();
    },
    
    ariaAddKeyMap: function(params) {
        var me = this;
        
        me.keyMap = new Ext.util.KeyMap(Ext.apply({
            target: me.el
        }, params));
    },
    
    ariaGetRenderAttributes: function() {
        var me = this,
            attrs;
        
        attrs = me.callParent(arguments);

        if (me.tooltip && me.tooltipType === 'qtip') {
            attrs['aria-label'] = me.tooltip;
        }

        return attrs;
    },
    
    ariaGetFocusCls: function() {
        return this.ariaFocusCls;
    }
});
