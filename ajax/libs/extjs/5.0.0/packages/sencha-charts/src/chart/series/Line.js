/**
 * @class Ext.chart.series.Line
 * @extends Ext.chart.series.Cartesian
 *
 * Creates a Line Chart. A Line Chart is a useful visualization technique to display quantitative information for different
 * categories or other real values (as opposed to the bar chart), that can show some progression (or regression) in the dataset.
 * As with all other series, the Line Series must be appended in the *series* Chart array configuration. See the Chart
 * documentation for more information. A typical configuration object for the line series could be:
 *
 *     @example preview
 *     var lineChart = new Ext.chart.CartesianChart({
 *         animation: true,
 *         store: {
 *           fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
 *           data: [
 *               {'name':'metric one', 'data1':10, 'data2':12, 'data3':14, 'data4':8, 'data5':13},
 *               {'name':'metric two', 'data1':7, 'data2':8, 'data3':16, 'data4':10, 'data5':3},
 *               {'name':'metric three', 'data1':5, 'data2':2, 'data3':14, 'data4':12, 'data5':7},
 *               {'name':'metric four', 'data1':2, 'data2':14, 'data3':6, 'data4':1, 'data5':23},
 *               {'name':'metric five', 'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33}
 *           ]
 *         },
 *         axes: [{
 *             type: 'numeric',
 *             position: 'left',
 *             fields: ['data1'],
 *             title: {
 *                 text: 'Sample Values',
 *                 fontSize: 15
 *             },
 *             grid: true,
 *             minimum: 0
 *         }, {
 *             type: 'category',
 *             position: 'bottom',
 *             fields: ['name'],
 *             title: {
 *                 text: 'Sample Values',
 *                 fontSize: 15
 *             }
 *         }],
 *         series: [{
 *             type: 'line',
 *             highlight: {
 *                 size: 7,
 *                 radius: 7
 *             },
 *             style: {
 *                 stroke: 'rgb(143,203,203)'
 *             },
 *             xField: 'name',
 *             yField: 'data1',
 *             marker: {
 *                 type: 'path',
 *                 path: ['M', -2, 0, 0, 2, 2, 0, 0, -2, 'Z'],
 *                 stroke: 'blue',
 *                 lineWidth: 0
 *             }
 *         }, {
 *             type: 'line',
 *             highlight: {
 *                 size: 7,
 *                 radius: 7
 *             },
 *             fill: true,
 *             xField: 'name',
 *             yField: 'data3',
 *             marker: {
 *                 type: 'circle',
 *                 radius: 4,
 *                 lineWidth: 0
 *             }
 *         }]
 *     });
 *     Ext.Viewport.setLayout('fit');
 *     Ext.Viewport.add(lineChart);
 *
 * In this configuration we're adding two series (or lines), one bound to the `data1`
 * property of the store and the other to `data3`. The type for both configurations is
 * `line`. The `xField` for both series is the same, the `name` property of the store.
 * Both line series share the same axis, the left axis. You can set particular marker
 * configuration by adding properties onto the marker object. Both series have
 * an object as highlight so that markers animate smoothly to the properties in highlight
 * when hovered. The second series has `fill = true` which means that the line will also
 * have an area below it of the same color.
 *
 * **Note:** In the series definition remember to explicitly set the axis to bind the
 * values of the line series to. This can be done by using the `axis` configuration property.
 */
Ext.define('Ext.chart.series.Line', {
    extend: 'Ext.chart.series.Cartesian',
    alias: 'series.line',
    type: 'line',
    seriesType: 'lineSeries',

    requires: [
        'Ext.chart.series.sprite.Line'
    ],

    config: {
        /**
         * @cfg {Number} selectionTolerance
         * The offset distance from the cursor position to the line series to trigger events (then used for highlighting series, etc).
         */
        selectionTolerance: 20,

        /**
         * @cfg {Object} style
         * An object containing styles for the visualization lines. These styles will override the theme styles.
         * Some options contained within the style object will are described next.
         */

        /**
         * @cfg {Boolean/Number} smooth
         * If set to `true` or a non-zero number, the line will be smoothed/rounded around its points; otherwise
         * straight line segments will be drawn.
         *
         * A numeric value is interpreted as a divisor of the horizontal distance between consecutive points in
         * the line; larger numbers result in sharper curves while smaller numbers result in smoother curves.
         *
         * If set to `true` then a default numeric value of 3 will be used.
         */
        smooth: false,

        /**
         * @cfg {Boolean} step
         * If set to `true`, the line uses steps instead of straight lines to connect the dots.
         * It is ignored if `smooth` is true.
         */
        step: false,

        /**
         * @cfg {Boolean} fill
         * If set to `true`, the area underneath the line is filled with the color defined as follows, listed by priority:
         * - The color that is configured for this series ({@link Ext.chart.series.Series#colors}).
         * - The color that is configured for this chart ({@link Ext.chart.AbstractChart#colors}).
         * - The fill color that is set in the {@link #style} config.
         * - The stroke color that is set in the {@link #style} config, or the same color as the line.
         *
         * Note: Do not confuse `series.config.fill` (which is a boolean) with `series.style.fill' (which is an alias
         * for the `fillStyle` property and contains a color). For compatibility with previous versions of the API,
         * if `config.fill` is undefined but a `style.fill' color is provided, `config.fill` is considered true.
         * So the default value below must be undefined, not false.
         */
         fill: undefined,

        aggregator: { strategy: 'double' }
    },

    /**
     * @private Default numeric smoothing value to be used when `{@link #smooth} = true`.
     */
    defaultSmoothness: 3,

    /**
     * @private Size of the buffer area on either side of the viewport to provide seamless zoom/pan
     * transforms. Expressed as a multiple of the viewport length, e.g. 1 will make the buffer on
     * each side equal to the length of the visible axis viewport.
     */
    overflowBuffer: 1,

    themeMarkerCount: function() {
        return 1;
    },

    /**
     * @private Override {@link Ext.chart.series.Series#getDefaultSpriteConfig}
     */
    getDefaultSpriteConfig: function () {
        var me = this,
            parentConfig = me.callParent(arguments),
            style = Ext.apply({}, me.getStyle()),
            styleWithTheme,
            fillArea = false;

        if (typeof me.config.fill != 'undefined') {
            // If config.fill is present but there is no fillStyle, then use the
            // strokeStyle to fill (and paint the area the same color as the line).
            if (me.config.fill) {
                fillArea = true;
                if (typeof style.fillStyle == 'undefined') {
                    if (typeof style.strokeStyle == 'undefined') {
                        styleWithTheme = me.getStyleWithTheme();
                        style.fillStyle = styleWithTheme.fillStyle;
                        style.strokeStyle = styleWithTheme.strokeStyle;
                    } else {
                        style.fillStyle = style.strokeStyle;
                    }
                }
            }
        } else {
            // For compatibility with previous versions of the API, if config.fill
            // is undefined but style.fillStyle is provided, we fill the area.
            if (style.fillStyle) {
                fillArea = true;
            }
        }

        // If we don't fill, then delete the fillStyle because that's what is used by
        // the Line sprite to fill below the line.
        if (!fillArea) {
            delete style.fillStyle;
        }

        style = Ext.apply(parentConfig || {}, style);

        return Ext.apply(style, {
            fillArea: fillArea,
            step: me.config.step,
            smooth: me.config.smooth,
            selectionTolerance: me.config.selectionTolerance
        });
    }

});