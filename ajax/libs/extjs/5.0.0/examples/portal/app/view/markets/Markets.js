Ext.define('Portal.view.markets.Markets', {
    extend: 'Ext.panel.Panel',

    xtype: 'markets',

    requires: [
        'Ext.data.JsonStore',
        'Ext.chart.theme.Base',
        'Ext.chart.series.Series',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric'
    ],

    layout: 'fit',
    height: 300,
    items: Ext.supports.Canvas ? {
        xtype: 'chart',
        animate: false,
        shadow: false,
        store: {
            type: 'markets'
        },
//        legend: {
//            position: 'bottom'
//        },
        axes: [{
            type: 'numeric',
            position: 'left',
            fields: ['djia'],
            title: 'Dow Jones Average',
            label: {
                font: '11px Arial'
            }
        }, {
            type: 'numeric',
            position: 'right',
            grid: false,
            fields: ['sp500'],
            title: 'S&P 500',
            label: {
                font: '11px Arial'
            }
        }],
        series: [{
            type: 'line',
            lineWidth: 1,
            showMarkers: false,
            fill: true,
            axis: 'left',
            xField: 'name',
            yField: 'djia',
            style: {
                'stroke-width': 1,
                stroke: 'rgb(148, 174, 10)'
            }
        }, {
            type: 'line',
            lineWidth: 1,
            showMarkers: false,
            axis: 'right',
            xField: 'name',
            yField: 'sp500',
            style: {
                'stroke-width': 1,
                 stroke: 'rgb(17, 95, 166)'
            }
        }]
    } :
    {
       xtype : 'component',
       padding : '5',
       html  : 'Advanced charting on this browser is not currently supported in this release.'
    }
});
