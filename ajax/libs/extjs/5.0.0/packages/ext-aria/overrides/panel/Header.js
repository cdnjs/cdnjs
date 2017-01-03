    Ext.define('Ext.aria.panel.Header', {
    override: 'Ext.panel.Header',
    
    requires: [
        'Ext.aria.container.Container'
    ],

    ariaGetFocusItems: function(e) {
        var me = this,
            focusables = [],
            items, i, len, cmp;
        
        items = me.getTools();
        
        for (i = 0, len = items.length; i < len; i++) {
            cmp = items[i];
            
            if (cmp.isFocusable()) {
                focusables.push(cmp);
            }
        }
        
        return focusables;
    }
});
