/**
 * @class Ext.chart.Legend
 */
Ext.define('Ext.chart.Legend', {
    xtype: 'legend',
    extend: 'Ext.chart.LegendBase',
    config: {
        baseCls: 'x-legend',
        padding: 5,

        /**
         * @cfg {Array}
         * The rect of the legend related to its container.
         */
        rect: null,

        disableSelection: true,

        toggleable: true
    },

    toggleItem: function (index) {
        if (this.getToggleable()) {
            var store = this.getStore(),
                record = store && store.getAt(index);
            record.beginEdit();
            record.set('disabled', !record.get('disabled'));
            record.endEdit();
            record.commit();
        }
    }

});
