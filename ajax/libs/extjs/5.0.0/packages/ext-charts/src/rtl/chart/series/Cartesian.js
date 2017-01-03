Ext.define('Ext.rtl.chart.series.Cartesian', {
    override: 'Ext.chart.series.Cartesian',
    
    initialize: function() {
        var me = this;
        
        me.callParent(arguments);
        me.axis = me.chart.invertPosition(me.axis); 
        if (me.chart.getInherited().rtl) {
            me.reverse = true;
        }
    }
});
