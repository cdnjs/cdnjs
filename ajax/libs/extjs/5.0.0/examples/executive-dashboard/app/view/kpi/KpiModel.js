Ext.define('ExecDashboard.view.kpi.KpiModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.kpi',

    requires: [
        'ExecDashboard.model.Kpi',
        'ExecDashboard.store.Kpi'
    ],

    data: {
        // This property is placed in the ViewModel by routing
        // kpiCategory: null
    },

    stores: {
        kpiMain: {
            type: 'kpi',
            autoLoad: true,
            filters: {
                property: 'category',
                value: '{kpiCategory}'
            }
        }
    }
});
