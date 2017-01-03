Ext.define('Ext.aria.container.Viewport', {
    override: 'Ext.container.Viewport',
    
    requires: [
        'Ext.aria.container.Container'
    ],
    
    ariaRole: 'application',
    
    ariaFocusCls: Ext.baseCSSPrefix + 'aria-viewport-focus',
    ariaFocusableContainerCls: Ext.baseCSSPrefix + 'aria-viewport',
    
    initComponent: function() {
        var me = this,
            items = me.items,
            layout = me.layout,
            i, len, item, el;
        
        if (items && layout === 'border' || (Ext.isObject(layout) && layout.type === 'border')) {
            for (i = 0, len = items.length; i < len; i++) {
                item = items[i];
                
                if (item.region) {
                    Ext.applyIf(item, {
                        ariaRole: 'region',
                        headerRole: 'heading'
                    });
                }
            }
        }
        
        me.callParent();
    },
    
    onBoxReady: function() {
        this.callParent();
        
        Ext.FocusManager.initViewport();
    },
    
    ariaGetAfterRenderAttributes: function() {
        var attrs = this.callParent();
        
        // Viewport's role attribute is applied to the element that is never rendered,
        // so we have to do it post factum
        attrs.role = this.ariaRole;
        
        // Viewport should not have a label, document title should be announced instead
        delete attrs['aria-label'];
        delete attrs['aria-labelledby'];
        
        return attrs;
    }
});
