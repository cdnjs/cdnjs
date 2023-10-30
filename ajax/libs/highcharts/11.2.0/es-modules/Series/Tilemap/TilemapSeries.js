/* *
 *
 *  Tilemaps module
 *
 *  (c) 2010-2021 Highsoft AS
 *  Author: Øystein Moseng
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import H from '../../Core/Globals.js';
const { noop } = H;
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { column: ColumnSeries, heatmap: HeatmapSeries, scatter: ScatterSeries } = SeriesRegistry.seriesTypes;
import TilemapPoint from './TilemapPoint.js';
import TilemapSeriesDefaults from './TilemapSeriesDefaults.js';
import TilemapShapes from './TilemapShapes.js';
import U from '../../Core/Utilities.js';
const { addEvent, extend, merge, pushUnique } = U;
/* *
 *
 *  Constants
 *
 * */
const composedMembers = [];
/* *
 *
 *  Functions
 *
 * */
/**
 * Extension to add pixel padding for series. Uses getSeriesPixelPadding on each
 * series and adds the largest padding required. If no series has this function
 * defined, we add nothing.
 * @private
 */
function onAxisAfterSetAxisTranslation() {
    if (this.recomputingForTilemap || this.coll === 'colorAxis') {
        return;
    }
    const axis = this, 
    // Find which series' padding to use
    seriesPadding = axis.series
        .map(function (series) {
        return series.getSeriesPixelPadding &&
            series.getSeriesPixelPadding(axis);
    })
        .reduce(function (a, b) {
        return (a && a.padding) > (b && b.padding) ?
            a :
            b;
    }, void 0) ||
        {
            padding: 0,
            axisLengthFactor: 1
        }, lengthPadding = Math.round(seriesPadding.padding * seriesPadding.axisLengthFactor);
    // Don't waste time on this if we're not adding extra padding
    if (seriesPadding.padding) {
        // Recompute translation with new axis length now (minus padding)
        axis.len -= lengthPadding;
        axis.recomputingForTilemap = true;
        axis.setAxisTranslation();
        delete axis.recomputingForTilemap;
        axis.minPixelPadding += seriesPadding.padding;
        axis.len += lengthPadding;
    }
}
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 * @name Highcharts.seriesTypes.tilemap
 *
 * @augments Highcharts.Series
 */
class TilemapSeries extends HeatmapSeries {
    constructor() {
        /* *
         *
         *  Static Properties
         *
         * */
        super(...arguments);
        /* *
         *
         *  Properties
         *
         * */
        this.data = void 0;
        this.options = void 0;
        this.points = void 0;
        this.tileShape = void 0;
    }
    /* *
     *
     *  Static Functions
     *
     * */
    static compose(AxisClass) {
        if (pushUnique(composedMembers, AxisClass)) {
            addEvent(AxisClass, 'afterSetAxisTranslation', onAxisAfterSetAxisTranslation);
        }
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Use the shape's defined data label alignment function.
     * @private
     */
    alignDataLabel() {
        return this.tileShape.alignDataLabel.apply(this, arguments);
    }
    drawPoints() {
        // In styled mode, use CSS, otherwise the fill used in the style
        // sheet will take precedence over the fill attribute.
        ColumnSeries.prototype.drawPoints.call(this);
        for (const point of this.points) {
            if (point.graphic) {
                point.graphic[this.chart.styledMode ? 'css' : 'animate'](this.colorAttribs(point));
            }
        }
    }
    /**
     * Get metrics for padding of axis for this series.
     * @private
     */
    getSeriesPixelPadding(axis) {
        const isX = axis.isXAxis, padding = this.tileShape.getSeriesPadding(this);
        // If the shape type does not require padding, return no-op padding
        if (!padding) {
            return {
                padding: 0,
                axisLengthFactor: 1
            };
        }
        // Use translate to compute how far outside the points we
        // draw, and use this difference as padding.
        const coord1 = Math.round(axis.translate(isX ?
            padding.xPad * 2 :
            padding.yPad, 0, 1, 0, 1));
        const coord2 = Math.round(axis.translate(isX ? padding.xPad : 0, 0, 1, 0, 1));
        return {
            padding: (axis.single ? // if there is only one tick adjust padding #18647
                Math.abs(coord1 - coord2) / 2 :
                Math.abs(coord1 - coord2)) || 0,
            // Offset the yAxis length to compensate for shift. Setting the
            // length factor to 2 would add the same margin to max as min.
            // Now we only add a slight bit of the min margin to max, as we
            // don't actually draw outside the max bounds. For the xAxis we
            // draw outside on both sides so we add the same margin to min
            // and max.
            axisLengthFactor: isX ? 2 : 1.1
        };
    }
    /**
     * Set tile shape object on series.
     * @private
     */
    setOptions() {
        // Call original function
        const ret = super.setOptions.apply(this, arguments);
        this.tileShape = TilemapShapes[ret.tileShape];
        return ret;
    }
    /**
     * Use translate from tileShape.
     * @private
     */
    translate() {
        return this.tileShape.translate.apply(this, arguments);
    }
}
TilemapSeries.defaultOptions = merge(HeatmapSeries.defaultOptions, TilemapSeriesDefaults);
extend(TilemapSeries.prototype, {
    // Revert the noop on getSymbol.
    getSymbol: noop,
    // Use drawPoints, markerAttribs, pointAttribs methods from the old
    // heatmap implementation.
    // TODO: Consider standarizing heatmap and tilemap into more
    // consistent form.
    markerAttribs: ScatterSeries.prototype.markerAttribs,
    pointAttribs: ColumnSeries.prototype.pointAttribs,
    pointClass: TilemapPoint
});
SeriesRegistry.registerSeriesType('tilemap', TilemapSeries);
/* *
 *
 *  Default Export
 *
 * */
export default TilemapSeries;
/* *
 *
 *  API Declarations
 *
 * */
/**
 * @typedef {"circle"|"diamond"|"hexagon"|"square"} Highcharts.TilemapShapeValue
 */
''; // keeps doclets above in JS file
