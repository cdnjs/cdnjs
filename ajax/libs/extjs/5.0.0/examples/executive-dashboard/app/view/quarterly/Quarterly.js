Ext.define('ExecDashboard.view.quarterly.Quarterly', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.quarterly',

    requires: [
        'Ext.chart.axis.Time',
        'Ext.chart.series.CandleStick',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.draw.modifier.Highlight',
        'Ext.chart.axis.Time',
        'Ext.chart.interactions.ItemHighlight',
        'Ext.chart.interactions.PanZoom'
    ],

    itemId: 'quarterly',

    cls: 'quarterly-main',

    config: {
        activeState: null,
        defaultActiveState: 'AAPL'
    },

    controller: 'quarterly',

    viewModel: {
        type: 'quarterly'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    overflowY: 'auto',

    items: [{
        xtype: 'chart',
        cls: 'quarterly-chart',

        width: '100%',
        height: 400,
        insetPadding: '10px 20px 20px 40px',

        interactions: [{
            type: 'panzoom',
            zoomOnPanGesture: false,
            axes: {
                right: {
                    maxZoom: 1
                }
            }
        }],

        animation: false,
        bind: '{stocks}',

        legend: { // null, false, undefined - doesn't work here. ??
            hidden: true
        },

        tbar: {
            defaults: {
                xtype: 'displayfield',
                labelAlign: 'top'
            },

            items: [{
                xtype: 'container',
                cls: 'stock-picker-wrapper',

                layout: {
                    type: 'vbox'
                },

                items:[{
                    xtype: 'cycle',
                    cls: 'quarterly-cycle',
                    showText: true,
                    height: 40,
                    text: 'AAPL',
                    bind: {
                        text: '{stockMeta.symbol}'
                    },
                    textAlign: 'right',
                    width: 150,

                    listeners: {
                        change: 'menuItemClick'
                    },

                    menu: {
                        id: 'quarterly-menu',
                        items: [{
                            text: 'AAPL',
                            checked: true
                        },{
                            text: 'GOOG'
                        }]
                    }
                },{
                    xtype: 'displayfield',
                    cls: 'stock-picker-small',
                    textAlign: 'right',
                    width: 120,
                    bind: {
                        value: '{stockMeta.label}'
                    }
                }]
            },{
                text: '',
                width: 20
            }, {
                fieldLabel: 'CHANGE',
                bind: '{stockMeta.change}<span class="ql-percentage">({stockMeta.changePercentage}%)</span>',
                flex: 1
            },{
                fieldLabel: 'PRICE',
                bind: '{stockMeta.price}',
                flex: 1
            },{
                fieldLabel: 'MAX/MIN',
                bind: '{stockMeta.maxMin}',
                flex: 1
            },{

                fieldLabel: 'VOLUME',
                bind: '{stockMeta.volume}',
                flex: 1
            }]
        },

        axes: [{
            type: 'numeric',
            position: 'right',
            fields: ['open', 'high', 'low', 'close'],
            grid: {
                lineDash: [2,2],
                stroke: '#ccc'
            },
            style: {
              axisLine: false, //no axis
              majorTickSize: 0 //no ticks
            }
        }, {
            type: 'time',
            position: 'bottom',
            fields: ['time'],
            dateFormat: 'M y',
            segmenter: {
                type: 'time',
                step: {
                    unit: Ext.Date.MONTH,
                    step: 4
                }
            },

            grid: {
                lineDash: [2,2],
                stroke: '#ccc'
            },
            style: {
                axisLine: false,
                majorTickSize: 0
            }
        }],

        series: [{
            type: 'candlestick',
            background: 'rgba(220,220,220,0.2)',
            xField: 'time',
            openField: 'open',
            highField: 'high',
            lowField: 'low',
            closeField: 'close',
            style: {
                barWidth: 5,
                dropStyle: {
                    fill: '#22c6ef',
                    stroke: '#22c6ef'
                },
                raiseStyle: {
                    fill: '#f1495b',
                    stroke: '#f1495b'
                }
            }
        }]
    },{
        xtype: 'dataview',
        cls: 'quarterly-dataview',

        bind: '{statements}',

        itemSelector: 'div.thumb-wrap',

        listeners: {
            itemclick: 'onQuarterlyStatementClick'
        },

        tpl: [
            '<tpl for=".">',
                // Break every four quarters
                '<tpl if="xindex % 4 === 1">',
                    '<div class="statement-type">{type}</div>',
                '</tpl>',

                '<div class="thumb-wrap">',
                    '<a class="thumb" href="{url}" target="_blank">',
                        '<div class="thumb-icon"></div>',
                        '<div class="thumb-title-container">',
                            '<div class="thumb-title">{title}</div>',
                            '<div class="thumb-title-small">Uploaded: {uploaded}</div>',
                        '</div>',
                        '<div class="thumb-download"></div>',
                    '</a>',
                '</div>',
            '</tpl>'
        ]
    }],

    validStates: {
        AAPL: 1,
        GOOG: 1
    },

    isValidState: function (state) {
        return state in this.validStates;
    }
});
