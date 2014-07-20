Ext.define('Ext.rtl.chart.series.Gauge', {
    override: 'Ext.chart.series.Gauge',
    
    initialize: function() {
        var me = this;
        
        me.callParent(arguments);
        if (me.chart.getInherited().rtl) {
            me.reverse = true;
        }
    }
});
