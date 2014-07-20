/**
 * This class generates mock stock market data.
 */
Ext.define('Portal.store.Markets', {
    extend: 'Ext.data.Store',

    alias: 'store.markets',

    fields: [
        'name',
        'sp500',
        'djia'
    ],

    constructor: function (config) {
        var data = [{
                name: 0,
                djia: 10000,
                sp500: 1100
            }],
            i;

        for (i = 1; i < 50; i++) {
            data.push({
                name: i,
                sp500: data[i - 1].sp500 + ((Math.floor(Math.random() * 2) % 2) ? -1 : 1) * Math.floor(Math.random() * 7),
                djia: data[i - 1].djia + ((Math.floor(Math.random() * 2) % 2) ? -1 : 1) * Math.floor(Math.random() * 7)
            });
        }

        config.data = data;

        this.callParent([config]);
    }
});
