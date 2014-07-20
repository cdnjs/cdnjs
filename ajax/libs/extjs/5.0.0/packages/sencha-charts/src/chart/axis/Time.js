/**
 * @class Ext.chart.axis.Time
 * @extends Ext.chart.axis.Numeric
 *
 * A type of axis whose units are measured in time values. Use this axis
 * for listing dates that you will want to group or dynamically change.
 * If you just want to display dates as categories then use the
 * Category class for axis instead.
 *
 *     @example preview
 *     var chart = new Ext.chart.CartesianChart({
 *         animation: true,
 *         store: {
 *           fields: ['time', 'open', 'high', 'low', 'close'],
 *           data: [
 *             {'time':new Date('Jan 1 2010').getTime(), 'open':600, 'high':614, 'low':578, 'close':590},
 *             {'time':new Date('Jan 2 2010').getTime(), 'open':590, 'high':609, 'low':580, 'close':580},
 *             {'time':new Date('Jan 3 2010').getTime(), 'open':580, 'high':602, 'low':578, 'close':602},
 *             {'time':new Date('Jan 4 2010').getTime(), 'open':602, 'high':614, 'low':586, 'close':586},
 *             {'time':new Date('Jan 5 2010').getTime(), 'open':586, 'high':602, 'low':565, 'close':565}
 *           ]
 *         },
 *         axes: [{
 *             type: 'numeric',
 *             position: 'left',
 *             fields: ['open', 'high', 'low', 'close'],
 *             title: {
 *                 text: 'Sample Values',
 *                 fontSize: 15
 *             },
 *             grid: true,
 *             minimum: 560,
 *             maximum: 640
 *         }, {
 *             type: 'time',
 *             position: 'bottom',
 *             fields: ['time'],
 *             fromDate: new Date('Dec 31 2009'),
 *             toDate: new Date('Jan 6 2010'),
 *             title: {
 *                 text: 'Sample Values',
 *                 fontSize: 15
 *             },
 *             style: {
 *               axisLine: false
 *             }
 *         }],
 *         series: [{
 *             type: 'candlestick',
 *             xField: 'time',
 *             openField: 'open',
 *             highField: 'high',
 *             lowField: 'low',
 *             closeField: 'close',
 *             style: {
 *             ohlcType: 'ohlc',
 *               dropStyle: {
 *                 fill: 'rgb(237, 123, 43)',
 *                 stroke: 'rgb(237, 123, 43)'
 *               },
 *               raiseStyle: {
 *                 fill: 'rgb(55, 153, 19)',
 *                 stroke: 'rgb(55, 153, 19)'
 *               }
 *             },
 *             aggregator: {
 *               strategy: 'time'
 *             }
 *         }]
 *     });
 *     Ext.Viewport.setLayout('fit');
 *     Ext.Viewport.add(chart);
 */
Ext.define('Ext.chart.axis.Time', {
    extend: 'Ext.chart.axis.Numeric',
    alias: 'axis.time',
    type: 'time',
    requires: [
        'Ext.chart.axis.layout.Continuous',
        'Ext.chart.axis.segmenter.Time'
    ],
    config: {
        /**
         * @cfg {Boolean} calculateByLabelSize
         * The minimum value drawn by the axis. If not set explicitly, the axis
         * minimum will be calculated automatically.
         */
        calculateByLabelSize: true,

        /**
         * @cfg {String/Boolean} dateFormat
         * Indicates the format the date will be rendered on.
         * For example: 'M d' will render the dates as 'Jan 30', etc.
         */
        dateFormat: null,

        /**
         * @cfg {Date} fromDate The starting date for the time axis.
         */
        fromDate: null,

        /**
         * @cfg {Date} toDate The ending date for the time axis.
         */
        toDate: null,

        /**
         * @cfg {Array} [step=[Ext.Date.DAY, 1]] An array with two components:
         *
         * - The unit of the step (Ext.Date.DAY, Ext.Date.MONTH, etc).
         * - The number of units for the step (1, 2, etc).
         *
         */
        step: [Ext.Date.DAY, 1],

        layout: 'continuous',

        segmenter: 'time',

        aggregator: 'time'
    },

    updateDateFormat: function (format) {
        this.setRenderer(function (date) {
            return Ext.Date.format(new Date(date), format);
        });
    },

    updateFromDate: function (date) {
        this.setMinimum(+date);
    },

    updateToDate: function (date) {
        this.setMaximum(+date);
    },

    getCoordFor: function (value) {
        if (Ext.isString(value)) {
            value = new Date(value);
        }
        return +value;
    }
});
