Ext.define('PageAnalyzer.Summary', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.chart.*',
        'Ext.grid.Panel',
        'Ext.grid.feature.Grouping',

        'Ext.layout.container.Border',

        'PageAnalyzer.models.LayoutTypeSummaryData',
        'PageAnalyzer.models.LayoutIdSummaryData',
        'Ext.tab.Panel'
    ],

    layout: 'fit',
    border: false,

    toolTipTpl: [
        'layout type: {type}<br/>',
        'total time: {duration}<br/>',
        'calls: {count}<br/>',
        'avg. time: {[Math.round((values.duration / values.count) * 100) / 100]}<br/>',
        'instances: {layoutCount}'
    ],

    initComponent: function () {
        var me = this;

        me.typeDurationStore = Ext.create('Ext.data.Store', {
            model: 'PageAnalyzer.models.LayoutTypeSummaryData',
            sorters: { property: 'type', direction: 'DESC' }
        });

        me.items = [{
            xtype: 'tabpanel',
            deferredRender: false,
            items:[
                me.makeTypeTimeSummaryChart({}),
                me.makeTypeCountSummaryChart({})
            ]
        }];

        me.callParent();
    },

    makeTypeTimeSummaryChart: function(cfg) {
        var me = this,
            toolTipTpl = me.getTpl('toolTipTpl');

        return Ext.apply({
            xtype: 'chart',
            store: me.typeDurationStore,
            itemId: 'durationsByTypeChart',
            title: 'Time By Layout Type',
            theme: 'Base:gradients',
            hideMode: 'offsets',
            axes: [{
                type: 'Numeric',
                title: 'Time (ms)',
                position: 'left',
                fields: ['duration'],
                grid: true
            },{
                type: 'Category',
                position: 'bottom',
                fields: ['type'],
                title: 'Layout Type',
                label:{
                    'text-anchor': 'middle',
                    rotate: {
                        degrees: -35
                    },
                    translate: {
                        x: 10,
                        y: 0
                    }
                }
            }],
            series: [{
                type: 'column',
                axis: 'left',
                label: {
                    field: 'type',
                    font: '12px Arial'
                },
                tips: {
                    trackMouse: true,
                    tpl: toolTipTpl,
                    renderer: function(storeItem, item) {
                        this.update(storeItem.data);
                    }
                },
                xField: 'type',
                yField: 'duration'
            }]
        }, cfg);
    },

    makeTypeCountSummaryChart: function(cfg) {
        var me = this,
            toolTipTpl = me.getTpl('toolTipTpl');

        return Ext.apply({
            xtype: 'chart',
            store: me.typeDurationStore,
            itemId: 'countsByTypeChart',
            title: 'Calls by Layout Type',
            theme: 'Base:gradients',
            hideMode: 'offsets',
            axes: [{
                type: 'Numeric',
                title: 'Total Calls',
                position: 'left',
                fields: ['count'],
                grid: true
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['type'],
                title: 'Layout Type',
                label:{
                    'text-anchor': 'middle',
                    rotate: {
                        degrees: -35
                    },
                    translate: {
                        x: 10,
                        y: 0
                    }
                }
            }],
            series: [{
                type: 'column',
                axis: 'left',
                label: {
                    field: 'type',
                    font: '12px Arial'
                },
                tips: {
                    trackMouse: true,
                    tpl: toolTipTpl,
                    renderer: function(storeItem, item) {
                        this.update(storeItem.data);
                    }

                },
                xField: 'type',
                yField: 'count'
            }]
        }, cfg);
    },

    loadTypeSummary: function (summary) {
        var me = this,
            data = [];

        Ext.Object.each(summary, function (type, sum){
            data.push({
                type: type,
                duration: sum.duration,
                count: sum.count,
                layoutCount: sum.layoutCount
            });
        });

        me.typeDurationStore.removeAll();
        me.typeDurationStore.loadData(data);
        me.typeDurationStore.sort();
    }

});