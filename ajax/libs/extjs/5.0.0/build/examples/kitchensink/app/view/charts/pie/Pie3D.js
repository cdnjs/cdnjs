/**
 * This example shows how to create a 3D Pie chart.
 *
 * The example makes use of the 'rotate' interaction. To use it, click or tap and then
 * drag anywhere on the chart.
 */
Ext.define('KitchenSink.view.charts.pie.Pie3D', {
    extend: 'Ext.Panel',
    xtype: 'pie-3d',

    requires: [
        'Ext.chart.PolarChart'
    ],

    layout: 'fit',

    width: 650,

    tbar: [
        '->',
        {
            text: 'Refresh',
            handler: function () {
                var chart = this.up('panel').down('polar'),
                    store = chart.getStore();
                chart.setAnimation({
                    duration: 500,
                    easing: 'easeInOut'
                });
                store.refreshData();
            }
        },
        {
            text: 'Switch Theme',
            handler: function () {
                var panel = this.ownerCt.ownerCt,
                    chart = Ext.ComponentQuery.query('polar', panel)[0],
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
        xtype: 'polar',
        width: '100%',
        height: 500,
        store: {
            type: 'pie'
        },
        id: 'pie-chart-3d',
        theme: 'Category1',
        background: 'white',
        interactions: 'rotatePie3d',
        animation: {
            duration: 500,
            easing: 'easeIn'
        },
        series: [
            {
                type: 'pie3d',
                field: 'g1',
                donut: 30,
                distortion: 0.6,
                style: {
                    strokeStyle: 'white',
                    opacity: 0.90
                }
            }
        ]
    }]
});
