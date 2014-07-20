/**
 * @class Ext.chart.series.sprite.Polar
 * @extends Ext.draw.sprite.Sprite
 * 
 * Polar sprite.
 */
Ext.define('Ext.chart.series.sprite.Polar', {
    mixins: {
        markerHolder: 'Ext.chart.MarkerHolder'
    },
    extend: 'Ext.draw.sprite.Sprite',
    inheritableStatics: {
        def: {
            processors: {
                /**
                 * @cfg {Number} [dataMinX=0] Data minimum on the x-axis.
                 */
                dataMinX: 'number',

                /**
                 * @cfg {Number} [dataMaxX=1] Data maximum on the x-axis.
                 */
                dataMaxX: 'number',

                /**
                 * @cfg {Number} [dataMinY=0] Data minimum on the y-axis.
                 */
                dataMinY: 'number',

                /**
                 * @cfg {Number} [dataMaxY=2] Data maximum on the y-axis.
                 */
                dataMaxY: 'number',

                /**
                 * @cfg {Array} [rangeX='data'] Data range derived from all the series bound to the x-axis.
                 */
                rangeX: 'data',
                /**
                 * @cfg {Array} [rangeY='data'] Data range derived from all the series bound to the y-axis.
                 */
                rangeY: 'data',

                /**
                 * @cfg {Object} [dataY=null] Data items on the y-axis.
                 */
                dataY: 'data',

                /**
                 * @cfg {Object} [dataX=null] Data items on the x-axis.
                 */
                dataX: 'data',

                /**
                 * @cfg {Number} [centerX=0] The central point of the series on the x-axis.
                 */
                centerX: 'number',

                /**
                 * @cfg {Number} [centerY=0] The central point of the series on the y-axis.
                 */
                centerY: 'number',

                /**
                 * @cfg {Number} [startAngle=0] The starting angle of the polar series.
                 */
                startAngle: 'number',

                /**
                 * @cfg {Number} [endAngle=Math.PI] The ending angle of the polar series.
                 */
                endAngle: 'number',

                /**
                 * @cfg {Number} [startRho=0] The starting radius of the polar series.
                 */
                startRho: 'number',

                /**
                 * @cfg {Number} [endRho=150] The ending radius of the polar series.
                 */
                endRho: 'number',

                /**
                 * @cfg {Number} [baseRotation=0] The starting rotation of the polar series.
                 */
                baseRotation: 'number',

                /**
                 * @cfg {Object} [labels=null] Labels used in the series.
                 */
                labels: 'default',

                /**
                 * @cfg {Number} [labelOverflowPadding=10] Padding around labels to determine overlap.
                 */
                labelOverflowPadding: 'number'
            },
            defaults: {
                dataY: null,
                dataX: null,
                dataMinX: 0,
                dataMaxX: 1,
                dataMinY: 0,
                dataMaxY: 1,
                centerX: 0,
                centerY: 0,
                startAngle: 0,
                endAngle: Math.PI,
                startRho: 0,
                endRho: 150,
                baseRotation: 0,
                labels: null,
                labelOverflowPadding: 10
            },
            dirtyTriggers: {
                dataX: 'bbox',
                dataY: 'bbox',
                dataMinX: 'bbox',
                dataMaxX: 'bbox',
                dataMinY: 'bbox',
                dataMaxY: 'bbox',
                centerX: 'bbox',
                centerY: 'bbox',
                startAngle: 'bbox',
                endAngle: 'bbox',
                startRho: 'bbox',
                endRho: 'bbox',
                baseRotation: 'bbox'
            }
        }
    },

    config: {
        /**
         * @private
         * @cfg {Object} store The store that is passed to the renderer.
         */
        store: null,
        field: null
    },
    
    updatePlainBBox: function (plain) {
        var attr = this.attr;
        plain.x = attr.centerX - attr.endRho;
        plain.y = attr.centerY + attr.endRho;
        plain.width = attr.endRho * 2;
        plain.height = attr.endRho * 2;
    }
});