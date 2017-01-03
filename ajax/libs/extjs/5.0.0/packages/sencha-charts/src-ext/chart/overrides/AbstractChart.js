/**
 * @class Ext.chart.overrides.AbstractChart
 */
Ext.define('Ext.chart.overrides.AbstractChart', {
    override: 'Ext.chart.AbstractChart',

    updateLegend: function (legend, oldLegend) {
        var dock;
        this.callParent(arguments);
        if (legend) {
            dock = legend.docked;
            this.addDocked({
                dock: dock,
                xtype: 'panel',
                shrinkWrap: true,
                autoScroll: true,
                layout: {
                    type: dock === 'top' || dock === 'bottom' ? 'hbox' : 'vbox',
                    pack: 'center'
                },
                items: legend,
                cls: Ext.baseCSSPrefix + 'legend-panel'
            });
        }
    }
});