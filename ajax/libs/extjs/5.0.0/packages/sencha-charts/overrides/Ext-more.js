// @require Ext.chart.series.ItemPublisher

if(Ext.defaultSetupConfig && Ext.defaultSetupConfig.eventPublishers) {
    Ext.defaultSetupConfig.eventPublishers.seriesItemEvents = {
        xclass: 'Ext.chart.series.ItemPublisher'
    };
}
