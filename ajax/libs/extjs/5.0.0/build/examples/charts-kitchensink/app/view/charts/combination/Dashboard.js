Ext.define('ChartsKitchenSink.view.charts.combination.Dashboard', {
    extend: 'Ext.Panel',
    xtype: 'dashboard-chart',
    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.form.field.Number'
    ],

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },

    exampleDescription: [
        'An example of an interactive dashboard showing companies data in a grid. Selecting a row highlights the bar corresponding to that company and updates the form with the company data. Additionally, a radar chart also shows the company information. The form can be updated to see live changes on the dashboard.'
    ],

    themes: {
        classic: {
            percentChangeColumn: {
                width: 75
            }
        },
        neptune: {
            percentChangeColumn: {
                width: 100
            }
        }
    },
    // </example>

    initComponent: function() {
        var me = this;

        function perc(v) {
            return v + '%';
        }

        // Loads fresh records into the radar store based upon the passed company record

        updateRadarChart = function(rec) {
            radarStore.loadData([
                { 'Name': 'Price', 'Data': rec.get('price') },
                { 'Name': 'Revenue %', 'Data': rec.get('revenue') },
                { 'Name': 'Growth %', 'Data': rec.get('growth') },
                { 'Name': 'Product %', 'Data': rec.get('product') },
                { 'Name': 'Market %', 'Data': rec.get('market') }
            ]);
        };

        var form = false,
            selectedRec = false,
            //performs the highlight of an item in the bar series
            highlightCompanyPriceBar = function(storeItem) {
                var name = storeItem.get('company'),
                    series = barChart.series.get(0),
                    i, items, l;

                series.highlight = true;
                series.unHighlightItem();
                series.cleanHighlights();
                for (i = 0, items = series.items, l = items.length; i < l; i++) {
                    if (name == items[i].storeItem.get('company')) {
                        series.highlightItem(items[i]);
                        break;
                    }
                }
                series.highlight = false;
            };

        var myData = [
            ['3M Co'],
            ['American Express'],
            ['AT&T Inc'],
            ['Boeing Co.'],
            ['Caterpillar Inc.'],
            ['Citigroup, Inc.'],
            ['Coca-Cola'],
            ['General Electric'],
            ['General Motors'],
            ['Home Depot'],
            ['Honeywell'],
            ['IBM'],
            ['Intel'],
            ['McDonald\'s'],
            ['Microsoft'],
            ['Pfizer Inc'],
            ['Procter & Gamble'],
            ['Verizon'],
            ['Wal-Mart']
        ];

        for (var i = 0, l = myData.length, rand = Math.random; i < l; i++) {
            var data = myData[i];
            data[1] = Ext.util.Format.number(((rand() * 10000) >> 0) / 100, "0");
            data[2] = ((rand() * 10000) >> 0) / 100;
            data[3] = ((rand() * 10000) >> 0) / 100;
            data[4] = ((rand() * 10000) >> 0) / 100;
            data[5] = ((rand() * 10000) >> 0) / 100;
        }

        //create data store to be shared among the grid and bar series.
        var ds = Ext.create('Ext.data.ArrayStore', {
            fields: [
                {name: 'company' },
                {name: 'price',   type: 'float'},
                {name: 'revenue', type: 'float'},
                {name: 'growth',  type: 'float'},
                {name: 'product', type: 'float'},
                {name: 'market',  type: 'float'}
            ],
            data: myData,
            listeners: {
                beforesort: function() {
                    if (barChart) {
                        var a = barChart.animate;
                        barChart.animate = false;
                        barChart.series.get(0).unHighlightItem();
                        barChart.animate = a;
                    }
                },
                //add listener to (re)select bar item after sorting or refreshing the dataset.
                refresh: {
                    fn: function() {
                        if (selectedRec) {
                            highlightCompanyPriceBar(selectedRec);
                        }
                    },
                    // Jump over the chart's refresh listener
                    delay: 1
                }
            }
        });

        // Radar chart will render information for a selected company in the
        // list. Selection can also be done via clicking on the bars in the series.

        // create radar store.
        var radarStore = Ext.create('Ext.data.JsonStore', {
            fields: ['Name', 'Data'],
            data: [
                { 'Name': 'Price', 'Data': 100 },
                { 'Name': 'Revenue %','Data': 100 },
                { 'Name': 'Growth %', 'Data': 100 },
                { 'Name': 'Product %', 'Data': 100 },
                { 'Name': 'Market %', 'Data': 100 }
            ]
        });

        var radarChart = Ext.create('Ext.chart.PolarChart', {
            margin: '0 0 0 0',
//            insetPadding: 0,
            flex: 1,
            animate: true,
            store: radarStore,
            theme: 'Blue',
            axes: [{
                steps: 5,
                type: 'Radial',
                position: 'radial',
                maximum: 100
            }],
            series: [{
                type: 'radar',
                xField: 'Name',
                yField: 'Data',
                showInLegend: false,
                showMarkers: true,
                markerConfig: {
                    radius: 4,
                    size: 4,
                    fill: 'rgb(69,109,159)'
                },
                style: {
                    fill: 'rgb(194,214,240)',
                    opacity: 0.5,
                    'stroke-width': 0.5
                }
            }]
        });

    //create a grid that will list the dataset items.
    var gridPanel = Ext.create('Ext.grid.Panel', {
        id: 'company-form',
        flex: 6,
        store: ds,
        forceFit: true,
        defaults: {
            sortable: true
        },
        columns: [
            {
                text: 'Company',
                width: 200,
                dataIndex: 'company'
            },
            {
                text: 'Price',
                dataIndex: 'price',
                align: 'right',
                formatter: 'usMoney'
            },
            {
                text: 'Revenue',
                align: 'right',
                dataIndex: 'revenue',
                renderer: perc
            },
            {
                text: 'Growth',
                align: 'right',
                dataIndex: 'growth',
                renderer: perc
            },
            {
                text: 'Product',
                align: 'right',
                dataIndex: 'product',
                renderer: perc
            },
            {
                text: 'Market',
                align: 'right',
                dataIndex: 'market',
                renderer: perc
            }
        ],

        listeners: {
            selectionchange: function(model, records) {
                var fields;
                if (records[0]) {
                    selectedRec = records[0];
                    if (!form) {
                        form = this.up('panel').down('form').getForm();
                        fields = form.getFields();
                        fields.each(function(field){
                            if (field.name != 'company') {
                                field.setDisabled(false);
                            }
                        });
                    } else {
                        fields = form.getFields();
                    }
                    
                    // prevent change events from firing
                    form.suspendEvents();
                    form.loadRecord(selectedRec);
                    this.up('panel').down('fieldset').setTitle(selectedRec.get('company'));
                    form.resumeEvents();
                    highlightCompanyPriceBar(selectedRec);
                }
            }
        }
    });

    //create a bar series to be at the top of the panel.
    var barChart = Ext.create('Ext.chart.CartesianChart', {
        height: 200,
        margin: '0 0 3 0',
        cls: 'x-panel-body-default',
        shadow: true,
        animate: true,
        style:  {
            border: 0
        },
        store: ds,
        axes: [{
            type: 'Numeric',
            position: 'left',
            fields: 'price',
            minimum: 0,
            hidden: true
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['company'],
            label: {
                renderer: function(v) {
                    return Ext.String.ellipsis(v, 15, false);
                },
                font: '11px Arial',
                rotate: {
                    degrees: -45
                }
            }
        }],
        series: [{
            type: 'column',
            axis: 'left',
            style: {
                fill: '#456d9f'
            },
            highlight: {
                fill: '#000',
                'stroke-width': 2,
                stroke: '#fff'
            },
            label: {
                contrast: true,
                display: 'insideEnd',
                field: 'price',
                color: '#000',
                orientation: 'vertical',
                'text-anchor': 'middle'
            },
            listeners: {
                itemmouseup: function(item) {
                     var series = barChart.series.get(0);
                     gridPanel.getSelectionModel().select(Ext.Array.indexOf(series.items, item));
                }
            },
            xField: 'name',
            yField: ['price']
        }]
    });

        me.items = [{
            xtype: 'panel',
            width: '100%',
            height: 740,
            fieldDefaults: {
                labelAlign: 'left',
                msgTarget: 'side'
            },
    
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
        
            items: [
                barChart,
            {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                flex: 3,
                items: [
                    gridPanel,
                {
                    xtype: 'form',
                    flex: 3,
                    layout: {
                        type: 'vbox',
                        align:'stretch'
                    },
                    margin: '0 0 0 5',
                    items: [{
                        margin: '2',
                        xtype: 'fieldset',
                        flex: 1,
                        title: 'No company selected',
                        defaults: {
                            disabled: true,
                            // min/max will be ignored by the text field
                            maxValue: 100,
                            minValue: 0,
                            anchor: '100%',
                            enforceMaxLength: true,
                            maxLength: 5,
                            bubbleEvents: ['change']
                        },
                        defaultType: 'numberfield',
                        items: [{
                            fieldLabel: 'Price',
                            name: 'price'
                        }, {
                            fieldLabel: 'Revenue %',
                            name: 'revenue'
                        }, {
                            fieldLabel: 'Growth %',
                            name: 'growth'
                        }, {
                            fieldLabel: 'Product %',
                            name: 'product'
                        }, {
                            fieldLabel: 'Market %',
                            name: 'market'
                        }]
                    },
                        radarChart
                    ],
                    listeners: {
                        // buffer so we don't refire while the user is still typing
                        buffer: 200,
                        change: function(field, newValue, oldValue, listener) {
                            if (selectedRec && form) {
                                if (newValue > field.maxValue) {
                                    field.setValue(field.maxValue);
                                } else {
                                    if (form.isValid()) {
                                        form.updateRecord(selectedRec);
                                        updateRadarChart(selectedRec);
                                    }
                                }
                            }
                        }
                    }
                }]
            }]
        }];

        this.callParent();
    }
});

