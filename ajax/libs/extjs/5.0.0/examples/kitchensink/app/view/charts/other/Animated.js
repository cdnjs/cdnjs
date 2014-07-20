/**
 * A chart animation example displaying three sets of random data. Random data is added
 * to the store every 1000ms and a 500ms animation occurs to animate the change visually.
 * The chart scrolls and the bottom axis updates once the line reaches the right side of
 * the chart.
 */
Ext.define('KitchenSink.view.charts.other.Animated', {
    extend: 'Ext.Panel',
    xtype: 'animated-chart',

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },

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
        var me = this,
            chart, timeAxis;

        var generateData = (function() {
            var data = [], i = 0,
            last = false,
            date = new Date(2011, 0, 1),
            seconds = +date,
            min = Math.min,
            max = Math.max,
            random = Math.random;

            return function() {
                data = data.slice(-6);
                data.push({
                    date:  Ext.Date.add(date, Ext.Date.DAY, i++),
                    visits: min(100, max(last? last.visits + (random() - 0.5) * 20 : random() * 100, 0)),
                    views: min(100, max(last? last.views + (random() - 0.5) * 10 : random() * 100, 0)),
                    users: min(100, max(last? last.users + (random() - 0.5) * 20 : random() * 100, 0))
                });
                last = data[data.length -1];
                return data;
            };
        })();

        var store = Ext.create('Ext.data.JsonStore', {
            fields: ['date', 'visits', 'views', 'users'],
            data: generateData()
        });

        me.items = [{
            xtype: 'cartesian',
            id: 'myChartId',
            width: '100%',
            height: 410,
            padding: '40 0 0 0',
            store: store,
            insetPadding: 40,
            sprites: [{
                type  : 'text',
                text  : 'Animated Chart',
                font  : '22px Helvetica',
                width : 100,
                height: 30,
                x : 40, //the sprite x position
                y : 20  //the sprite y position
            }],
            axes: [{
                type: 'Numeric',
                minimum: 0,
                maximum: 100,
                position: 'left',
                fields: ['views', 'visits', 'users'],
                title: 'Number of Hits',
                grid: {
                    odd: {
                        fill: '#dedede',
                        stroke: '#ddd',
                        'stroke-width': 0.5
                    }
                }
            }, {
                type: 'Time',
                position: 'bottom',
                fields: 'date',
                title: 'Day',
                dateFormat: 'M d',
                groupBy: 'year,month,day',
                aggregateOp: 'sum',
                constrain: true,
                fromDate: new Date(2011, 0, 1),
                toDate: new Date(2011, 0, 7),
                grid: true
            }],
            series: [{
                type: 'line',
                xField: 'date',
                yField: 'visits',
                axis: 'left',
                marker: {
                    radius: 4
                },
                style: {
                    lineWidth: 3
                }
            },{
                type: 'line',
                axis: 'left',
                xField: 'date',
                yField: 'views',
                marker: {
                    radius: 4
                },
                style: {
                    lineWidth: 3
                }
            },{
                type: 'line',
                axis: 'left',
                xField: 'date',
                yField: 'users',
                marker: {
                    radius: 4
                },
                style: {
                    lineWidth: 3
                }
            }]
        }];

        this.callParent();
        chart = Ext.getCmp('myChartId'); // this.down('cartesian');

        var addNewData = function() {
            timeAxis = chart.axes.get(1);

            var gs = generateData();
            var toDate = timeAxis.toDate,
                lastDate = gs[gs.length - 1].date,
                markerIndex = chart.markerIndex || 0;
            if (+toDate < +lastDate) {
                markerIndex = 1;
                timeAxis.toDate = lastDate;
                timeAxis.fromDate = Ext.Date.add(Ext.Date.clone(timeAxis.fromDate), Ext.Date.DAY, 1);
                chart.markerIndex = markerIndex;
            }
            store.loadData(gs);
        };

        var task = Ext.TaskManager.start({
                run: addNewData,
                interval: 1000,
                repeat: 45
        });
    }
});
