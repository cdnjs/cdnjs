Ext.define('Ext.chart.overrides.AbstractChart', {
    override: 'Ext.chart.AbstractChart',

    updateLegend: function (legend) {
        this.callParent(arguments);
        if (legend) {
            this.add(legend);
        }
    }
});