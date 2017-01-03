Ext.define('ExecDashboard.model.StockOHLC', {
    extend: 'ExecDashboard.model.Base',

    fields: [
        'company',
        'time',
        'open',
        'high',
        'low',
        'close'
    ]
});
