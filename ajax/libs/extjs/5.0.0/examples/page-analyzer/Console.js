Ext.define('PageAnalyzer.Console', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.chart.*',
        'Ext.grid.Panel',
        'Ext.grid.feature.Grouping',

        'Ext.layout.container.Border',

        'PageAnalyzer.models.BasicTimeData'
    ],

    layout: 'border',
    border: false,

    initComponent: function () {
        var me = this;

        me.pathTpl = new Ext.XTemplate('{test} ({env} - {build})');
        me.samples = [];

        me.store = Ext.create('Ext.data.Store', {
            model: 'PageAnalyzer.models.BasicTimeData',
            sorters: [{ property: 'avgTime', direction: 'DESC' }],
            groupField: 'path'
        });

        me.detailStore = Ext.create('Ext.data.Store', {
            model: 'PageAnalyzer.models.BasicTimeData',
            sorters: { property: 'avgTime', direction: 'DESC' }
        });

        me.singleSampleStore = Ext.create('Ext.data.Store', {
            model: 'PageAnalyzer.models.BasicTimeData'
        });

        me.items = [
            {
                region: 'north',
                title: 'Trend',
                itemId: 'trendPanel',
                layout: 'fit',
                split: true,
                collapsible: true,
                collapsed: false,
                flex: 4,
                items: []
            },
            {
                region: 'center',
                title: 'Data',
                flex: 4,
                layout: 'border',
                border: false,
                items: [
                    {
                        region: 'center',
                        xtype: 'tabpanel',
                        tabPosition: 'bottom',
                        flex: 5,
                        items: [
                            me.makeDataGrid({
                                title: 'Grid',
                                border: false
                            }),
                            {
                                region: 'east',
                                title: 'Raw',
                                layout: 'fit',
                                border: false,
                                tbar: [
                                    {
                                        text: 'Load',
                                        handler: me.onUpdateFromRawData,
                                        scope: me
                                    }
                                ],
                                items: [
                                    {
                                        xtype: 'textarea',
                                        style: 'margin:0',
                                        itemId: 'rawData',
                                        emptyText: 'Raw data goes here...',
                                        selectOnFocus: true
                                    }
                                ]
                            },
                            {
                                title: 'Accumulators',
                                xtype: 'textarea',
                                style: 'margin:0',
                                itemId: 'accumulatorCfg'
                            }
                        ]
                    },
                    me.makeDetailsChart({ region: 'east' })
                ]
            }
        ];

        me.callParent();
    },

    addSample: function (perfData) {
        var me = this,
            last = perfData;

        if (Ext.isArray(perfData)) {
            me.samples.push.apply(me.samples, perfData);
            last = last[last.length-1];
        } else {
            // perfData = { env: '..', test: '..', build: '..', data: Ext.Perf.getData() }
            me.samples.push(perfData);
        }

        me.update();
        var rec = me.store.findRecord('path', me.makePath(last));
        me.select(rec);
    },

    clearSamples: function() {
        var me = this;
        me.samples.length = 0;
        me.update();
    },

    makeDataGrid: function (config) {
        var me = this;

        return Ext.apply({
            xtype: 'grid',
            store: me.store,
            itemId: 'dataGrid',
            flex: 5,
            features: [
                {
                    ftype:'grouping',
                    hideGroupedHeader: true
                }
            ],
            columns: [
                { text: 'Environment', dataIndex: 'environment', hidden: true },
                { text: 'Build', dataIndex: 'build', hidden: true },
                { text: 'Test', dataIndex: 'test', hidden: true },
                { text: 'Path', dataIndex: 'path', sortable: true },
                { text: 'Name', dataIndex: 'measure', sortable: true },
                { text: 'Time', dataIndex: 'avgTime', sortable: true },
                { text: 'Time/Call', dataIndex: 'avgTimePerCall', sortable: true },
                { text: 'Samples', dataIndex: 'numSamples', sortable: true },
                { text: 'Min Calls', dataIndex: 'minCalls', sortable: true },
                { text: 'Max Calls', dataIndex: 'maxCalls', sortable: true }
            ],
            listeners: {
                selectionchange: function (model, selection) {
                    me.onSelect(selection[0]);
                }
            }
        }, config);
    },

    makePath: function (perfData) {
        return this.pathTpl.apply(perfData);
    },

    makeDetailsChart: function (config) {
        var me = this;

        return Ext.apply({
            xtype: 'panel',
            title: 'Details',
            layout: 'fit',
            flex: 3,
            split: true,
            collapsible: true,
            preventHeader: true,
            items: [{
                xtype: 'chart',
                store: me.detailStore,
                itemId: 'measuresPieChart',
                theme: 'Base:gradients',
                series: [{
                    type: 'pie',
                    field: 'avgTime',
                    label: {
                        field: 'measure',
                        display: 'rotate',
                        font: '12px Arial'
                    }
                }]
            }]
        }, config);
    },

    makeTrendChart: function () {
        var me = this,
            panel = me.down('#trendPanel'),
            builds = {},
            trendData = [],
            fields = [],
            measures = {},
            measureNames = [],
            modelName,
            chart;

        panel.removeAll();

        chart = {
            xtype: 'chart',
            style: 'background:#fff',
            animate: false,
            shadow: true,
            flex: 5,
            theme: 'Category1',
            legend: {
                position: 'right'
            },
            axes: [{
                type: 'Numeric',
                minimum: 0,
                position: 'left',
                fields: [],
                title: 'Time (ms)',
                minorTickSteps: 1,
                grid: {
                    odd: {
                        opacity: 1,
                        fill: '#ddd',
                        stroke: '#bbb',
                        'stroke-width': 0.5
                    }
                }
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['build'],
                title: 'Build'
            }],
            series: []
        };

        me.store.each(function (r) {
            var rd = r.data;

            var build = builds[rd.build];
            if (!build) {
                builds[rd.build] = build = { build: rd.build };
                trendData.push(build);
            }

            build[rd.measure] = rd.avgTime;
            if (rd.measure in measures) {
                return;
            }

            fields.push(measures[rd.measure] = { name: rd.measure, type: 'float' });
            measureNames.push(rd.measure);
            chart.series.push({
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                xField: 'build',
                yField: rd.measure,
                markerConfig: {
                    type: 'circle',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0
                }
            });
        });

        chart.axes[0].fields = measureNames;


        measureNames.sort();
        var name = 'Trend_' + measureNames.join('$');
        name = name.replace(/\./g, '_');
        modelName = 'PageAnalyzer.models.' + name;

        var mfields = [{
            name: 'build',
            type: 'int'
        }];

        fields.push({name: 'build', type: 'int'});

        if (!PageAnalyzer.models[name]) {
            Ext.define(modelName, {
                extend: 'Ext.data.Model',
                fields: fields
            });
        }

        chart.store = Ext.create('Ext.data.Store', {
            model: modelName,
            sorters: { property: 'build', direction: 'ASC' }
        });
        if (trendData.length == 1) {
            trendData.unshift({
                build: '0',
                avgTime: null
            });
        }
        chart.store.loadData(trendData);
        chart.store.sort();

        panel.add(chart);
    },

    onSelect: function (rec) {
        var me = this,
            records = [],
            store = me.detailStore;

        if (rec) {
            me.store.each(function (r) {
                if (r.data.path == rec.data.path) {
                    records.push(r.copy());
                }
            });
        }

        store.removeAll();

        if (records.length) {
            store.add(records);
            store.sort();
        }
    },

    onUpdateFromRawData: function () {
        var me = this,
            rawData = me.down('#rawData').getValue();

        me.samples = Ext.decode(rawData);
        me.update();
    },

    select: function (rec) {
        if (rec) {
            var me = this,
                grid = me.down('#dataGrid');

            grid.getSelectionModel().select(rec);
        }
    },

    update: function () {
        var me = this,
            map = {}, // map[env+test+build][measure] = record
            json = Ext.encode(me.samples),
            key,
            measures,
            measure,
            records = [];

        me.down('#rawData').setValue(json);
        me.fireEvent('rawdataupdate', me, json, me.samples);

        Ext.each(me.samples, function (perfData) {
            key = me.makePath(perfData);
            measures = map[key] || (map[key] = {});

            Ext.Object.each(perfData.data, function (name, stats) {
                measure = measures[name];
                if (!measure) {
                    measures[name] = measure = new PageAnalyzer.models.BasicTimeData({
                                environment: perfData.env,
                                build: perfData.build,
                                test: perfData.test,
                                path: key,
                                measure: name
                            });

                }
                records.push(measure);
                measure.addSample(stats.pure.sum, stats.count);
            });
        });

        me.store.removeAll();
        me.store.add(records);
        me.store.sort();
        me.makeTrendChart();
    },

    setAccumulators: function (cfg) {
        var me = this,
            accData = Ext.JSON.encodeValue(cfg, '\n  ');
        me.down('#accumulatorCfg').setValue(accData);
    },

    getAccumulators: function () {
        var me = this,
            accData = me.down('#accumulatorCfg').getValue();
        if(!accData || accData == '')
            return null;
        return Ext.decode(accData, true);
    }
});
