Ext.define('ExecDashboard.view.profitloss.ProfitLossModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.profitloss',

    requires: [
        'ExecDashboard.model.MetaProfitloss',
        'ExecDashboard.model.FullProfitloss'
    ],

    stores: {
        metaProfitLoss: {
            model: 'ExecDashboard.model.MetaProfitloss',
            autoLoad: true,

            listeners: {
                load: 'onMetaDataLoad'
            },

            proxy: {
                type: 'ajax',
                url: 'resources/data/meta_data.json',

                reader: {
                    type: 'json'
                }
            }
        }
    }
});
