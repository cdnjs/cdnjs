Ext.define('Ext.rtl.chart.axis.Gauge', {
    override: 'Ext.chart.axis.Gauge',
    
    constructor: function() {
        var me = this;
        
        me.callParent(arguments);
        if (me.chart.getInherited().rtl) {
            me.reverse = true;
        }
    }
});
