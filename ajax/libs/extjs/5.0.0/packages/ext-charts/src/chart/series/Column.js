/**
 * @class Ext.chart.series.Column
 *
 * Creates a Column Chart. Much of the methods are inherited from Bar. A Column Chart is a useful
 * visualization technique to display quantitative information for different categories that can
 * show some progression (or regression) in the data set. As with all other series, the Column Series
 * must be appended in the *series* Chart array configuration. See the Chart documentation for more
 * information. A typical configuration object for the column series could be:
 *
 *     @example
 *     var store = Ext.create('Ext.data.JsonStore', {
 *         fields: ['name', 'data'],
 *         data: [
 *             { 'name': 'metric one',   'data':10 },
 *             { 'name': 'metric two',   'data': 7 },
 *             { 'name': 'metric three', 'data': 5 },
 *             { 'name': 'metric four',  'data': 2 },
 *             { 'name': 'metric five',  'data':27 }
 *         ]
 *     });
 *
 *     Ext.create('Ext.chart.Chart', {
 *         renderTo: Ext.getBody(),
 *         width: 500,
 *         height: 300,
 *         animate: true,
 *         store: store,
 *         axes: [
 *             {
 *                 type: 'Numeric',
 *                 position: 'left',
 *                 fields: ['data'],
 *                 label: {
 *                     renderer: Ext.util.Format.numberRenderer('0,0')
 *                 },
 *                 title: 'Sample Values',
 *                 grid: true,
 *                 minimum: 0
 *             },
 *             {
 *                 type: 'Category',
 *                 position: 'bottom',
 *                 fields: ['name'],
 *                 title: 'Sample Metrics'
 *             }
 *         ],
 *         series: [
 *             {
 *                 type: 'column',
 *                 axis: 'left',
 *                 highlight: true,
 *                 tips: {
 *                   trackMouse: true,
 *                   width: 140,
 *                   height: 28,
 *                   renderer: function(storeItem, item) {
 *                     this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data') + ' $');
 *                   }
 *                 },
 *                 label: {
 *                   display: 'insideEnd',
 *                   'text-anchor': 'middle',
 *                     field: 'data',
 *                     renderer: Ext.util.Format.numberRenderer('0'),
 *                     orientation: 'vertical',
 *                     color: '#333'
 *                 },
 *                 xField: 'name',
 *                 yField: 'data'
 *             }
 *         ]
 *     });
 *
 * In this configuration we set `column` as the series type, bind the values of the bars to the bottom axis,
 * set `highlight` to true so that bars are smoothly highlighted when hovered and bind the `xField` or category
 * field to the data store `name` property and the `yField` as the data1 property of a store element.
 */
Ext.define('Ext.chart.series.Column', {

    /* Begin Definitions */

    alternateClassName: ['Ext.chart.ColumnSeries', 'Ext.chart.ColumnChart', 'Ext.chart.StackedColumnChart'],

    extend: 'Ext.chart.series.Bar',

    /* End Definitions */

    type: 'column',
    alias: 'series.column',

    column: true,

    // private: true if the columns are bound to a numerical x-axis; otherwise they are evenly distributed along the axis
    boundColumn: false,

    /**
     * @cfg {String} axis
     * The position of the axis to bind the values to. Possible values are 'left', 'bottom', 'top' and 'right'.
     * You must explicitly set this value to bind the values of the column series to the ones in the axis, otherwise a
     * relative scale will be used.
     */

    /**
     * @cfg {Number/Object} xPadding Padding between the left/right axes and the bars.
     * The possible values are a number (the number of pixels for both left and right padding)
     * or an object with `{ left, right }` properties.
     */
    xPadding: 10,

    /**
     * @cfg {Number/Object} yPadding Padding between the top/bottom axes and the bars.
     * The possible values are a number (the number of pixels for both top and bottom padding)
     * or an object with `{ top, bottom }` properties.
     */
    yPadding: 0
});