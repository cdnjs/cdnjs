Ext.define("KitchenSink.store.StockPrice", {
    extend: 'Ext.data.Store',
    model: 'KitchenSink.model.StockPrice',
    alias: 'store.stock-price',

    data: [],

    seed: 1.4,

    generateData: function (count) {
        var me = this;
        function random() {
            // Controllable random.
            me.seed *= 42.7;
            me.seed -= Math.floor(me.seed);
            return me.seed * 2 - 1;
        }

        var data = [], i, record = {
            time: new Date('Jan 1 2010').getTime(),
            close: 600
        };
        for (i = 0; i < (count || 1000); i++) {
            var ohlc = [random() * 25, random() * 25, random() * 25];
            record = {
                time: record.time + 3600000,
                open: record.close,
                high: record.close + Math.max.apply(Math, ohlc),
                low: record.close + Math.min.apply(Math, ohlc),
                close: record.close + ohlc[1]
            };
            if (record.open < record.low) {
                record.low = record.open;
            } else if (record.open > record.high) {
                record.high = record.open;
            }
            data.push(record);
        }
        return data;
    },

    refreshData: function () {
        this.setData(this.generateData(1000));
    },

    constructor: function (config) {
        config = Ext.apply({
            data: this.generateData()
        }, config);
        this.callParent([config]);
    }
});