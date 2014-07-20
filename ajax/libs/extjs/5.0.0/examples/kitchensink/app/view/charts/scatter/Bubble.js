(function () {
    /**
     * Demonstrates how to make a bubble chart using Ext.chart.series.Scatter
     *
     * Bubble charts, similarly to Line charts, allow to visualize the evolution of a
     * parameter over time or the ratio between any two parameters, but in addition they
     * can also display intrinsic values of these parameters by assigning them to the
     * diameter or the color of the bubbles.
     */
    Ext.define('KitchenSink.view.charts.scatter.Bubble', {
        extend: 'Ext.Panel',
        xtype: 'scatter-bubble',

        requires: [
            'Ext.draw.Color',
            'Ext.chart.CartesianChart',
            'Ext.chart.series.Scatter',
            'Ext.chart.axis.Numeric',
            'Ext.chart.interactions.*'
        ],

        layout: 'fit',

        width: 650,

        tbar: [
            '->',
            {
                text: 'Refresh',
                handler: function () {
                    var chart = this.up('panel').down('cartesian'),
                        leftAxis = chart.getAxes()[0],
                        store = chart.getStore();
                    chart.setAnimation(true);
                    // we want the maximum to be derived from the store (series data)
                    leftAxis.setMaximum(NaN);
                    fromHSL = Ext.draw.Color.fly('blue').getHSL();
                    store.setData(createData(50));
                }
            },
            {
                text: 'Drop all bubbles',
                handler: function () {
                    var chart = this.up('panel').down('cartesian'),
                        store = chart.getStore(),
                        leftAxis = chart.getAxes()[0];
                    chart.setAnimation({
                        easing: 'bounceOut',
                        duration: 1000
                    });
                    fromHSL = Ext.draw.Color.fly('cyan').getHSL();
                    // fix the maximum for a nice bubble drop animation
                    leftAxis.setMaximum(leftAxis.getRange()[1]);
                    store.setData(createData(50, true));
                }
            }
        ],

        items: [{
            xtype: 'cartesian',
            width: '100%',
            height: 500,
            id: 'bubble-chart',
            store: {
                fields: [ 'id', 'g1', 'g2', 'g3', 'g4', 'g5' ]
            },
            background: '#242021',
            insetPadding: 20,
            interactions: ['panzoom', 'itemhighlight'],
            series: {
                type: 'scatter',
                xField: 'id',
                yField: 'g2',
                highlightCfg: {
                    scale: 1.3
                },
                marker: {
                    type: 'circle',
                    radius: 5,
                    fillStyle: 'rgb(203,143,203)',
                    miterLimit: 1,
                    lineCap: 'butt',
                    lineWidth: 1,
                    fx: {
                        duration: 200
                    }
                },
                style: {
                    renderer: function (sprite, config, rendererData, index) {
                        var store = rendererData.store,
                            storeItem = store.getData().items[index];
                        config.radius = interpolate(storeItem.data.g3, 0, 1000, 5, 30);
                        config.fillOpacity = interpolate(storeItem.data.g3, 0, 1000, 1, 0.7);
                        config.fill = interpolateColor(storeItem.data.g3, 0, 1000);
                        config.stroke = config.fill;
                        config.lineWidth = 3;
                    }
                }
            },
            axes: [{
                type: 'numeric',
                position: 'left',
                fields: ['g2'],
                minimum: 0,
                style: {
                    majorTickSize: 10,
                    lineWidth: 3,
                    stroke: '#888',
                    estStepSize: 50
                },
                label: {
                    color: '#888',
                    fontFamily: 'Chalkboard, sans-serif',
                    fontSize: 20
                },
                grid: {
                    stroke: '#444',
                    odd: {
                        fill: '#333'
                    }
                }
            }, {
                type: 'numeric',
                position: 'bottom',
                fields: ['id'],
                minimum: 0,
                maximum: 50,
                style: {
                    majorTickSize: 10,
                    lineWidth: 3,
                    stroke: '#888',
                    estStepSize: 100
                },
                label: {
                    color: '#888',
                    fontFamily: 'Chalkboard, sans-serif',
                    fontSize: 20
                },
                grid: {
                    stroke: '#444'
                }
            }]
        }],

        constructor: function(config) {
            this.callParent(arguments);
            this.down('cartesian').getStore().setData(createData(50));

            fromHSL = Ext.draw.Color.fly('blue').getHSL();
            toHSL = Ext.draw.Color.fly('red').getHSL();
            fromHSL[2] = 0.3;
        }
    });

    var fromHSL, toHSL, seed = 1.3;

    // Controllable random.
    function random() {
        seed *= 7.3;
        seed -= Math.floor(seed);
        return seed;
    }

    function createData(count, allNull) {
        var data = [],
            record = allNull ?
            {
                'id': 0,
                'g0': 0,
                'g1': 0,
                'g2': 0,
                'g3': 0,
                'name': 'Item-0'
            } : {
                'id': 0,
                'g0': 300,
                'g1': 700 * random() + 100,
                'g2': 700 * random() + 100,
                'g3': 700 * random() + 100,
                'name': 'Item-0'
            },
            i;

        data.push(record);
        for (i = 1; i < count; i++) {
            record = allNull ?
            {
                'id': i,
                'g0': 0,
                'g1': 0,
                'g2': 0,
                'g3': 0
            } : {
                'id': i,
                'g0': record.g0 + 30 * random(),
                'g1': Math.abs(record.g1 + 300 * random() - 140),
                'g2': Math.abs(record.g2 + 300 * random() - 140),
                'g3': Math.abs(record.g3 + 300 * random() - 140)
            };
            data.push(record);
        }
        return data;
    }

    function interpolate(lambda, minSrc, maxSrc, minDst, maxDst) {
        return minDst + (maxDst - minDst) * Math.max(0, Math.min(1, (lambda - minSrc) / (maxSrc - minSrc)));
    }

    function interpolateColor(lambda, minSrc, maxSrc) {
        return Ext.draw.Color.fly(0, 0, 0, 0).setHSL(
            interpolate(lambda, minSrc, maxSrc, fromHSL[0], toHSL[0]),
            interpolate(lambda, minSrc, maxSrc, fromHSL[1], toHSL[1]),
            interpolate(lambda, minSrc, maxSrc, fromHSL[2], toHSL[2])
        ).toString();
    }
})();
