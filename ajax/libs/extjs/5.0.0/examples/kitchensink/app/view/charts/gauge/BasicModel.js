Ext.define('KitchenSink.view.charts.gauge.BasicModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.gauge-basic',
    stores: {
        vehicle: {
            type: 'gauges'
        }
    }
});