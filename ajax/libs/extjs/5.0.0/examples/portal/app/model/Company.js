Ext.define('Portal.model.Company', {
    extend: 'Ext.data.Model',
    fields: [
       { name: 'name' },
       { name: 'price', type: 'float' },
       { name: 'change', type: 'float' },
       { name: 'pctChange', type: 'float' },
       { name: 'lastChange', type: 'date',  dateFormat: 'n/j h:ia' },
       { name: 'trend' },
       // Rating dependent upon performance 0 = best, 2 = worst
       {
           name: 'rating',
           type: 'int',
           calculate: function(data) {
               var pct = data.pctChange;
               return (pct < 0) ? 2 : ((pct < 1) ? 1 : 0);
           }
        }
    ],

    constructor: function () {
        this.callParent(arguments);

        var data = this.data,
            price = data.price,
            length;

        data.trend = [price];
        do {
            length = data.trend.length;
            data.trend = this.addToTrend(this.generatePriceTick(data.trend[length-1]));
        } while (data.trend.length !== length);

        this.addToTrend(price);
    },

    addPriceTick: function () {
        var me = this,
            oldPrice = me.get('price'),
            newPrice = me.generatePriceTick(oldPrice),
            change = (newPrice - oldPrice);

        // Set data, but pass "clean" flag.
        me.set({
            price: newPrice,
            change: change,
            pctChange: (change / oldPrice) * 100,
            lastChange: new Date()
        }, {
            dirty: false
        });
    },

    generatePriceTick: function (oldPrice) {
        var change = Ext.Number.randomInt(-2345, 2345) / 100,
            newPrice = oldPrice + change;

        // Keep data sane when using random price fluctuations
        if (newPrice < 0) {
            newPrice = -newPrice;
        }

        return Math.round(newPrice * 100) / 100;
    },

    // Override to keep the last 10 prices in the trend field
    set: function(fieldName, value) {
        if (fieldName === 'price') {
            return this.callParent([{
                price: value,
                trend: this.addToTrend(fieldName.price)
            }]);
        }
        else {
            if (typeof fieldName !== 'string' && 'price' in fieldName) {
                fieldName.trend = this.addToTrend(fieldName.price);
            }
            return this.callParent(arguments);
        }
    },

    // Override to keep the last 10 prices in the trend field
    addToTrend: function(value) {
        var trend = this.data.trend.concat(value);

        if (trend.length > 10) {
            Ext.Array.splice(trend, 0, trend.length - 10);
        }
        return trend;
    }
});
