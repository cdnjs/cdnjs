/**
 * This example shows how to create a scatter chart with custom icons.
 */
Ext.define('KitchenSink.view.charts.scatter.CustomIcons', {
    extend: 'Ext.panel.Panel',
    xtype: 'scatter-custom-icons',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.draw.modifier.Highlight',
        'Ext.chart.axis.Time',
        'Ext.chart.interactions.ItemHighlight'
    ],

    layout: 'fit',
    width: 650,

    tbar: [
        '->',
        {
            text: 'Refresh',
            handler: function () {
                var chart = this.up('panel').down('cartesian'),
                    store = chart.getStore();
                store.setData(store.generateData(25));
            }
        },
        {
            text: 'Switch Theme',
            handler: function () {
                var panel = this.ownerCt.ownerCt,
                    chart = Ext.ComponentQuery.query('cartesian', panel)[0],
                    themes = Ext.chart.theme,
                    themeNames = [], name, currentIndex;
                for (name in themes) {
                    if (name != "Theme") {
                        themeNames.push(name);
                    }
                }
                currentIndex = Ext.Array.indexOf(themeNames, chart.getTheme());
                chart.setTheme(themeNames[(currentIndex + 1) % themeNames.length]);
                chart.redraw();
            }
        }
    ],

    items: [{
        xtype: 'cartesian',
        width: '100%',
        height: 500,
        store: {
            type: 'pie'
        },
        theme: 'Category1',
        id: 'scatter-chart-custom-icons',
        background: 'white',
        interactions: 'itemhighlight',
        series: [
            {
                type: 'scatter',
                xField: 'id',
                yField: 'g1',
                highlight: true,
                marker: {
                    type: 'path',
                    path: [
                        ['M' , 0, 1],
                        ['L', 1, 0],
                        ['L', 0, -1],
                        ['L', -1, 0],
                        ['Z']
                    ],
                    scale: 10,
                    lineWidth: 2
                }
            },
            {
                type: 'scatter',
                xField: 'id',
                yField: 'g2',
                highlight: true,
                marker: {
                    type: 'path',
                    path: [
                        ['M',0,-145],
                        ['L',48,-50],
                        ['L',153,-36],
                        ['L',76,39],
                        ['L',93,143],
                        ['L',0,95],
                        ['L',-93,143],
                        ['L',-76,39],
                        ['L',-153,-36],
                        ['L',-48,-50],
                        ['Z']
                    ],
                    scalingX: 0.1,
                    scalingY: -0.1
                }
            }
        ],
        axes: [
            {
                type: 'numeric',
                position: 'left',
                fields: ['g1', 'g2', 'g3', 'g4'],
                minimum: 0,
                label: {
                    rotate: {
                        degrees: -30
                    }
                }
            },
            {
                type: 'category',
                position: 'bottom',
                fields: 'id'
            }
        ]
    }],
    
    initComponent: function () {
        this.callParent();
        var store = this.down('cartesian').getStore();
        store.setData(store.generateData(25));
    }
});
