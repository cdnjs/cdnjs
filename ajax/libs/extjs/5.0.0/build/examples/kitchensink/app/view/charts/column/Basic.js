/**
 * The Basic Column Chart displays a set of random data in a column series. The "Reload Data"
 * button will randomly generate a new set of data in the store.
 *
 * Tapping or hovering a column will highlight it.
 */
Ext.define('KitchenSink.view.charts.column.Basic', {
    extend: 'Ext.Panel',
    xtype: 'column-basic',

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',

    layout: 'fit',
    // </example>

    width: 650,
    height: 500,

    initComponent: function () {
        var me = this;

        me.items = {
            xtype: 'cartesian',
            store: {
                type: 'climate'
            },
            insetPadding: {
                top: 40,
                bottom: 40,
                left: 20,
                right: 40
            },
            interactions: 'itemhighlight',
            axes: [{
                type: 'numeric',
                position: 'left',
                titleMargin: 20,
                title: {
                    text: 'Temperature in °C',
                    fontSize: 14
                },
                listeners: {
                    rangechange: function (range) {
                        var store = this.getChart().getStore(),
                            min = Infinity,
                            max = -Infinity,
                            value;

                        store.each(function (rec) {
                            var value = rec.get('high');
                            if (value > max) {
                                max = value;
                            }
                            if (value < min) {
                                min = value;
                            }
                        });

                        value = (min + max) / 2;
                        this.setLimits({
                            value: value,
                            line: {
                                title: {
                                    text: 'Average high: ' + (value * 1.8 + 32).toFixed(2) +'°F'
                                },
                                lineDash: [2,2]
                            }
                        });
                    }
                }
            }, {
                type: 'category',
                position: 'bottom'
            }],
            animation: Ext.isIE8 ? false : {
                easing: 'bounceOut',
                duration: 500
            },
            series: {
                type: 'bar',
                axis: 'left',
                xField: 'month',
                yField: 'high',
                style: {
                    minGapWidth: 20
                },
                highlight: {
                    strokeStyle: 'black',
                    fillStyle: '#c1e30d',
                    lineDash: [5, 3]
                },
                label: {
                    field: 'high',
                    display: 'insideEnd',
                    renderer: function (value) {
                        return value.toFixed(1);
                    }
                }
            },
            sprites: {
                type: 'text',
                text: 'Redwood City Climate Data',
                font: '22px Helvetica',
                width: 100,
                height: 30,
                x: 40, // the sprite x position
                y: 20  // the sprite y position
            }
        };
        //<example>
        me.tbar = [
            '->',
            {
                text: 'Download',
                handler: function() {
                    me.down('cartesian').download({
                        filename: 'Redwood City Climate Data Chart'
                    });
                }
            },
            {
                text: 'Reload Data',
                handler: function() {
                    me.down('cartesian').getStore().refreshData();
                }
            }
        ];
        //</example>

        this.callParent();
    }
});
