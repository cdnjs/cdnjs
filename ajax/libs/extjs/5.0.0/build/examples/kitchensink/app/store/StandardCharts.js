Ext.define('KitchenSink.store.StandardCharts', {
    extend: 'Ext.data.Store',
    model: 'KitchenSink.model.StandardChart',

    storeId: 'StandardCharts',

    generateData: function (n, floor) {
        var data = [],
                p = (Math.random() *  11) + 1,
                i;

        floor = (!floor && floor !== 0)? 20 : floor;

        for (i = 0; i < (n || 12); i++) {
            data.push({
                name: Ext.Date.monthNames[i % 12],
                data1: Math.floor(Math.max((Math.random() * 100), floor)),
                data2: Math.floor(Math.max((Math.random() * 100), floor)),
                data3: Math.floor(Math.max((Math.random() * 100), floor)),
                data4: Math.floor(Math.max((Math.random() * 100), floor)),
                data5: Math.floor(Math.max((Math.random() * 100), floor)),
                data6: Math.floor(Math.max((Math.random() * 100), floor)),
                data7: Math.floor(Math.max((Math.random() * 100), floor)),
                data8: Math.floor(Math.max((Math.random() * 100), floor)),
                data9: Math.floor(Math.max((Math.random() * 100), floor))
            });
        }
        return data;
    },

    refreshData: function() {
        this.setData(this.generateData());
    },

    constructor: function(config) {
        config.data = this.generateData();
        this.callParent([config]);
    }

});
