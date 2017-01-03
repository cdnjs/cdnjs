/**
 * @abstract
 * @class Ext.chart.series.Polar
 * @extends Ext.chart.series.Series
 *
 * Common base class for series implementations that plot values using polar coordinates.
 */
Ext.define('Ext.chart.series.Polar', {

    extend: 'Ext.chart.series.Series',

    config: {
        /**
         * @cfg {Number} rotation
         * The angle in degrees at which the first polar series item should start.
         */
        rotation: 0,

        /**
         * @cfg {Number} radius
         * The radius of the polar series. Set to `null` will fit the polar series to the boundary.
         */
        radius: null,

        /**
         * @cfg {Array} center for the polar series.
         */
        center: [0, 0],

        /**
         * @cfg {Number} offsetX
         * The x-offset of center of the polar series related to the center of the boundary.
         */
        offsetX: 0,

        /**
         * @cfg {Number} offsetY
         * The y-offset of center of the polar series related to the center of the boundary.
         */
        offsetY: 0,

        /**
         * @cfg {Boolean} showInLegend
         * Whether to add the series elements as legend items.
         */
        showInLegend: true,

        /**
         * @cfg {String} xField
         * The store record field name for the labels used in the radar series.
         */
        xField: null,

        /**
         * @cfg {String} angleField
         * Alias for {@link #xField}. For compatibility with ExtJS.
         */
        angleField: null,

        /**
         * @cfg {String} yField
         * The store record field name for the deflection of the graph in the radar series,
         * or the length of the slices in the pie series.
         */
        yField: null,

        /**
         * @cfg {String} lengthField
         * Alias for {@link #yField}. For compatibility with ExtJS.
         */
        lengthField: null,

        xAxis: null,

        yAxis: null
    },

    directions: ['X', 'Y'],
    fieldCategoryX: ['X'],
    fieldCategoryY: ['Y'],

    getAngleField: function () {
        return this.getXField();
    },

    setAngleField: function (f) {
        return this.setXField(f);
    },

    getLengthField: function () {
        return this.getYField();
    },

    setLengthField: function (f) {
        return this.setYField(f);
    },

    applyXAxis: function (newAxis, oldAxis) {
        return this.getChart().getAxis(newAxis) || oldAxis;
    },

    applyYAxis: function (newAxis, oldAxis) {
        return this.getChart().getAxis(newAxis) || oldAxis;
    },

    themeColorCount: function() {
        var me = this,
            store = me.getStore(),
            count = store && store.getCount() || 0;
        return count;

    },

    getDefaultSpriteConfig: function () {
        return {
            type: this.seriesType,
            renderer: this.getRenderer(),
            centerX: 0,
            centerY: 0,
            rotationCenterX: 0,
            rotationCenterY: 0
        };
    },

    applyRotation: function (rotation) {
        var twoPie = Math.PI * 2;
        return (rotation % twoPie + Math.PI) % twoPie - Math.PI;
    },

    updateRotation: function (rotation) {
        var sprites = this.getSprites();
        if (sprites && sprites[0]) {
            sprites[0].setAttributes({
                baseRotation: rotation
            });
        }
    }
});