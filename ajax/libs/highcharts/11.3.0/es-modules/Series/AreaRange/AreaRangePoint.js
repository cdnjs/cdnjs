/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { area: { prototype: { pointClass: AreaPoint, pointClass: { prototype: areaProto } } } } = SeriesRegistry.seriesTypes;
import U from '../../Core/Utilities.js';
const { defined, isNumber, merge } = U;
/* *
 *
 *  Class
 *
 * */
class AreaRangePoint extends AreaPoint {
    /**
     * Range series only. The high or maximum value for each data point.
     * @name Highcharts.Point#high
     * @type {number|undefined}
     */
    /**
     * Range series only. The low or minimum value for each data point.
     * @name Highcharts.Point#low
     * @type {number|undefined}
     */
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    setState() {
        const prevState = this.state, series = this.series, isPolar = series.chart.polar, seriesOptionsMarker = series.options.marker, seriesDefaultSymbol = series.symbol;
        if (!defined(this.plotHigh)) {
            // Boost doesn't calculate plotHigh
            this.plotHigh = series.yAxis.toPixels(this.high, true);
        }
        if (!defined(this.plotLow)) {
            // Boost doesn't calculate plotLow
            this.plotLow = this.plotY = series.yAxis.toPixels(this.low, true);
        }
        series.lowerStateMarkerGraphic = series.stateMarkerGraphic;
        series.stateMarkerGraphic = series.upperStateMarkerGraphic;
        // Change state also for the top marker
        this.graphic = this.graphics && this.graphics[1];
        this.plotY = this.plotHigh;
        if (isPolar && isNumber(this.plotHighX)) {
            this.plotX = this.plotHighX;
        }
        // Top state:
        areaProto.setState.apply(this, arguments);
        this.state = prevState;
        // Now restore defaults
        this.plotY = this.plotLow;
        this.graphic = this.graphics && this.graphics[0];
        if (isPolar && isNumber(this.plotLowX)) {
            this.plotX = this.plotLowX;
        }
        series.upperStateMarkerGraphic = series.stateMarkerGraphic;
        series.stateMarkerGraphic = series.lowerStateMarkerGraphic;
        // Lower marker is stored at stateMarkerGraphic
        // to avoid reference duplication (#7021)
        series.lowerStateMarkerGraphic = void 0;
        const originalSettings = series.modifyMarkerSettings();
        // Bottom state
        areaProto.setState.apply(this, arguments);
        // Restore previous state
        series.restoreMarkerSettings(originalSettings);
    }
    haloPath() {
        const isPolar = this.series.chart.polar;
        let path = [];
        // Bottom halo
        this.plotY = this.plotLow;
        if (isPolar && isNumber(this.plotLowX)) {
            this.plotX = this.plotLowX;
        }
        if (this.isInside) {
            path = areaProto.haloPath.apply(this, arguments);
        }
        // Top halo
        this.plotY = this.plotHigh;
        if (isPolar && isNumber(this.plotHighX)) {
            this.plotX = this.plotHighX;
        }
        if (this.isTopInside) {
            path = path.concat(areaProto.haloPath.apply(this, arguments));
        }
        return path;
    }
    isValid() {
        return isNumber(this.low) && isNumber(this.high);
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default AreaRangePoint;
