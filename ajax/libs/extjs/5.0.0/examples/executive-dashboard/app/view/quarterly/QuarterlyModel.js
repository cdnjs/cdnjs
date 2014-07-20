Ext.define('ExecDashboard.view.quarterly.QuarterlyModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.quarterly',

    requires: [
        'ExecDashboard.model.StockOHLC'
    ],

    data: {
        // Set by the router
        //company: null

        stockRange: '2Y'
    },

    formulas: {
        stockMeta: function (get) {
            return this.companyData[get('company')];
        }
    },

    stores: {
        stocks: {
            type: 'stockohlc',
            autoLoad: true,
            filters: {
                property: 'company',
                value: '{company}'
            }
        },

        statements: {
            fields: ['name', 'thumb', 'url', 'type'],

            proxy: {
                type: 'ajax',
                url: 'resources/data/dv_data.json',

                reader: {
                    type: 'json'
                }
            },

            autoLoad: true
        }
    },

    companyData: {
        AAPL: {
            symbol: 'AAPL',
            change: "+0.12",
            changePercentage: "+1.29",
            price: '9.38',
            maxMin: '9.39/9.30',
            volume: '154.4 m',
            label: 'APPLE, INC'
        },
        GOOG: {
            symbol: 'GOOG',
            change: "+13.25",
            changePercentage: "+2.40",
            price: '565.95',
            maxMin: '566.00/554.35',
            volume: '171.1 m',
            label: 'GOOGLE, INC'
        }
    }
});
