/**
 * @class Ext.chart.series.Radar
 * @extends Ext.chart.series.Polar
 *
 * Creates a Radar Chart. A Radar Chart is a useful visualization technique for comparing different quantitative values for
 * a constrained number of categories.
 * As with all other series, the Radar series must be appended in the *series* Chart array configuration. See the Chart
 * documentation for more information. A typical configuration object for the radar series could be:
 *
 *     @example preview
 *     var chart = new Ext.chart.PolarChart({
 *         animation: true,
 *         interactions: ['rotate'],
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
 *         series: [{
 *             type: 'radar',
 *             xField: 'name',
 *             yField: 'data4',
 *             style: {
 *               fillStyle: 'rgba(0, 0, 255, 0.1)',
 *               strokeStyle: 'rgba(0, 0, 0, 0.8)',
 *               lineWidth: 1
 *             }
 *         }],
 *         axes: [
 *           {
 *             type: 'numeric',
 *             position: 'radial',
 *             fields: 'data4',
 *             style: {
 *                 estStepSize: 10
 *             },
 *             grid: true
 *           },
 *           {
 *             type: 'category',
 *             position: 'angular',
 *             fields: 'name',
 *             style: {
 *                 estStepSize: 1
 *             },
 *             grid: true
 *           }
 *         ]
 *     });
 *     Ext.Viewport.setLayout('fit');
 *     Ext.Viewport.add(chart);
 *
 *
 */
Ext.define('Ext.chart.series.Radar', {
    extend: 'Ext.chart.series.Polar',
    type: 'radar',
    seriesType: 'radar',
    alias: 'series.radar',
    requires: ['Ext.chart.series.Cartesian', 'Ext.chart.series.sprite.Radar'],
    /**
     * @cfg {Object} style
     * An object containing styles for overriding series styles from theming.
     */

    config: {

    },

    themeColorCount: function() {
        return 1;
    },

    themeMarkerCount: function() {
        return 1;
    },

    updateAngularAxis: function (axis) {
        axis.processData(this);
    },

    updateRadialAxis: function (axis) {
        axis.processData(this);
    },

    coordinateX: function () {
        return this.coordinate('X', 0, 2);
    },

    coordinateY: function () {
        return this.coordinate('Y', 1, 2);
    },

    updateCenter: function (center) {
        this.setStyle({
            translationX: center[0] + this.getOffsetX(),
            translationY: center[1] + this.getOffsetY()
        });
        this.doUpdateStyles();
    },

    updateRadius: function (radius) {
        this.setStyle({
            endRho: radius
        });
        this.doUpdateStyles();
    },

    updateRotation: function (rotation) {
        this.setStyle({
            rotationRads: rotation
        });
        this.doUpdateStyles();
    },

    updateTotalAngle: function (totalAngle) {
        this.processData();
    },

    getItemForPoint: function (x, y) {
        var me = this,
            sprite = me.sprites && me.sprites[0],
            attr = sprite.attr,
            dataX = attr.dataX,
            dataY = attr.dataY,
            centerX = attr.centerX,
            centerY = attr.centerY,
            minX = attr.dataMinX,
            maxX = attr.dataMaxX,
            maxY = attr.dataMaxY,
            endRho = attr.endRho,
            startRho = attr.startRho,
            baseRotation = attr.baseRotation,
            i, length = dataX.length,
            store = me.getStore(),
            marker = me.getMarker(),
            threshhold = 22,
            item, th, r;

        if (me.getHidden()) {
            return null;
        }
        if (sprite && marker) {
            for (i = 0; i < length; i++) {
                th = (dataX[i] - minX) / (maxX - minX + 1) * 2 * Math.PI + baseRotation;
                r = dataY[i] / maxY * (endRho - startRho) + startRho;
                if (Math.abs(centerX + Math.cos(th) * r - x) < threshhold && Math.abs(centerY + Math.sin(th) * r - y) < threshhold) {
                    item = {
                        series: me,
                        sprite: sprite,
                        index: i,
                        record: store.getData().items[i],
                        field: me.getYField()
                    };
                    return item;
                }
            }
        }
        return me.callParent(arguments);
    },

    provideLegendInfo: function (target) {
        var style = this.getSubStyleWithTheme();
        target.push({
            name: this.getTitle() || this.getYField() || this.getId(),
            mark: style.fillStyle || style.strokeStyle || 'black',
            disabled: false,
            series: this.getId(),
            index: 0
        });
    },

    getXRange: function () {
        return [this.dataRange[0], this.dataRange[2]];
    },

    getYRange: function () {
        return [this.dataRange[1], this.dataRange[3]];
    }
}, function () {
    var klass = this;
    // TODO: [HACK] Steal from cartesian series.
    klass.prototype.onAxesChange = Ext.chart.series.Cartesian.prototype.onAxesChange;
    klass.prototype.getSprites = Ext.chart.series.Cartesian.prototype.getSprites;
});

