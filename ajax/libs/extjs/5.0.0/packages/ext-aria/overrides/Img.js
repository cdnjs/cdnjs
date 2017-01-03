Ext.define('Ext.aria.Img', {
    override: 'Ext.Img',
    
    getElConfig: function() {
        var me = this,
            config;
        
        config = me.callParent();
        
        // Screen reader software requires images to have tabIndex
        config.tabIndex = -1;
        
        return config;
    },
    
    onRender: function() {
        var me = this;
        
        if (!me.alt) {
            Ext.log.warn('For ARIA compliance, IMG elements SHOULD have an alt attribute');
        }
        
        me.callParent();
    }
});