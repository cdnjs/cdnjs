/**
 * This example shows how to use multiple floating axes in a polar chart. Similar to the
 * Plot Line Chart example, floating axes don\'t have a fixed position, instead they track
 * a specified value on another axis that is running in the opposite direction.
 *
 * The example makes use of the 'rotate' interaction. To use it, click or tap and then
 * drag anywhere on the chart.
 */
Ext.define('KitchenSink.view.charts.radial.MultiAxis', {
    extend: 'Ext.Panel',
    xtype: 'radial-multi-axis',

    // <example>
    // Content between example tags is omitted from code preview.
    layout: 'vbox',
    // </example>

    width: 650,

    initComponent: function() {
        var me = this;

        me.items = {
            xtype: 'polar',
            width: '100%',
            height: 500,
            insetPadding: 20,
            innerPadding: 40,
            store: {type: 'climate'},
            interactions: 'rotate',
            axes: [
                {
                    type: 'category',
                    position: 'angular',
                    id: 'main-angular-axis',
                    grid: true,
                    style: {
                        majorTickSize: 20,
                        strokeStyle: 'rgb(73,112,142)'
                    }
                },
                {
                    type: 'category',
                    position: 'angular',
                    linkedTo: 'main-angular-axis',
                    renderer: function (v) {
                        return v === 'Jan' ? '' : v;
                    },
                    floating: {
                        value: 20,
                        alongAxis: 'radial-axis'
                    }
                },
                {
                    type: 'numeric',
                    id: 'radial-axis',
                    position: 'radial',
                    label: {
                        fontWeight: 'bold'
                    },
                    floating: {
                        value: 'Jan',
                        alongAxis: 'main-angular-axis'
                    }
                }
            ],
            series: [{
                type: 'radar',
                xField: 'month',
                yField: 'high',
                style: {
                    globalAlpha: 0.7
                }
            }]
        };

        me.tbar = [
            '->',
            {
                text: 'Refresh',
                handler: refreshChart
            },
            {
                xtype: 'tbspacer',
                width: 10
            },
            {
                text: 'Preview',
                handler: function() {
                    chart.preview();
                }
            }
        ];

        function refreshChart() {
            chart.getStore().refreshData();
        }

        me.callParent();

        var chart = me.down('polar');
    }
});
