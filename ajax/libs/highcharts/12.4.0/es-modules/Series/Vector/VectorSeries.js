/* *
 *
 *  Vector plot series module
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import A from '../../Core/Animation/AnimationUtilities.js';
const { animObject } = A;
import H from '../../Core/Globals.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { series: Series, seriesTypes: { scatter: ScatterSeries } } = SeriesRegistry;
import U from '../../Core/Utilities.js';
const { arrayMax, extend, merge, pick } = U;
import VectorSeriesDefaults from './VectorSeriesDefaults.js';
/* *
 *
 *  Class
 *
 * */
/**
 * The vector series class.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.vector
 *
 * @augments Highcharts.seriesTypes.scatter
 */
class VectorSeries extends ScatterSeries {
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Fade in the arrows on initializing series.
     * @private
     */
    animate(init) {
        if (init) {
            this.markerGroup.attr({
                opacity: 0.01
            });
        }
        else {
            this.markerGroup.animate({
                opacity: 1
            }, animObject(this.options.animation));
        }
    }
    /**
     * Create a single arrow. It is later rotated around the zero
     * centerpoint.
     * @private
     */
    arrow(point) {
        const fraction = point.length / this.lengthMax, u = fraction * this.options.vectorLength / 20, o = {
            start: 10 * u,
            center: 0,
            end: -10 * u
        }[this.options.rotationOrigin] || 0, 
        // The stem and the arrow head. Draw the arrow first with rotation
        // 0, which is the arrow pointing down (vector from north to south).
        path = [
            ['M', 0, 7 * u + o], // Base of arrow
            ['L', -1.5 * u, 7 * u + o],
            ['L', 0, 10 * u + o],
            ['L', 1.5 * u, 7 * u + o],
            ['L', 0, 7 * u + o],
            ['L', 0, -10 * u + o] // Top
        ];
        return path;
    }
    /*
    DrawLegendSymbol: function (legend, item) {
        let options = legend.options,
            symbolHeight = legend.symbolHeight,
            square = options.squareSymbol,
            symbolWidth = square ? symbolHeight : legend.symbolWidth,
            path = this.arrow.call({
                lengthMax: 1,
                options: {
                    vectorLength: symbolWidth
                }
            }, {
                length: 1
            });
        legendItem.line = this.chart.renderer.path(path)
        .addClass('highcharts-point')
        .attr({
            zIndex: 3,
            translateY: symbolWidth / 2,
            rotation: 270,
            'stroke-width': 1,
            'stroke': 'black'
        }).add(item.legendItem.group);
    },
    */
    /**
     * @private
     */
    drawPoints() {
        const chart = this.chart;
        for (const point of this.points) {
            const plotX = point.plotX, plotY = point.plotY;
            if (this.options.clip === false ||
                chart.isInsidePlot(plotX, plotY, { inverted: chart.inverted })) {
                if (!point.graphic) {
                    point.graphic = this.chart.renderer
                        .path()
                        .add(this.markerGroup)
                        .addClass('highcharts-point ' +
                        'highcharts-color-' +
                        pick(point.colorIndex, point.series.colorIndex));
                }
                point.graphic
                    .attr({
                    d: this.arrow(point),
                    translateX: plotX,
                    translateY: plotY,
                    rotation: point.direction
                });
                if (!this.chart.styledMode) {
                    point.graphic
                        .attr(this.pointAttribs(point));
                }
            }
            else if (point.graphic) {
                point.graphic = point.graphic.destroy();
            }
        }
    }
    /**
     * Get presentational attributes.
     * @private
     */
    pointAttribs(point, state) {
        const options = this.options;
        let stroke = point?.color || this.color, strokeWidth = this.options.lineWidth;
        if (state) {
            stroke = options.states[state].color || stroke;
            strokeWidth =
                (options.states[state].lineWidth || strokeWidth) +
                    (options.states[state].lineWidthPlus || 0);
        }
        return {
            'stroke': stroke,
            'stroke-width': strokeWidth
        };
    }
    /**
     * @private
     */
    translate() {
        Series.prototype.translate.call(this);
        this.lengthMax = arrayMax(this.getColumn('length'));
    }
}
/* *
 *
 *  Static Properties
 *
 * */
VectorSeries.defaultOptions = merge(ScatterSeries.defaultOptions, VectorSeriesDefaults);
extend(VectorSeries.prototype, {
    /**
     * @ignore
     * @deprecated
     */
    drawGraph: H.noop,
    /**
     * @ignore
     * @deprecated
     */
    getSymbol: H.noop,
    /**
     * @ignore
     * @deprecated
     */
    markerAttribs: H.noop,
    parallelArrays: ['x', 'y', 'length', 'direction'],
    pointArrayMap: ['y', 'length', 'direction']
});
SeriesRegistry.registerSeriesType('vector', VectorSeries);
/* *
 *
 *  Default Export
 *
 * */
export default VectorSeries;
