Ext.define('Ext.rtl.event.Event', {
    override: 'Ext.event.Event',
    
    getXY: function() {
        var me = this,
            xy = me.xy;

        if (!xy) {
            xy = me.callParent();
            if (Ext.rootInheritedState.rtl) {
                xy[0] = Ext.Element.getViewportWidth() - xy[0];
            }
        }
        return xy;
    }

});
