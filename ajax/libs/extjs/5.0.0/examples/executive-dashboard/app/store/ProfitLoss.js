Ext.define('ExecDashboard.store.ProfitLoss', {
    extend: 'Ext.data.Store',
    alias: 'store.profitloss',

    model: 'ExecDashboard.model.FullProfitloss',

    proxy: {
        type: 'ajax',
        url: 'resources/data/full_data.json',
        reader: 'json'
    }
});
