Ext.define('Ext.rtl.chart.axis.Axis', {
    override: 'Ext.chart.axis.Axis',
    
    constructor: function() {
        var me = this,
            pos;
        
        me.callParent(arguments);
        pos = me.position;
        if (me.chart.getInherited().rtl && (pos == 'top' || pos == 'bottom')) {
            me.reverse = true;
        }
    }
});
